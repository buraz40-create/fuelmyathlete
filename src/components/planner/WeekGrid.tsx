"use client";

import Link from "next/link";
import { PencilSimple } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";
import { DAYS_OF_WEEK, MEAL_SLOTS, dayTypeLabel } from "@/data/dayTypes";
import { resolveMeal } from "@/lib/catalog";
import { usePlan } from "@/components/planner/PlanProvider";
import { ageToCohort } from "@/lib/player/cohort";
import { usePlayerProfile } from "@/hooks/usePlayerProfile";
import { addDays, fromIsoDate } from "@/lib/planner/isoWeek";
import type { MealPlan, MealSlot } from "@/types/domain";

const SLOT_TINT: Record<MealSlot, string> = {
  breakfast: "bg-meal-breakfast/40",
  lunch: "bg-meal-lunch/40",
  snack: "bg-meal-snack/40",
  dinner: "bg-meal-dinner/40",
};

export function WeekGrid({ plan }: { plan: MealPlan }) {
  const { custom, weekStart } = usePlan();
  const { profile } = usePlayerProfile();
  const cohort = profile ? ageToCohort(profile.ageYears) : "child";
  const monday = fromIsoDate(weekStart);

  return (
    <ol className="grid gap-3 md:grid-cols-7">
      {DAYS_OF_WEEK.map((day) => {
        const entries = plan.entries.filter((e) => e.dayOfWeek === day.idx);
        const dayType = entries[0]?.dayType ?? "school";
        const dLabel = dayTypeLabel(dayType, cohort);
        const date = addDays(monday, day.idx).getDate();

        return (
          <li
            key={day.idx}
            // min-w-0 is load bearing. A grid item defaults to min-width:auto, so it refuses
            // to shrink below the widest thing inside it, and one long meal name pushed the
            // whole card past the right edge of the screen: 415px of card in a 380px column.
            // The truncate on the meal name below cannot help until the card itself is allowed
            // to be narrower than its contents.
            className="min-w-0 rounded-2xl border border-border bg-surface p-3 shadow-sm"
          >
            {/*
              One day label, not two.

              This printed day.short and then the first three letters of day.long, which on a
              Sunday rendered as "SUN" above "Sun". The date is the thing that was actually
              missing: a week view where no card says which date it is makes you count forwards
              from the header to work out whether Wednesday is the 19th.
            */}
            <header className="mb-2 flex min-w-0 items-center gap-2">
              <p className="min-w-0 text-base font-semibold text-ink">
                {day.long.slice(0, 3)}{" "}
                <span className="text-muted-foreground tabular-nums">{date}</span>
              </p>
              {/* The day type as a word rather than a coloured dot. The dot needed a tooltip to
                  mean anything, and a tooltip is not available to a thumb. */}
              <span
                className="ml-auto truncate rounded-full px-2 py-0.5 text-[10px] font-semibold text-ink"
                style={{ background: `var(--day-${dayType})` }}
              >
                {dLabel}
              </span>
              {/* Edit was a full width bar under each card, which on a phone meant seven green
                  bars down the screen competing with the food. */}
              <Link
                href={`/planner?day=${day.idx}`}
                aria-label={`Edit ${day.long}`}
                className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-full text-muted-foreground transition hover:bg-primary-soft hover:text-primary"
              >
                <PencilSimple size={15} weight="bold" aria-hidden />
              </Link>
            </header>

            <ul className="flex flex-col gap-1">
              {MEAL_SLOTS.map(({ slot, label }) => {
                const entry = entries.find((e) => e.slot === slot);
                const meal = (entry?.mealSlug ? resolveMeal(entry.mealSlug, custom) : null) ?? null;
                return (
                  <li
                    key={slot}
                    className={cn(
                      // One line per meal instead of two. Four meals a day across seven days is
                      // 28 rows, and giving each one a label line of its own made the week a
                      // scroll rather than a view.
                      "flex items-baseline gap-2 rounded-lg px-2 py-1.5 text-xs",
                      meal ? SLOT_TINT[slot] : "bg-muted/40"
                    )}
                  >
                    {/* The whole word. Slicing to four characters to save space produced BREA
                        and SNAC, which reads as a rendering fault rather than an abbreviation.
                        A wider column costs less than looking broken. */}
                    <span className="w-[4.25rem] flex-shrink-0 text-[10px] font-semibold uppercase tracking-wide text-ink/55">
                      {label}
                    </span>
                    <span
                      className={cn(
                        "min-w-0 flex-1 truncate text-[13px] font-medium leading-snug",
                        meal ? "text-ink" : "italic text-muted-foreground"
                      )}
                    >
                      {meal ? meal.name : "add"}
                    </span>
                  </li>
                );
              })}
            </ul>
          </li>
        );
      })}
    </ol>
  );
}
