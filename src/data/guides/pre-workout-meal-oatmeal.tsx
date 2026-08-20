import type { Guide } from "@/types/domain";
import Link from "next/link";
import { citationsList } from "@/data/citations";
import { Cite } from "@/components/guide/GuideCitations";

export const guide: Guide = {
  slug: "pre-workout-meal-oatmeal",
  title: "Pre-Workout Meal Oatmeal: The Athlete's Guide to Timing, Portions, and Recipes",
  metaTitle: "Pre-Workout Meal Oatmeal: Timing, Portions & Recipes",
  metaDescription:
    "Oatmeal is one of the best pre-workout meals. Here's the timing window, the right portion by body weight, the type of oats to use, and athlete-tested recipes.",
  primaryKeyword: "pre workout meal oatmeal",
  category: "pre-workout",
  publishedAt: "2026-05-21",
  updatedAt: "2026-05-21",
  readMinutes: 9,
  answer:
    "Oatmeal is one of the best pre-workout meals because its complex carbohydrates and beta-glucan fiber release energy slowly across a workout. Eat 1/2 to 1 cup of cooked rolled oats 1-2 hours before training, paired with 15-20 grams of protein like Greek yogurt or a boiled egg. Skip steel-cut and high-fiber oat types within 90 minutes of exercise.",
  sections: [
    {
      id: "why-oatmeal",
      heading: "Why oatmeal is a top pre-workout meal",
      body: (
        <>
          <p>
            Three things make oatmeal an excellent pre-workout meal: the carbohydrate profile, the
            beta-glucan fiber, and the timing tolerance. Rolled oats are roughly 60% complex
            carbohydrates by weight, which is the macronutrient muscles use first during
            moderate-to-high intensity exercise. The American College of Sports Medicine&apos;s
            joint position stand on nutrition and athletic performance recommends 1-4 grams of
            carbohydrate per kilogram of body weight 1-4 hours before exercise<Cite id="ACSM-2016" />,
            and a standard cup of cooked oats delivers ~28 grams in a digestible form.
          </p>
          <p className="mt-3">
            The second reason is beta-glucan, a soluble fiber that slows gastric emptying. The 2020
            Nutrition Reviews paper by Tosh and Bordenave confirmed that beta-glucan releases
            glucose into the bloodstream over 1-2 hours rather than spiking and crashing
            <Cite id="Beta-Glucan" />. That steady release is exactly what you want during a
            soccer practice, a long run, or a lift session that runs past an hour.
          </p>
          <p className="mt-3">
            The third reason is digestibility. Oatmeal is one of the few pre-workout meals that
            works across the 30-minute to 3-hour timing window. Higher-fat or higher-protein meals
            need at least 2-3 hours to clear the stomach. Oatmeal at 1-2 hours hits the sweet
            spot.
          </p>
        </>
      ),
    },
    {
      id: "timing",
      heading: "Pre-workout oatmeal timing: how long before you train",
      body: (
        <>
          <p>
            The right timing depends on the size of the bowl and the intensity of the workout:
          </p>
          <ul className="mt-3 ml-5 flex list-disc flex-col gap-2">
            <li>
              <strong>3 hours before:</strong> a full meal: 1 cup cooked oats, 1/2 cup Greek
              yogurt, fruit, nuts. Gives carbohydrates time to convert to glycogen and clears the
              stomach before any high-intensity work.
            </li>
            <li>
              <strong>1-2 hours before:</strong> the sweet spot for most athletes. 1/2 to 3/4 cup
              cooked rolled oats with banana and a tablespoon of nut butter. This is the timing
              window the International Society of Sports Nutrition position stand on nutrient
              timing endorses for endurance work<Cite id="ISSN-Timing" />.
            </li>
            <li>
              <strong>30-60 minutes before:</strong> a small portion: 1/4 to 1/3 cup cooked rolled
              oats with a teaspoon of honey, no fat, no fiber-bomb toppings. Light enough not to
              sit heavy.
            </li>
            <li>
              <strong>Under 30 minutes:</strong> skip oatmeal. Reach for a banana, a date, or a
              piece of toast with honey instead.
            </li>
          </ul>
          <p className="mt-3">
            For morning training, overnight oats are the cleanest answer because they hydrate
            overnight and digest faster than freshly cooked oats. See our{" "}
            <Link href="/recipe/athlete-overnight-oats" className="text-primary underline">
              athlete overnight oats recipe
            </Link>{" "}
            for the make-ahead version.
          </p>
        </>
      ),
    },
    {
      id: "type-of-oats",
      heading: "Rolled, steel-cut, quick, or overnight: which type for pre-workout",
      body: (
        <>
          <p>
            Not all oats fuel a workout the same way. The difference is how quickly the body breaks
            them down:
          </p>
          <div className="mt-4 overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-primary-soft/40 text-ink">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold">Oat type</th>
                  <th className="px-3 py-2 text-left font-semibold">Pre-workout fit</th>
                  <th className="px-3 py-2 text-left font-semibold">Why</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-t border-border">
                  <td className="px-3 py-2 font-medium text-ink">Rolled oats</td>
                  <td className="px-3 py-2">Best</td>
                  <td className="px-3 py-2">Steady release, 1-2 hour timing window</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-3 py-2 font-medium text-ink">Overnight oats</td>
                  <td className="px-3 py-2">Best (morning)</td>
                  <td className="px-3 py-2">Pre-hydrated, easiest on the stomach</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-3 py-2 font-medium text-ink">Quick oats</td>
                  <td className="px-3 py-2">OK</td>
                  <td className="px-3 py-2">Faster digestion, less sustained energy</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-3 py-2 font-medium text-ink">Steel-cut</td>
                  <td className="px-3 py-2">Avoid pre-workout</td>
                  <td className="px-3 py-2">High fiber, 30+ min cook time, GI distress risk</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-3 py-2 font-medium text-ink">Instant flavored</td>
                  <td className="px-3 py-2">Avoid</td>
                  <td className="px-3 py-2">Added sugar spikes and crashes</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4">
            For most athletes, plain rolled oats win. Steel-cut delivers more fiber than you need
            within an hour of training and can cause cramping during high-intensity work. Instant
            packets crash energy from the sugar load.
          </p>
        </>
      ),
    },
    {
      id: "portion-by-weight",
      heading: "How much oatmeal: portion math by body weight",
      body: (
        <>
          <p>
            Pre-workout carbohydrate intake should scale with body weight and workout duration.
            ACSM&apos;s 2016 position stand specifies 1-4 grams of carbohydrate per kilogram of body
            weight 1-4 hours before exercise<Cite id="ACSM-2016" />. For a 1-2 hour pre-workout
            meal, 1-2 g/kg is the target range. Here is the oatmeal math:
          </p>
          <div className="mt-4 overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-primary-soft/40 text-ink">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold">Body weight</th>
                  <th className="px-3 py-2 text-left font-semibold">Carbs target (1-2 g/kg)</th>
                  <th className="px-3 py-2 text-left font-semibold">Cooked oats</th>
                  <th className="px-3 py-2 text-left font-semibold">Add to hit target</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-t border-border">
                  <td className="px-3 py-2 font-medium text-ink">80 lb (36 kg)</td>
                  <td className="px-3 py-2">36-72 g</td>
                  <td className="px-3 py-2">1/2 cup (28 g)</td>
                  <td className="px-3 py-2">1 banana + 1 tbsp honey</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-3 py-2 font-medium text-ink">120 lb (54 kg)</td>
                  <td className="px-3 py-2">54-108 g</td>
                  <td className="px-3 py-2">3/4 cup (42 g)</td>
                  <td className="px-3 py-2">1 banana + 1/2 cup berries</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-3 py-2 font-medium text-ink">170 lb (77 kg)</td>
                  <td className="px-3 py-2">77-154 g</td>
                  <td className="px-3 py-2">1 cup (56 g)</td>
                  <td className="px-3 py-2">1 banana + 1/2 cup yogurt + honey</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-3 py-2 font-medium text-ink">220 lb (100 kg)</td>
                  <td className="px-3 py-2">100-200 g</td>
                  <td className="px-3 py-2">1.5 cups (84 g)</td>
                  <td className="px-3 py-2">Banana + yogurt + 2 tbsp peanut butter</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4">
            Note: cooked rolled oats are roughly 28 grams of carbohydrate per 1/2 cup per USDA
            FoodData Central<Cite id="USDA-FoodData" />. Toppings carry the rest of the carb load
            for larger athletes, that&apos;s the role of the banana, honey, or fruit.
          </p>
        </>
      ),
    },
    {
      id: "what-to-add",
      heading: "What to add to oatmeal: the 2:1 carb-to-protein build",
      body: (
        <>
          <p>
            Plain oats lack protein. For a complete pre-workout meal at 1-2 hours out, layer in
            15-20 grams of protein at roughly a 2:1 to 3:1 carb-to-protein ratio per ISSN&apos;s
            nutrient timing position stand<Cite id="ISSN-Timing" />. The cleanest combinations:
          </p>
          <ul className="mt-3 ml-5 flex list-disc flex-col gap-2">
            <li>
              <strong>Greek yogurt (1/2 cup):</strong> +12 g protein, low fat, easy on the stomach
            </li>
            <li>
              <strong>2 egg whites or 1 whole egg:</strong> +6-7 g protein, classic athlete combo
            </li>
            <li>
              <strong>1 scoop whey protein:</strong> +25 g protein (adults 18+ only, see kid
              section below)
            </li>
            <li>
              <strong>1 tablespoon peanut butter or almond butter:</strong> +4 g protein + healthy
              fats
            </li>
            <li>
              <strong>1 tablespoon hemp hearts or chia seeds:</strong> +3-5 g protein + omega-3s
            </li>
          </ul>
          <p className="mt-3">
            Fruit toppings add fast-acting carbohydrates that complement the slow release of the
            oats. Bananas are the classic pairing, they also deliver potassium that offsets
            sodium loss during sweaty workouts.
          </p>
        </>
      ),
    },
    {
      id: "mistakes",
      heading: "Common pre-workout oatmeal mistakes",
      body: (
        <>
          <ul className="ml-5 flex list-disc flex-col gap-2">
            <li>
              <strong>Too much fiber.</strong> Adding chia, flax, raspberries, AND steel-cut oats
              stacks soluble fiber past what the gut can clear in an hour. Cramps and bathroom
              sprints follow. Cap fiber additions at one source for pre-workout.
            </li>
            <li>
              <strong>Too late.</strong> A full bowl of oatmeal 30 minutes before a workout sits in
              the stomach when blood is being shunted to working muscle. The result is sluggishness
              and reflux.
            </li>
            <li>
              <strong>Too much fat.</strong> A heaping spoon of peanut butter plus full-fat yogurt
              plus avocado slows digestion past the timing window. One fat source is enough.
            </li>
            <li>
              <strong>Sugary instant packets.</strong> Brown-sugar-and-maple flavored packets spike
              blood sugar and crash before the workout even starts. Stick to plain rolled oats
              with real fruit.
            </li>
            <li>
              <strong>Skipping protein entirely.</strong> Carbs alone leave you hungry and protein
              synthesis lagging. The ISSN protein position stand calls for 0.4-0.55 g/kg per meal
              for athletes<Cite id="ISSN-Protein" />, at least one protein source belongs in the
              bowl.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "youth",
      heading: "Pre-workout oatmeal for young athletes 8 and up",
      body: (
        <>
          <p>
            Oatmeal is one of the safest pre-workout meals for young athletes, high in complex
            carbohydrates, naturally low in saturated fat, and within the dietary patterns the
            AAP&apos;s Bright Futures Sports Nutrition guidance endorses for active children
            <Cite id="AAP-Bright-Futures" />. Some specifics for the 8-17 age band:
          </p>
          <ul className="mt-3 ml-5 flex list-disc flex-col gap-2">
            <li>
              <strong>Skip protein powder.</strong> Children under 13 should hit protein targets
              with whole foods (Greek yogurt, milk, eggs, nut butter), not powder. Per AAP
              guidance, supplement marketing aimed at youth is not appropriate without medical
              oversight<Cite id="AAP-Promotion" />.
            </li>
            <li>
              <strong>Smaller portions.</strong> A 10-year-old at 80 lb needs about 1/2 cup cooked
              oats with banana, not a full adult bowl. Use the portion table above.
            </li>
            <li>
              <strong>Hydrate first.</strong> Kids show up to morning practice dehydrated more
              often than adults. Per NATA&apos;s position statement on fluid replacement, 8-16 oz
              of water with the meal is the floor<Cite id="NATA-Fluid" />. Our{" "}
              <Link href="/planner" className="text-primary underline">
                hydration tracker
              </Link>{" "}
              calculates the exact daily target by body weight and day type.
            </li>
            <li>
              <strong>No caffeine add-ins.</strong> Cocoa nibs and coffee-grounds toppings are
              trendy in adult pre-workout content. AAP&apos;s clinical report on caffeinated
              products explicitly recommends against routine caffeine for children and
              adolescents<Cite id="AAP-Sports-Nutrition" />.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "recipes",
      heading: "Pre-workout oatmeal recipes",
      body: (
        <>
          <p>
            We have three oatmeal-based pre-workout recipes ready in the recipe library. Each one
            scales with the portion math above and links to the planner so you can drop it into a
            training day with one tap:
          </p>
          <ul className="mt-3 ml-5 flex list-disc flex-col gap-2">
            <li>
              <Link href="/recipe/athlete-overnight-oats" className="text-primary underline hover:text-ink"
              >
                Athlete overnight oats
              </Link>: make-ahead version for morning training. Rolled oats, Greek yogurt, banana, chia,
              honey.
            </li>
            <li>
              <Link href="/recipe/berry-oat-fuel" className="text-primary underline hover:text-ink">
                Berry oat fuel smoothie
              </Link>: same nutrients, blender format. Drinkable, faster pre-practice.
            </li>
            <li>
              <Link href="/recipe/chocolate-cherry-recovery" className="text-primary underline hover:text-ink"
              >
                Chocolate cherry oats
              </Link>: tart cherry + cocoa angle. Works as a pre-workout when light, recovery when
              loaded.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "hydration",
      heading: "Hydration with your pre-workout meal",
      body: (
        <>
          <p>
            Oatmeal absorbs water as it cooks, which means it can pull fluid from the gut as you
            digest it. Pair the bowl with at least 8-16 oz of water at the meal and another 8 oz
            in the 30 minutes before training. NATA&apos;s 2017 fluid replacement statement
            recommends athletes start training in a euhydrated state, which translates to clear or
            light-yellow urine 2 hours before exercise<Cite id="NATA-Fluid" />.
          </p>
          <p className="mt-3">
            The FuelMyAthlete{" "}
            <Link href="/planner" className="text-primary underline">
              hydration tracker
            </Link>{" "}
            calculates daily targets by age, body weight, and day type using AAP pediatric formulas
            for children and ACSM body-weight scaling for adults. It also adjusts for hot weather,
            which is the single biggest reason pre-workout hydration goes sideways in the summer.
          </p>
        </>
      ),
    },
  ],
  faq: [
    {
      question: "Is oatmeal a good pre-workout meal?",
      answer:
        "Yes. Rolled oats deliver slow-release complex carbohydrates and beta-glucan fiber that fuel exercise without a sugar crash. Eat 1/2 to 1 cup of cooked oats 1-2 hours before training with 15-20 grams of protein for a complete pre-workout meal.",
    },
    {
      question: "How long before a workout should I eat oatmeal?",
      answer:
        "1-2 hours is the sweet spot for most athletes. 3 hours before for a full bowl with toppings, 30-60 minutes for a small portion without fat or fiber-heavy add-ins. Under 30 minutes, skip oatmeal in favor of a banana or toast.",
    },
    {
      question: "Is oatmeal better before or after a workout?",
      answer:
        "Both work. Pre-workout, oatmeal fuels exercise with slow-release carbs. Post-workout, oatmeal pairs with protein to replenish glycogen and start recovery within the 30-60 minute window. Pre-workout is the more common use case because the timing tolerance is wider.",
    },
    {
      question: "What should I add to oatmeal pre-workout?",
      answer:
        "Pair the oats with 15-20 grams of protein (Greek yogurt, egg, or for adults a scoop of whey) and a fast carb topping like banana or berries. Skip heavy fats and avoid stacking more than one fiber source within an hour of training.",
    },
    {
      question: "Are oats too heavy before a workout?",
      answer:
        "Not at the right portion and timing. 1/2 to 3/4 cup cooked rolled oats 1-2 hours before training sits well for most athletes. The mistakes that make oatmeal feel heavy are stacking too much fiber (chia + flax + steel-cut), eating too close to the workout, or piling on fat.",
    },
    {
      question: "Can kids eat oatmeal before sports practice?",
      answer:
        "Yes. Oatmeal is one of the safer pre-practice meals for kids 8+, high in complex carbs, low in saturated fat, AAP-aligned for active children. Use a smaller portion (1/2 cup cooked) and skip protein powders. Pair with milk or yogurt for whole-food protein.",
    },
  ],
  howTo: {
    name: "How to build a pre-workout oatmeal bowl",
    description:
      "Build a complete pre-workout oatmeal bowl with the right carb-to-protein ratio, timing, and portion for your body weight.",
    steps: [
      {
        name: "Cook the oats",
        text: "Combine 1/2 cup rolled oats with 1 cup water or milk in a small pot. Bring to a boil, then simmer 5 minutes, stirring occasionally.",
      },
      {
        name: "Add protein",
        text: "Stir in 1/2 cup Greek yogurt off the heat, or top with 1-2 boiled eggs. Target 15-20 grams of protein per bowl.",
      },
      {
        name: "Top with fast carbs",
        text: "Slice 1 banana on top. Add 1 tablespoon honey for an additional fast-release carb hit if training is over an hour away.",
      },
      {
        name: "Hydrate alongside",
        text: "Drink 8-16 oz of water with the meal. Add another 8 oz in the 30 minutes before training.",
      },
      {
        name: "Eat 1-2 hours before training",
        text: "Time the meal so digestion is well underway before warm-up. For morning training, use overnight oats instead.",
      },
    ],
  },
  citations: citationsList(
    "ACSM_2016",
    "ISSN_TIMING",
    "ISSN_PROTEIN",
    "BETA_GLUCAN",
    "USDA_FOODDATA",
    "AAP_BRIGHT_FUTURES",
    "AAP_PROMOTION",
    "AAP_SPORTS_NUTRITION",
    "NATA_FLUID",
    "IJMS_OATS"
  ),
  relatedRecipes: [
    "athlete-overnight-oats",
    "berry-oat-fuel",
    "chocolate-cherry-recovery",
    "english-muffin-pb",
  ],
  relatedGuides: [
    "is-oatmeal-a-good-pre-workout-meal",
    "what-is-a-good-pre-workout-meal",
    "am-pre-workout-meal",
    "best-pre-workout-meal",
  ],
};
