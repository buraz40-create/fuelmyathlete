"use client";

import { useMemo } from "react";
import type { MealPlan } from "@/types/domain";
import { aggregateGrocery } from "@/lib/planner/grocery";
import { usePlayerProfile } from "@/hooks/usePlayerProfile";
import { portionScale } from "@/lib/player/cohort";
import { usePlan } from "@/components/planner/PlanProvider";

export function useGroceryList(plan: MealPlan) {
  const { profile } = usePlayerProfile();
  const { custom } = usePlan();
  const athleteScale = profile ? portionScale(profile) : 1;
  return useMemo(
    () => aggregateGrocery(plan, athleteScale, custom),
    [plan, athleteScale, custom]
  );
}
