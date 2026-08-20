import type { Guide } from "@/types/domain";
import Link from "next/link";
import { citationsList } from "@/data/citations";
import { Cite } from "@/components/guide/GuideCitations";

export const guide: Guide = {
  slug: "does-my-child-athlete-need-protein-powder",
  title: "Does My Child Athlete Need Protein Powder?",
  metaTitle: "Does My Kid Need Protein Powder? What the Guidelines Actually Say",
  metaDescription:
    "Almost no young athlete needs protein powder. What a child actually needs per day, how easily food covers it, and the specific reasons paediatric bodies advise against supplements for under 18s.",
  primaryKeyword: "does my child need protein powder",
  category: "youth-nutrition",
  publishedAt: "2026-08-20",
  updatedAt: "2026-08-20",
  readMinutes: 6,
  answer:
    "Almost certainly not. A young athlete needs roughly 1.0 to 1.4 g of protein per kg of body weight per day, and an ordinary diet with milk, eggs, chicken, yogurt or beans reaches that without trying. The American Academy of Pediatrics advises against protein and performance supplements for under 18s, partly because they are unnecessary and partly because the supplement industry is not tested before sale. If your child seems short on protein, the answer is usually breakfast, not a tub.",
  sections: [
    {
      id: "how-much",
      heading: "How much protein a young athlete actually needs",
      body: (
        <>
          <p>
            Youth athletes need somewhere around 1.0 to 1.4 g of protein per kilogram of body
            weight per day, a little above the general recommendation for children because they
            are growing and training at the same time <Cite id="AAP-Sports-Nutrition" />.
          </p>
          <p className="mt-3">
            Put a number on it. An 11 year old weighing 40 kg, which is about 88 lb, needs
            roughly <strong className="text-ink">40 to 56 g of protein a day</strong>. That is
            the whole target, not per meal.
          </p>
          <div className="mt-4 overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-primary-soft/40 text-ink">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold">One ordinary thing</th>
                  <th className="px-3 py-2 text-left font-semibold">Protein</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr><td className="px-3 py-2">1 cup milk</td><td className="px-3 py-2">8 g</td></tr>
                <tr><td className="px-3 py-2">2 eggs</td><td className="px-3 py-2">12 g</td></tr>
                <tr><td className="px-3 py-2">1 cup plain Greek yogurt</td><td className="px-3 py-2">20 g</td></tr>
                <tr><td className="px-3 py-2">4 oz chicken breast</td><td className="px-3 py-2">35 g</td></tr>
                <tr><td className="px-3 py-2">2 string cheeses</td><td className="px-3 py-2">14 g</td></tr>
                <tr><td className="px-3 py-2">2 tbsp peanut butter</td><td className="px-3 py-2">7 g</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4">
            Eggs at breakfast, a turkey wrap at lunch and chicken at dinner is already about 60
            g. The daily target is usually met by lunchtime plus dinner, which is why most
            young athletes are not short of protein even when their parents suspect they are.
          </p>
        </>
      ),
    },
    {
      id: "what-bodies-say",
      heading: "What paediatric bodies say about supplements",
      body: (
        <>
          <p>
            The American Academy of Pediatrics has been consistent for years: performance
            enhancing substances and protein supplements are not recommended for children and
            adolescents, and the emphasis belongs on food, sleep and training
            <Cite id="AAP-Promotion" />.
          </p>
          <p className="mt-3">
            Two reasons matter here, and they are different from each other.
          </p>
          <p className="mt-3">
            <strong className="text-ink">They are unnecessary.</strong> Protein powder does
            nothing that food does not, and the total over a day is what counts. There is no
            evidence that a young athlete eating enough protein gains anything from adding more.
          </p>
          <p className="mt-3">
            <strong className="text-ink">They are not pre-tested.</strong> In the United States,
            dietary supplements are not approved for safety or contents before they go on sale.
            Independent testing has repeatedly found products whose labels do not match what is
            in the tub. For an adult that is a waste of money. For a 12 year old it is a
            different risk, and it is one you are taking on their behalf.
          </p>
        </>
      ),
    },
    {
      id: "why-parents-ask",
      heading: "Why it feels like they need it",
      body: (
        <>
          <p>
            Parents almost never ask this question out of nowhere. It usually comes from one of
            three things, and none of them is a protein deficiency.
          </p>
          <p className="mt-3">
            <strong className="text-ink">He is always hungry.</strong> That is usually energy,
            not protein. A child training four times a week and growing needs a lot of food, and
            hunger is the correct response to not enough of it. More calories across the day
            fixes this, and carbohydrate is the cheapest way to add them.
          </p>
          <p className="mt-3">
            <strong className="text-ink">He is smaller than the other kids.</strong> Size at 12
            is mostly maturation timing and genetics. Protein powder does not change either, and
            a late developer who is fed well and sleeps well catches up on his own schedule.
          </p>
          <p className="mt-3">
            <strong className="text-ink">Someone at the club uses it.</strong> Which is a strong
            social signal and a weak nutritional one.
          </p>
        </>
      ),
    },
    {
      id: "instead",
      heading: "What to do instead",
      body: (
        <>
          <p>
            If the protein total genuinely looks low, the gap is almost always at breakfast.
            Cereal and milk on its own is mostly carbohydrate, and a child who eats that at 7am
            has taken in perhaps 8 g by mid morning.
          </p>
          <p className="mt-3">
            The cheapest fixes, in order of how little effort they take: milk instead of water
            with breakfast, an egg alongside whatever is already being eaten, plain Greek yogurt
            instead of flavoured, and a string cheese in the bag. Each of those is 8 to 20 g.
          </p>
          <p className="mt-3">
            Two recipes on this site exist specifically for this. The{" "}
            <Link href="/recipe/vanilla-protein-punch" className="text-primary underline">
              cottage cheese smoothie
            </Link>{" "}
            reaches about 26 g with no powder in it, and{" "}
            <Link href="/recipe/eggs-toast" className="text-primary underline">
              eggs on whole-grain toast
            </Link>{" "}
            is 18 g in eight minutes.
          </p>
          <p className="mt-3">
            You will see an optional <strong className="text-ink">Boost it</strong> panel on the
            smoothie recipes here. It is marked for athletes 18 and over, deliberately, and it
            is there because adults read this site too.
          </p>
        </>
      ),
    },
    {
      id: "when-reasonable",
      heading: "When a supplement might be reasonable",
      body: (
        <>
          <p>
            There are real cases, and they are medical rather than athletic. A child on a
            restricted diet for allergy or medical reasons, a vegan athlete whose intake is hard
            to cover, a period of poor appetite during illness, or a diagnosed deficiency.
          </p>
          <p className="mt-3">
            All of those are conversations with a paediatrician or a registered sports dietitian
            who can see the actual child, not decisions to make from a website. That includes
            this one.
          </p>
        </>
      ),
    },
  ],
  faq: [
    {
      question: "Is protein powder dangerous for kids?",
      answer:
        "Not inherently, and that is not really the argument. The concerns are that it is unnecessary when food already covers the need, that supplements are not tested for safety or contents before sale in the US so the label may not match the tub, and that it teaches a child to solve nutrition with a product. The AAP recommends against performance supplements for under 18s.",
    },
    {
      question: "How much protein does a 12 year old athlete need per day?",
      answer:
        "Roughly 1.0 to 1.4 g per kg of body weight. A 40 kg child needs about 40 to 56 g a day in total. Two eggs, a cup of milk, a turkey wrap and chicken at dinner clears it without any special effort.",
    },
    {
      question: "What about chocolate milk after training?",
      answer:
        "Chocolate milk is a good recovery drink and has been for years, because it happens to combine carbohydrate, protein and fluid in something children will actually finish. It is food, not a supplement, and there is no reason to avoid it.",
    },
    {
      question: "My child is vegetarian. Does that change the answer?",
      answer:
        "It raises the effort, not usually the need for powder. Eggs, dairy, Greek yogurt, cottage cheese, beans, lentils and whole edamame cover it. A fully vegan young athlete is the case most worth taking to a registered dietitian, because B12 and iron matter there as much as protein.",
    },
    {
      question: "Is a protein bar the same thing?",
      answer:
        "Usually it is a sweet snack with some protein in it, and often as much sugar as a chocolate bar. If it is being eaten because it is convenient in a bag, a string cheese and a banana does the same job as actual food.",
    },
  ],
  citations: citationsList("AAP_SPORTS_NUTRITION", "AAP_PROMOTION", "ISSN_PROTEIN", "NSCA_NUTRITION"),
  relatedRecipes: ["vanilla-protein-punch", "eggs-toast", "yogurt-honey-berries"],
  relatedGuides: ["what-to-eat-after-a-soccer-game", "after-school-snack-before-practice"],
};
