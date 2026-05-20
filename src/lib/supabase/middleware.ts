import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { SUPABASE_ANON_KEY, SUPABASE_URL, isSupabaseConfigured } from "./config";

const PROTECTED_PREFIXES = ["/planner", "/settings"];
const AUTH_PATHS = ["/sign-in", "/auth/callback", "/onboarding"];

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

  // Refresh the session if it exists; returns current user.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));
  const isAuthPath = AUTH_PATHS.some((p) => pathname.startsWith(p));

  if (!user && isProtected) {
    const redirectUrl = new URL("/sign-in", request.url);
    redirectUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  if (user && isAuthPath && !pathname.startsWith("/auth/callback") && !pathname.startsWith("/onboarding")) {
    return NextResponse.redirect(new URL("/planner", request.url));
  }

  return supabaseResponse;
}
