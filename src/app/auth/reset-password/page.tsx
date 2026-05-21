"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeSlash, LockKey } from "@phosphor-icons/react/dist/ssr";
import { Logo } from "@/components/brand/Logo";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getBrowserSupabase } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "ok">("idle");
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  // Supabase opens this page with a recovery session in the URL hash.
  // The browser client picks it up automatically; we just wait for it.
  useEffect(() => {
    const supabase = getBrowserSupabase();
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => {
      setReady(Boolean(data.session));
    });
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (password.length < 8) {
      setError("Password needs at least 8 characters.");
      setStatus("error");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      setStatus("error");
      return;
    }
    const supabase = getBrowserSupabase();
    if (!supabase) {
      setError("Reset is not available in this environment.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    setError(null);
    const { error: updateError } = await supabase.auth.updateUser({ password });
    if (updateError) {
      setError(updateError.message);
      setStatus("error");
      return;
    }
    setStatus("ok");
    setTimeout(() => {
      router.push("/planner");
      router.refresh();
    }, 1000);
  }

  return (
    <main
      id="main"
      className="flex min-h-screen items-center justify-center bg-background px-4 py-10"
    >
      <article className="mx-auto w-full max-w-md rounded-3xl border border-border bg-surface p-6 shadow-sm md:p-8">
        <header className="mb-6 flex flex-col items-center text-center">
          <Logo width={200} priority />
          <h1 className="mt-5 text-2xl">Set a new password</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Pick something at least 8 characters. You&apos;ll be signed in right after.
          </p>
        </header>

        {!ready && status === "idle" && (
          <p className="rounded-2xl bg-muted/40 p-4 text-center text-sm text-muted-foreground">
            Waiting for the reset link to load...
          </p>
        )}

        {status === "ok" ? (
          <div className="rounded-2xl bg-primary-soft/60 p-5 text-center text-sm text-ink">
            <p className="font-semibold">Password updated.</p>
            <p className="mt-1 text-muted-foreground">Taking you to the planner...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="password">New password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  autoComplete="new-password"
                  required
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShow((s) => !s)}
                  aria-label={show ? "Hide password" : "Show password"}
                  className="absolute right-2.5 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full text-muted-foreground transition hover:text-ink"
                >
                  {show ? (
                    <EyeSlash size={16} weight="duotone" aria-hidden />
                  ) : (
                    <Eye size={16} weight="duotone" aria-hidden />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="confirm">Confirm password</Label>
              <Input
                id="confirm"
                type={show ? "text" : "password"}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Type it again"
                autoComplete="new-password"
                required
              />
            </div>

            {error && (
              <p role="alert" className="text-sm text-danger">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90 disabled:opacity-50"
            >
              <LockKey size={18} weight="duotone" aria-hidden />
              {status === "loading" ? "Saving..." : "Save new password"}
            </button>
          </form>
        )}
      </article>
    </main>
  );
}
