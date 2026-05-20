#!/usr/bin/env node
// Apply curated photo IDs to src/data/meals.ts and src/data/recipes.ts.
// Uses each meal/recipe slug as the anchor so we don't accidentally swap the
// same old ID in two different recipes.

import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "..");

const results = JSON.parse(
  readFileSync(resolve(projectRoot, "scripts/photo-curation-results.json"), "utf8")
);

const targets = [
  resolve(projectRoot, "src/data/meals.ts"),
  resolve(projectRoot, "src/data/recipes.ts"),
];

let totalChanges = 0;

for (const file of targets) {
  let src = readFileSync(file, "utf8");
  let changes = 0;

  for (const [slug, info] of Object.entries(results)) {
    if (!info?.id) continue;

    // Find the slug declaration, then walk forward to the first pexels(NNN) call within
    // a reasonable window and replace its number.
    const slugIdx = src.indexOf(`slug: "${slug}"`);
    if (slugIdx === -1) continue;

    const window = src.slice(slugIdx, slugIdx + 800);
    const match = window.match(/pexels\((\d+)\)/);
    if (!match) continue;

    const oldId = match[1];
    if (String(info.id) === oldId) continue;

    // Replace just within the window to avoid accidental global swaps
    const newWindow = window.replace(/pexels\(\d+\)/, `pexels(${info.id})`);
    src = src.slice(0, slugIdx) + newWindow + src.slice(slugIdx + 800);
    changes++;
    console.log(`  ${file.split(/[\\/]/).pop()}: ${slug.padEnd(28)}  ${oldId} → ${info.id}`);
  }

  writeFileSync(file, src);
  console.log(`Wrote ${changes} changes to ${file}\n`);
  totalChanges += changes;
}

console.log(`Done. Total swaps: ${totalChanges}`);
