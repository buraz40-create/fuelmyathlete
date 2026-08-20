"use client";

import { ArrowCounterClockwise } from "@phosphor-icons/react/dist/ssr";
import { useMealPreferences } from "@/hooks/useMealPreferences";
import { resolveMeal } from "@/lib/catalog";
import { useCustomMeals } from "@/hooks/useCustomMeals";

// Hiding a meal happens in the picker, one tap, mid-flow. Undoing it should not require
// remembering which slot it lived in, so the full list lives here.
export function HiddenMeals() {
  const { catalog: custom } = useCustomMeals();
  const { excluded, hydrated, restore } = useMealPreferences();

  if (!hydrated) return <p className="text-sm text-muted-foreground">Loading…</p>;

  if (excluded.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Nothing hidden yet. Tap the block icon on any meal in the planner to keep it out of
        suggestions and auto-fill.
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {excluded.map((slug) => {
        const meal = resolveMeal(slug, custom);
        return (
          <li
            key={slug}
            className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-background px-3 py-2"
          >
            <span className="min-w-0">
              <span className="block truncate text-sm font-medium text-ink">
                {meal?.name ?? slug}
              </span>
              {meal && (
                <span className="block text-[11px] uppercase tracking-wider text-muted-foreground">
                  {meal.slot}
                </span>
              )}
            </span>
            <button
              type="button"
              onClick={() => restore(slug)}
              className="inline-flex flex-shrink-0 items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:border-primary/40 hover:text-ink"
            >
              <ArrowCounterClockwise size={13} weight="bold" aria-hidden />
              Bring back
            </button>
          </li>
        );
      })}
    </ul>
  );
}
