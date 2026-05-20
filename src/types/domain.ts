export type MealSlot = "breakfast" | "lunch" | "snack" | "dinner";
export type DayType = "school" | "training" | "match" | "rest";

export type Sex = "male" | "female";
export type AgeCohort = "child" | "teen" | "adult";
export type ActivityLevel = "light" | "moderate" | "heavy";

export interface PlayerProfile {
  name: string;
  ageYears: number;
  weightLb: number;
  sex?: Sex;
  heightIn?: number;
  sport?: string;
  activityLevel?: ActivityLevel;
  parentShowCaloriesToTeen?: boolean;
  createdAt: string;
  updatedAt: string;
}
export type IngredientCategory =
  | "produce"
  | "protein"
  | "pantry"
  | "dairy"
  | "frozen"
  | "bakery"
  | "beverages";
export type IngredientUnit = "lb" | "oz" | "cup" | "tbsp" | "tsp" | "each";

export interface Ingredient {
  slug: string;
  name: string;
  category: IngredientCategory;
  unit: IngredientUnit;
}

export interface MealIngredient {
  ingredientSlug: string;
  quantity: number;
  notes?: string;
}

export interface Meal {
  slug: string;
  name: string;
  slot: MealSlot;
  description: string;
  prepMinutes: number;
  suitableFor: DayType[];
  kidRating: number;
  imageUrl: string;
  recipeSlug?: string;
  ingredients: MealIngredient[];
  tags?: string[];
}

export interface RecipeStep {
  order: number;
  title: string;
  body: string;
  timerSec?: number;
}

export interface Recipe {
  slug: string;
  name: string;
  servings: number;
  totalMinutes: number;
  steps: RecipeStep[];
  notes?: string[];
  whenToEat?: string;
  slot?: MealSlot;
  imageUrl?: string;
}

export interface DayTypeConfig {
  key: DayType;
  label: string;
  emoji: string;
  description: string;
  portionMultiplier: number;
  sauceOz: number;
  hydrationOzPerHour: number;
  tokenClass: string;
}

export interface NutritionCard {
  slug: string;
  title: string;
  body: string;
  appliesTo: DayType[];
  emoji: string;
}

export interface MealPlanEntry {
  dayOfWeek: number;
  dayType: DayType;
  slot: MealSlot;
  mealSlug: string | null;
  servings: number;
}

export interface MealPlan {
  weekStart: string;
  entries: MealPlanEntry[];
  groceryChecked: Record<string, boolean>;
}

export interface GroceryLineItem {
  ingredient: Ingredient;
  totalQuantity: number;
  fromMeals: string[];
}

export type GroceryListByCategory = Record<IngredientCategory, GroceryLineItem[]>;
