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
          // Fall back to local cache while user finishes onboarding.
          setProfile(profileStorage.load());
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
