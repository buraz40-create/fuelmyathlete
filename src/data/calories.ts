import type { ActivityLevel, PlayerProfile } from "@/types/domain";
import { ageToCohort } from "@/lib/player/cohort";

// Mifflin-St Jeor BMR (most accurate for adults 18+).
// Pediatric BMR uses Schofield equations; for now we only show calories to adults
// per AAP guidance against calorie counting in pre-teens. If the user is under 18
// we return null and the UI hides the totals card entirely.

const ACTIVITY_MULTIPLIER: Record<ActivityLevel, number> = {
  light: 1.375,
  moderate: 1.55,
  heavy: 1.9,
};

export interface CalorieTarget {
  bmrKcal: number;
  tdeeKcal: number;
  activityMultiplier: number;
  formula: string;
}

export function calorieTarget(profile: PlayerProfile): CalorieTarget | null {
  if (ageToCohort(profile.ageYears) === "child") return null;
  if (profile.sex == null || profile.heightIn == null) return null;

  const kg = profile.weightLb / 2.2046;
  const cm = profile.heightIn * 2.54;
  const ageBonus = profile.sex === "male" ? 5 : -161;
  const bmr = 10 * kg + 6.25 * cm - 5 * profile.ageYears + ageBonus;

  const activity = profile.activityLevel ?? "moderate";
  const multiplier = ACTIVITY_MULTIPLIER[activity];
  const tdee = bmr * multiplier;

  return {
    bmrKcal: Math.round(bmr),
    tdeeKcal: Math.round(tdee),
    activityMultiplier: multiplier,
    formula: "Mifflin-St Jeor + activity multiplier",
  };
}
