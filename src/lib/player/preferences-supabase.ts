"use client";

import { getBrowserSupabase } from "@/lib/supabase/client";
import { getActivePlayerId } from "@/lib/supabase/family";
import type { StoredPreferences } from "@/lib/player/preferences-sync";
import type { WeeklySchedule } from "@/lib/player/schedule";

const VALID_DAY_TYPES = ["school", "training", "match", "rest"];

// Postgres "undefined column". It means migration 0003 has not been run against this database.
// Worth telling apart from a genuine failure, because the app is completely fine without it and
// should not be noisy, but somebody debugging deserves to know which of the two it was.
const UNDEFINED_COLUMN = "42703";

let warned = false;

function warnOnce(message: string): void {
  if (warned) return;
  warned = true;
  console.warn(`[preferences] ${message}`);
}

/**
 * Anything can be sitting in a jsonb column, including a shape written by a newer version of
 * this app. Validate rather than trust, and drop anything unrecognised, because the cost of
 * accepting a malformed schedule is a planner that renders a week of undefined day types.
 */
function parse(value: unknown): StoredPreferences | null {
  if (!value || typeof value !== "object") return null;
  const raw = value as Record<string, unknown>;

  const excludedMeals = Array.isArray(raw.excludedMeals)
    ? raw.excludedMeals.filter((s): s is string => typeof s === "string")
    : [];

  const schedule = raw.weeklySchedule;
  const weeklySchedule =
    Array.isArray(schedule) &&
    schedule.length === 7 &&
    schedule.every((d) => typeof d === "string" && VALID_DAY_TYPES.includes(d))
      ? (schedule as WeeklySchedule)
      : null;

  const updatedAt = typeof raw.updatedAt === "string" ? raw.updatedAt : null;

  // An empty record with no timestamp carries no information and must not be treated as a
  // record at all, or it would look like a deliberate "clear everything" to the merge.
  if (!updatedAt && excludedMeals.length === 0 && !weeklySchedule) return null;

  return { excludedMeals, weeklySchedule, updatedAt };
}

export async function loadPreferencesRemote(): Promise<StoredPreferences | null> {
  const supabase = getBrowserSupabase();
  if (!supabase) return null;

  const playerId = await getActivePlayerId();
  if (!playerId) return null;

  const { data, error } = await supabase
    .from("players")
    .select("preferences")
    .eq("id", playerId)
    .maybeSingle();

  if (error) {
    warnOnce(
      error.code === UNDEFINED_COLUMN
        ? "players.preferences does not exist yet, so exclusions and the weekly schedule stay on this device. Run supabase/migrations/0003_player_preferences.sql."
        : `could not read preferences: ${error.message}`
    );
    return null;
  }

  return parse((data as { preferences?: unknown } | null)?.preferences);
}

export async function savePreferencesRemote(prefs: StoredPreferences): Promise<boolean> {
  const supabase = getBrowserSupabase();
  if (!supabase) return false;

  const playerId = await getActivePlayerId();
  if (!playerId) return false;

  const { error } = await supabase
    .from("players")
    .update({ preferences: prefs })
    .eq("id", playerId);

  if (error) {
    warnOnce(
      error.code === UNDEFINED_COLUMN
        ? "players.preferences does not exist yet, so nothing was synced. Run supabase/migrations/0003_player_preferences.sql."
        : `could not save preferences: ${error.message}`
    );
    return false;
  }

  return true;
}
