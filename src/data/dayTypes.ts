import type { AgeCohort, DayType, DayTypeConfig } from "@/types/domain";

export const DAY_TYPES: Record<DayType, DayTypeConfig> = {
  school: {
    key: "school",
    label: "School day",
    emoji: "📚",
    description: "Steady fuel for focus. Normal portions, low-key.",
    portionMultiplier: 1.0,
    sauceOz: 1.0,
    hydrationOzPerHour: 6,
    tokenClass: "bg-day-school",
  },
  training: {
    key: "training",
    label: "Training day",
    emoji: "⚽",
    description: "More carbs, more water. Practice drains the tank fast.",
    portionMultiplier: 1.2,
    sauceOz: 1.0,
    hydrationOzPerHour: 10,
    tokenClass: "bg-day-training",
  },
  match: {
    key: "match",
    label: "Match day",
    emoji: "🏆",
    description: "Carb-load the night before. Light sauce. Drink early.",
    portionMultiplier: 1.3,
    sauceOz: 0.5,
    hydrationOzPerHour: 12,
    tokenClass: "bg-day-match",
  },
  rest: {
    key: "rest",
    label: "Rest day",
    emoji: "😴",
    description: "Recover. Slightly smaller portions, more protein at night.",
    portionMultiplier: 0.9,
    sauceOz: 1.0,
    hydrationOzPerHour: 5,
    tokenClass: "bg-day-rest",
  },
};

export const DAY_TYPE_ORDER: DayType[] = ["school", "training", "match", "rest"];

// "School day" and "Match day" sound off for adult athletes. Override the labels
// when the user's cohort is adult. Kids and teens keep the original sport-school
// framing. The underlying enum value never changes, just the display label.
const ADULT_LABEL_OVERRIDES: Partial<Record<DayType, string>> = {
  school: "Easy day",
  match: "Big day",
};

const ADULT_DESCRIPTION_OVERRIDES: Partial<Record<DayType, string>> = {
  school: "Light activity. Normal portions, low-key.",
  match: "Competition or event day. Carb-load the night before, hydrate early.",
};

export function dayTypeLabel(dt: DayType, cohort: AgeCohort = "child"): string {
  if (cohort === "adult") {
    const override = ADULT_LABEL_OVERRIDES[dt];
    if (override) return override;
  }
  return DAY_TYPES[dt].label;
}

export function dayTypeShortLabel(dt: DayType, cohort: AgeCohort = "child"): string {
  return dayTypeLabel(dt, cohort).replace(/ day$/i, "");
}

export function dayTypeDescription(dt: DayType, cohort: AgeCohort = "child"): string {
  if (cohort === "adult") {
    const override = ADULT_DESCRIPTION_OVERRIDES[dt];
    if (override) return override;
  }
  return DAY_TYPES[dt].description;
}

export const DAYS_OF_WEEK: { idx: number; short: string; long: string }[] = [
  { idx: 0, short: "Sun", long: "Sunday" },
  { idx: 1, short: "Mon", long: "Monday" },
  { idx: 2, short: "Tue", long: "Tuesday" },
  { idx: 3, short: "Wed", long: "Wednesday" },
  { idx: 4, short: "Thu", long: "Thursday" },
  { idx: 5, short: "Fri", long: "Friday" },
  { idx: 6, short: "Sat", long: "Saturday" },
];

export const MEAL_SLOTS: { slot: "breakfast" | "lunch" | "snack" | "dinner"; label: string; emoji: string; tokenClass: string }[] = [
  { slot: "breakfast", label: "Breakfast", emoji: "🥣", tokenClass: "bg-meal-breakfast" },
  { slot: "lunch",     label: "Lunch",     emoji: "🍱", tokenClass: "bg-meal-lunch" },
  { slot: "snack",     label: "Snack",     emoji: "🍎", tokenClass: "bg-meal-snack" },
  { slot: "dinner",    label: "Dinner",    emoji: "🍽️", tokenClass: "bg-meal-dinner" },
];
