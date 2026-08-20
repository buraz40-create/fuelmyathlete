import type { IngredientUnit } from "@/types/domain";

// Deterministic recipe parsing. No model, no network, no per-import cost.
//
// The reason this is rules and not an LLM: every competitor shipping AI import has the same
// shape of review, and the complaint is not "it missed an ingredient", it is "it returned a
// different recipe". One Flavorish review is titled "Literally makes up recipes". A ReciMe
// reviewer got a bread recipe with no flour in it. On a site that tells a parent what to feed
// an 11 year old, a confidently invented quantity is the one failure we cannot ship.
//
// Rules can fail to parse. They cannot hallucinate. So the contract is: every number in the
// output was present in the input. Where no amount was stated we return null and say so, and
// the review screen asks the parent. "A handful of spinach" becomes an amount they fill in,
// never a guessed 0.25 cup that quietly lands on the grocery list.

export interface ParsedIngredient {
  /** The line as written, kept verbatim so the parent can always see what we read. */
  raw: string;
  /** null when the source did not state an amount. Never inferred. */
  quantity: number | null;
  /** null when no unit was stated, or when the unit does not map onto the catalog's units. */
  unit: IngredientUnit | null;
  /** The unit as written, when it did not map. Preserved so the line reads honestly. */
  unitAsWritten?: string;
  /** The food itself, with amount, unit and prep words removed. */
  name: string;
  /** Set when the line is a section header such as "For the sauce:". */
  isHeader: boolean;
}

export interface ParsedRecipe {
  title: string | null;
  servings: number | null;
  totalMinutes: number | null;
  ingredients: ParsedIngredient[];
  steps: string[];
  /** Lines we could not confidently place. Shown to the parent rather than dropped. */
  leftovers: string[];
}

// Vulgar fractions appear constantly in pasted recipes and break a naive Number() parse.
const VULGAR: Record<string, number> = {
  "¼": 0.25,
  "½": 0.5,
  "¾": 0.75,
  "⅓": 1 / 3,
  "⅔": 2 / 3,
  "⅛": 0.125,
  "⅜": 0.375,
  "⅝": 0.625,
  "⅞": 0.875,
};

const VULGAR_CLASS = "¼½¾⅓⅔⅛⅜⅝⅞";

// Only units the grocery list can actually add up. Anything else is preserved as written
// rather than coerced, because a wrong unit is a wrong shopping quantity.
const UNIT_ALIASES: Record<string, IngredientUnit> = {
  lb: "lb", lbs: "lb", pound: "lb", pounds: "lb",
  oz: "oz", ounce: "oz", ounces: "oz",
  cup: "cup", cups: "cup", c: "cup",
  tbsp: "tbsp", tbs: "tbsp", tablespoon: "tbsp", tablespoons: "tbsp",
  tsp: "tsp", teaspoon: "tsp", teaspoons: "tsp",
  clove: "each", cloves: "each", slice: "each", slices: "each",
  large: "each", medium: "each", small: "each",
  piece: "each", pieces: "each", whole: "each", each: "each",
};

// Metric needs converting, not aliasing. Volume converts cleanly, and mass converts cleanly
// to oz. Grams of flour against a catalog measured in cups does NOT convert without a density
// table, and we are not building one. Those fall through and the parent sets the amount.
const METRIC: Record<string, { to: IngredientUnit; factor: number }> = {
  ml: { to: "cup", factor: 1 / 236.588 },
  milliliter: { to: "cup", factor: 1 / 236.588 },
  milliliters: { to: "cup", factor: 1 / 236.588 },
  l: { to: "cup", factor: 4.22675 },
  liter: { to: "cup", factor: 4.22675 },
  liters: { to: "cup", factor: 4.22675 },
  g: { to: "oz", factor: 1 / 28.3495 },
  gram: { to: "oz", factor: 1 / 28.3495 },
  grams: { to: "oz", factor: 1 / 28.3495 },
  kg: { to: "lb", factor: 2.20462 },
  kilogram: { to: "lb", factor: 2.20462 },
  kilograms: { to: "lb", factor: 2.20462 },
};

// Descriptors that are not the food. Stripped from the name so a catalog match can find
// "chicken breast" inside "2 lb boneless skinless chicken breasts, diced".
const PREP_WORDS = new Set([
  "fresh", "freshly", "chopped", "diced", "minced", "sliced", "shredded", "grated",
  "ripe", "organic", "boneless", "skinless", "unsalted", "salted", "drained", "rinsed",
  "cooked", "uncooked", "raw", "frozen", "canned", "packed", "softened", "melted",
  "beaten", "peeled", "halved", "quartered", "cubed", "crushed", "ground", "optional",
  "roughly", "finely", "thinly", "lightly", "warm", "cold", "room", "temperature",
]);

// Yield and timing lines sit loose above the ingredient heading on almost every recipe, and
// they are short and unpunctuated, so the ingredient heuristic happily swallows them. Their
// numbers are already read into servings and totalMinutes, so match them first and drop them
// rather than shopping for "Serves 4".
const META_RE =
  /^\s*(serves|servings|yield|makes|prep(?:\s*time)?|cook(?:\s*time)?|total(?:\s*time)?|active(?:\s*time)?|ready in|difficulty|course|cuisine|calories)\b[:\s]/i;

const HEADER_RE = /^(for the\b.*|.*:)\s*$/i;
const INGREDIENT_HEADING_RE = /^\s*(ingredients|you.?ll need|what you need|shopping list)\s*:?\s*$/i;
const STEP_HEADING_RE = /^\s*(instructions|directions|method|steps|preparation|how to make it)\s*:?\s*$/i;

/** Reads a leading amount: "2", "1 1/2", "1/2", "0.75", "1 1/2" with a vulgar fraction, "1-2". */
function readQuantity(text: string): { value: number | null; rest: string } {
  const t = text.trim();

  // Ranges take the lower bound rather than the average. Buying the low end of "1 to 2 cups"
  // and topping up beats over-buying every week, and it is a number the source actually wrote.
  const range = t.match(/^(\d+(?:\.\d+)?)\s*(?:-|–|to)\s*\d+(?:\.\d+)?\s+(.*)$/i);
  if (range) return { value: Number(range[1]), rest: range[2] };

  const mixed = t.match(/^(\d+)\s+(\d+)\/(\d+)\s+(.*)$/);
  if (mixed) {
    return { value: Number(mixed[1]) + Number(mixed[2]) / Number(mixed[3]), rest: mixed[4] };
  }

  const mixedVulgar = t.match(new RegExp(`^(\\d+)\\s*([${VULGAR_CLASS}])\\s+(.*)$`));
  if (mixedVulgar) {
    return { value: Number(mixedVulgar[1]) + VULGAR[mixedVulgar[2]], rest: mixedVulgar[3] };
  }

  const frac = t.match(/^(\d+)\/(\d+)\s+(.*)$/);
  if (frac) return { value: Number(frac[1]) / Number(frac[2]), rest: frac[3] };

  const vulgar = t.match(new RegExp(`^([${VULGAR_CLASS}])\\s*(.*)$`));
  if (vulgar) return { value: VULGAR[vulgar[1]], rest: vulgar[2] };

  const plain = t.match(/^(\d+(?:\.\d+)?)\s+(.*)$/);
  if (plain) return { value: Number(plain[1]), rest: plain[2] };

  // No stated amount. "A handful of spinach" lands here and stays null on purpose.
  return { value: null, rest: t };
}

function readUnit(text: string): {
  unit: IngredientUnit | null;
  factor: number;
  rest: string;
} {
  const m = text.trim().match(/^([A-Za-z.]+)\.?\s+(.*)$/);
  if (!m) return { unit: null, factor: 1, rest: text.trim() };

  const word = m[1].toLowerCase().replace(/\.$/, "");
  if (UNIT_ALIASES[word]) return { unit: UNIT_ALIASES[word], factor: 1, rest: m[2] };
  if (METRIC[word]) return { unit: METRIC[word].to, factor: METRIC[word].factor, rest: m[2] };
  return { unit: null, factor: 1, rest: text.trim() };
}

function cleanName(text: string): string {
  return text
    // Drop a trailing prep clause: "chicken breast, diced and seasoned".
    .replace(/,.*$/, "")
    // Drop parentheticals: "2 (14.5 oz) cans diced tomatoes".
    .replace(/\([^)]*\)/g, " ")
    .split(/\s+/)
    .filter((w) => w && !PREP_WORDS.has(w.toLowerCase().replace(/[^a-z]/g, "")))
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

export function parseIngredientLine(line: string): ParsedIngredient {
  const raw = line.trim();
  const stripped = raw.replace(/^[-*•●]\s*/, "").replace(/^\d+[.)]\s+/, "");

  if (HEADER_RE.test(stripped) && !/\d/.test(stripped)) {
    return { raw, quantity: null, unit: null, name: stripped.replace(/:$/, ""), isHeader: true };
  }

  const { value, rest } = readQuantity(stripped);
  const { unit, factor, rest: afterUnit } = readUnit(rest);

  // Keep the unit the source wrote when we could not map it, so a line does not silently
  // become "3 each olive oil".
  const written = unit === null ? rest.match(/^([A-Za-z.]+)\.?\s+/)?.[1] : undefined;
  // Only treat the leading word as a unit when an amount preceded it. "2 sprigs rosemary" has
  // one; "olive oil" does not, and calling "olive" a unit would eat half the ingredient.
  const looksLikeUnit = Boolean(written) && value !== null && !PREP_WORDS.has((written ?? "").toLowerCase());

  // When the leading word was a unit we could not map, drop it from the name anyway. Otherwise
  // the row reads "2 each sprigs rosemary", with the unit showing up twice.
  const nameSource = looksLikeUnit ? rest.replace(/^[A-Za-z.]+\.?\s+/, "") : afterUnit;

  return {
    raw,
    quantity: value === null ? null : Math.round(value * factor * 1000) / 1000,
    unit,
    unitAsWritten: looksLikeUnit ? written : undefined,
    name: cleanName(nameSource) || cleanName(rest) || stripped,
    isHeader: false,
  };
}

/** Ingredient-shaped: starts with an amount, or is short and carries no sentence punctuation. */
function looksLikeIngredient(line: string): boolean {
  const t = line.replace(/^[-*•●]\s*/, "").trim();
  if (!t) return false;
  if (new RegExp(`^[\\d${VULGAR_CLASS}]`).test(t)) return true;
  return t.length < 60 && !/[.!?]\s/.test(t) && t.split(/\s+/).length <= 8;
}

function looksLikeStep(line: string): boolean {
  const t = line.trim();
  return t.length > 60 || /^\d+[.)]\s+\S/.test(t);
}

function readServings(text: string): number | null {
  const m = text.match(/\b(?:serves|servings|yield|makes)\b[^\d]{0,12}(\d+)/i);
  return m ? Number(m[1]) : null;
}

function readMinutes(text: string): number | null {
  let total = 0;
  let found = false;
  for (const m of text.matchAll(/\b(\d+)\s*(hours?|hrs?|minutes?|mins?)\b/gi)) {
    found = true;
    total += /^h/i.test(m[2]) ? Number(m[1]) * 60 : Number(m[1]);
  }
  return found ? total : null;
}

/**
 * Splits pasted text into a recipe. Never invents a value: anything absent stays null, and
 * anything we cannot place is returned in `leftovers` for the parent to sort out rather than
 * being guessed at or silently dropped.
 */
export function parseRecipeText(input: string): ParsedRecipe {
  const nonEmpty = input.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);

  const ingredientLines: string[] = [];
  const stepLines: string[] = [];
  const leftovers: string[] = [];

  // Explicit headings beat any heuristic. They are the one unambiguous signal in a paste.
  let mode: "unknown" | "ingredients" | "steps" = "unknown";
  let sawHeading = false;
  let title: string | null = null;

  nonEmpty.forEach((line, i) => {
    if (INGREDIENT_HEADING_RE.test(line)) {
      mode = "ingredients";
      sawHeading = true;
      return;
    }
    if (STEP_HEADING_RE.test(line)) {
      mode = "steps";
      sawHeading = true;
      return;
    }

    // The first line is the title when it is short and does not open with an amount. Taking
    // it here rather than un-picking it from a list afterwards keeps the lists honest.
    if (i === 0 && !new RegExp(`^[\\d${VULGAR_CLASS}]`).test(line) && line.length < 80) {
      title = line;
      return;
    }

    // Read for their numbers already, and never an ingredient.
    if (META_RE.test(line)) return;

    if (mode === "ingredients") {
      ingredientLines.push(line);
    } else if (mode === "steps") {
      stepLines.push(line);
    } else if (looksLikeStep(line)) {
      stepLines.push(line);
    } else if (looksLikeIngredient(line)) {
      ingredientLines.push(line);
    } else {
      leftovers.push(line);
    }
  });

  void sawHeading;

  return {
    title,
    servings: readServings(input),
    totalMinutes: readMinutes(input),
    ingredients: ingredientLines.map(parseIngredientLine),
    steps: stepLines.map((s) => s.replace(/^\d+[.)]\s*/, "").trim()).filter(Boolean),
    leftovers,
  };
}

/** Ingredients whose amount the source never stated. Drives the "still needs an amount" badge. */
export function unresolvedAmounts(recipe: ParsedRecipe): ParsedIngredient[] {
  return recipe.ingredients.filter((i) => !i.isHeader && i.quantity === null);
}
