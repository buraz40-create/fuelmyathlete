import { getServerSupabase } from "@/lib/supabase/server";
import type { User } from "@supabase/supabase-js";

export async function getCurrentUser(): Promise<User | null> {
  const supabase = await getServerSupabase();
  if (!supabase) return null;
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return null;
  return data.user;
}
