import type { DayType } from "@/types/domain";

/**
 * The shape stored in players.preferences, and the rule for choosing between two copies.
 *
 * Deliberately free of imports from the stores it describes. The test runner resolves module
 * specifiers literally, with no tsconfig path aliases, so anything reaching for "@/lib/..."
 * cannot be unit tested. This is the one decision here that can lose a parent's settings, so it
 * lives where a test can actually reach it.
 */
export interface StoredPreferences {
  excludedMeals: string[];
  /** null means never customised, so the default pattern still applies. */
  weeklySchedule: DayType[] | null;
  updatedAt: string | null;
}

/** Does this copy actually say anything, as opposed to being an untouched device? */
export function hasSettings(prefs: StoredPreferences): boolean {
  return prefs.excludedMeals.length > 0 || prefs.weeklySchedule !== null;
}

/**
 * Which copy wins.
 *
 * Remote has to be strictly newer, and readable, to take over. Everything else keeps the
 * device's own copy, because the failure that matters is a parent's settings disappearing, not
 * a device briefly holding a stale copy of two small settings.
 *
 * The order of these checks matters more than it looks. Two cases are easy to get wrong and
 * both were, first time through:
 *
 *   - An unreadable remote timestamp must be rejected before anything else consults it.
 *     Otherwise a device with no timestamp of its own accepts garbage and clears the list of
 *     meals the child will not eat.
 *   - A device with no timestamp but real settings on it is not a blank device. It is somebody
 *     who set their exclusions before this timestamp existed. Treating that as blank would
 *     delete the settings of every user who was already here, which is the one group who
 *     cannot have been expecting it. They keep their copy, and the caller stamps and pushes it.
 */
export function chooseNewer(
  local: StoredPreferences,
  remote: StoredPreferences | null
): { winner: "local" | "remote"; reason: string } {
  if (!remote) return { winner: "local", reason: "no remote record" };
  if (!remote.updatedAt) return { winner: "local", reason: "remote has no timestamp" };

  const r = Date.parse(remote.updatedAt);
  if (Number.isNaN(r)) return { winner: "local", reason: "remote timestamp is unreadable" };

  if (!local.updatedAt) {
    return hasSettings(local)
      ? { winner: "local", reason: "device has settings from before timestamps existed" }
      : { winner: "remote", reason: "device has never changed these" };
  }

  const l = Date.parse(local.updatedAt);
  if (Number.isNaN(l)) return { winner: "remote", reason: "device timestamp is unreadable" };

  if (r > l) return { winner: "remote", reason: "remote is newer" };
  return { winner: "local", reason: r === l ? "same timestamp, device wins" : "device is newer" };
}
