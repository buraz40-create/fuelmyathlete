import type { Guide } from "@/types/domain";
import Link from "next/link";
import { citationsList } from "@/data/citations";
import { Cite } from "@/components/guide/GuideCitations";

export const guide: Guide = {
  slug: "am-pre-workout-meal",
  title: "AM Pre-Workout Meal: What to Eat Before a Morning Workout",
  metaTitle: "AM Pre-Workout Meal: Best Foods Before a Morning Workout",
  metaDescription:
    "What to eat before a morning workout. Timing windows from 5 minutes to 2 hours pre-training, the 30-second AM snack, fasted-training rules for adults and kids.",
  primaryKeyword: "am pre workout meal",
  category: "pre-workout",
  publishedAt: "2026-05-21",
  updatedAt: "2026-05-21",
  readMinutes: 8,
  answer:
    "A morning pre-workout meal should be light, carb-forward, and easy to digest. Best options 30-60 minutes before training: banana with nut butter, white toast with honey, or a small bowl of overnight oats. For training within 15 minutes of waking, sip 8-16 oz water with a piece of toast or a date.",
  sections: [
    {
      id: "should-you-eat",
      heading: "Should you eat before a morning workout?",
      body: (
        <>
          <p>
            For adults: it depends on the workout type and your goals. For short, easy cardio
            under 45 minutes, fasted training is a viable approach. For high-intensity work,
            lifting, or sessions over 60 minutes, eating something â€” even small â€” improves
            performance and recovery per ISSN&apos;s nutrient timing position stand
            <Cite id="ISSN-Timing" />.
          </p>
          <p className="mt-3">
            For children and adolescents: yes, always. AAP&apos;s Bright Futures Sports Nutrition
            guidance is explicit that youth athletes should not train fasted
            <Cite id="AAP-Bright-Futures" />. A small breakfast or snack is non-negotiable for
            kids before practice or a game, even at 7 AM.
          </p>
        </>
      ),
    },
    {
      id: "windows",
      heading: "Morning timing windows: 5 min, 30 min, 1 hour, 2 hours",
      body: (
        <>
          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-primary-soft/40 text-ink">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold">Time to workout</th>
                  <th className="px-3 py-2 text-left font-semibold">Best AM meal</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-t border-border">
                  <td className="px-3 py-2 font-medium text-ink">5-15 min (just woke up)</td>
                  <td className="px-3 py-2">8-16 oz water + 1 date or 1 slice toast with honey</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-3 py-2 font-medium text-ink">30 minutes</td>
                  <td className="px-3 py-2">Banana + 1 tbsp nut butter, or applesauce pouch</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-3 py-2 font-medium text-ink">1 hour</td>
                  <td className="px-3 py-2">Overnight oats, English muffin with PB, or yogurt parfait</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-3 py-2 font-medium text-ink">2 hours</td>
                  <td className="px-3 py-2">Eggs + toast, or full bowl of oatmeal with toppings</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      ),
    },
    {
      id: "5-min",
      heading: "The 5-minute AM pre-workout (when you're rushed)",
      body: (
        <>
          <p>
            You overslept. Practice starts in 15 minutes. The right move is not skipping fuel â€”
            it&apos;s eating the most-digestible carb you have on hand:
          </p>
          <ul className="mt-3 ml-5 flex list-disc flex-col gap-2">
            <li>1 medjool date (~17 g fast carbs)</li>
            <li>1 slice white toast with honey or jam</li>
            <li>1 ripe banana</li>
            <li>4-6 oz orange juice or coconut water</li>
            <li>Applesauce pouch</li>
          </ul>
          <p className="mt-3">
            Skip the protein and fat in this window. They slow digestion and can sit heavy. Hit
            8-12 oz water with the carb. Save the protein for the post-workout meal.
          </p>
        </>
      ),
    },
    {
      id: "30-min",
      heading: "The 30-60 minute AM meal",
      body: (
        <>
          <p>
            The most common AM window. Balance fast carbs with a small protein source:
          </p>
          <ul className="mt-3 ml-5 flex list-disc flex-col gap-2">
            <li>Banana + 1 tbsp peanut butter</li>
            <li>Whole-grain toast + Greek yogurt + drizzle of honey</li>
            <li>Small smoothie: banana + milk + frozen berries + scoop of yogurt</li>
            <li>1/2 bagel + 1 tbsp cream cheese + jelly</li>
            <li>Hard-boiled egg + 1 slice toast</li>
          </ul>
        </>
      ),
    },
    {
      id: "1-2-hour",
      heading: "The 1-2 hour AM meal",
      body: (
        <>
          <p>
            The optimal window for most morning training. Larger meal, full protein/carb pairing:
          </p>
          <ul className="mt-3 ml-5 flex list-disc flex-col gap-2">
            <li>
              <Link href="/recipe/athlete-overnight-oats" className="text-primary underline hover:text-ink">
                Athlete overnight oats
              </Link>{" "}
              â€” make it the night before
            </li>
            <li>
              <Link href="/recipe/eggs-toast" className="text-primary underline hover:text-ink">
                Eggs + whole-grain toast
              </Link>
            </li>
            <li>
              <Link href="/recipe/english-muffin-pb" className="text-primary underline hover:text-ink">
                English muffin + PB + banana
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
              with hidden spinach
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "fasted",
      heading: "Fasted training: when it's OK, when it's not",
      body: (
        <>
          <p>
            Adult athletes can train fasted for short, low-intensity sessions â€” easy zone-2 cardio
            under 45 minutes is the textbook example. For higher intensity or longer duration,
            performance suffers and the workout produces less of the very stimulus you&apos;re
            after.
          </p>
          <p className="mt-3">
            For children and adolescents, fasted training is contraindicated. The AAP&apos;s
            Bright Futures Sports Nutrition guidance and the Council on Sports Medicine&apos;s
            position on healthy weight-control practices in young athletes both reinforce that
            youth must fuel before activity<Cite id="AAP-Bright-Futures" /><Cite id="AAP-Promotion" />.
            A small banana, a slice of toast, or a few ounces of milk takes 30 seconds and is the
            safety floor.
          </p>
        </>
      ),
    },
    {
      id: "caffeine",
      heading: "Coffee, caffeine, and AM pre-workout",
      body: (
        <>
          <p>
            For adults, 3-6 mg of caffeine per kg of body weight 30-60 minutes before exercise
            modestly improves endurance and high-intensity performance â€” a standard finding across
            ISSN literature<Cite id="ISSN-Timing" />. Coffee, green tea, or a caffeinated
            pre-workout supplement falls in this range for most adults.
          </p>
          <p className="mt-3">
            For children and adolescents, the AAP clinical report on caffeinated products
            recommends against routine caffeine use<Cite id="AAP-Sports-Nutrition" />.
            Caffeinated pre-workout supplements specifically should not be given to anyone under
            18.
          </p>
        </>
      ),
    },
    {
      id: "hydration",
      heading: "AM hydration: water first, then food",
      body: (
        <>
          <p>
            Overnight dehydration is real. Most athletes wake at 1-2% body-mass deficit just from
            respiration and bathroom trips. NATA recommends 16-20 oz water on rising for any
            athlete training within 2 hours<Cite id="NATA-Fluid" />. Drink the water before you
            decide what to eat â€” that alone addresses much of the morning energy slump.
          </p>
          <p className="mt-3">
            The FuelMyAthlete{" "}
            <Link href="/planner" className="text-primary underline">
              hydration tracker
            </Link>{" "}
            sets daily targets by age and body weight, with a hot-weather adjustment for summer
            morning practices.
          </p>
        </>
      ),
    },
    {
      id: "kids",
      heading: "Morning pre-workout for young athletes",
      body: (
        <>
          <p>
            Kids before 7 AM swim practice, soccer scrimmage, or first-period PE need a small
            carb-forward breakfast even if they say they&apos;re not hungry. Fasted training is
            not appropriate for athletes under 18 per AAP. The default options:
          </p>
          <ul className="mt-3 ml-5 flex list-disc flex-col gap-2">
            <li>Banana + 8 oz milk</li>
            <li>1 slice toast with peanut butter + a glass of water</li>
            <li>Half a bagel with cream cheese</li>
            <li>Small bowl of overnight oats made the night before</li>
            <li>4 oz orange juice + a granola bar</li>
          </ul>
          <p className="mt-3">
            None of these takes more than 2 minutes. The investment pays off in attention,
            recovery, and the day-long energy that protects against the post-practice crash.
          </p>
        </>
      ),
    },
  ],
  faq: [
    {
      question: "Should I eat before a morning workout?",
      answer:
        "For adult athletes, yes for anything over 45 minutes or above moderate intensity. For short easy cardio, fasted training is fine. For children and adolescents, always yes â€” AAP guidance is explicit that youth athletes should not train fasted.",
    },
    {
      question: "What should I eat 30 minutes before a morning workout?",
      answer:
        "A small fast-acting carb: a banana with nut butter, a slice of toast with honey, an applesauce pouch, or a small yogurt with granola. Skip heavy fats and high fiber in this window.",
    },
    {
      question: "Is it OK to work out on an empty stomach in the morning?",
      answer:
        "For adults doing short, easy sessions, yes. For high-intensity training, lifting, or endurance work, eating something improves performance. Children and adolescents should never train fasted, per AAP guidance.",
    },
    {
      question: "What's the best breakfast before a workout?",
      answer:
        "Overnight oats with banana and Greek yogurt, or eggs with whole-grain toast. Both are 1-2 hour meals that pair complex carbs with quality protein. For shorter timing windows, a smoothie or banana with peanut butter works.",
    },
    {
      question: "Should I drink coffee before a morning workout?",
      answer:
        "Adults can benefit from 3-6 mg/kg of caffeine 30-60 minutes before training for endurance and high-intensity performance. Children and adolescents should not use caffeine for performance, per AAP clinical guidance.",
    },
  ],
  citations: citationsList(
    "ISSN_TIMING",
    "ISSN_PROTEIN",
    "ACSM_2016",
    "NATA_FLUID",
    "AAP_BRIGHT_FUTURES",
    "AAP_PROMOTION",
    "AAP_SPORTS_NUTRITION",
    "ARAGON_SCHOENFELD"
  ),
  relatedRecipes: [
    "athlete-overnight-oats",
    "eggs-toast",
    "english-muffin-pb",
    "yogurt-parfait",
    "berry-smoothie",
    "banana-almonds",
  ],
  relatedGuides: [
    "what-is-a-good-pre-workout-meal",
    "pre-workout-meal-oatmeal",
    "best-pre-workout-meal",
    "pre-game-meal-for-kids",
  ],
};
