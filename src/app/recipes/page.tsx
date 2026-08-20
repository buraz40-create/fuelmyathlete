import type { Metadata } from "next";
import { AppShell } from "@/components/layout/AppShell";
import { RecipesClient } from "./RecipesClient";
import { RECIPES } from "@/data/recipes";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://fuelmyathlete.com");

// Derived, not typed. This said 24 in four places and went stale the moment lunch grew.
const COUNT = RECIPES.length;

export const metadata: Metadata = {
  title: `Free Athlete Recipes: ${COUNT} Step-by-Step Meals for Youth & Adult Athletes`,
  description:
    `${COUNT} athlete-tested recipes: breakfasts, lunches, snacks, dinners. Step-by-step instructions, full nutrition, portions that scale by age and training day. Free, no signup.`,
  alternates: { canonical: `${SITE_URL}/recipes` },
  openGraph: {
    type: "website",
    title: `Free Athlete Recipes: ${COUNT} Step-by-Step Meals for Youth & Adult Athletes`,
    description:
      `${COUNT} athlete-tested recipes with step-by-step instructions, full nutrition, and portions that scale by age and training day.`,
    url: `${SITE_URL}/recipes`,
  },
};

export default function RecipesPage() {
  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/recipes#collection`,
    name: "Athlete Recipes",
    description: "Step-by-step recipes for athletes 8 and up, organized by meal slot.",
    url: `${SITE_URL}/recipes`,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: RECIPES.length,
      itemListElement: RECIPES.map((r, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE_URL}/recipe/${r.slug}`,
        name: r.name,
      })),
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Recipes", item: `${SITE_URL}/recipes` },
    ],
  };

  return (
    <AppShell>
      <script
        id="ld-recipes-collection"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }}
      />
      <script
        id="ld-recipes-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <RecipesClient />
    </AppShell>
  );
}
