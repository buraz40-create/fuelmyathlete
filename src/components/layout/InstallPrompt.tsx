"use client";

import { useEffect, useState } from "react";
import { Export, X, DotsThreeVertical } from "@phosphor-icons/react/dist/ssr";

const DISMISSED_KEY = "fma:install-dismissed";

type Platform = "ios" | "other";

// iOS has no beforeinstallprompt event, so there is no button a site can offer. The only path
// is Share, then Add to Home Screen, done by hand. That matters more here than it sounds:
// an installed site is exempt from Safari's 7 day storage eviction, and this app keeps the
// family's meal plan in localStorage.
interface InstallState {
  show: boolean;
  platform: Platform;
}

const HIDDEN: InstallState = { show: false, platform: "other" };

function detect(): InstallState {
  if (typeof window === "undefined") return HIDDEN;
  if (window.localStorage.getItem(DISMISSED_KEY)) return HIDDEN;

  const standalone =
    window.matchMedia("(display-mode: standalone)").matches ||
    // Safari's own flag, still the only reliable signal on iOS.
    (window.navigator as Navigator & { standalone?: boolean }).standalone === true;
  if (standalone) return HIDDEN;

  const ua = window.navigator.userAgent;
  const isIOS = /iPad|iPhone|iPod/.test(ua);
  const isAndroid = /Android/.test(ua);
  if (!isIOS && !isAndroid) return HIDDEN; // Desktop does not need the coaching.

  return { show: true, platform: isIOS ? "ios" : "other" };
}

export function InstallPrompt() {
  const [state, setState] = useState<InstallState>(HIDDEN);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- detection reads userAgent, display-mode and localStorage, none of which exist on the server; SSR renders nothing and the client decides on mount.
    setState(detect());
  }, []);

  const { show, platform } = state;
  if (!show) return null;

  function dismiss() {
    window.localStorage.setItem(DISMISSED_KEY, "1");
    setState(HIDDEN);
  }

  return (
    <aside
      role="note"
      aria-labelledby="install-title"
      className="mx-auto mb-4 w-full max-w-6xl px-4 md:px-8"
    >
      <div className="relative rounded-3xl border border-border bg-primary-soft/50 p-4 pr-10">
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss install tip"
          className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full text-muted-foreground transition hover:text-ink"
        >
          <X size={14} weight="bold" aria-hidden />
        </button>

        <h2 id="install-title" className="text-sm font-semibold text-ink">
          Put this on your home screen
        </h2>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
          It opens like an app, works in the grocery store with no signal, and stops your saved
          week from being cleared after a week of not opening it.
        </p>
        <p className="mt-2 flex flex-wrap items-center gap-1.5 text-xs font-medium text-ink">
          {platform === "ios" ? (
            <>
              Tap
              <Export size={15} weight="bold" aria-label="the Share button" />
              Share, then <span>Add to Home Screen</span>
            </>
          ) : (
            <>
              Tap
              <DotsThreeVertical size={15} weight="bold" aria-label="the browser menu" />
              menu, then <span>Add to Home screen</span>
            </>
          )}
        </p>
      </div>
    </aside>
  );
}
