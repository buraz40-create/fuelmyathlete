"use client";

import { cn } from "@/lib/utils";
import {
  GROCERY_CATEGORY_LABEL,
  GROCERY_CATEGORY_ORDER,
  totalGroceryItems,
} from "@/lib/planner/grocery";
import type { GroceryListByCategory } from "@/types/domain";

interface GroceryListProps {
  grouped: GroceryListByCategory;
  checked: Record<string, boolean>;
  onToggle: (ingredientSlug: string) => void;
}

export function GroceryList({ grouped, checked, onToggle }: GroceryListProps) {
  const total = totalGroceryItems(grouped);
  const checkedCount = Object.values(checked).filter(Boolean).length;

  if (total === 0) {
    return (
      <p className="rounded-3xl border border-dashed border-border bg-surface/70 p-8 text-center text-sm text-muted-foreground">
        Your grocery list will appear here once you pick meals on the planner.
      </p>
    );
  }

  return (
    <div className="space-y-5">
      <p className="text-sm text-muted-foreground">
        <strong className="text-ink">{checkedCount}</strong> of {total} items checked off
      </p>

      {GROCERY_CATEGORY_ORDER.map((cat) => {
        const items = grouped[cat];
        if (items.length === 0) return null;
        return (
          <section
            key={cat}
            aria-labelledby={`cat-${cat}`}
            className="rounded-3xl border border-border bg-surface p-4 md:p-5"
          >
            <h2
              id={`cat-${cat}`}
              className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground"
            >
              {GROCERY_CATEGORY_LABEL[cat]}
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
                        "flex w-full items-start gap-3 rounded-2xl border bg-surface px-3 py-2.5 text-left transition",
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
                          <span className="flex-shrink-0 text-muted-foreground">
                            {totalQuantity} {ingredient.unit}
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
