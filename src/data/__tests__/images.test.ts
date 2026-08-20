import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, statSync } from "node:fs";
import { join } from "node:path";
import { MEALS } from "../meals.ts";
import { RECIPES } from "../recipes.ts";

// Two separate lists carry images and they are easy to confuse: MEALS feeds the planner, while
// RECIPES feeds the recipe pages and the /recipes grid. Filling in one and believing the job
// done is exactly the mistake this test exists to catch.
const SOURCES = [
  { name: "MEALS", items: MEALS.map((m) => ({ slug: m.slug, imageUrl: m.imageUrl })) },
  { name: "RECIPES", items: RECIPES.map((r) => ({ slug: r.slug, imageUrl: r.imageUrl })) },
];

for (const { name, items } of SOURCES) {
  test(`${name}: every image exists on disk`, () => {
    const missing = items
      .filter((i) => i.imageUrl && !i.imageUrl.startsWith("http"))
      .filter((i) => !existsSync(join("public", i.imageUrl!)))
      .map((i) => `${i.slug} -> ${i.imageUrl}`);
    assert.deepEqual(missing, [], `point at files that are not there:\n${missing.join("\n")}`);
  });

  test(`${name}: nothing hotlinks an image from another origin`, () => {
    // The service worker refuses to cache cross-origin responses, so a hotlinked photograph is
    // blank in a grocery aisle with no signal, which is the case this app is built for. It also
    // breaks whenever the other side changes their URL scheme.
    const remote = items.filter((i) => i.imageUrl?.startsWith("http")).map((i) => i.slug);
    assert.deepEqual(remote, [], `still hotlinking: ${remote.join(", ")}`);
  });

  test(`${name}: images stay small enough to send to a phone`, () => {
    // The house size is 800x800 at roughly 20-90 KB. Much past that is a photograph somebody
    // dropped in at full resolution.
    const heavy = items
      .filter((i) => i.imageUrl && !i.imageUrl.startsWith("http"))
      .filter((i) => existsSync(join("public", i.imageUrl!)))
      .map((i) => ({ slug: i.slug, kb: Math.round(statSync(join("public", i.imageUrl!)).size / 1024) }))
      .filter((x) => x.kb > 200);
    assert.deepEqual(heavy, [], `oversized: ${heavy.map((x) => `${x.slug} ${x.kb}KB`).join(", ")}`);
  });
}

test("a recipe and the meal of the same name agree about the picture", () => {
  // Only where the slugs match. Several meals deliberately share one recipe and keep their own
  // photograph: tournament-sub and turkey-wrap are both the turkey wrap recipe, and a sub cut
  // for a cooler does not look like a wrap. hibachi-bowl-matchday and pre-match-plain-plate are
  // the same arrangement. Comparing those would report a difference that is the whole point.
  const recipeImage = new Map(RECIPES.map((r) => [r.slug, r.imageUrl]));
  const disagree = MEALS.filter((m) => recipeImage.has(m.slug))
    .filter((m) => m.imageUrl && recipeImage.get(m.slug) && m.imageUrl !== recipeImage.get(m.slug))
    .map((m) => `${m.slug}: meal ${m.imageUrl} vs recipe ${recipeImage.get(m.slug)}`);
  assert.deepEqual(disagree, [], disagree.join("\n"));
});
