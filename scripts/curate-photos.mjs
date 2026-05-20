#!/usr/bin/env node
// Curate one Pexels photo per meal using the API (alt-text + tag verification).
// Usage:
//   node scripts/curate-photos.mjs YOUR_PEXELS_API_KEY
// Outputs scripts/photo-curation-results.json mapping each meal slug to its best match.

import { writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "..");

const PEXELS_API_KEY = process.argv[2] ?? process.env.PEXELS_API_KEY;
if (!PEXELS_API_KEY) {
  console.error("Pass key as first arg or set PEXELS_API_KEY env var.");
  process.exit(1);
}

// [slug, search query, required key terms (any-of), preferred terms (bonus)]
const QUERIES = [
  ["cereal-banana-milk",       "cereal banana milk bowl",        ["cereal"], ["banana", "bowl", "milk"]],
  ["eggs-toast",               "scrambled eggs whole grain toast", ["egg"],   ["toast", "scramble", "plate"]],
  ["berry-smoothie",           "berry banana smoothie glass",    ["smoothie"], ["berry", "banana", "purple"]],
  ["english-muffin-pb",        "english muffin peanut butter banana", ["muffin"], ["peanut", "banana", "spread"]],
  ["yogurt-parfait",           "greek yogurt parfait berries jar", ["yogurt"], ["parfait", "berry", "granola"]],
  ["hibachi-chicken-bowl",     "chicken rice bowl meal prep",    ["chicken"], ["rice", "bowl", "meal"]],
  ["turkey-wrap",              "turkey wrap whole grain tortilla", ["wrap"],  ["turkey", "tortilla", "sandwich"]],
  ["chicken-pasta-broccoli",   "chicken pasta broccoli plate",   ["pasta"],   ["chicken", "broccoli", "noodle"]],
  ["apple-pb",                 "apple slices peanut butter",     ["apple"],   ["peanut", "slice", "snack"]],
  ["cheese-crackers",          "cheese crackers snack plate",    ["cheese"],  ["cracker", "snack"]],
  ["yogurt-honey-berries",     "greek yogurt honey berries bowl", ["yogurt"], ["berry", "honey", "bowl"]],
  ["banana-almonds",           "banana almonds snack",           ["banana"],  ["almond", "nut", "snack"]],
  ["chicken-rice-broccoli",    "grilled chicken rice broccoli plate", ["chicken"], ["rice", "broccoli", "plate"]],
  ["salmon-sweet-potato",      "salmon sweet potato green beans", ["salmon"], ["potato", "vegetable", "plate"]],
  ["turkey-tacos",             "turkey tacos tortilla cilantro", ["taco"],    ["tortilla", "ground", "turkey"]],
  ["pasta-marinara",           "pasta meat sauce tomato bowl",   ["pasta"],   ["sauce", "tomato", "spaghetti"]],
  ["stirfry-chicken-rice",     "chicken stir fry rice bowl edamame", ["stir"], ["chicken", "rice", "bowl"]],
  ["pb-banana-power",          "peanut butter banana smoothie",  ["smoothie"], ["peanut", "banana", "shake"]],
  ["green-machine",            "green smoothie spinach kale",    ["smoothie"], ["green", "spinach", "kale"]],
  ["berry-oat-fuel",           "berry oat smoothie",             ["smoothie"], ["berry", "oat", "purple"]],
  ["vanilla-protein-punch",    "vanilla milkshake smoothie",     ["smoothie"], ["vanilla", "milkshake", "white"]],
  ["tropical-pre-game",        "tropical mango pineapple smoothie", ["smoothie"], ["mango", "pineapple", "yellow"]],
  ["chocolate-cherry-recovery","chocolate cherry smoothie",      ["smoothie"], ["chocolate", "cherry", "cocoa"]],
  ["hibachi-chicken",          "hibachi chicken stir fry skillet", ["chicken"], ["hibachi", "stir", "wok"]],
];

async function searchPexels(query, perPage = 15) {
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${perPage}&orientation=landscape&size=medium`;
  const res = await fetch(url, { headers: { Authorization: PEXELS_API_KEY } });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Pexels ${res.status}: ${text.slice(0, 200)}`);
  }
  return res.json();
}

function scorePhoto(photo, required, preferred) {
  const alt = String(photo.alt ?? "").toLowerCase();
  let score = 0;
  let hasRequired = false;
  for (const term of required) {
    if (alt.includes(term.toLowerCase())) {
      hasRequired = true;
      score += 20;
    }
  }
  if (!hasRequired) return 0;
  for (const term of preferred) {
    if (alt.includes(term.toLowerCase())) score += 8;
  }
  // Mild bonus for portrait/square food shots (Pexels food shots tend overhead)
  if (photo.width === photo.height) score += 2;
  return score;
}

async function verifyUrl(url) {
  try {
    const res = await fetch(url, { method: "HEAD" });
    return res.ok;
  } catch {
    return false;
  }
}

async function pickBest(query, required, preferred) {
  const result = await searchPexels(query, 15);
  if (!result.photos?.length) return null;

  const scored = result.photos
    .map((p) => ({ ...p, _score: scorePhoto(p, required, preferred) }))
    .filter((p) => p._score > 0)
    .sort((a, b) => b._score - a._score);

  // Fallback: if nothing scored, take the first result anyway
  const pool = scored.length > 0 ? scored : result.photos.map((p) => ({ ...p, _score: 1 }));

  // Verify the chosen photo's CDN URL is reachable
  for (const candidate of pool.slice(0, 3)) {
    const cdnUrl = candidate.src?.large ?? candidate.src?.medium;
    if (cdnUrl && (await verifyUrl(cdnUrl))) {
      return {
        id: candidate.id,
        alt: candidate.alt ?? "",
        score: candidate._score,
        photographer: candidate.photographer,
        photographerUrl: candidate.photographer_url,
        previewUrl: candidate.src?.medium,
      };
    }
  }
  return null;
}

const results = {};
for (const [slug, query, required, preferred] of QUERIES) {
  process.stdout.write(`${slug.padEnd(28)} → `);
  try {
    const best = await pickBest(query, required, preferred);
    results[slug] = best;
    if (best) {
      console.log(`#${best.id}  score=${best.score}  "${best.alt.slice(0, 70)}"`);
    } else {
      console.log("NO MATCH");
    }
  } catch (err) {
    console.log(`ERROR ${err.message}`);
    results[slug] = null;
  }
  await new Promise((r) => setTimeout(r, 250)); // gentle on rate limit
}

const out = resolve(projectRoot, "scripts/photo-curation-results.json");
writeFileSync(out, JSON.stringify(results, null, 2));
console.log(`\nWrote ${out}`);
