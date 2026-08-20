// Relative with the .ts extension, not the "@/" alias, because this module is imported by a
// node --test suite and node resolves ESM specifiers literally: no tsconfig paths, no
// extensionless files. Type-only imports are erased before node sees them and keep the alias.
import { MEALS, MEALS_BY_SLOT, MEALS_BY_SLUG } from "../../data/meals.ts";
import { INGREDIENT_BY_SLUG } from "../../data/ingredients.ts";
import type { Ingredient, Meal, MealSlot } from "@/types/domain";
import type { ImportedRecipe } from "@/lib/import/storage";

// One place that answers "what meals exist" and "what ingredients exist".
//
// Before this, MEALS_BY_SLUG was static-imported at seven call sites and every one of them
// treated an unrecognised slug as nothing: aggregateGrocery does `if (!meal) continue`,
// MealSlotCard renders an empty slot. So a recipe a parent typed in by hand was invisible to
// the planner no matter how well it parsed, and its ingredients were silently absent from the
// shopping list. A resolver that merges the curated catalog with the parent's own imports is
// what makes an import a planner citizen rather than a stored note.

/** The parent's imports, in the shape the rest of the app already understands. */
export interface CustomCatalog {
  meals: Meal[];
  mealBySlug: Record<string, Meal>;
  ingredientBySlug: Record<string, Ingredient>;
}

export const EMPTY_CATALOG: CustomCatalog = {
  meals: [],
  mealBySlug: {},
  ingredientBySlug: {},
};

/**
 * Turns a saved import into a Meal.
 *
 * Two fields are deliberately left off. There is no `nutrition`, because we do not know it
 * and estimating macros for a children's nutrition site would be inventing exactly the kind
 * of number this whole feature refuses to invent. And there is no `imageUrl`, so FoodImage
 * draws its emoji tile: we never copy anyone's photograph.
 */
export function importedToMeal(rec: ImportedRecipe): Meal {
  return {
    slug: rec.id,
    name: rec.name,
    slot: rec.slot,
    description: rec.source.url ? `Your recipe, from ${hostOf(rec.source.url)}.` : "Your recipe.",
    prepMinutes: rec.totalMinutes ?? 0,
    suitableFor: rec.suitableFor,
    // Not a judgement of the food, just a neutral default. The parent chose to add it.
    kidRating: 3,
    ingredients: rec.ingredients
      // An amount is required before saving, so this should not fire. If a record from an
      // older or hand-edited store slips through, drop the line rather than shopping for NaN.
      .filter((i) => typeof i.quantity === "number")
      .map((i) => ({ ingredientSlug: i.ingredientSlug, quantity: i.quantity as number })),
    tags: ["yours"],
  };
}

function hostOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "a link you saved";
  }
}

export function buildCustomCatalog(imports: ImportedRecipe[]): CustomCatalog {
  const meals = imports.map(importedToMeal);
  const mealBySlug: Record<string, Meal> = {};
  const ingredientBySlug: Record<string, Ingredient> = {};

  for (const meal of meals) mealBySlug[meal.slug] = meal;
  for (const rec of imports) {
    for (const ing of rec.customIngredients) ingredientBySlug[ing.slug] = ing;
  }

  return { meals, mealBySlug, ingredientBySlug };
}

/** The curated catalog first, then the parent's own. Curated slugs always win a collision. */
export function resolveMeal(slug: string, custom: CustomCatalog = EMPTY_CATALOG): Meal | undefined {
  return MEALS_BY_SLUG[slug] ?? custom.mealBySlug[slug];
}

export function resolveIngredient(
  slug: string,
  custom: CustomCatalog = EMPTY_CATALOG
): Ingredient | undefined {
  return INGREDIENT_BY_SLUG[slug] ?? custom.ingredientBySlug[slug];
}

/** Everything that can fill a given slot, the parent's own imports included. */
export function mealsForSlot(slot: MealSlot, custom: CustomCatalog = EMPTY_CATALOG): Meal[] {
  const mine = custom.meals.filter((m) => m.slot === slot);
  // The parent's own recipes come first. They added them on purpose, so making them scroll
  // past twenty curated meals to find one would be backwards.
  return [...mine, ...MEALS_BY_SLOT[slot]];
}

export function allMeals(custom: CustomCatalog = EMPTY_CATALOG): Meal[] {
  return [...custom.meals, ...MEALS];
}

/** True for a meal the parent imported rather than one we curated. */
export function isCustomMeal(slug: string, custom: CustomCatalog = EMPTY_CATALOG): boolean {
  return !MEALS_BY_SLUG[slug] && Boolean(custom.mealBySlug[slug]);
}
