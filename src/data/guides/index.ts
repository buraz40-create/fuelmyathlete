import type { Guide } from "@/types/domain";
import { guide as preWorkoutMealOatmeal } from "./pre-workout-meal-oatmeal";
import { guide as isOatmealAGoodPreWorkoutMeal } from "./is-oatmeal-a-good-pre-workout-meal";
import { guide as whatIsAGoodPreWorkoutMeal } from "./what-is-a-good-pre-workout-meal";
import { guide as bestPreWorkoutMeal } from "./best-pre-workout-meal";
import { guide as amPreWorkoutMeal } from "./am-pre-workout-meal";
import { guide as preGameMealForKids } from "./pre-game-meal-for-kids";
import { guide as whatToEatBeforeASoccerGame } from "./what-to-eat-before-a-soccer-game";
import { guide as carbLoadingMealPlan } from "./carb-loading-meal-plan";
import { guide as youthHydration } from "./how-much-water-should-a-young-athlete-drink";
import { guide as postGameRecovery } from "./what-to-eat-after-a-soccer-game";
import { guide as tournamentPacking } from "./what-to-pack-for-a-soccer-tournament";
import { guide as afterSchoolSnack } from "./after-school-snack-before-practice";

export const GUIDES: Guide[] = [
  preWorkoutMealOatmeal,
  isOatmealAGoodPreWorkoutMeal,
  whatIsAGoodPreWorkoutMeal,
  bestPreWorkoutMeal,
  amPreWorkoutMeal,
  preGameMealForKids,
  whatToEatBeforeASoccerGame,
  carbLoadingMealPlan,
  youthHydration,
  postGameRecovery,
  tournamentPacking,
  afterSchoolSnack,
];

export const GUIDES_BY_SLUG: Record<string, Guide> = Object.fromEntries(
  GUIDES.map((g) => [g.slug, g])
);

export function getGuide(slug: string): Guide | undefined {
  return GUIDES_BY_SLUG[slug];
}

export function getRelatedGuides(slug: string): Guide[] {
  const guide = GUIDES_BY_SLUG[slug];
  if (!guide) return [];
  return guide.relatedGuides
    .map((s) => GUIDES_BY_SLUG[s])
    .filter((g): g is Guide => Boolean(g));
}

// Recipe pages had no way back into the guides, so three quarters of the site's URLs were
// link sinks. Derived from each guide's own relatedRecipes rather than hand-mapped onto the
// recipes, so the two can never disagree.
export function getGuidesForRecipe(
  recipeSlug: string
): { slug: string; title: string; answer: string }[] {
  return GUIDES.filter((g) => g.relatedRecipes.includes(recipeSlug)).map((g) => ({
    slug: g.slug,
    title: g.title,
    answer: g.answer,
  }));
}
