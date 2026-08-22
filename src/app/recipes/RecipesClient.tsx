"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRovingGroup } from "@/hooks/useRovingGroup";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { Leaf, Plus } from "@phosphor-icons/react/dist/ssr";
import { RecipeCard } from "@/components/recipe/RecipeCard";
import { YourRecipes } from "@/components/recipe/YourRecipes";
import { RECIPES } from "@/data/recipes";
import { cn } from "@/lib/utils";
import type { MealSlot } from "@/types/domain";

type Filter = "all" | MealSlot;

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "breakfast", label: "Breakfast" },
  { key: "lunch", label: "Lunch" },
  { key: "snack", label: "Snack" },
  { key: "dinner", label: "Dinner" },
];

export function RecipesClient() {
  const [filter, setFilter] = useState<Filter>("all");
  const reduced = useReducedMotion();

  const filtered = useMemo(
    () =>
      filter === "all"
        ? RECIPES
        : RECIPES.filter((r) => r.slot === filter),
    [filter]
  );

  // Keep the chosen filter fully on screen.
  //
  // The row scrolls sideways, and Dinner is the last of five, so on a phone it sits half off the
  // edge. Tapping it selected it and left it there, cut in half, which reads as a broken control
  // rather than a scrolled one.
  //
  // The container is scrolled directly rather than with scrollIntoView, because that also scrolls
  // the nearest scrollable ancestor: this row is sticky, so the page would jump underneath it.
  const filterRowRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const row = filterRowRef.current;
    const chip = row?.querySelector<HTMLElement>('[aria-selected="true"]');
    if (!row || !chip) return;

    const pad = 16; // matches the row's own inline padding, so the chip never touches the edge
    const left = chip.offsetLeft - pad;
    const right = chip.offsetLeft + chip.offsetWidth + pad;

    if (left < row.scrollLeft) {
      row.scrollTo({ left, behavior: "smooth" });
    } else if (right > row.scrollLeft + row.clientWidth) {
      row.scrollTo({ left: right - row.clientWidth, behavior: "smooth" });
    }
  }, [filter]);

  const filterKeys = useRovingGroup({
    items: FILTERS.map((f) => f.key),
    selected: filter,
    onSelect: setFilter,
    idFor: (key) => `recipe-filter-${key}`,
  });

  return (
    <section
      aria-labelledby="recipes-title"
      className="mx-auto flex w-full max-w-6xl flex-col px-4 pb-6 md:px-8 md:py-12"
    >
      <header className="mb-5 pt-[calc(env(safe-area-inset-top)+0.75rem)] md:mb-8 md:pt-0 md:text-center">
        {/* Hidden on a phone. The tab bar already says Recipes, and this plus the blurb cost
            about 150px before the first card on the screen whose job is showing cards. */}
        <p className="hidden text-xs font-semibold uppercase tracking-wider text-primary md:block">
          Recipe library
        </p>
        {/* The title and the add button share a row on a phone. They were stacked, which cost a
            whole line of vertical space on the screen where the point is to see recipes. */}
        <div className="mt-1 flex items-center justify-between gap-3 md:mt-2 md:justify-center">
          <h1 id="recipes-title" className="min-w-0">
            Recipes
          </h1>
          <Link
            href="/import"
            aria-label="Add your own recipe"
            className="inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-full border border-border bg-surface px-4 text-sm font-medium text-ink shadow-sm transition hover:border-primary/40 hover:text-primary md:hidden"
          >
            <Plus size={15} weight="bold" aria-hidden />
            Add
          </Link>
        </div>
        <p className="mx-auto mt-2 hidden max-w-2xl text-sm text-muted-foreground md:mt-3 md:block md:text-base">
          Every meal in the planner has a step-by-step recipe. Athlete-tested, family-friendly,
          free.
        </p>
        <p className="mt-4 hidden md:block">
          <Link
            href="/import"
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium text-ink transition hover:border-primary/40 hover:text-primary"
          >
            <Plus size={14} weight="bold" aria-hidden />
            Add your own recipe
          </Link>
        </p>
      </header>

      <YourRecipes />

      <nav
        ref={filterRowRef}
        role="tablist"
        aria-label="Filter recipes by meal type"
        onKeyDown={filterKeys.onKeyDown}
        className="sticky top-[68px] z-10 -mx-4 mb-6 flex snap-x gap-1 overflow-x-auto scroll-px-4 px-4 py-1.5 [scrollbar-width:none] md:top-[76px] md:mx-0 md:mb-8 md:flex-wrap md:justify-center md:gap-2 md:rounded-full md:border md:border-border md:bg-background/85 md:px-1.5 md:backdrop-blur [&::-webkit-scrollbar]:hidden"
      >
        {FILTERS.map(({ key, label }) => {
          const active = filter === key;
          return (
            <button
              key={key}
              type="button"
              role="tab"
              id={`recipe-filter-${key}`}
              aria-selected={active}
              tabIndex={filterKeys.tabIndexFor(key)}
              onClick={() => setFilter(key)}
              className={cn(
                // A floor on the width, because the padding that lets five chips fit turns a short
                // label into a squashed circle. All is three characters; without this it renders
                // as a blob next to four proper pills.
                "min-h-11 min-w-[3.5rem] shrink-0 snap-start rounded-full px-2.5 text-[13px] font-semibold transition md:min-w-0 md:px-4 md:text-sm",
                active
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "border border-border bg-surface text-muted-foreground md:border-0 md:bg-transparent"
              )}
            >
              {label}
            </button>
          );
        })}
      </nav>

      <aside
        role="note"
        aria-labelledby="whole-food-title"
        className="order-last mt-8 rounded-3xl border border-border bg-primary-soft/40 p-5 md:order-none md:mb-8 md:mt-0 md:p-6"
      >
        <header className="flex items-center gap-2.5">
          <Leaf size={20} weight="duotone" aria-hidden className="flex-shrink-0 text-primary" />
          <h2 id="whole-food-title" className="text-base font-semibold text-ink md:text-lg">
            Whole-food first
          </h2>
        </header>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Every recipe starts with real food: Greek yogurt, eggs, cottage cheese, peanut
          butter, hemp hearts. The cottage cheese smoothie alone hits 26g of protein per serving
          with no powder. For adult athletes who want extra protein on top, smoothie recipes
          include an optional <strong className="text-ink">Boost it</strong> section with how to
          add a scoop.
        </p>
      </aside>

      {/* Movement only, never opacity.
          This grid used to fade in: the ol from opacity 0, and each card from opacity 0 with a
          delay of i * 0.04. With 24 recipes the last card did not start until nearly a second
          in, and anything that interrupted the run left the whole list translucent, which is
          what a real visitor reported. Recipes are the page. They are readable from the first
          paint now, and the animation only slides them a few pixels.

          This is the same mistake as the guide reveals that hid prose at opacity 0. Third time
          on this project, so the rule is written down in HANDOFF: on content that has to be
          read, animate position, not visibility. */}
      <ol className="grid gap-2.5 md:grid-cols-2 md:gap-4 lg:grid-cols-3">
        {filtered.map((recipe, i) => (
          <motion.li
            key={recipe.slug}
            initial={reduced ? false : { y: 10 }}
            animate={{ y: 0 }}
            // Capped so a long list does not queue up a second of staggered waiting.
            transition={{ duration: 0.25, delay: Math.min(i, 6) * 0.03 }}
          >
            <RecipeCard recipe={recipe} index={i} />
          </motion.li>
        ))}
      </ol>

      {filtered.length === 0 && (
        <p className="mt-8 text-center text-sm text-muted-foreground">
          No recipes yet for this slot. Working on it.
        </p>
      )}
    </section>
  );
}
