"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AppShell } from "@/components/layout/AppShell";
import { RecipeCard } from "@/components/recipe/RecipeCard";
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

export default function RecipesPage() {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(
    () =>
      filter === "all"
        ? RECIPES
        : RECIPES.filter((r) => r.slot === filter),
    [filter]
  );

  return (
    <AppShell>
      <section
        aria-labelledby="recipes-title"
        className="mx-auto w-full max-w-6xl px-4 py-8 md:px-8 md:py-12"
      >
        <header className="mb-6 text-center md:mb-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            Recipe library
          </p>
          <h1 id="recipes-title" className="mt-2">
            Recipes
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">
            Every meal in the planner has a step-by-step recipe. Athlete-tested, family-friendly,
            free.
          </p>
        </header>

        <nav
          role="tablist"
          aria-label="Filter recipes by meal type"
          className="sticky top-[68px] z-10 mb-8 flex flex-wrap justify-center gap-2 rounded-full border border-border bg-background/85 p-1.5 backdrop-blur md:top-[76px]"
        >
          {FILTERS.map(({ key, label }) => {
            const active = filter === key;
            return (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(key)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-semibold transition",
                  active
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-ink"
                )}
              >
                {label}
              </button>
            );
          })}
        </nav>

        <AnimatePresence mode="popLayout">
          <motion.ol
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((recipe, i) => (
              <motion.li
                key={recipe.slug}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
              >
                <RecipeCard recipe={recipe} />
              </motion.li>
            ))}
          </motion.ol>
        </AnimatePresence>

        {filtered.length === 0 && (
          <p className="mt-8 text-center text-sm text-muted-foreground">
            No recipes yet for this slot. Working on it.
          </p>
        )}
      </section>
    </AppShell>
  );
}
