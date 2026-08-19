import { NextResponse } from "next/server";
import { SUPABASE_ANON_KEY, SUPABASE_URL, isSupabaseConfigured } from "@/lib/supabase/config";

export const dynamic = "force-dynamic";

type Reachability = { reachable: boolean; detail: string };

// `isSupabaseConfigured` only proves the env vars are non-empty. A typo'd or
// deleted project ref passes that check and then fails at the browser, so
// actually talk to the auth endpoint the sign-in flow depends on.
async function checkSupabase(): Promise<Reachability> {
  if (!isSupabaseConfigured) {
    return { reachable: false, detail: "Supabase env vars are not set." };
  }
  const endpoint = `${SUPABASE_URL!.replace(/\/$/, "")}/auth/v1/health`;
  try {
    const response = await fetch(endpoint, {
      headers: { apikey: SUPABASE_ANON_KEY! },
      signal: AbortSignal.timeout(5000),
      cache: "no-store",
    });
    if (!response.ok) {
      return { reachable: false, detail: `Auth endpoint returned ${response.status}.` };
    }
    return { reachable: true, detail: "Auth endpoint responded." };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return { reachable: false, detail: `Could not reach ${endpoint}: ${message}` };
  }
}

export async function GET() {
  const supabase = await checkSupabase();
  return NextResponse.json(
    {
      ok: supabase.reachable,
      supabase: supabase.reachable,
      supabaseConfigured: isSupabaseConfigured,
      supabaseDetail: supabase.detail,
      timestamp: new Date().toISOString(),
    },
    { status: supabase.reachable ? 200 : 503 }
  );
}
