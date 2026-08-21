import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { RECIPES } from "@/data/recipes";
import { MEALS } from "@/data/meals";

// Node rather than edge, so the photograph can be read straight off disk. Fetching it over HTTP
// would mean the card depended on the site being up and reachable at the moment it is generated,
// which during a build it is not.
export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return RECIPES.map((r) => ({ slug: r.slug }));
}

export const alt = "A recipe from FuelMyAthlete";

const BG = "#F5F4F1";
const INK = "#1F2422";
const PRIMARY = "#6B9148";
const MUTED = "#7A766F";

async function photoDataUri(slug: string): Promise<string | null> {
  try {
    const file = await readFile(join(process.cwd(), "public", "images", "recipes", `${slug}.jpg`));
    return `data:image/jpeg;base64,${file.toString("base64")}`;
  } catch {
    // No photograph for this recipe. The card still works, it just leads with the words.
    return null;
  }
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const recipe = RECIPES.find((r) => r.slug === slug);

  if (!recipe) {
    return new ImageResponse(<div style={{ display: "flex" }} />, { ...size });
  }

  // Same lookup as the page, fallback included, because seven meals and recipes share a slug
  // without pointing at each other.
  const meal =
    MEALS.find((m) => m.recipeSlug === recipe.slug) ?? MEALS.find((m) => m.slug === recipe.slug);

  const photo = await photoDataUri(recipe.slug);
  const protein = meal?.nutrition?.proteinG;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: BG, fontFamily: "sans-serif" }}>
        {photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photo} alt="" width={520} height={630} style={{ objectFit: "cover" }} />
        ) : null}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 56,
            flex: 1,
          }}
        >
          <span style={{ fontSize: 26, fontWeight: 700, color: INK, letterSpacing: "-0.01em" }}>
            FuelMyAthlete
          </span>

          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <span
              style={{
                fontSize: 20,
                fontWeight: 600,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                color: PRIMARY,
              }}
            >
              {recipe.slot ?? "Recipe"}
            </span>
            <span
              style={{
                fontSize: recipe.name.length > 34 ? 52 : 62,
                fontWeight: 800,
                color: INK,
                lineHeight: 1.06,
                letterSpacing: "-0.02em",
              }}
            >
              {recipe.name}
            </span>
            {recipe.whenToEat ? (
              <span style={{ fontSize: 24, color: MUTED, lineHeight: 1.35 }}>
                {trim(recipe.whenToEat, 110)}
              </span>
            ) : null}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Chip label={`${recipe.totalMinutes} min`} />
            <Chip label={`Serves ${recipe.servings}`} />
            {typeof protein === "number" ? <Chip label={`${protein}g protein`} /> : null}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}

function Chip({ label }: { label: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "10px 20px",
        borderRadius: 9999,
        background: "white",
        border: `1px solid ${INK}1A`,
        fontSize: 22,
        fontWeight: 600,
        color: INK,
      }}
    >
      {label}
    </div>
  );
}

/**
 * Trim to a word boundary.
 *
 * Slicing at a fixed character count cuts mid-token, and these strings are full of things that
 * read as broken when they are halved: "Eat 1/2 cup" became "Eat 1/". A share card is often the
 * only thing somebody reads before deciding whether to open the link.
 */
function trim(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  const body = (lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[\s,.;:]+$/, "");
  return `${body}...`;
}
