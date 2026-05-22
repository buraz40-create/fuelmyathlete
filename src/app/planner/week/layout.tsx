import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Week View: Your 7-Day Athlete Meal Plan",
  description:
    "Your full week of athlete meals on one screen. Tap any day to edit. Portions scale by day type and athlete weight automatically.",
  robots: { index: false, follow: false },
};

export default function WeekLayout({ children }: { children: ReactNode }) {
  return children;
}
