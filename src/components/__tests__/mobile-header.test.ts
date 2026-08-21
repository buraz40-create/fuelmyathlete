import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";

// The app header is the only way to reach Recipes, Guides and Profile. The bottom bar on mobile
// covers the planner's own sections and nothing else.
//
// Guides carried "hidden ... sm:inline", so below 640px it was display:none and simply could
// not be reached from a phone. Reported as not being able to navigate. Alongside it, the links
// were bare text about 20px tall, which is half the 44px a finger needs, and the logo was a
// flat 260px on a 375px screen.

const appShell = readFileSync(join("src", "components", "layout", "AppShell.tsx"), "utf8");

function navLinks(source: string): string[] {
  // Each <Link ...> up to its closing bracket, ignoring the logo link.
  return [...source.matchAll(/<Link[\s\S]*?>/g)]
    .map((m) => m[0])
    .filter((tag) => !tag.includes("FuelMyAthlete home"));
}

test("no header navigation link is hidden on small screens", () => {
  const hidden = navLinks(appShell).filter((tag) => /className="[^"]*\bhidden\b/.test(tag));
  assert.deepEqual(
    hidden.map((t) => t.replace(/\s+/g, " ").slice(0, 70)),
    [],
    "a link hidden below the sm breakpoint is unreachable on a phone, because the bottom bar " +
      "only covers the planner's own sections"
  );
});

test("header navigation links are big enough to tap", () => {
  // 44px is the long-standing minimum on both iOS and Android. min-h-11 is 2.75rem.
  const tooSmall = navLinks(appShell).filter((tag) => !/min-h-11/.test(tag));
  assert.deepEqual(
    tooSmall.map((t) => t.replace(/\s+/g, " ").slice(0, 70)),
    [],
    "every header link needs min-h-11 so it is at least 44px tall"
  );
});

test("the logo is not a fixed width on mobile", () => {
  // 260px of a 375px screen left the navigation crammed into what was left and made the header
  // 102px tall.
  assert.match(
    appShell,
    /<Logo[\s\S]*?className="[^"]*w-\[\d+px\][^"]*md:w-\[\d+px\]/,
    "the logo should have a small mobile width and a larger one from md up"
  );
});
