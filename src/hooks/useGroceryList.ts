"use client";

import { useMemo } from "react";
import type { MealPlan } from "@/types/domain";
import { aggregateGrocery } from "@/lib/planner/grocery";

export function useGroceryList(plan: MealPlan) {
  return useMemo(() => aggregateGrocery(plan), [plan]);
}
