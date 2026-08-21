"use client";

import { useCallback, useEffect, useState } from "react";
import { dateKey, readDay, recentDays, writeDay } from "@/lib/player/hydration-history";
import { mergeHydration } from "@/lib/player/hydration-merge";
import {
  loadHydrationRemote,
  saveHydrationRemote,
} from "@/lib/player/hydration-supabase";
import { isSupabaseConfigured } from "@/lib/supabase/config";

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

  // Carry the history between a parent's devices.
  //
  // hydration_logs has been in the schema since the first migration, with its constraint, its
  // index and an RLS policy, and nothing had ever written a row. Every cup logged lived in
  // localStorage on one device: empty history on a new phone, gone with a cleared browser.
  //
  // Runs once per mount rather than on a subscription. Water is logged by one person on one
  // device in the moment, so the conflict worth handling is a device meeting a server that has
  // never heard of it, not two parents tapping the same cup at once.
  const [syncedAt, setSyncedAt] = useState(0);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    let cancelled = false;

    async function sync() {
      // Two weeks, which comfortably covers the seven days the history shows and leaves room
      // for a device that has been shut in a bag since last weekend's tournament.
      const span = recentDays(14);
      const since = span[0].date;
      const local: Record<string, number> = {};
      for (const day of span) local[day.date] = day.cups;

      const remote = await loadHydrationRemote(since);
      if (cancelled) return;

      const { merged, toPush, toApply } = mergeHydration(local, remote, maxCups);

      for (const day of toApply) writeDay(day, merged[day]);
      if (toPush.length > 0) {
        await saveHydrationRemote(Object.fromEntries(toPush.map((d) => [d, merged[d]])));
      }
      // Nudge the read below, so a day that just arrived from the server is shown rather than
      // sitting in localStorage until the next mount.
      if (!cancelled && toApply.length > 0) setSyncedAt((n) => n + 1);
    }

    void sync();
    return () => {
      cancelled = true;
    };
  }, [maxCups]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only hydration of localStorage; SSR renders empty and the client swaps in persisted state on mount.
    setCups(readDay(date));
  }, [date, syncedAt]);

  // Fire and forget. The tap has already been written to localStorage and reflected on screen,
  // so a failed write here costs the next sync a correction, not the parent their cup.
  const pushDay = useCallback((day: string, value: number) => {
    if (!isSupabaseConfigured) return;
    void saveHydrationRemote({ [day]: value });
  }, []);

  const increment = useCallback(() => {
    setCups((c) => {
      if (c >= maxCups) return c;
      const next = c + 1;
      writeDay(date, next);
      pushDay(date, next);
      return next;
    });
  }, [date, maxCups, pushDay]);

  const decrement = useCallback(() => {
    setCups((c) => {
      const next = Math.max(0, c - 1);
      writeDay(date, next);
      pushDay(date, next);
      return next;
    });
  }, [date, pushDay]);

  const setExact = useCallback(
    (n: number) => {
      const clamped = Math.min(maxCups, Math.max(0, n));
      setCups(clamped);
      writeDay(date, clamped);
      pushDay(date, clamped);
    },
    [date, maxCups, pushDay]
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
