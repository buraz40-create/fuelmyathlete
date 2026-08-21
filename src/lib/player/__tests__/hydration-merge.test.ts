import { test } from "node:test";
import assert from "node:assert/strict";
import { mergeHydration } from "../hydration-merge.ts";

const CAP = 12; // 96oz at 8oz a cup

test("a day only the device knows about is pushed up", () => {
  // The common case: hydration has been device-local since the app was built, so the first
  // sync is a device full of history meeting an empty table.
  const r = mergeHydration({ "2026-08-20": 6 }, {}, CAP);
  assert.equal(r.merged["2026-08-20"], 6);
  assert.deepEqual(r.toPush, ["2026-08-20"]);
  assert.deepEqual(r.toApply, []);
});

test("a day only the server knows about comes down", () => {
  const r = mergeHydration({}, { "2026-08-19": 4 }, CAP);
  assert.equal(r.merged["2026-08-19"], 4);
  assert.deepEqual(r.toApply, ["2026-08-19"]);
  assert.deepEqual(r.toPush, []);
});

test("the higher count wins and both sides are told", () => {
  const r = mergeHydration({ "2026-08-20": 3 }, { "2026-08-20": 7 }, CAP);
  assert.equal(r.merged["2026-08-20"], 7);
  assert.deepEqual(r.toApply, ["2026-08-20"]);
  assert.deepEqual(r.toPush, []);
});

test("agreement means no writes at all", () => {
  const r = mergeHydration({ "2026-08-20": 5 }, { "2026-08-20": 5 }, CAP);
  assert.deepEqual(r.toPush, []);
  assert.deepEqual(r.toApply, []);
});

test("the merge can never produce more than the cap", () => {
  // The cap exists because children are more vulnerable to hyponatremia than adults. A number
  // logged under a teen's more generous cap must not survive into a child's profile.
  const r = mergeHydration({ "2026-08-20": 30 }, { "2026-08-20": 25 }, CAP);
  assert.equal(r.merged["2026-08-20"], CAP);
});

test("a value clamped by the cap is still pushed, so the server is corrected", () => {
  const r = mergeHydration({ "2026-08-20": 30 }, { "2026-08-20": 25 }, CAP);
  assert.deepEqual(r.toPush, ["2026-08-20"], "the server holds 25, which is over the cap");
});

test("nonsense values are treated as zero rather than trusted", () => {
  const r = mergeHydration(
    { a: -4, b: NaN as unknown as number, c: 2.7 },
    {},
    CAP
  );
  assert.equal(r.merged.a, 0);
  assert.equal(r.merged.b, 0);
  assert.equal(r.merged.c, 2, "fractional cups are floored, not rounded up");
});

test("many days reconcile in one pass", () => {
  const local = { "2026-08-18": 5, "2026-08-19": 0, "2026-08-20": 9 };
  const remote = { "2026-08-19": 6, "2026-08-20": 2, "2026-08-21": 3 };
  const r = mergeHydration(local, remote, CAP);
  assert.deepEqual(r.merged, {
    "2026-08-18": 5,
    "2026-08-19": 6,
    "2026-08-20": 9,
    "2026-08-21": 3,
  });
  assert.deepEqual(r.toPush, ["2026-08-18", "2026-08-20"]);
  assert.deepEqual(r.toApply, ["2026-08-19", "2026-08-21"]);
});
