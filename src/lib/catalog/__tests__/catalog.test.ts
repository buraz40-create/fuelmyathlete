import { test } from "node:test";
import assert from "node:assert/strict";
import {
  EMPTY_CATALOG,
  allMeals,
  buildCustomCatalog,
  importedToMeal,
  isCustomMeal,
  mealsForSlot,
  resolveIngredient,
  resolveMeal,
} from "../index.ts";
import type { ImportedRecipe } from "../../import/storage.ts";

// The resolver is load-bearing for seven call sites. When it returns nothing, the planner
// renders an empty slot and aggregateGrocery skips the ingredient, both silently. So the
// tests that matter here are the ones about NOT losing things.

function makeImport(over: Partial<ImportedRecipe> = {}): ImportedRecipe {
  return {
    version: 1,
    id: "abc12345",
    name: "Grandma's chicken",
    slot: "dinner",
    suitableFor: ["school", "training", "match", "rest"],
    servings: 4,
    totalMinutes: 30,
    ingredients: [
      { ingredientSlug: "chicken-breast", quantity: 0.25, raw: "1 lb chicken breast" },
      { ingredientSlug: "custom:xyz", quantity: 1, raw: "1 tbsp tahini" },
    ],
    steps: ["Cook it."],
    customIngredients: [
      { slug: "custom:xyz", name: "Tahini", category: "pantry", unit: "tbsp" },
    ],
    source: { kind: "text", importedAt: "2026-08-20T00:00:00.000Z" },
    unresolved: [],
    ...over,
  };
}

test("a curated meal resolves with no custom catalog at all", () => {
  const meal = resolveMeal("turkey-wrap");
  assert.equal(meal?.slug, "turkey-wrap");
});

test("an imported meal resolves once its catalog is passed", () => {
  const custom = buildCustomCatalog([makeImport()]);
  assert.equal(resolveMeal("abc12345", custom)?.name, "Grandma's chicken");
  // And is invisible without it, which is the bug this whole module exists to fix.
  assert.equal(resolveMeal("abc12345"), undefined);
});

test("a curated slug wins a collision with an imported one", () => {
  // An import cannot shadow a vetted meal, however it was named or whatever id it got.
  const custom = buildCustomCatalog([makeImport({ id: "turkey-wrap", name: "Not ours" })]);
  assert.equal(resolveMeal("turkey-wrap", custom)?.name, "Turkey + cheese whole-grain wrap");
});

test("custom ingredients resolve, and catalog ones still do", () => {
  const custom = buildCustomCatalog([makeImport()]);
  assert.equal(resolveIngredient("custom:xyz", custom)?.name, "Tahini");
  assert.equal(resolveIngredient("chicken-breast", custom)?.slug, "chicken-breast");
  assert.equal(resolveIngredient("custom:xyz"), undefined);
});

test("the parent's own recipes come first in the slot list", () => {
  const custom = buildCustomCatalog([makeImport()]);
  const dinners = mealsForSlot("dinner", custom);
  assert.equal(dinners[0].slug, "abc12345");
  assert.ok(dinners.length > 1, "curated dinners must still be there");
});

test("an import only appears in its own slot", () => {
  const custom = buildCustomCatalog([makeImport({ slot: "dinner" })]);
  assert.ok(!mealsForSlot("breakfast", custom).some((m) => m.slug === "abc12345"));
  assert.ok(mealsForSlot("dinner", custom).some((m) => m.slug === "abc12345"));
});

test("an imported meal carries no nutrition and no photograph", () => {
  // Both omissions are deliberate. Estimated macros on a children's nutrition site would be
  // inventing a number, and we never copy anyone's image.
  const meal = importedToMeal(makeImport());
  assert.equal(meal.nutrition, undefined);
  assert.equal(meal.imageUrl, undefined);
});

test("an ingredient with no amount is dropped rather than shopped for as NaN", () => {
  const rec = makeImport();
  // Simulates a hand-edited or older store; the UI will not save one of these.
  (rec.ingredients[0] as { quantity: number | null }).quantity = null;
  const meal = importedToMeal(rec);
  assert.equal(meal.ingredients.length, 1);
  assert.ok(meal.ingredients.every((i) => Number.isFinite(i.quantity)));
});

test("the source host is shown when there is one, and never throws on a bad url", () => {
  assert.match(
    importedToMeal(makeImport({ source: { kind: "url", url: "https://www.budgetbytes.com/x", importedAt: "" } })).description,
    /budgetbytes\.com/
  );
  assert.doesNotThrow(() =>
    importedToMeal(makeImport({ source: { kind: "url", url: "not a url", importedAt: "" } }))
  );
});

test("isCustomMeal separates the parent's from ours", () => {
  const custom = buildCustomCatalog([makeImport()]);
  assert.equal(isCustomMeal("abc12345", custom), true);
  assert.equal(isCustomMeal("turkey-wrap", custom), false);
  assert.equal(isCustomMeal("abc12345"), false, "unknown without its catalog");
});

test("an empty catalog changes nothing", () => {
  const before = allMeals().length;
  assert.equal(allMeals(EMPTY_CATALOG).length, before);
  assert.equal(mealsForSlot("dinner", EMPTY_CATALOG).length, mealsForSlot("dinner").length);
});

test("several imports all survive the merge", () => {
  const custom = buildCustomCatalog([
    makeImport({ id: "one", name: "One" }),
    makeImport({ id: "two", name: "Two" }),
    makeImport({ id: "three", name: "Three", slot: "lunch" }),
  ]);
  assert.equal(custom.meals.length, 3);
  assert.equal(resolveMeal("two", custom)?.name, "Two");
  assert.equal(mealsForSlot("lunch", custom)[0].slug, "three");
});
