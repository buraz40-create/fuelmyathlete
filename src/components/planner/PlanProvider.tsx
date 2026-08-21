"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useMealPlan } from "@/hooks/useMealPlan";
import { useCustomMeals } from "@/hooks/useCustomMeals";
import { usePreferencesSync } from "@/hooks/usePreferencesSync";

// The custom catalog rides along with the plan rather than being fetched separately at each
// call site. Seven components need to resolve a meal slug, and every one of them would
// otherwise mount its own copy of the hook and re-read localStorage.
type PlanContextValue = ReturnType<typeof useMealPlan> & {
  custom: ReturnType<typeof useCustomMeals>["catalog"];
  customImports: ReturnType<typeof useCustomMeals>["imports"];
  refreshCustom: () => void;
  removeCustom: (id: string) => void;
};

const PlanContext = createContext<PlanContextValue | null>(null);

export function PlanProvider({ children }: { children: ReactNode }) {
  // Carries meal exclusions and the recurring week between a parent's devices. Mounted here so
  // it covers the planner, the week view and the grocery list with one call, and so it runs
  // where those settings are actually used. Does nothing at all when Supabase is not
  // configured, which is every local development run.
  usePreferencesSync();

  const plan = useMealPlan();
  const { catalog, imports, refresh, remove } = useCustomMeals();

  const value = useMemo<PlanContextValue>(
    () => ({
      ...plan,
      custom: catalog,
      customImports: imports,
      refreshCustom: refresh,
      removeCustom: remove,
    }),
    [plan, catalog, imports, refresh, remove]
  );

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

export function usePlan(): PlanContextValue {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used within PlanProvider");
  return ctx;
}
