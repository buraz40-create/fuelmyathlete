"use client";

import { useCallback, useEffect, useState } from "react";
import { dateKey, readDay, writeDay } from "@/lib/player/hydration-history";

const OZ_PER_CUP = 8;

// Ceiling on what can be logged, not just on what we suggest. The cohort cap exists
// because children are more vulnerable to hyponatremia than adults, and a tracker that
// happily accepts 30 cups undoes the cap it is supposed to enforce. Defaults to the
// child cap because an unknown drinker on a pediatric product is treated as a child.
const DEFAULT_CAP_OZ = 100;

interface UseHydrationOptions {
  capOz?: number;
}

export function useHydration({ capOz = DEFAULT_CAP_OZ }: UseHydrationOptions = {}) {
  const [date, setDate] = useState<string>(() => dateKey());
  const [cups, setCups] = useState<number>(0);

  const maxCups = Math.floor(capOz / OZ_PER_CUP);

  // The date used to be captured once at mount and never revisited, so a tablet left open on
  // the kitchen counter overnight kept writing today's water into yesterday's row, and showed
  // yesterday's total as though it were today's.
  useEffect(() => {
    function syncDate() {
      const now = dateKey();
      setDate((prev) => (prev === now ? prev : now));
    }
    const timer = window.setInterval(syncDate, 60_000);
    window.addEventListener("focus", syncDate);
    document.addEventListener("visibilitychange", syncDate);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener("focus", syncDate);
      document.removeEventListener("visibilitychange", syncDate);
    };
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only hydration of localStorage; SSR renders empty and the client swaps in persisted state on mount.
    setCups(readDay(date));
  }, [date]);

  const increment = useCallback(() => {
    setCups((c) => {
      if (c >= maxCups) return c;
      const next = c + 1;
      writeDay(date, next);
      return next;
    });
  }, [date, maxCups]);

  const decrement = useCallback(() => {
    setCups((c) => {
      const next = Math.max(0, c - 1);
      writeDay(date, next);
      return next;
    });
  }, [date]);

  const setExact = useCallback(
    (n: number) => {
      const clamped = Math.min(maxCups, Math.max(0, n));
      setCups(clamped);
      writeDay(date, clamped);
    },
    [date, maxCups]
  );

  return {
    date,
    cups,
    oz: cups * OZ_PER_CUP,
    ozPerCup: OZ_PER_CUP,
    capOz,
    maxCups,
    atCap: cups >= maxCups,
    increment,
    decrement,
    setCups: setExact,
  };
}
