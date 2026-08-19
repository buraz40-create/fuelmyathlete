import type { DayType } from "@/types/domain";
import { defaultDayTypeFor } from "@/lib/planner/empty-plan";

// The recurring week: which days are training, which are match days, which are ordinary.
// Before this, every new week was stamped with a hardcoded guess (Tue and Thu training,
// Saturday match) and a parent whose team trains Monday and Wednesday had to correct seven
// days by hand, every week, forever.
//
// Device-local for the same reason as meal exclusions: the profile round-trips through
// Supabase and players has no column for it. See preferences.ts.

const STORAGE_KEY = "fma:weekly-schedule";

export type WeeklySchedule = DayType[]; // length 7, index 0 = Sunday

const VALID: DayType[] = ["school", "training", "match", "rest"];

export function defaultSchedule(): WeeklySchedule {
  return Array.from({ length: 7 }, (_, day) => defaultDayTypeFor(day));
}

function isValid(value: unknown): value is WeeklySchedule {
  return (
    Array.isArray(value) &&
    value.length === 7 &&
    value.every((v) => typeof v === "string" && VALID.includes(v as DayType))
  );
}

export const weeklySchedule = {
  load(): WeeklySchedule {
    if (typeof window === "undefined") return defaultSchedule();
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultSchedule();
      const parsed = JSON.parse(raw);
      return isValid(parsed) ? parsed : defaultSchedule();
    } catch {
      return defaultSchedule();
    }
  },

  save(schedule: WeeklySchedule): void {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(schedule));
    } catch {
      // Storage blocked. The choice still applies for this session.
    }
  },

  isCustomized(): boolean {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem(STORAGE_KEY) !== null;
  },

  clear(): void {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(STORAGE_KEY);
  },
};
