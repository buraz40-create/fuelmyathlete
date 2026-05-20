"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { DayType, MealPlan, MealSlot } from "@/types/domain";
import { emptyPlan, planStorage } from "@/lib/planner/storage";
import { loadPlanRemote, savePlanRemote } from "@/lib/planner/storage-supabase";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { currentWeekStart } from "@/lib/planner/isoWeek";
import { MEALS_BY_SLOT } from "@/data/meals";

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
      const local = planStorage.loadPlan(weekStart);
      if (!cancelled) setPlan(local);

      if (isSupabaseConfigured) {
        const remote = await loadPlanRemote(weekStart);
        if (!cancelled && remote) {
          setPlan(remote);
          planStorage.savePlan(remote);
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
  }, [weekStart]);

  const smartFillWeek = useCallback(() => {
    setPlan((prev) => {
      const next: MealPlan = {
        ...prev,
        entries: prev.entries.map((e) => {
          if (e.mealSlug) return e;
          const candidates = MEALS_BY_SLOT[e.slot].filter((m) =>
            m.suitableFor.includes(e.dayType)
          );
          const pool = candidates.length ? candidates : MEALS_BY_SLOT[e.slot];
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
    plan,
    hydrated,
    plannedCount,
    updateEntry,
    setDayType,
    toggleGroceryItem,
    smartFillWeek,
    resetWeek,
  };
}

function slotIndex(slot: "breakfast" | "lunch" | "snack" | "dinner"): number {
  return slot === "breakfast" ? 0 : slot === "lunch" ? 1 : slot === "snack" ? 2 : 3;
}
