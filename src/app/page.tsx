import { redirect } from "next/navigation";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getCurrentUser } from "@/lib/auth";

export default async function Home() {
  if (!isSupabaseConfigured) {
    // Local dev / localStorage-only mode: skip auth entirely.
    redirect("/planner");
  }

  const user = await getCurrentUser();
  if (user) {
    redirect("/planner");
  }
  redirect("/sign-in");
}
