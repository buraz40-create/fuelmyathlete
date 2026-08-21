"use client";

import { useCallback, useEffect, useState } from "react";
import { Copy, Check, Trash, UserPlus } from "@phosphor-icons/react/dist/ssr";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { useAuthUser } from "@/hooks/useAuthUser";
import {
  createInvite,
  listInvites,
  redeemInvite,
  revokeInvite,
  type FamilyInvite,
} from "@/lib/supabase/invites";

function daysLeft(iso: string): string {
  const ms = new Date(iso).getTime() - Date.now();
  if (ms <= 0) return "expired";
  const days = Math.ceil(ms / 86_400_000);
  return days === 1 ? "expires tomorrow" : `expires in ${days} days`;
}

/**
 * Adding the other parent to the household.
 *
 * The whole flow is one code handed from one person to another, because the alternative is
 * collecting the second parent's email address and mailing them, and this app does not send
 * email and should not start by asking for somebody's address who has not agreed to anything.
 */
export function HouseholdParents() {
  const { user, hydrated } = useAuthUser();
  const [invites, setInvites] = useState<FamilyInvite[]>([]);
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [joinCode, setJoinCode] = useState("");

  const refresh = useCallback(async () => {
    setInvites(await listInvites());
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured || !user) return;
    void refresh();
  }, [user, refresh]);

  // Sync off, or signed out. Say so rather than showing controls that cannot work.
  if (!isSupabaseConfigured) return null;
  if (!hydrated) return null;

  if (!user) {
    return (
      <section className="rounded-3xl border border-border bg-surface p-5 md:p-6">
        <h2 className="text-base font-semibold text-ink">Another parent</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Sign in to share the plan with someone else in your household. Both of you then see the
          same week, the same grocery list, and the same ticked boxes while one of you is in the
          shop.
        </p>
      </section>
    );
  }

  const pending = invites.filter((i) => !i.redeemedAt && new Date(i.expiresAt) > new Date());

  async function onCreate() {
    setBusy(true);
    setMessage(null);
    const { invite, error } = await createInvite();
    if (error) setMessage(error);
    else if (invite) setInvites((prev) => [invite, ...prev]);
    setBusy(false);
  }

  async function onCopy(code: string) {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(code);
      window.setTimeout(() => setCopied(null), 2000);
    } catch {
      // Clipboard blocked. The code is on screen and can be read out, which is how most of
      // these will be shared anyway.
      setMessage("Could not copy. The code is above, and it is meant to be readable out loud.");
    }
  }

  async function onRevoke(id: string) {
    setBusy(true);
    if (await revokeInvite(id)) setInvites((prev) => prev.filter((i) => i.id !== id));
    setBusy(false);
  }

  async function onJoin() {
    setBusy(true);
    setMessage(null);
    const { error } = await redeemInvite(joinCode);
    if (error) {
      setMessage(error);
    } else {
      setMessage("Joined. Reloading so the shared plan takes over.");
      // A full reload rather than refetching: the plan, profile, preferences and ratings were
      // all loaded for the old household and every one of them would otherwise be stale.
      window.setTimeout(() => window.location.reload(), 900);
    }
    setBusy(false);
  }

  return (
    <section className="rounded-3xl border border-border bg-surface p-5 md:p-6">
      <h2 className="text-base font-semibold text-ink">Another parent</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Share the plan with someone else in your household. You both see the same week and the
        same grocery list, so one of you can tick things off in the shop while the other is at
        home.
      </p>

      <div className="mt-5 flex flex-col gap-3">
        <button
          type="button"
          onClick={onCreate}
          disabled={busy}
          className="inline-flex min-h-11 w-fit items-center gap-2 rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
        >
          <UserPlus size={16} weight="bold" aria-hidden />
          Create an invite code
        </button>

        {pending.length > 0 && (
          <ul className="flex flex-col gap-2">
            {pending.map((invite) => (
              <li
                key={invite.id}
                className="flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-background px-4 py-3"
              >
                <code className="text-base font-semibold tracking-[0.2em] text-ink">
                  {invite.code}
                </code>
                <span className="text-xs text-muted-foreground">{daysLeft(invite.expiresAt)}</span>
                <div className="ml-auto flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => onCopy(invite.code)}
                    className="inline-flex min-h-11 items-center gap-1.5 rounded-full px-3 text-xs font-semibold text-muted-foreground transition hover:text-ink"
                  >
                    {copied === invite.code ? (
                      <Check size={14} weight="bold" aria-hidden />
                    ) : (
                      <Copy size={14} weight="bold" aria-hidden />
                    )}
                    {copied === invite.code ? "Copied" : "Copy"}
                  </button>
                  <button
                    type="button"
                    onClick={() => onRevoke(invite.id)}
                    disabled={busy}
                    aria-label={`Revoke invite ${invite.code}`}
                    className="inline-flex min-h-11 items-center rounded-full px-3 text-xs font-semibold text-muted-foreground transition hover:text-danger disabled:opacity-50"
                  >
                    <Trash size={14} weight="bold" aria-hidden />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <p className="text-xs text-muted-foreground">
          A code works once and lasts a week. Give it to them however you already talk to each
          other; it is short enough to read out.
        </p>
      </div>

      <div className="mt-6 border-t border-border pt-5">
        <h3 className="text-sm font-semibold text-ink">Given a code?</h3>
        <p className="mt-1 text-xs text-muted-foreground">
          Joining replaces what is on this device with the shared household plan.
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <input
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
            placeholder="Invite code"
            aria-label="Invite code"
            autoCapitalize="characters"
            autoCorrect="off"
            spellCheck={false}
            className="min-h-11 flex-1 rounded-full border border-border bg-background px-4 text-sm tracking-[0.15em] text-ink placeholder:tracking-normal placeholder:text-muted-foreground focus:border-primary focus:outline-none"
          />
          <button
            type="button"
            onClick={onJoin}
            disabled={busy || joinCode.trim().length < 6}
            className="inline-flex min-h-11 items-center rounded-full border border-border bg-background px-4 text-sm font-semibold text-ink transition hover:border-primary disabled:opacity-50"
          >
            Join
          </button>
        </div>
      </div>

      {message && (
        <p role="status" className="mt-4 text-sm text-muted-foreground">
          {message}
        </p>
      )}
    </section>
  );
}
