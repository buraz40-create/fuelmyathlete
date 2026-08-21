import { test } from "node:test";
import assert from "node:assert/strict";
import { chooseNewer, type StoredPreferences } from "../preferences-merge.ts";

// The one decision here that can lose a parent's settings. Two devices, two copies, and picking
// wrong means exclusions the parent set come back, or the ones they removed reappear.
//
// The bias throughout is: keep the device's copy unless the remote one is provably newer. A
// device holding a slightly stale copy of two small settings is a mild annoyance. Silently
// clearing the list of meals a child will not eat is the failure that matters, because
// auto-fill would then start serving them again and nobody would know why.

const at = (iso: string | null, excluded: string[] = []): StoredPreferences => ({
  excludedMeals: excluded,
  weeklySchedule: null,
  updatedAt: iso,
});

test("a newer remote copy wins", () => {
  const r = chooseNewer(at("2026-08-01T00:00:00Z"), at("2026-08-02T00:00:00Z"));
  assert.equal(r.winner, "remote");
});

test("a newer local copy wins", () => {
  const r = chooseNewer(at("2026-08-03T00:00:00Z"), at("2026-08-02T00:00:00Z"));
  assert.equal(r.winner, "local");
});

test("identical timestamps keep the device's copy", () => {
  // Nothing to gain from a round trip, and preferring remote here would make two devices
  // ping-pong the same values back and forth forever.
  const same = "2026-08-02T00:00:00Z";
  assert.equal(chooseNewer(at(same), at(same)).winner, "local");
});

test("no remote record leaves the device alone", () => {
  const r = chooseNewer(at("2026-08-01T00:00:00Z", ["oatmeal"]), null);
  assert.equal(r.winner, "local");
});

test("a remote record with no timestamp never wins", () => {
  // This is the shape a half-finished or hand-edited write leaves behind. Letting it win would
  // wipe the exclusion list with no way to tell what happened.
  const r = chooseNewer(at("2026-08-01T00:00:00Z", ["oatmeal"]), at(null, []));
  assert.equal(r.winner, "local");
  assert.match(r.reason, /timestamp/);
});

test("an unreadable remote timestamp never wins", () => {
  const r = chooseNewer(at("2026-08-01T00:00:00Z", ["oatmeal"]), at("not a date", []));
  assert.equal(r.winner, "local");
});

test("a device that has never changed these takes the remote copy", () => {
  // The case this feature exists for: a second device opening the app for the first time.
  const r = chooseNewer(at(null), at("2026-08-02T00:00:00Z", ["oatmeal"]));
  assert.equal(r.winner, "remote");
});

test("a device with no timestamp and an unreadable remote one keeps local", () => {
  const r = chooseNewer(at(null, ["oatmeal"]), at("nonsense", []));
  assert.equal(r.winner, "local");
});

test("a remote copy that clears everything still wins if it is newer", () => {
  // A parent restoring every meal on another device is a real edit, not an empty record. The
  // guard against empty records lives in the parser, which refuses ones carrying no timestamp.
  const r = chooseNewer(at("2026-08-01T00:00:00Z", ["oatmeal"]), at("2026-08-05T00:00:00Z", []));
  assert.equal(r.winner, "remote");
});

test("settings made before timestamps existed are not treated as a blank device", () => {
  // Everyone already using the app is in this state: they have exclusions in localStorage and
  // no fma:preferences-updated-at key, because it did not exist when they set them. Reading
  // that as "this device has no opinion" would delete the settings of exactly the people who
  // have been here longest.
  const local: StoredPreferences = {
    excludedMeals: ["athlete-overnight-oats"],
    weeklySchedule: null,
    updatedAt: null,
  };
  const r = chooseNewer(local, at("2026-08-02T00:00:00Z", []));
  assert.equal(r.winner, "local");
  assert.match(r.reason, /before timestamps existed/);
});

test("a genuinely blank device still takes the remote copy", () => {
  const blank: StoredPreferences = { excludedMeals: [], weeklySchedule: null, updatedAt: null };
  assert.equal(chooseNewer(blank, at("2026-08-02T00:00:00Z", ["oatmeal"])).winner, "remote");
});
