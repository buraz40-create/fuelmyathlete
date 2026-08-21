"use client";

import { useEffect } from "react";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { mealRatings, ratingTimes, touchRating } from "@/lib/player/ratings";
import { mergeRatings, type LocalRating } from "@/lib/player/ratings-merge";
import {
  deleteRatings,
  loadRatingsRemote,
  pushRatings,
} from "@/lib/player/ratings-supabase";

/**
 * Carries meal ratings between a parent's devices.
 *
 * Renders nothing. Mounted in AppShell, which wraps every surface that shows a rating: the
 * recipe page, the recipes grid, the planner slots and the meal picker.
 *
 * This matters more than it looks. Auto-fill only offers meals rated three or better, so before
 * this a second device planned the week from our guesses rather than from what the child will
 * actually eat, and the parent had to teach it all over again.
 */
export function RatingsSync() {
  useEffect(() => {
    if (!isSupabaseConfigured) return;
    let cancelled = false;

    async function sync() {
      const remote = await loadRatingsRemote();
      // null means we could not read: not signed in, offline, or the table is not there yet.
      // Treating that as "the server has nothing" would delete every rating on the device.
      if (remote === null || cancelled) return;

      const stars = mealRatings.all();
      const times = ratingTimes();
      const local: Record<string, LocalRating> = {};
      for (const slug of new Set([...Object.keys(stars), ...Object.keys(times)])) {
        local[slug] = { stars: stars[slug], at: times[slug] };
      }

      const { merged, toPush, toDeleteRemote, toApplyLocal } = mergeRatings(local, remote);
      if (cancelled) return;

      for (const slug of toApplyLocal) {
        const value = merged[slug];
        mealRatings.adopt(
          slug,
          value === undefined ? undefined : (value as 1 | 2 | 3 | 4 | 5),
          remote[slug]?.at ?? new Date().toISOString()
        );
      }

      const now = new Date().toISOString();
      const outgoing = toPush.map((slug) => {
        // A rating made before timestamps were recorded has none to send, so it gets one now.
        const at = times[slug] ?? now;
        if (!times[slug]) touchRating(slug, at);
        return { slug, stars: merged[slug], at };
      });

      if (outgoing.length > 0) await pushRatings(outgoing);
      if (toDeleteRemote.length > 0) await deleteRatings(toDeleteRemote);
    }

    void sync();
    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
