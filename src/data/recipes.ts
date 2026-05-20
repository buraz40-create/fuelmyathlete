import type { Recipe } from "@/types/domain";

const pexels = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&dpr=1`;

export const RECIPES: Recipe[] = [
  // ────────── BREAKFAST ──────────
  {
    slug: "cereal-banana-milk",
    name: "Whole-grain cereal + banana + milk",
    slot: "breakfast",
    servings: 1,
    totalMinutes: 3,
    imageUrl: pexels(4819353),
    whenToEat: "Backup breakfast when the night-before plan failed and you have 90 seconds.",
    steps: [
      {
        order: 1,
        title: "Pour and slice",
        body: "Pour 1 cup whole-grain cereal into a bowl. Slice 1 banana on top.",
      },
      {
        order: 2,
        title: "Add milk and eat",
        body: "Pour 1 cup cold milk over the top. The whole grain slows the sugar release so the bus ride does not crash blood sugar mid-morning.",
      },
    ],
    notes: [
      "Avoid frosted or sweetened cereals. Total sugar should be under 10 grams per serving.",
      "Whole grain matters. White cereal spikes and crashes inside an hour.",
    ],
  },
  {
    slug: "eggs-toast",
    name: "Scrambled eggs + whole-grain toast",
    slot: "breakfast",
    servings: 1,
    totalMinutes: 8,
    imageUrl: pexels(4846309),
    whenToEat: "Real morning protein for school days when focus matters. Strong before-practice breakfast too.",
    steps: [
      {
        order: 1,
        title: "Toast the bread",
        body: "Drop 2 slices whole-grain bread in the toaster. Set medium-dark.",
      },
      {
        order: 2,
        title: "Whisk and season",
        body: "Crack 2 eggs into a bowl. Add a small pinch of salt and pepper. Whisk for 15 seconds until fully blended.",
        timerSec: 15,
      },
      {
        order: 3,
        title: "Low and slow scramble",
        body: "Melt 1 tsp butter in a non-stick pan over medium-low heat. Pour in the eggs. Stir gently with a rubber spatula for 2 minutes. Pull off the heat while they still look slightly wet, they will finish cooking on the plate.",
        timerSec: 120,
      },
      {
        order: 4,
        title: "Plate and butter the toast",
        body: "Butter the toast and top with the eggs. Eat warm with a glass of milk or OJ.",
      },
    ],
    notes: [
      "Low heat is the trick. High heat makes rubbery eggs.",
      "Pre-practice breakfast: eat 60-90 min before kickoff so digestion is done.",
      "Two eggs = roughly 12 grams of protein. Enough to last until snack time.",
    ],
  },
  {
    slug: "berry-smoothie",
    name: "Berry banana smoothie",
    slot: "breakfast",
    servings: 1,
    totalMinutes: 5,
    imageUrl: pexels(5589043),
    whenToEat: "Hidden spinach when chewing breakfast feels like a chore. Great pre-practice if eating solid food makes you sluggish.",
    steps: [
      {
        order: 1,
        title: "Load the blender",
        body: "Add 1 frozen banana (peel first, freeze the night before), 1 cup frozen mixed berries, ½ cup plain Greek yogurt, 1 cup milk, 1 handful baby spinach, 1 tbsp honey.",
      },
      {
        order: 2,
        title: "Blend on high",
        body: "Blend on high for 45 seconds until completely smooth. Stop and scrape down the sides if it gets stuck.",
        timerSec: 45,
      },
      {
        order: 3,
        title: "Pour and drink",
        body: "Pour into a tall glass. Drink within 5 minutes, the texture changes if it sits.",
      },
    ],
    notes: [
      "Spinach disappears completely behind the berries. Promise.",
      "Use frozen fruit, not ice. Better texture, more flavor.",
      "Want it thicker? Add another half banana. Thinner? More milk.",
    ],
  },
  {
    slug: "english-muffin-pb",
    name: "English muffin + peanut butter + banana",
    slot: "breakfast",
    servings: 1,
    totalMinutes: 4,
    imageUrl: pexels(4946999),
    whenToEat: "Pre-game fuel 1-2 hours before kickoff. Quick-digesting carbs that will not slow you down on the field.",
    steps: [
      {
        order: 1,
        title: "Toast it dark",
        body: "Split a whole-grain English muffin in half. Toast both halves until the edges are golden brown.",
      },
      {
        order: 2,
        title: "Spread the peanut butter",
        body: "Spread 1 tbsp peanut butter on each half while still warm so it melts slightly.",
      },
      {
        order: 3,
        title: "Top with banana and eat",
        body: "Slice 1 banana into coins. Layer onto each half. Eat both halves with a glass of milk.",
      },
    ],
    notes: [
      "Whole grain matters. White English muffins crash sugar mid-game.",
      "Peanut butter has natural protein and fat. Combined with the banana carbs you get slow-release energy.",
      "Allergy swap: sun butter works the same way.",
    ],
  },
  {
    slug: "yogurt-parfait",
    name: "Greek yogurt parfait",
    slot: "breakfast",
    servings: 1,
    totalMinutes: 3,
    imageUrl: pexels(5591699),
    whenToEat: "Looks fancy, takes three minutes. Good rest-day breakfast or after a Saturday morning run.",
    steps: [
      {
        order: 1,
        title: "First layer",
        body: "Spoon ½ cup plain Greek yogurt into a glass or jar.",
      },
      {
        order: 2,
        title: "Berries and honey",
        body: "Top with ½ cup mixed berries (fresh or thawed frozen). Drizzle 1 tbsp honey.",
      },
      {
        order: 3,
        title: "Repeat and finish",
        body: "Add another ½ cup yogurt on top. Finish with another small handful of berries and a few crushed almonds if you have them.",
      },
    ],
    notes: [
      "Plain Greek yogurt only. Flavored kinds add 15+ grams of sugar.",
      "Honey is fine in moderation. It is natural sugar that pairs well with protein.",
      "Doubles as a recovery snack 30 minutes after practice.",
    ],
  },

  // ────────── LUNCH ──────────
  {
    slug: "turkey-wrap",
    name: "Turkey + cheese whole-grain wrap",
    slot: "lunch",
    servings: 1,
    totalMinutes: 5,
    imageUrl: pexels(8964022),
    whenToEat: "Reliable school lunch. Packs in a thermos, no microwave needed.",
    steps: [
      {
        order: 1,
        title: "Lay it out",
        body: "Spread 1 whole-grain tortilla flat. Add a thin layer of mayo or hummus across the center third.",
      },
      {
        order: 2,
        title: "Build the layers",
        body: "Stack 3 oz sliced turkey, 1 slice cheddar, ½ cup chopped romaine, and a few baby carrots cut lengthwise.",
      },
      {
        order: 3,
        title: "Roll tight",
        body: "Fold in the short ends, then roll from the bottom tightly. Cut diagonally in half. Pack with a side of fruit.",
      },
    ],
    notes: [
      "Whole-grain tortilla matters. White flour wraps disappear from the body in an hour.",
      "Cold turkey is fine in a lunchbox until lunch with a small ice pack.",
      "Skip the mustard if it makes the tortilla soggy by lunchtime.",
    ],
  },
  {
    slug: "chicken-pasta-broccoli",
    name: "Pasta + grilled chicken + broccoli",
    slot: "lunch",
    servings: 4,
    totalMinutes: 20,
    imageUrl: pexels(5602477),
    whenToEat: "Cooks in 20 min, reheats in a thermos. Pre-portion for the week on Sunday.",
    steps: [
      {
        order: 1,
        title: "Boil the pasta",
        body: "Boil 12 oz whole-grain pasta in heavily salted water until al dente, about 9 minutes. Save ½ cup pasta water before draining.",
        timerSec: 540,
      },
      {
        order: 2,
        title: "Steam the broccoli",
        body: "Cut 2 cups broccoli florets. Steam for 4 minutes or microwave covered with 2 tbsp water for 3 minutes. They should be bright green and just tender.",
        timerSec: 240,
      },
      {
        order: 3,
        title: "Sear the chicken",
        body: "Season 1 lb chicken breast strips with salt + pepper. Heat 1 tbsp olive oil in a pan over medium-high. Cook the chicken 4 minutes per side until golden and 165°F internal.",
        timerSec: 480,
      },
      {
        order: 4,
        title: "Toss together",
        body: "In a big bowl, combine drained pasta, broccoli, chicken, 2 tbsp olive oil, 1 minced garlic clove, salt, and a splash of the reserved pasta water to loosen. Toss until everything is coated.",
      },
      {
        order: 5,
        title: "Portion and cool",
        body: "Divide into 4 meal-prep containers. Cool completely on the counter before sealing, otherwise condensation makes everything soggy by Tuesday.",
      },
    ],
    notes: [
      "Pasta water is the secret. The starch helps the oil cling to the noodles instead of pooling at the bottom.",
      "Reheat tip: add a splash of water before microwaving so it does not dry out.",
      "Athletes need carbs. Do not skimp on the pasta portion just because the internet told you to.",
    ],
  },

  // ────────── SNACK ──────────
  {
    slug: "apple-pb",
    name: "Apple + peanut butter",
    slot: "snack",
    servings: 1,
    totalMinutes: 2,
    imageUrl: pexels(7440377),
    whenToEat: "Travel-friendly recovery snack. Natural sugar + protein in 30 seconds.",
    steps: [
      {
        order: 1,
        title: "Slice and dip",
        body: "Slice 1 medium apple into wedges. Scoop 2 tbsp peanut butter into a small container or directly onto the plate.",
      },
      {
        order: 2,
        title: "Pack for the bag",
        body: "If packing for the soccer bag: squeeze the lemon over the slices to prevent browning, then seal in a container with the peanut butter on the side.",
      },
    ],
    notes: [
      "Pair carbs (apple) with protein + fat (peanut butter) for slow energy release.",
      "Sub almond butter or sun butter for nut allergies. Same effect.",
    ],
  },
  {
    slug: "cheese-crackers",
    name: "String cheese + whole-grain crackers",
    slot: "snack",
    servings: 1,
    totalMinutes: 1,
    imageUrl: pexels(7440380),
    whenToEat: "Soccer-bag staple. Does not melt as fast as you would think.",
    steps: [
      {
        order: 1,
        title: "Pack it",
        body: "Unwrap 2 string cheeses. Portion ½ cup whole-grain crackers into a small container. Done.",
      },
    ],
    notes: [
      "Cheese stays edible at room temp for ~3 hours in an insulated bag.",
      "Whole-grain crackers > white. The fiber slows the carb hit.",
    ],
  },
  {
    slug: "yogurt-honey-berries",
    name: "Greek yogurt + honey + berries",
    slot: "snack",
    servings: 1,
    totalMinutes: 2,
    imageUrl: pexels(5852457),
    whenToEat: "Within 30 minutes of practice ends. Recovery window where protein + carbs hit fastest.",
    steps: [
      {
        order: 1,
        title: "Build it",
        body: "Spoon 1 cup plain Greek yogurt into a bowl. Drizzle 1 tbsp honey. Top with ½ cup fresh or thawed frozen berries.",
      },
      {
        order: 2,
        title: "Stir and eat fast",
        body: "Give it a quick stir. Eat within 10 minutes for best texture.",
      },
    ],
    notes: [
      "Hits the 30-min post-practice recovery window athletes target.",
      "Plain yogurt only. Sweetened kinds defeat the purpose with added sugar.",
      "Travels well in an insulated container for an hour after practice.",
    ],
  },
  {
    slug: "banana-almonds",
    name: "Banana + handful of almonds",
    slot: "snack",
    servings: 1,
    totalMinutes: 1,
    imageUrl: pexels(8922007),
    whenToEat: "Pre-practice quick energy + slow-release fat. Eat 30-45 min before warm-ups.",
    steps: [
      {
        order: 1,
        title: "Grab and go",
        body: "Eat 1 banana. Pour ¼ cup raw almonds into a small bag or container. Done.",
      },
    ],
    notes: [
      "Bananas are nature's energy bar. Potassium prevents cramps during a hot training session.",
      "Almonds add slow fat so the energy lasts past warm-ups.",
    ],
  },

  // ────────── DINNER ──────────
  {
    slug: "chicken-rice-broccoli",
    name: "Grilled chicken + jasmine rice + broccoli",
    slot: "dinner",
    servings: 4,
    totalMinutes: 30,
    imageUrl: pexels(9893216),
    whenToEat: "The workhorse dinner. Boring on paper, perfect for any day type.",
    steps: [
      {
        order: 1,
        title: "Start the rice",
        body: "Rinse 1.5 cups jasmine rice until the water runs clear. Combine with 2.25 cups water and a pinch of salt in a small pot. Bring to a boil, then cover and simmer on low for 15 minutes.",
        timerSec: 900,
      },
      {
        order: 2,
        title: "Season the chicken",
        body: "Pat 1.5 lb chicken breasts dry. Rub with 1 tbsp olive oil, then season with salt, pepper, and ½ tsp garlic powder on both sides.",
      },
      {
        order: 3,
        title: "Sear the chicken",
        body: "Heat a grill pan or non-stick skillet over medium-high. Cook the chicken 5 minutes per side until golden and 165°F internal. Let rest 5 minutes before slicing.",
        timerSec: 600,
      },
      {
        order: 4,
        title: "Steam the broccoli",
        body: "While chicken rests, steam 4 cups broccoli florets for 4-5 minutes until bright green and just tender.",
        timerSec: 270,
      },
      {
        order: 5,
        title: "Make a quick sauce",
        body: "Whisk 2 tbsp olive oil, 1 minced garlic clove, juice of half a lemon, and a small pinch of salt. Drizzle over the chicken and broccoli.",
      },
      {
        order: 6,
        title: "Plate it",
        body: "Slice the chicken. Divide rice, chicken, and broccoli across 4 plates or meal-prep containers.",
      },
    ],
    notes: [
      "Resting the chicken is non-negotiable. Skipping it makes the meat dry.",
      "Cook the rice with a pinch of salt. Otherwise it tastes flat next to the seasoned chicken.",
      "Scales: 0.9× portions on rest days, 1.2× on training days, 1.3× on match days.",
    ],
  },
  {
    slug: "salmon-sweet-potato",
    name: "Salmon + sweet potato + green beans",
    slot: "dinner",
    servings: 4,
    totalMinutes: 30,
    imageUrl: pexels(33706292),
    whenToEat: "Omega-3s for recovery + complex carbs for the next day. Best as a rest-day or post-match dinner.",
    steps: [
      {
        order: 1,
        title: "Roast the sweet potatoes",
        body: "Heat oven to 425°F. Cube 2 large sweet potatoes (skin on). Toss with 1 tbsp olive oil, salt, and pepper on a sheet pan. Roast 22 minutes, flipping once at the halfway mark.",
        timerSec: 1320,
      },
      {
        order: 2,
        title: "Season the salmon",
        body: "Pat 4 salmon fillets (about 6 oz each) dry. Brush lightly with olive oil. Season with salt, pepper, and a squeeze of lemon juice.",
      },
      {
        order: 3,
        title: "Steam the green beans",
        body: "Trim 1 lb green beans. Steam or microwave covered with 2 tbsp water for 4 minutes. They should still have a bite.",
        timerSec: 240,
      },
      {
        order: 4,
        title: "Cook the salmon",
        body: "Heat 1 tbsp olive oil in a non-stick pan over medium-high. Place salmon skin-side down. Cook 4 minutes without moving. Flip and cook 2-3 more minutes until just cooked through. The center should still be slightly translucent.",
        timerSec: 360,
      },
      {
        order: 5,
        title: "Finish with butter and herbs",
        body: "Take the salmon off heat. Add 1 tbsp butter and a sprinkle of fresh dill or parsley to the pan. Spoon the melted butter over each fillet.",
      },
      {
        order: 6,
        title: "Plate it",
        body: "Plate salmon over the green beans. Sweet potatoes on the side. Squeeze a fresh lemon wedge over everything.",
      },
    ],
    notes: [
      "Do not overcook salmon. Slightly underdone in the center stays moist.",
      "Skin-on, skin-side-down first. The skin protects the flesh from drying out.",
      "Salmon's omega-3s reduce inflammation. Great after a hard practice or match.",
    ],
  },
  {
    slug: "turkey-tacos",
    name: "Turkey tacos on whole-grain tortillas",
    slot: "dinner",
    servings: 4,
    totalMinutes: 20,
    imageUrl: pexels(8448335),
    whenToEat: "Family favorite. Build-your-own bar means less complaining at the table.",
    steps: [
      {
        order: 1,
        title: "Brown the turkey",
        body: "Heat a large skillet over medium-high. Add 1 lb lean ground turkey. Break it apart with a spatula. Cook for 6 minutes until no pink remains.",
        timerSec: 360,
      },
      {
        order: 2,
        title: "Season",
        body: "Drain any excess fat. Add 1 tbsp taco seasoning + ¼ cup water. Stir and simmer 2 minutes until the liquid is mostly absorbed.",
        timerSec: 120,
      },
      {
        order: 3,
        title: "Warm the tortillas",
        body: "Warm 12 whole-grain tortillas in the microwave wrapped in a damp paper towel for 30 seconds, or directly over a gas flame for 10 seconds per side.",
      },
      {
        order: 4,
        title: "Set up the bar",
        body: "On the table: shredded romaine, shredded cheddar, halved cherry tomatoes, lime wedges, a small bowl of plain Greek yogurt (substitutes for sour cream).",
      },
      {
        order: 5,
        title: "Build and eat",
        body: "Each person builds their own tacos. 2-3 tacos per athlete portion. Greek yogurt + lime + cheddar is the combo that wins.",
      },
    ],
    notes: [
      "Lean turkey (93/7 or 99/1) keeps it light without dropping the protein.",
      "Whole-grain tortillas matter. They hold up better than corn and add fiber.",
      "Plain Greek yogurt instead of sour cream adds protein and tastes the same with lime.",
    ],
  },
  {
    slug: "pasta-marinara",
    name: "Pasta + turkey marinara + side salad",
    slot: "dinner",
    servings: 4,
    totalMinutes: 25,
    imageUrl: pexels(9304081),
    whenToEat: "Classic carb-load. Eat the night before a match for sustained next-day energy.",
    steps: [
      {
        order: 1,
        title: "Boil the pasta",
        body: "Boil 16 oz whole-grain pasta in heavily salted water until al dente, about 10 minutes. Reserve 1 cup pasta water before draining.",
        timerSec: 600,
      },
      {
        order: 2,
        title: "Brown the turkey",
        body: "Heat 1 tbsp olive oil in a large skillet over medium-high. Add 1 lb ground turkey. Break it apart and cook 6 minutes until no pink remains.",
        timerSec: 360,
      },
      {
        order: 3,
        title: "Simmer the sauce",
        body: "Add 2 cups marinara, 1 minced garlic clove, and ½ cup of the reserved pasta water. Simmer for 5 minutes to let the flavors marry.",
        timerSec: 300,
      },
      {
        order: 4,
        title: "Toss it",
        body: "Add the drained pasta directly to the sauce skillet. Toss with tongs until every noodle is coated. Add more pasta water if it looks dry.",
      },
      {
        order: 5,
        title: "Quick salad and serve",
        body: "Toss 4 cups romaine with 1 tbsp olive oil, juice of half a lemon, salt, and a pinch of pepper. Plate pasta + salad side by side. Optional: a tablespoon of grated parmesan over the pasta.",
      },
    ],
    notes: [
      "Eat dinner 12-14 hours before kickoff for full carb-loading effect.",
      "Whole-grain pasta releases energy slower than white. Better for next-day fuel.",
      "Add the pasta to the sauce, not the sauce to the pasta. The starch helps everything cling.",
    ],
  },
  {
    slug: "stirfry-chicken-rice",
    name: "Stir-fry chicken + rice + edamame",
    slot: "dinner",
    servings: 4,
    totalMinutes: 20,
    imageUrl: pexels(7340936),
    whenToEat: "Same hibachi technique, dinner-portioned. Works for any day type.",
    steps: [
      {
        order: 1,
        title: "Start the rice",
        body: "Rinse 1.5 cups jasmine rice. Combine with 2.25 cups water and a pinch of salt in a small pot. Bring to boil, cover, and simmer on low for 15 minutes.",
        timerSec: 900,
      },
      {
        order: 2,
        title: "Slice the chicken thin",
        body: "Slice 1.5 lb chicken breast against the grain into ½-inch strips. Pat dry. Toss with salt + pepper.",
      },
      {
        order: 3,
        title: "Sear screaming hot",
        body: "Heat 1 tbsp avocado oil in a wok or large skillet over HIGH heat for 2 minutes. Add chicken in a single layer. Sear 4 minutes without moving, then flip and cook 2 more minutes.",
        timerSec: 360,
      },
      {
        order: 4,
        title: "Add edamame and sauce",
        body: "Push chicken to the edges. Add 2 minced garlic cloves + 2 cups shelled edamame to the center. Stir 1 minute. Pour over 3 tbsp low-sodium soy sauce + 1 tbsp toasted sesame oil. Toss everything together for 1-2 more minutes.",
        timerSec: 120,
      },
      {
        order: 5,
        title: "Plate it",
        body: "Fluff the rice with a fork. Divide into bowls. Top with chicken + edamame. Sprinkle sesame seeds and chopped green onion if you have them.",
      },
    ],
    notes: [
      "HIGH heat is non-negotiable. Medium just steams.",
      "Use chicken breast, not thighs. Cleaner flavor and works better for athlete portions.",
      "Edamame brings 8 grams of plant protein per cup, plus fiber.",
    ],
  },

  // ────────── EXISTING HIBACHI RECIPE (lunch + dinner via stirfry actually has its own now) ──────────
  {
    slug: "hibachi-chicken",
    name: "Hibachi Chicken (Sunday meal prep)",
    slot: "lunch",
    servings: 8,
    totalMinutes: 25,
    imageUrl: pexels(6107772),
    whenToEat: "One Sunday cook session feeds 5 school lunches plus 3 dinner reheats. The signature Elvis recipe.",
    steps: [
      {
        order: 1,
        title: "Slice the chicken thin",
        body: "Slice 2 lb boneless skinless chicken breast into thin strips, about ½ inch thick. Thin cuts are the secret. They cook fast, stay juicy, and reheat well in school containers without drying out. Pat dry with paper towels for a better sear.",
      },
      {
        order: 2,
        title: "Season",
        body: "Toss the chicken strips with ½ tsp salt and ½ tsp black pepper. Don't add the soy sauce yet. Adding it too early draws out moisture and prevents a good sear.",
      },
      {
        order: 3,
        title: "Heat the pan, screaming hot",
        body: "Heat a large skillet or wok over HIGH heat for 2 minutes. Add 1 tbsp avocado or vegetable oil. You want the oil to shimmer and almost smoke. Cast iron or stainless steel works best.",
        timerSec: 120,
      },
      {
        order: 4,
        title: "Sear the chicken",
        body: "Add the chicken in a single layer. Do NOT overcrowd the pan. Cook in 2 batches if needed. Let it sear untouched for 4 minutes, then flip and cook another 2 minutes until golden brown on both sides.",
        timerSec: 240,
      },
      {
        order: 5,
        title: "Add the hibachi sauce",
        body: "Push the chicken to the edges of the pan. Add 2 tbsp unsalted butter + 4 cloves minced garlic to the center. Let the butter melt and garlic sizzle for 30 seconds, then pour 3 tbsp low-sodium soy sauce and 1 tbsp sesame oil over everything. Toss to coat.",
        timerSec: 30,
      },
      {
        order: 6,
        title: "Finish + caramelize",
        body: "Toss everything together over high heat for 1-2 more minutes until the sauce caramelizes slightly and coats the chicken in a glossy glaze. You'll smell it. That's the hibachi magic.",
        timerSec: 90,
      },
      {
        order: 7,
        title: "Cool + portion",
        body: "Spread chicken on a baking sheet or large plate to cool completely before portioning. Never pack warm food straight into containers or it steams itself soggy. Once cool, divide into 5 meal-prep containers alongside rice and veggies, plus 3 dinner portions.",
      },
    ],
    notes: [
      "Keeps in the fridge for up to 4 days. Freeze portions 4-5 for Thursday/Friday freshness.",
      "Pack yum-yum sauce separately in a small container. Keeps the rice from getting soggy overnight.",
      "Reheat with a splash of water in the container, microwave covered. Seals in moisture so it doesn't dry out.",
      "Use chicken BREAST, not thighs. Elvis prefers breast. A little extra soy + butter keeps it juicy without thigh fat.",
      "The biggest mistake is cooking on medium. You need HIGH heat for the char. Medium just steams.",
    ],
  },
];

export const RECIPES_BY_SLUG: Record<string, Recipe> = Object.fromEntries(
  RECIPES.map((r) => [r.slug, r])
);
