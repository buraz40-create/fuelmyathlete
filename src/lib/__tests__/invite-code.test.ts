import { test } from "node:test";
import assert from "node:assert/strict";
import {
  INVITE_ALPHABET,
  INVITE_LENGTH,
  generateInviteCode,
} from "../supabase/invite-code.ts";

test("codes avoid the characters people misread aloud", () => {
  // These get handed over by voice across a kitchen. O/0 and I/1/L are the pairs that go wrong.
  for (const bad of ["O", "0", "I", "1", "L"]) {
    assert.ok(!INVITE_ALPHABET.includes(bad), `${bad} should not be in the alphabet`);
  }
});

test("every character of a generated code comes from that alphabet", () => {
  for (let i = 0; i < 200; i++) {
    const code = generateInviteCode();
    assert.equal(code.length, INVITE_LENGTH);
    for (const ch of code) {
      assert.ok(INVITE_ALPHABET.includes(ch), `unexpected character ${ch}`);
    }
  }
});

test("codes do not repeat", () => {
  // Not a proof of randomness, but it would catch a generator that had been quietly broken into
  // returning a constant, which is the realistic failure.
  const seen = new Set<string>();
  for (let i = 0; i < 500; i++) seen.add(generateInviteCode());
  assert.equal(seen.size, 500);
});

test("the alphabet is large enough for the length to be worth something", () => {
  const bits = Math.log2(INVITE_ALPHABET.length ** INVITE_LENGTH);
  assert.ok(bits > 45, `only ${Math.round(bits)} bits of entropy`);
});
