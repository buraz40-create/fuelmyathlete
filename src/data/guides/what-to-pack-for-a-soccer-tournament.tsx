import type { Guide } from "@/types/domain";
import Link from "next/link";
import { citationsList } from "@/data/citations";
import { Cite } from "@/components/guide/GuideCitations";

export const guide: Guide = {
  slug: "what-to-pack-for-a-soccer-tournament",
  title: "What to Pack for a Soccer Tournament: The Cooler List",
  metaTitle: "What to Pack for a Soccer Tournament (Food and Cooler Checklist)",
  metaDescription:
    "A cooler and bag list for a youth soccer tournament weekend: what to pack, what survives the heat, what to eat between games, and what to skip.",
  primaryKeyword: "what to pack for a soccer tournament",
  category: "match-day",
  publishedAt: "2026-08-19",
  updatedAt: "2026-08-19",
  readMinutes: 8,
  answer:
    "Pack more fluid than you think, food your kid already eats, and something salty for the heat. A working tournament cooler holds water and milk, fruit with high water content like watermelon and grapes, sandwiches or wraps, yogurt tubes frozen the night before, and a shelf-stable bag of trail mix for when the cooler runs warm.",
  sections: [
    {
      id: "the-cooler",
      heading: "The cooler list",
      body: (
        <>
          <p>
            Pack for the gap between games, not for a picnic. Everything below is chosen
            because it survives a Florida car park and gets eaten by a tired eleven-year-old.
          </p>
          <ul className="mt-3 list-disc space-y-1.5 pl-5">
            <li><strong>Water</strong>, more than one bottle per player. Frozen halfway the night before, so it thaws cold.</li>
            <li><strong>Milk or chocolate milk</strong> on ice, for after the last game of the day.</li>
            <li><strong>Watermelon and grapes</strong>. Both are mostly water, and grapes frozen in a bag double as the ice pack.</li>
            <li><strong>Sandwiches or wraps</strong>, wrapped tight. Turkey and cheese travels better than anything with mayonnaise or tomato.</li>
            <li><strong>Yogurt tubes</strong>, frozen. They chill the cooler on the way and are edible by mid-morning.</li>
            <li><strong>Something salty</strong> for a hot day: pretzels, salted watermelon, pickles.</li>
            <li><strong>A shelf-stable bag</strong> that lives in the kit bag, not the cooler: trail mix, dried fruit, a couple of bars.</li>
          </ul>
          <p className="mt-3">
            Nothing on this list should be new. A tournament is the worst possible day to
            discover that your kid does not like something.
          </p>
        </>
      ),
    },
    {
      id: "between-games",
      heading: "What to eat between two games",
      body: (
        <>
          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-primary-soft/40 text-ink">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold">Gap</th>
                  <th className="px-3 py-2 text-left font-semibold">What works</th>
                  <th className="px-3 py-2 text-left font-semibold">Avoid</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-t border-border">
                  <td className="px-3 py-2 font-medium text-ink">Under 1 hour</td>
                  <td className="px-3 py-2">Fluid, a banana, a few pretzels. Small and fast.</td>
                  <td className="px-3 py-2">Anything heavy, fatty, or high fibre.</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-3 py-2 font-medium text-ink">1 to 2 hours</td>
                  <td className="px-3 py-2">Half a sandwich, fruit, yogurt tube, water.</td>
                  <td className="px-3 py-2">A full meal that sits in the stomach at kickoff.</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-3 py-2 font-medium text-ink">2 to 4 hours</td>
                  <td className="px-3 py-2">A proper sandwich or rice bowl, eaten early in the gap.</td>
                  <td className="px-3 py-2">Leaving it until forty minutes before the whistle.</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-3 py-2 font-medium text-ink">Overnight</td>
                  <td className="px-3 py-2">Normal dinner, normal breakfast, fluid across the whole evening.</td>
                  <td className="px-3 py-2">A huge late dinner that wrecks sleep before day two.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            More detail in the{" "}
            <Link href="/guides/what-to-eat-after-a-soccer-game" className="underline underline-offset-2">
              post-game recovery guide
            </Link>
            .
          </p>
        </>
      ),
    },
    {
      id: "heat",
      heading: "Heat: fluid, salt, and shade",
      body: (
        <>
          <p>
            A hot tournament is a different event from a cool one. Sweat carries sodium as well
            as water, and replacing only water across a long hot day is how kids end up cramping
            late in the second game
            <Cite id="NATA-Fluid" />.
          </p>
          <p className="mt-3">
            Practical version: salt the food a little, pack fruit with water in it, and let a
            sports drink do its actual job on days with sustained play in real heat rather than
            treating it as a default beverage
            <Cite id="AAP-Sports-Nutrition" />. Shade and a chair matter as much as any of it.
            Standing in the sun between games costs more than most parents expect.
          </p>
          <p className="mt-3">
            Daily fluid targets, including the ceiling that applies even on a tournament day, are
            in the{" "}
            <Link
              href="/guides/how-much-water-should-a-young-athlete-drink"
              className="underline underline-offset-2"
            >
              hydration guide
            </Link>
            .
          </p>
        </>
      ),
    },
    {
      id: "concession",
      heading: "The concession stand and the hotel breakfast",
      body: (
        <>
          <p>
            Two situations every tournament family meets, and neither needs to be a disaster.
          </p>
          <p className="mt-3">
            <strong>The concession stand.</strong> If it is happening, aim for the least fried
            thing and pair it with water rather than soda. One hot dog between games is not the
            problem. A day of nothing but candy and blue drinks is.
          </p>
          <p className="mt-3">
            <strong>The hotel breakfast.</strong> Eggs if they exist, cereal and milk, a banana,
            toast or a bagel. Skip the waffle machine on a morning with a 9am kickoff, not
            because waffles are evil but because a pile of syrup an hour before a game is a
            gamble on a stomach you need working.
          </p>
        </>
      ),
    },
    {
      id: "non-food",
      heading: "The non-food half of the bag",
      body: (
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Two pairs of socks, minimum. Wet socks ruin day two.</li>
          <li>A folding chair and shade. Standing in the sun between games is a real cost.</li>
          <li>Sunscreen, applied before the first game and again after the second.</li>
          <li>A towel, and a plastic bag for the kit that comes off wet.</li>
          <li>Phone charger. The schedule lives on someone&apos;s phone and tournaments run long.</li>
          <li>Cash. Field-side concessions are often cash only.</li>
        </ul>
      ),
    },
  ],
  howTo: {
    name: "Pack a tournament cooler",
    description: "A repeatable pack for a youth soccer tournament weekend.",
    steps: [
      {
        name: "Freeze the night before",
        text: "Freeze half-full water bottles, a bag of grapes, and yogurt tubes. They chill the cooler and thaw into food.",
      },
      {
        name: "Pack fluid first",
        text: "More water than seems necessary, plus milk on ice for after the last game of the day.",
      },
      {
        name: "Add food the kid already eats",
        text: "Sandwiches or wraps, fruit, something salty. A tournament is not the day to introduce anything new.",
      },
      {
        name: "Pack a shelf-stable bag separately",
        text: "Trail mix and dried fruit live in the kit bag, so there is still food when the cooler runs warm.",
      },
      {
        name: "Plan the gaps",
        text: "Look at the schedule and decide what gets eaten in each gap before you leave the house.",
      },
    ],
  },
  faq: [
    {
      question: "What food should I pack for a soccer tournament?",
      answer:
        "Water and milk, fruit with high water content such as watermelon and grapes, sandwiches or wraps, frozen yogurt tubes, something salty for the heat, and a shelf-stable bag of trail mix that lives outside the cooler.",
    },
    {
      question: "What should a kid eat between two soccer games?",
      answer:
        "With under an hour, keep it to fluid and something small like a banana. With one to two hours, half a sandwich with fruit. With two to four hours, a proper sandwich or rice bowl eaten early in the gap rather than late.",
    },
    {
      question: "How much water should a kid drink at a tournament?",
      answer:
        "More than a normal day, but not without limit. For ages 8 to 12 the daily ceiling is about 100 oz including hot weather, and sodium matters as well as fluid on a hot day.",
    },
    {
      question: "Are sports drinks necessary at tournaments?",
      answer:
        "They earn their place on hot days with sustained play, where the sodium and carbohydrate genuinely help. They are not a default beverage, and energy drinks are never appropriate for children.",
    },
    {
      question: "What is the best way to keep tournament food cold?",
      answer:
        "Freeze half-full water bottles, grapes, and yogurt tubes the night before. They act as the ice pack on the way and become food by mid-morning.",
    },
  ],
  citations: citationsList("NATA_FLUID", "AAP_SPORTS_NUTRITION", "AAP_BRIGHT_FUTURES", "ACSM_2016"),
  relatedRecipes: ["turkey-wrap", "banana-almonds", "chocolate-cherry-recovery"],
  relatedGuides: [
    "what-to-eat-after-a-soccer-game",
    "how-much-water-should-a-young-athlete-drink",
    "what-to-eat-before-a-soccer-game",
  ],
};
