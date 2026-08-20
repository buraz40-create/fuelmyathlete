export type MealSlot = "breakfast" | "lunch" | "snack" | "dinner";
export type DayType = "school" | "training" | "match" | "rest";

export type Sex = "male" | "female";
export type AgeCohort = "child" | "teen" | "adult";
export type ActivityLevel = "light" | "moderate" | "heavy";

export interface PlayerProfile {
  name: string;
  ageYears: number;
  // Optional on purpose. Nothing in the child cohort reads it: the hydration baseline is
  // flat and portionScale returns 1.0, so asking a parent to weigh an 11-year-old buys
  // nothing and costs the hardest step in onboarding.
  weightLb?: number;
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

export interface NutritionFacts {
  kcal: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  fiberG?: number;
  source?: string;
}

// The US top-9 plus soy, which is separate here because the food rules already draw a line
// between processed soy and whole edamame.
export type Allergen =
  | "peanut"
  | "tree-nut"
  | "dairy"
  | "egg"
  | "gluten"
  | "fish"
  | "shellfish"
  | "sesame"
  | "soy";

export interface Meal {
  slug: string;
  name: string;
  slot: MealSlot;
  description: string;
  prepMinutes: number;
  suitableFor: DayType[];
  kidRating: number;
  // Optional on purpose. A wrong photo is worse than no photo on a site whose pitch is that
  // someone checked this for your kid, and FoodImage renders a slot-coloured tile instead.
  imageUrl?: string;
  recipeSlug?: string;
  ingredients: MealIngredient[];
  tags?: string[];
  nutrition?: NutritionFacts;
}

export interface RecipeStep {
  order: number;
  title: string;
  body: string;
  timerSec?: number;
  mistake?: string;
}

export interface ProteinBoost {
  description: string;
  addedProteinG: number;
  addedKcal: number;
  note?: string;
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
  equipment?: string[];
  proteinBoost?: ProteinBoost;
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
  // Set on every save. Without it there is no way to tell a stale server copy from a fresh
  // one, which is why remote used to overwrite local unconditionally.
  updatedAt?: string;
}

export interface GroceryLineItem {
  ingredient: Ingredient;
  totalQuantity: number;
  fromMeals: string[];
}

export type GroceryListByCategory = Record<IngredientCategory, GroceryLineItem[]>;

export interface Citation {
  id: string;
  authors?: string;
  title: string;
  publisher: string;
  year?: number;
  url: string;
}

export interface GuideSection {
  id: string;
  heading: string;
  body: React.ReactNode;
}

export interface GuideFaqItem {
  question: string;
  answer: string;
}

export interface GuideHowToStep {
  name: string;
  text: string;
}

export interface Guide {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  category: "pre-workout" | "post-workout" | "match-day" | "youth-nutrition" | "hydration";
  publishedAt: string;
  updatedAt: string;
  answer: string;
  sections: GuideSection[];
  faq: GuideFaqItem[];
  howTo?: {
    name: string;
    description: string;
    steps: GuideHowToStep[];
  };
  citations: Citation[];
  relatedRecipes: string[];
  relatedGuides: string[];
  readMinutes: number;
}
