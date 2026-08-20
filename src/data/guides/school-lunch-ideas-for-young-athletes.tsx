import type { Guide } from "@/types/domain";
import Link from "next/link";
import { citationsList } from "@/data/citations";
import { Cite } from "@/components/guide/GuideCitations";

export const guide: Guide = {
  slug: "school-lunch-ideas-for-young-athletes",
  title: "School Lunch Ideas for Young Athletes (No Microwave Required)",
  metaTitle: "School Lunch Ideas for Young Athletes: Packable, Cold, Actually Eaten",
  metaDescription:
    "What to pack for a kid who trains after school, when there is no microwave and it has to survive five hours in a bag. Ten lunches, the food safety limits, and why most packed lunches come home uneaten.",
  primaryKeyword: "school lunch ideas for athletes",
  category: "youth-nutrition",
  publishedAt: "2026-08-20",
  updatedAt: "2026-08-20",
  readMinutes: 7,
  answer:
    "A packed lunch for a young athlete needs carbohydrate for the afternoon, protein to stop the 4pm crash, and a build that survives five hours in a warm bag. The two things that decide whether it gets eaten are temperature and texture: keep it at or below 40F with a real ice pack, and keep wet ingredients away from bread. Cook once on Sunday and most of the week is already done.",
  sections: [
    {
      id: "job",
      heading: "What a school lunch has to do on a training day",
      body: (
        <>
          <p>
            On a day with practice after school, lunch is the last real meal before the session.
            Whatever is eaten at noon is the fuel at 5pm, and an after-school snack tops it up
            rather than replacing it.
          </p>
          <p className="mt-3">
            That means it needs enough carbohydrate to still be there hours later, which is what
            whole grains do better than white ones, and enough protein that hunger does not
            arrive at 3pm and get solved by whatever is in the vending machine.
          </p>
          <p className="mt-3">
            It also has to be eaten in about fifteen minutes, in a noisy room, by a child who
            would rather be outside. That constraint decides more than the nutrition does.
          </p>
        </>
      ),
    },
    {
      id: "safety",
      heading: "The food safety part, which is not optional in a warm climate",
      body: (
        <>
          <p>
            USDA guidance for perishable food is no more than 2 hours at room temperature, and
            no more than <strong className="text-ink">1 hour above 90F</strong>
            <Cite id="USDA-FoodData" />. A lunch bag in a Florida school hallway is not room
            temperature.
          </p>
          <p className="mt-3">
            Deli meat, cooked chicken, eggs, yogurt and cheese all fall under that. In practice:
            an insulated bag plus a real ice pack, not a thin gel sheet on its own, and food that
            went in cold rather than warm.
          </p>
          <p className="mt-3">
            The trick worth knowing is that a frozen water bottle does two jobs. It keeps the
            box cold all morning and it is drinkable by lunchtime. A frozen burrito or a frozen
            string cheese works the same way and is thawed by noon.
          </p>
        </>
      ),
    },
    {
      id: "why-uneaten",
      heading: "Why packed lunches come home uneaten",
      body: (
        <>
          <p>
            It is almost never the nutrition. It is four failures, and all of them are fixable in
            the way the lunch is built rather than what goes in it.
          </p>
          <p className="mt-3">
            <strong className="text-ink">It went soggy.</strong> Wet ingredients touching bread
            for five hours. Put a slice of cheese flat against the bread or tortilla first, as a
            waterproof layer, and keep the lettuce in the middle of the stack rather than against
            the wrap.
          </p>
          <p className="mt-3">
            <strong className="text-ink">It went brown.</strong> Cut apple with no acid on it is
            brown by 11am and gets thrown away, whatever it tastes like. A squeeze of lemon buys
            several hours.
          </p>
          <p className="mt-3">
            <strong className="text-ink">It was warm.</strong> Cheese that has sweated, or
            chicken that has been at 80F since 7am, gets one look and goes back in the bag.
          </p>
          <p className="mt-3">
            <strong className="text-ink">It took too long to open.</strong> Anything that needs
            assembling at the table competes with going outside, and loses.
          </p>
        </>
      ),
    },
    {
      id: "ten",
      heading: "Ten that work",
      body: (
        <>
          <p>
            Every one of these has a full recipe on this site, with the packing detail rather
            than just the ingredient list.
          </p>
          <p className="mt-3 font-semibold text-ink">Cook once on Sunday</p>
          <ul className="mt-2 flex flex-col gap-2 text-sm">
            <li>
              <Link href="/recipe/hibachi-chicken" className="text-primary underline">
                Hibachi chicken
              </Link>{" "}
              once, and five{" "}
              <Link href="/recipe/hibachi-chicken-bowl" className="text-primary underline">
                rice bowls
              </Link>{" "}
              come out of it. Sauce travels in its own cup.
            </li>
            <li>
              <Link href="/recipe/cold-pasta-salad-chicken" className="text-primary underline">
                Cold pasta salad with chicken
              </Link>
              . Built to be eaten cold rather than tolerated cold, so it needs no microwave at
              all.
            </li>
            <li>
              <Link href="/recipe/egg-cheese-burrito" className="text-primary underline">
                Egg and cheese burritos
              </Link>
              . Wrap four, freeze three, and a frozen one is its own ice pack.
            </li>
            <li>
              <Link href="/recipe/chicken-pasta-broccoli" className="text-primary underline">
                Pasta with chicken and broccoli
              </Link>
              , which is also good cold.
            </li>
          </ul>
          <p className="mt-4 font-semibold text-ink">Five minutes in the morning</p>
          <ul className="mt-2 flex flex-col gap-2 text-sm">
            <li>
              <Link href="/recipe/turkey-wrap" className="text-primary underline">
                Turkey and cheese whole-grain wrap
              </Link>
              , cut on a hard diagonal so it stands up and shows the filling.
            </li>
            <li>
              <Link href="/recipe/chicken-quesadilla" className="text-primary underline">
                Chicken quesadilla
              </Link>
              , cut cold into strips.
            </li>
            <li>
              <Link href="/recipe/tournament-sub" className="text-primary underline">
                Turkey sub
              </Link>
              , wrapped tight in foil.
            </li>
          </ul>
          <p className="mt-4 font-semibold text-ink">Match day, when the stomach matters</p>
          <ul className="mt-2 flex flex-col gap-2 text-sm">
            <li>
              <Link href="/recipe/hibachi-bowl-matchday" className="text-primary underline">
                Match-day hibachi bowl
              </Link>
              , the same favourite meal with less oil and more rice.
            </li>
            <li>
              <Link href="/recipe/pre-match-plain-plate" className="text-primary underline">
                Plain chicken and rice
              </Link>
              , deliberately boring, for a nervous stomach.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "sunday",
      heading: "The Sunday hour that covers the week",
      body: (
        <>
          <p>
            The single change that makes packed lunches sustainable is doing them once rather
            than five times. One cook session on Sunday, boxes filled straight away, and weekday
            mornings become lifting a box out of the fridge.
          </p>
          <p className="mt-3">
            Two rules make it work. Cool everything completely before the lid goes on, because
            warm food under a lid steams itself and by Tuesday the rice is gluey. And keep the
            wet things separate: sauce in a cup, dressing in a packet, fruit in its own
            compartment.
          </p>
          <p className="mt-3">
            Recipes worth batching are marked{" "}
            <strong className="text-ink">Preps ahead</strong> on the{" "}
            <Link href="/recipes" className="text-primary underline">
              recipe list
            </Link>
            , with how many meals one session yields and how long it keeps.
          </p>
        </>
      ),
    },
  ],
  faq: [
    {
      question: "What if the school has no microwave?",
      answer:
        "Most do not, and it matters less than it seems. The cold pasta salad, the wraps, the quesadilla strips and the hibachi rice bowls are all good cold. Cold hibachi rice is genuinely good, which is more than can be said for most reheated lunches.",
    },
    {
      question: "How long does a packed lunch stay safe?",
      answer:
        "USDA says perishable food should not sit out more than 2 hours, and no more than 1 hour above 90F. With an insulated bag and a real ice pack you are keeping it at or below 40F instead, which is the target. In a hot climate, treat one thin gel sheet as not enough.",
    },
    {
      question: "How much should a young athlete's lunch be?",
      answer:
        "For an 11 or 12 year old training after school, roughly 450 to 550 calories with 25 to 40 g of protein is a reasonable shape. Do not count it in front of them. Calories are hidden from the youth view on this site for that reason, following AAP guidance on calorie talk with pre-teens.",
    },
    {
      question: "He will not eat vegetables in a lunch box. Does it matter?",
      answer:
        "Not much, on that meal. Carrot sticks and bell pepper strips travel well and are worth trying, but if lunch is carbohydrate and protein and the vegetables happen at dinner, that is a normal week rather than a problem to solve at 7am.",
    },
    {
      question: "Are sandwiches good enough on their own?",
      answer:
        "A whole-grain sandwich with real protein in it is a perfectly good athlete's lunch. What tends to fall short is a white bread sandwich with a thin filling, which is gone from the body within an hour or two and leaves a gap before practice.",
    },
  ],
  citations: citationsList("USDA_FOODDATA", "AAP_SPORTS_NUTRITION", "AAP_BRIGHT_FUTURES", "ACSM_2016"),
  relatedRecipes: ["hibachi-chicken-bowl", "cold-pasta-salad-chicken", "egg-cheese-burrito", "turkey-wrap"],
  relatedGuides: ["after-school-snack-before-practice", "what-to-pack-for-a-soccer-tournament"],
};
