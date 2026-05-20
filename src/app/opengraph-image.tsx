import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "FuelMyAthlete: meal planning for athletes 8 and up";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BG = "#F5F4F1";
const INK = "#1F2422";
const PRIMARY = "#6B9148";
const MUTED = "#7A766F";
const MEAL_PEACH = "#FAD4BD";
const MEAL_MINT = "#D2E8C4";
const MEAL_LAVENDER = "#E7DBF2";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: BG,
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        {/* Brand row */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <Mascot />
          <span style={{ fontSize: 30, fontWeight: 700, color: INK, letterSpacing: "-0.01em" }}>
            FuelMyAthlete
          </span>
        </div>

        {/* Main copy */}
        <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 920 }}>
          <span
            style={{
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              color: PRIMARY,
            }}
          >
            Meal planning for athletes
          </span>
          <span
            style={{
              fontSize: 88,
              fontWeight: 800,
              color: INK,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            Plan the week. Shop once. Cook smart.
          </span>
          <span style={{ fontSize: 28, color: MUTED, lineHeight: 1.35 }}>
            Built for athletes 8 and up, from soccer kids to adult lifters.
          </span>
        </div>

        {/* Footer chips */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", gap: 14 }}>
            <Chip color={MEAL_PEACH} label="Auto grocery list" />
            <Chip color={MEAL_MINT} label="Hydration tracker" />
            <Chip color={MEAL_LAVENDER} label="Match-day fuel" />
          </div>
          <span style={{ fontSize: 24, fontWeight: 600, color: INK }}>fuelmyathlete.com</span>
        </div>
      </div>
    ),
    { ...size }
  );
}

function Chip({ color, label }: { color: string; label: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 22px",
        borderRadius: 9999,
        background: "white",
        border: `1px solid ${INK}15`,
        fontSize: 22,
        fontWeight: 500,
        color: INK,
      }}
    >
      <span style={{ width: 14, height: 14, borderRadius: 999, background: color }} />
      {label}
    </div>
  );
}

function Mascot() {
  return (
    <svg
      width="72"
      height="72"
      viewBox="0 0 120 120"
      style={{ display: "block" }}
    >
      <circle cx="60" cy="60" r="48" fill="#FFFFFF" stroke={INK} strokeWidth="3" />
      <path d="M60 22 L72 36 L66 52 L54 52 L48 36 Z" fill={INK} opacity="0.92" />
      <path d="M22 56 L36 50 L48 56 L44 70 L28 72 Z" fill={INK} opacity="0.92" />
      <path d="M98 56 L84 50 L72 56 L76 70 L92 72 Z" fill={INK} opacity="0.92" />
      <path d="M40 86 L52 78 L68 78 L80 86 L72 100 L48 100 Z" fill={INK} opacity="0.92" />
      <circle cx="48" cy="62" r="3.5" fill="#FFFFFF" />
      <circle cx="72" cy="62" r="3.5" fill="#FFFFFF" />
      <circle cx="48" cy="62" r="2" fill={INK} />
      <circle cx="72" cy="62" r="2" fill={INK} />
      <path d="M52 70 Q60 78 68 70" stroke={INK} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <circle cx="42" cy="72" r="3" fill={PRIMARY} opacity="0.45" />
      <circle cx="78" cy="72" r="3" fill={PRIMARY} opacity="0.45" />
    </svg>
  );
}
