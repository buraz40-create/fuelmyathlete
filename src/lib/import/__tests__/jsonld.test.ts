import { test } from "node:test";
import assert from "node:assert/strict";
import {
  extractJsonLdBlocks,
  findRecipeNode,
  parseJsonLdRecipe,
  readDuration,
} from "../jsonld.ts";

function page(ld: unknown): string {
  return `<!doctype html><html><head><title>x</title>
<script type="application/ld+json">${JSON.stringify(ld)}</script>
</head><body><p>story about my grandmother</p></body></html>`;
}

test("finds a plain Recipe node", () => {
  const r = parseJsonLdRecipe(
    page({
      "@context": "https://schema.org",
      "@type": "Recipe",
      name: "Sheet pan chicken",
      recipeIngredient: ["2 lb chicken thighs", "1 tbsp olive oil"],
      recipeInstructions: "Heat the oven.\nRoast for 30 minutes.",
      recipeYield: "4 servings",
      totalTime: "PT45M",
    })
  );
  assert.equal(r?.name, "Sheet pan chicken");
  assert.equal(r?.ingredientLines.length, 2);
  assert.equal(r?.steps.length, 2);
  assert.equal(r?.servings, 4);
  assert.equal(r?.totalMinutes, 45);
});

test("finds a Recipe inside @graph", () => {
  const r = parseJsonLdRecipe(
    page({
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "WebSite", name: "A blog" },
        { "@type": "Recipe", name: "Chili", recipeIngredient: ["1 lb beef"] },
      ],
    })
  );
  assert.equal(r?.name, "Chili");
});

test("finds a Recipe when @type is an array", () => {
  const r = parseJsonLdRecipe(
    page({ "@type": ["NewsArticle", "Recipe"], name: "Soup", recipeIngredient: ["2 cups stock"] })
  );
  assert.equal(r?.name, "Soup");
});

test("reads HowToStep instructions", () => {
  const r = parseJsonLdRecipe(
    page({
      "@type": "Recipe",
      name: "Pasta",
      recipeIngredient: ["1 lb pasta"],
      recipeInstructions: [
        { "@type": "HowToStep", text: "Boil the water." },
        { "@type": "HowToStep", text: "Add the pasta." },
      ],
    })
  );
  assert.deepEqual(r?.steps, ["Boil the water.", "Add the pasta."]);
});

test("reads HowToSection instructions, which nest a step list", () => {
  const r = parseJsonLdRecipe(
    page({
      "@type": "Recipe",
      name: "Cake",
      recipeIngredient: ["2 cups flour"],
      recipeInstructions: [
        {
          "@type": "HowToSection",
          name: "For the batter",
          itemListElement: [
            { "@type": "HowToStep", text: "Cream the butter." },
            { "@type": "HowToStep", text: "Fold in the flour." },
          ],
        },
      ],
    })
  );
  assert.deepEqual(r?.steps, ["Cream the butter.", "Fold in the flour."]);
});

test("adds prep and cook time when totalTime is absent", () => {
  const r = parseJsonLdRecipe(
    page({
      "@type": "Recipe",
      name: "Stew",
      recipeIngredient: ["1 lb beef"],
      prepTime: "PT15M",
      cookTime: "PT1H",
    })
  );
  assert.equal(r?.totalMinutes, 75);
});

test("strips markup and entities out of ingredient lines", () => {
  const r = parseJsonLdRecipe(
    page({
      "@type": "Recipe",
      name: "Salad",
      recipeIngredient: ["<strong>2</strong> cups romaine", "1 tbsp olive oil &amp; vinegar"],
    })
  );
  assert.equal(r?.ingredientLines[0], "2 cups romaine");
  assert.equal(r?.ingredientLines[1], "1 tbsp olive oil & vinegar");
});

test("a Recipe node with no ingredients is not a usable import", () => {
  // Better to fail over to the paste box than to open an empty review screen that looks broken.
  const r = parseJsonLdRecipe(page({ "@type": "Recipe", name: "Mystery" }));
  assert.equal(r, null);
});

test("a page with no Recipe node returns null", () => {
  const r = parseJsonLdRecipe(page({ "@type": "WebSite", name: "A blog" }));
  assert.equal(r, null);
});

test("one malformed block does not cost us a good one on the same page", () => {
  const html = `<script type="application/ld+json">{ oh no, not json }</script>
<script type="application/ld+json">${JSON.stringify({
    "@type": "Recipe",
    name: "Rescued",
    recipeIngredient: ["1 cup rice"],
  })}</script>`;
  assert.equal(parseJsonLdRecipe(html)?.name, "Rescued");
});

test("takes several blocks off one page", () => {
  const html = `<script type="application/ld+json">{"@type":"WebSite"}</script>
<script type="application/ld+json">{"@type":"Recipe","name":"x","recipeIngredient":["a"]}</script>`;
  assert.equal(extractJsonLdBlocks(html).length, 2);
  assert.ok(findRecipeNode(extractJsonLdBlocks(html)));
});

test("parses ISO durations", () => {
  assert.equal(readDuration("PT30M"), 30);
  assert.equal(readDuration("PT2H"), 120);
  assert.equal(readDuration("PT1H15M"), 75);
  assert.equal(readDuration("nonsense"), undefined);
  assert.equal(readDuration(undefined), undefined);
});

test("html with no JSON-LD at all does not throw", () => {
  assert.equal(parseJsonLdRecipe("<html><body>nothing here</body></html>"), null);
});
