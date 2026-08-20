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
    // Photo removed: showed sliced banana and yogurt, no cereal.
    whenToEat: "The backup breakfast for the morning the night-before plan did not happen. Ninety seconds, no pan.",
    equipment: ["Cereal bowl", "Spoon", "Knife"],
    steps: [
      {
        order: 1,
        title: "Buy the right box once and this recipe is solved",
        body: "Turn the box over. You want whole grain as the first ingredient and under 10 g of total sugars per serving. Plain shredded wheat, unsweetened oat squares and most bran flakes clear it. Almost nothing with a cartoon on the front does, including the ones labelled made with whole grain.",
        mistake: "Trusting the front of the box. Made with whole grain and multigrain are marketing phrases with no minimum. The ingredient list is the only thing that tells you anything.",
      },
      {
        order: 2,
        title: "Cereal first, banana second, milk last",
        body: "One cup of cereal, one sliced banana, then one cup of cold milk poured over. In that order the banana sits on top instead of sinking, and he can see what he is eating, which matters more at 7am than it should.",
      },
      {
        order: 3,
        title: "Add something with protein or expect to hear about it by 10am",
        body: "Cereal, banana and milk is mostly carbohydrate, and on its own it runs out before lunch. A boiled egg from the fridge, a string cheese, or a spoon of peanut butter stirred into the banana slices closes the gap. Milk alone gives you about 8 g of protein and that is not enough on a school morning.",
      },
    ],
    notes: [
      "Whole grain is doing real work here. The fiber slows how fast the sugar arrives, which is the difference between steady and a crash on the bus.",
      "Sugar on a label includes what is naturally in the grain, so a plain cereal reading 4 or 5 g is fine. It is the 12 g and up boxes that are the problem.",
      "Slice the banana straight into the bowl and you have nothing to wash but the bowl.",
      "Any milk works. Whole, 2%, or unsweetened almond if dairy is out, though almond milk brings almost no protein so the protein add-on matters more.",
      "This is the fallback, not the plan. On a training day the overnight oats or the eggs will hold him longer.",
    ],
  },
  {
    slug: "eggs-toast",
    name: "Scrambled eggs + whole-grain toast",
    slot: "breakfast",
    servings: 1,
    totalMinutes: 8,
    imageUrl: pexels(32134464),
    whenToEat: "Real morning protein for school days when focus matters. Strong before-practice breakfast too.",
    equipment: ["Non-stick pan", "Toaster", "Rubber spatula", "Mixing bowl"],
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
        mistake: "Cranking the heat. High heat makes rubbery eggs. Low and slow is the only way.",
      },
      {
        order: 4,
        title: "Plate and butter the toast",
        body: "Butter the toast and top with the eggs. Eat warm with a glass of milk or OJ.",
      },
    ],
    notes: [
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
    imageUrl: pexels(1438080),
    whenToEat: "Hidden spinach when chewing breakfast feels like a chore. Great pre-practice if eating solid food makes you sluggish.",
    equipment: ["Blender", "Tall glass", "Measuring cup"],
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
        mistake: "Using ice instead of frozen fruit. Ice waters down the flavor. Frozen banana is the trick for thick texture.",
      },
    ],
    notes: [
      "Spinach disappears completely behind the berries. Promise.",
      "Use frozen fruit, not ice. Better texture, more flavor.",
      "Want it thicker? Add another half banana. Thinner? More milk.",
    ],
    proteinBoost: {
      description: "Add 1 scoop (~25-30g) whey or plant-based protein powder before blending. Vanilla works best with berries.",
      addedProteinG: 25,
      addedKcal: 110,
      note: "Pick a third-party tested brand (NSF Certified for Sport or Informed Sport). Protein powders are supplements, not regulated like food.",
    },
  },
  {
    slug: "pb-banana-power",
    name: "PB banana power smoothie",
    slot: "breakfast",
    servings: 1,
    totalMinutes: 5,
    // Photo removed: showed green kale smoothie, not peanut butter.
    whenToEat: "Heavy breakfast for long training mornings. Oats keep you full past warm-ups.",
    equipment: ["Blender", "Tall glass", "Measuring spoons"],
    steps: [
      {
        order: 1,
        title: "Load the blender",
        body: "Add 1 frozen banana, 2 tbsp peanut butter, 1 cup milk, ½ cup plain Greek yogurt, 1 tbsp honey, ¼ cup rolled oats.",
      },
      {
        order: 2,
        title: "Blend high, scrape, blend again",
        body: "Blend on high for 45 seconds. Stop, scrape down the sides, blend another 15 seconds until completely smooth. The oats should be invisible.",
        timerSec: 60,
        mistake: "Adding the oats last and not blending long enough. Raw oat chunks ruin the texture. Blend twice if needed.",
      },
      {
        order: 3,
        title: "Pour and drink",
        body: "Pour into a tall glass. Drink within 5 minutes for best texture.",
      },
    ],
    notes: [
      "22 grams of protein from yogurt + peanut butter alone. No powder needed.",
      "Freeze the banana the night before. It's the trick for thick, creamy texture.",
      "Sub almond butter for peanut allergies. Same effect.",
    ],
    proteinBoost: {
      description: "Add 1 scoop chocolate or vanilla whey/plant protein. Pairs naturally with the PB and banana flavors.",
      addedProteinG: 25,
      addedKcal: 110,
      note: "Already 22g from real food. Boost takes you to ~47g per serving, more than enough for a hard training day.",
    },
  },
  {
    slug: "green-machine",
    name: "Green machine smoothie",
    slot: "breakfast",
    servings: 1,
    totalMinutes: 5,
    // Verified by opening it at full size: a tall glass of green smoothie.
    imageUrl:
      "https://images.pexels.com/photos/33526960/pexels-photo-33526960.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&dpr=1",
    whenToEat: "When breakfast needs to disguise the vegetables. The mango covers everything.",
    equipment: ["Blender", "Tall glass"],
    steps: [
      {
        order: 1,
        title: "Layer the blender",
        body: "Add ingredients in this order: 1 cup milk first (so the blade can spin), then 2 handfuls baby spinach, 1 frozen banana, 1 cup frozen mango chunks, ½ cup plain Greek yogurt, 1 tbsp hemp hearts.",
      },
      {
        order: 2,
        title: "Blend until the green disappears",
        body: "Blend on high for 60 seconds until completely smooth and uniformly green-yellow. If you see any spinach flecks, blend another 20 seconds.",
        timerSec: 60,
        mistake: "Putting spinach on top of the frozen fruit. The blade can't catch it. Liquid first, leaves second, then frozen stuff.",
      },
      {
        order: 3,
        title: "Pour and drink",
        body: "Pour and drink immediately. The color is best within the first minute.",
      },
    ],
    notes: [
      "Two cups of raw spinach = 2 grams of iron + tons of vitamin K. They will not taste it.",
      "Hemp hearts add 3 grams of plant protein and omega-3s. Skip if you don't have them.",
      "Frozen mango is the texture trick. Fresh mango makes it watery.",
    ],
    proteinBoost: {
      description: "Add 1 scoop vanilla or unflavored protein powder. Skip chocolate, it fights the mango.",
      addedProteinG: 25,
      addedKcal: 110,
    },
  },
  {
    slug: "berry-oat-fuel",
    name: "Berry oat fuel smoothie",
    slot: "breakfast",
    servings: 1,
    totalMinutes: 5,
    // Photo removed: showed two bananas on a flat background.
    whenToEat: "Drinkable bowl of oatmeal. Sustained-release energy for school days that start before 7 AM.",
    equipment: ["Blender", "Tall glass"],
    steps: [
      {
        order: 1,
        title: "Soak the oats (optional but smoother)",
        body: "If you have 10 minutes: combine ½ cup rolled oats with 1 cup milk in the blender and let it sit for 10 minutes. This softens them so they disappear when blended.",
      },
      {
        order: 2,
        title: "Add the rest",
        body: "Add 1 cup frozen mixed berries, ½ frozen banana, 1 tbsp peanut butter, 1 tbsp honey.",
      },
      {
        order: 3,
        title: "Blend long",
        body: "Blend on high for 60 seconds until completely smooth. The oats should be invisible. Scrape and blend again if any chunks remain.",
        timerSec: 60,
      },
      {
        order: 4,
        title: "Pour and drink",
        body: "Pour into a tall glass. Drink within 5 minutes.",
      },
    ],
    notes: [
      "Oats are the secret to lasting energy. Whole grain, soluble fiber, slow carb release.",
      "Skip the soak if you're rushing. Just blend 20-30 seconds longer.",
      "Berries give you anthocyanins (recovery antioxidants) without needing supplements.",
    ],
    proteinBoost: {
      description: "Add 1 scoop vanilla or unflavored protein powder. Goes in with the oats during the soak step.",
      addedProteinG: 25,
      addedKcal: 110,
    },
  },
  {
    slug: "vanilla-protein-punch",
    name: "Vanilla cottage cheese smoothie",
    slot: "breakfast",
    servings: 1,
    totalMinutes: 4,
    // Photo removed: showed hand holding a jar of red lentils.
    whenToEat: "Most protein you can get from a single smoothie without using powder. Great morning fuel.",
    equipment: ["Blender", "Tall glass"],
    steps: [
      {
        order: 1,
        title: "Load it up",
        body: "Add ½ cup low-fat cottage cheese, 1 frozen banana, 1 cup milk, 1 tbsp honey, ½ tsp pure vanilla extract.",
      },
      {
        order: 2,
        title: "Blend smooth",
        body: "Blend on high for 60 seconds. Cottage cheese needs the extra time to fully break down. Done right, it tastes like a vanilla milkshake.",
        timerSec: 60,
        mistake: "Using full-fat cottage cheese. It gets weirdly grainy when blended. Low-fat or 2% blends much smoother.",
      },
      {
        order: 3,
        title: "Pour and drink",
        body: "Pour and drink. Texture is best in the first 5 minutes.",
      },
    ],
    notes: [
      "Cottage cheese has 14 grams of protein per ½ cup. Plus casein (slow-release protein) which keeps you full longer.",
      "If you're skeptical of cottage cheese in a smoothie: don't be. Blended, you cannot taste it.",
      "Add ½ cup frozen berries or peaches to mix it up.",
    ],
    proteinBoost: {
      description: "Add 1 scoop vanilla whey or casein. Doubles down on the slow-release protein angle.",
      addedProteinG: 25,
      addedKcal: 110,
      note: "Already 26g from cottage cheese. Boost takes you to ~51g, an unusually high amount for a single serving.",
    },
  },
  {
    slug: "tropical-pre-game",
    name: "Tropical pre-game smoothie",
    slot: "snack",
    servings: 1,
    totalMinutes: 4,
    // Photo removed: showed cucumber and apple juice in mason jars.
    whenToEat: "30-45 minutes before kickoff or warm-ups. Quick-digesting carbs that don't sit heavy.",
    equipment: ["Blender", "Tall glass"],
    steps: [
      {
        order: 1,
        title: "Build it",
        body: "Add 1 cup frozen mango, ½ cup frozen pineapple, 1 banana, 1 cup coconut water, ¼ cup plain Greek yogurt.",
      },
      {
        order: 2,
        title: "Blend high",
        body: "Blend for 45 seconds until smooth and bright orange-yellow. Should pour easily without being watery.",
        timerSec: 45,
      },
      {
        order: 3,
        title: "Drink and head out",
        body: "Drink within 10 minutes. The coconut water + fruit sugars hit fast for warm-ups.",
      },
    ],
    notes: [
      "Coconut water is the natural sports drink. Real potassium, no artificial colors.",
      "Light yogurt portion on purpose. Too much protein pre-game slows digestion.",
      "If practice is over 60 min away, add 2 tbsp oats for more sustained carbs.",
    ],
    proteinBoost: {
      description: "Generally skip the powder pre-game. Heavy protein slows digestion and can sit badly on the field.",
      addedProteinG: 25,
      addedKcal: 110,
      note: "If you must, use a light dose (½ scoop) and only if you've tested it before. Race-day is not the day to try new things.",
    },
  },
  {
    slug: "chocolate-cherry-recovery",
    name: "Chocolate cherry recovery smoothie",
    slot: "snack",
    servings: 1,
    totalMinutes: 5,
    imageUrl: pexels(6217960),
    whenToEat: "Within 30 minutes of practice or match ending. Tart cherries reduce muscle soreness, real research backs this.",
    equipment: ["Blender", "Tall glass"],
    steps: [
      {
        order: 1,
        title: "Stack the blender",
        body: "Add 1 cup unsweetened almond milk, 1 cup frozen pitted cherries, 1 frozen banana, 1 tbsp unsweetened cocoa powder, ½ cup plain Greek yogurt, 1 tbsp honey.",
      },
      {
        order: 2,
        title: "Blend deep purple",
        body: "Blend on high for 60 seconds until completely smooth and deep purple-brown. Looks like a chocolate milkshake.",
        timerSec: 60,
        mistake: "Using sweetened cocoa mix (Nesquik etc.). Loaded with sugar. Plain unsweetened cocoa is the recovery ingredient.",
      },
      {
        order: 3,
        title: "Drink immediately",
        body: "Drink right after practice ends. The 30-minute recovery window is when muscles soak up protein + carbs the fastest.",
      },
    ],
    notes: [
      "Tart cherries reduce post-exercise muscle soreness. Studied in endurance athletes and runners.",
      "18 grams of protein from yogurt alone. Adequate for recovery, no powder needed.",
      "Sub regular milk for almond milk if you don't have it.",
    ],
    proteinBoost: {
      description: "Add 1 scoop chocolate whey or plant protein. Hides perfectly in the cocoa-cherry flavor.",
      addedProteinG: 25,
      addedKcal: 110,
      note: "Recovery window is real. If you train hard 5+ days a week, the boost is worth it. Casual training, the yogurt is enough.",
    },
  },
  {
    slug: "english-muffin-pb",
    name: "English muffin + peanut butter + banana",
    slot: "breakfast",
    servings: 1,
    totalMinutes: 4,
    // Photo removed: showed white sandwich bread, no english muffin.
    whenToEat: "Two hours before kickoff, not one. It is the pre-game breakfast that has already been tested on a normal Tuesday.",
    equipment: ["Toaster", "Butter knife"],
    steps: [
      {
        order: 1,
        title: "Fork-split it, do not cut it",
        body: "Push a fork all the way around the seam and pull the halves apart. That is what gives an English muffin its rough torn surface, which toasts into ridges and holds the peanut butter instead of letting it slide off. A knife gives you two smooth discs.",
      },
      {
        order: 2,
        title: "Toast until the ridges are brown",
        body: "Toast both halves until the raised bits are properly brown, about 2 minutes. Pale toast goes soft again in minutes and turns rubbery under the peanut butter.",
        timerSec: 120,
      },
      {
        order: 3,
        title: "Thin layer of peanut butter, while it is hot",
        body: "One tablespoon per half, spread while the muffin is still hot so it loosens and goes on thin. Piled on thick it is a lot of fat sitting in the stomach right before a warm-up, and fat is the slowest thing to leave it.",
        mistake: "Loading it like a sandwich on a game morning. Two tablespoons total is the amount that fuels without sitting there.",
      },
      {
        order: 4,
        title: "Banana coins on top, then eat it with a glass of milk",
        body: "Slice one banana into coins across both halves. The milk is not optional garnish, it is the protein in this breakfast.",
      },
    ],
    notes: [
      "Two hours is the target. That is enough time for a normal breakfast to clear the stomach before running, and it is the AAP-style spacing for a pre-activity meal in children.",
      "Never test a new food on a game day. If this is not already a regular breakfast, run it on a Tuesday first.",
      "Whole-grain English muffins are worth it on a school morning for the fiber. Before a match, plain white is genuinely the better choice: less fiber means less sitting in the stomach.",
      "If kickoff is at 8am, this becomes dinner the night before and the morning goes liquid: milk, a smoothie, or just the banana.",
      "Sun butter for a nut-free team. It spreads thicker, so warm the muffin properly first.",
    ],
  },
  {
    slug: "yogurt-parfait",
    name: "Greek yogurt parfait",
    slot: "breakfast",
    servings: 1,
    totalMinutes: 3,
    imageUrl: pexels(1066658),
    whenToEat: "Rest-day breakfast, or after a Saturday morning run. Looks like effort, takes three minutes.",
    equipment: ["Tall glass or a jar with a lid", "Spoon"],
    steps: [
      {
        order: 1,
        title: "Yogurt, then berries, then repeat",
        body: "Half a cup of plain Greek yogurt in the bottom, half a cup of berries over it, then another half cup of yogurt and a few more berries on top. Two rounds is enough. More layers than that and it is just a stirred bowl in a taller glass.",
      },
      {
        order: 2,
        title: "Honey between the layers, not on top",
        body: "Drizzle the tablespoon of honey over the first yogurt layer where it gets trapped. On top it runs straight down the inside of the glass and the first three spoonfuls are sweet and the rest are not.",
      },
      {
        order: 3,
        title: "Anything crunchy goes on at the table",
        body: "Almonds, granola or seeds go on immediately before eating. Added the night before they are soft by morning, and the crunch is most of why a kid likes this over a bowl of yogurt.",
        mistake: "Building it the night before with the granola already in. Make the yogurt and berry layers ahead if you want, keep the crunchy part in a separate cup.",
      },
    ],
    notes: [
      "Frozen berries are better than fresh here. They give up a little juice as they thaw and streak the yogurt purple, which is the thing that makes a kid eat it.",
      "Plain Greek yogurt is about 20 g of protein a cup, roughly double regular. Flavored cups can carry 15 to 20 g of added sugar, so plain plus your own honey wins on both counts.",
      "In a jar with a lid this survives a fridge overnight and travels to a Saturday tournament.",
      "It is also the same food as the recovery snack, just in a glass. If he prefers it this way, use it for both.",
    ],
  },

  // ────────── LUNCH ──────────
  {
    slug: "turkey-wrap",
    name: "Turkey + cheese whole-grain wrap",
    slot: "lunch",
    servings: 1,
    totalMinutes: 5,
    // Verified by opening it at full size: two tortilla wrap halves standing cut-side up.
    imageUrl:
      "https://images.pexels.com/photos/5848057/pexels-photo-5848057.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&dpr=1",
    whenToEat: "School lunch. No microwave, no reheat, eaten cold five hours after you made it.",
    equipment: ["Cutting board", "Knife", "Lunch container", "Ice pack"],
    steps: [
      {
        order: 1,
        title: "Warm the tortilla for ten seconds first",
        body: "Ten seconds in the microwave or a few seconds in a dry pan. A cold tortilla straight from the bag cracks along the fold and the whole thing comes apart in the container. Warm, it rolls without splitting.",
      },
      {
        order: 2,
        title: "Build a barrier between the spread and the bread",
        body: "Thin layer of mayo or hummus down the middle third, then the cheese slice flat on top of it, then the turkey, then the lettuce and carrots. The cheese is the waterproofing. Wet fillings straight onto the tortilla is why lunch wraps arrive soggy.",
        mistake: "Putting the lettuce down first, next to the tortilla. By 11am it has bled into the bread. Lettuce goes in the middle of the stack, never against the wrap.",
      },
      {
        order: 3,
        title: "Roll it tight, then let it sit seam down",
        body: "Fold the two short ends in, then roll from the bottom, pulling back toward you as you go so the filling compresses instead of squeezing out the end. Rest it seam side down for a minute and it stays shut without a toothpick.",
      },
      {
        order: 4,
        title: "Cut on a hard diagonal and pack it cut side up",
        body: "A steep diagonal gives two halves that stand on their flat ends and show the filling, which is the difference between eaten and traded. Pack them upright with an apple alongside.",
      },
    ],
    notes: [
      "Deli turkey is perishable. USDA guidance is to keep it at or below 40F, so pack an ice pack or a frozen drink and eat it by lunch.",
      "A frozen water bottle does two jobs: it keeps the wrap cold all morning and it is drinkable by lunchtime.",
      "Whole-grain tortilla matters on a training day. White flour wraps are gone from the body in about an hour.",
      "Skip the mustard if it makes the tortilla soggy by lunchtime. Some brands are much wetter than others.",
      "Lower-sodium deli turkey is worth looking for. Standard sliced turkey is one of the saltiest things in a normal lunchbox.",
      "Roll two on Sunday and the second one holds fine to Tuesday if the cheese barrier is there.",
    ],
  },
  {
    slug: "chicken-pasta-broccoli",
    name: "Pasta + grilled chicken + broccoli",
    slot: "lunch",
    servings: 4,
    totalMinutes: 20,
    imageUrl: pexels(5192427),
    whenToEat: "Cooks in 20 min, reheats in a thermos. Pre-portion for the week on Sunday.",
    equipment: ["Large pot", "Skillet or grill pan", "Colander", "Tongs", "4 meal-prep containers"],
    steps: [
      {
        order: 1,
        title: "Boil the pasta",
        body: "Boil 12 oz whole-grain pasta in heavily salted water until al dente, about 9 minutes. Save ½ cup pasta water before draining.",
        timerSec: 540,
        mistake: "Forgetting to salt the water. Salt the water like the sea. Unsalted pasta tastes flat no matter how good the sauce is.",
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
        mistake: "Sealing warm food. Steam condenses inside the lid, drips back, makes everything soggy by day two. Always cool first.",
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
    // Photo removed: showed scrabble tiles spelling BREAKFAST on a snack card.
    whenToEat: "After school, before practice. Enough to stop the 4pm crash without spoiling dinner.",
    equipment: ["Knife", "Small container with two compartments, or two containers"],
    steps: [
      {
        order: 1,
        title: "Pick an apple that survives being cut",
        body: "Honeycrisp, Gala, Fuji and Pink Lady stay crisp for hours after slicing. Red Delicious goes mealy and brown fast and is the reason sliced apples come home untouched.",
      },
      {
        order: 2,
        title: "Slice, then acid",
        body: "Cut 1 medium apple into 8 wedges. Squeeze a lemon wedge over them and toss, or drop them in cold water with a splash of lemon juice for a minute and pat dry. Browning is oxidation, and acid slows it down for a few hours.",
        mistake: "Skipping this for a bag that gets opened at 5pm. Brown apple slices are perfectly safe and get thrown away anyway.",
      },
      {
        order: 3,
        title: "Peanut butter on the side, never spread",
        body: "Two level tablespoons in its own container. Spread onto the slices it soaks in, goes oily, and glues them together by the time the bag is opened.",
      },
    ],
    notes: [
      "Two tablespoons of peanut butter is about 190 calories and 7 g of protein, and it is easy to put four in without noticing. Measure it the first few times.",
      "Check the label for peanuts and salt and nothing else. Plenty of brands add sugar and palm oil.",
      "Leave the skin on. Most of the fiber is there and it holds the wedge together.",
      "Sun butter for a nut-free field. Almond butter is thinner and runs more in the heat.",
    ],
  },
  {
    slug: "cheese-crackers",
    name: "String cheese + whole-grain crackers",
    slot: "snack",
    servings: 1,
    totalMinutes: 1,
    // Photo removed: showed crackers with pepperoni and salsa.
    whenToEat: "The bag snack for the gap between school and a 6pm practice. Eat it in the car, not on the field.",
    equipment: ["Small hard-sided container", "Ice pack or a frozen water bottle"],
    steps: [
      {
        order: 1,
        title: "Freeze the cheese the night before",
        body: "Put 2 string cheeses in the freezer overnight. They thaw in about an hour in a bag and act as their own ice pack on the way. By the time practice starts they are cold and firm instead of greasy and sweating.",
        mistake: "Packing cheese straight from the fridge in July. In a car at 95F it is above safe temperature within the hour, and it tastes like it too.",
      },
      {
        order: 2,
        title: "Portion the crackers, do not send the box",
        body: "Count out 12 to 15 whole-grain crackers into a hard container. That is roughly a half cup and it is the actual serving. A sleeve in the bag becomes a sleeve eaten, and then dinner does not get touched.",
      },
      {
        order: 3,
        title: "Pack them so the crackers stay crackers",
        body: "Cheese and crackers go in separate compartments or separate bags. Cheese gives off moisture as it warms, and soft crackers are the single most common reason this comes home uneaten.",
      },
    ],
    notes: [
      "USDA says perishable food should not sit out more than 2 hours, and only 1 hour above 90F. In a Florida soccer bag treat 1 hour as the limit and pack a cold source.",
      "This is a snack, not a lunch. Crackers and cheese alone do not carry a training day, and a cracker plate is not a meal here.",
      "Check the cracker label for whole grain as the first ingredient. Most boxes that say multigrain on the front list refined flour first.",
      "A string cheese is about 6 to 7 g of protein. Two of them plus the crackers is enough to get through a session without sitting heavy.",
      "If he will not eat plain string cheese, cheddar cut into cubes travels the same way and most kids prefer it.",
    ],
  },
  {
    slug: "yogurt-honey-berries",
    name: "Greek yogurt + honey + berries",
    slot: "snack",
    servings: 1,
    totalMinutes: 2,
    imageUrl: pexels(4006362),
    whenToEat: "After practice, on the drive home. Protein and carbohydrate while he is still hungry and will actually eat.",
    equipment: ["Bowl, or an insulated jar if it is travelling", "Spoon"],
    steps: [
      {
        order: 1,
        title: "Start with frozen berries, on purpose",
        body: "Tip half a cup of frozen mixed berries into the jar first, then a cup of plain Greek yogurt on top. The berries thaw over about an hour and keep the yogurt cold the whole way, which is the difference between this working in a car in August and not.",
      },
      {
        order: 2,
        title: "Honey goes on last, and less than you think",
        body: "Drizzle 1 tbsp honey over the top rather than stirring it through. Sweetness on the surface is what he tastes first, so you get the same effect from less of it.",
        mistake: "Buying flavored yogurt to save the step. A single flavored cup can carry 15 to 20 g of added sugar, which is most of a day for a child, and you lose the ability to dial it back.",
      },
      {
        order: 3,
        title: "Stir it only when he is eating it",
        body: "Stirred yogurt goes thin and watery within about ten minutes. Pack it layered and let him mix it himself.",
      },
    ],
    notes: [
      "The famous 30 minute recovery window is oversold for children. It matters for an adult training twice in a day. For a child who eats dinner a couple of hours later, what counts is that the day as a whole has enough food. Eating soon after is convenient, not urgent.",
      "A cup of plain Greek yogurt runs about 20 g of protein, roughly double regular yogurt, which is why it is worth the swap.",
      "Plain means plain. Vanilla is a flavored yogurt.",
      "Lactose-free Greek yogurt behaves identically here if dairy is a problem.",
    ],
  },
  {
    slug: "banana-almonds",
    name: "Banana + handful of almonds",
    slot: "snack",
    servings: 1,
    totalMinutes: 1,
    // Verified by opening it at full size: a close-up of whole almonds.
    imageUrl:
      "https://images.pexels.com/photos/3939170/pexels-photo-3939170.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&dpr=1",
    whenToEat: "45 to 60 minutes before warm-ups. Not 10 minutes before, the almonds need the time.",
    equipment: ["Small container"],
    steps: [
      {
        order: 1,
        title: "Measure the almonds once, then reuse the container",
        body: "A quarter cup of almonds is about 20 nuts and roughly 200 calories, which is more than most people picture when they say a handful. Fill one small container to the line once and use that same container every time so the portion stops being a guess.",
        mistake: "Eating the almonds straight from the bag. Fat digests slowly, and a big unmeasured handful 20 minutes before running is how you end up with a stomach ache at warm-ups.",
      },
      {
        order: 2,
        title: "Pick the banana by its spots",
        body: "A banana with a few brown freckles is the one you want before a session. Riper means more of the starch has turned to sugar, so it digests faster and tastes sweeter. Save the green-tipped ones for tomorrow.",
      },
      {
        order: 3,
        title: "Split them if the session is soon",
        body: "Inside 30 minutes, eat the banana and skip the almonds. Carbohydrate alone leaves the stomach fastest. Keep the almonds for the ride home, where the fat and protein are actually useful.",
      },
    ],
    notes: [
      "Cramp claims about bananas are overstated. Exercise cramps track with fatigue, heat, and fluid and sodium losses rather than with potassium, and a banana has nowhere near enough potassium to change that. Eat it because it is fast, portable carbohydrate a kid will actually eat.",
      "Raw or dry-roasted, unsalted or lightly salted, all fine. On a hot day a little salt is not a problem.",
      "Sun butter or pumpkin seeds swap in one for one at a nut-free field.",
      "Bananas bruise into mush in a soccer bag. Send it in a hard container or accept what comes back.",
    ],
  },

  // ────────── DINNER ──────────
  {
    slug: "chicken-rice-broccoli",
    name: "Grilled chicken + jasmine rice + broccoli",
    slot: "dinner",
    servings: 4,
    totalMinutes: 30,
    imageUrl: pexels(19938618),
    whenToEat: "The workhorse dinner. Boring on paper, perfect for any day type.",
    equipment: ["Small pot (rice)", "Grill pan or skillet (chicken)", "Steamer or microwave (broccoli)", "Tongs", "Meat thermometer"],
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
        mistake: "Slicing immediately. Skipping the 5-min rest makes the meat dry because all the juices run out on the cutting board.",
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
    imageUrl: pexels(5670958),
    whenToEat: "Omega-3s for recovery + complex carbs for the next day. Best as a rest-day or post-match dinner.",
    equipment: ["Sheet pan", "Non-stick skillet", "Steamer or microwave", "Fish spatula", "Tongs"],
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
        mistake: "Overcooking the salmon. Pull it just before it looks done in the middle. Carryover heat finishes it. Dry salmon ruins the whole meal.",
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
    // Verified by opening it at full size: tacos on corn tortillas with shredded meat, radish and lime.
    imageUrl:
      "https://images.pexels.com/photos/18574183/pexels-photo-18574183.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&dpr=1",
    whenToEat: "Family favorite. Build-your-own bar means less complaining at the table.",
    equipment: ["Large skillet", "Wooden spatula", "Small bowls for toppings"],
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
        mistake: "Skipping the warm tortilla step. Cold tortillas crack when you fold them. Even 10 seconds in the microwave makes them pliable.",
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
    imageUrl: pexels(9460447),
    whenToEat: "Classic carb-load. Eat the night before a match for sustained next-day energy.",
    equipment: ["Large pot", "Large skillet", "Tongs", "Salad bowl", "Colander"],
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
        mistake: "Pouring sauce on plated pasta. Wrong way. Always add the PASTA to the SAUCE in the skillet so the starch and oil bind. Otherwise sauce pools at the bottom.",
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
    imageUrl: pexels(24738520),
    whenToEat: "Same hibachi technique, dinner-portioned. Works for any day type.",
    equipment: ["Small pot (rice)", "Wok or large skillet", "Tongs"],
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
        mistake: "Cooking on medium. Medium just steams the chicken. HIGH heat is non-negotiable for the char.",
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

  // ────────── HIBACHI (signature recipe) ──────────
  {
    slug: "hibachi-chicken",
    name: "Hibachi Chicken (Sunday meal prep)",
    slot: "lunch",
    servings: 8,
    totalMinutes: 25,
    imageUrl: pexels(1860207),
    whenToEat: "One Sunday cook session feeds 5 school lunches plus 3 dinner reheats. The signature Elvis recipe.",
    equipment: ["Large cast iron or stainless steel skillet (or wok)", "Tongs", "5 meal-prep containers", "Sharp knife"],
    steps: [
      {
        order: 1,
        title: "Slice the chicken thin",
        body: "Slice 2 lb boneless skinless chicken breast into thin strips, about ½ inch thick. Thin cuts are the secret. They cook fast, stay juicy, and reheat well in school containers without drying out. Pat dry with paper towels for a better sear.",
        mistake: "Skipping the pat-dry step. Wet chicken steams instead of sears. No char, no flavor.",
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
        mistake: "Stirring the chicken constantly. Don't. Leave it alone for the full 4 minutes so it gets the hibachi char.",
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
  // ────────── ATHLETE OVERNIGHT OATS ──────────
  {
    slug: "athlete-overnight-oats",
    name: "Athlete overnight oats",
    slot: "breakfast",
    servings: 1,
    totalMinutes: 5,
    // Verified by opening it at full size: oats and milk in a white bowl with blueberries and strawberries.
    imageUrl:
      "https://images.pexels.com/photos/566564/pexels-photo-566564.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&dpr=1",
    whenToEat:
      "Best pre-workout breakfast. Make it the night before, eat it 1-2 hours before training. Slow-release carbs from rolled oats plus protein keep energy steady through practice.",
    equipment: ["Mason jar or container with a lid", "Measuring cups", "Spoon"],
    steps: [
      {
        order: 1,
        title: "Combine in a jar",
        body: "Add 1/2 cup rolled oats, 1/2 cup milk (cow, almond, or oat), 1/4 cup plain Greek yogurt, 1 tablespoon chia seeds, and 1 teaspoon honey to a mason jar. Stir well.",
        mistake:
          "Using instant oats. They turn to mush overnight and digest too fast for sustained energy. Steel-cut is the opposite problem: too chewy. Rolled oats are the pre-workout sweet spot.",
      },
      {
        order: 2,
        title: "Add fruit and seal",
        body: "Top with 1/2 sliced banana and a handful of berries. Seal the jar.",
      },
      {
        order: 3,
        title: "Refrigerate overnight",
        body: "Stash in the fridge for at least 6 hours. The oats hydrate, the chia seeds gel, the flavors meld.",
        timerSec: 21600,
      },
      {
        order: 4,
        title: "Eat 1-2 hours before training",
        body: "Pull it out cold or stir in 2 tablespoons hot water to warm it. Eat 60-120 minutes before practice for steady energy without GI distress.",
      },
    ],
    notes: [
      "For athletes 13+ who want more protein, stir in 1 scoop whey or plant protein after the oats hydrate. Adds ~25g protein.",
      "Avoid steel-cut for pre-workout. They take 25+ minutes to cook and don't soften enough overnight to digest cleanly.",
      "Beta-glucan in rolled oats is the slow-release fiber that fuels sustained exercise. Per the Tosh & Bordenave review in Nutrition Reviews, it slows gastric emptying so energy releases over 1-2 hours instead of spiking.",
      "Banana is the right fruit pairing pre-workout: the potassium offsets electrolyte loss from sweat, and the simple sugars top off liver glycogen.",
    ],
    proteinBoost: {
      description: "Add 1 scoop whey or plant protein powder, stirred in after oats hydrate.",
      addedProteinG: 25,
      addedKcal: 120,
      note: "Adult athletes 18+ who train 90+ minutes. Skip for kids under 13. whole-food protein from Greek yogurt is enough at that age.",
    },
  },
];

export const RECIPES_BY_SLUG: Record<string, Recipe> = Object.fromEntries(
  RECIPES.map((r) => [r.slug, r])
);
