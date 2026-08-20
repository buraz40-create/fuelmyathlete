"use client";

import { useEffect, useState } from "react";
import { ArrowCounterClockwise } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";
import { DAYS_OF_WEEK, DAY_TYPE_ORDER, dayTypeLabel } from "@/data/dayTypes";
import { weeklySchedule, defaultSchedule, type WeeklySchedule } from "@/lib/player/schedule";
import { usePlayerProfile } from "@/hooks/usePlayerProfile";
import { ageToCohort } from "@/lib/player/cohort";
import { useRovingGroup } from "@/hooks/useRovingGroup";
import type { DayType } from "@/types/domain";

const TINT: Record<DayType, string> = {
  school: "bg-day-school",
  training: "bg-day-training",
  match: "bg-day-match",
  rest: "bg-day-rest",
};

// One day's row. This exists as a component purely so the roving-tabindex hook can be called
// once per row: the seven rows are a map, and hooks cannot be called in a loop.
function ScheduleRow({
  idx,
  long,
  value,
  cohort,
  onSelect,
}: {
  idx: number;
  long: string;
  value: DayType;
  cohort: ReturnType<typeof ageToCohort>;
  onSelect: (day: number, type: DayType) => void;
}) {
  const keys = useRovingGroup({
    items: DAY_TYPE_ORDER,
    selected: value,
    onSelect: (type) => onSelect(idx, type),
    idFor: (type) => `schedule-${idx}-${type}`,
  });

  return (
    <li className="flex flex-wrap items-center gap-2">
      <span className="w-24 flex-shrink-0 text-sm font-medium text-ink">{long}</span>
      <div
        role="radiogroup"
        aria-label={`${long} day type`}
        onKeyDown={keys.onKeyDown}
        className="flex flex-wrap gap-1.5"
      >
        {DAY_TYPE_ORDER.map((type) => {
          const active = value === type;
          return (
            <button
              key={type}
              type="button"
              role="radio"
              id={`schedule-${idx}-${type}`}
              aria-checked={active}
              tabIndex={keys.tabIndexFor(type)}
              onClick={() => onSelect(idx, type)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition",
                active
                  ? cn("border-transparent text-ink", TINT[type])
                  : "border-border text-muted-foreground hover:border-primary/40 hover:text-ink"
              )}
            >
              {dayTypeLabel(type, cohort)}
            </button>
          );
        })}
      </div>
    </li>
  );
}

export function WeeklyScheduleEditor() {
  const { profile } = usePlayerProfile();
  const cohort = profile ? ageToCohort(profile.ageYears) : "child";
  const [schedule, setSchedule] = useState<WeeklySchedule>(defaultSchedule);
  const [hydrated, setHydrated] = useState(false);
  const [customized, setCustomized] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only read of localStorage; SSR renders the default pattern and the client swaps in the stored one.
    setSchedule(weeklySchedule.load());
    setCustomized(weeklySchedule.isCustomized());
    setHydrated(true);
  }, []);

  function set(day: number, type: DayType) {
    // Functional update, because two taps in the same tick would otherwise both build from
    // the same stale array and the first one would be lost.
    setSchedule((prev) => {
      const next = prev.map((d, i) => (i === day ? type : d));
      weeklySchedule.save(next);
      return next;
    });
    setCustomized(true);
  }

  function reset() {
    weeklySchedule.clear();
    setSchedule(defaultSchedule());
    setCustomized(false);
  }

  if (!hydrated) return <p className="text-sm text-muted-foreground">Loading…</p>;

  return (
    <div>
      <ul className="flex flex-col gap-2">
        {DAYS_OF_WEEK.map(({ idx, long }) => (
          <ScheduleRow
            key={idx}
            idx={idx}
            long={long}
            value={schedule[idx]}
            cohort={cohort}
            onSelect={set}
          />
        ))}
      </ul>

      {customized && (
        <button
          type="button"
          onClick={reset}
          className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition hover:text-ink"
        >
          <ArrowCounterClockwise size={13} weight="bold" aria-hidden />
          Reset to the default pattern
        </button>
      )}

      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
        This stamps every new week automatically. Weeks you have already opened keep whatever you
        set on them, and you can still change any single day in the planner.
      </p>
    </div>
  );
}
