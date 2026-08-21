"use client";

import { getBrowserSupabase } from "@/lib/supabase/client";
import { getActivePlayerId } from "@/lib/supabase/family";
import { generateInviteCode } from "@/lib/supabase/invite-code";

export interface FamilyInvite {
  id: string;
  code: string;
  expiresAt: string;
  redeemedAt: string | null;
}

/** The family this user is acting for. Resolved through the shared player lookup. */
async function activeFamilyId(): Promise<string | null> {
  const supabase = getBrowserSupabase();
  if (!supabase) return null;
  // getActivePlayerId provisions the family when it is missing, so going through it means an
  // invite can be created on an account the signup trigger never ran for.
  const playerId = await getActivePlayerId();
  if (!playerId) return null;
  const { data } = await supabase
    .from("players")
    .select("family_id")
    .eq("id", playerId)
    .maybeSingle();
  return (data as { family_id: string } | null)?.family_id ?? null;
}

export async function listInvites(): Promise<FamilyInvite[]> {
  const supabase = getBrowserSupabase();
  if (!supabase) return [];
  const familyId = await activeFamilyId();
  if (!familyId) return [];

  const { data, error } = await supabase
    .from("family_invites")
    .select("id, code, expires_at, redeemed_at")
    .eq("family_id", familyId)
    .order("created_at", { ascending: false });

  if (error) return [];
  return (data ?? []).map((row: Record<string, unknown>) => ({
    id: row.id as string,
    code: row.code as string,
    expiresAt: row.expires_at as string,
    redeemedAt: (row.redeemed_at as string | null) ?? null,
  }));
}

export async function createInvite(): Promise<{ invite?: FamilyInvite; error?: string }> {
  const supabase = getBrowserSupabase();
  if (!supabase) return { error: "Sync is not configured." };

  const { data: auth } = await supabase.auth.getUser();
  const userId = auth?.user?.id;
  if (!userId) return { error: "Sign in first, so the invite belongs to your household." };

  const familyId = await activeFamilyId();
  if (!familyId) return { error: "Could not find your household." };

  const { data, error } = await supabase
    .from("family_invites")
    .insert({ family_id: familyId, code: generateInviteCode(), created_by: userId })
    .select("id, code, expires_at, redeemed_at")
    .single();

  if (error) {
    return {
      error:
        error.code === "42P01"
          ? "Invites are not set up on the database yet. Run migration 0006."
          : "Could not create an invite just now.",
    };
  }

  const row = data as Record<string, unknown>;
  return {
    invite: {
      id: row.id as string,
      code: row.code as string,
      expiresAt: row.expires_at as string,
      redeemedAt: null,
    },
  };
}

export async function revokeInvite(id: string): Promise<boolean> {
  const supabase = getBrowserSupabase();
  if (!supabase) return false;
  const { error } = await supabase.from("family_invites").delete().eq("id", id);
  return !error;
}

/**
 * Join a household with a code.
 *
 * The database function is the only thing that can add a member, and it answers with one
 * message for every kind of failure on purpose, so this cannot be used to work out whether a
 * guessed code exists. That message is passed through rather than being reinterpreted here.
 */
export async function redeemInvite(code: string): Promise<{ familyId?: string; error?: string }> {
  const supabase = getBrowserSupabase();
  if (!supabase) return { error: "Sync is not configured." };

  const trimmed = code.trim().toUpperCase();
  if (trimmed.length < 6) return { error: "That code looks too short." };

  const { data, error } = await supabase.rpc("redeem_family_invite", { invite_code: trimmed });

  if (error) {
    if (error.message.includes("not valid")) {
      return { error: "That invite is not valid. It may have expired or already been used." };
    }
    if (error.message.includes("maximum")) {
      return { error: "That household already has the maximum number of parents." };
    }
    if (error.code === "42883") {
      return { error: "Invites are not set up on the database yet. Run migration 0006." };
    }
    return { error: "Could not join that household just now." };
  }

  return { familyId: data as string };
}
