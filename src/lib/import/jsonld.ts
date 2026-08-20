// Pulling a recipe out of a page's schema.org JSON-LD.
//
// No LLM anywhere near this. The page already states the ingredients and the amounts exactly,
// in a machine-readable block the publisher put there on purpose so Google would show a recipe
// card. Asking a model to restate structure that already exists costs money, adds latency, and
// introduces the one thing this feature refuses to do: a number nobody wrote.
//
// What we take is the facts. Ingredient lines, amounts, times, yield. Those are not
// copyrightable (37 CFR 202.1; Publications International v. Meredith). What we deliberately
// do NOT take is the headnote or the blogger's voice-y prose, which IS protectable and is the
// one recipe case a plaintiff won (Barbour v. Head), and the photograph, which is the largest
// exposure of the three.

export interface JsonLdRecipe {
  name?: string;
  ingredientLines: string[];
  steps: string[];
  servings?: number;
  totalMinutes?: number;
}

type Json = Record<string, unknown>;

/** Every JSON-LD block on the page, parsed. Malformed blocks are skipped, not fatal. */
export function extractJsonLdBlocks(html: string): unknown[] {
  const out: unknown[] = [];
  const re = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  for (const m of html.matchAll(re)) {
    const body = m[1].trim();
    if (!body) continue;
    try {
      out.push(JSON.parse(body));
    } catch {
      // Some publishers emit trailing commas or stray CDATA wrappers. One bad block should
      // not cost us the good one on the same page.
      try {
        out.push(JSON.parse(body.replace(/^\/\*<!\[CDATA\[\*\/|\/\*\]\]>\*\/$/g, "").trim()));
      } catch {
        continue;
      }
    }
  }
  return out;
}

function isRecipeNode(node: unknown): node is Json {
  if (typeof node !== "object" || node === null) return false;
  const t = (node as Json)["@type"];
  // @type is a string on most sites and an array on some ("Recipe" plus "NewsArticle").
  if (typeof t === "string") return t.toLowerCase() === "recipe";
  if (Array.isArray(t)) return t.some((x) => typeof x === "string" && x.toLowerCase() === "recipe");
  return false;
}

/** Walks blocks, @graph arrays, and top-level arrays looking for the Recipe node. */
export function findRecipeNode(blocks: unknown[]): Json | null {
  const queue: unknown[] = [...blocks];
  while (queue.length) {
    const node = queue.shift();
    if (Array.isArray(node)) {
      queue.push(...node);
      continue;
    }
    if (typeof node !== "object" || node === null) continue;
    if (isRecipeNode(node)) return node as Json;
    const graph = (node as Json)["@graph"];
    if (Array.isArray(graph)) queue.push(...graph);
  }
  return null;
}

/** Strips tags and decodes the handful of entities that actually show up in recipe text. */
function clean(text: string): string {
  return text
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&frac12;/gi, "1/2")
    .replace(/&frac14;/gi, "1/4")
    .replace(/&frac34;/gi, "3/4")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * recipeInstructions comes in three shapes in the wild: one string with newlines, an array of
 * HowToStep, and an array of HowToSection each holding HowToStep. All three appear on
 * mainstream sites, so all three are handled.
 */
function readInstructions(value: unknown): string[] {
  if (typeof value === "string") {
    return value
      .split(/\n+|(?<=\.)\s{2,}/)
      .map(clean)
      .filter((s) => s.length > 3);
  }
  if (!Array.isArray(value)) return [];

  const out: string[] = [];
  for (const item of value) {
    if (typeof item === "string") {
      const s = clean(item);
      if (s.length > 3) out.push(s);
      continue;
    }
    if (typeof item !== "object" || item === null) continue;
    const node = item as Json;
    const type = typeof node["@type"] === "string" ? (node["@type"] as string) : "";

    if (/HowToSection/i.test(type)) {
      out.push(...readInstructions(node.itemListElement));
      continue;
    }
    const text = node.text ?? node.name;
    if (typeof text === "string") {
      const s = clean(text);
      if (s.length > 3) out.push(s);
    }
  }
  return out;
}

/** recipeYield is a string, a number, or an array of either. */
function readYield(value: unknown): number | undefined {
  const first = Array.isArray(value) ? value[0] : value;
  if (typeof first === "number" && Number.isFinite(first)) return first;
  if (typeof first === "string") {
    const m = first.match(/\d+/);
    if (m) return Number(m[0]);
  }
  return undefined;
}

/** ISO 8601 duration, e.g. PT1H30M. */
export function readDuration(value: unknown): number | undefined {
  if (typeof value !== "string") return undefined;
  const m = value.match(/^P(?:\d+D)?T(?:(\d+)H)?(?:(\d+)M)?/i);
  if (!m) return undefined;
  const mins = Number(m[1] ?? 0) * 60 + Number(m[2] ?? 0);
  return mins > 0 ? mins : undefined;
}

export function parseJsonLdRecipe(html: string): JsonLdRecipe | null {
  const node = findRecipeNode(extractJsonLdBlocks(html));
  if (!node) return null;

  const rawIngredients = node.recipeIngredient ?? node.ingredients;
  const ingredientLines = Array.isArray(rawIngredients)
    ? rawIngredients.filter((x): x is string => typeof x === "string").map(clean).filter(Boolean)
    : [];

  // A Recipe node with no ingredients is not usable, and pretending otherwise produces an
  // empty review screen that looks broken.
  if (!ingredientLines.length) return null;

  // Plenty of sites give prep and cook but no total, so add them rather than showing nothing.
  const summed = (readDuration(node.prepTime) ?? 0) + (readDuration(node.cookTime) ?? 0);
  const total = readDuration(node.totalTime) ?? (summed > 0 ? summed : undefined);

  return {
    name: typeof node.name === "string" ? clean(node.name) : undefined,
    ingredientLines,
    steps: readInstructions(node.recipeInstructions),
    servings: readYield(node.recipeYield),
    totalMinutes: total,
  };
}
