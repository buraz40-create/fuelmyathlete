import assert from "node:assert/strict";
import test from "node:test";
import type { MealPlan, MealSlot } from "../../../types/domain.ts";
import { mergePlans } from "../merge.ts";

// Run with: node --test src/lib/planner/__tests__/merge.test.ts
// These cases are the ones that actually bit: a stale server copy used to overwrite local
// work wholesale, because remote always won and updated_at was never written.

const SLOTS: MealSlot[] = ["breakfast", "lunch", "snack", "dinner"];

function plan(
  picks: Record<string, string>,
  updatedAt?: string,
  groceryChecked: Record<string, boolean> = {}
): MealPlan {
  const entries = [];
  for (let day = 0; day < 7; day++) {
    for (const slot of SLOTS) {
      entries.push({
        dayOfWeek: day,
        slot,
        dayType: "school" as const,
        mealSlug: picks[`${day}:${slot}`] ?? null,
        servings: 1,
      });
    }
  }
  return { weekStart: "2026-08-16", entries, groceryChecked, updatedAt };
}

const pick = (p: MealPlan, day: number, slot: MealSlot) =>
  p.entries.find((e) => e.dayOfWeek === day && e.slot === slot)?.mealSlug ?? null;

test("two parents editing different days both keep their work", () => {
  const merged = mergePlans(
    plan({ "1:lunch": "hibachi" }, "2026-08-19T10:00:00Z"),
    plan({ "3:dinner": "salmon" }, "2026-08-19T11:00:00Z")
  );
  assert.equal(pick(merged, 1, "lunch"), "hibachi");
  assert.equal(pick(merged, 3, "dinner"), "salmon");
});

test("the newer side wins a genuine conflict in one cell", () => {
  const remoteNewer = mergePlans(
    plan({ "1:lunch": "old" }, "2026-08-19T10:00:00Z"),
    plan({ "1:lunch": "new" }, "2026-08-19T12:00:00Z")
  );
  assert.equal(pick(remoteNewer, 1, "lunch"), "new");

  const localNewer = mergePlans(
    plan({ "1:lunch": "local" }, "2026-08-19T13:00:00Z"),
    plan({ "1:lunch": "remote" }, "2026-08-19T09:00:00Z")
  );
  assert.equal(pick(localNewer, 1, "lunch"), "local");
});

test("an empty cell never blanks a filled one, even from a newer copy", () => {
  const local = plan({ "0:breakfast": "eggs" }, "2026-08-19T14:00:00Z");
  assert.equal(pick(mergePlans(local, plan({}, "2026-08-18T09:00:00Z")), 0, "breakfast"), "eggs");
  assert.equal(pick(mergePlans(local, plan({}, "2026-08-20T09:00:00Z")), 0, "breakfast"), "eggs");
});

test("missing timestamps do not throw or lose the local pick", () => {
  const merged = mergePlans(plan({ "1:lunch": "x" }), plan({}));
  assert.equal(pick(merged, 1, "lunch"), "x");
});

test("grocery ticks from both sides survive", () => {
  const merged = mergePlans(
    plan({}, "2026-08-19T10:00:00Z", { eggs: true }),
    plan({}, "2026-08-19T11:00:00Z", { milk: true })
  );
  assert.equal(merged.groceryChecked.eggs, true);
  assert.equal(merged.groceryChecked.milk, true);
});
