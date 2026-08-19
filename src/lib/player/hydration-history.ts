const STORAGE_PREFIX = "fma:water:";
const OZ_PER_CUP = 8;

export interface HydrationDay {
  date: string; // YYYY-MM-DD, local
  cups: number;
  oz: number;
}

export function dateKey(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function readDay(date: string): number {
  if (typeof window === "undefined") return 0;
  const raw = window.localStorage.getItem(`${STORAGE_PREFIX}${date}`);
  const n = raw ? parseInt(raw, 10) : 0;
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

export function writeDay(date: string, cups: number): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(`${STORAGE_PREFIX}${date}`, String(cups));
  } catch {
    // Storage blocked or full. In-memory state still reflects the tap.
  }
}

// Ends on today and walks backwards, so index 0 is the oldest day shown.
export function recentDays(count = 7, from: Date = new Date()): HydrationDay[] {
  const out: HydrationDay[] = [];
  for (let back = count - 1; back >= 0; back--) {
    const d = new Date(from);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - back);
    const date = dateKey(d);
    const cups = readDay(date);
    out.push({ date, cups, oz: cups * OZ_PER_CUP });
  }
  return out;
}
