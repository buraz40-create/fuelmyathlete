#!/usr/bin/env node
// Re-search a small set of meals where the initial curation scored low.
import { writeFileSync, readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "..");

const PEXELS_API_KEY = process.argv[2] ?? process.env.PEXELS_API_KEY;
if (!PEXELS_API_KEY) {
  console.error("Need PEXELS_API_KEY");
  process.exit(1);
}

const RETRY_QUERIES = [
  ["english-muffin-pb",  "peanut butter sandwich banana",  ["peanut"], ["banana", "butter", "spread"]],
  ["turkey-tacos",       "ground beef tacos tortilla shells", ["taco"], ["ground", "lettuce", "tortilla", "beef"]],
  ["tropical-pre-game",  "mango pineapple yellow smoothie", ["smoothie"], ["mango", "pineapple", "yellow", "tropical"]],
];

async function search(query) {
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=15&orientation=landscape&size=medium`;
  const res = await fetch(url, { headers: { Authorization: PEXELS_API_KEY } });
  if (!res.ok) throw new Error(`Pexels ${res.status}`);
  return res.json();
}

function score(photo, required, preferred) {
  const alt = String(photo.alt ?? "").toLowerCase();
  let s = 0;
  let hit = false;
  for (const t of required) if (alt.includes(t.toLowerCase())) { hit = true; s += 20; }
  if (!hit) return 0;
  for (const t of preferred) if (alt.includes(t.toLowerCase())) s += 8;
  // Penalty if it mentions OTHER foods (pizza, etc) that suggest the photo includes them
  const banned = ["pizza", "burger", "salad"];
  for (const t of banned) if (alt.includes(t)) s -= 15;
  return s;
}

const out = {};
for (const [slug, query, required, preferred] of RETRY_QUERIES) {
  process.stdout.write(`${slug} → `);
  const data = await search(query);
  const scored = (data.photos ?? [])
    .map((p) => ({ ...p, _score: score(p, required, preferred) }))
    .filter((p) => p._score > 0)
    .sort((a, b) => b._score - a._score);
  const pick = scored[0];
  if (pick) {
    out[slug] = { id: pick.id, alt: pick.alt, score: pick._score };
    console.log(`#${pick.id}  score=${pick._score}  "${(pick.alt ?? "").slice(0, 80)}"`);
  } else {
    console.log("NO MATCH");
  }
  await new Promise((r) => setTimeout(r, 250));
}

const file = resolve(projectRoot, "scripts/photo-curation-results.json");
const existing = JSON.parse(readFileSync(file, "utf8"));
for (const [slug, val] of Object.entries(out)) {
  if (val) existing[slug] = { ...existing[slug], ...val };
}
writeFileSync(file, JSON.stringify(existing, null, 2));
console.log("Updated results JSON.");
