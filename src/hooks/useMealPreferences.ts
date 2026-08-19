"use client";

import { useCallback, useEffect, useState } from "react";
import { mealPreferences } from "@/lib/player/preferences";

export function useMealPreferences() {
  const [excluded, setExcluded] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only read of localStorage; SSR renders the empty list and the client swaps in the stored one.
    setExcluded(mealPreferences.excluded());
    setHydrated(true);
  }, []);

  const toggle = useCallback((slug: string) => {
    setExcluded(mealPreferences.toggle(slug));
  }, []);

  const restore = useCallback((slug: string) => {
    setExcluded(mealPreferences.restore(slug));
  }, []);

  const isExcluded = useCallback((slug: string) => excluded.includes(slug), [excluded]);

  return { excluded, hydrated, toggle, restore, isExcluded };
}
