"use client";

import { getBrowserSupabase } from "@/lib/supabase/client";
import { getActivePlayerId } from "@/lib/supabase/family";

// hydration_logs has existed since the first migration, with its unique constraint, its index
// and an RLS policy scoping it to the signed-in parent's own players. Nothing had ever written
// to it. Every cup a parent logged lived in localStorage on one device and went no further,
// so the hydration history was empty on a new phone and gone with a cleared browser.

let warned = false;

function warnOnce(message: string): void {
  if (warned) return;
  warned = true;
  console.warn(`[hydration] ${message}`);
}

/** Cups per date, for dates on or after `since`. */
export async function loadHydrationRemote(since: string): Promise<Record<string, number>> {
  const supabase = getBrowserSupabase();
  if (!supabase) return {};

  const playerId = await getActivePlayerId();
  if (!playerId) return {};

  const { data, error } = await supabase
    .from("hydration_logs")
    .select("logged_date, cups")
    .eq("player_id", playerId)
    .gte("logged_date", since);

  if (error) {
    warnOnce(`could not read hydration history: ${error.message}`);
    return {};
  }

  const out: Record<string, number> = {};
  for (const row of (data ?? []) as { logged_date: string; cups: number | null }[]) {
    out[row.logged_date] = typeof row.cups === "number" ? row.cups : 0;
  }
  return out;
}

/**
 * Write several days at once.
 *
 * One upsert rather than a request per day, because the first sync on a device that has been
 * used for a while can be a fortnight of history. Conflicts resolve on the table's own
 * (player_id, logged_date) uniqueness.
 */
export async function saveHydrationRemote(days: Record<string, number>): Promise<boolean> {
  const supabase = getBrowserSupabase();
  if (!supabase) return false;
  const dates = Object.keys(days);
  if (dates.length === 0) return true;

  const playerId = await getActivePlayerId();
  if (!playerId) return false;

  const { error } = await supabase
    .from("hydration_logs")
    .upsert(
      dates.map((date) => ({ player_id: playerId, logged_date: date, cups: days[date] })),
      { onConflict: "player_id,logged_date" }
    );

  if (error) {
    warnOnce(`could not save hydration: ${error.message}`);
    return false;
  }
  return true;
}
