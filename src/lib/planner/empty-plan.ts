import type { MealPlan, MealPlanEntry } from "@/types/domain";
import { MEAL_SLOTS } from "@/data/dayTypes";

export function emptyPlan(weekStart: string): MealPlan {
  const entries: MealPlanEntry[] = [];
  for (let day = 0; day < 7; day++) {
    for (const { slot } of MEAL_SLOTS) {
      entries.push({
        dayOfWeek: day,
        dayType: defaultDayTypeFor(day),
        slot,
        mealSlug: null,
        servings: 1,
      });
    }
  }
  return { weekStart, entries, groceryChecked: {} };
}

export function defaultDayTypeFor(day: number): "school" | "training" | "match" | "rest" {
  if (day === 0) return "rest";
  if (day === 6) return "match";
  if (day === 2 || day === 4) return "training";
  return "school";
}
