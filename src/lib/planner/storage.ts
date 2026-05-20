import type { MealPlan } from "@/types/domain";
import { emptyPlan } from "./empty-plan";

const STORAGE_PREFIX = "fma:plan:";

export { emptyPlan };

function key(weekStart: string): string {
  return `${STORAGE_PREFIX}${weekStart}`;
}

export const planStorage = {
  loadPlan(weekStart: string): MealPlan {
    if (typeof window === "undefined") return emptyPlan(weekStart);
    try {
      const raw = window.localStorage.getItem(key(weekStart));
      if (!raw) return emptyPlan(weekStart);
      const parsed = JSON.parse(raw) as MealPlan;
      if (!parsed.entries || parsed.entries.length !== 28) return emptyPlan(weekStart);
      return { ...parsed, groceryChecked: parsed.groceryChecked ?? {} };
    } catch {
      return emptyPlan(weekStart);
    }
  },

  savePlan(plan: MealPlan): void {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(key(plan.weekStart), JSON.stringify(plan));
    } catch {
      // Storage full or blocked: fail silently. UI state remains correct.
    }
  },

  clearPlan(weekStart: string): void {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(key(weekStart));
  },
};
