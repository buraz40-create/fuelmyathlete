import Image from "next/image";
import Link from "next/link";
import { ArrowsClockwise, Clock, Users } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";
import { FoodImage } from "@/components/food/FoodImage";
import { StarRating } from "@/components/food/StarRating";
import { MEALS } from "@/data/meals";
import type { MealSlot, Recipe } from "@/types/domain";

const SLOT_DOT: Record<MealSlot, string> = {
  breakfast: "bg-meal-breakfast",
  lunch: "bg-meal-lunch",
  snack: "bg-meal-snack",
  dinner: "bg-meal-dinner",
};

const SLOT_LABEL: Record<MealSlot, string> = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  snack: "Snack",
  dinner: "Dinner",
};

export function RecipeCard({
  recipe,
  /**
   * Position in the grid. The first row loads eagerly.
   *
   * Every card was lazy, and this grid starts about 650px down the page behind a header and a
   * callout, so a visitor landed on a screen of empty boxes and had to scroll before anything
   * appeared. Lazy loading is right for card 40; it is wrong for the ones already on screen.
   */
  index = 0,
}: {
  recipe: Recipe;
  index?: number;
}) {
  const slot = recipe.slot;
  const aboveTheFold = index < 6;

  // The rating lives on the meal, not the recipe. Same lookup as the recipe page, including the
  // fallback for the seven where the meal and the recipe share a slug and nothing points one at
  // the other.
  //
  // This grid is where you actually browse all 64, and it was the one surface with no rating on
  // it at all: the stars existed on the recipe page, in the meal picker and on the planner slot,
  // but not here. Read-only, because the whole card is a link and a tappable star inside it
  // would fight the navigation.
  const meal =
    MEALS.find((m) => m.recipeSlug === recipe.slug) ?? MEALS.find((m) => m.slug === recipe.slug);
  return (
    <Link
      href={`/recipe/${recipe.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      {recipe.imageUrl ? (
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
          <Image
            src={recipe.imageUrl}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-105"
            priority={aboveTheFold}
            loading={aboveTheFold ? "eager" : "lazy"}
            // Deliberately NOT unoptimized here, unlike the other image call sites. This grid
            // shows two dozen cards at once, and the images it now serves are locally hosted
            // 800px files rather than Pexels URLs that arrive pre-sized. Letting Next resize
            // and serve webp turns roughly 2 MB of index page into a fraction of it, which
            // matters most on a phone in a car park before practice.
          />
        </div>
      ) : (
        <FoodImage
          slug={recipe.slug}
          slot={recipe.slot}
          aspect="aspect-[4/3]"
          emojiSize="text-7xl md:text-8xl"
        />
      )}
      <div className="flex flex-1 flex-col p-4 md:p-5">
        <div className="flex flex-wrap items-center gap-2">
          {slot && (
            <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              <span className={cn("h-2 w-2 rounded-full", SLOT_DOT[slot])} />
              {SLOT_LABEL[slot]}
            </span>
          )}
          {/* The answer to "what do I cook on Sunday" belongs on the card, not three clicks
              in. Until now only the hibachi recipe said it, and it said it in prose. */}
          {recipe.prepAhead && (
            <span className="inline-flex items-center gap-1 rounded-full bg-primary-soft px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
              <ArrowsClockwise size={10} weight="bold" aria-hidden />
              Preps ahead
            </span>
          )}
        </div>
        <h3 className="mt-1.5 text-base font-semibold leading-snug text-ink md:text-lg">
          {recipe.name}
        </h3>
        {meal && (
          <div className="mt-1.5">
            <StarRating slug={meal.slug} fallback={meal.kidRating} size={13} readOnly />
          </div>
        )}
        {recipe.whenToEat && (
          <p className="mt-2 text-xs leading-snug text-muted-foreground line-clamp-2">
            {recipe.whenToEat}
          </p>
        )}
        <dl className="mt-auto flex items-center gap-3 pt-3 text-[11px] text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock size={12} weight="duotone" aria-hidden />
            <span>{recipe.totalMinutes} min</span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={12} weight="duotone" aria-hidden />
            <span>
              {recipe.servings} {recipe.servings === 1 ? "serving" : "servings"}
            </span>
          </div>
        </dl>
      </div>
    </Link>
  );
}
