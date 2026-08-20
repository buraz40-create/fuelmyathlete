import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { RECIPES } from "../recipes.ts";

// Guides link out to recipes by slug, in prose and in relatedRecipes. Nothing checks those,
// so renaming or removing a recipe breaks them silently and the first person to find out is a
// reader hitting a 404 from a page that ranks.
//
// Read as source text rather than by importing the guides, because they are .tsx and node's
// type stripping does not compile JSX. Crude, and it does catch exactly the thing that breaks.

const GUIDE_DIR = join(process.cwd(), "src", "data", "guides");

function guideFiles(): { name: string; source: string }[] {
  return readdirSync(GUIDE_DIR)
    .filter((f) => f.endsWith(".tsx"))
    .map((f) => ({ name: f, source: readFileSync(join(GUIDE_DIR, f), "utf8") }));
}

const recipeSlugs = new Set(RECIPES.map((r) => r.slug));

const guideSlugs = new Set(
  guideFiles().flatMap(({ source }) => {
    const m = source.match(/^\s*slug: "([a-z0-9-]+)",/m);
    return m ? [m[1]] : [];
  })
);

test("every /recipe/ link in a guide points at a recipe that exists", () => {
  const broken: string[] = [];
  for (const { name, source } of guideFiles()) {
    for (const m of source.matchAll(/href="\/recipe\/([a-z0-9-]+)"/g)) {
      if (!recipeSlugs.has(m[1])) broken.push(`${name} links to /recipe/${m[1]}`);
    }
  }
  assert.deepEqual(broken, [], broken.join("\n"));
});

test("every relatedRecipes entry exists", () => {
  const broken: string[] = [];
  for (const { name, source } of guideFiles()) {
    const block = source.match(/relatedRecipes: \[([\s\S]*?)\]/);
    if (!block) continue;
    for (const m of block[1].matchAll(/"([a-z0-9-]+)"/g)) {
      if (!recipeSlugs.has(m[1])) broken.push(`${name} relates to missing recipe ${m[1]}`);
    }
  }
  assert.deepEqual(broken, [], broken.join("\n"));
});

test("every relatedGuides entry exists", () => {
  const broken: string[] = [];
  for (const { name, source } of guideFiles()) {
    const block = source.match(/relatedGuides: \[([\s\S]*?)\]/);
    if (!block) continue;
    for (const m of block[1].matchAll(/"([a-z0-9-]+)"/g)) {
      if (!guideSlugs.has(m[1])) broken.push(`${name} relates to missing guide ${m[1]}`);
    }
  }
  assert.deepEqual(broken, [], broken.join("\n"));
});

test("every guide is registered in the index", () => {
  // A guide file that nobody imports builds fine and is simply invisible: no page, no sitemap
  // entry, no way to reach it.
  const index = readFileSync(join(GUIDE_DIR, "index.ts"), "utf8");
  const missing: string[] = [];
  for (const { name } of guideFiles()) {
    const importPath = `./${name.replace(/\.tsx$/, "")}`;
    if (!index.includes(importPath)) missing.push(name);
  }
  assert.deepEqual(missing, [], missing.join("\n"));
});
