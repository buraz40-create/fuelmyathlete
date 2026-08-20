import type { Guide } from "@/types/domain";
import Link from "next/link";
import { citationsList } from "@/data/citations";
import { Cite } from "@/components/guide/GuideCitations";

export const guide: Guide = {
  slug: "pre-game-meal-for-kids",
  title: "Pre-Game Meal for Kids: The Complete Parent's Guide",
  metaTitle: "Pre-Game Meal for Kids: What to Feed a Young Athlete Before a Game",
  metaDescription:
    "What kids should eat before a soccer game, basketball game, or any youth sports match. Timing, portions by age, the 30-minute snack, hydration, and what to avoid.",
  primaryKeyword: "pre game meal for kids",
  category: "youth-nutrition",
  publishedAt: "2026-05-21",
  updatedAt: "2026-05-21",
  readMinutes: 8,
  answer:
    "Kids should eat a carb-rich meal 3-4 hours before a game (pasta with chicken, a turkey sandwich on white bread, or oatmeal with banana for morning games). Add a light snack 30-60 minutes before kickoff: a banana, granola bar, or applesauce pouch. Drink 16 oz of water two hours before, then 8 oz fifteen minutes before.",
  sections: [
    {
      id: "what-kids-eat",
      heading: "What should kids eat before a game?",
      body: (
        <>
          <p>
            The pre-game plate for a youth athlete is carb-heavy, moderate protein, low fat, and
            familiar. The AAP&apos;s Bright Futures Sports Nutrition guidance recommends complex
            carbohydrates as the primary pre-activity fuel for active children
            <Cite id="AAP-Bright-Futures" />, with the meal eaten 3-4 hours before competition for
            steady energy and clean digestion.
          </p>
          <p className="mt-3">
            The classic build: a starch the kid actually likes (pasta, rice, bread), a lean
            protein (chicken, turkey, eggs, peanut butter), a piece of fruit, and water. Nothing
            new on game day, every food the child eats pre-game should have been tested at
            practice first.
          </p>
        </>
      ),
    },
    {
      id: "timeline",
      heading: "The pre-game timeline for youth athletes",
      body: (
        <>
          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-primary-soft/40 text-ink">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold">Time before kickoff</th>
                  <th className="px-3 py-2 text-left font-semibold">What to eat</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-t border-border">
                  <td className="px-3 py-2 font-medium text-ink">Night before</td>
                  <td className="px-3 py-2">Pasta with marinara + lean ground turkey, or rice with chicken</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-3 py-2 font-medium text-ink">3-4 hours before</td>
                  <td className="px-3 py-2">Full meal: sandwich, pasta, oatmeal (morning), or rice bowl</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-3 py-2 font-medium text-ink">1-2 hours before</td>
                  <td className="px-3 py-2">Light snack: yogurt parfait, banana with toast, applesauce</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-3 py-2 font-medium text-ink">30-60 min before</td>
                  <td className="px-3 py-2">Fast carb: banana, granola bar, applesauce pouch</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-3 py-2 font-medium text-ink">15 min before</td>
                  <td className="px-3 py-2">8 oz water; only food if the kid is hungry</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      ),
    },
    {
      id: "3-4-hour",
      heading: "Pre-game meals 3-4 hours before kickoff",
      body: (
        <>
          <p>The 3-4 hour window is the main meal. Five proven options:</p>
          <ul className="mt-3 ml-5 flex list-disc flex-col gap-2">
            <li>
              <Link href="/recipe/pasta-marinara" className="text-primary underline hover:text-ink">
                Pasta with marinara and turkey
              </Link>: the classic carb-load
            </li>
            <li>
              <Link href="/recipe/chicken-rice-broccoli" className="text-primary underline hover:text-ink"
              >
                Grilled chicken + rice + broccoli
              </Link>
            </li>
            <li>
              <Link href="/recipe/turkey-wrap" className="text-primary underline hover:text-ink">
                Turkey wrap on whole-grain tortilla
              </Link>{" "}
              with fruit on the side
            </li>
            <li>
              <Link href="/recipe/hibachi-chicken" className="text-primary underline hover:text-ink"
              >
                Hibachi chicken bowl
              </Link>, make Sunday, reheat anytime
            </li>
            <li>
              <Link href="/recipe/chicken-pasta-broccoli" className="text-primary underline hover:text-ink"
              >
                Chicken pasta with broccoli
              </Link>
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "30-60-min",
      heading: "Pre-game snacks 30-60 minutes before kickoff",
      body: (
        <>
          <p>
            The pre-game snack is small, carb-forward, and familiar. The job is to top off blood
            glucose without sitting in the stomach. The options:
          </p>
          <ul className="mt-3 ml-5 flex list-disc flex-col gap-2">
            <li>Banana</li>
            <li>Granola bar (under 10 g sugar)</li>
            <li>Applesauce pouch</li>
            <li>Half a peanut butter and honey sandwich</li>
            <li>Pretzels + 4 oz juice</li>
          </ul>
          <p className="mt-3">
            Skip dairy in this window for kids with sensitive stomachs. The lactose can cause
            cramps once running starts.
          </p>
        </>
      ),
    },
    {
      id: "morning-games",
      heading: "Pre-game meals for morning games",
      body: (
        <>
          <p>
            Saturday 8 AM kickoffs require a different approach. Wake the kid 90 minutes early
            and use the breakfast versions:
          </p>
          <ul className="mt-3 ml-5 flex list-disc flex-col gap-2">
            <li>
              <Link href="/recipe/athlete-overnight-oats" className="text-primary underline hover:text-ink"
              >
                Overnight oats
              </Link>, made the night before, eaten cold or warmed
            </li>
            <li>
              <Link href="/recipe/english-muffin-pb" className="text-primary underline hover:text-ink"
              >
                English muffin + peanut butter + banana
              </Link>
            </li>
            <li>
              <Link href="/recipe/yogurt-parfait" className="text-primary underline hover:text-ink">
                Greek yogurt parfait
              </Link>{" "}
              with granola and berries
            </li>
            <li>
              <Link href="/recipe/berry-smoothie" className="text-primary underline hover:text-ink">
                Berry banana smoothie
              </Link>{" "}
              for the kid who can&apos;t chew at 6:30 AM
            </li>
          </ul>
          <p className="mt-3">
            More detail in our{" "}
            <Link href="/guides/am-pre-workout-meal" className="text-primary underline">
              AM pre-workout meal guide
            </Link>.
          </p>
        </>
      ),
    },
    {
      id: "avoid",
      heading: "Foods kids should avoid before a game",
      body: (
        <>
          <ul className="ml-5 flex list-disc flex-col gap-2">
            <li>
              <strong>Anything new.</strong> The most important rule. Test every food at practice
              first.
            </li>
            <li>
              <strong>Fried foods.</strong> Sit heavy, slow digestion, common cramp trigger.
            </li>
            <li>
              <strong>High-fiber bombs.</strong> Beans, raw broccoli, multi-grain granola, fine
              other days, risky pre-game.
            </li>
            <li>
              <strong>Energy drinks.</strong> AAP&apos;s clinical report on sports drinks and
              energy drinks specifically recommends against energy drinks for children and
              adolescents<Cite id="AAP-Sports-Nutrition" />. Plain water or, for games over 60
              minutes in heat, a low-sugar sports drink is the right answer.
            </li>
            <li>
              <strong>Sugar bombs.</strong> Candy bars, frosted pastries, soda, spike-and-crash
              before the second half.
            </li>
            <li>
              <strong>Pre-workout supplements.</strong> Not appropriate for athletes under 18.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "hydration",
      heading: "Hydration for young athletes before a game",
      body: (
        <>
          <p>
            NATA&apos;s position statement on fluid replacement gives a clear pre-game template:
            16-20 oz of water 2-3 hours before, then another 8-10 oz 10-20 minutes before warm-up
            <Cite id="NATA-Fluid" />. For young athletes, that scales down with body weight: a
            70-lb 9-year-old needs about 10-12 oz of the first dose, not 16-20.
          </p>
          <p className="mt-3">
            The FuelMyAthlete{" "}
            <Link href="/planner" className="text-primary underline">
              hydration tracker
            </Link>{" "}
            uses AAP-aligned pediatric formulas to set the exact daily target by athlete age and
            body weight. It adjusts for hot weather, which is the biggest pre-game hydration
            failure point in summer leagues.
          </p>
        </>
      ),
    },
    {
      id: "tournaments",
      heading: "Pre-game fueling for tournaments (2-3 games in a day)",
      body: (
        <>
          <p>
            Tournament weekends multiply the fueling problem. The kid plays at 9 AM, 12 PM, and
            3 PM. The wrong move is one big breakfast and hoping it lasts. The right approach:
          </p>
          <ul className="mt-3 ml-5 flex list-disc flex-col gap-2">
            <li>
              <strong>Pre-tournament breakfast (90 min before game 1):</strong> oatmeal +
              yogurt + banana, or eggs + toast
            </li>
            <li>
              <strong>Between games 1 and 2:</strong> sandwich + fruit + 16 oz water
            </li>
            <li>
              <strong>Between games 2 and 3:</strong> rice ball or small wrap + applesauce + water
            </li>
            <li>
              <strong>15-30 min before each game:</strong> banana or granola bar
            </li>
            <li>
              <strong>After the last game:</strong> full recovery meal within 60 minutes, see
              our match-day recipes
            </li>
          </ul>
          <p className="mt-3">
            Read our{" "}
            <Link href="/guides/carb-loading-meal-plan" className="text-primary underline">
              carb loading meal plan guide
            </Link>{" "}
            for the tournament-weekend deep dive.
          </p>
        </>
      ),
    },
  ],
  faq: [
    {
      question: "What should a 10-year-old eat before a soccer game?",
      answer:
        "Three to four hours before: pasta with marinara and chicken, or a turkey sandwich with fruit. Thirty to sixty minutes before: a banana or granola bar. 8-12 oz of water two hours before, then another 6-8 oz fifteen minutes before kickoff.",
    },
    {
      question: "What time should kids eat before a game?",
      answer:
        "The main meal goes 3-4 hours before kickoff. Add a small carb snack 30-60 minutes before warm-up. For early-morning games, the meal moves to 1-1.5 hours before, lighter and more digestible.",
    },
    {
      question: "What snacks for kids before a game?",
      answer:
        "Bananas, granola bars (under 10 g sugar), applesauce pouches, pretzels, half a peanut-butter sandwich, or a piece of toast with honey. Skip dairy in the 30-minute window if the kid is prone to stomach upset.",
    },
    {
      question: "Can kids eat pasta before a game?",
      answer:
        "Yes. Pasta is the classic pre-game meal because it delivers slow-release complex carbohydrates without heavy fat or fiber. Eat it 3-4 hours before kickoff. Use a lean protein (turkey or chicken) and a tomato-based sauce.",
    },
    {
      question: "Should kids eat candy or energy gels before a game?",
      answer:
        "No. The AAP recommends against energy drinks and high-caffeine products for children. Sugar bombs (candy, frosted pastries) cause a glucose spike and crash. Real food fuels better. Sports drinks can be appropriate for games over 60 minutes in hot weather.",
    },
    {
      question: "What if my kid won't eat before a game?",
      answer:
        "Try liquid format (smoothies, milk, juice). Try familiar comfort foods at lower volume: half a peanut butter sandwich beats nothing. Try moving the meal earlier. If the kid is consistently nauseous before games, pre-game anxiety is more often the cause than the food.",
    },
  ],
  citations: citationsList(
    "AAP_BRIGHT_FUTURES",
    "AAP_SPORTS_NUTRITION",
    "AAP_PROMOTION",
    "NATA_FLUID",
    "ACSM_2016",
    "ISSN_TIMING",
    "ROLLO_GSSI"
  ),
  relatedRecipes: [
    "pasta-marinara",
    "chicken-rice-broccoli",
    "turkey-wrap",
    "english-muffin-pb",
    "athlete-overnight-oats",
    "yogurt-parfait",
    "banana-almonds",
  ],
  relatedGuides: [
    "what-to-eat-before-a-soccer-game",
    "am-pre-workout-meal",
    "carb-loading-meal-plan",
    "what-is-a-good-pre-workout-meal",
  ],
};
