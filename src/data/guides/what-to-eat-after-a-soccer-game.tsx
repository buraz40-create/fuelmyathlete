import type { Guide } from "@/types/domain";
import Link from "next/link";
import { citationsList } from "@/data/citations";
import { Cite } from "@/components/guide/GuideCitations";

export const guide: Guide = {
  slug: "what-to-eat-after-a-soccer-game",
  title: "What to Eat After a Soccer Game: A Recovery Guide for Kids",
  metaTitle: "What to Eat After a Soccer Game (Kids): Recovery Foods and Timing",
  metaDescription:
    "What a young athlete should eat after a game, from the first 30 minutes on the sideline to dinner. Includes the 9pm game problem and back to back tournament days.",
  primaryKeyword: "what to eat after a soccer game kids",
  category: "post-workout",
  publishedAt: "2026-08-19",
  updatedAt: "2026-08-19",
  readMinutes: 7,
  answer:
    "Give a young athlete carbohydrate and protein together within about 30 to 60 minutes of the final whistle, then a normal meal within two hours. Chocolate milk, a turkey sandwich, or yogurt with fruit all work. Fluid matters as much as food: replace what was lost during the game before worrying about the perfect plate.",
  sections: [
    {
      id: "why-after",
      heading: "Why the meal after the game matters",
      body: (
        <>
          <p>
            Pre-game food gets all the attention and post-game food does more of the work,
            especially in youth sport where the same kid plays again tomorrow. A match empties
            muscle glycogen, and the body refills it fastest in the hours immediately after
            <Cite id="ISSN-Timing" />.
          </p>
          <p className="mt-3">
            For a single Saturday game with nothing until next week, this matters much less than
            the internet suggests. Normal eating over the rest of the day covers it. It starts
            mattering when there is another game inside 24 hours, which in youth soccer means
            tournament weekends, and those are exactly the weekends parents feel it going wrong.
          </p>
        </>
      ),
    },
    {
      id: "timeline",
      heading: "The recovery timeline",
      body: (
        <>
          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-primary-soft/40 text-ink">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold">When</th>
                  <th className="px-3 py-2 text-left font-semibold">What</th>
                  <th className="px-3 py-2 text-left font-semibold">Why</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-t border-border">
                  <td className="px-3 py-2 font-medium text-ink">Final whistle to 30 min</td>
                  <td className="px-3 py-2">Fluid first, then carbs with some protein. Chocolate milk is the classic.</td>
                  <td className="px-3 py-2">Easiest window to hit, and drinkable food beats a plate nobody eats in a car park.</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-3 py-2 font-medium text-ink">30 to 60 min</td>
                  <td className="px-3 py-2">A real snack: a turkey sandwich, yogurt and fruit, or apple slices with cheese.</td>
                  <td className="px-3 py-2">Bridges the gap when the drive home is long.</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-3 py-2 font-medium text-ink">Within 2 hours</td>
                  <td className="px-3 py-2">A normal balanced meal: rice or pasta, a protein, vegetables, water.</td>
                  <td className="px-3 py-2">This is the meal that actually does the refuelling.</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-3 py-2 font-medium text-ink">Before bed</td>
                  <td className="px-3 py-2">Milk, yogurt, or cottage cheese if dinner was early or light.</td>
                  <td className="px-3 py-2">Overnight repair, and it settles a kid who is hungry at 9pm.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            The{" "}
            <Link href="/planner" className="underline underline-offset-2">
              planner
            </Link>{" "}
            treats match days differently from training days, so the portions on a game day
            already account for this.
          </p>
        </>
      ),
    },
    {
      id: "chocolate-milk",
      heading: "Is chocolate milk really the best recovery drink?",
      body: (
        <>
          <p>
            For a youth athlete it is hard to beat, and the reason is boring: it has
            carbohydrate and protein in roughly the ratio recovery calls for, it replaces fluid,
            it is cold, and children actually finish it
            <Cite id="ISSN-Timing" />. A recovery product a kid refuses has a nutritional value
            of zero.
          </p>
          <p className="mt-3">
            No supplement is needed here, and none is appropriate for a child. Whole food and
            milk cover it.
          </p>
        </>
      ),
    },
    {
      id: "nine-pm",
      heading: "The 9pm game problem",
      body: (
        <>
          <p>
            Late kickoffs are the hardest case in youth sport. The kid gets home wired, hungry,
            and too tired to eat a full dinner, and a heavy meal at 10pm ruins sleep, which
            matters more for an 11-year-old than any recovery macro.
          </p>
          <p className="mt-3">What works, in order of how well it holds up:</p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5">
            <li>Eat the real dinner <strong>before</strong> the game, earlier than feels natural, and treat the post-game food as a top-up.</li>
            <li>Have something ready in the car so the window is not spent driving.</li>
            <li>Keep the late food small and familiar: milk, a sandwich, yogurt, fruit.</li>
            <li>Protect sleep over the perfect plate. Sleep is the recovery intervention with the strongest evidence in young athletes.</li>
          </ul>
        </>
      ),
    },
    {
      id: "tournament",
      heading: "Back to back games and tournament days",
      body: (
        <>
          <p>
            This is where recovery eating earns its place. Two games in a day, or a Saturday and
            Sunday fixture, means the window between them is the whole strategy.
          </p>
          <ul className="mt-3 list-disc space-y-1.5 pl-5">
            <li>
              <strong>Under 2 hours between games:</strong> fluid, fruit, and something light and
              carbohydrate based. Nothing heavy, nothing fatty, nothing new.
            </li>
            <li>
              <strong>2 to 4 hours:</strong> a proper sandwich or a rice bowl, eaten early in the
              gap rather than late.
            </li>
            <li>
              <strong>Overnight between days:</strong> a normal dinner, a normal breakfast, and
              attention to fluid across the whole day rather than a single big drink.
            </li>
          </ul>
          <p className="mt-3">
            Heat changes the arithmetic. On a hot tournament day, sodium lost in sweat needs
            replacing alongside fluid, which is a reason to salt food a little and to pack
            watermelon and other water-heavy fruit
            <Cite id="NATA-Fluid" />. See the{" "}
            <Link
              href="/guides/how-much-water-should-a-young-athlete-drink"
              className="underline underline-offset-2"
            >
              hydration guide
            </Link>{" "}
            for the daily numbers, including the 100 oz ceiling.
          </p>
        </>
      ),
    },
    {
      id: "wont-eat",
      heading: "When a kid will not eat after a game",
      body: (
        <>
          <p>
            Common, and usually not a problem. Hard exercise blunts appetite for a while, and
            forcing food on a child who is not hungry teaches something worse than a missed
            recovery window.
          </p>
          <ul className="mt-3 list-disc space-y-1.5 pl-5">
            <li>Lead with fluid. A drink often unlocks the appetite twenty minutes later.</li>
            <li>Offer cold over hot. Smoothies, milk, and fruit go down when a hot plate will not.</li>
            <li>Offer small. Half a sandwich accepted beats a full plate refused.</li>
            <li>
              If a child is regularly not eating after games and is also tired, moody, or not
              growing as expected, that is a conversation with a pediatrician, not a nutrition
              tweak
              <Cite id="AAP-Promotion" />.
            </li>
          </ul>
        </>
      ),
    },
  ],
  howTo: {
    name: "Feed a young athlete after a game",
    description: "A simple post-game recovery sequence for a youth soccer player.",
    steps: [
      {
        name: "Drink first",
        text: "Start with fluid at the final whistle. Water is fine; milk does double duty as fluid and food.",
      },
      {
        name: "Carbs with protein inside about an hour",
        text: "Chocolate milk, a turkey sandwich, or yogurt with fruit. Keep it familiar and easy to eat in a car.",
      },
      {
        name: "A normal meal within two hours",
        text: "Rice or pasta, a protein, vegetables. This is the meal that does the real refuelling.",
      },
      {
        name: "Check the next fixture",
        text: "If there is another game within 24 hours, treat the gap as part of the plan rather than an afterthought.",
      },
      {
        name: "Protect sleep",
        text: "After a late game, favour a small familiar snack and an earlier bedtime over a large meal.",
      },
    ],
  },
  faq: [
    {
      question: "What should a kid eat right after a soccer game?",
      answer:
        "Something with carbohydrate and protein within about 30 to 60 minutes, plus fluid. Chocolate milk, a turkey sandwich, or yogurt with fruit all work. Then a normal meal within two hours.",
    },
    {
      question: "Is chocolate milk good for young athletes after games?",
      answer:
        "Yes. It supplies carbohydrate, protein, and fluid together in a form children reliably finish, which matters more than any theoretical advantage of a product they refuse.",
    },
    {
      question: "What if the game ends at 9pm?",
      answer:
        "Move the real dinner to before the game and keep the post-game food small and familiar, such as milk, a sandwich, or yogurt. Protecting sleep matters more for a child than hitting a recovery window.",
    },
    {
      question: "What should a kid eat between two games in one day?",
      answer:
        "With under two hours between them, keep it light and carbohydrate based with plenty of fluid. With two to four hours, a sandwich or a rice bowl eaten early in the gap works better than a large meal eaten late.",
    },
    {
      question: "Do young athletes need protein shakes after games?",
      answer:
        "No. Whole food and milk cover recovery for a child, and supplements are not appropriate for young athletes. If a kid will not eat, a homemade smoothie is a food, not a supplement.",
    },
    {
      question: "How soon after a game should a kid eat?",
      answer:
        "Aim for something within 30 to 60 minutes and a proper meal within two hours. If the next game is more than a day away, ordinary eating across the rest of the day is enough.",
    },
  ],
  citations: citationsList(
    "ISSN_TIMING",
    "NATA_FLUID",
    "AAP_BRIGHT_FUTURES",
    "AAP_PROMOTION",
    "ACSM_2016"
  ),
  relatedRecipes: [
    "chocolate-cherry-recovery",
    "turkey-wrap",
    "chicken-rice-broccoli",
    "yogurt-parfait",
  ],
  relatedGuides: [
    "how-much-water-should-a-young-athlete-drink",
    "pre-game-meal-for-kids",
    "what-to-eat-before-a-soccer-game",
  ],
};
