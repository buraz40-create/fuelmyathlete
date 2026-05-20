"use client";

import type { MealPlan, MealPlanEntry } from "@/types/domain";
import { getBrowserSupabase } from "@/lib/supabase/client";
import { emptyPlan } from "./empty-plan";

async function getActivePlayerId(): Promise<string | null> {
  const supabase = getBrowserSupabase();
  if (!supabase) return null;

  const { data: family } = await supabase
    .from("families")
    .select("id")
    .limit(1)
    .maybeSingle();
  if (!family) return null;

  const { data: player } = await supabase
    .from("players")
    .select("id")
    .eq("family_id", family.id)
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();
  return player?.id ?? null;
}

export async function loadPlanRemote(weekStart: string): Promise<MealPlan | null> {
  const supabase = getBrowserSupabase();
  if (!supabase) return null;

  const playerId = await getActivePlayerId();
  if (!playerId) return null;

  const { data: planRow } = await supabase
    .from("meal_plans")
    .select("id, family_id")
    .eq("player_id", playerId)
    .eq("week_start", weekStart)
    .maybeSingle();

  if (!planRow) return null;

  const { data: entryRows } = await supabase
    .from("meal_plan_entries")
    .select("day_of_week, day_type, slot, meal_id, servings")
    .eq("meal_plan_id", planRow.id);

  const { data: checkRows } = await supabase
    .from("grocery_check_state")
    .select("ingredient_id, is_checked")
    .eq("meal_plan_id", planRow.id);

  const { data: mealIdMap } = await supabase.from("meals").select("id, slug");
  const idToSlug = new Map<string, string>();
  (mealIdMap ?? []).forEach((m: { id: string; slug: string }) => idToSlug.set(m.id, m.slug));
  const { data: ingMap } = await supabase.from("ingredients").select("id, slug");
  const ingIdToSlug = new Map<string, string>();
  (ingMap ?? []).forEach((i: { id: string; slug: string }) => ingIdToSlug.set(i.id, i.slug));

  const base = emptyPlan(weekStart);
  const entries: MealPlanEntry[] = base.entries.map((e) => {
    const remote = (entryRows ?? []).find(
      (r) => r.day_of_week === e.dayOfWeek && r.slot === e.slot
    );
    if (!remote) return e;
    return {
      ...e,
      dayType: remote.day_type,
      mealSlug: remote.meal_id ? idToSlug.get(remote.meal_id) ?? null : null,
      servings: Number(remote.servings),
    };
  });

  const groceryChecked: Record<string, boolean> = {};
  (checkRows ?? []).forEach((c) => {
    const slug = ingIdToSlug.get(c.ingredient_id);
    if (slug) groceryChecked[slug] = c.is_checked;
  });

  return { weekStart, entries, groceryChecked };
}

export async function savePlanRemote(plan: MealPlan): Promise<void> {
  const supabase = getBrowserSupabase();
  if (!supabase) return;

  const playerId = await getActivePlayerId();
  if (!playerId) return;

  const { data: family } = await supabase
    .from("families")
    .select("id")
    .limit(1)
    .maybeSingle();
  if (!family) return;

  const { data: existingPlan } = await supabase
    .from("meal_plans")
    .select("id")
    .eq("player_id", playerId)
    .eq("week_start", plan.weekStart)
    .maybeSingle();

  let planId = existingPlan?.id;
  if (!planId) {
    const { data: inserted } = await supabase
      .from("meal_plans")
      .insert({
        family_id: family.id,
        player_id: playerId,
        week_start: plan.weekStart,
      })
      .select("id")
      .single();
    planId = inserted?.id;
  }
  if (!planId) return;

  // Resolve meal slug -> id once.
  const slugs = Array.from(
    new Set(plan.entries.map((e) => e.mealSlug).filter((s): s is string => Boolean(s)))
  );
  const slugToId = new Map<string, string>();
  if (slugs.length > 0) {
    const { data: mealRows } = await supabase
      .from("meals")
      .select("id, slug")
      .in("slug", slugs);
    (mealRows ?? []).forEach((m: { id: string; slug: string }) => slugToId.set(m.slug, m.id));
  }

  // Replace entries: simplest correct path for now.
  await supabase.from("meal_plan_entries").delete().eq("meal_plan_id", planId);
  const entryRows = plan.entries
    .filter((e) => e.mealSlug !== null || e.dayType !== "school")
    .map((e) => ({
      meal_plan_id: planId,
      day_of_week: e.dayOfWeek,
      day_type: e.dayType,
      slot: e.slot,
      meal_id: e.mealSlug ? slugToId.get(e.mealSlug) ?? null : null,
      servings: e.servings,
    }));
  if (entryRows.length > 0) {
    await supabase.from("meal_plan_entries").insert(entryRows);
  }

  // Grocery check state.
  await supabase.from("grocery_check_state").delete().eq("meal_plan_id", planId);
  const checkedSlugs = Object.entries(plan.groceryChecked)
    .filter(([, v]) => v)
    .map(([slug]) => slug);
  if (checkedSlugs.length > 0) {
    const { data: ingRows } = await supabase
      .from("ingredients")
      .select("id, slug")
      .in("slug", checkedSlugs);
    const rows = (ingRows ?? []).map((i: { id: string; slug: string }) => ({
      meal_plan_id: planId,
      ingredient_id: i.id,
      is_checked: true,
    }));
    if (rows.length > 0) {
      await supabase.from("grocery_check_state").insert(rows);
    }
  }
}
