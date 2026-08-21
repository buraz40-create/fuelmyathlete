/**
 * Reconciling meal ratings between a device and the server.
 *
 * Import-free, so the test runner can load it.
 *
 * Per slug rather than whole-record, which is the difference from preferences. Rating one meal
 * on a phone must not discard every rating made on the laptop since, and unlike a weekly
 * schedule these are dozens of small independent facts.
 */
export interface LocalRating {
  /** Absent means the parent cleared it, which is a real edit and not the same as never rating. */
  stars?: number;
  /** Absent for ratings made before timestamps were recorded. */
  at?: string;
}

export interface RemoteRating {
  stars: number;
  at: string;
}

export interface RatingsMerge {
  /** The answer per slug. A slug absent here is unrated. */
  merged: Record<string, number>;
  /** Slugs to write to the server. */
  toPush: string[];
  /** Slugs whose server row should be removed, because the parent cleared them. */
  toDeleteRemote: string[];
  /** Slugs the device must change, either to a new value or to cleared. */
  toApplyLocal: string[];
}

function parse(at: string | undefined): number | null {
  if (!at) return null;
  const t = Date.parse(at);
  return Number.isNaN(t) ? null : t;
}

function valid(stars: number | undefined): number | undefined {
  if (typeof stars !== "number" || !Number.isFinite(stars)) return undefined;
  const n = Math.round(stars);
  return n >= 1 && n <= 5 ? n : undefined;
}

/**
 * Newest edit wins, per slug.
 *
 * Clearing a rating is an edit like any other, which is why the device records a time even when
 * it removes the value. Without that, a clear on the phone would be silently reversed by the
 * next sync with a laptop that still held the old star.
 *
 * A local rating with no timestamp is one made before this app recorded them. It is treated as
 * real and kept, the same decision as preferences: those are the ratings of people who have
 * been using the app longest, and reading them as "no opinion" would delete exactly their data.
 * They are pushed up so they gain a timestamp.
 */
export function mergeRatings(
  local: Record<string, LocalRating>,
  remote: Record<string, RemoteRating>
): RatingsMerge {
  const merged: Record<string, number> = {};
  const toPush: string[] = [];
  const toDeleteRemote: string[] = [];
  const toApplyLocal: string[] = [];

  for (const slug of new Set([...Object.keys(local), ...Object.keys(remote)])) {
    const l = local[slug];
    const r = remote[slug];

    const localStars = valid(l?.stars);
    const remoteStars = r ? valid(r.stars) : undefined;
    const lAt = parse(l?.at);
    const rAt = parse(r?.at);

    let winner: number | undefined;
    if (!r) {
      winner = localStars;
    } else if (!l) {
      winner = remoteStars;
    } else if (lAt === null) {
      // Rated before timestamps existed. Keep it rather than letting the server overwrite.
      winner = localStars;
    } else if (rAt === null) {
      winner = localStars;
    } else {
      winner = rAt > lAt ? remoteStars : localStars;
    }

    if (winner !== undefined) merged[slug] = winner;

    if (winner !== remoteStars) {
      if (winner === undefined) toDeleteRemote.push(slug);
      else toPush.push(slug);
    }
    if (winner !== localStars) toApplyLocal.push(slug);
  }

  return {
    merged,
    toPush: toPush.sort(),
    toDeleteRemote: toDeleteRemote.sort(),
    toApplyLocal: toApplyLocal.sort(),
  };
}
