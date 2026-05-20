"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, ArrowCounterClockwise, Timer } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";

function format(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export function StepTimer({ totalSec }: { totalSec: number }) {
  const [remaining, setRemaining] = useState(totalSec);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          setRunning(false);
          notifyComplete();
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  function reset() {
    setRunning(false);
    setRemaining(totalSec);
  }

  const done = remaining === 0;
  const progress = ((totalSec - remaining) / totalSec) * 100;

  return (
    <div
      role="timer"
      aria-live="polite"
      className={cn(
        "mt-3 flex items-center gap-3 rounded-2xl border bg-surface p-3",
        done
          ? "border-success bg-success/5"
          : running
          ? "border-primary bg-primary-soft/40"
          : "border-border"
      )}
    >
      <span className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
        <Timer size={20} weight="duotone" aria-hidden />
      </span>

      <div className="flex-1">
        <p className="font-mono text-xl font-semibold tabular-nums text-ink">
          {done ? "Done!" : format(remaining)}
        </p>
        <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-border">
          <div
            className="h-full bg-primary transition-[width] duration-1000 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex flex-shrink-0 gap-1">
        <button
          type="button"
          aria-label={running ? "Pause timer" : done ? "Restart" : "Start timer"}
          onClick={() => (done ? reset() : setRunning((r) => !r))}
          className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground transition hover:opacity-90"
        >
          {done ? (
            <ArrowCounterClockwise size={16} weight="bold" aria-hidden />
          ) : running ? (
            <Pause size={16} weight="fill" aria-hidden />
          ) : (
            <Play size={16} weight="fill" aria-hidden />
          )}
        </button>
        {!done && (running || remaining !== totalSec) && (
          <button
            type="button"
            aria-label="Reset timer"
            onClick={reset}
            className="grid h-10 w-10 place-items-center rounded-full border border-border text-muted-foreground transition hover:text-ink"
          >
            <ArrowCounterClockwise size={16} weight="bold" aria-hidden />
          </button>
        )}
      </div>
    </div>
  );
}

function notifyComplete() {
  if (typeof window === "undefined") return;
  try {
    const ctx = new (window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 880;
    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
    osc.start();
    osc.stop(ctx.currentTime + 0.45);
  } catch {
    // No audio context: silent fallback.
  }
}
