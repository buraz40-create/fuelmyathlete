import { redirect } from "next/navigation";

interface HomeProps {
  searchParams: Promise<{ code?: string; error?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  // If a magic-link landed at the root (because Supabase fell back to Site URL),
  // forward it to /auth/callback so the session can be exchanged correctly.
  if (params.code) {
    redirect(`/auth/callback?code=${encodeURIComponent(params.code)}`);
  }
  // Auth is optional. Default everyone to the planner.
  // ProfileGate handles first-time users by sending them to /onboarding.
  redirect("/planner");
}
