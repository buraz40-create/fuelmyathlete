"use client";

import { useEffect } from "react";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import {
  applyToLocal,
  chooseNewer,
  hasSettings,
  localSnapshot,
  type StoredPreferences,
} from "@/lib/player/preferences-sync";
import { markPreferencesChanged, preferencesUpdatedAt } from "@/lib/player/preferences-clock";
import {
  loadPreferencesRemote,
  savePreferencesRemote,
} from "@/lib/player/preferences-supabase";

/**
 * Carries meal exclusions and the recurring weekly schedule between a parent's devices.
 *
 * Until now both lived only in localStorage, so a parent who set up the week on a laptop and
 * then opened the app on their phone got the default pattern back and watched auto-fill serve
 * the meals they had told it to stop serving. Elvis will not eat oatmeal, and the phone did not
 * know that.
 *
 * Runs once per mount, on the planner where these settings are used and changed. It reads the
 * remote copy, takes it only if it is genuinely newer, and pushes the device's copy up when the
 * device is ahead. There is deliberately no live subscription: these are two small settings a
 * parent changes rarely, and a listener would be a lot of moving parts guarding against a
 * conflict that needs two devices open at once.
 */
export function usePreferencesSync(onApplied?: (prefs: StoredPreferences) => void): void {
  useEffect(() => {
    if (!isSupabaseConfigured) return;

    let cancelled = false;

    async function sync() {
      const remote = await loadPreferencesRemote();
      if (cancelled) return;

      const local = localSnapshot();
      const { winner } = chooseNewer(local, remote);

      if (winner === "remote" && remote) {
        applyToLocal(remote);
        // The planner is already rendering the old values, so it has to be told.
        onApplied?.(remote);
        return;
      }

      // Somebody who set their exclusions before this timestamp existed has real settings and
      // no way to prove they are current. Adopt them now, once, so they are carried up rather
      // than sitting on one device forever waiting for a change that may never come.
      if (!local.updatedAt && hasSettings(local)) {
        markPreferencesChanged();
        await savePreferencesRemote({ ...local, updatedAt: preferencesUpdatedAt() });
        return;
      }

      // Otherwise only push when there is something to push. A device that has never touched
      // either setting has no opinion worth writing over another device's.
      if (local.updatedAt) await savePreferencesRemote(local);
    }

    void sync();

    return () => {
      cancelled = true;
    };
    // Deliberately once per mount. onApplied is not in the deps because a caller passing an
    // inline function would otherwise re-run this on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
