import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Auto Grocery List from Your Athlete Meal Plan",
  description:
    "Grocery list auto-built from your weekly meal plan. Grouped by aisle, quantities scaled by day type. Check items off as you shop.",
  robots: { index: false, follow: false },
};

export default function GroceryLayout({ children }: { children: ReactNode }) {
  return children;
}
