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
    // Generated to match this recipe's own ingredients, checked at card size. Stock
    // photo libraries had nothing honest for this dish.
    // Generated to match this recipe's own ingredients, checked at card size. Stock
    // photo libraries had nothing honest for this dish.
    imageUrl: "/images/recipes/cereal-banana-milk.jpg",
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
    // Generated to match this recipe's own ingredients, checked at card size. Stock
    // photo libraries had nothing honest for this dish.
    // Generated to match this recipe's own ingredients, checked at card size. Stock
    // photo libraries had nothing honest for this dish.
    imageUrl: "/images/recipes/eggs-toast.jpg",
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
    // Generated to match this recipe's own ingredients, checked at card size. Stock
    // photo libraries had nothing honest for this dish.
    // Generated to match this recipe's own ingredients, checked at card size. Stock
    // photo libraries had nothing honest for this dish.
    imageUrl: "/images/recipes/berry-smoothie.jpg",
    whenToEat: "School morning when chewing a breakfast is too much to ask. Also fine 60 minutes before training.",
    equipment: ["Blender"],
    steps: [
      {
        order: 1,
        title: "Liquid in first, always",
        body: "One cup of milk goes in before anything else, every time, in every smoothie. The blades need something to move in or the frozen fruit just sits on top spinning air, and you end up adding liquid halfway through and thinning the whole thing out.",
        mistake: "Frozen fruit on the bottom, milk on top. The blender whines, nothing moves, and you have to stop and stir it twice.",
      },
      {
        order: 2,
        title: "Frozen fruit is the ice",
        body: "One cup of frozen mixed berries and half a frozen banana. Do not add ice cubes. Ice melts into water and gives you a thin, faintly pink drink; frozen fruit does the same chilling job and gets more concentrated as it blends, not less.",
      },
      {
        order: 3,
        title: "Spinach now, before the yogurt",
        body: "A cup of spinach on top of the liquid and blend for 20 seconds on its own first. Blended into milk alone it disappears completely. Added at the end with everything else you get green flecks, and green flecks are the whole reason a kid says no.",
        timerSec: 20,
      },
      {
        order: 4,
        title: "Yogurt and honey last, then 45 seconds",
        body: "Half a cup of Greek yogurt and a tablespoon of honey, then blend 45 seconds until there is no texture left at all. Yogurt goes in last because blending it long makes it thin.",
        timerSec: 45,
      },
    ],
    notes: [
      "Frozen berries beat fresh here on cost, on season, and on texture. Buy the big bag.",
      "The spinach is genuinely undetectable when it goes in first with the milk. It is detectable when it does not.",
      "Half a cup of Greek yogurt is about 10 g of protein, which is what turns this from a juice into a breakfast.",
      "Make it the night before and it separates. Shake it hard and it comes back, but it will never be as thick.",
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
    // Generated to match this recipe's own ingredients, checked at card size. Stock
    // photo libraries had nothing honest for this dish.
    // Generated to match this recipe's own ingredients, checked at card size. Stock
    // photo libraries had nothing honest for this dish.
    imageUrl: "/images/recipes/pb-banana-power.jpg",
    whenToEat: "The one for a long practice or a growth spurt. Heaviest smoothie here, so give it 60 to 90 minutes.",
    equipment: ["Blender"],
    steps: [
      {
        order: 1,
        title: "Freeze bananas when they go spotty, not before",
        body: "Peel over-ripe bananas, snap them in half and freeze them in a bag. This is the whole trick to this drink. A frozen ripe banana makes it thick and sweet enough that you do not need much honey, and it saves the bananas nobody was going to eat.",
        mistake: "Freezing bananas in the skin. You cannot peel them once frozen and it is a genuinely miserable five minutes.",
      },
      {
        order: 2,
        title: "Warm the peanut butter spoon",
        body: "Run the tablespoon under hot water before scooping the 2 tbsp of peanut butter. Cold peanut butter comes off the spoon in a lump, hits the frozen banana and seizes into a ball the blades throw around instead of blending.",
      },
      {
        order: 3,
        title: "Milk, oats, peanut butter, then the frozen banana on top",
        body: "One cup of milk, a quarter cup of oats, the peanut butter, half a cup of Greek yogurt, then the frozen banana last so its weight pushes everything down into the blades.",
      },
      {
        order: 4,
        title: "Blend a full minute, longer than feels necessary",
        body: "Sixty seconds. Oats and peanut butter both need real time to disappear, and at 30 seconds it tastes gritty. If the blender is struggling, add milk 2 tbsp at a time rather than all at once.",
        timerSec: 60,
      },
    ],
    notes: [
      "This is the most calorie-dense drink on the site at roughly 415 kcal and 22 g of protein. That is a feature on a heavy training day and too much before a light one.",
      "Peanut butter should list peanuts and salt and nothing else.",
      "Sun butter blends the same way for a nut-free household and tastes slightly stronger, so start with less honey.",
      "Too thick is fixable with milk. Too thin is not fixable without another frozen banana, so start thick.",
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
    // Verified at card size, not just full size: an opaque green smoothie thick enough to
    // read as blended. The previous pick was translucent and looked like green water, which
    // is exactly what a real visitor called it.
    imageUrl:
      "https://images.pexels.com/photos/28909422/pexels-photo-28909422.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&dpr=1",
    whenToEat: "Any morning. The one to make when the week has been light on vegetables.",
    equipment: ["Blender"],
    steps: [
      {
        order: 1,
        title: "Blend the spinach into the milk alone first",
        body: "One cup of milk and two cups of spinach, nothing else, blended 30 seconds until it is a smooth green liquid with no visible pieces. This step is the entire recipe. Spinach blended with frozen fruit never fully breaks down, and what you get is a drink with green bits in it.",
        timerSec: 30,
        mistake: "Loading everything at once. The frozen fruit chills the mix and the spinach stops breaking down, so you can see it. Kids do not drink smoothies they can see the spinach in.",
      },
      {
        order: 2,
        title: "Mango, not berries, and this is deliberate",
        body: "Add one cup of frozen mango. Mango keeps the drink green and tastes sweet enough to carry two cups of spinach. Berries turn a green smoothie a murky grey-brown that looks like pond water, which is a real reason a perfectly good drink gets refused.",
      },
      {
        order: 3,
        title: "Banana, yogurt, hemp, then blend smooth",
        body: "One banana, half a cup of Greek yogurt and a tablespoon of hemp hearts, then 45 seconds until completely smooth. The hemp adds protein and a mild nuttiness without changing the colour.",
        timerSec: 45,
      },
    ],
    notes: [
      "Two cups of spinach wilts to almost nothing and is genuinely undetectable when it goes in first. Taste it before you decide it will not work.",
      "Baby spinach is milder than mature spinach. Kale is not a swap here, it is noticeably bitter and much tougher to break down.",
      "Colour is not a vanity issue with children. Grey-green gets refused and bright green gets drunk, and it is the same drink.",
      "Frozen mango chunks are in every supermarket freezer aisle and cost a fraction of fresh.",
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
    // Generated to match this recipe's own ingredients, checked at card size. Stock
    // photo libraries had nothing honest for this dish.
    // Generated to match this recipe's own ingredients, checked at card size. Stock
    // photo libraries had nothing honest for this dish.
    imageUrl: "/images/recipes/berry-oat-fuel.jpg",
    whenToEat: "Before a long morning session. The oats are what make this last past warm-ups.",
    equipment: ["Blender"],
    steps: [
      {
        order: 1,
        title: "Blend the oats dry, before anything else goes in",
        body: "Half a cup of rolled oats into the dry blender, 15 seconds on high, until it looks like coarse flour. This is the difference between a smooth drink and a gritty one. Oats blended wet stay as flecks that sit on the tongue no matter how long you run it.",
        timerSec: 15,
        mistake: "Adding oats with the liquid. Thirty seconds of extra blending will not fix it, and the grit is the reason oat smoothies get abandoned.",
      },
      {
        order: 2,
        title: "Milk in, then the rest",
        body: "One cup of milk onto the oat flour, then one cup of frozen mixed berries, half a banana, a tablespoon of peanut butter and a tablespoon of honey.",
      },
      {
        order: 3,
        title: "Blend 45 seconds and drink it within about ten minutes",
        body: "Oats keep absorbing liquid after blending, so this thickens noticeably as it sits. At 20 minutes it is closer to a pudding. That is fine in a bowl with a spoon, but it will not go up a straw.",
        timerSec: 45,
      },
    ],
    notes: [
      "Rolled oats, not instant and not steel-cut. Instant goes slimy, steel-cut never softens.",
      "Oats are why this holds through a 90 minute session where a plain fruit smoothie does not.",
      "If it thickens too far, milk loosens it straight back without hurting the flavour.",
      "Elvis does not eat oatmeal, and this is the version that gets around it: same slow carbohydrate, no oatmeal texture.",
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
    // Generated to match this recipe's own ingredients, checked at card size. Stock
    // photo libraries had nothing honest for this dish.
    // Generated to match this recipe's own ingredients, checked at card size. Stock
    // photo libraries had nothing honest for this dish.
    imageUrl: "/images/recipes/vanilla-protein-punch.jpg",
    whenToEat: "The highest-protein drink here with no powder in it. Good breakfast, good after a hard session.",
    equipment: ["Blender"],
    steps: [
      {
        order: 1,
        title: "Cottage cheese and milk alone, 30 seconds, before anything else",
        body: "Half a cup of cottage cheese and one cup of milk, blended by themselves until completely smooth with no lumps at all. Cottage cheese is curds, and curds need time and speed to break down. Blended alongside frozen fruit they never fully go, and the result has a texture people describe as wrong without being able to say why.",
        timerSec: 30,
        mistake: "Trusting that it will smooth out later. It does not. Stop and check this stage looks like cream before adding anything cold.",
      },
      {
        order: 2,
        title: "Now the frozen fruit and the vanilla",
        body: "One frozen banana, half a cup of frozen mango or berries, half a teaspoon of vanilla extract and a tablespoon of honey. The vanilla is doing more work than it looks: it is what makes this taste like a milkshake rather than like blended cheese.",
      },
      {
        order: 3,
        title: "Blend 30 more seconds",
        body: "Thirty seconds is plenty now that the curds are already gone.",
        timerSec: 30,
      },
    ],
    notes: [
      "About 26 g of protein with no protein powder involved, which is more than most powdered shakes and is real food.",
      "Use low-fat rather than fat-free. Fat-free cottage cheese is noticeably more sour and needs more honey to cover.",
      "Nobody who drinks this can tell there is cottage cheese in it, provided step one was done properly. If they can tell, step one was not done properly.",
      "Real vanilla extract, not imitation. It is one of the few places the difference is obvious.",
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
    slot: "breakfast",
    servings: 1,
    totalMinutes: 4,
    // Generated to match this recipe's own ingredients, checked at card size. Stock
    // photo libraries had nothing honest for this dish.
    // Generated to match this recipe's own ingredients, checked at card size. Stock
    // photo libraries had nothing honest for this dish.
    imageUrl: "/images/recipes/tropical-pre-game.jpg",
    whenToEat: "30 to 45 minutes before kickoff or warm-ups. Built deliberately light so it does not sit.",
    equipment: ["Blender"],
    steps: [
      {
        order: 1,
        title: "This one is thin on purpose",
        body: "One cup of orange juice or coconut water as the base, not milk. Close to kickoff you want carbohydrate that leaves the stomach quickly, and fat and protein are the two things that slow that down. This is the one smoothie here that is deliberately not a meal.",
        mistake: "Adding peanut butter or a big scoop of yogurt to make it more filling. That is the right instinct at breakfast and the wrong one 40 minutes before a match, when full is the last thing you want.",
      },
      {
        order: 2,
        title: "Frozen pineapple and mango, half a banana",
        body: "One cup of frozen pineapple and mango together, plus half a banana. Fast carbohydrate, easy to digest, and sharp enough to be refreshing in Florida heat when a creamy drink is unappealing.",
      },
      {
        order: 3,
        title: "Blend 30 seconds and drink it thin",
        body: "Thirty seconds. If it is thick enough to need a spoon, add more juice. It should go down easily and quickly, because standing on a touchline finishing a heavy drink is how you start a match uncomfortable.",
        timerSec: 30,
      },
    ],
    notes: [
      "Roughly 45 g of easy carbohydrate and very little fat, which is the shape a pre-match snack should be.",
      "Coconut water instead of juice brings some potassium and less sugar. Either is fine, so use whichever gets drunk.",
      "This still counts toward fluid for the day, but it is not a substitute for water. Keep drinking normally around it.",
      "Nothing new on a game day. If this has not been tried on a Tuesday, it is not a game day drink yet.",
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
    slot: "breakfast",
    servings: 1,
    totalMinutes: 5,
    // Generated to match this recipe's own ingredients, checked at card size. Stock
    // photo libraries had nothing honest for this dish.
    // Generated to match this recipe's own ingredients, checked at card size. Stock
    // photo libraries had nothing honest for this dish.
    imageUrl: "/images/recipes/chocolate-cherry-recovery.jpg",
    whenToEat: "After a hard session or a match. This is the one that tastes like a treat, which is most of why it works.",
    equipment: ["Blender"],
    steps: [
      {
        order: 1,
        title: "Bloom the cocoa in a splash of warm milk first",
        body: "Put the tablespoon of cocoa powder in the blender with about 2 tbsp of warm milk and swirl it into a paste before adding anything else. Cocoa powder is stubbornly hydrophobic and dumped onto a cold drink it clumps into dry pockets that survive a full minute of blending.",
        mistake: "Tipping dry cocoa on top of frozen cherries. You get brown dust on the surface and chalky lumps at the bottom of the glass.",
      },
      {
        order: 2,
        title: "The rest of the milk, then cherries, banana, yogurt",
        body: "The remaining milk, one cup of frozen pitted cherries, half a banana and half a cup of Greek yogurt. Dark cherries and cocoa cover each other well, which is why this tastes like dessert rather than like a health drink.",
      },
      {
        order: 3,
        title: "Blend 45 seconds",
        body: "Forty-five seconds. Frozen cherries are firmer than berries and need the time.",
        timerSec: 45,
      },
    ],
    notes: [
      "Tart cherries have been studied for muscle soreness and the results are mixed and mostly in adult athletes, with modest effects. Treat it as a nice-tasting way to get carbohydrate and fluid in after a session, not as a treatment.",
      "Unsweetened cocoa powder, not drinking chocolate. Drinking chocolate is mostly sugar and you lose control of the amount.",
      "Chocolate milk has been a standard recovery drink for years for a simple reason: carbohydrate plus protein plus fluid in something children will finish. This is that, with fruit.",
      "Frozen pitted cherries save an argument. Fresh cherries with stones are not worth it in a blender.",
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
    // Generated to match this recipe's own ingredients, checked at card size. Stock
    // photo libraries had nothing honest for this dish.
    // Generated to match this recipe's own ingredients, checked at card size. Stock
    // photo libraries had nothing honest for this dish.
    imageUrl: "/images/recipes/english-muffin-pb.jpg",
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
    // Generated to match this recipe's own ingredients, checked at card size. Stock
    // photo libraries had nothing honest for this dish.
    // Generated to match this recipe's own ingredients, checked at card size. Stock
    // photo libraries had nothing honest for this dish.
    imageUrl: "/images/recipes/turkey-wrap.jpg",
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
    // Generated to match this recipe's own ingredients, checked at card size. Stock
    // photo libraries had nothing honest for this dish.
    // Generated to match this recipe's own ingredients, checked at card size. Stock
    // photo libraries had nothing honest for this dish.
    imageUrl: "/images/recipes/chicken-pasta-broccoli.jpg",
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
    prepAhead: {
      yields: "4 servings. Good cold, which makes it a no-microwave school lunch.",
      keepsDays: 4,
      reheat: "Fine cold straight from the container. Warm it with a splash of water if you prefer.",
    },
  },

  // ────────── SNACK ──────────
  {
    slug: "apple-pb",
    name: "Apple + peanut butter",
    slot: "snack",
    servings: 1,
    totalMinutes: 2,
    // Generated to match this recipe's own ingredients, checked at card size. Stock
    // photo libraries had nothing honest for this dish.
    // Generated to match this recipe's own ingredients, checked at card size. Stock
    // photo libraries had nothing honest for this dish.
    imageUrl: "/images/recipes/apple-pb.jpg",
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
    // Generated to match this recipe's own ingredients, checked at card size. Stock
    // photo libraries had nothing honest for this dish.
    // Generated to match this recipe's own ingredients, checked at card size. Stock
    // photo libraries had nothing honest for this dish.
    imageUrl: "/images/recipes/cheese-crackers.jpg",
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
    // Generated to match this recipe's own ingredients, checked at card size. Stock
    // photo libraries had nothing honest for this dish.
    imageUrl: "/images/recipes/banana-almonds.jpg",
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
    // Generated to match this recipe's own ingredients, checked at card size. Stock
    // photo libraries had nothing honest for this dish.
    // Generated to match this recipe's own ingredients, checked at card size. Stock
    // photo libraries had nothing honest for this dish.
    imageUrl: "/images/recipes/chicken-rice-broccoli.jpg",
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
    prepAhead: {
      yields: "4 dinners, or 2 dinners and 2 packed lunches",
      keepsDays: 4,
      reheat: "Covered, with a spoon of water over the rice. Rice reheats badly dry and fine damp.",
    },
  },
  {
    slug: "salmon-sweet-potato",
    name: "Salmon + sweet potato + green beans",
    slot: "dinner",
    servings: 4,
    totalMinutes: 30,
    // Generated to match this recipe's own ingredients, checked at card size. Stock
    // photo libraries had nothing honest for this dish.
    // Generated to match this recipe's own ingredients, checked at card size. Stock
    // photo libraries had nothing honest for this dish.
    imageUrl: "/images/recipes/salmon-sweet-potato.jpg",
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
    // Generated to match this recipe's own ingredients, checked at card size. Stock
    // photo libraries had nothing honest for this dish.
    // Generated to match this recipe's own ingredients, checked at card size. Stock
    // photo libraries had nothing honest for this dish.
    imageUrl: "/images/recipes/turkey-tacos.jpg",
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
    prepAhead: {
      yields: "Filling for 4 meals. Warm the tortillas fresh each time.",
      keepsDays: 4,
      freezerDays: 90,
      reheat: "Filling in the microwave or a pan. Never store it in the tortilla, it goes to paste.",
    },
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
    prepAhead: {
      yields: "4 servings, and the sauce alone freezes for later weeks",
      keepsDays: 4,
      freezerDays: 90,
      reheat: "Splash of water, covered. Cooked pasta drinks the sauce overnight and needs loosening.",
    },
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
    prepAhead: {
      yields: "4 servings, reheats well in a thermos",
      keepsDays: 3,
      reheat: "Hot pan for a minute beats the microwave here, the vegetables stay crisp.",
    },
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
    prepAhead: {
      yields: "5 school lunches plus 3 dinner reheats",
      keepsDays: 4,
      freezerDays: 60,
      reheat: "Splash of water in the container, microwave covered. The water steams it back instead of drying it out.",
    },
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
    prepAhead: {
      yields: "Make 3 jars at once on Sunday night",
      keepsDays: 3,
      reheat: "Eaten cold. Loosen with a splash of milk, it thickens every day it sits.",
    },
  },
  {
    slug: "hibachi-chicken-bowl",
    name: "Hibachi chicken rice bowl",
    slot: "lunch",
    servings: 1,
    totalMinutes: 5,
    imageUrl: "/images/recipes/hibachi-chicken-bowl.jpg",
    whenToEat: "The school lunch this whole system is built around. Five minutes on Sunday per box, nothing on a weekday.",
    equipment: ["Meal-prep container with a lid", "Small sauce cup"],
    prepAhead: {
      yields: "5 school lunches from one hibachi cook session",
      keepsDays: 4,
      reheat: "Microwave covered with a splash of water. If there is no microwave, it is fine cold.",
    },
    steps: [
      {
        order: 1,
        title: "Rice on the bottom, cold",
        body: "1 cup cooked jasmine rice, spread flat and completely cool before the lid goes on. Warm rice under a lid steams itself and by Tuesday the bottom is gluey.",
        mistake: "Building the box while anything is still warm. Everything cools on a tray first, then it gets assembled.",
      },
      {
        order: 2,
        title: "Chicken beside the rice, not on it",
        body: "About 4 oz of the hibachi chicken alongside rather than on top. Sitting on the rice it sheds sauce downward all week and you get one soggy corner.",
      },
      {
        order: 3,
        title: "Broccoli and carrot in their own corner",
        body: "Half a cup of broccoli and a few carrot sticks in the third corner. Cooked broccoli gives off water as it sits, which is the other thing that ruins the rice.",
      },
      {
        order: 4,
        title: "Sauce travels separately, always",
        body: "Yum-yum or extra soy in a small lidded cup, added at the table. This is the single difference between a lunch that comes back empty and one that comes back half eaten.",
      },
    ],
    notes: [
      "Cook the hibachi chicken recipe once on Sunday and five of these take about twenty minutes total.",
      "Pack the box with an ice pack. USDA says at or below 40F, and a school bag in Florida is not that on its own.",
      "Sesame seeds and a squeeze of lime at the table wake it up on day four.",
      "No microwave at school is fine. Cold hibachi rice is genuinely good, which is more than can be said for most reheated lunches.",
    ],
  },
  {
    slug: "hibachi-bowl-matchday",
    name: "Match-day hibachi bowl (light sauce)",
    slot: "lunch",
    servings: 1,
    totalMinutes: 5,
    imageUrl: "/images/recipes/hibachi-bowl-matchday.jpg",
    whenToEat: "2 to 3 hours before kickoff. His favourite meal, retuned so it does not sit in his stomach.",
    equipment: ["Meal-prep container with a lid"],
    steps: [
      {
        order: 1,
        title: "More rice than usual",
        body: "1 and a quarter cups of jasmine rice instead of one. Before a match the carbohydrate is the point, and white jasmine rice is deliberate here: low fibre, empties from the stomach quickly.",
      },
      {
        order: 2,
        title: "Less oil, and skip the sesame oil entirely",
        body: "Roughly 5 oz of chicken, but take it from the pan before the butter and sesame go in, or rinse the extra sauce off. Fat is the slowest thing to leave the stomach and it is the usual reason a pre-match meal comes back up during warm-ups.",
        mistake: "Serving the full-sauce version because it is his favourite. It is the right food and the wrong dressing for a match day.",
      },
      {
        order: 3,
        title: "Edamame instead of broccoli",
        body: "A quarter cup of shelled edamame. Less fibre than broccoli and it does not give off water, so a box built in the morning still eats well at noon.",
      },
      {
        order: 4,
        title: "One tablespoon of soy, on the food, not in a cup",
        body: "Enough to taste like the meal he likes, not enough to be a salt load. This one goes on before packing because there is no table to assemble at.",
      },
    ],
    notes: [
      "Nothing new on a game day. This works because it is a version of a meal he already eats every week.",
      "2 to 3 hours is the window. Closer than that, cut the chicken back and lean on the rice and a banana.",
      "If the tournament runs long, this is the meal to pack two of. It is the one he reliably finishes.",
      "Low fibre is a match-day choice, not a general one. On a normal school day the broccoli version is the better meal.",
    ],
  },
  {
    slug: "pre-match-plain-plate",
    name: "Chicken + rice, plain",
    slot: "lunch",
    servings: 1,
    totalMinutes: 15,
    imageUrl: "/images/recipes/pre-match-plain-plate.jpg",
    whenToEat: "3 hours before kickoff, on a day where the stomach is already nervous. Deliberately boring.",
    equipment: ["Small saucepan", "Skillet"],
    steps: [
      {
        order: 1,
        title: "Plain white rice, no oil, no seasoning",
        body: "1 and a quarter cups cooked jasmine rice. Nothing on it. This plate exists because a nervous stomach and an unfamiliar flavour is a bad combination an hour before a match.",
      },
      {
        order: 2,
        title: "Chicken cooked dry, salt only",
        body: "About 5 oz of chicken breast in a dry or barely oiled pan, salted, cooked through, sliced. No sauce, no butter, no garlic. Fat and strong flavours are the two things most likely to come back on you.",
        timerSec: 480,
        mistake: "Adding a sauce because it looks sad on the plate. Sad on the plate is the entire design here.",
      },
      {
        order: 3,
        title: "A banana on the side",
        body: "Eaten with the meal or kept for 45 minutes before warm-ups. Easy carbohydrate that nobody has ever struggled to digest.",
      },
    ],
    notes: [
      "This is the plate for a first tournament, an away game, or any day he says his stomach feels funny. It is not meant to be the everyday meal.",
      "Low fat and low fibre is the whole point. Both slow down how fast the stomach empties, and full is the worst way to start a match.",
      "3 hours is the target. If it slips to 90 minutes, halve the chicken and keep the rice.",
      "Boring is a feature. Every ingredient here is one he has eaten a hundred times.",
    ],
  },
  {
    slug: "tournament-sub",
    name: "Tournament turkey sub",
    slot: "lunch",
    servings: 1,
    totalMinutes: 6,
    imageUrl: "/images/recipes/tournament-sub.jpg",
    whenToEat: "Between games at a tournament. Built for a sideline and a cooler, not a table.",
    equipment: ["Knife", "Foil or parchment", "Cooler with ice packs"],
    steps: [
      {
        order: 1,
        title: "Cheese against both faces of the bread",
        body: "A slice of cheddar on the bottom slice and, if you have it, a second on the top. Cheese is the waterproof layer. Lettuce and turkey against bare bread is how a sub becomes wet paper by the second game.",
        mistake: "Dressing it at home. Mayo, mustard and vinaigrette all soak in over four hours in a cooler. Send them in a packet or leave them out.",
      },
      {
        order: 2,
        title: "Turkey folded, not laid flat",
        body: "3 oz of deli turkey folded into loose ruffles rather than pressed in flat sheets. Folded meat gives the sandwich height and structure so it can be eaten one-handed standing up.",
      },
      {
        order: 3,
        title: "Lettuce in the middle of the stack",
        body: "Half a cup of romaine between the turkey layers, never touching the bread. Same rule as the wrap, and the same reason.",
      },
      {
        order: 4,
        title: "Wrap it tight in foil, then chill it hard",
        body: "Roll it in foil and twist the ends. A tightly wrapped sub holds its shape in a bag; a loose one arrives as components. Into the cooler with two ice packs, one under and one on top.",
      },
    ],
    notes: [
      "Deli turkey is perishable. USDA guidance is at or below 40F, and a Florida sideline cooler needs real ice packs, not one thin gel sheet.",
      "Cut it in half before wrapping. Half a sub between games digests better than a whole one, and the second half is there for later.",
      "Whole-grain bread holds up structurally far better than soft white, quite apart from the fibre.",
      "Lower-sodium deli turkey is worth hunting for. A tournament day already carries a lot of salt from everything else in the cooler.",
    ],
  },
  {
    slug: "chicken-quesadilla",
    name: "Chicken quesadilla + peppers",
    slot: "lunch",
    servings: 2,
    totalMinutes: 10,
    imageUrl: "/images/recipes/chicken-quesadilla.jpg",
    whenToEat: "Fast hot lunch on a rest day, or cut into strips for a lunchbox the next morning.",
    equipment: ["Skillet", "Spatula", "Knife"],
    prepAhead: {
      yields: "2 servings. Cooked and cut, they pack cold for two more lunches.",
      keepsDays: 3,
      reheat: "Dry pan, two minutes a side. The microwave turns the tortilla to rubber.",
    },
    steps: [
      {
        order: 1,
        title: "Dry pan first, no oil",
        body: "Heat a skillet over medium with nothing in it. A whole-grain tortilla toasts better dry than oiled, and oil makes the outside greasy before the cheese has melted.",
        mistake: "Cooking on high because it is a quick meal. High heat browns the tortilla in a minute while the middle is still cold cheese.",
      },
      {
        order: 2,
        title: "Cheese, then filling, then cheese",
        body: "Tortilla in the pan, half a slice of cheddar over the whole surface, then about 4 oz of cooked sliced chicken and half a diced bell pepper on one half, then the rest of the cheese on top. Cheese on both sides is the glue. Filling straight onto the tortilla slides out the moment you fold it.",
      },
      {
        order: 3,
        title: "Fold, press, and wait",
        body: "Fold the empty half over and press it flat with a spatula. Two to three minutes a side until the outside is spotted brown and the cheese has actually run. Pressing is what makes it hold together when cut.",
        timerSec: 150,
      },
      {
        order: 4,
        title: "Rest a minute before cutting",
        body: "Straight out of the pan the cheese is liquid and the whole thing collapses. One minute on the board and it cuts into clean wedges.",
      },
    ],
    notes: [
      "Uses leftover hibachi or roast chicken, which is the point. This is the recipe for what is already in the fridge on Wednesday.",
      "Bell pepper adds vitamin C and crunch and is the vegetable most kids will accept inside melted cheese.",
      "Whole-grain tortillas brown better than white and hold a fold without cracking once warm.",
      "Cut cold into strips it packs well, and it is one of the few hot lunches that is genuinely fine at room temperature by noon.",
    ],
  },
  {
    slug: "cold-pasta-salad-chicken",
    name: "Cold pasta salad with chicken",
    slot: "lunch",
    servings: 4,
    totalMinutes: 20,
    imageUrl: "/images/recipes/cold-pasta-salad-chicken.jpg",
    whenToEat: "The no-microwave school lunch. Made Sunday, eaten cold Monday through Wednesday.",
    equipment: ["Large pot", "Colander", "Large bowl", "4 containers"],
    prepAhead: {
      yields: "4 packed lunches from one twenty minute session",
      keepsDays: 4,
      reheat: "None. It is designed to be eaten cold, which is why it works where a thermos does not.",
    },
    steps: [
      {
        order: 1,
        title: "Cook the pasta a minute past al dente, on purpose",
        body: "Whole-grain pasta, one minute longer than the box says. Pasta firms up as it chills, so anything perfectly al dente hot is unpleasantly hard cold. This is the opposite of the rule for a hot dish.",
        timerSec: 600,
      },
      {
        order: 2,
        title: "Rinse it cold, which you would never normally do",
        body: "Drain and rinse under cold water until it stops steaming. Rinsing washes off surface starch, and here that is what you want: it stops the whole bowl gluing into one lump in the fridge.",
        mistake: "Skipping the rinse because rinsing pasta is usually wrong. For a cold salad it is right, and it is the difference between four lunches and one brick.",
      },
      {
        order: 3,
        title: "Broccoli into the same water, briefly",
        body: "Two cups of broccoli florets into the pasta water for 90 seconds before you drain it, then into the cold rinse with everything else. Same pot, no extra pan, and the broccoli stays bright green rather than grey.",
        timerSec: 90,
      },
      {
        order: 4,
        title: "Dress it while it is cold, then let it sit",
        body: "About 12 oz of cooked sliced chicken, 2 tbsp olive oil, the juice of a lemon, salt. Toss and leave it in the fridge an hour before portioning. Cold pasta absorbs dressing slowly, so seasoning it straight away tastes flat.",
      },
      {
        order: 5,
        title: "Portion into four, dress again on day three",
        body: "Four containers. By the third day it will have drunk most of the oil and lemon, so a fresh squeeze at the table brings it back.",
      },
    ],
    notes: [
      "This is the answer to a school with no microwave. Most packed lunches are a compromise cold; this one is designed for it.",
      "Whole-grain pasta holds its shape cold far better than white, which goes mushy by day two.",
      "Add cherry tomatoes or cucumber if he will eat them, but keep them in their own container. Both leak water.",
      "It still needs an ice pack. Cooked chicken is perishable and USDA guidance is at or below 40F.",
    ],
  },
  {
    slug: "egg-cheese-burrito",
    name: "Egg + cheese breakfast burrito for lunch",
    slot: "lunch",
    servings: 4,
    totalMinutes: 15,
    imageUrl: "/images/recipes/egg-cheese-burrito.jpg",
    whenToEat: "For the kid who would eat breakfast at every meal. Wrap four, freeze three.",
    equipment: ["Non-stick skillet", "Spatula", "Foil"],
    prepAhead: {
      yields: "4 burritos: one now and three in the freezer",
      keepsDays: 3,
      freezerDays: 30,
      reheat: "From frozen, unwrap the foil, 90 seconds in the microwave wrapped in a paper towel, turning once.",
    },
    steps: [
      {
        order: 1,
        title: "Low heat and take them off early",
        body: "8 eggs beaten, into a non-stick pan on LOW, stirred slowly. Pull them off while they still look slightly underdone. They keep cooking in the pan, and again when reheated, and twice-overcooked egg is rubbery and weeps water into the tortilla.",
        mistake: "Scrambling on high to save two minutes. Fast egg is dry egg, and dry egg is what makes a reheated burrito unpleasant.",
      },
      {
        order: 2,
        title: "Cool the eggs completely before they go near a tortilla",
        body: "Spread them on a plate and leave them ten minutes. Warm filling steams the tortilla from the inside and it will be soggy before it is even wrapped.",
      },
      {
        order: 3,
        title: "Cheese first, egg second, spinach third",
        body: "Warm tortilla, a slice of cheddar flat against it, then a quarter of the egg, then a small handful of spinach. Cheese against the tortilla again, for the same waterproofing reason as the wrap.",
      },
      {
        order: 4,
        title: "Fold the ends in, roll tight, wrap in foil",
        body: "Ends in first, then roll firmly from the bottom. Foil rather than plastic if they are going in the freezer, because foil goes straight into a toaster oven and does not sweat as it thaws.",
      },
    ],
    notes: [
      "Eggs are the cheapest complete protein in the shop and this is about 20 g a burrito with the cheese.",
      "Freeze on a tray first, then bag them, or they weld into one block.",
      "Spinach can be left out for anyone who will not have it. Everything else still works.",
      "A frozen one packed in the morning is thawed and cool by lunch, and it doubles as the ice pack for the rest of the box.",
    ],
  },
  {
    slug: "sheetpan-chicken-sweet-potato",
    name: "Sheet-pan chicken + sweet potato + green beans",
    slot: "dinner",
    servings: 4,
    totalMinutes: 35,
    imageUrl: "/images/recipes/sheetpan-chicken-sweet-potato.jpg",
    whenToEat: "Training night when nobody wants to cook. One pan in, one pan out, one pan washed.",
    equipment: ["Large sheet pan", "Parchment paper", "Knife"],
    prepAhead: {
      yields: "4 dinners, or 2 dinners and 2 lunches",
      keepsDays: 4,
      reheat: "Back on a hot pan or in the oven. The microwave makes the sweet potato watery.",
    },
    steps: [
      {
        order: 1,
        title: "Cut the sweet potato small and give it a head start",
        body: "Two sweet potatoes into half-inch cubes, tossed with 1 tbsp olive oil and salt, into a 425F oven for 15 minutes on their own. Sweet potato takes about twice as long as chicken breast, and this one gap is why sheet-pan dinners usually come out with either raw potato or dry chicken.",
        timerSec: 900,
        mistake: "Putting everything on the pan at once because it is a one-pan recipe. It is one pan, not one timer.",
      },
      {
        order: 2,
        title: "Hot pan, and leave room between everything",
        body: "Pull the pan out, push the potato to one side, add 1.5 lb of chicken breast cut into large chunks and 2 cups of green beans. Spread everything into a single layer with gaps. Crowded food steams in its own moisture instead of roasting, which is the difference between browned and grey.",
      },
      {
        order: 3,
        title: "Back in for 15 minutes",
        body: "Everything together at 425F for 15 more minutes. The chicken is done at 165F in the middle. Green beans will have blistered in spots, which is what you want.",
        timerSec: 900,
      },
      {
        order: 4,
        title: "Lemon at the end, not the start",
        body: "Squeeze half a lemon over the whole pan out of the oven. Acid added before roasting just evaporates. Added after, it lifts everything and stops it tasting flat.",
      },
    ],
    notes: [
      "Parchment on the pan means the washing up is throwing the paper away, which is most of why this gets cooked on a Tuesday.",
      "425F is not negotiable. Lower and the vegetables release water and stew instead of roasting.",
      "Sweet potato brings a slower carbohydrate than white potato and a lot of vitamin A, and roasted in cubes most kids eat it without argument.",
      "Doubles cleanly onto two pans, swapping shelves halfway. That is Sunday covered as well as Tuesday.",
    ],
  },
  {
    slug: "turkey-meatballs-pasta",
    name: "Turkey meatballs + marinara + whole-grain pasta",
    slot: "dinner",
    servings: 4,
    totalMinutes: 30,
    imageUrl: "/images/recipes/turkey-meatballs-pasta.jpg",
    whenToEat: "The dinner nobody argues about. Make a double batch and freeze half raw.",
    equipment: ["Large pot", "Skillet or baking sheet", "Mixing bowl"],
    prepAhead: {
      yields: "4 dinners, and a second raw batch frozen for a night with no time",
      keepsDays: 4,
      freezerDays: 90,
      reheat: "Meatballs and sauce together in a pan with a splash of water. Cook the pasta fresh, it is 10 minutes.",
    },
    steps: [
      {
        order: 1,
        title: "One egg per pound, and do not skip it",
        body: "1 lb ground turkey, 1 egg, 2 cloves minced garlic, salt and pepper. The egg is the binder. Lean turkey has little fat to hold itself together and without the egg the meatballs crumble into the sauce.",
      },
      {
        order: 2,
        title: "Mix it barely, then stop",
        body: "Combine with your hands until it just comes together, about fifteen seconds. Worked hard, ground meat goes dense and springy, and turkey shows this far more than beef.",
        mistake: "Mixing until it looks perfectly uniform. That is exactly one minute too long and the meatballs come out bouncy.",
      },
      {
        order: 3,
        title: "Wet hands, golf balls, hot pan",
        body: "Wet hands stop the mix sticking. Roll about 16 balls the size of a golf ball. Brown them in a hot skillet for 6 to 8 minutes, turning, or spread on a sheet pan at 400F for 15. They do not need to be cooked through here.",
        timerSec: 420,
      },
      {
        order: 4,
        title: "Finish them in the sauce",
        body: "Two cups of marinara into the pan, meatballs in, lid on, 10 minutes on low. They finish cooking in the sauce, which keeps them moist and puts the turkey flavour into the sauce rather than leaving it in the pan.",
        timerSec: 600,
      },
      {
        order: 5,
        title: "Pasta last, and save a mug of the water",
        body: "Whole-grain pasta to the box time. Before draining, keep a mug of the cooking water and add a splash to the sauce. The starch in it is what makes sauce cling to pasta instead of sliding off into the bottom of the bowl.",
      },
    ],
    notes: [
      "Roll the second batch raw onto a tray, freeze, then bag them. Straight from frozen into sauce with 10 extra minutes and dinner needs no thought at all.",
      "Lean ground turkey is roughly 22 g of protein per 4 oz, comparable to beef with much less saturated fat.",
      "Check the marinara label. Plenty of jars carry 10 g of sugar a serving, and the plain ones taste better anyway.",
      "Whole-grain pasta genuinely matters on a training day. White pasta is gone from the system in about an hour.",
    ],
  },
  {
    slug: "chicken-parm-bake",
    name: "Baked chicken parm + pasta",
    slot: "dinner",
    servings: 4,
    totalMinutes: 30,
    imageUrl: "/images/recipes/chicken-parm-bake.jpg",
    whenToEat: "Post-match Saturday, or the night before a big day. Feels like a treat, is mostly protein.",
    equipment: ["Baking dish", "Large pot", "Meat mallet or heavy pan"],
    prepAhead: {
      yields: "4 servings, and it reheats better than most baked dishes",
      keepsDays: 3,
      reheat: "Covered in the oven at 350F for 15 minutes. Microwaving makes the cheese oily.",
    },
    steps: [
      {
        order: 1,
        title: "Flatten the chicken to an even thickness",
        body: "1.5 lb chicken breast, halved horizontally into thinner cutlets, then pressed to an even half inch under a heavy pan. Even thickness is the whole trick: a breast that is an inch at one end and a quarter inch at the other is always both dry and underdone at once.",
        mistake: "Baking whole thick breasts. The outside overcooks for twenty minutes waiting for the middle, and no amount of sauce fixes dry chicken.",
      },
      {
        order: 2,
        title: "Bake it naked first, sauce comes later",
        body: "Cutlets in a dish, salt, into a 425F oven for 12 minutes. Sauce from the start steams the chicken and it never browns. This is baked rather than breaded and fried, which is most of the fat gone and none of the appeal.",
        timerSec: 720,
      },
      {
        order: 3,
        title: "Sauce and cheese, then just long enough to melt",
        body: "Two cups of marinara spooned over, a slice of cheddar or mozzarella on each cutlet, back in for 6 to 8 minutes until the cheese is melted and bubbling at the edges.",
        timerSec: 420,
      },
      {
        order: 4,
        title: "Pasta underneath, not alongside",
        body: "Serve on whole-grain pasta so the sauce has somewhere to go. A cutlet on a bare plate leaves half the sauce behind.",
      },
    ],
    notes: [
      "About 45 g of protein a serving, which is a lot, and it is the meal most likely to get finished after a match.",
      "Baked and not breaded. The crumb coating is what turns this into a fried dish, and skipping it costs almost nothing in how much he likes it.",
      "165F in the thickest part is done. A thin cutlet gets there fast, so check early rather than late.",
      "Works with leftover roast chicken too: skip to the sauce and cheese step and just heat it through.",
    ],
  },
  {
    slug: "chicken-egg-fried-rice",
    name: "Chicken egg fried rice",
    slot: "dinner",
    servings: 4,
    totalMinutes: 15,
    imageUrl: "/images/recipes/chicken-egg-fried-rice.jpg",
    whenToEat: "Fifteen minutes, and it exists to use up Sunday's rice and chicken. Late practice night.",
    equipment: ["Wok or large skillet", "Spatula"],
    prepAhead: {
      yields: "4 servings, and it is the recipe that turns leftovers into a meal",
      keepsDays: 3,
      reheat: "Hot pan, one minute. Rice reheated twice is fine as long as it was cooled fast the first time.",
    },
    steps: [
      {
        order: 1,
        title: "Cold rice from the fridge, never fresh",
        body: "4 cups of cooked jasmine rice, cold from yesterday. This is the one rule of fried rice. Fresh rice is full of surface moisture and steams into a sticky clump; a night in the fridge dries the grains so they fry and separate.",
        mistake: "Cooking rice specially for this. It will not work, and the dish exists precisely so that yesterday's rice has a job.",
      },
      {
        order: 2,
        title: "Scramble the eggs first, then take them out",
        body: "3 eggs in the hot oiled pan, scrambled loosely, then straight onto a plate. Left in while everything else cooks they turn into brown rubber. They go back at the very end.",
      },
      {
        order: 3,
        title: "Hot pan, carrot and edamame, then the rice",
        body: "Turn the heat to high. 1 tbsp oil, half a cup of diced carrot for 2 minutes, then half a cup of edamame, then the cold rice. Press the rice flat and leave it alone for a minute at a time so it toasts rather than stirring constantly.",
        timerSec: 240,
      },
      {
        order: 4,
        title: "Chicken, soy and sesame at the end",
        body: "About 12 oz of cooked chicken, 2 tbsp low-sodium soy sauce and 1 tsp sesame oil, then the eggs back in. Sesame oil is a finishing oil: heated hard it turns bitter, so it goes in with the heat off.",
      },
    ],
    notes: [
      "Rice that has been left at room temperature for hours should not be used. Cool it fast and refrigerate within an hour, then it is fine the next day.",
      "This is the Wednesday recipe. It is designed around what the Sunday hibachi session leaves behind.",
      "High heat and a pan that is not crowded. Two batches beats one crowded pan every time.",
      "Frozen peas swap for the edamame one for one if that is what is in the freezer.",
    ],
  },
  {
    slug: "turkey-burgers-sweet-potato",
    name: "Turkey burgers + sweet potato wedges",
    slot: "dinner",
    servings: 4,
    totalMinutes: 30,
    imageUrl: "/images/recipes/turkey-burgers-sweet-potato.jpg",
    whenToEat: "Friday night before a Saturday match. Feels like takeaway, is not.",
    equipment: ["Sheet pan", "Skillet or grill pan", "Mixing bowl"],
    prepAhead: {
      yields: "4 dinners. Shape a double batch and freeze the raw patties between parchment.",
      keepsDays: 3,
      freezerDays: 90,
      reheat: "Patties in a covered pan on low. High heat dries a cooked lean patty out very fast.",
    },
    steps: [
      {
        order: 1,
        title: "Wedges in first, they take the longest",
        body: "Two sweet potatoes into wedges, 1 tbsp olive oil, salt, spread out on a sheet pan at 425F for 25 minutes, turning once. Start these before you touch the meat.",
        timerSec: 1500,
      },
      {
        order: 2,
        title: "Thumbprint in the middle of every patty",
        body: "1 lb ground turkey, salt and pepper, shaped into 4 patties slightly wider than the buns, with a deep thumbprint pressed into the centre of each. Burgers swell in the middle as they cook and the dent is what stops you serving four meatballs.",
        mistake: "Pressing the patties down with a spatula while they cook. That squeezes out the juice, and lean turkey has very little to spare.",
      },
      {
        order: 3,
        title: "Cook them once on each side and stop touching them",
        body: "Medium-high pan, 5 to 6 minutes the first side until it releases from the pan on its own, then 4 to 5 minutes the second. Poultry needs 165F in the middle, which is a real food-safety line and not a preference like it is with beef.",
        timerSec: 330,
      },
      {
        order: 4,
        title: "Cheese on in the last minute, lid on",
        body: "Slice of cheddar on each patty, lid on the pan for 60 seconds. The trapped steam melts it properly, where the residual heat alone leaves it half cold.",
        timerSec: 60,
      },
      {
        order: 5,
        title: "Toast the buns in the same pan",
        body: "Buns cut side down in the pan for 30 seconds in the turkey fat. A toasted bun holds together against a juicy patty and an untoasted one goes to pieces halfway through.",
      },
    ],
    notes: [
      "Ground turkey must reach 165F. Unlike beef, a pink turkey burger is not a doneness preference.",
      "93% lean is the sweet spot. 99% lean is dry no matter what you do to it.",
      "Sweet potato wedges roast in the same oven, in the same time, using one pan you were heating anyway.",
      "Freeze raw patties with parchment between them and they separate cleanly straight from the freezer.",
    ],
  },
  {
    slug: "apple-cheddar-cubes",
    name: "Apple slices + cheese",
    slot: "snack",
    servings: 1,
    totalMinutes: 3,
    imageUrl: "/images/recipes/apple-cheddar-cubes.jpg",
    whenToEat: "After school, before homework. Crunch and protein with no cracker in sight.",
    equipment: ["Knife", "Small container"],
    steps: [
      {
        order: 1,
        title: "Cut the cheese into cubes, not slices",
        body: "One slice or about an ounce of sharp cheddar, cut into cubes. Cubes stay separate in a container; slices sweat against each other and weld into one lump by mid-afternoon.",
      },
      {
        order: 2,
        title: "Apple wedges, then lemon",
        body: "One apple into eight wedges, a squeeze of lemon tossed through. Same trick as the peanut butter snack: acid slows the browning for a few hours, which is the difference between eaten and binned.",
        mistake: "Cutting the apple in the morning with no acid. By 3pm it is brown, and brown apple is refused on sight however fine it actually is.",
      },
      {
        order: 3,
        title: "Sharp cheddar, not mild",
        body: "Sharp cheddar against a sweet apple is why this combination works at all. Mild cheddar disappears next to the fruit and the whole thing tastes like just apple.",
      },
    ],
    notes: [
      "Roughly 7 g of protein from the cheese and about 4 g of fibre from the apple, which is a real snack rather than just sugar.",
      "This is deliberately the alternative to the cracker plate. Fruit and cheese does the same job with actual food.",
      "Cheese is perishable. USDA says 2 hours out, 1 above 90F, so an ice pack in a Florida school bag.",
      "Honeycrisp, Fuji and Pink Lady hold up cut. Red Delicious goes mealy within the hour.",
    ],
  },
  {
    slug: "cottage-berries",
    name: "Cottage cheese + berries",
    slot: "snack",
    servings: 1,
    totalMinutes: 2,
    imageUrl: "/images/recipes/cottage-berries.jpg",
    whenToEat: "After a hard session, or before bed on a heavy training week.",
    equipment: ["Bowl", "Spoon"],
    steps: [
      {
        order: 1,
        title: "Small curd, and properly cold",
        body: "Three quarters of a cup of small curd cottage cheese, straight from the fridge. Small curd and very cold is the version kids will eat. Large curd at room temperature is the version that put a generation off cottage cheese entirely.",
        mistake: "Serving it after it has sat out. Warm cottage cheese is a different and much worse food.",
      },
      {
        order: 2,
        title: "Berries on top, whole, not stirred",
        body: "Half a cup of strawberries or mixed berries over the top. Stirred through it goes pink and watery in minutes; left on top it stays a bowl of white with fruit on it, which is what gets eaten.",
      },
      {
        order: 3,
        title: "Honey last, a thin drizzle",
        body: "One teaspoon over the top. Cottage cheese is faintly sour and a small amount of sweetness on the surface is what covers it. You need much less than you would think.",
      },
    ],
    notes: [
      "About 20 g of protein in three quarters of a cup, with no powder involved, which makes this one of the highest-protein snacks on the site.",
      "Low-fat rather than fat-free. Fat-free is noticeably more sour and needs a lot more honey to fix.",
      "Casein in cottage cheese digests slowly, which is the reason it is a common evening snack for athletes.",
      "If the texture is the obstacle, the vanilla cottage cheese smoothie is the same food blended smooth and he will not know.",
    ],
  },
  {
    slug: "edamame-cup",
    name: "Steamed edamame cup",
    slot: "snack",
    servings: 1,
    totalMinutes: 5,
    imageUrl: "/images/recipes/edamame-cup.jpg",
    whenToEat: "Between school and practice. Whole soybeans in the pod, nothing processed about them.",
    equipment: ["Saucepan or microwave-safe bowl", "Colander"],
    steps: [
      {
        order: 1,
        title: "Straight from frozen, five minutes",
        body: "One cup of frozen edamame in the pod into boiling water for 5 minutes, or in a covered bowl in the microwave with a splash of water for 3. Do not thaw them first, they go soft and lose their snap.",
        timerSec: 300,
      },
      {
        order: 2,
        title: "Drain and salt while wet",
        body: "Drain and sprinkle with coarse salt straight away, while the pods are still steaming. The salt sticks to the wet pod and that is where the taste comes from, since you eat the beans and not the shell.",
        mistake: "Salting after they cool, or salting the beans instead of the pods. The pod is the delivery system and a dry pod carries nothing.",
      },
      {
        order: 3,
        title: "Eat them by pulling the pod through your teeth",
        body: "The pod is not eaten. Squeeze or pull it through your teeth and the beans pop out. Worth showing once, because a kid handed a bowl of pods with no explanation just puts it down.",
      },
    ],
    notes: [
      "About 18 g of protein a cup, which is more than most meat snacks the same size.",
      "This is whole soy, and whole soy in the pod is nothing like the processed soy this site avoids. It is a bean, cooked, salted.",
      "Good cold the next day, which makes it a soccer-bag snack as well as a kitchen one.",
      "The plain pods with salt are the version most kids like. Chilli or garlic versions tend to come back untouched.",
    ],
  },
  {
    slug: "pb-banana-toast",
    name: "Peanut butter banana toast",
    slot: "breakfast",
    servings: 1,
    totalMinutes: 4,
    whenToEat: "The 6am breakfast for a kid who is not awake yet. Four minutes, one plate.",
    equipment: ["Toaster", "Butter knife"],
    steps: [
      {
        order: 1,
        title: "Toast it properly dark",
        body: "Two slices of whole-grain bread, toasted until the edges are genuinely brown. Pale toast goes limp under peanut butter within a minute and a limp slice gets left.",
      },
      {
        order: 2,
        title: "Peanut butter while it is hot, banana after",
        body: "One tablespoon per slice, spread while hot so it loosens and goes on thin. Then a banana sliced into coins across both. Peanut butter first is the waterproof layer; banana straight onto toast makes it wet.",
        mistake: "Spreading cold peanut butter on cool toast. It tears the surface, sits in a lump, and takes twice as long.",
      },
      {
        order: 3,
        title: "Cinnamon, if he will have it",
        body: "A pinch over the banana. Costs nothing, makes it taste like a treat, and is the difference between eaten and half eaten in a lot of houses.",
      },
    ],
    notes: [
      "About 400 calories and 14 g of protein for four minutes of work, which is a good trade at 6am.",
      "Whole grain matters here. White toast with sugar-sweetened peanut butter is a fast spike and an early crash.",
      "Cut into fingers rather than triangles for a younger kid. It gets eaten walking to the car.",
      "Sun butter swaps in one for one at a nut-free house.",
    ],
  },
  {
    slug: "cottage-cheese-toast",
    name: "Cottage cheese toast + tomato",
    slot: "breakfast",
    servings: 1,
    totalMinutes: 5,
    whenToEat: "High protein without eggs, for a morning when eggs are not happening.",
    equipment: ["Toaster", "Spoon"],
    steps: [
      {
        order: 1,
        title: "Dark toast, and let it cool for a minute",
        body: "Two slices of whole-grain bread toasted well, then left to cool briefly. Cottage cheese on scorching toast goes runny and slides off.",
      },
      {
        order: 2,
        title: "Half a cup of cottage cheese per slice, pressed down",
        body: "Spoon it on and press it flat with the back of the spoon so it grips the toast rather than sitting in a pile.",
      },
      {
        order: 3,
        title: "Salt, pepper, tomato",
        body: "Sliced tomato on top, then salt and pepper. Cottage cheese is bland and slightly sour on its own, and salt is what turns it into a savoury breakfast rather than a health food.",
        mistake: "Serving it unseasoned. It is the single reason kids decide they do not like cottage cheese.",
      },
    ],
    notes: [
      "About 25 g of protein, which is more than two eggs, with no pan to wash.",
      "Low-fat rather than fat-free. Fat-free is noticeably sourer and needs more salt to cover.",
      "Works with a sliced peach instead of tomato if he prefers sweet, and the protein is identical.",
    ],
  },
  {
    slug: "banana-oat-pancakes",
    name: "Two-ingredient banana oat pancakes",
    slot: "breakfast",
    servings: 2,
    totalMinutes: 15,
    whenToEat: "Saturday morning before a match, or a big batch for the freezer.",
    equipment: ["Blender", "Non-stick skillet", "Spatula"],
    prepAhead: {
      yields: "Double it and freeze a stack with parchment between them",
      keepsDays: 3,
      freezerDays: 60,
      reheat: "Straight from frozen into the toaster. They come out like a toaster waffle.",
    },
    steps: [
      {
        order: 1,
        title: "Blend the oats first, dry",
        body: "One cup of rolled oats alone in the blender for 15 seconds, until it looks like flour. Blended wet they stay gritty, and gritty pancakes are the reason this recipe gets abandoned.",
        timerSec: 15,
      },
      {
        order: 2,
        title: "Everything else in, blend to a batter",
        body: "Two ripe bananas, two eggs, half a cup of milk and a teaspoon of vanilla. Blend 30 seconds. It will be thinner than normal pancake batter and that is correct.",
        timerSec: 30,
      },
      {
        order: 3,
        title: "Medium-low heat, and wait for the bubbles",
        body: "These burn faster than flour pancakes because the banana sugar caramelises. Medium-low, and only flip when bubbles hold their shape on the surface, about 3 minutes.",
        timerSec: 180,
        mistake: "Cooking them at the heat you would use for normal pancakes. Dark outside, raw middle, every time.",
      },
      {
        order: 4,
        title: "Flip once and no more",
        body: "About 2 minutes on the second side. Flipping repeatedly makes them dense, and there is no flour here to save them.",
        timerSec: 120,
      },
    ],
    notes: [
      "No flour and no added sugar. The sweetness is entirely the bananas, so use ones with brown freckles.",
      "About 16 g of protein a serving from the eggs and milk.",
      "They will never be as fluffy as a flour pancake. They are meant to be a bit dense and that is the trade for what is in them.",
      "Freeze flat on a tray first, then stack with parchment, or they weld together.",
    ],
  },
  {
    slug: "yogurt-bark",
    name: "Frozen yogurt bark",
    slot: "snack",
    servings: 6,
    totalMinutes: 10,
    whenToEat: "Hot afternoon after school. Made once, eaten all week.",
    equipment: ["Sheet pan", "Parchment paper", "Spatula"],
    prepAhead: {
      yields: "About 6 snack portions from one tray",
      keepsDays: 30,
      freezerDays: 30,
      reheat: "None. Eaten straight from the freezer, which is the point in August.",
    },
    steps: [
      {
        order: 1,
        title: "Parchment first, or you will never get it off",
        body: "Line a sheet pan with parchment. Yogurt frozen directly onto metal is genuinely stuck, and this is the step people skip once.",
      },
      {
        order: 2,
        title: "Two cups of yogurt, spread thin",
        body: "Plain Greek yogurt mixed with 2 tbsp honey, spread about a quarter inch thick. Thicker than that and it is too hard to bite; thinner and it shatters into dust.",
      },
      {
        order: 3,
        title: "Fruit pressed in, not scattered on",
        body: "A cup of berries pressed down into the surface. Sitting on top they snap off the moment it is broken up.",
        mistake: "Adding fruit with a lot of water in it, like melon or orange. It freezes into ice chips rather than fruit.",
      },
      {
        order: 4,
        title: "Freeze four hours, then break it up",
        body: "Four hours minimum. Break it into rough pieces by hand and keep them in a bag in the freezer.",
      },
    ],
    notes: [
      "This is the snack that competes with ice cream, and it is Greek yogurt and fruit.",
      "About 8 g of protein a portion, which is more than most frozen treats have.",
      "Do not use flavoured yogurt. It is already sweet, and with the honey it becomes a dessert.",
      "It softens fast in Florida. It is a kitchen snack rather than a soccer bag one.",
    ],
  },
  {
    slug: "trail-mix-jar",
    name: "Make your own trail mix",
    slot: "snack",
    servings: 8,
    totalMinutes: 5,
    whenToEat: "The bag snack you make once a month. Portioned, not eaten from the tub.",
    equipment: ["Large jar or container", "Small bags or containers"],
    prepAhead: {
      yields: "8 portions from one five minute session",
      keepsDays: 30,
      reheat: "None.",
    },
    steps: [
      {
        order: 1,
        title: "One part nuts, one part dried fruit, half a part something fun",
        body: "Two cups of raw almonds, two cups of raisins or dried cherries, one cup of dark chocolate chips. That ratio is the whole recipe, and the chocolate is not optional in practice: mix without it comes back uneaten.",
      },
      {
        order: 2,
        title: "Portion it immediately into a quarter cup each",
        body: "Eight small bags or containers, a quarter cup in each, done while the big jar is open. A quarter cup is about 200 calories, and trail mix eaten by the handful from a tub is one of the easiest ways to eat 700 without noticing.",
        mistake: "Sending the big jar. It is nutritionally fine and portionally a disaster.",
      },
    ],
    notes: [
      "Nuts and dried fruit are both calorie dense on purpose. That is useful before a long session and easy to overdo on the sofa.",
      "Buy unsalted or lightly salted. On a hot training day a little salt is genuinely helpful.",
      "Dried fruit is sticky and does stick to teeth, so it is better before brushing than after.",
      "Pumpkin seeds and sunflower seeds swap in for a nut-free team.",
    ],
  },
  {
    slug: "hummus-veg-cup",
    name: "Hummus + veg sticks",
    slot: "snack",
    servings: 1,
    totalMinutes: 4,
    whenToEat: "After school. The one that puts a vegetable into a day that had none.",
    equipment: ["Knife", "Container with two compartments"],
    steps: [
      {
        order: 1,
        title: "Cut the sticks the night before, store them in water",
        body: "Carrot and bell pepper cut into sticks, kept submerged in cold water in the fridge. They stay crisp for days that way, where cut and left dry they go dry and pale by the next afternoon.",
      },
      {
        order: 2,
        title: "Quarter cup of hummus, its own compartment",
        body: "Never poured over the vegetables. Sitting in hummus for six hours they go soft, and soft carrot is refused on texture alone.",
        mistake: "Pre-dipping to save a container. It is the single reason this snack comes home.",
      },
      {
        order: 3,
        title: "Drain and pat dry at packing time",
        body: "Take them out of the water, pat dry, then into the box. Wet sticks make everything else in the container wet.",
      },
    ],
    notes: [
      "About 6 g of protein and 5 g of fibre, which is more than a cracker snack does.",
      "Chickpeas are not soy, and hummus is whole food. Check the label for olive oil rather than a seed oil blend if you care about that.",
      "Cucumber works but goes watery in a container faster than carrot or pepper.",
      "It still needs an ice pack. Hummus is perishable.",
    ],
  },
  {
    slug: "boiled-eggs-batch",
    name: "Batch of boiled eggs",
    slot: "snack",
    servings: 6,
    totalMinutes: 15,
    whenToEat: "The Sunday job that makes six snacks. Grab one on the way out the door.",
    equipment: ["Saucepan", "Slotted spoon", "Bowl of ice water"],
    prepAhead: {
      yields: "6 snacks from one pot",
      keepsDays: 7,
      reheat: "None. Eaten cold, peeled or not.",
    },
    steps: [
      {
        order: 1,
        title: "Into already boiling water, not cold",
        body: "Bring the water to a boil first, then lower the eggs in with a spoon. Started in cold water the shell bonds to the white and peeling destroys them. Started in boiling water they peel cleanly.",
        mistake: "The cold-water start most recipes give. It works for the cooking and ruins the peeling, and unpeelable eggs do not become snacks.",
      },
      {
        order: 2,
        title: "Eleven minutes for a firm yolk",
        body: "Eleven minutes at a gentle boil gives a fully set yolk with no grey ring. Nine gives a slightly soft centre, which does not travel as well.",
        timerSec: 660,
      },
      {
        order: 3,
        title: "Straight into ice water for five minutes",
        body: "This stops the cooking and shrinks the egg away from the shell. It is the other half of why they peel cleanly.",
        timerSec: 300,
      },
      {
        order: 4,
        title: "Store them unpeeled",
        body: "They keep a week in the fridge in their shells and about two days peeled. Peel at eating time.",
      },
    ],
    notes: [
      "6 g of protein each, about 70 calories, and one of the cheapest protein sources in the shop.",
      "Eggs are perishable. They need an ice pack in a bag, same as everything else.",
      "A little salt and pepper in a twist of foil turns two eggs into a snack a kid will actually finish.",
      "Older eggs peel more easily than fresh ones, which is the one time the back of the carton helps you.",
    ],
  },
  {
    slug: "smoothie-freezer-packs",
    name: "Freezer smoothie packs",
    slot: "breakfast",
    servings: 5,
    totalMinutes: 15,
    whenToEat: "Not a smoothie. The Sunday job that makes five weekday smoothies take 90 seconds.",
    equipment: ["5 freezer bags or jars", "Measuring cup"],
    prepAhead: {
      yields: "5 mornings, each 90 seconds",
      keepsDays: 90,
      freezerDays: 90,
      reheat: "Tip a bag into the blender with a cup of milk and blend.",
    },
    steps: [
      {
        order: 1,
        title: "Five bags, same thing in each",
        body: "Into every bag: half a frozen banana, one cup of frozen fruit, a handful of spinach, and a tablespoon of whatever seed you use. Line them up and fill them assembly-line rather than one at a time.",
      },
      {
        order: 2,
        title: "No liquid and no yogurt in the bag",
        body: "Milk and yogurt go in at blending time. Frozen into the bag they become a solid brick the blender cannot start on, and yogurt separates on thawing.",
        mistake: "Making complete smoothies and freezing them. They separate, they never blend back properly, and the texture is wrong.",
      },
      {
        order: 3,
        title: "Flatten the bags before freezing",
        body: "Press the air out and lay them flat. They stack, they thaw evenly, and they fit in a normal freezer instead of taking a shelf.",
      },
      {
        order: 4,
        title: "On the day: bag, milk, yogurt, blend",
        body: "Tip a bag in, add a cup of milk and half a cup of Greek yogurt, blend 45 seconds. Ninety seconds from freezer to glass, which is what makes it happen on a Tuesday.",
        timerSec: 45,
      },
    ],
    notes: [
      "This is the highest-leverage fifteen minutes in the week. Five breakfasts that otherwise get skipped.",
      "Any of the smoothie recipes here can be packed this way. Keep the liquid and the dairy out of the bag.",
      "Label the bags if you make different ones, because frozen fruit all looks the same at 6am.",
      "Frozen fruit is cheaper than fresh and better here, since you want it frozen anyway.",
    ],
  },
  {
    slug: "overnight-oats-chocolate",
    name: "Chocolate overnight oats",
    slot: "breakfast",
    servings: 1,
    totalMinutes: 5,
    whenToEat: "For the kid who says he does not like oats. Made the night before.",
    equipment: ["Jar with a lid", "Spoon"],
    prepAhead: {
      yields: "Make 3 jars at once on Sunday night",
      keepsDays: 3,
      reheat: "Eaten cold. A splash of milk loosens it, since it thickens every day.",
    },
    steps: [
      {
        order: 1,
        title: "Cocoa into the milk first, as a paste",
        body: "One tablespoon of unsweetened cocoa with about 2 tbsp of the milk, stirred into a smooth paste before anything else goes in. Cocoa dumped onto cold oats clumps into dry pockets that survive the whole night.",
        mistake: "Adding the cocoa last with everything else. You get brown dust on top and chalky lumps at the bottom.",
      },
      {
        order: 2,
        title: "Oats, the rest of the milk, yogurt, honey",
        body: "Half a cup of rolled oats, the rest of the cup of milk, a quarter cup of Greek yogurt, a tablespoon of honey, and a tablespoon of chia seeds. Stir properly, not just on the surface.",
      },
      {
        order: 3,
        title: "Lid on, fridge, at least six hours",
        body: "Overnight is ideal. Under four hours the oats are still chewy and the chia has not gelled, which is the texture people mean when they say they do not like overnight oats.",
      },
      {
        order: 4,
        title: "Banana in the morning, not the night before",
        body: "Sliced banana on top at eating time. Left in overnight it goes brown and slimy, and it is the thing most likely to get the whole jar rejected.",
      },
    ],
    notes: [
      "Elvis does not eat oatmeal, and this is one of the two versions that gets around it. Cold, chocolate, and nothing like a bowl of porridge.",
      "Unsweetened cocoa, not drinking chocolate, which is mostly sugar.",
      "About 16 g of protein with the yogurt, and the oats are why it holds until lunch.",
      "Three jars on a Sunday night is about eight minutes and covers half the school week.",
    ],
  },
  {
    slug: "apple-nachos",
    name: "Apple nachos",
    slot: "snack",
    servings: 1,
    totalMinutes: 5,
    whenToEat: "After school when he wants something that feels like a treat.",
    equipment: ["Knife", "Plate", "Small microwave-safe bowl"],
    steps: [
      {
        order: 1,
        title: "Slice thin and fan them out",
        body: "One apple into thin slices, spread flat on a plate rather than piled. This is a presentation trick and it is most of the recipe: the same apple and peanut butter, arranged like nachos, gets eaten when a whole apple does not.",
      },
      {
        order: 2,
        title: "Warm the peanut butter so it drizzles",
        body: "Two tablespoons in a small bowl, 15 seconds in the microwave, stirred. Warm it pours in a thin stream over everything instead of sitting in one lump on one slice.",
        timerSec: 15,
      },
      {
        order: 3,
        title: "Toppings, sparingly",
        body: "A tablespoon of granola for crunch, a few dark chocolate chips, a sprinkle of cinnamon. Sparingly is doing work here, because past a point this stops being fruit with peanut butter.",
      },
    ],
    notes: [
      "Same food as apple and peanut butter, which is already on this site, arranged differently. That is not a criticism, it is the entire point.",
      "Eaten immediately. It does not pack, and drizzled peanut butter in a lunchbox is a mess.",
      "About 12 g of protein and 6 g of fibre.",
      "A crisp apple matters more here than usual, because the slices are thin. Honeycrisp or Fuji.",
    ],
  },
];

export const RECIPES_BY_SLUG: Record<string, Recipe> = Object.fromEntries(
  RECIPES.map((r) => [r.slug, r])
);
