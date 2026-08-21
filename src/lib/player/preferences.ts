// Meals the athlete will not eat. Kept in its own localStorage key rather than on the
// profile, deliberately: the profile round-trips through Supabase and the players table has
// no column for this, so hanging it off the profile would mean exclusions silently vanishing
// the first time a signed-in device loaded the remote copy.
//
// It syncs now, through players.preferences rather than through the profile, so the two cannot
// overwrite each other. See preferences-sync.ts for which copy wins.
//
// The rule this exists for: Elvis will not eat oatmeal, and auto-fill was cheerfully serving
// him overnight oats.

import { markPreferencesChanged } from "@/lib/player/preferences-clock";

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

// Observable, the same way ratings are, so a copy arriving from another device updates the
// planner instead of sitting in localStorage until the next reload.
//
// The snapshot has to be referentially stable between writes or useSyncExternalStore spins
// forever, so the parsed array is cached and thrown away only when something writes.
type Listener = () => void;
const listeners = new Set<Listener>();
let snapshot: string[] | null = null;
const EMPTY: string[] = [];

function emit(): void {
  snapshot = null;
  for (const l of listeners) l();
}

export function subscribeToExclusions(listener: Listener): () => void {
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

/** Cached parse, for useSyncExternalStore. */
export function exclusionsSnapshot(): string[] {
  if (snapshot === null) snapshot = read();
  return snapshot;
}

/** The server has no localStorage, so nothing is excluded there. */
export function exclusionsServerSnapshot(): string[] {
  return EMPTY;
}

function write(slugs: string[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
    // Stamped on every change so another device can tell which copy is the later one.
    markPreferencesChanged();
    emit();
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
