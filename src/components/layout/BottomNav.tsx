"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, CalendarDots, Basket, Sun } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";

const TABS = [
  { href: "/today",           label: "Today",   icon: Sun },
  { href: "/planner",         label: "Planner", icon: Calendar },
  { href: "/planner/week",    label: "Week",    icon: CalendarDots },
  { href: "/planner/grocery", label: "Grocery", icon: Basket },
] as const;

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-4 z-40 mx-auto flex w-[min(420px,92vw)] items-center justify-around rounded-full border border-border bg-surface px-2 py-2 shadow-lg md:hidden"
    >
      {TABS.map(({ href, label, icon: Icon }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex flex-1 flex-col items-center gap-0.5 rounded-full px-3 py-2 text-xs font-medium transition",
              active
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-ink"
            )}
          >
            <Icon size={22} weight="duotone" aria-hidden />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
