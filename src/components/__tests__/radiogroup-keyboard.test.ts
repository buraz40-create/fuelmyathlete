import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

// A radiogroup promises arrow keys.
//
// Two shipped without them: the star rating and the serving presets. Both put a tab stop on
// every option, so a keyboard user tabbed through five stars one at a time and still could not
// move the selection, because nothing listened for an arrow. The day tabs had the same bug and
// were fixed earlier; these two were missed because they are small controls that look fine with
// a mouse.
//
// The rule: a container with role="radiogroup" or role="tablist" handles keys, and its children
// use a roving tabindex so the group is one stop rather than N.

const ROOTS = ["src/components", "src/app"];

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

function filesWith(pattern: RegExp): { rel: string; source: string }[] {
  const found: { rel: string; source: string }[] = [];
  for (const root of ROOTS) {
    for (const file of walk(root)) {
      const source = readFileSync(file, "utf8");
      if (pattern.test(source)) found.push({ rel: file.split("\\").join("/"), source });
    }
  }
  return found;
}

test("every radiogroup and tablist handles arrow keys", () => {
  const offenders = filesWith(/role="(radiogroup|tablist)"/)
    .filter(({ source }) => !/onKeyDown=\{/.test(source))
    .map(({ rel }) => `${rel} declares a radiogroup or tablist but never handles a key`);

  assert.deepEqual(
    offenders,
    [],
    offenders.join("\n") +
      "\n\nHandle ArrowLeft/ArrowRight (and Home/End) on the container, move the selection, " +
      "and focus the newly selected child. DayPicker is the reference."
  );
});

test("radio and tab children use a roving tabindex", () => {
  // Without this the group is N tab stops instead of one, which is the part that actually
  // annoys somebody navigating a recipe page by keyboard.
  const offenders = filesWith(/role="(radio|tab)"/)
    .filter(({ source }) => !/tabIndex=\{/.test(source))
    .map(({ rel }) => `${rel} has radio or tab children with no roving tabIndex`);

  assert.deepEqual(offenders, [], offenders.join("\n"));
});
