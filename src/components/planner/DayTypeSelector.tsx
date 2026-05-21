"use client";

import { cn } from "@/lib/utils";
import { DAY_TYPE_ORDER, dayTypeLabel } from "@/data/dayTypes";
import { ageToCohort } from "@/lib/player/cohort";
import { usePlayerProfile } from "@/hooks/usePlayerProfile";
import type { DayType } from "@/types/domain";

interface DayTypeSelectorProps {
  value: DayType;
  onChange: (type: DayType) => void;
}

const TINT_BG: Record<DayType, string> = {
  school:   "bg-day-school",
  training: "bg-day-training",
  match:    "bg-day-match",
  rest:     "bg-day-rest",
};

const TINT_DOT: Record<DayType, string> = {
  school:   "bg-day-school",
  training: "bg-day-training",
  match:    "bg-day-match",
  rest:     "bg-day-rest",
};

export function DayTypeSelector({ value, onChange }: DayTypeSelectorProps) {
  const { profile } = usePlayerProfile();
  const cohort = profile ? ageToCohort(profile.ageYears) : "child";

  return (
    <div
      role="radiogroup"
      aria-label="What kind of day is this?"
      className="grid grid-cols-2 gap-2 md:grid-cols-4"
    >
      {DAY_TYPE_ORDER.map((key) => {
        const active = value === key;
        const label = dayTypeLabel(key, cohort);
        return (
          <button
            key={key}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(key)}
            className={cn(
              "flex items-center gap-2.5 rounded-full border px-4 py-2 text-sm font-medium transition",
              active
                ? `${TINT_BG[key]} border-transparent text-ink shadow-sm`
                : "border-border bg-surface text-muted-foreground hover:text-ink"
            )}
          >
            <span
              aria-hidden
              className={cn(
                "h-2.5 w-2.5 flex-shrink-0 rounded-full ring-1 ring-inset ring-black/10",
                TINT_DOT[key]
              )}
            />
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
