import type { DayType, Ingredient, MealSlot } from "@/types/domain";

// Imported recipes live on the device, not on our servers, and that is a deliberate choice
// rather than a shortcut.
//
// The legal research is unambiguous on two points. Ingredient lists, amounts, times and yields
// are facts and are not copyrightable (37 CFR 202.1; Publications International v. Meredith,
// 7th Cir. 1996). But a blogger's headnote and voice-y instructions ARE protectable, and that
// is the one recipe case a plaintiff won (Barbour v. Head, S.D. Tex. 2001). Photographs are the
// largest exposure of all: food-photo enforcement is industrialised, with hundreds of suits and
// opening demands around thirty thousand dollars.
//
// So: we store the parent's own structured facts, on the parent's own device, and never a copy
// of anyone's prose or photograph. A copy that never reaches our infrastructure is also the
// reason DMCA 512(c) has nothing to operate on here. The moment imports sync or become
// shareable, that changes and a designated agent becomes necessary. Keep that in view before
// wiring this to Supabase.

const STORAGE_KEY = "fma:imported-recipes";
const SCHEMA_VERSION = 1;

export type ImportSource = "text" | "url" | "youtube" | "image";

export interface ImportedIngredient {
  /** Catalog slug, or "custom:xxxx" for something the catalog does not carry. */
  ingredientSlug: string;
  /** null when the source never stated an amount. The parent is asked to fill it in. */
  quantity: number | null;
  /** The line exactly as the source wrote it, so the parent can always check our reading. */
  raw: string;
}

export interface ImportedRecipe {
  version: number;
  id: string;
  name: string;
  slot: MealSlot;
  suitableFor: DayType[];
  servings: number | null;
  totalMinutes: number | null;
  ingredients: ImportedIngredient[];
  /** The parent's own words. We never store a copy of the source's prose. */
  steps: string[];
  customIngredients: Ingredient[];
  source: {
    kind: ImportSource;
    /** Kept forever and always shown. Attribution is the whole basis of doing this at all. */
    url?: string;
    siteName?: string;
    importedAt: string;
  };
  /** Ingredient slugs whose amount is still unknown. Drives the "needs an amount" badge. */
  unresolved: string[];
}

function read(): ImportedRecipe[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // Drop anything from a schema we do not understand rather than rendering it half-read.
    return parsed.filter(
      (r): r is ImportedRecipe =>
        typeof r === "object" && r !== null && (r as ImportedRecipe).version === SCHEMA_VERSION
    );
  } catch {
    return [];
  }
}

function write(recipes: ImportedRecipe[]): boolean {
  if (typeof window === "undefined") return false;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
    return true;
  } catch {
    // Quota is the realistic cause, and it is shared with the meal plan. Report the failure
    // so the UI can say the save did not happen, rather than pretending it did.
    return false;
  }
}

/** Short, readable, and only ever local, so collision risk is a non-issue at this scale. */
export function newImportId(): string {
  return Math.random().toString(36).slice(2, 10);
}

export const importedRecipes = {
  all(): ImportedRecipe[] {
    return read();
  },

  get(id: string): ImportedRecipe | undefined {
    return read().find((r) => r.id === id);
  },

  save(recipe: ImportedRecipe): boolean {
    const existing = read();
    const at = existing.findIndex((r) => r.id === recipe.id);
    if (at === -1) existing.push(recipe);
    else existing[at] = recipe;
    return write(existing);
  },

  remove(id: string): boolean {
    return write(read().filter((r) => r.id !== id));
  },

  /** Everything, as JSON. localStorage can be cleared by the browser without warning, and a
   *  recipe the parent typed in by hand is not something we can re-derive. */
  exportAll(): string {
    return JSON.stringify({ version: SCHEMA_VERSION, recipes: read() }, null, 2);
  },
};
