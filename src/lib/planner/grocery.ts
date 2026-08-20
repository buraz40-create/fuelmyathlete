import type {
  GroceryLineItem,
  GroceryListByCategory,
  IngredientCategory,
  IngredientUnit,
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

// athleteScale comes from portionScale(profile): 1.0 for children, and weight-based from 13
// up. It was computed and shown on the landing page while the real grocery math ignored it,
// which is how the site ended up claiming portions scale by body weight when they did not.
export function aggregateGrocery(plan: MealPlan, athleteScale = 1): GroceryListByCategory {
  const totals = new Map<
    string,
    { quantity: number; fromMeals: Set<string> }
  >();

  for (const entry of plan.entries) {
    if (!entry.mealSlug) continue;
    const meal = MEALS_BY_SLUG[entry.mealSlug];
    if (!meal) continue;
    const portion = DAY_TYPES[entry.dayType].portionMultiplier * entry.servings * athleteScale;

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

// Raw totals are fine for math and useless in an aisle. Nobody buys 9.36 garlic cloves
// or 3.68 lb of chicken, so counts round up to whole units and weights and volumes round
// to the quarter a package or a measuring cup actually comes in.
const FRACTIONS: Record<string, string> = {
  "0.25": "1/4",
  "0.5": "1/2",
  "0.75": "3/4",
};

function toQuarter(n: number): number {
  return Math.max(0.25, Math.round(n * 4) / 4);
}

function withFraction(n: number): string {
  const whole = Math.floor(n);
  const part = Math.round((n - whole) * 100) / 100;
  const frac = FRACTIONS[String(part)];
  if (!frac) return String(whole || n);
  return whole === 0 ? frac : `${whole} ${frac}`;
}

// Teaspoons and tablespoons are seasonings and oils. Telling a parent to buy 2.4 tsp of
// sesame oil every week is noise, so these become a pantry check instead of a quantity.
export function isPantryCheck(unit: IngredientUnit): boolean {
  return unit === "tsp" || unit === "tbsp";
}

export function formatShoppingQuantity(quantity: number, unit: IngredientUnit): string {
  if (isPantryCheck(unit)) return "check pantry";
  if (unit === "each") return String(Math.max(1, Math.ceil(quantity)));
  if (unit === "oz") return `${Math.max(1, Math.round(quantity))} oz`;
  const rounded = toQuarter(quantity);
  if (unit === "lb") return `${withFraction(rounded)} lb`;
  return `${withFraction(rounded)} ${rounded <= 1 ? "cup" : "cups"}`;
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
