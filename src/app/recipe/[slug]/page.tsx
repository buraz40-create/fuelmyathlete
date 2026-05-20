import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { ArrowLeft, ChefHat, Clock, Users } from "@phosphor-icons/react/dist/ssr";
import { AppShell } from "@/components/layout/AppShell";
import { RecipeSteps } from "@/components/recipe/RecipeSteps";
import { RECIPES, RECIPES_BY_SLUG } from "@/data/recipes";
import { cn } from "@/lib/utils";
import type { MealSlot } from "@/types/domain";

export function generateStaticParams() {
  return RECIPES.map((r) => ({ slug: r.slug }));
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: recipe.name,
    image: recipe.imageUrl,
    recipeYield: `${recipe.servings} servings`,
    totalTime: `PT${recipe.totalMinutes}M`,
    recipeCategory: recipe.slot,
    recipeInstructions: recipe.steps.map((s) => ({
      "@type": "HowToStep",
      name: s.title,
      text: s.body,
    })),
  };

  return (
    <AppShell>
      <Script
        id={`ld-recipe-${recipe.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="mx-auto w-full max-w-3xl px-4 py-6 md:px-8 md:py-10">
        <Link
          href="/recipes"
          className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition hover:text-ink"
        >
          <ArrowLeft size={16} weight="bold" aria-hidden /> All recipes
        </Link>

        <header className="mb-6 overflow-hidden rounded-3xl border border-border bg-surface shadow-sm">
          {recipe.imageUrl && (
            <div className="relative aspect-[16/9] w-full bg-muted">
              <Image
                src={recipe.imageUrl}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
                priority
                unoptimized
              />
            </div>
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

        <section aria-labelledby="steps-title">
          <h2 id="steps-title" className="mb-3">
            Steps
          </h2>
          <RecipeSteps recipe={recipe} />
        </section>

        {recipe.notes && recipe.notes.length > 0 && (
          <section
            aria-labelledby="notes-title"
            className="mt-8 rounded-3xl border border-border bg-primary-soft/50 p-5"
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
