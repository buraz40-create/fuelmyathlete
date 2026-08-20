"use client";

import { getBrowserSupabase } from "@/lib/supabase/client";

// One place that answers "which player am I saving for", for every remote store.
//
// A trigger on auth.users is supposed to create a family and a player at signup. It does
// exist, but it was added after the first account was created, so that account had neither,
// and every sync silently did nothing: no family means no player, no player means the plan
// and profile loaders return null and the savers give up early. Sign-in worked perfectly and
// nothing was ever written. Production showed 1 user and 0 families, 0 players, 0 plans.
//
// Two lessons are baked in here. Depending on a signup trigger alone means any user it misses,
// for any reason, gets an account that looks fine and stores nothing, so the app provisions on
// demand as well. And this used to be duplicated in the plan store and the profile store,
// which is why one page load fired the families query ten times, so it is resolved once per
// tab and shared.
//
// RLS permits the insert: families_owner_all is `for all` with check owner_id = auth.uid(),
// so a user can create their own family and nobody else's.

let cached: Promise<string | null> | null = null;

async function resolve(): Promise<string | null> {
  const supabase = getBrowserSupabase();
  if (!supabase) return null;

  const { data: auth } = await supabase.auth.getUser();
  const userId = auth?.user?.id;
  if (!userId) return null;

  let { data: family } = await supabase
    .from("families")
    .select("id")
    .limit(1)
    .maybeSingle();

  if (!family) {
    const { data: created, error } = await supabase
      .from("families")
      .insert({ name: "My Family", owner_id: userId })
      .select("id")
      .single();
    if (error) {
      // Another tab probably won the race. Re-read rather than fail the whole session.
      const { data: reread } = await supabase.from("families").select("id").limit(1).maybeSingle();
      if (!reread) return null;
      family = reread;
    } else {
      family = created;
    }
  }

  const { data: player } = await supabase
    .from("players")
    .select("id")
    .eq("family_id", family.id)
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();
  if (player) return player.id;

  const { data: createdPlayer } = await supabase
    .from("players")
    .insert({ family_id: family.id, name: "My Athlete", sport: "soccer" })
    .select("id")
    .single();
  return createdPlayer?.id ?? null;
}

/** The signed-in user's first player, provisioning the family and player if they are missing. */
export function getActivePlayerId(): Promise<string | null> {
  if (!cached) {
    cached = resolve().catch(() => {
      // Never cache a failure, or one flaky request disables sync for the rest of the session.
      cached = null;
      return null;
    });
  }
  return cached;
}

/** Called on sign-out so the next user does not inherit the previous one's player. */
export function resetActivePlayerCache(): void {
  cached = null;
}
