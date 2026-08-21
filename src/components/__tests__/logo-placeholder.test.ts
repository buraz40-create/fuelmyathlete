import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

// A blur placeholder on a transparent image shows a dark rectangle, not a soft hint of the
// image.
//
// Next builds the placeholder by shrinking the source to a few pixels. Wherever the source is
// transparent, the RGB underneath is usually black, and the placeholder keeps that black while
// the alpha gets flattened as it is stretched and blurred behind the image. For the logo that
// meant an 8x4 bitmap averaging (20, 15, 4) with pure black corners, blown up across the
// header. Reported as "the logo loads slow and has a dark background flash". It was not slow:
// 7 KB of webp in about 100ms, preloaded. It was doing that behind a black box.
//
// Large opaque photographs are what blur placeholders are for. This checks the logo, which is
// neither.

test("the logo does not use a blur placeholder", () => {
  const source = readFileSync(join("src", "components", "brand", "Logo.tsx"), "utf8");
  const uncommented = source
    .split("\n")
    .filter((line) => !line.trim().startsWith("//"))
    .join("\n");

  assert.ok(
    !/placeholder\s*=\s*["{]?\s*["']?blur/.test(uncommented),
    "Logo.tsx must not set placeholder=\"blur\": the asset is transparent, so the generated " +
      "placeholder is a black rectangle. See the comment in that file."
  );
});

test("the logo asset really is transparent, which is why the rule above exists", () => {
  // If the logo is ever replaced with an opaque one, this fails and the rule can be revisited
  // rather than cargo-culted.
  const path = join("public", "images", "logo.png");
  assert.ok(existsSync(path), "public/images/logo.png should exist");

  const png = readFileSync(path);
  // PNG colour type lives at byte 25 of the IHDR chunk: 6 is RGBA, 4 is grey+alpha.
  assert.equal(png.subarray(1, 4).toString("ascii"), "PNG", "should be a PNG");
  const colourType = png[25];
  assert.ok(
    colourType === 6 || colourType === 4,
    `logo.png colour type is ${colourType}; the no-blur rule assumes an alpha channel`
  );
});
