"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";
import { Logo } from "@/components/brand/Logo";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getBrowserSupabase } from "@/lib/supabase/client";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const supabase = getBrowserSupabase();
    if (!supabase) {
      setError("Sign-in is not available in this environment. Use localhost dev mode instead.");
      setStatus("error");
      return;
    }
    setStatus("sending");
    setError(null);

    const origin = window.location.origin;
    const { error: authError } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo: `${origin}/auth/callback` },
    });

    if (authError) {
      setError(authError.message);
      setStatus("error");
      return;
    }
    setStatus("sent");
  }

  return (
    <main
      id="main"
      className="flex min-h-screen items-center justify-center bg-background px-4 py-10"
    >
      <article className="mx-auto w-full max-w-md rounded-3xl border border-border bg-surface p-6 shadow-sm md:p-8">
        <header className="mb-5 flex flex-col items-center text-center">
          <Logo width={340} priority />
          <h1 className="mt-4 text-2xl">Sign in</h1>
        </header>

        {status === "sent" ? (
          <div className="rounded-2xl bg-primary-soft/60 p-5 text-sm text-ink">
            <p className="font-semibold">Check your inbox.</p>
            <p className="mt-1 text-muted-foreground">
              We sent a sign-in link to <strong className="text-ink">{email}</strong>. Click it
              from this device to land back on the planner.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-sm text-muted-foreground">
              No password. Enter your email and we&apos;ll send you a one-tap sign-in link.
            </p>

            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
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
              disabled={status === "sending"}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90 disabled:opacity-50"
            >
              <EnvelopeSimple size={18} weight="duotone" aria-hidden />
              {status === "sending" ? "Sending link..." : "Send me a sign-in link"}
              {status !== "sending" && <ArrowRight size={16} weight="bold" aria-hidden />}
            </button>
          </form>
        )}

        <p className="mt-6 text-center text-[11px] leading-relaxed text-muted-foreground">
          By signing in you agree to our terms. Magic link is valid for 1 hour.
        </p>
      </article>
    </main>
  );
}
