import type { Guide } from "@/types/domain";
import Link from "next/link";
import { citationsList } from "@/data/citations";
import { Cite } from "@/components/guide/GuideCitations";

export const guide: Guide = {
  slug: "after-school-snack-before-practice",
  title: "The After School Snack Before Practice",
  metaTitle: "After School Snack Before Practice: What to Feed a Young Athlete",
  metaDescription:
    "The 3:30 to 5:00 problem: what a young athlete should eat between school and practice, including options that survive a hot car and get eaten in the back seat.",
  primaryKeyword: "after school snack before practice",
  category: "pre-workout",
  publishedAt: "2026-08-19",
  updatedAt: "2026-08-19",
  readMinutes: 6,
  answer:
    "Give a mostly carbohydrate snack with a little protein about 60 to 90 minutes before practice: a banana with peanut butter, a turkey and cheese roll, a tortilla with banana and honey, or leftover rice and chicken in a cup. Keep fat and fibre low, because they slow digestion, and send water with it.",
  sections: [
    {
      id: "the-window",
      heading: "The 3:30 problem",
      body: (
        <>
          <p>
            School ends, practice starts at five, and somewhere in between a child has to eat
            something that will still be working at seven. Lunch was at eleven thirty. By the
            time warm-ups begin they are often five hours past their last real food.
          </p>
          <p className="mt-3">
            This is the most commonly skipped meal in youth sport and one of the most useful.
            A kid who fades in the last twenty minutes is often not unfit. They are running on a
            school lunch.
          </p>
        </>
      ),
    },
    {
      id: "timing",
      heading: "How long before practice?",
      body: (
        <>
          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-primary-soft/40 text-ink">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold">Time before</th>
                  <th className="px-3 py-2 text-left font-semibold">What to send</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-t border-border">
                  <td className="px-3 py-2 font-medium text-ink">90 minutes</td>
                  <td className="px-3 py-2">A small meal: rice and chicken, a sandwich, a wrap.</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-3 py-2 font-medium text-ink">60 minutes</td>
                  <td className="px-3 py-2">Snack with a little protein: banana and peanut butter, turkey and cheese roll, yogurt.</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-3 py-2 font-medium text-ink">30 minutes</td>
                  <td className="px-3 py-2">Fast carbs only: banana, apple sauce, a few pretzels, water.</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-3 py-2 font-medium text-ink">In the car, 10 minutes</td>
                  <td className="px-3 py-2">Liquid: milk, a smoothie. Solid food this close usually comes back up or gets refused.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            The pattern is the same one that governs pre-game eating: the closer to activity,
            the smaller, simpler and more liquid it gets
            <Cite id="AAP-Bright-Futures" />.
          </p>
        </>
      ),
    },
    {
      id: "car-food",
      heading: "Food that works in a car",
      body: (
        <>
          <p>
            Most of these snacks are eaten in a back seat between the school pickup line and the
            field. That rules out more than parents expect: no plate, no more than one utensil,
            nothing that spills, nothing that needs to stay hot, and it has to be finishable in
            about ten minutes.
          </p>
          <ul className="mt-3 list-disc space-y-1.5 pl-5">
            <li><strong>Leftover rice and chicken in a cup.</strong> Room temperature is fine. One fork.</li>
            <li><strong>Turkey and cheese rolled up</strong>, with an orange. No bread, no crumbs.</li>
            <li><strong>Tortilla with banana and honey</strong>, rolled and sliced into coins.</li>
            <li><strong>Peanut butter and honey on whole grain</strong>, cut into quarters.</li>
            <li><strong>A smoothie in a bottle</strong> for the days when nothing solid is happening.</li>
          </ul>
          <p className="mt-3">
            Two practical notes. Anything chocolate melts in a car in a Florida afternoon. And
            water goes in the bag every time, because the snack is only half the job.
          </p>
        </>
      ),
    },
    {
      id: "what-to-skip",
      heading: "What to skip",
      body: (
        <>
          <ul className="list-disc space-y-1.5 pl-5">
            <li><strong>Heavy fat right before running.</strong> Fried food and creamy sauces sit in the stomach and come back at sprint three.</li>
            <li><strong>A lot of fibre.</strong> Fine at dinner, unkind an hour before a session.</li>
            <li><strong>Pure sugar with nothing attached.</strong> Candy alone gives a short lift and a slump in the middle of practice.</li>
            <li><strong>Energy drinks.</strong> Never appropriate for children, whatever the marketing on the can says<Cite id="AAP-Sports-Nutrition" />.</li>
            <li><strong>Nothing at all.</strong> The most common option and the worst one.</li>
          </ul>
        </>
      ),
    },
    {
      id: "wont-eat",
      heading: "If they will not eat after school",
      body: (
        <>
          <p>
            Some kids come out of school genuinely uninterested in food, especially if they are
            nervous about a session. Forcing it turns a snack into a fight you then repeat twice
            a week.
          </p>
          <ul className="mt-3 list-disc space-y-1.5 pl-5">
            <li>Try liquid. A smoothie or milk goes down when a sandwich will not.</li>
            <li>Make it smaller. Half of something eaten beats all of something refused.</li>
            <li>Make it the same thing every Tuesday. Routine does a lot of the work.</li>
            <li>Let them choose between two options you are happy with, rather than asking an open question in a car.</li>
          </ul>
          <p className="mt-3">
            The{" "}
            <Link href="/planner" className="underline underline-offset-2">
              planner
            </Link>{" "}
            keeps a snack slot on training days for exactly this, and the grocery list picks up
            whatever you choose.
          </p>
        </>
      ),
    },
  ],
  howTo: {
    name: "Feed a young athlete between school and practice",
    description: "A simple routine for the gap between the school bell and warm-ups.",
    steps: [
      {
        name: "Work backwards from the whistle",
        text: "Aim for 60 to 90 minutes before the session starts, not the time you happen to leave the house.",
      },
      {
        name: "Lead with carbohydrate",
        text: "Fruit, bread, rice or a tortilla, with a small amount of protein alongside.",
      },
      {
        name: "Keep fat and fibre low",
        text: "Both slow digestion, which is fine at dinner and unhelpful before running.",
      },
      {
        name: "Make it car-shaped",
        text: "No plate, one utensil at most, nothing that spills or melts, finishable in ten minutes.",
      },
      {
        name: "Send water with it",
        text: "The snack is half the job. Arriving hydrated is the other half.",
      },
    ],
  },
  faq: [
    {
      question: "What should a kid eat before practice after school?",
      answer:
        "A mostly carbohydrate snack with a little protein, about 60 to 90 minutes before. A banana with peanut butter, a turkey and cheese roll, or leftover rice and chicken all work.",
    },
    {
      question: "How long before practice should a child eat?",
      answer:
        "About 60 to 90 minutes for a snack, 30 minutes for fast carbohydrate only, and liquid such as milk or a smoothie if there are only ten minutes left in the car.",
    },
    {
      question: "What are good car snacks before practice?",
      answer:
        "Leftover rice and chicken in a cup, turkey and cheese rolled up with an orange, a tortilla with banana and honey sliced into coins, or peanut butter and honey on whole grain cut into quarters.",
    },
    {
      question: "Should a young athlete eat before or after practice?",
      answer:
        "Both, and neither has to be large. A snack before keeps the session from running on a school lunch, and a meal after refuels for the next day.",
    },
    {
      question: "What if my kid refuses to eat before practice?",
      answer:
        "Offer liquid instead of solid, make the portion smaller, keep the same option on the same weekday so it becomes routine, and offer a choice between two acceptable things rather than an open question.",
    },
  ],
  citations: citationsList("AAP_BRIGHT_FUTURES", "AAP_SPORTS_NUTRITION", "NATA_FLUID", "ISSN_TIMING"),
  relatedRecipes: ["apple-pb", "banana-almonds", "turkey-wrap", "berry-smoothie"],
  relatedGuides: [
    "pre-game-meal-for-kids",
    "how-much-water-should-a-young-athlete-drink",
    "what-to-eat-after-a-soccer-game",
  ],
};
