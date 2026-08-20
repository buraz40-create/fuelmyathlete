"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { DayType, MealPlan, MealSlot } from "@/types/domain";
import { emptyPlan, planStorage } from "@/lib/planner/storage";
import { loadPlanRemote, savePlanRemote } from "@/lib/planner/storage-supabase";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { currentWeekStart, shiftWeek } from "@/lib/planner/isoWeek";
import { buildCustomCatalog, mealsForSlot } from "@/lib/catalog";
import { importedRecipes } from "@/lib/import/storage";
import { effectiveRating, mealRatings } from "@/lib/player/ratings";
import { mealPreferences } from "@/lib/player/preferences";
import { weeklySchedule } from "@/lib/player/schedule";
import { mergePlans } from "@/lib/planner/merge";
import { toast } from "sonner";

const SAVE_DEBOUNCE_MS = 250;

export function useMealPlan(initialWeekStart?: string) {
  const [weekStart, setWeekStart] = useState<string>(() => initialWeekStart ?? currentWeekStart());
  const [plan, setPlan] = useState<MealPlan>(() => emptyPlan(weekStart));
  const [hydrated, setHydrated] = useState(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const syncWarned = useRef(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      // Always hydrate from local first for instant UI; remote overwrites if newer.
      const untouched = !planStorage.exists(weekStart);
      const local = planStorage.loadPlan(weekStart);
      // A week nobody has opened yet gets the family's recurring schedule stamped onto it.
      // Applied here rather than inside emptyPlan because emptyPlan also runs on the server,
      // where localStorage does not exist, and a mismatch would break hydration.
      const seeded = untouched ? applySchedule(local) : local;
      if (!cancelled) setPlan(seeded);

      if (isSupabaseConfigured) {
        const remote = await loadPlanRemote(weekStart);
        if (cancelled) return;
        if (remote) {
          const merged = mergePlans(seeded, remote);
          setPlan(merged);
          planStorage.savePlan(merged);
        } else if (seeded.entries.some((e) => e.mealSlug)) {
          // Same adoption case as the profile: a week planned before signing in would
          // otherwise stay stranded on this device and look lost from any other one.
          savePlanRemote(seeded).catch(() => {
            // Local copy is authoritative until the next successful save.
          });
        }
      }
      if (!cancelled) setHydrated(true);
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [weekStart]);

  const persist = useCallback((next: MealPlan) => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      next = { ...next, updatedAt: new Date().toISOString() };
      planStorage.savePlan(next);
      if (isSupabaseConfigured) {
        savePlanRemote(next).catch(() => {
          // Local is saved either way, so this is not an error the parent must act on. But a
          // signed-in parent whose sync has been quietly failing for a week deserves to know
          // before they open the app on another device and find a different plan. Warn once
          // per session rather than on every debounced save.
          if (!syncWarned.current) {
            syncWarned.current = true;
            toast.warning("Saved on this device, but not synced", {
              description: "Your plan is safe here. It will sync again when the connection is back.",
            });
          }
        });
      }
    }, SAVE_DEBOUNCE_MS);
  }, []);

  const updateEntry = useCallback(
    (dayOfWeek: number, slot: MealSlot, mealSlug: string | null) => {
      setPlan((prev) => {
        const next: MealPlan = {
          ...prev,
          entries: prev.entries.map((e) =>
            e.dayOfWeek === dayOfWeek && e.slot === slot ? { ...e, mealSlug } : e
          ),
        };
        persist(next);
        return next;
      });
    },
    [persist]
  );

  // Servings is the difference between "what will he eat" and "what do I cook tonight".
  // The field has been in the type and the schema since the start, pinned at 1, while the
  // grocery aggregator already multiplied by it.
  const setServings = useCallback(
    (dayOfWeek: number, slot: MealSlot, servings: number) => {
      const clamped = Math.min(12, Math.max(1, Math.round(servings)));
      setPlan((prev) => {
        const next: MealPlan = {
          ...prev,
          entries: prev.entries.map((e) =>
            e.dayOfWeek === dayOfWeek && e.slot === slot ? { ...e, servings: clamped } : e
          ),
        };
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const setDayType = useCallback(
    (dayOfWeek: number, dayType: DayType) => {
      setPlan((prev) => {
        const next: MealPlan = {
          ...prev,
          entries: prev.entries.map((e) =>
            e.dayOfWeek === dayOfWeek ? { ...e, dayType } : e
          ),
        };
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const toggleGroceryItem = useCallback(
    (ingredientSlug: string) => {
      setPlan((prev) => {
        const checked = { ...prev.groceryChecked };
        checked[ingredientSlug] = !checked[ingredientSlug];
        const next: MealPlan = { ...prev, groceryChecked: checked };
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const resetWeek = useCallback(() => {
    const fresh = emptyPlan(weekStart);
    setPlan(fresh);
    planStorage.clearPlan(weekStart);
    // Clearing locally only meant the remote copy was restored on next load, silently
    // undoing the clear for signed-in parents.
    if (isSupabaseConfigured) {
      savePlanRemote(fresh).catch(() => {
        // Local copy is already cleared; remote catches up on the next edit.
      });
    }
  }, [weekStart]);

  const goToWeek = useCallback((next: string) => setWeekStart(next), []);
  const nextWeek = useCallback(() => setWeekStart((w) => shiftWeek(w, 1)), []);
  const prevWeek = useCallback(() => setWeekStart((w) => shiftWeek(w, -1)), []);
  const goToCurrentWeek = useCallback(() => setWeekStart(currentWeekStart()), []);

  // A week is disposable work if it vanishes every Saturday. Copying the previous week
  // makes week two cost one tap instead of twenty-eight.
  // Gated on `hydrated` so the first client render matches the server HTML before any
  // localStorage read happens.
  const previousWeekHasPlan = useMemo(
    () => (hydrated ? planStorage.hasPlan(shiftWeek(weekStart, -1)) : false),
    [hydrated, weekStart]
  );

  const copyPreviousWeek = useCallback(async () => {
    const prevStart = shiftWeek(weekStart, -1);
    let source: MealPlan | null = planStorage.hasPlan(prevStart)
      ? planStorage.loadPlan(prevStart)
      : null;
    if (!source && isSupabaseConfigured) {
      source = await loadPlanRemote(prevStart);
    }
    if (!source) return false;

    setPlan((prev) => {
      const byCell = new Map(
        source.entries.map((e) => [`${e.dayOfWeek}:${e.slot}`, e] as const)
      );
      const next: MealPlan = {
        ...prev,
        entries: prev.entries.map((e) => {
          const from = byCell.get(`${e.dayOfWeek}:${e.slot}`);
          if (!from) return e;
          return { ...e, mealSlug: from.mealSlug, dayType: from.dayType };
        }),
        // Shopping starts unchecked. Last week's ticks are not this week's cart.
        groceryChecked: {},
      };
      persist(next);
      return next;
    });
    return true;
  }, [weekStart, persist]);

  const smartFillWeek = useCallback(() => {
    // Read at click time rather than through a hook, so auto-fill always uses the current
    // exclusions AND the recipes imported since the page loaded. Auto-fill was serving foods
    // the athlete refuses, which is worse than an empty slot: it teaches the parent not to
    // trust the button.
    const excluded = new Set(mealPreferences.excluded());
    // A parent who typed a recipe in by hand meant it. Filling the week from the curated
    // catalog only, and never once choosing their own, is the same class of surprise as
    // serving a food the athlete refuses.
    const custom = buildCustomCatalog(importedRecipes.all());
    // The parent's own star ratings beat our built-in guess. Auto-fill repeatedly serving a
    // meal they have rated 2 is the same failure as serving one they have hidden, just quieter.
    const ratings = mealRatings.all();
    setPlan((prev) => {
      const next: MealPlan = {
        ...prev,
        entries: prev.entries.map((e) => {
          if (e.mealSlug) return e;
          const forSlot = mealsForSlot(e.slot, custom);
          const allowed = forSlot.filter((m) => !excluded.has(m.slug));
          const base = allowed.length ? allowed : forSlot;
          const candidates = base.filter((m) => m.suitableFor.includes(e.dayType));
          const dayFit = candidates.length ? candidates : base;

          // Sorting by rating alone was not enough. The variety index below deliberately
          // spreads picks across the whole list, so a meal the parent rated 1 still turned up
          // on some days: the order changed and the outcome did not. A one or two star rating
          // is a parent saying "not this", so those drop out entirely unless dropping them
          // would leave nothing to serve.
          const liked = dayFit.filter((m) => effectiveRating(m.slug, m.kidRating, ratings) >= 3);
          const pool = liked.length ? liked : dayFit;
          if (pool.length === 0) return e;

          // Best first, then a per-slot offset so the week has variety instead of the same
          // top-rated breakfast seven days running.
          const top = [...pool].sort(
            (a, b) =>
              effectiveRating(b.slug, b.kidRating, ratings) -
              effectiveRating(a.slug, a.kidRating, ratings)
          );
          const variety = top[(e.dayOfWeek + slotIndex(e.slot)) % top.length];
          return { ...e, mealSlug: variety.slug };
        }),
      };
      persist(next);
      return next;
    });
  }, [persist]);

  const plannedCount = plan.entries.filter((e) => e.mealSlug).length;

  return {
    weekStart,
    setWeekStart,
    isCurrentWeek: weekStart === currentWeekStart(),
    previousWeekHasPlan,
    plan,
    hydrated,
    plannedCount,
    updateEntry,
    setServings,
    setDayType,
    toggleGroceryItem,
    smartFillWeek,
    resetWeek,
    goToWeek,
    nextWeek,
    prevWeek,
    goToCurrentWeek,
    copyPreviousWeek,
  };
}

function applySchedule(plan: MealPlan): MealPlan {
  const schedule = weeklySchedule.load();
  return {
    ...plan,
    entries: plan.entries.map((e) => ({ ...e, dayType: schedule[e.dayOfWeek] ?? e.dayType })),
  };
}

function slotIndex(slot: "breakfast" | "lunch" | "snack" | "dinner"): number {
  return slot === "breakfast" ? 0 : slot === "lunch" ? 1 : slot === "snack" ? 2 : 3;
}
