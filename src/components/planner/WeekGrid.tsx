"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { DAYS_OF_WEEK, MEAL_SLOTS, dayTypeLabel } from "@/data/dayTypes";
import { MEALS_BY_SLUG } from "@/data/meals";
import { ageToCohort } from "@/lib/player/cohort";
import { usePlayerProfile } from "@/hooks/usePlayerProfile";
import type { MealPlan, MealSlot } from "@/types/domain";

const SLOT_TINT: Record<MealSlot, string> = {
  breakfast: "bg-meal-breakfast/40",
  lunch:     "bg-meal-lunch/40",
  snack:     "bg-meal-snack/40",
  dinner:    "bg-meal-dinner/40",
};

export function WeekGrid({ plan }: { plan: MealPlan }) {
  const { profile } = usePlayerProfile();
  const cohort = profile ? ageToCohort(profile.ageYears) : "child";

  return (
    <ol className="grid gap-3 md:grid-cols-7">
      {DAYS_OF_WEEK.map((day) => {
        const entries = plan.entries.filter((e) => e.dayOfWeek === day.idx);
        const dayType = entries[0]?.dayType ?? "school";
        const dLabel = dayTypeLabel(dayType, cohort);

        return (
          <li
            key={day.idx}
            className="rounded-2xl border border-border bg-surface p-3 shadow-sm"
          >
            <header className="mb-2 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {day.short}
                </p>
                <p className="text-base font-semibold text-ink">{day.long.slice(0, 3)}</p>
              </div>
              <span
                title={dLabel}
                aria-label={dLabel}
                className="h-2.5 w-2.5 flex-shrink-0 rounded-full ring-1 ring-inset ring-black/10"
                style={{ background: `var(--day-${dayType})` }}
              />
            </header>

            <ul className="flex flex-col gap-1.5">
              {MEAL_SLOTS.map(({ slot, label }) => {
                const entry = entries.find((e) => e.slot === slot);
                const meal = entry?.mealSlug ? MEALS_BY_SLUG[entry.mealSlug] : null;
                return (
                  <li
                    key={slot}
                    className={cn(
                      "rounded-xl px-2.5 py-2 text-xs",
                      meal ? SLOT_TINT[slot] : "bg-muted/40"
                    )}
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-ink/60">
                      {label}
                    </p>
                    <p
                      className={cn(
                        "mt-0.5 text-sm font-medium leading-snug",
                        meal ? "text-ink" : "text-muted-foreground italic"
                      )}
                    >
                      {meal ? meal.name : "+ add"}
                    </p>
                  </li>
                );
              })}
            </ul>

            <Link
              href="/planner"
              className="mt-2 block rounded-full bg-primary-soft px-3 py-1.5 text-center text-xs font-medium text-primary transition hover:bg-primary hover:text-primary-foreground"
            >
              Edit
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
