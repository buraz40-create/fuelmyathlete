import type { PlayerProfile } from "@/types/domain";

const STORAGE_KEY = "fma:profile";

export const profileStorage = {
  load(): PlayerProfile | null {
    if (typeof window === "undefined") return null;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw) as PlayerProfile;
      if (!parsed.name || !parsed.ageYears || !parsed.weightLb) return null;
      return parsed;
    } catch {
      return null;
    }
  },

  save(profile: PlayerProfile): void {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch {
      // Silent fail.
    }
  },

  clear(): void {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(STORAGE_KEY);
  },
};

export function newProfile(input: {
  name: string;
  ageYears: number;
  weightLb: number;
}): PlayerProfile {
  const now = new Date().toISOString();
  return {
    name: input.name.trim(),
    ageYears: input.ageYears,
    weightLb: input.weightLb,
    createdAt: now,
    updatedAt: now,
  };
}
