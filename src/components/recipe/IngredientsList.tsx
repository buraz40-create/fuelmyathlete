"use client";

import { useMemo, useState } from "react";
import { Minus, Plus } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";
import { INGREDIENT_BY_SLUG } from "@/data/ingredients";
import type { MealIngredient } from "@/types/domain";

interface IngredientsListProps {
  baseServings: number;
  ingredients: MealIngredient[];
}

const PRESETS = [1, 2, 4, 8];

function formatQty(qty: number, unit: string): string {
  // Round to nearest 0.25 for clean display, drop trailing zeros.
  const rounded = Math.round(qty * 4) / 4;
  const display =
    rounded === Math.floor(rounded)
      ? `${rounded}`
      : rounded.toString();
  return `${display} ${unit}`;
}

export function IngredientsList({ baseServings, ingredients }: IngredientsListProps) {
  const [targetServings, setTargetServings] = useState(baseServings);
  const multiplier = targetServings / baseServings;

  const items = useMemo(
    () =>
      ingredients.map((mi) => {
        const ing = INGREDIENT_BY_SLUG[mi.ingredientSlug];
        return {
          slug: mi.ingredientSlug,
          name: ing?.name ?? mi.ingredientSlug,
          unit: ing?.unit ?? "",
          category: ing?.category ?? "pantry",
          qty: mi.quantity * multiplier,
          notes: mi.notes,
        };
      }),
    [ingredients, multiplier]
  );

  return (
    <section
      aria-labelledby="ingredients-title"
      className="rounded-3xl border border-border bg-surface p-5 shadow-sm md:p-6"
    >
      <header className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            What you need
          </p>
          <h2 id="ingredients-title" className="mt-1 text-xl">
            Ingredients
          </h2>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setTargetServings(Math.max(1, targetServings - 1))}
            aria-label="Decrease servings"
            className="grid h-9 w-9 place-items-center rounded-full border border-border bg-surface text-ink transition active:scale-95 hover:border-primary disabled:opacity-40"
            disabled={targetServings <= 1}
          >
            <Minus size={14} weight="bold" aria-hidden />
          </button>
          <div className="text-center">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Making for
            </p>
            <p className="text-base font-bold text-ink">
              {targetServings} {targetServings === 1 ? "serving" : "servings"}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setTargetServings(targetServings + 1)}
            aria-label="Increase servings"
            className="grid h-9 w-9 place-items-center rounded-full border border-border bg-surface text-ink transition active:scale-95 hover:border-primary"
          >
            <Plus size={14} weight="bold" aria-hidden />
          </button>
        </div>
      </header>

      <div role="radiogroup" aria-label="Quick serving presets" className="mb-4 flex flex-wrap gap-1.5">
        {PRESETS.map((n) => {
          const active = targetServings === n;
          return (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => setTargetServings(n)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-semibold transition",
                active
                  ? "border-transparent bg-primary text-primary-foreground shadow-sm"
                  : "border-border bg-surface text-muted-foreground hover:text-ink"
              )}
            >
              {n}×
            </button>
          );
        })}
        {!PRESETS.includes(targetServings) && (
          <span className="rounded-full border border-transparent bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-sm">
            {targetServings}× custom
          </span>
        )}
      </div>

      <ul className="flex flex-col divide-y divide-border">
        {items.map((item) => (
          <li
            key={item.slug}
            className="flex items-center justify-between gap-3 py-2.5 text-sm"
          >
            <span className="font-medium text-ink">{item.name}</span>
            <span className="flex-shrink-0 font-mono text-xs text-muted-foreground tabular-nums">
              {formatQty(item.qty, item.unit)}
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-[11px] text-muted-foreground">
        Quantities scale linearly with servings. Round to the nearest practical amount when shopping.
      </p>
    </section>
  );
}
