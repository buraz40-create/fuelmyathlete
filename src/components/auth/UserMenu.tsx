"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SignOut, User as UserIcon } from "@phosphor-icons/react/dist/ssr";
import { useAuthUser } from "@/hooks/useAuthUser";
import { getBrowserSupabase } from "@/lib/supabase/client";
import { resetActivePlayerCache } from "@/lib/supabase/family";
import { cn } from "@/lib/utils";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

export function UserMenu({ className }: { className?: string }) {
  const router = useRouter();
  const { user, hydrated } = useAuthUser();
  const [signingOut, setSigningOut] = useState(false);
  const [confirmSignOut, setConfirmSignOut] = useState(false);

  async function signOut() {
    const supabase = getBrowserSupabase();
    if (!supabase) return;
    setSigningOut(true);
    await supabase.auth.signOut();
    resetActivePlayerCache();
    router.push("/");
    router.refresh();
  }

  // While we don't know auth state yet, reserve space but show nothing.
  if (!hydrated) {
    return <span className={cn("inline-block h-11 w-20", className)} aria-hidden />;
  }

  if (!user) {
    return (
      <Link
        href="/sign-in"
        className={cn(
          "inline-flex min-h-11 items-center rounded-full border border-border bg-surface px-3 text-xs font-semibold text-ink transition hover:border-primary hover:text-primary",
          className
        )}
      >
        Sign in
      </Link>
    );
  }

  return (
    <>
    <button
      type="button"
      onClick={() => setConfirmSignOut(true)}
      disabled={signingOut}
      title={user.email ?? undefined}
      className={cn(
        "inline-flex min-h-11 items-center gap-1.5 rounded-full border border-border bg-surface px-3 text-xs font-semibold text-muted-foreground transition hover:border-danger hover:text-danger disabled:opacity-50",
        className
      )}
    >
      <SignOut size={14} weight="duotone" aria-hidden />
      {signingOut ? "Signing out..." : "Sign out"}
    </button>

    {/* One unguarded tap in the header used to end the session. Cheap to guard, annoying to
        undo, since signing back in means waiting for a magic link. */}
    <ConfirmDialog
      open={confirmSignOut}
      onOpenChange={setConfirmSignOut}
      title="Sign out?"
      description="Your plan stays on this device. Signing back in needs a new magic link from your email."
      confirmLabel="Sign out"
      destructive
      onConfirm={signOut}
    />
    </>
  );
}

export function UserMenuLabel({ className }: { className?: string }) {
  const { user, hydrated } = useAuthUser();
  if (!hydrated || !user?.email) return null;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full bg-primary-soft/60 px-3 py-1.5 text-xs font-medium text-primary",
        className
      )}
    >
      <UserIcon size={14} weight="duotone" aria-hidden />
      {user.email}
    </span>
  );
}
