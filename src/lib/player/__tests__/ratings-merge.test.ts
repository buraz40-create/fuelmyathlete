import { test } from "node:test";
import assert from "node:assert/strict";
import { mergeRatings } from "../ratings-merge.ts";

const EARLY = "2026-08-01T00:00:00Z";
const LATE = "2026-08-05T00:00:00Z";

test("a rating only the device has goes up", () => {
  const r = mergeRatings({ tacos: { stars: 5, at: EARLY } }, {});
  assert.equal(r.merged.tacos, 5);
  assert.deepEqual(r.toPush, ["tacos"]);
  assert.deepEqual(r.toApplyLocal, []);
});

test("a rating only the server has comes down", () => {
  const r = mergeRatings({}, { tacos: { stars: 4, at: EARLY } });
  assert.equal(r.merged.tacos, 4);
  assert.deepEqual(r.toApplyLocal, ["tacos"]);
  assert.deepEqual(r.toPush, []);
});

test("the newer edit wins per slug, and other slugs are untouched", () => {
  // The reason this is per slug rather than whole-record: rating one meal on a phone must not
  // discard what was rated on the laptop.
  const r = mergeRatings(
    { tacos: { stars: 2, at: LATE }, salmon: { stars: 5, at: EARLY } },
    { tacos: { stars: 5, at: EARLY }, salmon: { stars: 5, at: EARLY } }
  );
  assert.equal(r.merged.tacos, 2, "device edited tacos more recently");
  assert.equal(r.merged.salmon, 5);
  assert.deepEqual(r.toPush, ["tacos"]);
  assert.deepEqual(r.toApplyLocal, []);
});

test("clearing a rating is an edit and removes the server row", () => {
  // The device keeps a timestamp for the clear even though the value is gone. Without that the
  // old star would come straight back on the next sync.
  const r = mergeRatings({ tacos: { at: LATE } }, { tacos: { stars: 5, at: EARLY } });
  assert.equal(r.merged.tacos, undefined);
  assert.deepEqual(r.toDeleteRemote, ["tacos"]);
  assert.deepEqual(r.toPush, []);
});

test("a stale clear does not beat a newer rating", () => {
  const r = mergeRatings({ tacos: { at: EARLY } }, { tacos: { stars: 3, at: LATE } });
  assert.equal(r.merged.tacos, 3);
  assert.deepEqual(r.toApplyLocal, ["tacos"]);
});

test("ratings made before timestamps existed are kept, not overwritten", () => {
  // Everyone who rated a meal before this sync was built has no timestamp. Reading that as "no
  // opinion" would delete the data of the people who have used the app longest.
  const r = mergeRatings({ tacos: { stars: 5 } }, { tacos: { stars: 1, at: LATE } });
  assert.equal(r.merged.tacos, 5);
  assert.deepEqual(r.toPush, ["tacos"], "and it gains a timestamp by being pushed");
});

test("out of range or nonsense ratings are ignored rather than stored", () => {
  const r = mergeRatings(
    { a: { stars: 9, at: LATE }, b: { stars: 0, at: LATE }, c: { stars: NaN, at: LATE } },
    {}
  );
  assert.deepEqual(r.merged, {});
});

test("a server row for a meal that no longer exists is simply carried", () => {
  // The catalogue ships with the app, so a slug can disappear in a deploy. That must not throw.
  const r = mergeRatings({}, { "deleted-meal": { stars: 3, at: EARLY } });
  assert.equal(r.merged["deleted-meal"], 3);
});

test("agreement writes nothing", () => {
  const same = { tacos: { stars: 4, at: EARLY } };
  const r = mergeRatings(same, { tacos: { stars: 4, at: EARLY } });
  assert.deepEqual(r.toPush, []);
  assert.deepEqual(r.toApplyLocal, []);
  assert.deepEqual(r.toDeleteRemote, []);
});
