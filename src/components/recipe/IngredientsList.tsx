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

  // A radiogroup promises arrow keys, and this one had a tab stop on every preset and no
  // arrow handling at all. Same fix as the day tabs and the star rating.
  function handlePresetKeys(event: React.KeyboardEvent<HTMLDivElement>) {
    const moves: Record<string, number> = {
      ArrowLeft: -1,
      ArrowUp: -1,
      ArrowRight: 1,
      ArrowDown: 1,
    };
    const at = PRESETS.indexOf(targetServings);
    let next: number | null = null;
    if (event.key in moves) next = (at === -1 ? 0 : at) + moves[event.key];
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = PRESETS.length - 1;
    if (next === null) return;
    event.preventDefault();
    const value = PRESETS[Math.min(PRESETS.length - 1, Math.max(0, next))];
    setTargetServings(value);
    document.getElementById(`servings-preset-${value}`)?.focus();
  }

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

      <div
        role="radiogroup"
        aria-label="Quick serving presets"
        onKeyDown={handlePresetKeys}
        className="mb-4 flex flex-wrap gap-1.5"
      >
        {PRESETS.map((n) => {
          const active = targetServings === n;
          return (
            <button
              key={n}
              type="button"
              role="radio"
              id={`servings-preset-${n}`}
              aria-checked={active}
              // The visible text is "4x", which a screen reader reads as a multiplication sign.
              // The number is the same in both so voice control still works on it.
              aria-label={`${n} serving${n === 1 ? "" : "s"}`}
              // Roving tabindex, matching the day tabs. When the count is a custom number none
              // of the presets is active, so the first one holds the tab stop and the group
              // stays reachable.
              tabIndex={active || (!PRESETS.includes(targetServings) && n === PRESETS[0]) ? 0 : -1}
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
