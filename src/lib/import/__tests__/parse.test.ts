import { test } from "node:test";
import assert from "node:assert/strict";
import { parseIngredientLine, parseRecipeText, unresolvedAmounts } from "../parse.ts";

// The load-bearing test in this file is "never invents an amount". Everything else is
// convenience; that one is the safety property.

test("reads a plain amount and unit", () => {
  const r = parseIngredientLine("2 lb chicken breast");
  assert.equal(r.quantity, 2);
  assert.equal(r.unit, "lb");
  assert.equal(r.name, "chicken breast");
});

test("reads a mixed number", () => {
  const r = parseIngredientLine("1 1/2 cups jasmine rice");
  assert.equal(r.quantity, 1.5);
  assert.equal(r.unit, "cup");
  assert.equal(r.name, "jasmine rice");
});

test("reads a vulgar fraction on its own", () => {
  const r = parseIngredientLine("½ cup greek yogurt");
  assert.equal(r.quantity, 0.5);
  assert.equal(r.unit, "cup");
});

test("reads a mixed number written with a vulgar fraction", () => {
  const r = parseIngredientLine("1½ cups milk");
  assert.equal(r.quantity, 1.5);
  assert.equal(r.unit, "cup");
});

test("a range takes the low end rather than the average", () => {
  // Over-buying every week is the failure we just fixed on the hibachi line. Low end plus a
  // top-up is the cheaper mistake, and it is a number the source actually wrote.
  const r = parseIngredientLine("1-2 cups spinach");
  assert.equal(r.quantity, 1);
  assert.equal(r.unit, "cup");
});

test("NEVER invents an amount that was not stated", () => {
  const r = parseIngredientLine("a handful of spinach");
  assert.equal(r.quantity, null, "an unstated amount must stay null, never be guessed");
  const s = parseIngredientLine("salt and pepper to taste");
  assert.equal(s.quantity, null);
});

test("strips prep words so the food can be matched to the catalog", () => {
  const r = parseIngredientLine("2 lb boneless skinless chicken breasts, diced");
  assert.equal(r.name, "chicken breasts");
});

test("drops a parenthetical without losing the food", () => {
  const r = parseIngredientLine("2 (14.5 oz) cans diced tomatoes");
  assert.equal(r.quantity, 2);
  assert.equal(r.name, "cans tomatoes");
});

test("converts grams to ounces", () => {
  const r = parseIngredientLine("500 g ground turkey");
  assert.equal(r.unit, "oz");
  assert.ok(Math.abs((r.quantity ?? 0) - 17.637) < 0.01);
});

test("keeps an unmappable unit as written rather than coercing it", () => {
  const r = parseIngredientLine("2 sprigs rosemary");
  assert.equal(r.unit, null, "a unit we cannot add up must not become 'each'");
  assert.equal(r.unitAsWritten, "sprigs");
  assert.equal(r.quantity, 2);
});

test("recognises a section header", () => {
  const r = parseIngredientLine("For the sauce:");
  assert.equal(r.isHeader, true);
});

test("splits a headed recipe into ingredients and steps", () => {
  const text = [
    "Hibachi chicken and rice",
    "Serves 4",
    "Ingredients",
    "2 lb chicken breast",
    "1 cup jasmine rice",
    "2 tbsp low sodium soy sauce",
    "Instructions",
    "1. Heat the griddle until a drop of water skitters across it, then add the oil.",
    "2. Cook the chicken until it is no longer pink in the middle, about six minutes.",
  ].join("\n");

  const r = parseRecipeText(text);
  assert.equal(r.title, "Hibachi chicken and rice");
  assert.equal(r.servings, 4);
  assert.equal(r.ingredients.length, 3);
  assert.equal(r.steps.length, 2);
  assert.equal(r.ingredients[0].name, "chicken breast");
  assert.ok(r.steps[0].startsWith("Heat the griddle"));
});

test("splits an unheaded recipe using line shape", () => {
  const text = [
    "Turkey wrap",
    "1 whole-grain tortilla",
    "3 oz sliced turkey",
    "1 slice cheddar",
    "Lay the tortilla flat and spread a thin layer of hummus across the center third of it.",
  ].join("\n");

  const r = parseRecipeText(text);
  assert.equal(r.title, "Turkey wrap");
  assert.equal(r.ingredients.length, 3);
  assert.equal(r.steps.length, 1);
});

test("yield and timing lines never become things to shop for", () => {
  // These sit loose above the ingredient heading on almost every recipe, and they are short
  // and unpunctuated, so the ingredient heuristic swallowed them until it was taught not to.
  const r = parseRecipeText(
    ["Chili", "Serves 6", "Prep time: 15 minutes", "Cook time: 40 minutes", "2 lb beef"].join("\n")
  );
  assert.equal(r.ingredients.length, 1);
  assert.equal(r.ingredients[0].name, "beef");
  assert.equal(r.servings, 6);
});

test("reads total time across hours and minutes", () => {
  const r = parseRecipeText("Chili\n1 hour 20 minutes\n2 lb beef");
  assert.equal(r.totalMinutes, 80);
});

test("leaves servings and time null when the source never said", () => {
  const r = parseRecipeText("Snack\n1 apple\n2 tbsp peanut butter");
  assert.equal(r.servings, null);
  assert.equal(r.totalMinutes, null);
});

test("reports which amounts still need a parent to fill them in", () => {
  const r = parseRecipeText(
    ["Salad", "2 cups romaine", "a handful of walnuts", "olive oil"].join("\n")
  );
  const missing = unresolvedAmounts(r);
  assert.equal(missing.length, 2);
  assert.ok(missing.every((m) => m.quantity === null));
});

test("keeps the raw line so a parent can always see what we read", () => {
  const r = parseIngredientLine("  - 2 lb boneless chicken breast, diced  ");
  assert.equal(r.raw, "- 2 lb boneless chicken breast, diced");
});

test("an empty paste does not throw", () => {
  const r = parseRecipeText("");
  assert.equal(r.ingredients.length, 0);
  assert.equal(r.steps.length, 0);
  assert.equal(r.title, null);
});

test("an unmappable unit is not left glued to the ingredient name", () => {
  // Otherwise the review row reads "2 each sprigs rosemary", showing a unit twice.
  const r = parseIngredientLine("2 sprigs rosemary");
  assert.equal(r.name, "rosemary");
  assert.equal(r.unitAsWritten, "sprigs");
});

test("a first word is only a unit when an amount came before it", () => {
  // "olive oil" has no amount, so "olive" must not be eaten as a unit.
  const r = parseIngredientLine("olive oil");
  assert.equal(r.unitAsWritten, undefined);
  assert.equal(r.name, "olive oil");
});
