import type { Metadata } from "next";
import { AppShell } from "@/components/layout/AppShell";
import { GameDayClient } from "./GameDayClient";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://fuelmyathlete.com");

const title = "What to Eat Before a Game: A Timeline From Kickoff";
const description =
  "Set your child's age and kickoff time and get the meal, the top-up and the water plan, worked backwards from the whistle. No account, no signup.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/game-day` },
  openGraph: { type: "article", title, description, url: `${SITE_URL}/game-day` },
  twitter: { card: "summary_large_image", title, description },
};

/**
 * One screen, no signup, no onboarding, no profile.
 *
 * The thing you can hand a parent in a car park. Everything else on this site asks who the
 * athlete is before it will tell you anything, which is the right trade for a weekly planner and
 * the wrong one for somebody who has forty minutes and a question.
 *
 * It is a server component wrapping a small client one, so the words are in the HTML for
 * somebody arriving from a search while the two controls stay interactive.
 */
export default function GameDayPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "What to eat before a game",
    description,
    totalTime: "PT3H",
    step: [
      {
        "@type": "HowToStep",
        name: "Three hours before kickoff: the real meal",
        text: "Carbohydrate they like with some protein, low in fat and fibre so it digests in time.",
      },
      {
        "@type": "HowToStep",
        name: "One hour before kickoff: a small top-up",
        text: "Something small and mostly carbohydrate, such as a banana or toast with honey. Skip it if they are not hungry.",
      },
      {
        "@type": "HowToStep",
        name: "Through the morning: water, sipped steadily",
        text: "Spread fluid across the whole morning rather than drinking a bottle just before kickoff.",
      },
    ],
  };

  return (
    <AppShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <GameDayClient />
    </AppShell>
  );
}
