import type { Guide } from "@/types/domain";
import Link from "next/link";
import { citationsList } from "@/data/citations";
import { Cite } from "@/components/guide/GuideCitations";
import { HydrationCalculator } from "@/components/guide/HydrationCalculator";
import { GuideCallout, GuideStat } from "@/components/guide/GuideCallout";

export const guide: Guide = {
  slug: "how-much-water-should-a-young-athlete-drink",
  title: "How Much Water Should a Young Athlete Drink?",
  metaTitle: "How Much Water Should an 11 Year Old Athlete Drink Per Day?",
  metaDescription:
    "The daily ounces for a youth athlete, by day type: 64 oz baseline, plus 16 oz for practice, plus 24 oz for a match, plus 10% in heat, capped at 100 oz. Cited to AAP and NATA.",
  primaryKeyword: "how much water should a young athlete drink",
  category: "hydration",
  publishedAt: "2026-08-19",
  updatedAt: "2026-08-19",
  readMinutes: 7,
  answer:
    "A youth athlete aged 8 to 12 should drink about 64 oz of water on an ordinary day, plus 16 oz on a practice day and 24 oz on a match day. Add roughly 10% more in hot weather. The American Academy of Pediatrics and the National Athletic Trainers' Association both caution against pushing far beyond thirst, so cap the day at 100 oz.",
  sections: [
    {
      id: "the-baseline",
      heading: "How much water should a young athlete drink per day?",
      body: (
        <>
          <p>
            Start at <strong>64 oz per day</strong> for a child aged 8 to 12, which is the eight
            cups most pediatric guidance lands on for an active school-age kid
            <Cite id="AAP-Bright-Futures" />. That is the ordinary day: school, homework, playing
            outside, no training session.
          </p>
          <p className="mt-3">
            Then add for what the day actually asks of the body. A training session adds about{" "}
            <strong>16 oz</strong>. A match adds about <strong>24 oz</strong>, because matches
            run longer, run hotter, and start with a warm-up
            <Cite id="NATA-Fluid" />.
          </p>
          <p className="mt-3">
            Most parents are surprised by how much of that is not about the game at all. The
            majority of the number is baseline living. A kid who arrives at practice already
            behind cannot drink their way back during it.
          </p>
        </>
      ),
    },
    {
      id: "by-day-type",
      heading: "Daily targets by day type",
      body: (
        <>
          <HydrationCalculator />

          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-primary-soft/40 text-ink">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold">Day</th>
                  <th className="px-3 py-2 text-left font-semibold">Age 8 to 12</th>
                  <th className="px-3 py-2 text-left font-semibold">In heat</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-t border-border">
                  <td className="px-3 py-2 font-medium text-ink">Rest or school day</td>
                  <td className="px-3 py-2">64 oz (8 cups)</td>
                  <td className="px-3 py-2">70 oz</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-3 py-2 font-medium text-ink">Training day</td>
                  <td className="px-3 py-2">80 oz (10 cups)</td>
                  <td className="px-3 py-2">88 oz</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-3 py-2 font-medium text-ink">Match day</td>
                  <td className="px-3 py-2">88 oz (11 cups)</td>
                  <td className="px-3 py-2">97 oz</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-3 py-2 font-medium text-ink">Absolute daily ceiling</td>
                  <td className="px-3 py-2">100 oz</td>
                  <td className="px-3 py-2">100 oz</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Teenagers scale up with body size, roughly 0.55 oz per pound as a floor of 64 oz,
            with a 150 oz ceiling. Adults use about 0.6 oz per pound
            <Cite id="ACSM-2016" />. The{" "}
            <Link href="/planner" className="underline underline-offset-2">
              planner
            </Link>{" "}
            does this arithmetic per day and shows the working.
          </p>
        </>
      ),
    },
    {
      id: "heat",
      heading: "How much extra in the heat?",
      body: (
        <>
          <p>
            Add about <strong>10%</strong>, not 25%. Heat guidance written for adult endurance
            athletes gets copied onto children constantly, and the additions compound: a bigger
            baseline, plus a bigger exercise addition, plus a bigger heat multiplier, and
            suddenly an 11-year-old is being told to drink well past any sensible ceiling.
          </p>
          <p className="mt-3">
            Children also thermoregulate differently from adults. They produce more heat per
            kilogram of body mass, sweat less efficiently, and acclimatize to heat more slowly
            <Cite id="NATA-Fluid" />. The answer to a hot Florida August is not only more fluid.
            It is earlier practice times, shade, breaks, and lighter kit.
          </p>
        </>
      ),
    },
    {
      id: "too-much",
      heading: "Can a kid drink too much water?",
      body: (
        <>
          <div className="mb-5 grid gap-3 sm:grid-cols-[160px_1fr] sm:items-center">
            <GuideStat value={100} unit="oz" caption="Hard daily ceiling for ages 8 to 12" />
            <GuideCallout kind="safety" title="Why there is a ceiling at all">
              Almost every other page tells a parent to drink more. Children carry a smaller
              blood volume for the same amount of fluid, so the same over-drinking that an adult
              shrugs off can dilute a child&apos;s blood sodium.
            </GuideCallout>
          </div>

          <p>
            Yes, and this is the part almost nobody tells parents. Drinking far past thirst
            dilutes the sodium in the blood, a condition called exercise-associated hyponatremia.
            It is rare, it is serious, and children are more vulnerable to it than adults because
            they have a smaller blood volume for the same absolute amount of fluid
            <Cite id="NATA-Fluid" />.
          </p>
          <p className="mt-3">
            That is the reason for the 100 oz ceiling. Practically, it almost never comes up
            through normal drinking. It comes up when a well-meaning adult sets a number and a
            child dutifully hits it whether thirsty or not. If your kid is drinking to a target
            rather than to thirst on a cool rest day, the target is wrong.
          </p>
          <p className="mt-3">
            Two signals that matter more than the number: pale straw urine several times a day,
            and a child who is not asking for water because they already had some.
          </p>
        </>
      ),
    },
    {
      id: "signs",
      heading: "Signs a young athlete is behind on fluid",
      body: (
        <>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>Dark yellow urine, or not needing the bathroom across a whole school day</li>
            <li>Fading in the second half specifically, rather than being tired from the start</li>
            <li>Headache after practice that resolves with a drink and a snack</li>
            <li>Cramping late in a match, especially in a kid who sweats visibly salty</li>
            <li>Irritability and poor focus, which shows up before thirst does in children</li>
          </ul>
          <p className="mt-3">
            Thirst is a late signal in kids. By the time an 11-year-old says they are thirsty,
            they have usually been behind for a while, which is why the drinking starts two hours
            before kickoff and not five minutes before.
          </p>
        </>
      ),
    },
    {
      id: "how-to-actually",
      heading: "Getting a kid to actually drink it",
      body: (
        <>
          <p>
            The number is the easy part. Eight to eleven cups is a lot of trips to a bottle for
            someone who would rather be playing.
          </p>
          <ul className="mt-3 list-disc space-y-1.5 pl-5">
            <li>Front-load the morning. Two cups before leaving the house is a third of a rest day.</li>
            <li>
              Send a bottle they like and can open one-handed. The bottle matters more than any
              advice on this page.
            </li>
            <li>
              Water-heavy food counts. Watermelon, grapes, oranges, and milk all contribute to the
              day&apos;s total.
            </li>
            <li>
              Cold beats room temperature for how much a child voluntarily drinks, especially in
              heat.
            </li>
            <li>
              Sports drinks are for sessions over an hour in real heat, not for a Tuesday practice
              <Cite id="AAP-Sports-Nutrition" />. Energy drinks are never appropriate for children.
            </li>
          </ul>
        </>
      ),
    },
  ],
  howTo: {
    name: "Work out a young athlete's daily water target",
    description:
      "A repeatable way to set a youth athlete's fluid target for any day, using AAP and NATA guidance.",
    steps: [
      {
        name: "Start at the baseline",
        text: "Begin at 64 oz per day for a child aged 8 to 12. Teens scale with body weight from a 64 oz floor.",
      },
      {
        name: "Add for the session",
        text: "Add 16 oz for a training day, or 24 oz for a match day. Add nothing on a rest day.",
      },
      {
        name: "Adjust for heat",
        text: "In hot weather add about 10% to the running total. Do not use adult heat guidance of 25% or more for a child.",
      },
      {
        name: "Apply the ceiling",
        text: "Cap the day at 100 oz for a child. If the arithmetic exceeds it, the ceiling wins.",
      },
      {
        name: "Check against the kid, not the chart",
        text: "Confirm with pale straw urine and a child who is drinking to thirst. Any target that requires forcing fluid is wrong.",
      },
    ],
  },
  faq: [
    {
      question: "How much water should an 11 year old athlete drink per day?",
      answer:
        "About 64 oz on a rest or school day, 80 oz on a training day, and 88 oz on a match day. Add roughly 10% in hot weather, and never exceed 100 oz in a day.",
    },
    {
      question: "How much should a kid drink before a game?",
      answer:
        "About 16 oz two hours before kickoff, then 8 oz about fifteen minutes before. Starting two hours out gives the body time to absorb it and the child time to use the bathroom before the whistle.",
    },
    {
      question: "Can a child drink too much water?",
      answer:
        "Yes. Drinking far beyond thirst can dilute blood sodium, a condition called hyponatremia, and children are more vulnerable to it than adults. Cap a child's day at 100 oz and let thirst lead.",
    },
    {
      question: "Do sports drinks help young athletes?",
      answer:
        "Only for sustained activity over about 60 minutes, especially in heat, where the sodium and carbohydrate genuinely help. For a normal practice, water is the correct answer. The AAP is explicit that energy drinks are never appropriate for children.",
    },
    {
      question: "Does food count toward the daily total?",
      answer:
        "Yes. Watermelon, grapes, oranges, yogurt, and milk all carry meaningful water. A hot tournament morning is a good reason to pack watermelon rather than to hand a kid a third bottle.",
    },
    {
      question: "How much more water in hot weather?",
      answer:
        "Roughly 10% more for a child, not the 25% often quoted for adult endurance athletes. Heat management also means earlier sessions, shade, and breaks, not fluid alone.",
    },
  ],
  citations: citationsList(
    "AAP_BRIGHT_FUTURES",
    "NATA_FLUID",
    "AAP_SPORTS_NUTRITION",
    "AAP_PROMOTION",
    "ACSM_2016"
  ),
  relatedRecipes: ["berry-smoothie", "green-machine", "yogurt-honey-berries"],
  relatedGuides: ["pre-game-meal-for-kids", "what-to-eat-before-a-soccer-game"],
};
