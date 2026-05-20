import type { DayType, PlayerProfile } from "@/types/domain";
import { DAY_TYPES } from "./dayTypes";
import { ageToCohort } from "@/lib/player/cohort";

// Cohort-aware hydration guidance. Each formula cites its authoritative source.
//
// CHILD (8-12): AAP 7-8 cups/day baseline; Holliday-Segar weight-based maintenance;
//   NATA pediatric exercise additions. Hard cap 100oz (hyponatremia risk in kids).
// TEEN (13-17): NATA "Healthy Hydration for Young Athletes"; weight-bridged formula.
//   Cap 150oz.
// ADULT (18+): ACSM Position Stand on Exercise and Fluid Replacement; ~0.6 oz per lb
//   body weight as daily baseline, +16-24oz per training hour. Cap 250oz.

const HOT_WEATHER_MULTIPLIER = 1.10;

const CAPS = {
  child: 100,
  teen: 150,
  adult: 250,
} as const;

const EXERCISE_ADD_OZ = {
  child: { training: 16, match: 24 },
  teen: { training: 20, match: 28 },
  adult: { training: 20, match: 32 },
} as const;

function exerciseAdd(cohort: "child" | "teen" | "adult", dayType: DayType): number {
  if (dayType === "training") return EXERCISE_ADD_OZ[cohort].training;
  if (dayType === "match") return EXERCISE_ADD_OZ[cohort].match;
  return 0;
}

export interface HydrationCalc {
  goalOz: number;
  baselineOz: number;
  exerciseAddOz: number;
  hotWeatherAddOz: number;
  capOz: number;
  capped: boolean;
  formula: string;
}

export function hydrationFor(
  profile: PlayerProfile,
  dayType: DayType,
  hotWeather = true
): HydrationCalc {
  const cohort = ageToCohort(profile.ageYears);
  const baseline = cohortBaseline(profile);
  const exercise = exerciseAdd(cohort, dayType);
  const before = baseline + exercise;
  const hotAdd = hotWeather ? before * (HOT_WEATHER_MULTIPLIER - 1) : 0;
  const raw = before + hotAdd;
  const cap = CAPS[cohort];
  const capped = raw > cap;
  return {
    goalOz: Math.round(Math.min(raw, cap)),
    baselineOz: Math.round(baseline),
    exerciseAddOz: exercise,
    hotWeatherAddOz: Math.round(hotAdd),
    capOz: cap,
    capped,
    formula: formulaName(cohort),
  };
}

function cohortBaseline(profile: PlayerProfile): number {
  const cohort = ageToCohort(profile.ageYears);
  if (cohort === "child") {
    // AAP 64oz baseline; aligns with Holliday-Segar for ~40 kg / 88 lb child.
    return 64;
  }
  if (cohort === "teen") {
    // Bridge: pediatric minimum, scaled by weight for larger teens.
    return Math.max(64, profile.weightLb * 0.55);
  }
  // Adult: ACSM ~0.6 oz per lb body weight as daily baseline.
  return profile.weightLb * 0.6;
}

function formulaName(cohort: "child" | "teen" | "adult"): string {
  if (cohort === "child") return "AAP + NATA pediatric";
  if (cohort === "teen") return "NATA youth athlete (weight-bridged)";
  return "ACSM adult athlete";
}

// Backward-compat: old default-Elvis call signature. Used while WaterTracker migrates.
const DEFAULT_ELVIS: PlayerProfile = {
  name: "Athlete",
  ageYears: 11,
  weightLb: 88,
  createdAt: "1970-01-01T00:00:00.000Z",
  updatedAt: "1970-01-01T00:00:00.000Z",
};

export function ozGoalForDay(dayType: DayType, hotWeather = true): number {
  return hydrationFor(DEFAULT_ELVIS, dayType, hotWeather).goalOz;
}

export function ozPerHour(dayType: DayType): number {
  return DAY_TYPES[dayType].hydrationOzPerHour;
}
