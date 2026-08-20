import type { Allergen } from "@/types/domain";

// Allergens are derived from ingredients rather than tagged per meal, so a meal cannot drift
// out of sync with what is actually in it. Add the ingredient here once and every meal and
// recipe that uses it inherits the flag.
//
// This is a "contains" style disclosure, not a safety guarantee. Brands vary, kitchens share
// surfaces, and a family managing a real allergy has to read the package.
const INGREDIENT_ALLERGENS: Record<string, Allergen[]> = {
  "peanut-butter": ["peanut"],
  almonds: ["tree-nut"],
  "almond-milk": ["tree-nut"],
  "greek-yogurt": ["dairy"],
  "cottage-cheese": ["dairy"],
  "cheese-slice": ["dairy"],
  "cheese-stick": ["dairy"],
  milk: ["dairy"],
  butter: ["dairy"],
  eggs: ["egg"],
  "wholegrain-bread": ["gluten"],
  "wholegrain-tortilla": ["gluten"],
  "english-muffin": ["gluten"],
  "wholegrain-bun": ["gluten"],
  pasta: ["gluten"],
  "crackers-wg": ["gluten"],
  "cereal-wg": ["gluten"],
  salmon: ["fish"],
  "sesame-oil": ["sesame"],
  "sesame-seeds": ["sesame"],
  // Standard soy sauce is brewed with wheat as well as soybeans.
  "soy-sauce": ["soy", "gluten"],
  edamame: ["soy"],
};

const ORDER: Allergen[] = [
  "peanut",
  "tree-nut",
  "dairy",
  "egg",
  "gluten",
  "soy",
  "fish",
  "shellfish",
  "sesame",
];

export const ALLERGEN_LABEL: Record<Allergen, string> = {
  peanut: "Peanut",
  "tree-nut": "Tree nut",
  dairy: "Dairy",
  egg: "Egg",
  gluten: "Gluten",
  soy: "Soy",
  fish: "Fish",
  shellfish: "Shellfish",
  sesame: "Sesame",
};

export function allergensForIngredients(slugs: string[]): Allergen[] {
  const found = new Set<Allergen>();
  for (const slug of slugs) {
    for (const a of INGREDIENT_ALLERGENS[slug] ?? []) found.add(a);
  }
  return ORDER.filter((a) => found.has(a));
}
