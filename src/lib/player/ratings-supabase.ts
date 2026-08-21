"use client";

import { getBrowserSupabase } from "@/lib/supabase/client";
import { getActivePlayerId } from "@/lib/supabase/family";
import type { RemoteRating } from "@/lib/player/ratings-merge";

// Postgres "undefined table": migration 0004 has not been run against this database yet.
const UNDEFINED_TABLE = "42P01";

let warned = false;

function warnOnce(message: string): void {
  if (warned) return;
  warned = true;
  console.warn(`[ratings] ${message}`);
}

function missingTable(code: string | undefined): boolean {
  return code === UNDEFINED_TABLE;
}

export async function loadRatingsRemote(): Promise<Record<string, RemoteRating> | null> {
  const supabase = getBrowserSupabase();
  if (!supabase) return null;

  const playerId = await getActivePlayerId();
  if (!playerId) return null;

  const { data, error } = await supabase
    .from("meal_ratings")
    .select("meal_slug, rating, updated_at")
    .eq("player_id", playerId);

  if (error) {
    warnOnce(
      missingTable(error.code)
        ? "meal_ratings does not exist yet, so ratings stay on this device. Run supabase/migrations/0004_meal_ratings.sql."
        : `could not read ratings: ${error.message}`
    );
    // null rather than {}, so the caller can tell "nothing to sync with" from "no ratings yet"
    // and does not treat a failed read as the parent having cleared everything.
    return null;
  }

  const out: Record<string, RemoteRating> = {};
  for (const row of (data ?? []) as { meal_slug: string; rating: number; updated_at: string }[]) {
    out[row.meal_slug] = { stars: row.rating, at: row.updated_at };
  }
  return out;
}

export async function pushRatings(entries: { slug: string; stars: number; at: string }[]): Promise<boolean> {
  const supabase = getBrowserSupabase();
  if (!supabase || entries.length === 0) return true;

  const playerId = await getActivePlayerId();
  if (!playerId) return false;

  const { error } = await supabase.from("meal_ratings").upsert(
    entries.map((e) => ({
      player_id: playerId,
      meal_slug: e.slug,
      rating: e.stars,
      updated_at: e.at,
    })),
    { onConflict: "player_id,meal_slug" }
  );

  if (error) {
    warnOnce(
      missingTable(error.code)
        ? "meal_ratings does not exist yet, so nothing was synced. Run supabase/migrations/0004_meal_ratings.sql."
        : `could not save ratings: ${error.message}`
    );
    return false;
  }
  return true;
}

export async function deleteRatings(slugs: string[]): Promise<boolean> {
  const supabase = getBrowserSupabase();
  if (!supabase || slugs.length === 0) return true;

  const playerId = await getActivePlayerId();
  if (!playerId) return false;

  const { error } = await supabase
    .from("meal_ratings")
    .delete()
    .eq("player_id", playerId)
    .in("meal_slug", slugs);

  if (error) {
    warnOnce(`could not remove ratings: ${error.message}`);
    return false;
  }
  return true;
}
