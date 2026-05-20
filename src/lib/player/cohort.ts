import type { AgeCohort, PlayerProfile } from "@/types/domain";

export function ageToCohort(years: number): AgeCohort {
  if (years < 13) return "child";
  if (years < 18) return "teen";
  return "adult";
}

export function shouldShowCalories(profile: PlayerProfile): boolean {
  const cohort = ageToCohort(profile.ageYears);
  if (cohort === "child") return false;
  if (cohort === "adult") return true;
  return profile.parentShowCaloriesToTeen ?? false;
}

export function portionScale(profile: PlayerProfile): number {
  if (ageToCohort(profile.ageYears) === "child") return 1.0;
  return Math.max(0.6, Math.min(2.5, profile.weightLb / 88));
}

export function cohortLabel(cohort: AgeCohort): string {
  if (cohort === "child") return "Youth athlete";
  if (cohort === "teen") return "Teen athlete";
  return "Adult athlete";
}

export function isValidProfile(profile: Partial<PlayerProfile>): profile is PlayerProfile {
  if (!profile.name || profile.name.trim().length === 0) return false;
  if (typeof profile.ageYears !== "number" || profile.ageYears < 5 || profile.ageYears > 99) return false;
  if (typeof profile.weightLb !== "number" || profile.weightLb < 30 || profile.weightLb > 500) return false;
  return true;
}
