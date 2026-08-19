"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const TABS = [
  { href: "/today",           label: "Today" },
  { href: "/planner",         label: "Planner" },
  { href: "/planner/week",    label: "Week" },
  { href: "/planner/grocery", label: "Grocery list" },
] as const;

export function TabBar() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Planner sections"
      className="mx-auto hidden w-full max-w-6xl items-center gap-2 px-4 pt-2 md:flex md:px-8"
    >
      <ul className="flex w-full items-center gap-1 rounded-full border border-border bg-surface p-1">
        {TABS.map(({ href, label }) => {
          const active = pathname === href;
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "block w-full rounded-full px-4 py-2 text-center text-sm font-medium transition",
                  active
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-ink"
                )}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
