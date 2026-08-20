import type { Meal } from "@/types/domain";

const ALL_DAYS = ["school", "training", "match", "rest"] as const;

export const MEALS: Meal[] = [
  // BREAKFAST
  {
    slug: "athlete-overnight-oats",
    name: "Athlete overnight oats",
    slot: "breakfast",
    description:
      "Slow-release rolled oats + Greek yogurt + banana. Make it the night before, eat 1-2 hours before training.",
    prepMinutes: 5,
    suitableFor: ["school", "training", "match"],
    kidRating: 4,
    // Verified by opening it at full size: oats and milk in a white bowl with blueberries and strawberries.
    imageUrl: "/images/recipes/athlete-overnight-oats.jpg",
    recipeSlug: "athlete-overnight-oats",
    nutrition: { kcal: 410, proteinG: 18, carbsG: 64, fatG: 9, fiberG: 9, source: "USDA estimate" },
    ingredients: [
      { ingredientSlug: "oats",         quantity: 0.5 },
      { ingredientSlug: "milk",         quantity: 0.5 },
      { ingredientSlug: "greek-yogurt", quantity: 0.25 },
      { ingredientSlug: "chia-seeds",   quantity: 1 },
      { ingredientSlug: "honey",        quantity: 1 },
      { ingredientSlug: "banana",       quantity: 0.5 },
      { ingredientSlug: "mixed-berry",  quantity: 0.25 },
    ],
    tags: ["pre-workout", "make-ahead"],
  },

  {
    slug: "cereal-banana-milk",
    name: "Whole-grain cereal + banana + milk",
    slot: "breakfast",
    description: "Fast, kid-approved fuel. Switch to whole-grain cereal for steady energy.",
    prepMinutes: 3,
    suitableFor: ["school", "rest"],
    kidRating: 5,
    // Generated to match this recipe's own ingredients, checked at card size. Stock
    // photo libraries had nothing honest for this dish.
    imageUrl: "/images/recipes/cereal-banana-milk.jpg",
    recipeSlug: "cereal-banana-milk",
    nutrition: { kcal: 355, proteinG: 13, carbsG: 70, fatG: 4, fiberG: 7, source: "USDA estimate" },
    ingredients: [
      { ingredientSlug: "cereal-wg", quantity: 1 },
      { ingredientSlug: "banana",    quantity: 1 },
      { ingredientSlug: "milk",      quantity: 1 },
    ],
  },
  {
    slug: "eggs-toast",
    name: "Scrambled eggs + whole-grain toast",
    slot: "breakfast",
    description: "Real protein + slow carbs to last through morning classes.",
    prepMinutes: 8,
    suitableFor: ["school", "training", "match"],
    kidRating: 4,
    // Generated to match this recipe's own ingredients, checked at card size. Stock
    // photo libraries had nothing honest for this dish.
    imageUrl: "/images/recipes/eggs-toast.jpg",
    recipeSlug: "eggs-toast",
    nutrition: { kcal: 340, proteinG: 18, carbsG: 28, fatG: 16, fiberG: 4, source: "USDA estimate" },
    ingredients: [
      { ingredientSlug: "eggs",             quantity: 2 },
      { ingredientSlug: "wholegrain-bread", quantity: 2 },
      { ingredientSlug: "butter",           quantity: 1 },
    ],
  },
  {
    slug: "berry-smoothie",
    name: "Berry banana smoothie",
    slot: "breakfast",
    description: "Hidden spinach for vitamins. Kids can't taste it, promise.",
    prepMinutes: 5,
    suitableFor: ["school", "training", "match"],
    kidRating: 5,
    // Generated to match this recipe's own ingredients, checked at card size. Stock
    // photo libraries had nothing honest for this dish.
    imageUrl: "/images/recipes/berry-smoothie.jpg",
    recipeSlug: "berry-smoothie",
    nutrition: { kcal: 295, proteinG: 14, carbsG: 52, fatG: 4, fiberG: 6, source: "USDA estimate" },
    ingredients: [
      { ingredientSlug: "banana",       quantity: 1 },
      { ingredientSlug: "mixed-berry",  quantity: 1 },
      { ingredientSlug: "greek-yogurt", quantity: 0.5 },
      { ingredientSlug: "milk",         quantity: 1 },
      { ingredientSlug: "spinach",      quantity: 1 },
      { ingredientSlug: "honey",        quantity: 1 },
    ],
  },
  {
    slug: "english-muffin-pb",
    name: "English muffin + peanut butter + banana",
    slot: "breakfast",
    description: "Pre-game favorite. High carb, easy to digest, packable.",
    prepMinutes: 4,
    suitableFor: ["training", "match"],
    kidRating: 5,
    // Generated to match this recipe's own ingredients, checked at card size. Stock
    // photo libraries had nothing honest for this dish.
    imageUrl: "/images/recipes/english-muffin-pb.jpg",
    recipeSlug: "english-muffin-pb",
    nutrition: { kcal: 385, proteinG: 13, carbsG: 55, fatG: 14, fiberG: 6, source: "USDA estimate" },
    ingredients: [
      { ingredientSlug: "english-muffin", quantity: 1 },
      { ingredientSlug: "peanut-butter",  quantity: 2 },
      { ingredientSlug: "banana",         quantity: 1 },
    ],
  },
  {
    slug: "pb-banana-power",
    name: "PB banana power smoothie",
    slot: "breakfast",
    description: "Heavy on protein and fat. Best when practice runs long and breakfast has to last.",
    prepMinutes: 5,
    suitableFor: ["school", "training", "match", "rest"],
    kidRating: 5,
    // Generated to match this recipe's own ingredients, checked at card size. Stock
    // photo libraries had nothing honest for this dish.
    imageUrl: "/images/recipes/pb-banana-power.jpg",
    recipeSlug: "pb-banana-power",
    nutrition: { kcal: 415, proteinG: 22, carbsG: 48, fatG: 16, fiberG: 5, source: "USDA estimate" },
    ingredients: [
      { ingredientSlug: "banana",       quantity: 1 },
      { ingredientSlug: "peanut-butter", quantity: 2 },
      { ingredientSlug: "milk",         quantity: 1 },
      { ingredientSlug: "greek-yogurt", quantity: 0.5 },
      { ingredientSlug: "honey",        quantity: 1 },
      { ingredientSlug: "oats",         quantity: 0.25 },
    ],
  },
  {
    slug: "green-machine",
    name: "Green machine smoothie",
    slot: "breakfast",
    description: "Hidden spinach plus avocado for fat. Kids cannot taste the greens behind the banana and mango.",
    prepMinutes: 5,
    suitableFor: ["school", "training", "match", "rest"],
    kidRating: 4,
    // Verified at card size, not just full size: an opaque green smoothie thick enough to
    // read as blended. The previous pick was translucent and looked like green water, which
    // is exactly what a real visitor called it.
    imageUrl: "/images/recipes/green-machine.jpg",
    recipeSlug: "green-machine",
    nutrition: { kcal: 285, proteinG: 12, carbsG: 50, fatG: 6, fiberG: 7, source: "USDA estimate" },
    ingredients: [
      { ingredientSlug: "banana",       quantity: 1 },
      { ingredientSlug: "spinach",      quantity: 2 },
      { ingredientSlug: "frozen-mango", quantity: 1 },
      { ingredientSlug: "milk",         quantity: 1 },
      { ingredientSlug: "greek-yogurt", quantity: 0.5 },
      { ingredientSlug: "hemp-seeds",   quantity: 1 },
    ],
  },
  {
    slug: "berry-oat-fuel",
    name: "Berry oat fuel smoothie",
    slot: "breakfast",
    description: "Oats turn this into a sustained-release breakfast. Drinkable bowl of oatmeal.",
    prepMinutes: 5,
    suitableFor: ["school", "training", "match"],
    kidRating: 4,
    // Generated to match this recipe's own ingredients, checked at card size. Stock
    // photo libraries had nothing honest for this dish.
    imageUrl: "/images/recipes/berry-oat-fuel.jpg",
    recipeSlug: "berry-oat-fuel",
    nutrition: { kcal: 365, proteinG: 16, carbsG: 62, fatG: 6, fiberG: 8, source: "USDA estimate" },
    ingredients: [
      { ingredientSlug: "mixed-berry",  quantity: 1 },
      { ingredientSlug: "banana",       quantity: 0.5 },
      { ingredientSlug: "oats",         quantity: 0.5 },
      { ingredientSlug: "milk",         quantity: 1 },
      { ingredientSlug: "peanut-butter", quantity: 1 },
      { ingredientSlug: "honey",        quantity: 1 },
    ],
  },
  {
    slug: "vanilla-protein-punch",
    name: "Vanilla cottage cheese smoothie",
    slot: "breakfast",
    description: "Cottage cheese is the secret weapon for protein without any powder. Blends totally smooth.",
    prepMinutes: 4,
    suitableFor: ["school", "training", "rest"],
    kidRating: 4,
    // Generated to match this recipe's own ingredients, checked at card size. Stock
    // photo libraries had nothing honest for this dish.
    imageUrl: "/images/recipes/vanilla-protein-punch.jpg",
    recipeSlug: "vanilla-protein-punch",
    nutrition: { kcal: 320, proteinG: 26, carbsG: 38, fatG: 5, fiberG: 3, source: "USDA estimate" },
    ingredients: [
      { ingredientSlug: "cottage-cheese", quantity: 0.5 },
      { ingredientSlug: "banana",         quantity: 1 },
      { ingredientSlug: "milk",           quantity: 1 },
      { ingredientSlug: "honey",          quantity: 1 },
      { ingredientSlug: "vanilla-extract", quantity: 0.5 },
    ],
  },
  {
    slug: "tropical-pre-game",
    name: "Tropical pre-game smoothie",
    slot: "snack",
    description: "Quick-digesting carbs from mango and pineapple. Coconut water replaces what sweat takes.",
    prepMinutes: 4,
    suitableFor: ["training", "match"],
    kidRating: 5,
    // Generated to match this recipe's own ingredients, checked at card size. Stock
    // photo libraries had nothing honest for this dish.
    imageUrl: "/images/recipes/tropical-pre-game.jpg",
    recipeSlug: "tropical-pre-game",
    nutrition: { kcal: 260, proteinG: 9, carbsG: 55, fatG: 1, fiberG: 4, source: "USDA estimate" },
    ingredients: [
      { ingredientSlug: "frozen-mango",     quantity: 1 },
      { ingredientSlug: "frozen-pineapple", quantity: 0.5 },
      { ingredientSlug: "banana",           quantity: 1 },
      { ingredientSlug: "coconut-water",    quantity: 1 },
      { ingredientSlug: "greek-yogurt",     quantity: 0.25 },
    ],
  },
  {
    slug: "chocolate-cherry-recovery",
    name: "Chocolate cherry recovery smoothie",
    slot: "snack",
    description: "Tart cherries reduce muscle soreness. Drink within 30 min of practice ending.",
    prepMinutes: 5,
    suitableFor: ["training", "match"],
    kidRating: 5,
    // Generated to match this recipe's own ingredients, checked at card size. Stock
    // photo libraries had nothing honest for this dish.
    imageUrl: "/images/recipes/chocolate-cherry-recovery.jpg",
    recipeSlug: "chocolate-cherry-recovery",
    nutrition: { kcal: 305, proteinG: 18, carbsG: 50, fatG: 4, fiberG: 6, source: "USDA estimate" },
    ingredients: [
      { ingredientSlug: "frozen-cherries", quantity: 1 },
      { ingredientSlug: "banana",          quantity: 1 },
      { ingredientSlug: "cocoa-powder",    quantity: 1 },
      { ingredientSlug: "almond-milk",     quantity: 1 },
      { ingredientSlug: "greek-yogurt",    quantity: 0.5 },
      { ingredientSlug: "honey",           quantity: 1 },
    ],
  },
  {
    slug: "yogurt-parfait",
    name: "Greek yogurt parfait",
    slot: "breakfast",
    description: "Layered yogurt + berries + honey. Looks fancy, takes 3 minutes.",
    prepMinutes: 3,
    suitableFor: ["school", "rest"],
    kidRating: 4,
    imageUrl: "/images/recipes/yogurt-parfait.jpg",
    recipeSlug: "yogurt-parfait",
    nutrition: { kcal: 305, proteinG: 18, carbsG: 48, fatG: 5, fiberG: 4, source: "USDA estimate" },
    ingredients: [
      { ingredientSlug: "greek-yogurt", quantity: 1 },
      { ingredientSlug: "blueberry",    quantity: 0.5 },
      { ingredientSlug: "strawberry",   quantity: 0.5 },
      { ingredientSlug: "honey",        quantity: 1 },
    ],
  },

  // LUNCH (hibachi-centric school week)
  {
    slug: "hibachi-chicken-bowl",
    name: "Hibachi chicken rice bowl",
    slot: "lunch",
    description: "Elvis's favorite school lunch. One Sunday cook = 5 reheats. Pack sauce separately.",
    prepMinutes: 5,
    suitableFor: ["school", "training", "rest"],
    kidRating: 5,
    // Generated to match this recipe's own ingredients, checked at card size. Stock
    // photo libraries had nothing honest for this dish.
    imageUrl: "/images/recipes/hibachi-chicken-bowl.jpg",
    recipeSlug: "hibachi-chicken",
    nutrition: { kcal: 465, proteinG: 35, carbsG: 55, fatG: 11, fiberG: 3, source: "USDA estimate" },
    ingredients: [
      // 0.25 lb per serving, matching the recipe's 2 lb across 8 servings. It was 0.4,
      // which over-bought the week's main protein by about 60% on every grocery list.
      { ingredientSlug: "chicken-breast", quantity: 0.25 },
      { ingredientSlug: "jasmine-rice",   quantity: 0.33 },
      { ingredientSlug: "broccoli",       quantity: 0.5 },
      { ingredientSlug: "carrot",         quantity: 0.25 },
      { ingredientSlug: "soy-sauce",      quantity: 1 },
      { ingredientSlug: "sesame-oil",     quantity: 0.5 },
      { ingredientSlug: "sesame-seeds",   quantity: 0.5 },
    ],
  },
  {
    slug: "turkey-wrap",
    name: "Turkey + cheese whole-grain wrap",
    slot: "lunch",
    description: "Quick, packable lunch with carrots on the side.",
    prepMinutes: 5,
    suitableFor: ["school", "rest"],
    kidRating: 4,
    // Generated to match this recipe's own ingredients, checked at card size. Stock
    // photo libraries had nothing honest for this dish.
    imageUrl: "/images/recipes/turkey-wrap.jpg",
    recipeSlug: "turkey-wrap",
    nutrition: { kcal: 365, proteinG: 24, carbsG: 35, fatG: 13, fiberG: 5, source: "USDA estimate" },
    ingredients: [
      { ingredientSlug: "wholegrain-tortilla", quantity: 1 },
      { ingredientSlug: "deli-turkey",         quantity: 3 },
      { ingredientSlug: "cheese-slice",        quantity: 1 },
      { ingredientSlug: "romaine",             quantity: 0.5 },
      { ingredientSlug: "carrot",              quantity: 0.5 },
      { ingredientSlug: "apple",               quantity: 1 },
    ],
  },
  {
    slug: "chicken-pasta-broccoli",
    name: "Pasta + grilled chicken + broccoli",
    slot: "lunch",
    description: "Solid carb + protein combo. Reheats well in a thermos.",
    prepMinutes: 15,
    suitableFor: ["school", "training"],
    kidRating: 4,
    // Generated to match this recipe's own ingredients, checked at card size. Stock
    // photo libraries had nothing honest for this dish.
    imageUrl: "/images/recipes/chicken-pasta-broccoli.jpg",
    recipeSlug: "chicken-pasta-broccoli",
    nutrition: { kcal: 485, proteinG: 35, carbsG: 60, fatG: 10, fiberG: 7, source: "USDA estimate" },
    ingredients: [
      { ingredientSlug: "pasta",          quantity: 3 },
      { ingredientSlug: "chicken-breast", quantity: 0.25 },
      { ingredientSlug: "broccoli",       quantity: 0.5 },
      { ingredientSlug: "olive-oil",      quantity: 1 },
      { ingredientSlug: "garlic",         quantity: 1 },
    ],
  },

  // Everyday snacks. The school and rest slots had exactly two options and one of them was
  // the cracker plate, which leans on the one thing the food rules push away from. These are
  // whole food, need no recipe, and survive a lunchbox.
  {
    slug: "apple-cheddar-cubes",
    name: "Apple slices + cheese",
    slot: "snack",
    description: "Crunch and protein without a cracker in sight. Squeeze of lemon stops browning.",
    prepMinutes: 3,
    suitableFor: [...ALL_DAYS],
    kidRating: 4,
    // Generated to match this recipe's own ingredients, checked at card size. Stock
    // photo libraries had nothing honest for this dish.
    imageUrl: "/images/recipes/apple-cheddar-cubes.jpg",
    nutrition: { kcal: 180, proteinG: 8, carbsG: 20, fatG: 8, fiberG: 3, source: "USDA estimate" },
    ingredients: [
      { ingredientSlug: "apple",        quantity: 1 },
      { ingredientSlug: "cheese-slice", quantity: 1 },
      { ingredientSlug: "lemon",        quantity: 0.1 },
    ],
  },
  {
    slug: "cottage-berries",
    name: "Cottage cheese + berries",
    slot: "snack",
    description: "High protein with no powder. Small curd and very cold is the version kids eat.",
    prepMinutes: 2,
    suitableFor: [...ALL_DAYS],
    kidRating: 3,
    // Generated to match this recipe's own ingredients, checked at card size. Stock
    // photo libraries had nothing honest for this dish.
    imageUrl: "/images/recipes/cottage-berries.jpg",
    nutrition: { kcal: 190, proteinG: 16, carbsG: 20, fatG: 4, fiberG: 2, source: "USDA estimate" },
    ingredients: [
      { ingredientSlug: "cottage-cheese", quantity: 0.75 },
      { ingredientSlug: "strawberry",     quantity: 0.5 },
      { ingredientSlug: "honey",          quantity: 1 },
    ],
  },
  {
    slug: "edamame-cup",
    name: "Steamed edamame cup",
    slot: "snack",
    description: "Whole soybeans in the pod, nothing processed. Salt lightly, eat warm or cold.",
    prepMinutes: 5,
    suitableFor: ["school", "training", "rest"],
    kidRating: 4,
    // Generated to match this recipe's own ingredients, checked at card size. Stock
    // photo libraries had nothing honest for this dish.
    imageUrl: "/images/recipes/edamame-cup.jpg",
    nutrition: { kcal: 150, proteinG: 13, carbsG: 12, fatG: 6, fiberG: 6, source: "USDA estimate" },
    ingredients: [{ ingredientSlug: "edamame", quantity: 1 }],
  },

  // Match-day lunches. Nothing in the catalog served the lunch slot on a match day, so the
  // picker had an empty recommended list on the one day that matters most. These are built
  // for eating 2 to 3 hours before kickoff: carbohydrate forward, lower fat and lower fiber
  // than the school-day versions so they clear the stomach in time, per NATA pre-activity
  // guidance. Deliberately plain. Match day is not the day to introduce a new food.
  {
    slug: "hibachi-bowl-matchday",
    name: "Match-day hibachi bowl (light sauce)",
    slot: "lunch",
    description:
      "His favorite meal, tuned for kickoff: less oil, no sesame, extra rice. Eat 2 to 3 hours before.",
    prepMinutes: 5,
    suitableFor: ["match", "training"],
    kidRating: 5,
    // Generated to match this recipe's own ingredients, checked at card size. Stock
    // photo libraries had nothing honest for this dish.
    imageUrl: "/images/recipes/hibachi-bowl-matchday.jpg",
    recipeSlug: "hibachi-chicken",
    nutrition: { kcal: 440, proteinG: 30, carbsG: 62, fatG: 6, fiberG: 2, source: "USDA estimate" },
    ingredients: [
      { ingredientSlug: "chicken-breast", quantity: 0.3 },
      { ingredientSlug: "jasmine-rice",   quantity: 0.42 },
      { ingredientSlug: "edamame",        quantity: 0.25 },
      { ingredientSlug: "soy-sauce",      quantity: 1 },
    ],
  },
  {
    slug: "pre-match-plain-plate",
    name: "Chicken + rice, plain",
    slot: "lunch",
    description:
      "The safety plate. Low fat, low fiber, nothing to surprise a nervous stomach before a match.",
    prepMinutes: 5,
    suitableFor: ["match"],
    kidRating: 4,
    // Generated to match this recipe's own ingredients, checked at card size. Stock
    // photo libraries had nothing honest for this dish.
    imageUrl: "/images/recipes/pre-match-plain-plate.jpg",
    recipeSlug: "chicken-rice-broccoli",
    nutrition: { kcal: 420, proteinG: 32, carbsG: 58, fatG: 5, fiberG: 2, source: "USDA estimate" },
    ingredients: [
      { ingredientSlug: "chicken-breast", quantity: 0.3 },
      { ingredientSlug: "jasmine-rice",   quantity: 0.42 },
      { ingredientSlug: "banana",         quantity: 1 },
    ],
  },
  {
    slug: "tournament-sub",
    name: "Tournament turkey sub",
    slot: "lunch",
    description:
      "Built for a sideline, not a table. Wraps tight, keeps on ice, eats one-handed between games.",
    prepMinutes: 6,
    suitableFor: ["match", "school"],
    kidRating: 5,
    // Generated to match this recipe's own ingredients, checked at card size. Stock
    // photo libraries had nothing honest for this dish.
    imageUrl: "/images/recipes/tournament-sub.jpg",
    recipeSlug: "turkey-wrap",
    nutrition: { kcal: 410, proteinG: 26, carbsG: 52, fatG: 9, fiberG: 4, source: "USDA estimate" },
    ingredients: [
      { ingredientSlug: "wholegrain-bread", quantity: 2 },
      { ingredientSlug: "deli-turkey",      quantity: 3 },
      { ingredientSlug: "cheese-slice",     quantity: 1 },
      { ingredientSlug: "romaine",          quantity: 0.5 },
    ],
  },

  // SNACK
  {
    slug: "apple-pb",
    name: "Apple + peanut butter",
    slot: "snack",
    description: "Classic combo. Natural sugar + protein + fat.",
    prepMinutes: 2,
    suitableFor: [...ALL_DAYS],
    kidRating: 5,
    // Generated to match this recipe's own ingredients, checked at card size. Stock
    // photo libraries had nothing honest for this dish.
    imageUrl: "/images/recipes/apple-pb.jpg",
    recipeSlug: "apple-pb",
    nutrition: { kcal: 285, proteinG: 8, carbsG: 32, fatG: 16, fiberG: 6, source: "USDA estimate" },
    ingredients: [
      { ingredientSlug: "apple",        quantity: 1 },
      { ingredientSlug: "peanut-butter", quantity: 2 },
      // The recipe tells you to squeeze lemon over the slices so they do not brown in the bag.
      // A quarter of a lemon per snack, so the list buys one when the week uses this a few times.
      { ingredientSlug: "lemon",        quantity: 0.25 },
    ],
  },
  {
    slug: "cheese-crackers",
    name: "String cheese + whole-grain crackers",
    slot: "snack",
    description: "Easy soccer-bag snack. Doesn't melt as fast as you'd think.",
    prepMinutes: 1,
    suitableFor: [...ALL_DAYS],
    kidRating: 4,
    // Generated to match this recipe's own ingredients, checked at card size. Stock
    // photo libraries had nothing honest for this dish.
    imageUrl: "/images/recipes/cheese-crackers.jpg",
    recipeSlug: "cheese-crackers",
    nutrition: { kcal: 245, proteinG: 15, carbsG: 22, fatG: 11, fiberG: 3, source: "USDA estimate" },
    ingredients: [
      { ingredientSlug: "cheese-stick", quantity: 2 },
      { ingredientSlug: "crackers-wg",  quantity: 1 },
    ],
  },
  {
    slug: "yogurt-honey-berries",
    name: "Greek yogurt + honey + berries",
    slot: "snack",
    description: "Recovery snack. Protein + carbs within 30 min post-practice.",
    prepMinutes: 2,
    suitableFor: ["training", "match"],
    kidRating: 4,
    imageUrl: "/images/recipes/yogurt-honey-berries.jpg",
    recipeSlug: "yogurt-honey-berries",
    nutrition: { kcal: 245, proteinG: 17, carbsG: 42, fatG: 2, fiberG: 3, source: "USDA estimate" },
    ingredients: [
      { ingredientSlug: "greek-yogurt", quantity: 1 },
      { ingredientSlug: "blueberry",    quantity: 0.5 },
      { ingredientSlug: "honey",        quantity: 1 },
    ],
  },
  {
    slug: "banana-almonds",
    name: "Banana + handful of almonds",
    slot: "snack",
    description: "Quick energy + slow-release fat. Pre-practice winner.",
    prepMinutes: 1,
    suitableFor: ["training", "match"],
    kidRating: 4,
    // Generated to match this recipe's own ingredients, checked at card size. Stock
    // photo libraries had nothing honest for this dish.
    imageUrl: "/images/recipes/banana-almonds.jpg",
    recipeSlug: "banana-almonds",
    nutrition: { kcal: 275, proteinG: 8, carbsG: 32, fatG: 15, fiberG: 6, source: "USDA estimate" },
    ingredients: [
      { ingredientSlug: "banana",  quantity: 1 },
      { ingredientSlug: "almonds", quantity: 0.25 },
    ],
  },

  // DINNER
  {
    slug: "chicken-rice-broccoli",
    name: "Grilled chicken + jasmine rice + broccoli",
    slot: "dinner",
    description: "The workhorse dinner. Boring on paper, perfect for athletes.",
    prepMinutes: 25,
    suitableFor: [...ALL_DAYS],
    kidRating: 4,
    // Generated to match this recipe's own ingredients, checked at card size. Stock
    // photo libraries had nothing honest for this dish.
    imageUrl: "/images/recipes/chicken-rice-broccoli.jpg",
    recipeSlug: "chicken-rice-broccoli",
    nutrition: { kcal: 520, proteinG: 38, carbsG: 65, fatG: 9, fiberG: 5, source: "USDA estimate" },
    ingredients: [
      { ingredientSlug: "chicken-breast", quantity: 0.375 },
      { ingredientSlug: "jasmine-rice",   quantity: 0.375 },
      { ingredientSlug: "broccoli",       quantity: 1 },
      { ingredientSlug: "olive-oil",      quantity: 1 },
      { ingredientSlug: "garlic",         quantity: 1 },
    ],
  },
  {
    slug: "salmon-sweet-potato",
    name: "Salmon + sweet potato + green beans",
    slot: "dinner",
    description: "Omega-3 for recovery + complex carbs. Best as a rest-day dinner.",
    prepMinutes: 30,
    suitableFor: ["rest", "school"],
    kidRating: 3,
    // Generated to match this recipe's own ingredients, checked at card size. Stock
    // photo libraries had nothing honest for this dish.
    imageUrl: "/images/recipes/salmon-sweet-potato.jpg",
    recipeSlug: "salmon-sweet-potato",
    nutrition: { kcal: 525, proteinG: 35, carbsG: 50, fatG: 18, fiberG: 8, source: "USDA estimate" },
    ingredients: [
      { ingredientSlug: "salmon",       quantity: 0.375 },
      { ingredientSlug: "sweet-potato", quantity: 0.5 },
      { ingredientSlug: "green-beans",  quantity: 1 },
      { ingredientSlug: "olive-oil",    quantity: 1 },
      { ingredientSlug: "lemon",        quantity: 0.25 },
    ],
  },
  {
    slug: "turkey-tacos",
    name: "Turkey tacos on whole-grain tortillas",
    slot: "dinner",
    description: "Kid favorite. Build-your-own bar means less complaining.",
    prepMinutes: 20,
    suitableFor: ["school", "rest"],
    kidRating: 5,
    // Generated to match this recipe's own ingredients, checked at card size. Stock
    // photo libraries had nothing honest for this dish.
    imageUrl: "/images/recipes/turkey-tacos.jpg",
    recipeSlug: "turkey-tacos",
    nutrition: { kcal: 485, proteinG: 30, carbsG: 48, fatG: 17, fiberG: 8, source: "USDA estimate" },
    ingredients: [
      { ingredientSlug: "ground-turkey",       quantity: 0.25 },
      { ingredientSlug: "wholegrain-tortilla", quantity: 3 },
      { ingredientSlug: "taco-seasoning",      quantity: 1 },
      { ingredientSlug: "romaine",             quantity: 1 },
      { ingredientSlug: "cheese-slice",        quantity: 1 },
      { ingredientSlug: "lime",                quantity: 0.5 },
    ],
  },
  {
    slug: "pasta-marinara",
    name: "Pasta + turkey marinara + side salad",
    slot: "dinner",
    description: "Carb-load night before a match. The classic pre-game dinner.",
    prepMinutes: 25,
    suitableFor: ["training", "match"],
    kidRating: 5,
    imageUrl: "/images/recipes/pasta-marinara.jpg",
    recipeSlug: "pasta-marinara",
    nutrition: { kcal: 585, proteinG: 32, carbsG: 80, fatG: 14, fiberG: 9, source: "USDA estimate" },
    ingredients: [
      { ingredientSlug: "pasta",         quantity: 4 },
      { ingredientSlug: "ground-turkey", quantity: 0.25 },
      { ingredientSlug: "marinara",      quantity: 0.5 },
      { ingredientSlug: "romaine",       quantity: 1 },
      { ingredientSlug: "olive-oil",     quantity: 1 },
    ],
  },
  {
    slug: "stirfry-chicken-rice",
    name: "Stir-fry chicken + rice + edamame",
    slot: "dinner",
    description: "Same hibachi technique, dinner-portioned. Family-style cook.",
    prepMinutes: 20,
    suitableFor: ["school", "rest", "training"],
    kidRating: 4,
    imageUrl: "/images/recipes/stirfry-chicken-rice.jpg",
    recipeSlug: "stirfry-chicken-rice",
    nutrition: { kcal: 510, proteinG: 38, carbsG: 60, fatG: 10, fiberG: 5, source: "USDA estimate" },
    ingredients: [
      { ingredientSlug: "chicken-breast", quantity: 0.375 },
      { ingredientSlug: "jasmine-rice",   quantity: 0.375 },
      { ingredientSlug: "edamame",        quantity: 0.5 },
      { ingredientSlug: "soy-sauce",      quantity: 1 },
      { ingredientSlug: "sesame-oil",     quantity: 0.5 },
      { ingredientSlug: "garlic",         quantity: 2 },
    ],
  },
  {
    slug: "chicken-quesadilla",
    name: "Chicken quesadilla + peppers",
    slot: "lunch",
    description:
      "Ten minutes on the stove using whatever chicken is already cooked. Cut cold into strips it packs for the next day.",
    prepMinutes: 10,
    suitableFor: ["school", "training", "rest"],
    kidRating: 5,
    // Generated to match this recipe's own ingredients, checked at card size. Stock
    // photo libraries had nothing honest for this dish.
    imageUrl: "/images/recipes/chicken-quesadilla.jpg",
    recipeSlug: "chicken-quesadilla",
    nutrition: { kcal: 470, proteinG: 38, carbsG: 38, fatG: 18, fiberG: 6, source: "USDA estimate" },
    ingredients: [
      { ingredientSlug: "wholegrain-tortilla", quantity: 1 },
      { ingredientSlug: "chicken-breast",      quantity: 0.25 },
      { ingredientSlug: "cheese-slice",        quantity: 1 },
      { ingredientSlug: "bell-pepper",         quantity: 0.5 },
    ],
    tags: ["leftovers", "fast"],
  },
  {
    slug: "cold-pasta-salad-chicken",
    name: "Cold pasta salad with chicken",
    slot: "lunch",
    description:
      "The lunch for a school with no microwave. Built to be eaten cold rather than tolerated cold. One Sunday session makes four.",
    prepMinutes: 20,
    suitableFor: ["school", "training", "rest"],
    kidRating: 4,
    // Generated to match this recipe's own ingredients, checked at card size. Stock
    // photo libraries had nothing honest for this dish.
    imageUrl: "/images/recipes/cold-pasta-salad-chicken.jpg",
    recipeSlug: "cold-pasta-salad-chicken",
    nutrition: { kcal: 520, proteinG: 36, carbsG: 58, fatG: 15, fiberG: 8, source: "USDA estimate" },
    ingredients: [
      { ingredientSlug: "pasta",          quantity: 4 },
      { ingredientSlug: "chicken-breast", quantity: 0.25 },
      { ingredientSlug: "broccoli",       quantity: 0.5 },
      { ingredientSlug: "olive-oil",      quantity: 0.5 },
      { ingredientSlug: "lemon",          quantity: 0.25 },
    ],
    tags: ["make-ahead", "no-microwave"],
  },
  {
    slug: "egg-cheese-burrito",
    name: "Egg + cheese burrito",
    slot: "lunch",
    description:
      "Breakfast food at lunchtime, which is the only way some kids eat lunch. Wrap four, freeze three, and a frozen one is its own ice pack.",
    prepMinutes: 15,
    suitableFor: ["school", "training", "rest"],
    kidRating: 5,
    // Generated to match this recipe's own ingredients, checked at card size. Stock
    // photo libraries had nothing honest for this dish.
    imageUrl: "/images/recipes/egg-cheese-burrito.jpg",
    recipeSlug: "egg-cheese-burrito",
    nutrition: { kcal: 415, proteinG: 24, carbsG: 32, fatG: 20, fiberG: 5, source: "USDA estimate" },
    ingredients: [
      { ingredientSlug: "eggs",                quantity: 2 },
      { ingredientSlug: "wholegrain-tortilla", quantity: 1 },
      { ingredientSlug: "cheese-slice",        quantity: 1 },
      { ingredientSlug: "spinach",             quantity: 0.5 },
    ],
    tags: ["make-ahead", "freezer"],
  },
  {
    slug: "sheetpan-chicken-sweet-potato",
    name: "Sheet-pan chicken + sweet potato + green beans",
    slot: "dinner",
    description:
      "One pan in, one pan out, one pan washed. The sweet potato gets a 15 minute head start, which is the whole trick.",
    prepMinutes: 35,
    suitableFor: ["school", "training", "rest"],
    kidRating: 4,
    // Generated to match this recipe's own ingredients, checked at card size. Stock
    // photo libraries had nothing honest for this dish.
    imageUrl: "/images/recipes/sheetpan-chicken-sweet-potato.jpg",
    recipeSlug: "sheetpan-chicken-sweet-potato",
    nutrition: { kcal: 465, proteinG: 42, carbsG: 38, fatG: 14, fiberG: 7, source: "USDA estimate" },
    ingredients: [
      { ingredientSlug: "chicken-breast", quantity: 0.375 },
      { ingredientSlug: "sweet-potato",   quantity: 0.5 },
      { ingredientSlug: "green-beans",    quantity: 0.5 },
      { ingredientSlug: "olive-oil",      quantity: 0.25 },
      { ingredientSlug: "lemon",          quantity: 0.125 },
    ],
    tags: ["one-pan", "make-ahead"],
  },
  {
    slug: "turkey-meatballs-pasta",
    name: "Turkey meatballs + marinara + pasta",
    slot: "dinner",
    description:
      "The dinner nobody argues about. Make a double batch and freeze half raw for a night with no time.",
    prepMinutes: 30,
    suitableFor: ["school", "training", "match", "rest"],
    kidRating: 5,
    // Generated to match this recipe's own ingredients, checked at card size. Stock
    // photo libraries had nothing honest for this dish.
    imageUrl: "/images/recipes/turkey-meatballs-pasta.jpg",
    recipeSlug: "turkey-meatballs-pasta",
    nutrition: { kcal: 545, proteinG: 38, carbsG: 62, fatG: 15, fiberG: 9, source: "USDA estimate" },
    ingredients: [
      { ingredientSlug: "ground-turkey", quantity: 0.25 },
      { ingredientSlug: "pasta",         quantity: 4 },
      { ingredientSlug: "marinara",      quantity: 0.5 },
      { ingredientSlug: "eggs",          quantity: 0.25 },
      { ingredientSlug: "garlic",        quantity: 0.5 },
    ],
    tags: ["freezer", "make-ahead"],
  },
  {
    slug: "chicken-parm-bake",
    name: "Baked chicken parm + pasta",
    slot: "dinner",
    description:
      "Baked, not breaded and fried. Feels like a treat, is mostly protein. The best post-match dinner here.",
    prepMinutes: 30,
    suitableFor: ["school", "training", "match", "rest"],
    kidRating: 5,
    // Generated to match this recipe's own ingredients, checked at card size. Stock
    // photo libraries had nothing honest for this dish.
    imageUrl: "/images/recipes/chicken-parm-bake.jpg",
    recipeSlug: "chicken-parm-bake",
    nutrition: { kcal: 580, proteinG: 48, carbsG: 55, fatG: 17, fiberG: 8, source: "USDA estimate" },
    ingredients: [
      { ingredientSlug: "chicken-breast", quantity: 0.375 },
      { ingredientSlug: "marinara",       quantity: 0.5 },
      { ingredientSlug: "cheese-slice",   quantity: 1 },
      { ingredientSlug: "pasta",          quantity: 4 },
    ],
    tags: ["post-match"],
  },
  {
    slug: "chicken-egg-fried-rice",
    name: "Chicken egg fried rice",
    slot: "dinner",
    description:
      "Fifteen minutes, built around yesterday's rice and Sunday's chicken. Cold rice only, fresh will not fry.",
    prepMinutes: 15,
    suitableFor: ["school", "training", "rest"],
    kidRating: 5,
    // Generated to match this recipe's own ingredients, checked at card size. Stock
    // photo libraries had nothing honest for this dish.
    imageUrl: "/images/recipes/chicken-egg-fried-rice.jpg",
    recipeSlug: "chicken-egg-fried-rice",
    nutrition: { kcal: 490, proteinG: 34, carbsG: 58, fatG: 13, fiberG: 4, source: "USDA estimate" },
    ingredients: [
      { ingredientSlug: "jasmine-rice",   quantity: 0.33 },
      { ingredientSlug: "chicken-breast", quantity: 0.1875 },
      { ingredientSlug: "eggs",           quantity: 0.75 },
      { ingredientSlug: "carrot",         quantity: 0.125 },
      { ingredientSlug: "edamame",        quantity: 0.125 },
      { ingredientSlug: "soy-sauce",      quantity: 0.5 },
      { ingredientSlug: "sesame-oil",     quantity: 0.25 },
    ],
    tags: ["leftovers", "fast"],
  },
  {
    slug: "turkey-burgers-sweet-potato",
    name: "Turkey burgers + sweet potato wedges",
    slot: "dinner",
    description:
      "Friday night before a Saturday match. Feels like takeaway, is not. Thumbprint the patties or you get meatballs.",
    prepMinutes: 30,
    suitableFor: ["school", "training", "match", "rest"],
    kidRating: 5,
    // Generated to match this recipe's own ingredients, checked at card size. Stock
    // photo libraries had nothing honest for this dish.
    imageUrl: "/images/recipes/turkey-burgers-sweet-potato.jpg",
    recipeSlug: "turkey-burgers-sweet-potato",
    nutrition: { kcal: 555, proteinG: 36, carbsG: 48, fatG: 22, fiberG: 7, source: "USDA estimate" },
    ingredients: [
      { ingredientSlug: "ground-turkey",  quantity: 0.25 },
      { ingredientSlug: "wholegrain-bun", quantity: 1 },
      { ingredientSlug: "sweet-potato",   quantity: 0.5 },
      { ingredientSlug: "cheese-slice",   quantity: 1 },
      { ingredientSlug: "romaine",        quantity: 0.25 },
      { ingredientSlug: "olive-oil",      quantity: 0.25 },
    ],
    tags: ["freezer", "pre-match"],
  },
  {
    slug: "pb-banana-toast",
    name: "Peanut butter banana toast",
    slot: "breakfast",
    description: "Four minutes, one plate, no pan. The breakfast for a kid who is not awake yet.",
    prepMinutes: 4,
    // Generated to match this recipe's own ingredients, checked at card size. Stock
    // photo libraries had nothing honest for this dish.
    imageUrl: "/images/recipes/pb-banana-toast.jpg",
    suitableFor: ["school", "training", "match", "rest"],
    kidRating: 5,
    recipeSlug: "pb-banana-toast",
    nutrition: { kcal: 400, proteinG: 14, carbsG: 52, fatG: 16, fiberG: 7, source: "USDA estimate" },
    ingredients: [
      { ingredientSlug: "wholegrain-bread", quantity: 2 },
      { ingredientSlug: "peanut-butter",    quantity: 2 },
      { ingredientSlug: "banana",           quantity: 1 },
    ],
    tags: ["fast", "pre-workout"],
  },
  {
    slug: "cottage-cheese-toast",
    name: "Cottage cheese toast + tomato",
    slot: "breakfast",
    description: "More protein than two eggs with no pan to wash. Season it or it tastes like nothing.",
    prepMinutes: 5,
    // Generated to match this recipe's own ingredients, checked at card size. Stock
    // photo libraries had nothing honest for this dish.
    imageUrl: "/images/recipes/cottage-cheese-toast.jpg",
    suitableFor: ["school", "training", "rest"],
    kidRating: 3,
    recipeSlug: "cottage-cheese-toast",
    nutrition: { kcal: 340, proteinG: 25, carbsG: 38, fatG: 8, fiberG: 6, source: "USDA estimate" },
    ingredients: [
      { ingredientSlug: "wholegrain-bread", quantity: 2 },
      { ingredientSlug: "cottage-cheese",   quantity: 0.5 },
      { ingredientSlug: "tomato",           quantity: 0.5 },
    ],
    tags: ["high-protein"],
  },
  {
    slug: "banana-oat-pancakes",
    name: "Two-ingredient banana oat pancakes",
    slot: "breakfast",
    description: "No flour, no added sugar. Freeze a stack and they go straight in the toaster.",
    prepMinutes: 15,
    // Generated to match this recipe's own ingredients, checked at card size. Stock
    // photo libraries had nothing honest for this dish.
    imageUrl: "/images/recipes/banana-oat-pancakes.jpg",
    suitableFor: ["school", "training", "match", "rest"],
    kidRating: 5,
    recipeSlug: "banana-oat-pancakes",
    nutrition: { kcal: 385, proteinG: 16, carbsG: 58, fatG: 10, fiberG: 7, source: "USDA estimate" },
    ingredients: [
      { ingredientSlug: "oats",   quantity: 0.5 },
      { ingredientSlug: "banana", quantity: 1 },
      { ingredientSlug: "eggs",   quantity: 1 },
      { ingredientSlug: "milk",   quantity: 0.25 },
    ],
    tags: ["freezer", "make-ahead"],
  },
  {
    slug: "smoothie-freezer-packs",
    name: "Freezer smoothie packs",
    slot: "breakfast",
    description: "Fifteen minutes on Sunday turns five weekday breakfasts into ninety seconds each.",
    prepMinutes: 15,
    // Generated to match this recipe's own ingredients, checked at card size. Stock
    // photo libraries had nothing honest for this dish.
    imageUrl: "/images/recipes/smoothie-freezer-packs.jpg",
    suitableFor: ["school", "training", "match", "rest"],
    kidRating: 4,
    recipeSlug: "smoothie-freezer-packs",
    nutrition: { kcal: 330, proteinG: 16, carbsG: 52, fatG: 6, fiberG: 7, source: "USDA estimate" },
    ingredients: [
      { ingredientSlug: "banana",       quantity: 0.5 },
      { ingredientSlug: "mixed-berry",  quantity: 1 },
      { ingredientSlug: "spinach",      quantity: 1 },
      { ingredientSlug: "milk",         quantity: 1 },
      { ingredientSlug: "greek-yogurt", quantity: 0.5 },
      { ingredientSlug: "chia-seeds",   quantity: 1 },
    ],
    tags: ["make-ahead", "freezer"],
  },
  {
    slug: "overnight-oats-chocolate",
    name: "Chocolate overnight oats",
    slot: "breakfast",
    description: "For the kid who says he does not like oats. Cold, chocolate, nothing like porridge.",
    prepMinutes: 5,
    // Generated to match this recipe's own ingredients, checked at card size. Stock
    // photo libraries had nothing honest for this dish.
    imageUrl: "/images/recipes/overnight-oats-chocolate.jpg",
    suitableFor: ["school", "training", "match", "rest"],
    kidRating: 5,
    recipeSlug: "overnight-oats-chocolate",
    nutrition: { kcal: 425, proteinG: 16, carbsG: 66, fatG: 11, fiberG: 10, source: "USDA estimate" },
    ingredients: [
      { ingredientSlug: "oats",          quantity: 0.5 },
      { ingredientSlug: "milk",          quantity: 1 },
      { ingredientSlug: "greek-yogurt",  quantity: 0.25 },
      { ingredientSlug: "cocoa-powder",  quantity: 1 },
      { ingredientSlug: "honey",         quantity: 1 },
      { ingredientSlug: "chia-seeds",    quantity: 1 },
      { ingredientSlug: "banana",        quantity: 0.5 },
    ],
    tags: ["make-ahead"],
  },
  {
    slug: "yogurt-bark",
    name: "Frozen yogurt bark",
    slot: "snack",
    description: "The snack that competes with ice cream, and it is yogurt and fruit. Made once, eaten all week.",
    prepMinutes: 10,
    suitableFor: ["school", "training", "match", "rest"],
    kidRating: 5,
    imageUrl: "/images/recipes/yogurt-bark.jpg",
    recipeSlug: "yogurt-bark",
    nutrition: { kcal: 120, proteinG: 8, carbsG: 18, fatG: 2, fiberG: 2, source: "USDA estimate" },
    ingredients: [
      { ingredientSlug: "greek-yogurt", quantity: 0.33 },
      { ingredientSlug: "mixed-berry",  quantity: 0.25 },
      { ingredientSlug: "honey",        quantity: 0.33 },
    ],
    tags: ["make-ahead", "freezer"],
  },
  {
    slug: "trail-mix-jar",
    name: "Make your own trail mix",
    slot: "snack",
    description: "Made once a month, portioned immediately. The tub is nutritionally fine and portionally a disaster.",
    prepMinutes: 5,
    suitableFor: ["school", "training", "match", "rest"],
    kidRating: 5,
    imageUrl: "/images/recipes/trail-mix-jar.jpg",
    recipeSlug: "trail-mix-jar",
    nutrition: { kcal: 205, proteinG: 6, carbsG: 20, fatG: 12, fiberG: 3, source: "USDA estimate" },
    ingredients: [
      { ingredientSlug: "almonds",     quantity: 0.25 },
      { ingredientSlug: "raisins",     quantity: 0.25 },
      { ingredientSlug: "choc-chips",  quantity: 0.125 },
    ],
    tags: ["make-ahead"],
  },
  {
    slug: "hummus-veg-cup",
    name: "Hummus + veg sticks",
    slot: "snack",
    description: "The one that puts a vegetable into a day that had none. Dip stays in its own compartment.",
    prepMinutes: 4,
    suitableFor: ["school", "training", "rest"],
    kidRating: 3,
    imageUrl: "/images/recipes/hummus-veg-cup.jpg",
    recipeSlug: "hummus-veg-cup",
    nutrition: { kcal: 175, proteinG: 6, carbsG: 20, fatG: 8, fiberG: 5, source: "USDA estimate" },
    ingredients: [
      { ingredientSlug: "hummus",      quantity: 0.25 },
      { ingredientSlug: "carrot",      quantity: 0.5 },
      { ingredientSlug: "bell-pepper", quantity: 0.5 },
    ],
    tags: ["vegetables"],
  },
  {
    slug: "boiled-eggs-batch",
    name: "Boiled eggs",
    slot: "snack",
    description: "Sunday job, six snacks. Into boiling water, not cold, or they will not peel.",
    prepMinutes: 15,
    suitableFor: ["school", "training", "match", "rest"],
    kidRating: 4,
    imageUrl: "/images/recipes/boiled-eggs-batch.jpg",
    recipeSlug: "boiled-eggs-batch",
    nutrition: { kcal: 140, proteinG: 12, carbsG: 1, fatG: 10, fiberG: 0, source: "USDA estimate" },
    ingredients: [
      { ingredientSlug: "eggs", quantity: 2 },
    ],
    tags: ["make-ahead", "high-protein"],
  },
  {
    slug: "apple-nachos",
    name: "Apple nachos",
    slot: "snack",
    description: "The same apple and peanut butter, arranged so it gets eaten. That is the whole trick.",
    prepMinutes: 5,
    suitableFor: ["school", "training", "rest"],
    kidRating: 5,
    // Generated to match this recipe's own ingredient list, checked at card size and
    // again zoomed in. Stock libraries had nothing honest for this one.
    imageUrl: "/images/recipes/apple-nachos.jpg",
    recipeSlug: "apple-nachos",
    nutrition: { kcal: 340, proteinG: 12, carbsG: 40, fatG: 17, fiberG: 6, source: "USDA estimate" },
    ingredients: [
      { ingredientSlug: "apple",         quantity: 1 },
      { ingredientSlug: "peanut-butter", quantity: 2 },
      { ingredientSlug: "granola",       quantity: 0.125 },
      { ingredientSlug: "choc-chips",    quantity: 0.0625 },
    ],
    tags: ["fast"],
  },
  {
    slug: "slow-cooker-chicken-rice-soup",
    name: "Slow cooker chicken and rice soup",
    slot: "dinner",
    description: "Twenty minutes in the morning, dinner ready when you get back from a 7pm practice. Rice goes in last.",
    prepMinutes: 20,
    // Generated to match this recipe's own ingredients, checked at card size. Stock
    // photo libraries had nothing honest for this dish.
    imageUrl: "/images/recipes/slow-cooker-chicken-rice-soup.jpg",
    suitableFor: ["school", "training", "rest"],
    kidRating: 4,
    recipeSlug: "slow-cooker-chicken-rice-soup",
    nutrition: { kcal: 385, proteinG: 32, carbsG: 42, fatG: 8, fiberG: 3, source: "USDA estimate" },
    ingredients: [
      { ingredientSlug: "chicken-breast", quantity: 0.25 },
      { ingredientSlug: "jasmine-rice",   quantity: 0.17 },
      { ingredientSlug: "chicken-stock",  quantity: 1.33 },
      { ingredientSlug: "carrot",         quantity: 0.33 },
      { ingredientSlug: "garlic",         quantity: 0.33 },
    ],
    tags: ["make-ahead", "freezer"],
  },
  {
    slug: "baked-salmon-rice-broccoli",
    name: "Baked salmon + rice + broccoli",
    slot: "dinner",
    description: "Twelve minutes at 400F. Take it out while the centre still looks slightly translucent.",
    prepMinutes: 25,
    // Generated to match this recipe's own ingredients, checked at card size. Stock
    // photo libraries had nothing honest for this dish.
    imageUrl: "/images/recipes/baked-salmon-rice-broccoli.jpg",
    suitableFor: ["school", "training", "match", "rest"],
    kidRating: 3,
    recipeSlug: "baked-salmon-rice-broccoli",
    nutrition: { kcal: 510, proteinG: 40, carbsG: 48, fatG: 16, fiberG: 5, source: "USDA estimate" },
    ingredients: [
      { ingredientSlug: "salmon",       quantity: 0.375 },
      { ingredientSlug: "jasmine-rice", quantity: 0.375 },
      { ingredientSlug: "broccoli",     quantity: 1 },
      { ingredientSlug: "olive-oil",    quantity: 0.25 },
      { ingredientSlug: "lemon",        quantity: 0.125 },
    ],
    tags: ["omega-3"],
  },
  {
    slug: "beef-veg-stirfry",
    name: "Beef and vegetable stir-fry",
    slot: "dinner",
    description: "Iron in twenty minutes. Slice the beef across the grain or nothing else you do matters.",
    prepMinutes: 20,
    // Generated to match this recipe's own ingredients, checked at card size. Stock
    // photo libraries had nothing honest for this dish.
    imageUrl: "/images/recipes/beef-veg-stirfry.jpg",
    suitableFor: ["school", "training", "rest"],
    kidRating: 4,
    recipeSlug: "beef-veg-stirfry",
    nutrition: { kcal: 465, proteinG: 36, carbsG: 38, fatG: 18, fiberG: 5, source: "USDA estimate" },
    ingredients: [
      { ingredientSlug: "beef-strips",  quantity: 0.25 },
      { ingredientSlug: "jasmine-rice", quantity: 0.33 },
      { ingredientSlug: "broccoli",     quantity: 0.5 },
      { ingredientSlug: "bell-pepper",  quantity: 0.25 },
      { ingredientSlug: "soy-sauce",    quantity: 0.5 },
      { ingredientSlug: "sesame-oil",   quantity: 0.25 },
      { ingredientSlug: "garlic",       quantity: 0.5 },
    ],
    tags: ["iron", "fast"],
  },
  {
    slug: "chicken-fajita-bowls",
    name: "Chicken fajita bowls",
    slot: "dinner",
    description: "Everyone builds their own, which is the most reliable way to get vegetables into a picky eater.",
    prepMinutes: 25,
    // Generated to match this recipe's own ingredients, checked at card size. Stock
    // photo libraries had nothing honest for this dish.
    imageUrl: "/images/recipes/chicken-fajita-bowls.jpg",
    suitableFor: ["school", "training", "match", "rest"],
    kidRating: 5,
    recipeSlug: "chicken-fajita-bowls",
    nutrition: { kcal: 520, proteinG: 42, carbsG: 50, fatG: 14, fiberG: 6, source: "USDA estimate" },
    ingredients: [
      { ingredientSlug: "chicken-breast", quantity: 0.375 },
      { ingredientSlug: "bell-pepper",    quantity: 0.5 },
      { ingredientSlug: "jasmine-rice",   quantity: 0.33 },
      { ingredientSlug: "cheese-slice",   quantity: 1 },
      { ingredientSlug: "romaine",        quantity: 0.5 },
      { ingredientSlug: "lime",           quantity: 0.25 },
      { ingredientSlug: "taco-seasoning", quantity: 0.5 },
    ],
    tags: ["build-your-own", "leftovers"],
  },
  {
    slug: "tuna-pasta-bake",
    name: "Tuna pasta bake",
    slot: "dinner",
    description: "Store-cupboard dinner for the night nobody shopped. Drain the tuna properly or it goes watery.",
    prepMinutes: 30,
    // Generated to match this recipe's own ingredients, checked at card size. Stock
    // photo libraries had nothing honest for this dish.
    imageUrl: "/images/recipes/tuna-pasta-bake.jpg",
    suitableFor: ["school", "training", "rest"],
    kidRating: 4,
    recipeSlug: "tuna-pasta-bake",
    nutrition: { kcal: 545, proteinG: 38, carbsG: 66, fatG: 13, fiberG: 9, source: "USDA estimate" },
    ingredients: [
      { ingredientSlug: "pasta",        quantity: 4 },
      { ingredientSlug: "tuna-canned",  quantity: 0.5 },
      { ingredientSlug: "marinara",     quantity: 0.5 },
      { ingredientSlug: "broccoli",     quantity: 0.5 },
      { ingredientSlug: "cheese-slice", quantity: 1 },
    ],
    tags: ["freezer", "budget"],
  },
  {
    slug: "rice-bowl-leftovers",
    name: "Any-leftovers rice bowl",
    slot: "lunch",
    description: "A method rather than a recipe. Rice, a protein, a vegetable, sauce on the side.",
    prepMinutes: 5,
    // Generated to match this recipe's own ingredients, checked at card size. Stock
    // photo libraries had nothing honest for this dish.
    imageUrl: "/images/recipes/rice-bowl-leftovers.jpg",
    suitableFor: ["school", "training", "rest"],
    kidRating: 4,
    recipeSlug: "rice-bowl-leftovers",
    nutrition: { kcal: 455, proteinG: 34, carbsG: 52, fatG: 10, fiberG: 4, source: "USDA estimate" },
    ingredients: [
      { ingredientSlug: "jasmine-rice",   quantity: 0.33 },
      { ingredientSlug: "chicken-breast", quantity: 0.25 },
      { ingredientSlug: "broccoli",       quantity: 0.5 },
      { ingredientSlug: "soy-sauce",      quantity: 1 },
    ],
    tags: ["leftovers", "fast"],
  },
  {
    slug: "chicken-salad-pita",
    name: "Greek yogurt chicken salad pita",
    slot: "lunch",
    description: "Yogurt instead of a jar of mayonnaise, which adds about 10 g of protein and loses the fat.",
    prepMinutes: 10,
    // Generated to match this recipe's own ingredients, checked at card size. Stock
    // photo libraries had nothing honest for this dish.
    imageUrl: "/images/recipes/chicken-salad-pita.jpg",
    suitableFor: ["school", "training", "rest"],
    kidRating: 4,
    recipeSlug: "chicken-salad-pita",
    nutrition: { kcal: 435, proteinG: 34, carbsG: 44, fatG: 14, fiberG: 6, source: "USDA estimate" },
    ingredients: [
      { ingredientSlug: "chicken-breast", quantity: 0.1875 },
      { ingredientSlug: "greek-yogurt",   quantity: 0.125 },
      { ingredientSlug: "pita-wg",        quantity: 1 },
      { ingredientSlug: "celery",         quantity: 0.125 },
      { ingredientSlug: "lemon",          quantity: 0.125 },
    ],
    tags: ["make-ahead", "leftovers"],
  },
  {
    slug: "bagel-cream-cheese-turkey",
    name: "Whole-grain bagel, cream cheese and turkey",
    slot: "lunch",
    description: "For the kid who has decided sandwiches are boring. Same food, different shape.",
    prepMinutes: 5,
    // Generated to match this recipe's own ingredients, checked at card size. Stock
    // photo libraries had nothing honest for this dish.
    imageUrl: "/images/recipes/bagel-cream-cheese-turkey.jpg",
    suitableFor: ["school", "training", "rest"],
    kidRating: 5,
    recipeSlug: "bagel-cream-cheese-turkey",
    nutrition: { kcal: 445, proteinG: 28, carbsG: 52, fatG: 14, fiberG: 6, source: "USDA estimate" },
    ingredients: [
      { ingredientSlug: "bagel-wg",     quantity: 1 },
      { ingredientSlug: "cream-cheese", quantity: 2 },
      { ingredientSlug: "deli-turkey",  quantity: 3 },
      { ingredientSlug: "cucumber",     quantity: 0.25 },
    ],
    tags: ["fast"],
  },
  {
    slug: "mason-jar-salad",
    name: "Mason jar chicken salad",
    slot: "lunch",
    description: "Dressing at the bottom, leaves at the top. That layer order is why it holds four days.",
    prepMinutes: 15,
    // Generated to match this recipe's own ingredients, checked at card size. Stock
    // photo libraries had nothing honest for this dish.
    imageUrl: "/images/recipes/mason-jar-salad.jpg",
    suitableFor: ["school", "training", "rest"],
    kidRating: 3,
    recipeSlug: "mason-jar-salad",
    nutrition: { kcal: 420, proteinG: 35, carbsG: 22, fatG: 22, fiberG: 6, source: "USDA estimate" },
    ingredients: [
      { ingredientSlug: "chicken-breast", quantity: 0.25 },
      { ingredientSlug: "romaine",        quantity: 2 },
      { ingredientSlug: "tomato",         quantity: 0.5 },
      { ingredientSlug: "bell-pepper",    quantity: 0.25 },
      { ingredientSlug: "carrot",         quantity: 0.25 },
      { ingredientSlug: "olive-oil",      quantity: 0.5 },
      { ingredientSlug: "lemon",          quantity: 0.25 },
    ],
    tags: ["make-ahead"],
  },
  {
    slug: "peanut-butter-oat-balls",
    name: "No-bake peanut butter oat balls",
    slot: "snack",
    description: "Twelve from one bowl, no oven. Chill the mix before rolling or it sticks to everything.",
    prepMinutes: 15,
    suitableFor: ["school", "training", "match", "rest"],
    kidRating: 5,
    imageUrl: "/images/recipes/peanut-butter-oat-balls.jpg",
    recipeSlug: "peanut-butter-oat-balls",
    nutrition: { kcal: 150, proteinG: 5, carbsG: 17, fatG: 8, fiberG: 2, source: "USDA estimate" },
    ingredients: [
      { ingredientSlug: "oats",          quantity: 0.083 },
      { ingredientSlug: "peanut-butter", quantity: 0.67 },
      { ingredientSlug: "honey",         quantity: 0.44 },
      { ingredientSlug: "hemp-seeds",    quantity: 0.17 },
    ],
    tags: ["make-ahead", "freezer"],
  },
  {
    slug: "cheese-quesadilla-snack",
    name: "Quick cheese quesadilla",
    slot: "snack",
    description: "Hot food when there is no time for hot food. Dry pan, no oil, five minutes.",
    prepMinutes: 5,
    suitableFor: ["school", "training", "rest"],
    kidRating: 5,
    // Generated to match this recipe's own ingredient list, checked at card size and
    // again zoomed in. Stock libraries had nothing honest for this one.
    imageUrl: "/images/recipes/cheese-quesadilla-snack.jpg",
    recipeSlug: "cheese-quesadilla-snack",
    nutrition: { kcal: 285, proteinG: 15, carbsG: 26, fatG: 13, fiberG: 4, source: "USDA estimate" },
    ingredients: [
      { ingredientSlug: "wholegrain-tortilla", quantity: 1 },
      { ingredientSlug: "cheese-slice",        quantity: 1 },
    ],
    tags: ["fast"],
  },
  {
    slug: "chocolate-milk-recovery",
    name: "Chocolate milk",
    slot: "snack",
    description: "The recovery drink that has been studied for years, made yourself so you control the sugar.",
    prepMinutes: 2,
    suitableFor: ["training", "match"],
    kidRating: 5,
    imageUrl: "/images/recipes/chocolate-milk-recovery.jpg",
    recipeSlug: "chocolate-milk-recovery",
    nutrition: { kcal: 250, proteinG: 12, carbsG: 38, fatG: 6, fiberG: 2, source: "USDA estimate" },
    ingredients: [
      { ingredientSlug: "milk",         quantity: 1 },
      { ingredientSlug: "cocoa-powder", quantity: 1 },
      { ingredientSlug: "honey",        quantity: 1 },
    ],
    tags: ["recovery", "fast"],
  },
  {
    slug: "cheese-fruit-plate",
    name: "Cheese and fruit plate",
    slot: "snack",
    description: "The plate that replaces the cracker plate. Put it where he walks past and it gets eaten.",
    prepMinutes: 4,
    suitableFor: ["school", "training", "match", "rest"],
    kidRating: 4,
    // Generated to match this recipe's own ingredient list, checked at card size and
    // again zoomed in. Stock libraries had nothing honest for this one.
    imageUrl: "/images/recipes/cheese-fruit-plate.jpg",
    recipeSlug: "cheese-fruit-plate",
    nutrition: { kcal: 215, proteinG: 8, carbsG: 24, fatG: 10, fiberG: 4, source: "USDA estimate" },
    ingredients: [
      { ingredientSlug: "cheese-slice", quantity: 1 },
      { ingredientSlug: "apple",        quantity: 1 },
      { ingredientSlug: "lemon",        quantity: 0.1 },
    ],
    tags: ["fast", "vegetables"],
  },
  {
    slug: "frozen-grapes",
    name: "Frozen grapes",
    slot: "snack",
    description: "Like sorbet, and it is fruit. Dry them properly or they freeze into one brick.",
    prepMinutes: 5,
    suitableFor: ["school", "training", "match", "rest"],
    kidRating: 5,
    imageUrl: "/images/recipes/frozen-grapes.jpg",
    recipeSlug: "frozen-grapes",
    nutrition: { kcal: 105, proteinG: 1, carbsG: 27, fatG: 0, fiberG: 1, source: "USDA estimate" },
    ingredients: [
      { ingredientSlug: "grapes", quantity: 1 },
    ],
    tags: ["make-ahead", "freezer"],
  },
  {
    slug: "toast-avocado-egg",
    name: "Avocado toast + egg",
    slot: "breakfast",
    description: "Rest-day breakfast. Season the avocado in a bowl before it goes near the toast.",
    prepMinutes: 8,
    // Generated to match this recipe's own ingredients, checked at card size. Stock
    // photo libraries had nothing honest for this dish.
    imageUrl: "/images/recipes/toast-avocado-egg.jpg",
    suitableFor: ["school", "rest"],
    kidRating: 3,
    recipeSlug: "toast-avocado-egg",
    nutrition: { kcal: 425, proteinG: 20, carbsG: 34, fatG: 24, fiberG: 10, source: "USDA estimate" },
    ingredients: [
      { ingredientSlug: "wholegrain-bread", quantity: 2 },
      { ingredientSlug: "avocado",          quantity: 0.5 },
      { ingredientSlug: "eggs",             quantity: 1 },
      { ingredientSlug: "lemon",            quantity: 0.1 },
    ],
    tags: ["rest-day"],
  },
];

export const MEALS_BY_SLUG: Record<string, Meal> = Object.fromEntries(
  MEALS.map((m) => [m.slug, m])
);

export const MEALS_BY_SLOT = {
  breakfast: MEALS.filter((m) => m.slot === "breakfast"),
  lunch:     MEALS.filter((m) => m.slot === "lunch"),
  snack:     MEALS.filter((m) => m.slot === "snack"),
  dinner:    MEALS.filter((m) => m.slot === "dinner"),
} as const;
