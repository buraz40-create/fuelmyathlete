"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRovingGroup } from "@/hooks/useRovingGroup";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  EnvelopeSimple,
  Eye,
  EyeSlash,
  GoogleLogo,
  LockKey,
} from "@phosphor-icons/react/dist/ssr";
import type { Provider } from "@supabase/supabase-js";
import { Logo } from "@/components/brand/Logo";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { getBrowserSupabase } from "@/lib/supabase/client";

type Mode = "signin" | "signup" | "forgot";

function describeAuthError(code: string, description: string | null): string {
  if (code === "missing_code") {
    return "That sign-in link is incomplete. Try again from this page.";
  }
  if (code === "not_configured") {
    return "Sign-in is temporarily unavailable. We're on it.";
  }
  if (code === "access_denied") {
    return "Sign-in was cancelled. No account was created.";
  }
  return description?.replace(/\+/g, " ") || code.replace(/_/g, " ");
}

function initialAuthError(): string | null {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  const code = params.get("error");
  if (!code) return null;
  return describeAuthError(code, params.get("error_description"));
}

export default function SignInPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // The auth callback bounces failures back here as ?error=. Read it during the first
  // render rather than in an effect, so the message is present on the initial paint and
  // no cascading render is triggered.
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">(() =>
    initialAuthError() ? "error" : "idle"
  );
  const [error, setError] = useState<string | null>(() => initialAuthError());
  const [success, setSuccess] = useState<string | null>(null);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || (typeof window !== "undefined" ? window.location.origin : "");

  // Strip the params once mounted so a later attempt on the same page does not look
  // pre-failed. The message itself was already read during the first render.
  useEffect(() => {
    const clean = new URL(window.location.href);
    if (!clean.searchParams.has("error")) return;
    clean.searchParams.delete("error");
    clean.searchParams.delete("error_description");
    clean.searchParams.delete("error_code");
    window.history.replaceState({}, "", clean.toString());
  }, []);

  async function handleSignIn(e: FormEvent) {
    e.preventDefault();
    const supabase = getBrowserSupabase();
    if (!supabase) {
      setError("Sign-in is not available in this environment.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    setError(null);
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    if (authError) {
      setError(authError.message);
      setStatus("error");
      return;
    }
    router.push("/planner");
    router.refresh();
  }

  async function handleSignUp(e: FormEvent) {
    e.preventDefault();
    const supabase = getBrowserSupabase();
    if (!supabase) {
      setError("Sign-up is not available in this environment.");
      setStatus("error");
      return;
    }
    if (password.length < 8) {
      setError("Password needs at least 8 characters.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    setError(null);
    const { data, error: authError } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: { emailRedirectTo: `${siteUrl.replace(/\/$/, "")}/auth/callback` },
    });
    if (authError) {
      setError(authError.message);
      setStatus("error");
      return;
    }
    // If session is returned, user is signed in immediately (email confirmation disabled).
    if (data.session) {
      router.push("/planner");
      router.refresh();
      return;
    }
    // Otherwise, email confirmation is on. Show success.
    setSuccess(
      `Account created. Check ${email.trim()} for a confirmation link to finish signing in.`
    );
    setStatus("sent");
  }

  async function handleForgot(e: FormEvent) {
    e.preventDefault();
    const supabase = getBrowserSupabase();
    if (!supabase) {
      setError("Password reset is not available in this environment.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    setError(null);
    const { error: authError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${siteUrl.replace(/\/$/, "")}/auth/reset-password`,
    });
    if (authError) {
      setError(authError.message);
      setStatus("error");
      return;
    }
    setSuccess(`Check ${email.trim()} for a password reset link.`);
    setStatus("sent");
  }

  async function handleOAuth(provider: Provider) {
    const supabase = getBrowserSupabase();
    if (!supabase) {
      setError("Sign-in is not available in this environment.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    setError(null);
    const { error: authError } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${siteUrl.replace(/\/$/, "")}/auth/callback`,
      },
    });
    if (authError) {
      setError(authError.message);
      setStatus("error");
    }
    // On success, Supabase redirects the browser to the provider.
  }

  async function handleMagicLink() {
    const supabase = getBrowserSupabase();
    if (!supabase) return;
    if (!email.trim()) {
      setError("Add your email first.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    setError(null);
    const { error: authError } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo: `${siteUrl.replace(/\/$/, "")}/auth/callback` },
    });
    if (authError) {
      setError(authError.message);
      setStatus("error");
      return;
    }
    setSuccess(`Check ${email.trim()} for a one-tap sign-in link.`);
    setStatus("sent");
  }

  function switchMode(next: Mode) {
    setMode(next);
    setError(null);
    setSuccess(null);
    setStatus("idle");
  }

  const modeKeys = useRovingGroup({
    items: ["signin", "signup"] as const,
    selected: mode,
    onSelect: switchMode,
    idFor: (key) => `auth-tab-${key}`,
  });

  return (
    <main
      id="main"
      className="flex min-h-screen items-center justify-center bg-background px-4 py-10"
    >
      <article className="mx-auto w-full max-w-md rounded-3xl border border-border bg-surface p-6 shadow-sm md:p-8">
        <header className="mb-6 flex flex-col items-center text-center">
          <Logo width={200} priority />
          <h1 className="mt-5 text-2xl">
            {mode === "signin" && "Welcome back"}
            {mode === "signup" && "Create your account"}
            {mode === "forgot" && "Reset password"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {mode === "signin" && "Sign in to sync your plan across devices."}
            {mode === "signup" && "It's free. No credit card. No ads."}
            {mode === "forgot" && "We'll email you a link to set a new password."}
          </p>
        </header>

        {mode !== "forgot" && status !== "sent" && (
          <div className="mb-5 space-y-3">
            <button
              type="button"
              onClick={() => handleOAuth("google")}
              disabled={status === "loading"}
              className="flex w-full items-center justify-center gap-2.5 rounded-full border border-border bg-surface px-5 py-3 text-sm font-semibold text-ink shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md disabled:opacity-50"
            >
              <GoogleLogo size={18} weight="bold" aria-hidden className="text-[#4285F4]" />
              Continue with Google
            </button>

            <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              <span className="h-px flex-1 bg-border" aria-hidden />
              <span>Or with email</span>
              <span className="h-px flex-1 bg-border" aria-hidden />
            </div>
          </div>
        )}

        {mode !== "forgot" && status !== "sent" && (
          <nav
            role="tablist"
            aria-label="Sign in or create account"
            onKeyDown={modeKeys.onKeyDown}
            className="mb-5 flex w-full items-center gap-1 rounded-full border border-border bg-muted/30 p-1"
          >
            <button
              type="button"
              role="tab"
              id={`auth-tab-signin`}
              aria-selected={mode === "signin"}
              tabIndex={modeKeys.tabIndexFor("signin")}
              onClick={() => switchMode("signin")}
              className={cn(
                "flex-1 rounded-full px-3 py-2 text-sm font-semibold transition",
                mode === "signin"
                  ? "bg-surface text-ink shadow-sm"
                  : "text-muted-foreground hover:text-ink"
              )}
            >
              Sign in
            </button>
            <button
              type="button"
              role="tab"
              id={`auth-tab-signup`}
              aria-selected={mode === "signup"}
              tabIndex={modeKeys.tabIndexFor("signup")}
              onClick={() => switchMode("signup")}
              className={cn(
                "flex-1 rounded-full px-3 py-2 text-sm font-semibold transition",
                mode === "signup"
                  ? "bg-surface text-ink shadow-sm"
                  : "text-muted-foreground hover:text-ink"
              )}
            >
              Create account
            </button>
          </nav>
        )}

        {status === "sent" && success ? (
          <div className="rounded-2xl bg-primary-soft/60 p-5 text-sm text-ink">
            <p className="font-semibold">Check your inbox.</p>
            <p className="mt-1 text-muted-foreground">{success}</p>
            <button
              type="button"
              onClick={() => switchMode("signin")}
              className="mt-4 text-xs font-medium text-primary underline-offset-2 hover:underline"
            >
              Back to sign in
            </button>
          </div>
        ) : (
          <form
            onSubmit={
              mode === "signin"
                ? handleSignIn
                : mode === "signup"
                ? handleSignUp
                : handleForgot
            }
            className="space-y-4"
          >
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

            {mode !== "forgot" && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  {mode === "signin" && (
                    <button
                      type="button"
                      onClick={() => switchMode("forgot")}
                      className="text-xs font-medium text-primary underline-offset-2 hover:underline"
                    >
                      Forgot?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={mode === "signup" ? "At least 8 characters" : "Your password"}
                    autoComplete={mode === "signup" ? "new-password" : "current-password"}
                    minLength={mode === "signup" ? 8 : undefined}
                    required
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-2.5 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full text-muted-foreground transition hover:text-ink"
                  >
                    {showPassword ? (
                      <EyeSlash size={16} weight="duotone" aria-hidden />
                    ) : (
                      <Eye size={16} weight="duotone" aria-hidden />
                    )}
                  </button>
                </div>
              </div>
            )}

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
              {mode === "signin" && <LockKey size={18} weight="duotone" aria-hidden />}
              {mode === "signup" && <ArrowRight size={18} weight="duotone" aria-hidden />}
              {mode === "forgot" && <EnvelopeSimple size={18} weight="duotone" aria-hidden />}
              {status === "loading"
                ? "Working..."
                : mode === "signin"
                ? "Sign in"
                : mode === "signup"
                ? "Create account"
                : "Send reset link"}
            </button>

            {mode === "signin" && (
              <button
                type="button"
                onClick={handleMagicLink}
                disabled={status === "loading"}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-border bg-surface px-5 py-3 text-sm font-medium text-muted-foreground transition hover:text-ink disabled:opacity-50"
              >
                <EnvelopeSimple size={16} weight="duotone" aria-hidden />
                Email me a one-tap link instead
              </button>
            )}

            {mode === "forgot" && (
              <button
                type="button"
                onClick={() => switchMode("signin")}
                className="block w-full text-center text-xs font-medium text-muted-foreground underline-offset-2 hover:text-ink hover:underline"
              >
                Back to sign in
              </button>
            )}
          </form>
        )}

        <p className="mt-6 text-center text-[11px] leading-relaxed text-muted-foreground">
          By signing in you agree to our terms. Passwords need at least 8 characters.
        </p>
      </article>
    </main>
  );
}
