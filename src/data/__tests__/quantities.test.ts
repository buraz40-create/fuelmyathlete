import { test } from "node:test";
import assert from "node:assert/strict";
import { MEALS } from "../meals.ts";
import { INGREDIENTS } from "../ingredients.ts";
import type { IngredientUnit } from "../../types/domain.ts";

// Guards the bug that keeps happening: a per-serving quantity written as if the ingredient
// were measured in a different unit.
//
// It has now shipped three times. Hibachi carried 0.4 lb of chicken per serving against a
// recipe making 2 lb across 8, so every grocery list over-bought the week's main protein by
// 60%. Then ground turkey was written as 4, meaning 4 oz, on an ingredient measured in POUNDS,
// which put 16 lb of turkey on the list for a meal that uses 1. Then pasta was written as 1
// on an ingredient measured in OUNCES, which fed four people a quarter of a serving.
//
// Nobody notices a wrong number on a shopping list until they are standing in the shop, so
// this is checked rather than reviewed.

const UNIT_BY_SLUG = new Map(INGREDIENTS.map((i) => [i.slug, i.unit]));

/**
 * The most any single serving could plausibly need, per unit.
 *
 * Deliberately loose. This is not trying to police recipe design, only to catch a quantity
 * that is wrong by a factor rather than a little generous. Any real per-serving amount sits
 * far below these.
 */
const MAX_PER_SERVING: Record<IngredientUnit, number> = {
  lb: 1,
  oz: 16,
  cup: 4,
  tbsp: 8,
  tsp: 8,
  each: 6,
};

test("every meal ingredient resolves to a real catalog ingredient", () => {
  for (const meal of MEALS) {
    for (const mi of meal.ingredients) {
      assert.ok(
        UNIT_BY_SLUG.has(mi.ingredientSlug),
        `${meal.slug} references unknown ingredient "${mi.ingredientSlug}"`
      );
    }
  }
});

test("no per-serving quantity is wrong by a whole unit", () => {
  const bad: string[] = [];
  for (const meal of MEALS) {
    for (const mi of meal.ingredients) {
      const unit = UNIT_BY_SLUG.get(mi.ingredientSlug);
      if (!unit) continue;
      const max = MAX_PER_SERVING[unit];
      if (mi.quantity > max) {
        bad.push(
          `${meal.slug}: ${mi.ingredientSlug} is ${mi.quantity} ${unit} per serving, ` +
            `over the ${max} ${unit} ceiling. Written for a different unit?`
        );
      }
    }
  }
  assert.deepEqual(bad, [], bad.join("\n"));
});

test("no quantity is zero or negative", () => {
  for (const meal of MEALS) {
    for (const mi of meal.ingredients) {
      assert.ok(
        mi.quantity > 0,
        `${meal.slug}: ${mi.ingredientSlug} has a quantity of ${mi.quantity}`
      );
    }
  }
});

test("a serving of protein is a serving, not a catering order", () => {
  // Tighter bound on the expensive things, where a factor error costs real money every week
  // and is the least likely to be spotted by eye.
  const PROTEIN = ["chicken-breast", "ground-turkey", "salmon", "deli-turkey"];
  for (const meal of MEALS) {
    for (const mi of meal.ingredients) {
      if (!PROTEIN.includes(mi.ingredientSlug)) continue;
      const unit = UNIT_BY_SLUG.get(mi.ingredientSlug);
      if (unit !== "lb") continue;
      assert.ok(
        mi.quantity <= 0.6,
        `${meal.slug}: ${mi.quantity} lb of ${mi.ingredientSlug} per serving is more than ` +
          `half a pound of meat for one person`
      );
    }
  }
});
