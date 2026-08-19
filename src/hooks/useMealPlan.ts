"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { DayType, MealPlan, MealSlot } from "@/types/domain";
import { emptyPlan, planStorage } from "@/lib/planner/storage";
import { loadPlanRemote, savePlanRemote } from "@/lib/planner/storage-supabase";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { currentWeekStart, shiftWeek } from "@/lib/planner/isoWeek";
import { MEALS_BY_SLOT } from "@/data/meals";
import { mealPreferences } from "@/lib/player/preferences";
import { weeklySchedule } from "@/lib/player/schedule";
import { mergePlans } from "@/lib/planner/merge";

const SAVE_DEBOUNCE_MS = 250;

export function useMealPlan(initialWeekStart?: string) {
  const [weekStart, setWeekStart] = useState<string>(() => initialWeekStart ?? currentWeekStart());
  const [plan, setPlan] = useState<MealPlan>(() => emptyPlan(weekStart));
  const [hydrated, setHydrated] = useState(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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
          // Network/auth error: local copy is still saved.
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
    // exclusions. Auto-fill was serving foods the athlete refuses, which is worse than an
    // empty slot: it teaches the parent not to trust the button.
    const excluded = new Set(mealPreferences.excluded());
    setPlan((prev) => {
      const next: MealPlan = {
        ...prev,
        entries: prev.entries.map((e) => {
          if (e.mealSlug) return e;
          const allowed = MEALS_BY_SLOT[e.slot].filter((m) => !excluded.has(m.slug));
          const base = allowed.length ? allowed : MEALS_BY_SLOT[e.slot];
          const candidates = base.filter((m) => m.suitableFor.includes(e.dayType));
          const pool = candidates.length ? candidates : base;
          if (pool.length === 0) return e;
          const top = [...pool].sort((a, b) => b.kidRating - a.kidRating);
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
