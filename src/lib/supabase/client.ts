"use client";

import { createBrowserClient } from "@supabase/ssr";
import { SUPABASE_ANON_KEY, SUPABASE_URL, isSupabaseConfigured } from "./config";
import type { SupabaseClient } from "@supabase/supabase-js";

export function getBrowserSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured) return null;
  return createBrowserClient(SUPABASE_URL!, SUPABASE_ANON_KEY!);
}
