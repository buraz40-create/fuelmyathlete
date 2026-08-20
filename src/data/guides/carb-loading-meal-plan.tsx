import type { Guide } from "@/types/domain";
import Link from "next/link";
import { citationsList } from "@/data/citations";
import { Cite } from "@/components/guide/GuideCitations";

export const guide: Guide = {
  slug: "carb-loading-meal-plan",
  title: "Carb Loading Meal Plan: The Athlete's Guide to Pre-Event Fueling",
  metaTitle: "Carb Loading Meal Plan: 3-Day and Tournament-Weekend Protocols",
  metaDescription:
    "Carb loading meal plans for endurance events and youth soccer tournaments. The 3-day adult protocol, the 1-day modified plan, full meal grids, and what NOT to do.",
  primaryKeyword: "carb loading meal plan",
  category: "match-day",
  publishedAt: "2026-05-21",
  updatedAt: "2026-05-21",
  readMinutes: 10,
  answer:
    "A carb loading meal plan increases daily carbohydrate intake to 8-12 g per kg of body weight for 1-3 days before an endurance event over 90 minutes. Focus meals on white rice, pasta, bread, bananas, and sports drinks. Cut fiber, fat, and new foods. For youth athletes, a modified 1-day plan is usually enough.",
  sections: [
    {
      id: "what-is-it",
      heading: "What is a carb loading meal plan?",
      body: (
        <>
          <p>
            Carb loading is a 1-3 day pre-event dietary protocol that maxes out muscle and liver
            glycogen stores by raising carbohydrate intake to 8-12 grams per kilogram of body
            weight per day. Burke et al.&apos;s classic Journal of Sports Sciences review on
            carbohydrate for training and competition documents that this elevation produces a
            2-3% performance gain in events lasting longer than 90 minutes
            <Cite id="Burke-Carb" />.
          </p>
          <p className="mt-3">
            For events under 90 minutes, a standard youth soccer game, a 5K, most strength
            sessions, carb loading is overkill. A standard pre-game meal is sufficient. See our{" "}
            <Link href="/guides/what-to-eat-before-a-soccer-game" className="text-primary underline">
              soccer pre-game guide
            </Link>{" "}
            for that protocol.
          </p>
        </>
      ),
    },
    {
      id: "who-benefits",
      heading: "Who actually benefits from carb loading",
      body: (
        <>
          <p>Carb loading is for athletes facing one of these:</p>
          <ul className="mt-3 ml-5 flex list-disc flex-col gap-2">
            <li>Marathon or half-marathon</li>
            <li>Triathlon (Olympic distance or longer)</li>
            <li>Long bike race (60+ miles)</li>
            <li>Tournament weekend (2-4 matches over 1-2 days)</li>
            <li>Football, lacrosse, or soccer match exceeding 90 minutes</li>
            <li>Long hike or backpacking trip with sustained exertion</li>
          </ul>
          <p className="mt-3">
            Athletes doing strength training, weekend pickup soccer, gym workouts, or any single
            event under an hour do not benefit. Standard daily nutrition is the right approach.
          </p>
        </>
      ),
    },
    {
      id: "math",
      heading: "How many grams of carbs per day during loading",
      body: (
        <>
          <p>
            Per ACSM and ISSN guidance, the daily target during a carb load is 8-12 g
            carbohydrate per kg of body weight, with the upper end on the final 1-2 days before
            the event<Cite id="ACSM-2016" /><Cite id="ISSN-Timing" />. The math by body weight:
          </p>
          <div className="mt-4 overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-primary-soft/40 text-ink">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold">Body weight</th>
                  <th className="px-3 py-2 text-left font-semibold">Daily carbs (8-12 g/kg)</th>
                  <th className="px-3 py-2 text-left font-semibold">Day-2 example</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-t border-border">
                  <td className="px-3 py-2 font-medium text-ink">120 lb (54 kg)</td>
                  <td className="px-3 py-2">432-648 g</td>
                  <td className="px-3 py-2">Oatmeal + pasta + rice bowl + bagel snacks</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-3 py-2 font-medium text-ink">150 lb (68 kg)</td>
                  <td className="px-3 py-2">544-816 g</td>
                  <td className="px-3 py-2">Larger portions of each + more snacks</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-3 py-2 font-medium text-ink">180 lb (82 kg)</td>
                  <td className="px-3 py-2">656-984 g</td>
                  <td className="px-3 py-2">Full carb-bomb meals + 4 carb snacks</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-3 py-2 font-medium text-ink">220 lb (100 kg)</td>
                  <td className="px-3 py-2">800-1,200 g</td>
                  <td className="px-3 py-2">5+ carb meals/snacks, sports drinks between</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      ),
    },
    {
      id: "3-day",
      heading: "The 3-day carb loading meal plan",
      body: (
        <>
          <p>
            The 3-day protocol is the standard for marathons, half-marathons, and triathlons. The
            template for a 150 lb (68 kg) athlete targeting 9 g/kg = 612 g daily:
          </p>
          <div className="mt-4 overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-primary-soft/40 text-ink">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold">Meal</th>
                  <th className="px-3 py-2 text-left font-semibold">Foods</th>
                  <th className="px-3 py-2 text-left font-semibold">Carbs (g)</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-t border-border">
                  <td className="px-3 py-2 font-medium text-ink">Breakfast</td>
                  <td className="px-3 py-2">2 cups oatmeal + banana + honey + glass of OJ</td>
                  <td className="px-3 py-2">~140 g</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-3 py-2 font-medium text-ink">Snack</td>
                  <td className="px-3 py-2">Bagel with jam + sports drink</td>
                  <td className="px-3 py-2">~80 g</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-3 py-2 font-medium text-ink">Lunch</td>
                  <td className="px-3 py-2">2 cups white rice + 4 oz grilled chicken + banana</td>
                  <td className="px-3 py-2">~130 g</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-3 py-2 font-medium text-ink">Snack</td>
                  <td className="px-3 py-2">Pretzels + applesauce + sports drink</td>
                  <td className="px-3 py-2">~85 g</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-3 py-2 font-medium text-ink">Dinner</td>
                  <td className="px-3 py-2">3 cups pasta + marinara + small piece of lean protein</td>
                  <td className="px-3 py-2">~150 g</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-3 py-2 font-medium text-ink">Snack</td>
                  <td className="px-3 py-2">Rice cakes with honey + small smoothie</td>
                  <td className="px-3 py-2">~35 g</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4">
            Repeat the same pattern for 3 days. Scale every portion by your specific body weight
            using the table above.
          </p>
        </>
      ),
    },
    {
      id: "1-day",
      heading: "The 1-day modified carb loading plan",
      body: (
        <>
          <p>
            For events at the 60-90 minute mark, a longer soccer match, a 10K, a tournament-day
            schedule, a single high-carb day the day before is often sufficient. The protocol:
            target 8-10 g/kg the day before, then a normal pre-event meal 3-4 hours before
            kickoff. Lower fiber, lower fat, familiar foods.
          </p>
          <p className="mt-3">
            This is the right approach for most youth soccer tournaments. A full 3-day protocol
            with 600+ daily grams of carbs is excessive for a kid playing in a U12 weekend.
          </p>
        </>
      ),
    },
    {
      id: "best-foods",
      heading: "Best foods to eat during carb loading",
      body: (
        <>
          <ul className="ml-5 flex list-disc flex-col gap-2">
            <li>White rice (lower fiber than brown for loading)</li>
            <li>Plain pasta with simple sauces</li>
            <li>White bread, bagels, English muffins</li>
            <li>Oatmeal (rolled, not steel-cut)</li>
            <li>Bananas, applesauce, ripe fruit</li>
            <li>Pretzels, rice cakes, low-fiber crackers</li>
            <li>Sports drinks (during loading days, not just race day)</li>
            <li>Honey, jam, maple syrup as carb add-ons</li>
            <li>Potatoes (skin off for lower fiber)</li>
            <li>Low-fat lean protein in modest amounts</li>
          </ul>
        </>
      ),
    },
    {
      id: "avoid",
      heading: "Foods to avoid when carb loading",
      body: (
        <>
          <ul className="ml-5 flex list-disc flex-col gap-2">
            <li>
              <strong>High-fiber foods.</strong> Lentils, beans, raw cruciferous vegetables,
              whole-grain bread with seeds, popcorn, fiber bulks the gut and risks event-day GI
              distress.
            </li>
            <li>
              <strong>Fried foods.</strong> Slow digestion, sit heavy.
            </li>
            <li>
              <strong>Anything new.</strong> The day before a marathon is not the day to try
              octopus. Stick to foods you eat regularly.
            </li>
            <li>
              <strong>Heavy fats.</strong> Limit to small amounts. Olive oil and nut butters in
              moderation are fine; pizza, cheese-heavy meals, and fried protein are not.
            </li>
            <li>
              <strong>Alcohol.</strong> Impairs glycogen synthesis directly and dehydrates.
            </li>
            <li>
              <strong>Excess artificial sweeteners.</strong> Sugar alcohols (sorbitol, xylitol) in
              large doses cause GI cramping.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "mistakes",
      heading: "Common carb loading mistakes",
      body: (
        <>
          <ul className="ml-5 flex list-disc flex-col gap-2">
            <li>
              <strong>Skipping the protein entirely.</strong> Carb loading does not mean
              zero-protein loading. Keep protein at 0.3-0.5 g/kg per meal so muscle stays
              repaired.
            </li>
            <li>
              <strong>Loading for events under 90 minutes.</strong> A 5K or a regular soccer game
              doesn&apos;t require carb loading. The extra glycogen is unused weight on race day.
            </li>
            <li>
              <strong>Loading on whole grains.</strong> Switch to white rice, white bread, plain
              pasta for loading days. Fiber is the enemy here.
            </li>
            <li>
              <strong>Trying it for the first time on race day.</strong> Run a practice load 2-3
              weeks out. Adjust portions and timing based on how your gut handles it.
            </li>
            <li>
              <strong>Forgetting hydration.</strong> Glycogen binds water at ~3 g of water per
              gram of glycogen. Drink more during loading. NATA&apos;s fluid guidance applies
              every day, not just race day<Cite id="NATA-Fluid" />.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "youth",
      heading: "Carb loading for youth athletes: when it does and doesn't apply",
      body: (
        <>
          <p>
            For most youth athletes, traditional 3-day carb loading is unnecessary and arguably
            inappropriate. AAP&apos;s guidance on healthy weight-control practices in young
            athletes cautions against extreme dietary manipulation in children
            <Cite id="AAP-Promotion" />, and a 600-gram-of-carbs day for an 80-pound kid is well
            past normal eating.
          </p>
          <p className="mt-3">
            <strong>What does work for kids:</strong> the tournament-weekend modified plan. The
            night before a tournament, increase the carb-to-protein ratio in the dinner
            (pasta with marinara is the classic). The morning of, eat a familiar breakfast 90
            minutes before game 1. Between games, top off with sandwiches, fruit, and fluids. No
            need to push past normal portions.
          </p>
          <p className="mt-3">
            See our{" "}
            <Link href="/guides/pre-game-meal-for-kids" className="text-primary underline">
              pre-game meal for kids guide
            </Link>{" "}
            for the full tournament-day playbook.
          </p>
        </>
      ),
    },
    {
      id: "hydration",
      heading: "Hydration during carb loading",
      body: (
        <>
          <p>
            Loading days increase fluid needs because every gram of glycogen stored pulls roughly
            3 grams of water with it. Drink 0.5-1 oz per lb body weight per day during loading,
            plus an additional 8-16 oz with each carb-heavy meal. The FuelMyAthlete{" "}
            <Link href="/planner" className="text-primary underline">
              hydration tracker
            </Link>{" "}
            includes a match-day setting that scales the daily target appropriately.
          </p>
        </>
      ),
    },
  ],
  faq: [
    {
      question: "What is the best meal plan for carb loading?",
      answer:
        "A 3-day plan with 8-12 g of carbs per kg of body weight per day. Focus on white rice, pasta, bread, bananas, oatmeal, and sports drinks. Cut high-fiber foods. Keep protein moderate (0.3-0.5 g/kg per meal) and fat low. Practice the plan 2-3 weeks before race day.",
    },
    {
      question: "How many days before a race should I carb load?",
      answer:
        "For marathons and triathlons, 3 days. For events at 60-90 minutes (10Ks, longer soccer matches), a single high-carb day before is enough. For events under 60 minutes, no carb loading is needed, a standard pre-event meal is sufficient.",
    },
    {
      question: "What foods should I avoid when carb loading?",
      answer:
        "High-fiber foods (lentils, beans, raw cruciferous vegetables, multi-grain seeded bread), fried foods, anything new to your gut, heavy fats, alcohol, and excess artificial sweeteners. Stick to familiar low-fiber starches.",
    },
    {
      question: "Can kids carb load?",
      answer:
        "Traditional 3-day carb loading is unnecessary and arguably inappropriate for most youth athletes. AAP cautions against extreme dietary manipulation in children. For tournaments, use a modified 1-day approach: pasta dinner the night before, familiar breakfast 90 minutes before game 1, sandwiches between games.",
    },
    {
      question: "Will I gain weight during carb loading?",
      answer:
        "Yes, 2-5 pounds is normal. Most of the gain is water bound to the extra stored glycogen (about 3 g of water per gram of glycogen). It comes off in the first few miles of the event.",
    },
    {
      question: "Should I keep eating protein during carb loading?",
      answer:
        "Yes. Keep protein at 0.3-0.5 g/kg per meal during loading days. The goal is to max out carbs, not eliminate other macros. Lean chicken, fish, yogurt, and eggs in moderate amounts work alongside the carb-heavy meals.",
    },
  ],
  citations: citationsList(
    "ACSM_2016",
    "ISSN_TIMING",
    "ISSN_PROTEIN",
    "BURKE_CARB",
    "NATA_FLUID",
    "AAP_PROMOTION",
    "AAP_BRIGHT_FUTURES"
  ),
  relatedRecipes: [
    "pasta-marinara",
    "chicken-rice-broccoli",
    "chicken-pasta-broccoli",
    "hibachi-chicken",
    "stirfry-chicken-rice",
    "athlete-overnight-oats",
    "english-muffin-pb",
  ],
  relatedGuides: [
    "what-to-eat-before-a-soccer-game",
    "pre-game-meal-for-kids",
    "what-is-a-good-pre-workout-meal",
    "best-pre-workout-meal",
  ],
};
