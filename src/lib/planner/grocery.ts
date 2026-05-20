import type {
  GroceryLineItem,
  GroceryListByCategory,
  IngredientCategory,
  MealPlan,
} from "@/types/domain";
import { INGREDIENT_BY_SLUG } from "@/data/ingredients";
import { MEALS_BY_SLUG } from "@/data/meals";
import { DAY_TYPES } from "@/data/dayTypes";

const CATEGORY_ORDER: IngredientCategory[] = [
  "produce",
  "protein",
  "dairy",
  "bakery",
  "pantry",
  "frozen",
  "beverages",
];

export function aggregateGrocery(plan: MealPlan): GroceryListByCategory {
  const totals = new Map<
    string,
    { quantity: number; fromMeals: Set<string> }
  >();

  for (const entry of plan.entries) {
    if (!entry.mealSlug) continue;
    const meal = MEALS_BY_SLUG[entry.mealSlug];
    if (!meal) continue;
    const portion = DAY_TYPES[entry.dayType].portionMultiplier * entry.servings;

    for (const mi of meal.ingredients) {
      const current = totals.get(mi.ingredientSlug) ?? {
        quantity: 0,
        fromMeals: new Set<string>(),
      };
      current.quantity += mi.quantity * portion;
      current.fromMeals.add(meal.name);
      totals.set(mi.ingredientSlug, current);
    }
  }

  const grouped: GroceryListByCategory = {
    produce: [],
    protein: [],
    pantry: [],
    dairy: [],
    frozen: [],
    bakery: [],
    beverages: [],
  };

  for (const [slug, { quantity, fromMeals }] of totals.entries()) {
    const ingredient = INGREDIENT_BY_SLUG[slug];
    if (!ingredient) continue;
    const line: GroceryLineItem = {
      ingredient,
      totalQuantity: Math.round(quantity * 100) / 100,
      fromMeals: Array.from(fromMeals),
    };
    grouped[ingredient.category].push(line);
  }

  for (const cat of CATEGORY_ORDER) {
    grouped[cat].sort((a, b) => a.ingredient.name.localeCompare(b.ingredient.name));
  }

  return grouped;
}

export function totalGroceryItems(grouped: GroceryListByCategory): number {
  return Object.values(grouped).reduce((acc, items) => acc + items.length, 0);
}

export const GROCERY_CATEGORY_ORDER = CATEGORY_ORDER;

export const GROCERY_CATEGORY_LABEL: Record<IngredientCategory, string> = {
  produce: "Produce",
  protein: "Protein",
  dairy: "Dairy",
  bakery: "Bakery",
  pantry: "Pantry",
  frozen: "Frozen",
  beverages: "Beverages",
};
