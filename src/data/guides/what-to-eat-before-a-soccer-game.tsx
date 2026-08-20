import type { Guide } from "@/types/domain";
import Link from "next/link";
import { citationsList } from "@/data/citations";
import { Cite } from "@/components/guide/GuideCitations";

export const guide: Guide = {
  slug: "what-to-eat-before-a-soccer-game",
  title: "What to Eat Before a Soccer Game: A Match-Day Fueling Guide",
  metaTitle: "What to Eat Before a Soccer Game: Match-Day Fueling Guide",
  metaDescription:
    "Match-day fueling for soccer players. The night before, 3-4 hours before, 30-60 minutes before. Specific meals, portions by age, hydration, and what to avoid.",
  primaryKeyword: "what to eat before a soccer game",
  category: "match-day",
  publishedAt: "2026-05-21",
  updatedAt: "2026-05-21",
  readMinutes: 9,
  answer:
    "Eat a carb-heavy meal 3-4 hours before a soccer game: pasta with grilled chicken, rice with eggs, or a turkey sandwich on white bread plus fruit. One hour before kickoff, add a small snack like a banana, granola bar, or applesauce pouch. Drink 16 oz of water two hours out, then 8 oz fifteen minutes before warm-up.",
  sections: [
    {
      id: "why-it-matters",
      heading: "Why pre-game nutrition decides the second half",
      body: (
        <>
          <p>
            A soccer match drains 60-90% of muscle glycogen by full time. The pre-game meal is the
            difference between a player who finishes strong and a player whose legs disappear at
            the 65th minute. Carbohydrate is the dominant fuel, GSSI&apos;s sports science review
            on football fueling by Rollo identifies pre-match carbohydrate intake as the single
            biggest modifiable performance variable<Cite id="Rollo-GSSI" />.
          </p>
          <p className="mt-3">
            Cognitive performance falls off too. Decision-making, vision, and reaction time
            degrade when glycogen runs low: the same applies whether the player is 11 or 31.
            Pre-game fueling protects both the legs and the brain.
          </p>
        </>
      ),
    },
    {
      id: "timeline",
      heading: "The pre-game timeline",
      body: (
        <>
          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-primary-soft/40 text-ink">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold">When</th>
                  <th className="px-3 py-2 text-left font-semibold">What</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-t border-border">
                  <td className="px-3 py-2 font-medium text-ink">Night before</td>
                  <td className="px-3 py-2">Pasta with marinara + turkey, or rice with chicken and vegetables</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-3 py-2 font-medium text-ink">Morning of (if afternoon game)</td>
                  <td className="px-3 py-2">Eggs + whole-grain toast, or overnight oats with banana</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-3 py-2 font-medium text-ink">3-4 hours before kickoff</td>
                  <td className="px-3 py-2">Main meal: pasta, rice bowl, or sandwich + fruit + water</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-3 py-2 font-medium text-ink">1-2 hours before</td>
                  <td className="px-3 py-2">Light snack: yogurt parfait, banana with toast</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-3 py-2 font-medium text-ink">30-60 min before</td>
                  <td className="px-3 py-2">Quick carb: banana, granola bar, applesauce pouch</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-3 py-2 font-medium text-ink">15 min before</td>
                  <td className="px-3 py-2">8 oz water; sip only, no food unless hungry</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      ),
    },
    {
      id: "the-plate",
      heading: "The pre-game plate: 60% carbs / 20% protein / 20% fat",
      body: (
        <>
          <p>
            A pre-game soccer meal should be roughly 60% carbohydrate, 20% protein, 20% fat by
            calories. ACSM&apos;s joint position stand recommends 1-4 g carbohydrate per kg body
            weight 1-4 hours before competition, paired with 0.3 g/kg of protein
            <Cite id="ACSM-2016" />. For an 80-lb (36 kg) youth player, that&apos;s 36-144 g of
            carbs and ~11 g of protein. For a 160-lb (73 kg) adult, it&apos;s 73-292 g of carbs
            and ~22 g of protein.
          </p>
          <p className="mt-3">
            The carb half is where most players under-fuel. A small sandwich and a piece of fruit
            is not enough for a competitive 90-minute match.
          </p>
        </>
      ),
    },
    {
      id: "3-4-hour",
      heading: "Specific meals 3-4 hours before kickoff",
      body: (
        <>
          <p>Five proven pre-game meals from the recipe library:</p>
          <ul className="mt-3 ml-5 flex list-disc flex-col gap-2">
            <li>
              <Link href="/recipe/pasta-marinara" className="text-primary underline hover:text-ink">
                Pasta with marinara and lean turkey
              </Link>: the classic, eaten across every level from U10 to MLS
            </li>
            <li>
              <Link href="/recipe/chicken-rice-broccoli" className="text-primary underline hover:text-ink"
              >
                Grilled chicken with rice and broccoli
              </Link>, clean carbs, lean protein, easy to digest
            </li>
            <li>
              <Link href="/recipe/hibachi-chicken" className="text-primary underline hover:text-ink"
              >
                Hibachi chicken bowl
              </Link>, Sunday-cook favorite, reheats perfectly for game day
            </li>
            <li>
              <Link href="/recipe/turkey-wrap" className="text-primary underline hover:text-ink">
                Turkey wrap on whole-grain tortilla
              </Link>{" "}
              with a banana and water
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
      id: "snacks",
      heading: "Specific snacks 30-60 minutes before kickoff",
      body: (
        <>
          <p>
            The pre-warmup snack is a fast carb. Don&apos;t add protein or fat in this window.
            Options:
          </p>
          <ul className="mt-3 ml-5 flex list-disc flex-col gap-2">
            <li>1 banana</li>
            <li>1 granola bar (under 10 g sugar, read the label)</li>
            <li>1 applesauce pouch</li>
            <li>Pretzels + 4 oz juice or sports drink</li>
            <li>1/2 PB&J on white bread</li>
            <li>Rice cake with honey</li>
          </ul>
        </>
      ),
    },
    {
      id: "avoid",
      heading: "What to avoid before a soccer game",
      body: (
        <>
          <ul className="ml-5 flex list-disc flex-col gap-2">
            <li>
              <strong>Anything new.</strong> Game day is not the day to try the team-mom&apos;s
              new energy bar.
            </li>
            <li>
              <strong>Fried foods.</strong> Sit heavy. Common cramp trigger in the second half.
            </li>
            <li>
              <strong>High-fiber piles.</strong> Beans, broccoli, raw cruciferous vegetables, dense
              multi-grain breads, fine on training days, risky pre-game.
            </li>
            <li>
              <strong>Dairy if sensitive.</strong> For some players (especially kids), milk and
              cheese within an hour of kickoff causes GI distress once running starts.
            </li>
            <li>
              <strong>Energy drinks.</strong> AAP specifically recommends against energy drinks
              for children and adolescents<Cite id="AAP-Sports-Nutrition" />.
            </li>
            <li>
              <strong>Sugar bombs.</strong> Candy bars, frosted pastries, soda, spike-and-crash
              before the second half.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "hydration",
      heading: "Hydration before a soccer game",
      body: (
        <>
          <p>
            NATA&apos;s 2017 fluid replacement statement gives the pre-game template:
          </p>
          <ul className="mt-3 ml-5 flex list-disc flex-col gap-2">
            <li>2-3 hours before: 16-20 oz of water (scale by body weight for kids)</li>
            <li>10-20 min before: 8-10 oz of water</li>
            <li>During the game: 6-8 oz every 15-20 min, especially in heat</li>
            <li>For games over 60 min in hot weather: sports drink with electrolytes</li>
          </ul>
          <p className="mt-3">
            The biggest mistake is showing up already dehydrated. Per NATA, urine should be clear
            or light yellow 2 hours before the game, that&apos;s the practical
            check<Cite id="NATA-Fluid" />.
          </p>
        </>
      ),
    },
    {
      id: "by-age",
      heading: "Pre-game meals by age band",
      body: (
        <>
          <ul className="ml-5 flex list-disc flex-col gap-2">
            <li>
              <strong>U10 (8-9 years old, ~70 lb):</strong> half-portion of the main meal options.
              Small sandwich + fruit + 10 oz water 3 hours out.
            </li>
            <li>
              <strong>U12 (10-12 years old, ~85 lb):</strong> medium portion. Full sandwich or
              small bowl of pasta + fruit + 12-14 oz water.
            </li>
            <li>
              <strong>U14 (13-14, ~110 lb):</strong> larger portion. Pasta or rice bowl with
              protein + 14-16 oz water.
            </li>
            <li>
              <strong>U16-18 (15-17, ~140 lb):</strong> near-adult portion. Full meal + 16-20 oz
              water.
            </li>
            <li>
              <strong>Adult rec (160+ lb):</strong> full ACSM-aligned plate. Match-day pasta meal
              is the classic.
            </li>
          </ul>
          <p className="mt-3">
            The FuelMyAthlete{" "}
            <Link href="/planner" className="text-primary underline">
              planner
            </Link>{" "}
            scales every portion by athlete weight and day type automatically, no math required.
          </p>
        </>
      ),
    },
    {
      id: "tournaments",
      heading: "Pre-game fueling for tournaments and back-to-back games",
      body: (
        <>
          <p>
            Tournament weekends multiply the fueling problem. Three games in one day means three
            pre-game windows. The right approach:
          </p>
          <ol className="mt-3 ml-5 flex list-decimal flex-col gap-2">
            <li>
              Pre-tournament breakfast (90 min before game 1): oatmeal + yogurt + banana
            </li>
            <li>
              Between games 1 and 2: sandwich + fruit + 16 oz water
            </li>
            <li>
              Between games 2 and 3: rice ball or small wrap + applesauce + water
            </li>
            <li>
              15-30 min before each game: banana or granola bar
            </li>
            <li>
              After the last game: full recovery meal within 60 minutes
            </li>
          </ol>
          <p className="mt-3">
            For the full tournament-weekend deep dive, see our{" "}
            <Link href="/guides/carb-loading-meal-plan" className="text-primary underline">
              carb loading meal plan guide
            </Link>.
          </p>
        </>
      ),
    },
  ],
  faq: [
    {
      question: "What should I eat 2 hours before a soccer game?",
      answer:
        "A balanced carb-forward meal: pasta with chicken, rice with vegetables, or a turkey sandwich with fruit. Aim for 60-80 g of carbs and 15-25 g of lean protein, with minimal fat and fiber. Drink 12-16 oz of water with the meal.",
    },
    {
      question: "What should I avoid before a soccer match?",
      answer:
        "Fried foods, anything new, very high-fiber meals (beans, raw broccoli), sugary energy drinks, candy bars, and large amounts of dairy if you're sensitive. Anything that slows digestion or causes cramping is wrong for pre-game.",
    },
    {
      question: "What do pro soccer players eat before a game?",
      answer:
        "The classic pro pre-game meal is pasta with grilled chicken or fish 3-4 hours before kickoff. Most clubs recommend a pre-warmup snack like a banana or granola bar 30-60 minutes before, plus 16 oz of water in the 2-hour window.",
    },
    {
      question: "Should kids eat before a soccer game?",
      answer:
        "Yes, always. AAP's Bright Futures Sports Nutrition guidance is explicit that youth athletes should not play fasted. Even for a 9 AM game, kids need a small breakfast 90 minutes before kickoff: a banana with toast, half a bagel, or overnight oats.",
    },
    {
      question: "What should I eat the night before a soccer game?",
      answer:
        "A carb-heavy dinner: pasta with marinara and lean ground turkey, rice with chicken and vegetables, or a baked potato with grilled fish. Avoid heavy fats, new foods, and alcohol. Drink water through the evening.",
    },
    {
      question: "How long before kickoff should I stop eating?",
      answer:
        "Stop main meals 3 hours before kickoff to allow full digestion. A small carb snack (banana, granola bar) is OK 30-60 minutes before warm-up. Sips of water are fine right up to kickoff.",
    },
  ],
  citations: citationsList(
    "ACSM_2016",
    "ROLLO_GSSI",
    "NATA_FLUID",
    "AAP_BRIGHT_FUTURES",
    "AAP_SPORTS_NUTRITION",
    "ISSN_TIMING",
    "BURKE_CARB"
  ),
  relatedRecipes: [
    "pasta-marinara",
    "chicken-rice-broccoli",
    "hibachi-chicken",
    "turkey-wrap",
    "chicken-pasta-broccoli",
    "athlete-overnight-oats",
    "english-muffin-pb",
    "banana-almonds",
  ],
  relatedGuides: [
    "pre-game-meal-for-kids",
    "carb-loading-meal-plan",
    "what-is-a-good-pre-workout-meal",
    "am-pre-workout-meal",
  ],
};
