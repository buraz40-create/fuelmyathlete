"use client";

import { useCallback, useEffect, useState } from "react";

const OZ_PER_CUP = 8;
const STORAGE_PREFIX = "fma:water:";

function todayKey(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function load(date: string): number {
  if (typeof window === "undefined") return 0;
  const raw = window.localStorage.getItem(`${STORAGE_PREFIX}${date}`);
  const n = raw ? parseInt(raw, 10) : 0;
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

function save(date: string, cups: number) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(`${STORAGE_PREFIX}${date}`, String(cups));
}

// Ceiling on what can be logged, not just on what we suggest. The cohort cap exists
// because children are more vulnerable to hyponatremia than adults, and a tracker that
// happily accepts 30 cups undoes the cap it is supposed to enforce. Defaults to the
// child cap because an unknown drinker on a pediatric product is treated as a child.
const DEFAULT_CAP_OZ = 100;

interface UseHydrationOptions {
  capOz?: number;
}

export function useHydration({ capOz = DEFAULT_CAP_OZ }: UseHydrationOptions = {}) {
  const [date] = useState<string>(() => todayKey());
  const [cups, setCups] = useState<number>(0);

  const maxCups = Math.floor(capOz / OZ_PER_CUP);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only hydration of localStorage; SSR renders empty and the client swaps in persisted state on mount.
    setCups(load(date));
  }, [date]);

  const increment = useCallback(() => {
    setCups((c) => {
      if (c >= maxCups) return c;
      const next = c + 1;
      save(date, next);
      return next;
    });
  }, [date, maxCups]);

  const decrement = useCallback(() => {
    setCups((c) => {
      const next = Math.max(0, c - 1);
      save(date, next);
      return next;
    });
  }, [date]);

  const setExact = useCallback(
    (n: number) => {
      const clamped = Math.min(maxCups, Math.max(0, n));
      setCups(clamped);
      save(date, clamped);
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
