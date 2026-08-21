"use client";

import { useCallback, useSyncExternalStore } from "react";
import {
  exclusionsServerSnapshot,
  exclusionsSnapshot,
  mealPreferences,
  subscribeToExclusions,
} from "@/lib/player/preferences";

export function useMealPreferences() {
  // useSyncExternalStore rather than read-once-in-an-effect. localStorage is genuinely an
  // external store, and this is what makes a set of exclusions arriving from another device
  // show up in the planner rather than waiting for a reload.
  const excluded = useSyncExternalStore(
    subscribeToExclusions,
    exclusionsSnapshot,
    exclusionsServerSnapshot
  );

  // Kept for callers that render a placeholder until the client has read storage. The server
  // snapshot is the empty list, so anything true after mount means storage has been read.
  const hydrated = useSyncExternalStore(
    subscribeToExclusions,
    () => true,
    () => false
  );

  const toggle = useCallback((slug: string) => {
    mealPreferences.toggle(slug);
  }, []);

  const restore = useCallback((slug: string) => {
    mealPreferences.restore(slug);
  }, []);

  const isExcluded = useCallback((slug: string) => excluded.includes(slug), [excluded]);

  return { excluded, hydrated, toggle, restore, isExcluded };
}
