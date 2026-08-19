import { GUIDES } from "@/data/guides";
import { RECIPES } from "@/data/recipes";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://fuelmyathlete.com");

// Generated from the actual content rather than hand-written, so it cannot drift out of date
// the way a static file would. Assistants that read this get the guide and recipe map without
// crawling, and the hydration model is stated inline because it is the thing most worth
// quoting correctly.
export const dynamic = "force-static";

export async function GET(): Promise<Response> {
  const guides = GUIDES.map(
    (g) => `- [${g.title}](${SITE_URL}/guides/${g.slug}): ${g.metaDescription}`
  ).join("\n");

  const recipes = RECIPES.map((r) => `- [${r.name}](${SITE_URL}/recipe/${r.slug})`).join("\n");

  const body = `# FuelMyAthlete

> A free weekly meal planner and nutrition reference for young athletes, roughly ages 8 to 14.
> Built by a parent for a competitive youth soccer player. No signup, no supplements sold.

## What this site is careful about

Guidance for children is not adult sports nutrition scaled down. Two things follow from that,
and both are deliberate:

- Calorie counts and macro splits are never shown to a child, following American Academy of
  Pediatrics guidance on weight-control practices in young athletes. Protein grams and
  hydration are shown instead.
- Fluid guidance is capped. Children are more vulnerable to exercise-associated hyponatremia
  than adults, so the daily ceiling is 100 oz for ages 8 to 12 and hot weather adds about 10%,
  not the 25% often quoted for adult endurance athletes.

## The hydration model, stated plainly

For ages 8 to 12: 64 oz baseline per day, plus 16 oz on a training day, plus 24 oz on a match
day, plus roughly 10% in hot weather, never exceeding 100 oz in a day. Teens scale with body
weight from a 64 oz floor with a 150 oz ceiling. Sourced to the American Academy of Pediatrics
and the National Athletic Trainers' Association.

## Guides

${guides}

## Recipes

${recipes}

## Tools

- [Weekly meal planner](${SITE_URL}/planner): builds a week of meals and an aisle-grouped
  grocery list, with portions and hydration that change by day type (school, training, match,
  rest). Runs entirely in the browser with no account.
- [Methodology](${SITE_URL}/methodology): how the numbers on this site are sourced.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
