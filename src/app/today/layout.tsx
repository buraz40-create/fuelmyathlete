import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { InstallPrompt } from "@/components/layout/InstallPrompt";
import { BottomNav } from "@/components/layout/BottomNav";
import { TabBar } from "@/components/layout/TabBar";
import { PlanProvider } from "@/components/planner/PlanProvider";
import { ProfileGate } from "@/components/planner/ProfileGate";

export const metadata: Metadata = {
  title: "Today",
  description:
    "One screen for the athlete: what you are eating today, your protein, and your water.",
  robots: { index: false, follow: false },
};

export default function TodayLayout({ children }: { children: ReactNode }) {
  return (
    <AppShell>
      <PlanProvider>
        <ProfileGate>
          <TabBar />
          <InstallPrompt />
          {children}
          <BottomNav surface="today" />
        </ProfileGate>
      </PlanProvider>
    </AppShell>
  );
}
