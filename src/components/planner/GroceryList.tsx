"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeSlash } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";
import type { Icon } from "@phosphor-icons/react";
import {
  Carrot,
  Fish,
  Drop,
  Bread,
  Jar,
  Snowflake,
  Coffee,
} from "@phosphor-icons/react/dist/ssr";
import {
  GROCERY_CATEGORY_LABEL,
  GROCERY_CATEGORY_ORDER,
  formatShoppingQuantity,
  isPantryCheck,
  totalGroceryItems,
} from "@/lib/planner/grocery";
import type { GroceryListByCategory, IngredientCategory } from "@/types/domain";

interface GroceryListProps {
  grouped: GroceryListByCategory;
  checked: Record<string, boolean>;
  onToggle: (ingredientSlug: string) => void;
}


/**
 * An icon and a tint per aisle.
 *
 * The list has always been grouped by aisle, but every heading was the same grey uppercase
 * text, so finding the dairy block in a shop meant reading each one. A colour and a shape are
 * findable at arm's length while pushing a trolley, which is the actual situation this screen
 * is used in.
 *
 * Tints come from the existing meal palette rather than new colours, so the list still looks
 * like the rest of the app.
 */
const AISLE: Record<IngredientCategory, { icon: Icon; tint: string }> = {
  produce: { icon: Carrot, tint: "bg-meal-lunch" },
  protein: { icon: Fish, tint: "bg-meal-dinner" },
  dairy: { icon: Drop, tint: "bg-day-rest" },
  bakery: { icon: Bread, tint: "bg-meal-breakfast" },
  pantry: { icon: Jar, tint: "bg-meal-snack" },
  frozen: { icon: Snowflake, tint: "bg-day-school" },
  beverages: { icon: Coffee, tint: "bg-day-training" },
};

export function GroceryList({ grouped, checked, onToggle }: GroceryListProps) {
  const [hideChecked, setHideChecked] = useState(false);
  const total = totalGroceryItems(grouped);
  const checkedCount = Object.values(checked).filter(Boolean).length;

  if (total === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-border bg-surface/70 p-8 text-center">
        <p className="text-sm text-muted-foreground">
          Your grocery list builds itself once you pick meals.
        </p>
        <Link
          href="/planner"
          className="mt-4 inline-block rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
        >
          Go pick meals
        </Link>
      </div>
    );
  }

  const allChecked = checkedCount >= total;

  return (
    <div className="space-y-5">
      {/* Sticky, because the count used to scroll away immediately and a 40 row list in an
          aisle only ever grows. Hiding checked items is the same problem: without it you keep
          re-reading things already in the trolley. */}
      <div className="sticky top-14 z-20 -mx-1 flex items-center justify-between gap-3 rounded-2xl border border-border bg-surface/95 px-3 py-2 backdrop-blur">
        <p className="text-sm text-muted-foreground">
          <strong className="text-ink">{checkedCount}</strong> of {total} checked
        </p>
        <button
          type="button"
          onClick={() => setHideChecked((v) => !v)}
          disabled={checkedCount === 0}
          className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:border-primary/40 hover:text-ink disabled:opacity-40"
        >
          {hideChecked ? (
            <>
              <Eye size={13} weight="bold" aria-hidden /> Show checked
            </>
          ) : (
            <>
              <EyeSlash size={13} weight="bold" aria-hidden /> Hide checked
            </>
          )}
        </button>
      </div>

      {hideChecked && allChecked && (
        <p className="rounded-2xl border border-dashed border-border bg-surface/70 p-6 text-center text-sm text-muted-foreground">
          Everything is checked off. Nice shop.
        </p>
      )}

      {GROCERY_CATEGORY_ORDER.map((cat) => {
        const items = hideChecked
          ? grouped[cat].filter((line) => !checked[line.ingredient.slug])
          : grouped[cat];
        if (items.length === 0) return null;
        return (
          <section
            key={cat}
            aria-labelledby={`cat-${cat}`}
            className="rounded-3xl border border-border bg-surface p-4 md:p-5"
          >
            <h2 id={`cat-${cat}`} className="mb-3 flex items-center gap-2.5">
              <span
                aria-hidden
                className={cn(
                  "grid h-8 w-8 flex-shrink-0 place-items-center rounded-full text-ink",
                  AISLE[cat].tint
                )}
              >
                {(() => {
                  const AisleIcon = AISLE[cat].icon;
                  return <AisleIcon size={17} weight="duotone" />;
                })()}
              </span>
              <span className="text-sm font-semibold text-ink">
                {GROCERY_CATEGORY_LABEL[cat]}
              </span>
              {/* How much of this aisle is done, so a glance answers "can I leave dairy yet". */}
              <span className="ml-auto text-xs font-medium tabular-nums text-muted-foreground">
                {items.filter((line) => checked[line.ingredient.slug]).length}/{items.length}
              </span>
            </h2>
            <ul className="flex flex-col gap-1.5">
              {items.map(({ ingredient, totalQuantity, fromMeals }) => {
                const isChecked = !!checked[ingredient.slug];
                return (
                  <li key={ingredient.slug}>
                    <button
                      type="button"
                      onClick={() => onToggle(ingredient.slug)}
                      aria-pressed={isChecked}
                      className={cn(
                        "flex min-h-12 w-full items-start gap-3 rounded-2xl border bg-surface px-3 py-3 text-left transition",
                        isChecked
                          ? "border-success/40 bg-success/5"
                          : "border-border hover:border-primary/30"
                      )}
                    >
                      <span
                        aria-hidden
                        className={cn(
                          "mt-0.5 grid h-5 w-5 flex-shrink-0 place-items-center rounded-md border-2 transition",
                          isChecked
                            ? "border-success bg-success text-white"
                            : "border-border bg-surface"
                        )}
                      >
                        {isChecked && "✓"}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span
                          className={cn(
                            "flex items-baseline justify-between gap-2 text-sm font-medium",
                            isChecked && "line-through text-muted-foreground"
                          )}
                        >
                          <span className="truncate text-ink">{ingredient.name}</span>
                          <span
                            className={cn(
                              "flex-shrink-0 tabular-nums",
                              isPantryCheck(ingredient.unit)
                                ? "text-[11px] uppercase tracking-wider text-muted-foreground/70"
                                : "font-semibold text-ink"
                            )}
                          >
                            {formatShoppingQuantity(totalQuantity, ingredient.unit)}
                          </span>
                        </span>
                        <span className="mt-0.5 block truncate text-[11px] text-muted-foreground">
                          for {fromMeals.slice(0, 2).join(", ")}
                          {fromMeals.length > 2 && ` +${fromMeals.length - 2} more`}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
