"use client";

import type { MealPlan, MealPlanEntry } from "@/types/domain";
import { getBrowserSupabase } from "@/lib/supabase/client";
import { emptyPlan } from "./empty-plan";
import { getActivePlayerId } from "@/lib/supabase/family";

export async function loadPlanRemote(weekStart: string): Promise<MealPlan | null> {
  const supabase = getBrowserSupabase();
  if (!supabase) return null;

  const playerId = await getActivePlayerId();
  if (!playerId) return null;

  const { data: planRow } = await supabase
    .from("meal_plans")
    .select("id, family_id, updated_at")
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

  return {
    weekStart,
    entries,
    groceryChecked,
    updatedAt: planRow.updated_at ?? undefined,
  };
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

  // Upsert on the (meal_plan_id, day_of_week, slot) unique constraint rather than deleting
  // the week and re-inserting it. The old path was two unrelated statements with no
  // transaction around them, so on a weak connection in a store a delete could land while
  // the insert failed, and the week was gone.
  const entryRows = plan.entries.map((e) => ({
    meal_plan_id: planId,
    day_of_week: e.dayOfWeek,
    day_type: e.dayType,
    slot: e.slot,
    meal_id: e.mealSlug ? slugToId.get(e.mealSlug) ?? null : null,
    servings: e.servings,
  }));
  await supabase
    .from("meal_plan_entries")
    .upsert(entryRows, { onConflict: "meal_plan_id,day_of_week,slot" });

  // meal_plans.updated_at existed in the schema from the start and was never written, so the
  // one column that could resolve a conflict was always stale.
  await supabase
    .from("meal_plans")
    .update({ updated_at: new Date().toISOString() })
    .eq("id", planId);

  // Same shape for grocery ticks, keyed on the composite primary key. Unchecked items are
  // written as false rather than deleted, so an unticked box survives a failed round trip.
  const checkSlugs = Object.keys(plan.groceryChecked);
  if (checkSlugs.length > 0) {
    const { data: ingRows } = await supabase
      .from("ingredients")
      .select("id, slug")
      .in("slug", checkSlugs);
    const rows = (ingRows ?? []).map((i: { id: string; slug: string }) => ({
      meal_plan_id: planId,
      ingredient_id: i.id,
      is_checked: Boolean(plan.groceryChecked[i.slug]),
    }));
    if (rows.length > 0) {
      await supabase
        .from("grocery_check_state")
        .upsert(rows, { onConflict: "meal_plan_id,ingredient_id" });
    }
  }
}
