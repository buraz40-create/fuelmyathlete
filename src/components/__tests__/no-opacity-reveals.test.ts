import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

// Content must never start invisible.
//
// This has now cost real time four separate times on this project:
//
//   1. Guide reveals held prose at opacity 0.
//   2. FAQ answers were unmounted while collapsed, so FAQPage structured data claimed answers
//      that were not in the HTML.
//   3. The recipe grid faded in with a per-card delay, and a visitor reported it as "the
//      images are not there".
//   4. The landing page headline, subheading, call to action and calculator all started at
//      opacity 0, on the one page Google indexes.
//
// These routes are statically prerendered. The server sends the content, then the client hides
// it and animates it back. Anything that stops the animation completing, a background tab, a
// slow device, an interrupted script, an observer that never fires, leaves the page blank while
// the HTML underneath was perfectly fine.
//
// Animating position is free of this whole class of failure and looks near enough identical.

const ROOTS = ["src/components", "src/app"];

// Decoration may fade. A blob nobody can see costs a visitor nothing. Nothing is listed here
// today, because the two rules below catch the decorative cases on their own. Keep it that way
// if you can, and make any entry justify itself.
const ALLOWED = new Set<string>([]);

function walk(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      if (entry === "__tests__") continue;
      out.push(...walk(full));
    } else if (entry.endsWith(".tsx")) {
      out.push(full);
    }
  }
  return out;
}

test("no component animates content in from opacity 0", () => {
  const offenders: string[] = [];

  for (const root of ROOTS) {
    for (const file of walk(root)) {
      const rel = file.replace(/\\/g, "/");
      if (ALLOWED.has(rel)) continue;
      const source = readFileSync(file, "utf8");

      // `initial={{ opacity: 0 ... }}` in any spacing, and the shorthand object form used for
      // shared variants such as Hero's fadeIn.
      const patterns = [
        /initial=\{\{[^}]*opacity:\s*0[,\s}]/g,
        /initial:\s*\{[^}]*opacity:\s*0[,\s}]/g,
      ];

      for (const p of patterns) {
        for (const m of source.matchAll(p)) {
          if (m.index === undefined) continue;

          // The real invariant is "nothing is invisible on first paint", not "the characters
          // opacity: 0 never appear". Inside <AnimatePresence initial={false}> the entry
          // animation is skipped on mount, so those children are painted immediately and only
          // animate when the list changes later. The landing page water cups are exactly that,
          // and flagging them would push someone into deleting a correct animation.
          const before = source.slice(0, m.index);
          const openedAt = before.lastIndexOf("<AnimatePresence");
          if (openedAt !== -1 && openedAt > before.lastIndexOf("</AnimatePresence>")) {
            const tag = source.slice(openedAt, source.indexOf(">", openedAt) + 1);
            if (/initial=\{false\}/.test(tag)) continue;
          }

          // Second exemption: it never becomes fully opaque. Content always animates to
          // opacity 1, because the point of content is to be read. Something settling at 0.5
          // is a background wash, and the Hero gradient blobs are the case in hand. This is a
          // better test than naming files, because it keeps working when a file is renamed and
          // it still catches a real fade added to that same file tomorrow.
          const target = source.slice(m.index, m.index + 400)
            .match(/animate=\{\{[^}]*opacity:\s*([0-9.]+)/);
          if (target && Number(target[1]) < 1) continue;

          offenders.push(
            `${rel}:${before.split("\n").length} animates content from opacity 0`
          );
        }
      }
    }
  }

  assert.deepEqual(
    offenders,
    [],
    offenders.join("\n") +
      "\n\nAnimate position instead, for example initial={{ y: 12 }}. If this really is " +
      "decorative and aria-hidden, add the file to ALLOWED in this test and say why."
  );
});

test("collapsed content stays in the DOM rather than being unmounted", () => {
  // The FAQ version of the same bug: answers were rendered only when open, so five of six were
  // absent from the HTML while FAQPage structured data asserted they were on the page.
  const faq = readFileSync(join("src", "components", "guide", "GuideFAQ.tsx"), "utf8");
  assert.ok(
    /animate=\{\{\s*height:/.test(faq),
    "GuideFAQ should collapse answers with height, keeping them mounted"
  );
  assert.ok(
    !/\{open\s*&&\s*\(?\s*<(p|div)/.test(faq),
    "GuideFAQ must not render answers conditionally on open state"
  );
});
