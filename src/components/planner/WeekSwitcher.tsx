"use client";

import { CaretLeft, CaretRight, ArrowCounterClockwise } from "@phosphor-icons/react/dist/ssr";
import { formatWeekRange } from "@/lib/planner/isoWeek";

interface WeekSwitcherProps {
  weekStart: string;
  isCurrentWeek: boolean;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
}

export function WeekSwitcher({
  weekStart,
  isCurrentWeek,
  onPrev,
  onNext,
  onToday,
}: WeekSwitcherProps) {
  return (
    <nav aria-label="Change week" className="flex items-center gap-2">
      <button
        type="button"
        onClick={onPrev}
        aria-label="Previous week"
        className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground transition hover:border-primary/40 hover:text-ink"
      >
        <CaretLeft size={16} weight="bold" aria-hidden />
      </button>

      <p className="min-w-[8.5rem] text-center">
        <span className="block text-sm font-semibold text-ink">{formatWeekRange(weekStart)}</span>
        <span className="block text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          {isCurrentWeek ? "This week" : "Another week"}
        </span>
      </p>

      <button
        type="button"
        onClick={onNext}
        aria-label="Next week"
        className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground transition hover:border-primary/40 hover:text-ink"
      >
        <CaretRight size={16} weight="bold" aria-hidden />
      </button>

      {!isCurrentWeek && (
        <button
          type="button"
          onClick={onToday}
          className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:border-primary/40 hover:text-ink"
        >
          <ArrowCounterClockwise size={13} weight="bold" aria-hidden />
          Back to this week
        </button>
      )}
    </nav>
  );
}
