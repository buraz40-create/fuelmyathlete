"use client";

import { useCallback, useEffect, useState } from "react";
import type { PlayerProfile } from "@/types/domain";
import { profileStorage } from "@/lib/player/profile";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { loadProfileRemote, saveProfileRemote } from "@/lib/player/profile-supabase";

export function usePlayerProfile() {
  const [profile, setProfile] = useState<PlayerProfile | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (isSupabaseConfigured) {
        const remote = await loadProfileRemote();
        if (cancelled) return;
        if (remote) {
          setProfile(remote);
          // Mirror to localStorage as a cache so SSR + offline reads work.
          profileStorage.save(remote);
        } else {
          // No remote profile yet. If this device already has one, the parent used the app
          // anonymously and then signed in, so adopt the local copy rather than leaving the
          // account empty. Without this, loadProfileRemote keeps returning null forever and a
          // second device bounces them back to onboarding.
          const local = profileStorage.load();
          setProfile(local);
          if (local) {
            saveProfileRemote(local).catch(() => {
              // Offline or not signed in yet. The local copy is intact and this retries on the
              // next load.
            });
          }
        }
      } else {
        setProfile(profileStorage.load());
      }
      setHydrated(true);
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const save = useCallback(async (next: PlayerProfile) => {
    const stamped: PlayerProfile = { ...next, updatedAt: new Date().toISOString() };
    profileStorage.save(stamped);
    setProfile(stamped);
    if (isSupabaseConfigured) {
      await saveProfileRemote(stamped);
    }
  }, []);

  const clear = useCallback(() => {
    profileStorage.clear();
    setProfile(null);
  }, []);

  return { profile, hydrated, save, clear };
}
