"use client";

import { CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";
import { DAYS_OF_WEEK } from "@/data/dayTypes";
import { addDays, fromIsoDate } from "@/lib/planner/isoWeek";
import type { MealPlan } from "@/types/domain";

interface DayPickerProps {
  selected: number;
  onSelect: (day: number) => void;
  plan: MealPlan;
  weekStart: string;
}

function plannedSlotsFor(plan: MealPlan, day: number): number {
  return plan.entries.filter((e) => e.dayOfWeek === day && e.mealSlug).length;
}

// The tabs used to read S M T W T F S, which is a poor way to find Thursday and useless once
// the planner can show a week other than this one.
function dateFor(weekStart: string, day: number): number {
  return addDays(fromIsoDate(weekStart), day).getDate();
}

export function DayPicker({ selected, onSelect, plan, weekStart }: DayPickerProps) {
  function handleKeyDown(event: React.KeyboardEvent<HTMLOListElement>) {
    const moves: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1 };
    let next: number | null = null;
    if (event.key in moves) next = (selected + moves[event.key] + 7) % 7;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = 6;
    if (next === null) return;
    event.preventDefault();
    onSelect(next);
    document.getElementById(`day-tab-${next}`)?.focus();
  }

  return (
    <ol
      role="tablist"
      aria-label="Day of week"
      onKeyDown={handleKeyDown}
      className="flex w-full items-stretch gap-1.5 overflow-x-auto pb-1"
    >
      {DAYS_OF_WEEK.map((day) => {
        const planned = plannedSlotsFor(plan, day.idx);
        const isActive = selected === day.idx;
        const fullyPlanned = planned === 4;
        return (
          <li key={day.idx} className="flex-1 min-w-[44px]">
            <button
              type="button"
              role="tab"
              id={`day-tab-${day.idx}`}
              aria-selected={isActive}
              aria-controls="day-panel"
              // Roving tabindex: one stop for the whole strip, then arrows move within it,
              // which is how a tablist is meant to behave and how a screen reader user
              // expects to move through seven days.
              tabIndex={isActive ? 0 : -1}
              onClick={() => onSelect(day.idx)}
              className={cn(
                "relative flex w-full flex-col items-center gap-1 rounded-2xl border px-2 py-3 text-sm font-medium transition",
                isActive
                  ? "border-primary bg-primary text-primary-foreground shadow-sm"
                  : "border-border bg-surface text-ink hover:border-primary/40"
              )}
            >
              <span className="text-[11px] uppercase tracking-wider opacity-80">{day.short}</span>
              <span className="text-base font-semibold">{dateFor(weekStart, day.idx)}</span>
              {planned > 0 && (
                <span
                  aria-label={`${planned} of 4 meals planned`}
                  className={cn(
                    "absolute -bottom-1 right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full text-[10px] font-semibold",
                    fullyPlanned
                      ? "bg-success text-white"
                      : isActive
                      ? "bg-white/95 text-primary"
                      : "bg-primary-soft text-primary"
                  )}
                >
                  {fullyPlanned ? <CheckCircle size={14} weight="fill" aria-hidden /> : planned}
                </span>
              )}
            </button>
          </li>
        );
      })}
    </ol>
  );
}
