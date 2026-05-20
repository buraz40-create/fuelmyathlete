import type { Recipe } from "@/types/domain";

export const RECIPES: Recipe[] = [
  {
    slug: "hibachi-chicken",
    name: "Hibachi Chicken (meal prep)",
    servings: 8,
    totalMinutes: 25,
    steps: [
      {
        order: 1,
        title: "Slice the chicken thin",
        body: "Slice 2 lb boneless skinless chicken breast into thin strips, about ½ inch thick. Thin cuts are the secret. They cook fast, stay juicy, and reheat well in school containers without drying out. Pat dry with paper towels for a better sear.",
      },
      {
        order: 2,
        title: "Season",
        body: "Toss the chicken strips with ½ tsp salt and ½ tsp black pepper. Don't add the soy sauce yet. Adding it too early draws out moisture and prevents a good sear.",
      },
      {
        order: 3,
        title: "Heat the pan, screaming hot",
        body: "Heat a large skillet or wok over HIGH heat for 2 minutes. Add 1 tbsp avocado or vegetable oil. You want the oil to shimmer and almost smoke. Cast iron or stainless steel works best.",
        timerSec: 120,
      },
      {
        order: 4,
        title: "Sear the chicken",
        body: "Add the chicken in a single layer. Do NOT overcrowd the pan. Cook in 2 batches if needed. Let it sear untouched for 4 minutes, then flip and cook another 2 minutes until golden brown on both sides.",
        timerSec: 240,
      },
      {
        order: 5,
        title: "Add the hibachi sauce",
        body: "Push the chicken to the edges of the pan. Add 2 tbsp unsalted butter + 4 cloves minced garlic to the center. Let the butter melt and garlic sizzle for 30 seconds, then pour 3 tbsp low-sodium soy sauce and 1 tbsp sesame oil over everything. Toss to coat.",
        timerSec: 30,
      },
      {
        order: 6,
        title: "Finish + caramelize",
        body: "Toss everything together over high heat for 1–2 more minutes until the sauce caramelizes slightly and coats the chicken in a glossy glaze. You'll smell it. That's the hibachi magic.",
        timerSec: 90,
      },
      {
        order: 7,
        title: "Cool + portion",
        body: "Spread chicken on a baking sheet or large plate to cool completely before portioning. Never pack warm food straight into containers or it steams itself soggy. Once cool, divide into 5 meal-prep containers alongside rice and veggies, plus 3 dinner portions.",
      },
    ],
    notes: [
      "Keeps in the fridge for up to 4 days. Freeze portions 4–5 for Thursday/Friday freshness.",
      "Pack yum-yum sauce separately in a small container. Keeps the rice from getting soggy overnight.",
      "Reheat with a splash of water in the container, microwave covered. Seals in moisture so it doesn't dry out.",
      "Use chicken BREAST, not thighs. Elvis prefers breast. A little extra soy + butter keeps it juicy without thigh fat.",
      "The biggest mistake is cooking on medium. You need HIGH heat for the char. Medium just steams.",
    ],
  },
];

export const RECIPES_BY_SLUG: Record<string, Recipe> = Object.fromEntries(
  RECIPES.map((r) => [r.slug, r])
);
