import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowsClockwise, ChefHat, Clock, CookingPot, Users } from "@phosphor-icons/react/dist/ssr";
import { AppShell } from "@/components/layout/AppShell";
import { RecipeSteps } from "@/components/recipe/RecipeSteps";
import { IngredientsList } from "@/components/recipe/IngredientsList";
import { AllergenLine } from "@/components/recipe/AllergenLine";
import { RelatedGuides } from "@/components/recipe/RelatedGuides";
import { NutritionCard } from "@/components/recipe/NutritionCard";
import { StarRating } from "@/components/food/StarRating";
import { ProteinBoostCard } from "@/components/recipe/ProteinBoostCard";
import { FoodImage } from "@/components/food/FoodImage";
import { RECIPES, RECIPES_BY_SLUG } from "@/data/recipes";
import { MEALS } from "@/data/meals";
import { INGREDIENT_BY_SLUG } from "@/data/ingredients";
import { allergensForIngredients } from "@/data/allergens";
import { getGuidesForRecipe } from "@/data/guides";
import { cn } from "@/lib/utils";
import type { MealSlot } from "@/types/domain";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://fuelmyathlete.com");

export function generateStaticParams() {
  return RECIPES.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const recipe = RECIPES_BY_SLUG[slug];
  if (!recipe) return {};
  const url = `${SITE_URL}/recipe/${recipe.slug}`;
  const title = `${recipe.name} Recipe: Athlete Portions & Nutrition (${recipe.totalMinutes}-Min)`;
  const description = recipe.whenToEat
    ? `${recipe.whenToEat} Full ingredient list, step-by-step, athlete-scaled portions, complete nutrition facts.`
    : `${recipe.name} recipe with step-by-step instructions, ingredient list, athlete-scaled portions, and full nutrition. ${recipe.totalMinutes}-minute prep, serves ${recipe.servings}.`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title,
      description,
      url,
      // Deliberately no images here. Setting them overrides the generated card in
      // opengraph-image.tsx, which is what this route should be sharing.
      //
      // The photographs are square, 800x800. A link preview wants 1200x630, so a square image
      // gets cropped to a band across the middle of the dish and carries no words at all. The
      // generated card is the right shape and puts the name, the time, the servings and the
      // protein next to the food, which is what makes a link worth forwarding into a team chat.
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

const SLOT_LABEL: Record<MealSlot, string> = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  snack: "Snack",
  dinner: "Dinner",
};

const SLOT_DOT: Record<MealSlot, string> = {
  breakfast: "bg-meal-breakfast",
  lunch: "bg-meal-lunch",
  snack: "bg-meal-snack",
  dinner: "bg-meal-dinner",
};

export default async function RecipePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const recipe = RECIPES_BY_SLUG[slug];
  if (!recipe) notFound();

  // The meal whose ingredients + nutrition belong to this recipe (matched by recipeSlug).
  // Most meals name their recipe through recipeSlug. Seven do not, because the meal and the
  // recipe share a slug and nothing ever pointed one at the other: hibachi-chicken-bowl,
  // hibachi-bowl-matchday, pre-match-plain-plate, tournament-sub, apple-cheddar-cubes,
  // cottage-berries and edamame-cup.
  //
  // Everything on this page that describes the food comes from the meal, so those seven were
  // rendering with no ingredients list, no nutrition block, no rating, and, worst of the four,
  // a Recipe structured-data object carrying "recipeIngredient": []. An empty ingredient list
  // is not a thin recipe, it is an invalid one, and Google was being handed seven of them.
  const linkedMeal =
    MEALS.find((m) => m.recipeSlug === recipe.slug) ?? MEALS.find((m) => m.slug === recipe.slug);
  const url = `${SITE_URL}/recipe/${recipe.slug}`;
  const orgId = `${SITE_URL}/#organization`;
  const personId = `${SITE_URL}/#editorial-team`;

  const recipeIngredientStrings = (linkedMeal?.ingredients ?? []).map((mi) => {
    const ing = INGREDIENT_BY_SLUG[mi.ingredientSlug];
    if (!ing) return `${mi.quantity} ${mi.ingredientSlug}`;
    return `${mi.quantity} ${ing.unit} ${ing.name}${mi.notes ? ` (${mi.notes})` : ""}`;
  });

  const keywords = [
    recipe.slot && `${recipe.slot} recipe`,
    linkedMeal?.tags?.join(", "),
    "athlete nutrition",
    "youth athlete meal",
    recipe.name.toLowerCase(),
  ]
    .filter(Boolean)
    .join(", ");

  const recipeJsonLd = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    "@id": `${url}#recipe`,
    name: recipe.name,
    description: recipe.whenToEat ?? `${recipe.name}: step-by-step recipe with athlete portions.`,
    image: recipe.imageUrl ? [recipe.imageUrl] : undefined,
    url,
    recipeYield: `${recipe.servings} servings`,
    totalTime: `PT${recipe.totalMinutes}M`,
    prepTime: `PT${Math.max(Math.floor(recipe.totalMinutes / 2), 1)}M`,
    cookTime: `PT${Math.max(Math.floor(recipe.totalMinutes / 2), 1)}M`,
    recipeCategory: recipe.slot ?? "meal",
    recipeCuisine: "American",
    keywords,
    recipeIngredient: recipeIngredientStrings,
    suitableForDiet: ["https://schema.org/LowFatDiet"],
    author: { "@id": personId },
    publisher: { "@id": orgId },
    datePublished: "2026-04-15",
    dateModified: "2026-05-21",
    nutrition: linkedMeal?.nutrition && {
      "@type": "NutritionInformation",
      calories: `${linkedMeal.nutrition.kcal} kcal`,
      proteinContent: `${linkedMeal.nutrition.proteinG} g`,
      carbohydrateContent: `${linkedMeal.nutrition.carbsG} g`,
      fatContent: `${linkedMeal.nutrition.fatG} g`,
      fiberContent: linkedMeal.nutrition.fiberG ? `${linkedMeal.nutrition.fiberG} g` : undefined,
      servingSize: `1 serving (yields ${recipe.servings})`,
    },
    recipeInstructions: recipe.steps.map((s) => ({
      "@type": "HowToStep",
      name: s.title,
      text: s.body,
      position: s.order,
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Recipes", item: `${SITE_URL}/recipes` },
      { "@type": "ListItem", position: 3, name: recipe.name, item: url },
    ],
  };

  return (
    <AppShell>
      <script
        id={`ld-recipe-${recipe.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(recipeJsonLd) }}
      />
      <script
        id={`ld-breadcrumb-${recipe.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <article className="mx-auto w-full max-w-5xl px-4 py-6 md:px-8 md:py-10">
        <Link
          href="/recipes"
          className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition hover:text-ink"
        >
          <ArrowLeft size={16} weight="bold" aria-hidden /> All recipes
        </Link>

        <header className="mb-8 overflow-hidden rounded-3xl border border-border bg-surface shadow-sm">
          {recipe.imageUrl ? (
            <div className="relative aspect-[16/9] w-full bg-muted">
              <Image
                src={recipe.imageUrl}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 1024px"
                className="object-cover"
                priority
                // Optimised now that this is a local file rather than a pre-sized Pexels URL.
                // It is the largest image on the site, full width at 16:9, so serving the raw
                // 800px original was the most expensive instance of the same mistake.
              />
            </div>
          ) : (
            <FoodImage
              slug={recipe.slug}
              slot={recipe.slot}
              aspect="aspect-[16/9]"
              emojiSize="text-8xl md:text-9xl"
            />
          )}
          <div className="p-5 md:p-7">
            {recipe.slot && (
              <p className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                <span className={cn("h-2 w-2 rounded-full", SLOT_DOT[recipe.slot])} />
                {SLOT_LABEL[recipe.slot]}
              </p>
            )}
            <h1 className="mt-2">{recipe.name}</h1>
            {recipe.whenToEat && (
              <p className="mt-3 inline-flex max-w-prose items-start gap-2 rounded-2xl bg-primary-soft/60 px-3.5 py-2.5 text-sm text-ink">
                <span aria-hidden className="text-primary">★</span>
                <span>{recipe.whenToEat}</span>
              </p>
            )}

            <dl className="mt-5 grid grid-cols-3 gap-2 text-sm">
              <Stat
                icon={<Users size={16} weight="duotone" aria-hidden />}
                label="Servings"
                value={`${recipe.servings}`}
              />
              <Stat
                icon={<Clock size={16} weight="duotone" aria-hidden />}
                label="Total"
                value={`${recipe.totalMinutes} min`}
              />
              <Stat
                icon={<ChefHat size={16} weight="duotone" aria-hidden />}
                label="Skill"
                value="Easy"
              />
            </dl>
          </div>
        </header>

        <div className="grid gap-6 md:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            {linkedMeal?.ingredients && linkedMeal.ingredients.length > 0 && (
              <>
                <IngredientsList
                  baseServings={recipe.servings}
                  ingredients={linkedMeal.ingredients}
                />
                <AllergenLine
                  allergens={allergensForIngredients(
                    linkedMeal.ingredients.map((i) => i.ingredientSlug)
                  )}
                />
              </>
            )}

            <section aria-labelledby="steps-title">
              <h2 id="steps-title" className="mb-3">
                Steps
              </h2>
              <RecipeSteps recipe={recipe} />
            </section>

            {recipe.notes && recipe.notes.length > 0 && (
              <section
                aria-labelledby="notes-title"
                className="rounded-3xl border border-border bg-primary-soft/50 p-5"
              >
                <h2 id="notes-title" className="text-lg font-semibold text-ink">
                  Coach&apos;s notes
                </h2>
                <ul className="mt-3 flex flex-col gap-2 text-sm text-ink/80">
                  {recipe.notes.map((note, i) => (
                    <li key={i} className="flex gap-2">
                      <span aria-hidden className="text-primary">•</span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          <aside className="space-y-6 md:sticky md:top-24 md:self-start">
            {/* The Sunday cook panel. keepsDays is a food-safety number rather than a serving
                suggestion, so it is stated as a date limit and not buried in prose. */}
            {recipe.prepAhead && (
              <section
                aria-labelledby="prep-ahead-title"
                className="rounded-3xl border border-primary/25 bg-primary-soft/50 p-5"
              >
                <header className="mb-3 flex items-center gap-2">
                  <ArrowsClockwise size={18} weight="duotone" aria-hidden className="text-primary" />
                  <h2 id="prep-ahead-title" className="text-base font-semibold text-ink">
                    Cook once, eat all week
                  </h2>
                </header>
                <p className="text-sm leading-relaxed text-ink/85">{recipe.prepAhead.yields}</p>
                <dl className="mt-3 flex flex-wrap gap-x-6 gap-y-2 border-t border-primary/15 pt-3 text-sm">
                  <div>
                    <dt className="text-[11px] uppercase tracking-wider text-muted-foreground">
                      Keeps in the fridge
                    </dt>
                    <dd className="font-semibold tabular-nums text-ink">
                      {recipe.prepAhead.keepsDays} days
                    </dd>
                  </div>
                  {recipe.prepAhead.freezerDays && (
                    <div>
                      <dt className="text-[11px] uppercase tracking-wider text-muted-foreground">
                        Freezer
                      </dt>
                      <dd className="font-semibold tabular-nums text-ink">
                        {recipe.prepAhead.freezerDays} days
                      </dd>
                    </div>
                  )}
                </dl>
                {recipe.prepAhead.reheat && (
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                    <span className="font-semibold text-ink/70">Reheating. </span>
                    {recipe.prepAhead.reheat}
                  </p>
                )}
                <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
                  Cool it completely before the lid goes on, and keep it at or below 40F. USDA
                  gives cooked leftovers 3 to 4 days, and these figures stay inside that.
                </p>
              </section>
            )}

            {/* Rated after the meal, which is when you know. Ours is a guess and says so until
                the parent replaces it, and their rating then reorders auto-fill. */}
            {linkedMeal && (
              <section
                aria-labelledby="rating-title"
                className="rounded-3xl border border-border bg-surface p-5 shadow-sm"
              >
                <h2 id="rating-title" className="text-base font-semibold text-ink">
                  Did it go down well?
                </h2>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  Your rating decides what auto-fill picks first. It stays on this device.
                </p>
                <div className="mt-3">
                  <StarRating slug={linkedMeal.slug} fallback={linkedMeal.kidRating} size={22} />
                </div>
              </section>
            )}

            {linkedMeal?.nutrition && <NutritionCard nutrition={linkedMeal.nutrition} />}

            {recipe.proteinBoost && (
              <ProteinBoostCard
                boost={recipe.proteinBoost}
                baseNutrition={linkedMeal?.nutrition}
              />
            )}

            <RelatedGuides guides={getGuidesForRecipe(recipe.slug)} />

            {recipe.equipment && recipe.equipment.length > 0 && (
              <section
                aria-labelledby="equipment-title"
                className="rounded-3xl border border-border bg-surface p-5 shadow-sm"
              >
                <header className="mb-3 flex items-center gap-2">
                  <CookingPot size={18} weight="duotone" aria-hidden className="text-primary" />
                  <h2 id="equipment-title" className="text-base font-semibold text-ink">
                    Equipment
                  </h2>
                </header>
                <ul className="flex flex-col gap-1.5 text-sm text-muted-foreground">
                  {recipe.equipment.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span aria-hidden className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </aside>
        </div>
      </article>
    </AppShell>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-primary-soft/50 p-3">
      <dt className="flex items-center gap-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        <span className="text-primary">{icon}</span>
        {label}
      </dt>
      <dd className="mt-1 text-base font-semibold text-ink">{value}</dd>
    </div>
  );
}
