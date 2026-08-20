import type { Ingredient } from "@/types/domain";

// Quantities everywhere are AS PURCHASED, not as served.
//
// This list is what you hand to someone in a shop, so rice is dry rice and pasta is the weight
// on the box. Rice was briefly entered as cooked volume, and since jasmine roughly triples
// when cooked, a week asked for about three times the rice it needed. If an ingredient can be
// bought in one state and eaten in another, say which in the name.
export const INGREDIENTS: Ingredient[] = [
  // PRODUCE
  { slug: "banana",        name: "Bananas",         category: "produce",   unit: "each" },
  { slug: "apple",         name: "Apples",          category: "produce",   unit: "each" },
  { slug: "strawberry",    name: "Strawberries",    category: "produce",   unit: "cup" },
  { slug: "blueberry",     name: "Blueberries",     category: "produce",   unit: "cup" },
  { slug: "romaine",       name: "Romaine lettuce", category: "produce",   unit: "cup" },
  { slug: "spinach",       name: "Baby spinach",    category: "produce",   unit: "cup" },
  { slug: "broccoli",      name: "Broccoli",        category: "produce",   unit: "cup" },
  { slug: "carrot",        name: "Baby carrots",    category: "produce",   unit: "cup" },
  { slug: "bell-pepper",   name: "Bell pepper",     category: "produce",   unit: "each" },
  { slug: "sweet-potato",  name: "Sweet potato",    category: "produce",   unit: "each" },
  { slug: "green-beans",   name: "Green beans",     category: "produce",   unit: "cup" },
  { slug: "garlic",        name: "Garlic cloves",   category: "produce",   unit: "each" },
  { slug: "ginger",        name: "Fresh ginger",    category: "produce",   unit: "tbsp" },
  { slug: "lime",          name: "Limes",           category: "produce",   unit: "each" },
  { slug: "lemon",         name: "Lemons",          category: "produce",   unit: "each" },

  // PROTEIN
  { slug: "chicken-breast", name: "Chicken breast",        category: "protein", unit: "lb" },
  { slug: "ground-turkey",  name: "Ground turkey (lean)",  category: "protein", unit: "lb" },
  { slug: "salmon",         name: "Salmon fillet",         category: "protein", unit: "lb" },
  { slug: "eggs",           name: "Eggs",                  category: "protein", unit: "each" },
  { slug: "greek-yogurt",   name: "Plain Greek yogurt",    category: "protein", unit: "cup" },
  { slug: "deli-turkey",    name: "Sliced deli turkey",    category: "protein", unit: "oz" },
  { slug: "cheese-stick",   name: "String cheese",         category: "protein", unit: "each" },
  { slug: "cheese-slice",   name: "Cheddar slices",        category: "protein", unit: "each" },
  { slug: "almonds",        name: "Raw almonds",           category: "protein", unit: "cup" },

  // PANTRY
  { slug: "jasmine-rice",   name: "Jasmine rice (dry)",          category: "pantry",  unit: "cup" },
  { slug: "wholegrain-bread", name: "Whole-grain bread",   category: "pantry",  unit: "each" },
  { slug: "wholegrain-tortilla", name: "Whole-grain tortillas", category: "pantry", unit: "each" },
  { slug: "pasta",          name: "Whole-grain pasta",     category: "pantry",  unit: "oz" },
  { slug: "marinara",       name: "Marinara sauce",        category: "pantry",  unit: "cup" },
  { slug: "peanut-butter",  name: "Peanut butter",         category: "pantry",  unit: "tbsp" },
  { slug: "honey",          name: "Honey",                 category: "pantry",  unit: "tbsp" },
  { slug: "soy-sauce",      name: "Low-sodium soy sauce",  category: "pantry",  unit: "tbsp" },
  { slug: "sesame-oil",     name: "Toasted sesame oil",    category: "pantry",  unit: "tsp" },
  { slug: "olive-oil",      name: "Olive oil",             category: "pantry",  unit: "tbsp" },
  { slug: "rice-vinegar",   name: "Rice vinegar",          category: "pantry",  unit: "tbsp" },
  { slug: "sesame-seeds",   name: "Sesame seeds",          category: "pantry",  unit: "tsp" },
  { slug: "crackers-wg",    name: "Whole-grain crackers",  category: "pantry",  unit: "oz" },
  { slug: "cereal-wg",      name: "Whole-grain cereal",    category: "pantry",  unit: "cup" },
  { slug: "hummus",         name: "Hummus",              category: "pantry",  unit: "cup" },
  { slug: "raisins",        name: "Raisins",             category: "pantry",  unit: "cup" },
  { slug: "choc-chips",     name: "Dark chocolate chips", category: "pantry", unit: "cup" },
  { slug: "granola",        name: "Granola",             category: "pantry",  unit: "cup" },
  { slug: "tomato",         name: "Tomatoes",            category: "produce", unit: "each" },
  { slug: "taco-seasoning", name: "Taco seasoning",        category: "pantry",  unit: "tbsp" },
  { slug: "oats",           name: "Rolled oats",           category: "pantry",  unit: "cup" },
  { slug: "cocoa-powder",   name: "Unsweetened cocoa powder", category: "pantry", unit: "tbsp" },
  { slug: "hemp-seeds",     name: "Hemp hearts",           category: "pantry",  unit: "tbsp" },
  { slug: "vanilla-extract", name: "Pure vanilla extract", category: "pantry",  unit: "tsp" },
  { slug: "chia-seeds",     name: "Chia seeds",            category: "pantry",  unit: "tbsp" },
  { slug: "coconut-water",  name: "Coconut water",         category: "beverages", unit: "cup" },

  // DAIRY
  { slug: "milk",           name: "Milk",                 category: "dairy", unit: "cup" },
  { slug: "almond-milk",    name: "Unsweetened almond milk", category: "dairy", unit: "cup" },
  { slug: "butter",         name: "Unsalted butter",      category: "dairy", unit: "tbsp" },
  { slug: "cottage-cheese", name: "Low-fat cottage cheese", category: "dairy", unit: "cup" },

  // FROZEN
  { slug: "edamame",     name: "Shelled edamame",      category: "frozen", unit: "cup" },
  { slug: "mixed-berry", name: "Frozen mixed berries", category: "frozen", unit: "cup" },
  { slug: "frozen-mango", name: "Frozen mango chunks", category: "frozen", unit: "cup" },
  { slug: "frozen-pineapple", name: "Frozen pineapple chunks", category: "frozen", unit: "cup" },
  { slug: "frozen-cherries",  name: "Frozen pitted cherries",  category: "frozen", unit: "cup" },

  // BAKERY
  { slug: "english-muffin", name: "Whole-grain English muffins", category: "bakery", unit: "each" },
  { slug: "wholegrain-bun",  name: "Whole-grain burger buns", category: "bakery", unit: "each" },

  // BEVERAGES
  { slug: "orange-juice", name: "Orange juice",      category: "beverages", unit: "cup" },
  { slug: "electrolyte",  name: "Electrolyte mix",   category: "beverages", unit: "each" },
];

export const INGREDIENT_BY_SLUG: Record<string, Ingredient> = Object.fromEntries(
  INGREDIENTS.map((i) => [i.slug, i])
);
