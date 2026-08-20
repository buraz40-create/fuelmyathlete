"use client";

// What your athlete actually thinks of a meal, as opposed to what we guessed.
//
// Every meal ships with a kidRating, which is our estimate and is the same for everyone. It
// drives auto-fill, so a meal we scored 5 gets picked repeatedly even if your kid refuses it.
// The hidden-meals list already handles outright refusal, but that is a blunt instrument: most
// food is not banned, it is just liked more or less than the alternative.
//
// A parent's own rating overrides ours wherever ordering matters. Device-local, in its own key,
// for the same reason the exclusions are: the profile round-trips through Supabase and the
// players table has no column for this, so hanging it off the profile would mean ratings
// vanishing the first time a signed-in device loaded the remote copy.

const STORAGE_KEY = "fma:meal-ratings";

export type Stars = 1 | 2 | 3 | 4 | 5;

function read(): Record<string, Stars> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return {};
    const out: Record<string, Stars> = {};
    for (const [slug, value] of Object.entries(parsed as Record<string, unknown>)) {
      // Anything outside 1 to 5 is corrupt or from a future version. Drop it rather than
      // letting it skew the sort in a way nobody can see or explain.
      if (typeof value === "number" && value >= 1 && value <= 5 && Number.isInteger(value)) {
        out[slug] = value as Stars;
      }
    }
    return out;
  } catch {
    return {};
  }
}

function write(all: Record<string, Stars>): boolean {
  if (typeof window === "undefined") return false;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    return true;
  } catch {
    return false;
  }
}

// A tiny subscription so every star widget on the page reflects a change made in any of them.
// Rating a meal in the picker and seeing the recipe card still show the old value would read
// as a bug, and React needs a subscribe function for useSyncExternalStore anyway.
type Listener = () => void;
const listeners = new Set<Listener>();

// The snapshot must be referentially stable between changes or useSyncExternalStore loops
// forever, so the parsed object is cached and only rebuilt when something actually writes.
let snapshot: Record<string, Stars> | null = null;

function emit(): void {
  snapshot = null;
  for (const l of listeners) l();
}

export function subscribeToRatings(listener: Listener): () => void {
  listeners.add(listener);
  // Another tab writing counts as a change here too.
  const onStorage = (e: StorageEvent) => {
    if (e.key === null || e.key === STORAGE_KEY) emit();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

const EMPTY: Record<string, Stars> = {};

/** Cached parse, for useSyncExternalStore. */
export function ratingsSnapshot(): Record<string, Stars> {
  if (snapshot === null) snapshot = read();
  return snapshot;
}

/** The server has no localStorage, so it always sees nobody having rated anything. */
export function ratingsServerSnapshot(): Record<string, Stars> {
  return EMPTY;
}

export const mealRatings = {
  all(): Record<string, Stars> {
    return read();
  },

  /** The parent's rating for this meal, or undefined if they have not rated it. */
  get(slug: string): Stars | undefined {
    return read()[slug];
  },

  set(slug: string, stars: Stars): Record<string, Stars> {
    const next = { ...read(), [slug]: stars };
    write(next);
    emit();
    return next;
  },

  /** Clearing a rating falls back to our default rather than to zero. */
  clear(slug: string): Record<string, Stars> {
    const next = { ...read() };
    delete next[slug];
    write(next);
    emit();
    return next;
  },
};

/**
 * The rating to order by: the parent's if they have given one, otherwise ours.
 *
 * Kept as one function so every place that sorts uses the same rule. Auto-fill, the picker and
 * the recipe card disagreeing about which meals are the good ones would be worse than any of
 * them being wrong.
 */
export function effectiveRating(
  slug: string,
  fallback: number,
  ratings: Record<string, Stars>
): number {
  return ratings[slug] ?? fallback;
}
