export function startOfSunday(date: Date = new Date()): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - d.getDay());
  return d;
}

export function toIsoDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function fromIsoDate(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

export function currentWeekStart(): string {
  return toIsoDate(startOfSunday());
}

export function shiftWeek(weekStart: string, weeks: number): string {
  return toIsoDate(addDays(fromIsoDate(weekStart), weeks * 7));
}

export function formatWeekRange(weekStart: string): string {
  const start = fromIsoDate(weekStart);
  const end = addDays(start, 6);
  const sameMonth = start.getMonth() === end.getMonth();
  const fmt = (d: Date) =>
    d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  return sameMonth
    ? `${fmt(start)} – ${end.getDate()}`
    : `${fmt(start)} – ${fmt(end)}`;
}
