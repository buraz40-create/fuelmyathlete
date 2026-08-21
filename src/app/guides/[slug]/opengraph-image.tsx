import { ImageResponse } from "next/og";
import { GUIDES } from "@/data/guides";

// Node, not edge: a route that pre-generates one card per guide with generateStaticParams
// cannot also opt into the edge runtime, and pre-generating is the point.
export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "A nutrition guide from FuelMyAthlete";

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

const BG = "#F5F4F1";
const INK = "#1F2422";
const PRIMARY = "#6B9148";
const MUTED = "#7A766F";

const CATEGORY_TINT: Record<string, string> = {
  "pre-workout": "#FAD4BD",
  "post-workout": "#D2E8C4",
  "match-day": "#E7DBF2",
  "youth-nutrition": "#CFE3F5",
  hydration: "#CFF0EE",
};

const CATEGORY_LABEL: Record<string, string> = {
  "pre-workout": "Before training",
  "post-workout": "After training",
  "match-day": "Match day",
  "youth-nutrition": "Youth nutrition",
  hydration: "Hydration",
};

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = GUIDES.find((g) => g.slug === slug);

  if (!guide) {
    return new ImageResponse(<div style={{ display: "flex" }} />, { ...size });
  }

  const tint = CATEGORY_TINT[guide.category] ?? "#D2E8C4";

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: BG, fontFamily: "sans-serif" }}>
        {/* A colour band rather than a photograph. The guides have no image of their own, and a
            stock picture of a child drinking water would be decoration pretending to be
            information. */}
        <div style={{ display: "flex", width: 24, background: tint }} />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 64,
            flex: 1,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 26, fontWeight: 700, color: INK }}>FuelMyAthlete</span>
            <span style={{ fontSize: 22, fontWeight: 600, color: MUTED }}>
              {guide.readMinutes} min read
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <span
              style={{
                fontSize: 20,
                fontWeight: 600,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                color: PRIMARY,
              }}
            >
              {CATEGORY_LABEL[guide.category] ?? "Guide"}
            </span>
            <span
              style={{
                fontSize: guide.title.length > 46 ? 54 : 66,
                fontWeight: 800,
                color: INK,
                lineHeight: 1.06,
                letterSpacing: "-0.02em",
              }}
            >
              {guide.title}
            </span>
            {/* The short answer, which is the point of these pages: somebody standing in a
                kitchen wants the answer, not the article. */}
            <span style={{ fontSize: 26, color: MUTED, lineHeight: 1.35 }}>
              {trim(guide.answer, 150)}
            </span>
          </div>

          <span style={{ fontSize: 22, fontWeight: 600, color: INK }}>fuelmyathlete.com</span>
        </div>
      </div>
    ),
    { ...size }
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
