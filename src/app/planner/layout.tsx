import type { ReactNode } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { BottomNav } from "@/components/layout/BottomNav";
import { TabBar } from "@/components/layout/TabBar";
import { PlanProvider } from "@/components/planner/PlanProvider";
import { ProfileGate } from "@/components/planner/ProfileGate";

export default function PlannerLayout({ children }: { children: ReactNode }) {
  return (
    <ProfileGate>
      <PlanProvider>
        <AppShell>
          <TabBar />
          {children}
          <BottomNav />
        </AppShell>
      </PlanProvider>
    </ProfileGate>
  );
}
