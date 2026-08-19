"use client";

import type { PlayerProfile } from "@/types/domain";
import { getBrowserSupabase } from "@/lib/supabase/client";

interface PlayerRow {
  id: string;
  family_id: string;
  name: string;
  age_years: number | null;
  weight_lb: number | null;
  sex: "male" | "female" | null;
  height_in: number | null;
  sport: string | null;
  activity_level: "light" | "moderate" | "heavy" | null;
  parent_show_calories_to_teen: boolean | null;
  created_at: string;
  updated_at: string;
}

function rowToProfile(row: PlayerRow): PlayerProfile | null {
  if (row.age_years == null || row.weight_lb == null) return null;
  return {
    name: row.name,
    ageYears: row.age_years,
    weightLb: row.weight_lb == null ? undefined : Number(row.weight_lb),
    sex: row.sex ?? undefined,
    heightIn: row.height_in != null ? Number(row.height_in) : undefined,
    sport: row.sport ?? undefined,
    activityLevel: row.activity_level ?? undefined,
    parentShowCaloriesToTeen: row.parent_show_calories_to_teen ?? undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function loadProfileRemote(): Promise<PlayerProfile | null> {
  const supabase = getBrowserSupabase();
  if (!supabase) return null;

  const { data: families } = await supabase
    .from("families")
    .select("id")
    .limit(1)
    .maybeSingle();

  if (!families) return null;

  const { data: player } = await supabase
    .from("players")
    .select("*")
    .eq("family_id", families.id)
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (!player) return null;
  return rowToProfile(player as PlayerRow);
}

export async function saveProfileRemote(profile: PlayerProfile): Promise<void> {
  const supabase = getBrowserSupabase();
  if (!supabase) return;

  const { data: families } = await supabase
    .from("families")
    .select("id")
    .limit(1)
    .maybeSingle();

  if (!families) return;

  const { data: existing } = await supabase
    .from("players")
    .select("id")
    .eq("family_id", families.id)
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  const row = {
    family_id: families.id,
    name: profile.name,
    age_years: profile.ageYears,
    weight_lb: profile.weightLb ?? null,
    sex: profile.sex ?? null,
    height_in: profile.heightIn ?? null,
    sport: profile.sport ?? "soccer",
    activity_level: profile.activityLevel ?? null,
    parent_show_calories_to_teen: profile.parentShowCaloriesToTeen ?? false,
    updated_at: new Date().toISOString(),
  };

  if (existing) {
    await supabase.from("players").update(row).eq("id", existing.id);
  } else {
    await supabase.from("players").insert(row);
  }
}
