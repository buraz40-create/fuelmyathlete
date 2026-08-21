/**
 * Reconciling a day's water between a device and the server.
 *
 * No alias imports, so the test runner can load it. The rule below is the one that can lose a
 * day of logging, which is exactly the kind of thing that should be testable.
 */
export interface HydrationMerge {
  /** What every known date should read after reconciling. */
  merged: Record<string, number>;
  /** Dates where this device knows more than the server, so the server needs writing. */
  toPush: string[];
  /** Dates where the server knows more than this device. */
  toApply: string[];
}

/**
 * The higher count wins for any given date.
 *
 * Water is logged a cup at a time on whichever device is in the room, so the realistic conflict
 * is not two devices disagreeing about the same afternoon: it is one device having the day and
 * the other having nothing. Taking the higher number never loses a logged cup, and losing
 * logged water is the failure a parent would actually notice and be annoyed by.
 *
 * The cost is a correction. Tapping the minus button on the phone, having already synced the
 * higher number, would see the higher number come back. That is a genuinely worse outcome than
 * last-write-wins would give, and it is accepted deliberately: it needs two devices, a
 * correction, and a sync in between, whereas the case this protects happens the first time
 * anybody opens the app on a second device. Doing better needs a timestamp per day per device,
 * which is a lot of machinery for a counter that resets every midnight.
 *
 * The cap is not a display concern. Both sides are already capped when they write, because
 * children are more vulnerable to hyponatremia than adults, but the caps are per cohort and a
 * profile can change, so the merged number is clamped again rather than trusted.
 */
export function mergeHydration(
  local: Record<string, number>,
  remote: Record<string, number>,
  maxCups: number
): HydrationMerge {
  const merged: Record<string, number> = {};
  const toPush: string[] = [];
  const toApply: string[] = [];

  for (const date of new Set([...Object.keys(local), ...Object.keys(remote)])) {
    const rawLocal = local[date];
    const rawRemote = remote[date];
    const winner = Math.max(clamp(rawLocal, maxCups), clamp(rawRemote, maxCups));
    merged[date] = winner;

    // Compared against the raw stored values, not the clamped ones. Comparing clamped values
    // would agree that both sides already hold the cap and write nothing, leaving a row on the
    // server that is still over it. Whichever side does not already equal the answer gets
    // corrected, including downward.
    if (rawRemote !== winner) toPush.push(date);
    if (rawLocal !== winner) toApply.push(date);
  }

  return { merged, toPush: toPush.sort(), toApply: toApply.sort() };
}

function clamp(value: number | undefined, maxCups: number): number {
  if (typeof value !== "number" || !Number.isFinite(value) || value < 0) return 0;
  return Math.min(Math.floor(value), maxCups);
}
