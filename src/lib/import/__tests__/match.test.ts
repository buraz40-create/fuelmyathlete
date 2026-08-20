import { test } from "node:test";
import assert from "node:assert/strict";
import { matchIngredient, customIngredient, isCustomIngredient } from "../match.ts";
import { parseIngredientLine } from "../parse.ts";

test("an exact alias matches with full confidence", () => {
  const m = matchIngredient("greek yogurt");
  assert.equal(m.confidence, "strong");
  assert.equal(m.ingredient?.slug, "greek-yogurt");
});

test("matches the food left over after prep words are stripped", () => {
  const parsed = parseIngredientLine("2 lb boneless skinless chicken breasts, diced");
  const m = matchIngredient(parsed.name);
  assert.equal(m.ingredient?.slug, "chicken-breast");
  assert.notEqual(m.confidence, "none");
});

test("plurals and phrasing variants still land", () => {
  for (const [text, slug] of [
    ["bananas", "banana"],
    ["baby spinach", "spinach"],
    ["whole wheat tortillas", "wholegrain-tortilla"],
    ["extra virgin olive oil", "olive-oil"],
    ["rolled oats", "oats"],
  ] as const) {
    const m = matchIngredient(text);
    assert.equal(m.ingredient?.slug, slug, `${text} should match ${slug}`);
  }
});

test("something the catalog does not carry returns none rather than a wrong guess", () => {
  // The failure to avoid is confidently matching tahini onto bananas and putting the wrong
  // food in the cart. No match is recoverable; a wrong match is not.
  for (const text of ["tahini", "gochujang", "nutritional yeast", "saffron threads"]) {
    const m = matchIngredient(text);
    assert.equal(m.confidence, "none", `${text} should not match anything in the catalog`);
    assert.equal(m.ingredient, undefined);
  }
});

test("letter-pair coincidence alone is not a match", () => {
  // Regression: "gochujang" scored 0.46 against "Frozen mango chunks" on the pairs an, ng and
  // go, which cleared the floor and would have put gochujang in the cart as frozen mango.
  // A match now has to share an actual word, not just letters.
  const m = matchIngredient("gochujang");
  assert.equal(m.confidence, "none");
});

test("a near miss is offered as a suggestion, not as decided", () => {
  const m = matchIngredient("cheddar chees");
  assert.notEqual(m.confidence, "none");
  assert.ok(m.score > 0);
});

test("empty input does not throw or match", () => {
  const m = matchIngredient("");
  assert.equal(m.confidence, "none");
});

test("a custom ingredient carries the parent's category and unit, not a guess", () => {
  const c = customIngredient("Tahini", "pantry", "tbsp", "a1b2");
  assert.equal(c.slug, "custom:a1b2");
  assert.equal(c.name, "Tahini");
  assert.equal(c.category, "pantry");
  assert.equal(c.unit, "tbsp");
  assert.ok(isCustomIngredient(c.slug));
});

test("catalog slugs are never mistaken for custom ones", () => {
  assert.equal(isCustomIngredient("chicken-breast"), false);
});

test("alternatives never include the top pick twice", () => {
  const m = matchIngredient("chicken");
  if (m.ingredient) {
    assert.ok(!m.alternatives.some((a) => a.slug === m.ingredient?.slug));
  }
});

test("a shared stem is not a shared word", () => {
  // Regression from a real Budget Bytes import: "freshly cracked pepper" matched
  // "Whole-grain crackers", because "cracked" and "crackers" share most of their letters.
  // Pepper is not crackers, and putting crackers in the cart is the wrong-food failure.
  const m = matchIngredient("pepper");
  assert.notEqual(m.ingredient?.slug, "crackers-wg");
});

test("staple seasonings do not match a different food", () => {
  // The catalog carries no salt or pepper on purpose, they are assumed staples. Left to the
  // matcher, "pepper" landed on Bell pepper, which is not the same food.
  for (const s of ["salt", "pepper", "black pepper", "water"]) {
    assert.equal(matchIngredient(s).confidence, "none", `${s} should not match`);
  }
});

test("a different cut is not silently swapped for the one we stock", () => {
  // Thighs and breast cook differently and are not interchangeable on a shopping list.
  const m = matchIngredient("chicken thighs");
  assert.notEqual(m.confidence, "strong");
});
