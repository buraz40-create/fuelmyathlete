import type { Guide } from "@/types/domain";
import Link from "next/link";
import { citationsList } from "@/data/citations";
import { Cite } from "@/components/guide/GuideCitations";

export const guide: Guide = {
  slug: "best-pre-workout-meal",
  title: "The Best Pre-Workout Meal: 10 Athlete-Tested Options Ranked",
  metaTitle: "Best Pre-Workout Meal: 10 Athlete-Tested Options Ranked",
  metaDescription:
    "The best pre-workout meal pairs complex carbs with lean protein in a 3:1 ratio, 1-3 hours before training. Here are the 10 best options ranked, with portions by body weight.",
  primaryKeyword: "best pre workout meal",
  category: "pre-workout",
  publishedAt: "2026-05-21",
  updatedAt: "2026-05-21",
  readMinutes: 10,
  answer:
    "The best pre-workout meal combines complex carbohydrates and lean protein in roughly a 3:1 ratio, eaten 1-3 hours before exercise. Top options: oatmeal with Greek yogurt and banana, chicken with rice and vegetables, or a whole-grain turkey sandwich. For workouts under an hour away, choose a banana with nut butter or toast with honey.",
  sections: [
    {
      id: "criteria",
      heading: "What makes a pre-workout meal 'the best'?",
      body: (
        <>
          <p>
            A pre-workout meal earns &lsquo;best&rsquo; status by hitting four criteria, in this order:
          </p>
          <ol className="mt-3 ml-5 flex list-decimal flex-col gap-2">
            <li>
              <strong>Complex carbohydrates at 1-4 g/kg body weight</strong> 1-4 hours out per ACSM
              <Cite id="ACSM-2016" />
            </li>
            <li>
              <strong>15-30 g lean protein</strong> for muscle protein synthesis priming
              <Cite id="ISSN-Protein" />
            </li>
            <li>
              <strong>Low fat and moderate fiber</strong> for clean digestion
            </li>
            <li>
              <strong>Easy to time</strong> â€” works in the 1-3 hour window most athletes have
            </li>
          </ol>
          <p className="mt-3">
            Every meal in the ranking below hits all four. The differences come down to taste,
            convenience, and the specific workout type.
          </p>
        </>
      ),
    },
    {
      id: "top-10",
      heading: "The 10 best pre-workout meals (ranked)",
      body: (
        <>
          <ol className="ml-5 flex list-decimal flex-col gap-4">
            <li>
              <strong>Oatmeal + Greek yogurt + banana.</strong> The all-rounder. Slow-release oats,
              fast carbs from banana, 12 g protein from yogurt. Best for 1-2 hour windows.
              <Link href="/recipe/athlete-overnight-oats" className="ml-2 text-primary underline">
                Recipe â†’
              </Link>
            </li>
            <li>
              <strong>Chicken + rice + vegetables.</strong> The 2-3 hour pre-game classic. Lean
              protein, clean carbs, easy to digest.
              <Link href="/recipe/chicken-rice-broccoli" className="ml-2 text-primary underline">
                Recipe â†’
              </Link>
            </li>
            <li>
              <strong>Turkey sandwich on whole-grain bread.</strong> Portable, balanced, 20+ g
              protein. Perfect 60-90 min out.
              <Link href="/recipe/turkey-wrap" className="ml-2 text-primary underline">
                Recipe â†’
              </Link>
            </li>
            <li>
              <strong>English muffin + peanut butter + banana.</strong> Pre-game favorite. High
              carb, moderate protein, easy to eat on the way to practice.
              <Link href="/recipe/english-muffin-pb" className="ml-2 text-primary underline">
                Recipe â†’
              </Link>
            </li>
            <li>
              <strong>Pasta + lean ground meat + marinara.</strong> Carb-loading favorite. Best 2-3
              hours before long endurance work or a match.
              <Link href="/recipe/pasta-marinara" className="ml-2 text-primary underline">
                Recipe â†’
              </Link>
            </li>
            <li>
              <strong>Eggs + whole-grain toast.</strong> Real morning protein, clean carbs, 90 min
              before training.
              <Link href="/recipe/eggs-toast" className="ml-2 text-primary underline">
                Recipe â†’
              </Link>
            </li>
            <li>
              <strong>Berry smoothie with oats blended in.</strong> Liquid format for sensitive
              stomachs. Customize to hit macros exactly.
              <Link href="/recipe/berry-oat-fuel" className="ml-2 text-primary underline">
                Recipe â†’
              </Link>
            </li>
            <li>
              <strong>Greek yogurt parfait with granola and berries.</strong> Light, fast,
              protein-forward. Good 60-75 min out.
              <Link href="/recipe/yogurt-parfait" className="ml-2 text-primary underline">
                Recipe â†’
              </Link>
            </li>
            <li>
              <strong>Banana + almond butter.</strong> The 30-45 min minimal-prep snack. Skip the
              protein, fast carbs only.
              <Link href="/recipe/banana-almonds" className="ml-2 text-primary underline">
                Recipe â†’
              </Link>
            </li>
            <li>
              <strong>Stir-fry chicken + rice + edamame.</strong> Mixed sport sweet spot. Carbs,
              complete protein, soy isoflavones, low GI distress risk.
              <Link href="/recipe/stirfry-chicken-rice" className="ml-2 text-primary underline">
                Recipe â†’
              </Link>
            </li>
          </ol>
        </>
      ),
    },
    {
      id: "by-timing",
      heading: "Best pre-workout meal by timing window",
      body: (
        <>
          <p>The ranking changes with the clock:</p>
          <ul className="mt-3 ml-5 flex list-disc flex-col gap-2">
            <li>
              <strong>3+ hours:</strong> chicken + rice + vegetables, pasta + meat sauce
            </li>
            <li>
              <strong>1-2 hours:</strong> oatmeal + yogurt + banana, turkey sandwich, English
              muffin + PB
            </li>
            <li>
              <strong>30-60 min:</strong> Greek yogurt parfait, banana + nut butter, smoothie
            </li>
            <li>
              <strong>Under 30 min:</strong> banana alone, dates, applesauce pouch, sports drink
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "by-goal",
      heading: "Best pre-workout meal by training goal",
      body: (
        <>
          <ul className="ml-5 flex list-disc flex-col gap-2">
            <li>
              <strong>Muscle gain:</strong> chicken + rice + vegetables 2 hours out, add an extra
              egg or second protein source
            </li>
            <li>
              <strong>Fat loss:</strong> Greek yogurt parfait or eggs + toast â€” lower-calorie but
              still hitting protein and carb minimums
            </li>
            <li>
              <strong>Endurance / long runs:</strong> pasta + lean protein 2-3 hours out, add
              electrolyte drink 30 min out
            </li>
            <li>
              <strong>Strength / lifting:</strong> oatmeal + yogurt + banana 60-90 min before lift
            </li>
            <li>
              <strong>Team sports (soccer, basketball, lacrosse):</strong> English muffin + PB +
              banana 90 min before warm-up; pasta the night before a match
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "by-age",
      heading: "Best pre-workout meal by athlete age",
      body: (
        <>
          <p>
            Most pre-workout content treats all athletes as 25-year-old adult lifters. Real fueling
            scales with age and body weight.
          </p>
          <div className="mt-4 overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-primary-soft/40 text-ink">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold">Age band</th>
                  <th className="px-3 py-2 text-left font-semibold">Best meal</th>
                  <th className="px-3 py-2 text-left font-semibold">Notes</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-t border-border">
                  <td className="px-3 py-2 font-medium text-ink">8-12 (child)</td>
                  <td className="px-3 py-2">PB sandwich + banana</td>
                  <td className="px-3 py-2">Whole-food protein, no powder, hydrate first</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-3 py-2 font-medium text-ink">13-17 (teen)</td>
                  <td className="px-3 py-2">Oatmeal + yogurt + banana</td>
                  <td className="px-3 py-2">Larger portions, still whole-food protein</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-3 py-2 font-medium text-ink">18+ (adult)</td>
                  <td className="px-3 py-2">Any from the top 10</td>
                  <td className="px-3 py-2">Optional whey protein, full portions by weight</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4">
            AAP&apos;s guidance is explicit that supplement and powder marketing aimed at youth is
            inappropriate without medical oversight<Cite id="AAP-Promotion" />. For young
            athletes, whole-food protein from milk, yogurt, eggs, and nut butter covers every
            target.
          </p>
        </>
      ),
    },
    {
      id: "avoid",
      heading: "What to avoid pre-workout",
      body: (
        <>
          <ul className="ml-5 flex list-disc flex-col gap-2">
            <li>Heavy / fried foods within 2 hours</li>
            <li>Multiple high-fiber sources stacked within 60 minutes</li>
            <li>Anything new on game or race day</li>
            <li>Sugar bombs (donuts, frosted pastries) â€” spike-and-crash</li>
            <li>Caffeinated pre-workout supplements for athletes under 18</li>
            <li>Alcohol the night before â€” impairs glycogen synthesis</li>
          </ul>
        </>
      ),
    },
    {
      id: "hydration",
      heading: "Hydration with the pre-workout meal",
      body: (
        <>
          <p>
            Pair the meal with 16-20 oz of water 2-3 hours before training, then another 8-10 oz
            10-20 min before warm-up per NATA<Cite id="NATA-Fluid" />. In hot weather increase by
            10-20%. The FuelMyAthlete{" "}
            <Link href="/planner" className="text-primary underline">
              hydration tracker
            </Link>{" "}
            calculates the exact daily target by body weight, age, and day type.
          </p>
        </>
      ),
    },
  ],
  faq: [
    {
      question: "What is the #1 pre-workout food?",
      answer:
        "Oatmeal is the most-recommended pre-workout food across sports nutrition literature. It hits all four criteria: complex carbs, moderate timing tolerance (1-2 hours), pairs cleanly with protein, and digests reliably for most athletes.",
    },
    {
      question: "What's the best pre-workout meal for muscle gain?",
      answer:
        "Chicken with rice and vegetables 2 hours out, or oatmeal with Greek yogurt and an egg 90 minutes out. Target 30-40 g protein alongside 50-80 g of carbs. Adults 18+ can add a scoop of whey if hitting protein targets is hard with whole foods.",
    },
    {
      question: "What pre-workout meal gives the most energy?",
      answer:
        "Pasta with lean protein and vegetables, 2-3 hours before training. The combination of slow-release complex carbs and complete protein delivers sustained energy through 90+ minute sessions.",
    },
    {
      question: "Are eggs good before a workout?",
      answer:
        "Yes. Eggs are a complete protein, low in fiber, and digest cleanly. Pair 1-2 eggs with toast or oatmeal 60-90 minutes before training for a balanced pre-workout meal.",
    },
    {
      question: "Can I eat a banana as my pre-workout meal?",
      answer:
        "A banana alone works for short timing windows (30 min before) or shorter, lower-intensity sessions. For workouts over 45 minutes, pair the banana with a protein source like nut butter or Greek yogurt for sustained energy.",
    },
  ],
  citations: citationsList(
    "ACSM_2016",
    "ISSN_TIMING",
    "ISSN_PROTEIN",
    "NSCA_NUTRITION",
    "NATA_FLUID",
    "AAP_PROMOTION",
    "AAP_BRIGHT_FUTURES",
    "USDA_FOODDATA"
  ),
  relatedRecipes: [
    "athlete-overnight-oats",
    "chicken-rice-broccoli",
    "turkey-wrap",
    "english-muffin-pb",
    "pasta-marinara",
    "eggs-toast",
    "yogurt-parfait",
    "banana-almonds",
  ],
  relatedGuides: [
    "what-is-a-good-pre-workout-meal",
    "pre-workout-meal-oatmeal",
    "am-pre-workout-meal",
    "is-oatmeal-a-good-pre-workout-meal",
  ],
};
