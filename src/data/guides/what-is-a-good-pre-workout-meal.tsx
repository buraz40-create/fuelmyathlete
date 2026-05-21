import type { Guide } from "@/types/domain";
import Link from "next/link";
import { citationsList } from "@/data/citations";
import { Cite } from "@/components/guide/GuideCitations";

export const guide: Guide = {
  slug: "what-is-a-good-pre-workout-meal",
  title: "What Is a Good Pre-Workout Meal? Timing, Foods, and Portions by Body Weight",
  metaTitle: "What Is a Good Pre-Workout Meal? Full Guide With Timing & Portions",
  metaDescription:
    "A good pre-workout meal pairs complex carbs and lean protein 1-3 hours before training. Here's the timing matrix, the food list, portions by body weight, and recipes.",
  primaryKeyword: "what is a good pre workout meal",
  category: "pre-workout",
  publishedAt: "2026-05-21",
  updatedAt: "2026-05-21",
  readMinutes: 11,
  answer:
    "A good pre-workout meal pairs complex carbohydrates with lean protein and minimal fat, eaten 1-3 hours before exercise. Examples include oatmeal with Greek yogurt and berries, a turkey sandwich on whole-grain bread, or rice with grilled chicken. Add 16-20 oz of water and skip high-fiber, fried, or sugary foods within 60 minutes of training.",
  sections: [
    {
      id: "what-makes-it-good",
      heading: "What makes a pre-workout meal 'good'?",
      body: (
        <>
          <p>
            A good pre-workout meal does three jobs: it tops off liver and muscle glycogen, it
            primes amino acid availability for muscle protein synthesis during and after the
            workout, and it leaves the stomach in time so blood can flow to working muscle. The
            American College of Sports Medicine joint position stand spells out the macronutrient
            targets â€” 1-4 g of carbohydrate per kg body weight 1-4 hours before exercise, plus
            0.3 g/kg of protein<Cite id="ACSM-2016" />.
          </p>
          <p className="mt-3">
            In practice, that translates to a moderate-sized meal heavy on complex carbohydrates
            (oats, rice, bread, pasta, fruit), a serving of lean protein (eggs, yogurt, chicken,
            tofu), and minimal fat or fiber close to training.
          </p>
        </>
      ),
    },
    {
      id: "macros",
      heading: "The three macros: what each does pre-workout",
      body: (
        <>
          <ul className="ml-5 flex list-disc flex-col gap-2">
            <li>
              <strong>Carbohydrates</strong> top off glycogen stores. Glycogen is the dominant fuel
              for moderate-to-high intensity work lasting 30-90 minutes. ISSN&apos;s nutrient
              timing position stand confirms carbohydrate is the most important pre-exercise
              macronutrient for performance<Cite id="ISSN-Timing" />.
            </li>
            <li>
              <strong>Protein</strong> primes amino acid availability so muscle protein synthesis
              ramps up during recovery. ISSN protein position stand: 0.4-0.55 g/kg per meal for
              athletes<Cite id="ISSN-Protein" />.
            </li>
            <li>
              <strong>Fat</strong> slows digestion, which is a feature 3+ hours out but a bug
              within 90 minutes. Keep fat low close to training.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "timing",
      heading: "Pre-workout meal timing: the 4 windows",
      body: (
        <>
          <div className="mt-2 overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-primary-soft/40 text-ink">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold">Time before</th>
                  <th className="px-3 py-2 text-left font-semibold">Meal size</th>
                  <th className="px-3 py-2 text-left font-semibold">Example</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-t border-border">
                  <td className="px-3 py-2 font-medium text-ink">3+ hours</td>
                  <td className="px-3 py-2">Full meal</td>
                  <td className="px-3 py-2">Rice + chicken + vegetables, or pasta + meat sauce</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-3 py-2 font-medium text-ink">1-2 hours</td>
                  <td className="px-3 py-2">Medium</td>
                  <td className="px-3 py-2">Oatmeal + yogurt + berries, or turkey sandwich</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-3 py-2 font-medium text-ink">30-60 min</td>
                  <td className="px-3 py-2">Light snack</td>
                  <td className="px-3 py-2">Banana + nut butter, toast + honey, applesauce</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-3 py-2 font-medium text-ink">Under 30 min</td>
                  <td className="px-3 py-2">Quick carb</td>
                  <td className="px-3 py-2">Banana, dates, sports drink, gel</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4">
            Match the meal size to the time you have. A full meal 30 minutes out causes GI
            distress; a banana 3 hours out leaves you under-fueled by warm-up.
          </p>
        </>
      ),
    },
    {
      id: "foods",
      heading: "Best pre-workout foods (the short list)",
      body: (
        <>
          <p>The evidence-backed pre-workout food list:</p>
          <ul className="mt-3 ml-5 flex list-disc flex-col gap-2">
            <li>
              <strong>Oats</strong> (rolled or overnight) â€” slow-release complex carbs + beta-glucan
            </li>
            <li>
              <strong>Bananas</strong> â€” fast carbs + potassium, perfect 30-60 min out
            </li>
            <li>
              <strong>White rice</strong> â€” clean energy source for 2-3 hour windows
            </li>
            <li>
              <strong>Whole-grain bread</strong> â€” versatile carb base (sandwiches, toast)
            </li>
            <li>
              <strong>Greek yogurt</strong> â€” high protein, easy to digest
            </li>
            <li>
              <strong>Eggs</strong> â€” complete protein, low fiber
            </li>
            <li>
              <strong>Chicken breast</strong> â€” lean protein for the 2+ hour meal
            </li>
            <li>
              <strong>Sweet potato</strong> â€” complex carbs + potassium
            </li>
            <li>
              <strong>Berries</strong> â€” antioxidants, light on the stomach
            </li>
            <li>
              <strong>Pasta</strong> â€” sustained-release carbs for endurance work
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "by-workout",
      heading: "Pre-workout meals by workout type",
      body: (
        <>
          <ul className="ml-5 flex list-disc flex-col gap-2">
            <li>
              <strong>Strength / lifting:</strong> moderate carbs + higher protein 60-90 min out.
              Example: oatmeal + Greek yogurt + banana.
            </li>
            <li>
              <strong>Endurance / running, cycling, soccer:</strong> higher carbs, moderate
              protein 2-3 hours out. Example: rice bowl with chicken and vegetables.
            </li>
            <li>
              <strong>HIIT / short high-intensity:</strong> light carbs, low fiber 45-60 min out.
              Example: white toast with honey + banana.
            </li>
            <li>
              <strong>Yoga / mobility / low intensity:</strong> small carb snack 30-45 min out.
              Example: piece of fruit + a few nuts.
            </li>
            <li>
              <strong>Early morning lifting:</strong> overnight oats or a fast smoothie 45-60 min
              before. See our{" "}
              <Link href="/guides/am-pre-workout-meal" className="text-primary underline">
                AM pre-workout meal guide
              </Link>.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "by-goal",
      heading: "Pre-workout meals by goal",
      body: (
        <>
          <ul className="ml-5 flex list-disc flex-col gap-2">
            <li>
              <strong>Performance:</strong> the standard ACSM-aligned plate â€” 60-70% carbs, 15-25%
              protein, 10-15% fat. Maximize glycogen.
            </li>
            <li>
              <strong>Muscle gain:</strong> add 5-10 g extra protein (third egg, larger yogurt
              serving, scoop of whey for adults).
            </li>
            <li>
              <strong>Fat loss:</strong> keep carbs in the lower half of the 1-4 g/kg range; do
              not drop them to zero â€” performance suffers and the workout produces less of the
              very stimulus you&apos;re training for.
            </li>
            <li>
              <strong>Recovery focus:</strong> pre-workout is less critical than post-workout for
              recovery, but tart cherries, berries, and turmeric in the pre-meal can lower
              inflammatory load.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "avoid",
      heading: "Foods to avoid pre-workout",
      body: (
        <>
          <ul className="ml-5 flex list-disc flex-col gap-2">
            <li>
              <strong>Heavy / fried foods</strong> within 2 hours â€” sit in the stomach, divert
              blood from muscle
            </li>
            <li>
              <strong>Very high-fiber foods</strong> within 60 minutes â€” beans, broccoli, raw
              cruciferous vegetables, multiple high-fiber sources stacked
            </li>
            <li>
              <strong>Anything new</strong> on race or game day â€” try every meal at practice first
            </li>
            <li>
              <strong>Sugar bombs</strong> like donuts or sweet pastries â€” spike-and-crash
            </li>
            <li>
              <strong>Alcohol</strong> â€” impairs glycogen synthesis and rehydration
            </li>
            <li>
              <strong>Very spicy foods</strong> if you&apos;re prone to reflux during exertion
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "hydration",
      heading: "Hydration with the meal",
      body: (
        <>
          <p>
            Per NATA&apos;s position statement on fluid replacement, athletes should drink 16-20
            oz of water 2-3 hours before exercise and another 8-10 oz 10-20 minutes before
            warm-up<Cite id="NATA-Fluid" />. Pair the pre-workout meal with the first dose of
            water. Our{" "}
            <Link href="/planner" className="text-primary underline">
              hydration tracker
            </Link>{" "}
            calculates the exact daily target by body weight and day type.
          </p>
        </>
      ),
    },
    {
      id: "youth",
      heading: "Pre-workout for young athletes 8+",
      body: (
        <>
          <p>
            For young athletes the same macronutrient principles apply, but with three guardrails
            from AAP guidance:
          </p>
          <ul className="mt-3 ml-5 flex list-disc flex-col gap-2">
            <li>
              <strong>Smaller portions, more frequent fueling.</strong> Kids&apos; smaller stomachs
              do better with snacks every 2-3 hours than two big meals.
            </li>
            <li>
              <strong>Whole-food protein only.</strong> Per AAP, supplements and powders are not
              appropriate for routine use in children<Cite id="AAP-Promotion" />.
            </li>
            <li>
              <strong>No caffeine.</strong> AAP&apos;s clinical report on caffeinated products
              recommends against routine caffeine for children and adolescents
              <Cite id="AAP-Sports-Nutrition" />.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "sample-meals",
      heading: "Sample pre-workout meals from our recipe library",
      body: (
        <>
          <p>
            Every meal below is in the recipe library with full nutrition, portions, and a
            step-by-step. Tap any one to view and plan it into your week:
          </p>
          <ul className="mt-3 ml-5 flex list-disc flex-col gap-2">
            <li>
              <Link href="/recipe/athlete-overnight-oats" className="text-primary underline hover:text-ink"
              >
                Athlete overnight oats
              </Link>{" "}
              â€” make-ahead, 1-2 hours out
            </li>
            <li>
              <Link href="/recipe/english-muffin-pb" className="text-primary underline hover:text-ink">
                English muffin + PB + banana
              </Link>{" "}
              â€” 1-2 hours out, packable
            </li>
            <li>
              <Link href="/recipe/chicken-rice-broccoli" className="text-primary underline hover:text-ink"
              >
                Chicken rice broccoli
              </Link>{" "}
              â€” 2-3 hour pre-game meal
            </li>
            <li>
              <Link href="/recipe/banana-almonds" className="text-primary underline hover:text-ink">
                Banana + almonds
              </Link>{" "}
              â€” 30-60 minute snack
            </li>
            <li>
              <Link href="/recipe/yogurt-parfait" className="text-primary underline hover:text-ink">
                Greek yogurt parfait
              </Link>{" "}
              â€” light, 60-90 min out
            </li>
          </ul>
        </>
      ),
    },
  ],
  faq: [
    {
      question: "What should I eat 30 minutes before a workout?",
      answer:
        "A small fast-acting carb: a banana, a piece of toast with honey, an applesauce pouch, or a handful of dates. Skip fat, protein, and fiber in this window â€” they slow digestion and can cause GI distress.",
    },
    {
      question: "Is it OK to work out on an empty stomach?",
      answer:
        "For short, low-intensity sessions (under 45 min easy cardio), fasted training is fine for most adults. For high-intensity work, lifting, or endurance work over 60 min, performance and recovery suffer. Children should never train on an empty stomach.",
    },
    {
      question: "What is the best food to eat 1 hour before exercise?",
      answer:
        "A medium-carb, moderate-protein, low-fat option. Examples: oatmeal with banana, a turkey sandwich, Greek yogurt with granola, or toast with peanut butter and honey. Aim for 30-50 g carbs and 10-20 g protein.",
    },
    {
      question: "Should I eat protein or carbs before a workout?",
      answer:
        "Both. Carbs are the priority for fueling the workout itself. Protein matters less acutely than carbs pre-workout, but pairing 15-20 g of protein with the carbs primes muscle protein synthesis during and after training.",
    },
    {
      question: "What snack gives you energy before exercise?",
      answer:
        "Bananas, dates, applesauce pouches, toast with honey, and rice cakes with jam are the fastest pre-workout snacks. They digest in 20-30 minutes and deliver quick glucose for the working muscles.",
    },
    {
      question: "What is the best pre-workout meal for muscle gain?",
      answer:
        "A protein-forward variant of the standard meal: oatmeal with 1 cup Greek yogurt and 2 eggs, or rice with 6 oz grilled chicken and vegetables. Target 30-40 g of protein alongside 50-80 g of carbs 1-2 hours before lifting.",
    },
  ],
  citations: citationsList(
    "ACSM_2016",
    "ISSN_TIMING",
    "ISSN_PROTEIN",
    "NATA_FLUID",
    "AAP_PROMOTION",
    "AAP_SPORTS_NUTRITION",
    "AAP_BRIGHT_FUTURES",
    "USDA_FOODDATA",
    "ARAGON_SCHOENFELD"
  ),
  relatedRecipes: [
    "athlete-overnight-oats",
    "english-muffin-pb",
    "chicken-rice-broccoli",
    "banana-almonds",
    "yogurt-parfait",
    "turkey-wrap",
  ],
  relatedGuides: [
    "pre-workout-meal-oatmeal",
    "is-oatmeal-a-good-pre-workout-meal",
    "best-pre-workout-meal",
    "am-pre-workout-meal",
  ],
};
