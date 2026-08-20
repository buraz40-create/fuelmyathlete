import { test } from "node:test";
import assert from "node:assert/strict";
import { MEALS } from "../meals.ts";

// Calories and macros are four numbers that cannot vary independently. If a meal claims 260
// kcal while its own protein, carbohydrate and fat add up to 284, at least one of them is
// wrong, and there is no way to tell which by looking at the card.
//
// This site shows nutrition to parents of children and cites USDA for it. Numbers that
// contradict each other are the kind of thing that costs the whole site its credibility in one
// screenshot, so the relationship is checked rather than trusted.

/**
 * Atwater, with fibre at 2 kcal/g rather than 4.
 *
 * The naive 4/4/9 overestimates anything high in fibre, because fibre is counted inside total
 * carbohydrate but is only partly metabolised. Using the naive version flagged the peanut
 * butter snack as 12% out when the real discrepancy was about half that, so the formula has to
 * account for fibre before the tolerance means anything.
 */
function expectedKcal(n: {
  proteinG: number;
  carbsG: number;
  fatG: number;
  fiberG?: number;
}): number {
  const fibre = n.fiberG ?? 0;
  return 4 * n.proteinG + 4 * (n.carbsG - fibre) + 9 * n.fatG + 2 * fibre;
}

// Real foods vary by brand and portion and these are honest estimates, not lab figures, so
// this is deliberately loose. It is looking for a number that is wrong, not one that is
// imprecise. Every meal currently sits at 8.5% or better.
const TOLERANCE = 0.1;

test("stated calories agree with the stated macros", () => {
  const wrong: string[] = [];
  for (const meal of MEALS) {
    if (!meal.nutrition) continue;
    const expected = expectedKcal(meal.nutrition);
    if (expected <= 0) continue;
    const drift = Math.abs(meal.nutrition.kcal - expected) / expected;
    if (drift > TOLERANCE) {
      wrong.push(
        `${meal.slug}: claims ${meal.nutrition.kcal} kcal but its macros give ` +
          `${Math.round(expected)} (${(drift * 100).toFixed(1)}% out)`
      );
    }
  }
  assert.deepEqual(wrong, [], wrong.join("\n"));
});

test("no macro is negative, and fibre never exceeds total carbohydrate", () => {
  for (const meal of MEALS) {
    const n = meal.nutrition;
    if (!n) continue;
    for (const [k, v] of Object.entries({
      kcal: n.kcal,
      proteinG: n.proteinG,
      carbsG: n.carbsG,
      fatG: n.fatG,
    })) {
      assert.ok(v >= 0, `${meal.slug}: ${k} is ${v}`);
    }
    // Fibre is a subset of carbohydrate, so more fibre than carbs is arithmetically impossible.
    assert.ok(
      (n.fiberG ?? 0) <= n.carbsG,
      `${meal.slug}: ${n.fiberG} g fibre against ${n.carbsG} g total carbohydrate`
    );
  }
});

test("a single serving is a plausible size for a young athlete", () => {
  // Not a nutrition rule, a typo guard. A meal at 40 kcal or 1,500 is a data entry error, and
  // the youth view hides calories anyway so nobody would see it to question it.
  for (const meal of MEALS) {
    if (!meal.nutrition) continue;
    assert.ok(
      meal.nutrition.kcal >= 80 && meal.nutrition.kcal <= 900,
      `${meal.slug}: ${meal.nutrition.kcal} kcal per serving is outside anything believable`
    );
  }
});
