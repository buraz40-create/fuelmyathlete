"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { usePlayerProfile } from "@/hooks/usePlayerProfile";

export function ProfileGate({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { profile, hydrated } = usePlayerProfile();

  useEffect(() => {
    if (hydrated && !profile) {
      router.replace("/onboarding");
    }
  }, [hydrated, profile, router]);

  if (!hydrated) {
    return (
      <main id="main" className="grid min-h-screen place-items-center bg-background">
        <p className="text-sm text-muted-foreground">Loading…</p>
      </main>
    );
  }

  if (!profile) {
    return (
      <main id="main" className="grid min-h-screen place-items-center bg-background">
        <p className="text-sm text-muted-foreground">Redirecting…</p>
      </main>
    );
  }

  return <>{children}</>;
}
