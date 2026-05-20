import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { SUPABASE_ANON_KEY, SUPABASE_URL, isSupabaseConfigured } from "./config";

// Auth is OPTIONAL in this app. Anyone can use the full planner in localStorage
// mode without signing in. Sign-in only unlocks cross-device sync.
// This middleware only refreshes the auth cookie when present; it never gates routes.

export async function updateSession(request: NextRequest): Promise<NextResponse> {
  let supabaseResponse = NextResponse.next({ request });
  if (!isSupabaseConfigured) return supabaseResponse;

  const supabase = createServerClient(SUPABASE_URL!, SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  // Refresh session cookie if one exists. Don't redirect anyone.
  await supabase.auth.getUser();

  return supabaseResponse;
}
