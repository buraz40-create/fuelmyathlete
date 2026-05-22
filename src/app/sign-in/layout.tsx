import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Sign In or Create a Free FuelMyAthlete Account",
  description:
    "Sign in to sync your meal plan across devices. Choose Google, email and password, or a one-time magic link. Free, no credit card.",
  robots: { index: false, follow: false },
};

export default function SignInLayout({ children }: { children: ReactNode }) {
  return children;
}
