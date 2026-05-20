"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useMealPlan } from "@/hooks/useMealPlan";

type PlanContextValue = ReturnType<typeof useMealPlan>;

const PlanContext = createContext<PlanContextValue | null>(null);

export function PlanProvider({ children }: { children: ReactNode }) {
  const value = useMealPlan();
  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

export function usePlan(): PlanContextValue {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used within PlanProvider");
  return ctx;
}
