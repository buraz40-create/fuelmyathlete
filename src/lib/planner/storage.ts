import type { MealPlan, MealPlanEntry } from "@/types/domain";
import { emptyPlan } from "./empty-plan";
import { MEAL_SLOTS } from "@/data/dayTypes";

const STORAGE_PREFIX = "fma:plan:";

// Bump when the persisted shape changes in a way repair() cannot infer.
const SCHEMA_VERSION = 1;

export { emptyPlan };

function key(weekStart: string): string {
  return `${STORAGE_PREFIX}${weekStart}`;
}

// A stored plan used to be discarded outright unless it held exactly 28 entries, which
// meant the day the slot count ever changed, every parent silently lost their week.
// Repair instead: keep every entry that still maps to a real day and slot, fill the gaps
// from a fresh plan, and drop anything unrecognized.
const KNOWN_SLOTS = new Set(MEAL_SLOTS.map((s) => s.slot));

function repair(parsed: Partial<MealPlan>, weekStart: string): MealPlan {
  const base = emptyPlan(weekStart);
  const stored = Array.isArray(parsed.entries) ? parsed.entries : [];

  const byCell = new Map<string, MealPlanEntry>();
  for (const e of stored) {
    if (!e || typeof e.dayOfWeek !== "number" || e.dayOfWeek < 0 || e.dayOfWeek > 6) continue;
    if (!KNOWN_SLOTS.has(e.slot)) continue;
    byCell.set(`${e.dayOfWeek}:${e.slot}`, e);
  }

  return {
    ...base,
    ...parsed,
    weekStart,
    entries: base.entries.map((fresh) => {
      const found = byCell.get(`${fresh.dayOfWeek}:${fresh.slot}`);
      if (!found) return fresh;
      return {
        ...fresh,
        mealSlug: typeof found.mealSlug === "string" ? found.mealSlug : null,
        dayType: found.dayType ?? fresh.dayType,
        servings: typeof found.servings === "number" ? found.servings : fresh.servings,
      };
    }),
    groceryChecked: parsed.groceryChecked ?? {},
  };
}

export const planStorage = {
  loadPlan(weekStart: string): MealPlan {
    if (typeof window === "undefined") return emptyPlan(weekStart);
    try {
      const raw = window.localStorage.getItem(key(weekStart));
      if (!raw) return emptyPlan(weekStart);
      return repair(JSON.parse(raw) as Partial<MealPlan>, weekStart);
    } catch {
      return emptyPlan(weekStart);
    }
  },

  savePlan(plan: MealPlan): void {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(
        key(plan.weekStart),
        JSON.stringify({ ...plan, schemaVersion: SCHEMA_VERSION })
      );
    } catch {
      // Storage full or blocked: fail silently. UI state remains correct.
    }
  },

  clearPlan(weekStart: string): void {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(key(weekStart));
  },

  hasPlan(weekStart: string): boolean {
    if (typeof window === "undefined") return false;
    const raw = window.localStorage.getItem(key(weekStart));
    if (!raw) return false;
    try {
      const parsed = JSON.parse(raw) as Partial<MealPlan>;
      return Boolean(parsed.entries?.some((e) => e?.mealSlug));
    } catch {
      return false;
    }
  },
};
