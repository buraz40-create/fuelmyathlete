// Meals the athlete will not eat. Kept in its own localStorage key rather than on the
// profile, deliberately: the profile round-trips through Supabase and the players table has
// no column for this, so hanging it off the profile would mean exclusions silently vanishing
// the first time a signed-in device loaded the remote copy. Device-local for now. Syncing it
// needs a migration and a column, which is Gate 2 work.
//
// The rule this exists for: Elvis will not eat oatmeal, and auto-fill was cheerfully serving
// him overnight oats.

const STORAGE_KEY = "fma:excluded-meals";

function read(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((s): s is string => typeof s === "string") : [];
  } catch {
    return [];
  }
}

function write(slugs: string[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
  } catch {
    // Storage blocked or full. The in-memory state still reflects the choice this session.
  }
}

export const mealPreferences = {
  excluded(): string[] {
    return read();
  },

  isExcluded(slug: string): boolean {
    return read().includes(slug);
  },

  exclude(slug: string): string[] {
    const next = Array.from(new Set([...read(), slug]));
    write(next);
    return next;
  },

  restore(slug: string): string[] {
    const next = read().filter((s) => s !== slug);
    write(next);
    return next;
  },

  toggle(slug: string): string[] {
    return read().includes(slug) ? mealPreferences.restore(slug) : mealPreferences.exclude(slug);
  },
};
