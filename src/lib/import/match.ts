// Relative, and with the extension, rather than the usual "@/" alias. This module is imported
// by a node --test suite, and node resolves ESM specifiers literally: it reads neither
// tsconfig paths nor extensionless files. tsconfig already sets allowImportingTsExtensions for
// the same reason. Type-only imports are erased before node sees them and keep the alias.
import { INGREDIENTS } from "../../data/ingredients.ts";
import type { Ingredient } from "@/types/domain";

// Matching a parsed ingredient name onto the 58-item catalog.
//
// The rule that shapes this file: never accept a fuzzy match silently. aggregateGrocery does
// `if (!ingredient) continue`, so an ingredient that matches nothing vanishes from the
// shopping list without a trace, and a parent shops from a list quietly missing the thing
// they imported the recipe for. And a wrong match is worse than no match, because it puts
// the wrong food in the cart with full confidence. So every match above the floor is a
// suggestion the parent confirms, and everything below it is handed back as unmatched.

export type MatchConfidence = "strong" | "likely" | "none";

export interface IngredientMatch {
  confidence: MatchConfidence;
  /** The best candidate, when there is one worth showing. */
  ingredient?: Ingredient;
  /** Runners-up, so a wrong top pick is one tap to correct rather than a search. */
  alternatives: Ingredient[];
  score: number;
}

// Hand-written aliases come first and are exact. The catalog is small enough that this table
// does most of the real work, and unlike a similarity score it cannot drift.
const ALIASES: Record<string, string> = {
  // Protein
  "chicken": "chicken-breast",
  "chicken breast": "chicken-breast",
  "chicken breasts": "chicken-breast",
  "boneless skinless chicken breast": "chicken-breast",
  // Deliberately NOT aliasing thighs to breast. They are different cuts with different
  // cooking times and different fat, and quietly swapping one for the other on a shopping
  // list is the same class of error as matching pepper to crackers. Thighs become a custom
  // ingredient the parent labels, which is honest.
  "turkey": "ground-turkey",
  "ground turkey": "ground-turkey",
  "lean ground turkey": "ground-turkey",
  "turkey breast": "deli-turkey",
  "sliced turkey": "deli-turkey",
  "deli turkey": "deli-turkey",
  "salmon": "salmon",
  "salmon fillet": "salmon",
  "salmon fillets": "salmon",
  "egg": "eggs",
  "eggs": "eggs",
  "egg whites": "eggs",

  // Dairy
  "greek yogurt": "greek-yogurt",
  "plain greek yogurt": "greek-yogurt",
  "yogurt": "greek-yogurt",
  "yoghurt": "greek-yogurt",
  "cottage cheese": "cottage-cheese",
  "string cheese": "cheese-stick",
  "mozzarella sticks": "cheese-stick",
  "cheddar": "cheese-slice",
  "cheddar cheese": "cheese-slice",
  "cheese": "cheese-slice",
  "milk": "milk",
  "whole milk": "milk",
  "almond milk": "almond-milk",
  "butter": "butter",
  "unsalted butter": "butter",

  // Produce
  "bananas": "banana",
  "banana": "banana",
  "apples": "apple",
  "apple": "apple",
  "strawberries": "strawberry",
  "blueberries": "blueberry",
  "romaine": "romaine",
  "romaine lettuce": "romaine",
  "lettuce": "romaine",
  "baby spinach": "spinach",
  "spinach": "spinach",
  "broccoli": "broccoli",
  "broccoli florets": "broccoli",
  "carrots": "carrot",
  "baby carrots": "carrot",
  "carrot": "carrot",
  "bell peppers": "bell-pepper",
  "red bell pepper": "bell-pepper",
  "sweet potatoes": "sweet-potato",
  "green beans": "green-beans",
  "garlic": "garlic",
  "garlic cloves": "garlic",
  "minced garlic": "garlic",
  "ginger": "ginger",
  "limes": "lime",
  "lemons": "lemon",
  "lemon juice": "lemon",

  // Pantry
  "rice": "jasmine-rice",
  "jasmine rice": "jasmine-rice",
  "white rice": "jasmine-rice",
  "olive oil": "olive-oil",
  "extra virgin olive oil": "olive-oil",
  "evoo": "olive-oil",
  "sesame oil": "sesame-oil",
  "toasted sesame oil": "sesame-oil",
  "soy sauce": "soy-sauce",
  "low sodium soy sauce": "soy-sauce",
  "rice vinegar": "rice-vinegar",
  "sesame seeds": "sesame-seeds",
  "peanut butter": "peanut-butter",
  "honey": "honey",
  "oats": "oats",
  "rolled oats": "oats",
  "old fashioned oats": "oats",
  "chia seeds": "chia-seeds",
  "hemp hearts": "hemp-seeds",
  "hemp seeds": "hemp-seeds",
  "cocoa powder": "cocoa-powder",
  "vanilla": "vanilla-extract",
  "vanilla extract": "vanilla-extract",
  "almonds": "almonds",
  "marinara": "marinara",
  "marinara sauce": "marinara",
  "pasta sauce": "marinara",
  "taco seasoning": "taco-seasoning",

  // Bakery and grains
  "bread": "wholegrain-bread",
  "whole wheat bread": "wholegrain-bread",
  "whole grain bread": "wholegrain-bread",
  "tortilla": "wholegrain-tortilla",
  "tortillas": "wholegrain-tortilla",
  "whole wheat tortilla": "wholegrain-tortilla",
  "english muffin": "english-muffin",
  "english muffins": "english-muffin",
  "pasta": "pasta",
  "whole wheat pasta": "pasta",
  "penne": "pasta",
  "spaghetti": "pasta",
  "crackers": "crackers-wg",
  "cereal": "cereal-wg",

  // Frozen and drinks
  "edamame": "edamame",
  "frozen berries": "mixed-berry",
  "mixed berries": "mixed-berry",
  "frozen mango": "frozen-mango",
  "mango": "frozen-mango",
  "frozen pineapple": "frozen-pineapple",
  "pineapple": "frozen-pineapple",
  "frozen cherries": "frozen-cherries",
  "cherries": "frozen-cherries",
  "coconut water": "coconut-water",
  "orange juice": "orange-juice",
};

const BY_SLUG = new Map(INGREDIENTS.map((i) => [i.slug, i]));

// Seasonings the catalog deliberately does not carry, because they are assumed staples rather
// than things to shop for. Left to the matcher, "freshly cracked pepper" lands on Bell pepper,
// which is a different food entirely.
const NEVER_MATCH = new Set([
  "salt", "pepper", "black pepper", "sea salt", "kosher salt", "salt and pepper",
  "water", "ice", "cooking spray", "oil for frying",
]);

function normalise(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Character bigrams, which handle plurals and small typos better than word overlap alone. */
function bigrams(text: string): Set<string> {
  const t = text.replace(/\s/g, "");
  const out = new Set<string>();
  for (let i = 0; i < t.length - 1; i++) out.add(t.slice(i, i + 2));
  return out;
}

/** Sorensen-Dice over character bigrams. 1 is identical, 0 shares nothing. */
function dice(a: string, b: string): number {
  const A = bigrams(a);
  const B = bigrams(b);
  if (!A.size || !B.size) return 0;
  let shared = 0;
  for (const g of A) if (B.has(g)) shared++;
  return (2 * shared) / (A.size + B.size);
}

// Above this, the match is good enough to present as decided (still with a change affordance).
const STRONG = 0.75;
// Below this, we do not guess at all and the parent gets an unmatched row.
const FLOOR = 0.45;
// How close two single words must be to count as the same word. Set from real failures rather
// than taste: "chees" against "cheese" scores 0.89 and must pass, while "cracked" against
// "crackers" scores 0.77 and must NOT, because a Budget Bytes import turned freshly cracked
// pepper into whole-grain crackers. 0.8 separates them. This tolerates a typo inside a word,
// not a different word that happens to share a stem.
const WORD_MATCH = 0.8;

/**
 * Does the query share a real word with the candidate?
 *
 * Character bigrams alone are too generous on short strings: "gochujang" scores 0.46 against
 * "Frozen mango chunks" purely on the letter pairs an, ng and go, which is enough to clear
 * the floor and put gochujang in the cart as frozen mango. Requiring a shared word kills that
 * whole class of coincidence while still tolerating a typo inside the word that matched.
 */
function sharesWord(query: string, candidate: string): boolean {
  const qWords = query.split(" ").filter((w) => w.length >= 4);
  const cWords = candidate.split(" ").filter((w) => w.length >= 4);
  if (!qWords.length || !cWords.length) return false;
  return qWords.some((q) => cWords.some((c) => q === c || dice(q, c) >= WORD_MATCH));
}

/**
 * Finds the catalog ingredient a parsed name refers to.
 *
 * Returns "none" rather than a weak guess. An unmatched ingredient becomes a custom one the
 * parent labels, which is honest; a wrong match puts the wrong food in the cart.
 */
export function matchIngredient(name: string): IngredientMatch {
  const key = normalise(name);
  if (!key) return { confidence: "none", alternatives: [], score: 0 };

  if (NEVER_MATCH.has(key)) return { confidence: "none", alternatives: [], score: 0 };

  const aliased = ALIASES[key];
  if (aliased) {
    const ingredient = BY_SLUG.get(aliased);
    if (ingredient) return { confidence: "strong", ingredient, alternatives: [], score: 1 };
  }

  // Score against both the display name and the slug: "chicken-breast" and "Chicken breast"
  // catch different phrasings.
  const ranked = INGREDIENTS.map((ingredient) => {
    const name = normalise(ingredient.name);
    const slug = normalise(ingredient.slug.replace(/-/g, " "));
    const score = Math.max(dice(key, name), dice(key, slug));
    // No shared word means the score is letter-pair coincidence, so it does not count.
    const anchored = sharesWord(key, name) || sharesWord(key, slug);
    return { ingredient, score: anchored ? score : 0 };
  })
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);

  const best = ranked[0];
  if (!best || best.score < FLOOR) {
    return { confidence: "none", alternatives: [], score: best?.score ?? 0 };
  }

  return {
    confidence: best.score >= STRONG ? "strong" : "likely",
    ingredient: best.ingredient,
    alternatives: ranked.slice(1).filter((r) => r.score >= FLOOR).map((r) => r.ingredient),
    score: Math.round(best.score * 100) / 100,
  };
}

/**
 * Builds a custom ingredient for something the catalog does not carry.
 *
 * The alternative was dropping it, and dropping it is the worst option available: the item
 * silently disappears from the grocery list, so the parent shops without the one thing the
 * import was for. Category and unit come from the parent during review, not from a guess.
 */
export function customIngredient(
  name: string,
  category: Ingredient["category"],
  unit: Ingredient["unit"],
  id: string
): Ingredient {
  return { slug: `custom:${id}`, name: name.trim(), category, unit };
}

export function isCustomIngredient(slug: string): boolean {
  return slug.startsWith("custom:");
}
