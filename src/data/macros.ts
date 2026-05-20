export type SportCategory = "endurance" | "strength" | "mixed";

export interface MacroSplit {
  carbPct: number;
  proteinPct: number;
  fatPct: number;
  label: string;
}

export const MACRO_SPLITS: Record<SportCategory, MacroSplit> = {
  endurance: { carbPct: 60, proteinPct: 13, fatPct: 27, label: "Endurance (running, cycling)" },
  strength: { carbPct: 45, proteinPct: 30, fatPct: 25, label: "Strength (lifting, throwing)" },
  mixed: { carbPct: 55, proteinPct: 18, fatPct: 27, label: "Team sport (soccer, basketball)" },
};

const SPORT_TO_CATEGORY: Record<string, SportCategory> = {
  soccer: "mixed",
  basketball: "mixed",
  football: "mixed",
  hockey: "mixed",
  baseball: "mixed",
  tennis: "mixed",
  running: "endurance",
  cycling: "endurance",
  swimming: "endurance",
  triathlon: "endurance",
  rowing: "endurance",
  weightlifting: "strength",
  crossfit: "strength",
  powerlifting: "strength",
};

export function macroSplitForSport(sport?: string): MacroSplit {
  if (!sport) return MACRO_SPLITS.mixed;
  const cat = SPORT_TO_CATEGORY[sport.toLowerCase()] ?? "mixed";
  return MACRO_SPLITS[cat];
}

export interface MacroGrams {
  carbG: number;
  proteinG: number;
  fatG: number;
}

export function macroGramsFromKcal(kcal: number, split: MacroSplit): MacroGrams {
  return {
    carbG: Math.round((kcal * (split.carbPct / 100)) / 4),
    proteinG: Math.round((kcal * (split.proteinPct / 100)) / 4),
    fatG: Math.round((kcal * (split.fatPct / 100)) / 9),
  };
}
