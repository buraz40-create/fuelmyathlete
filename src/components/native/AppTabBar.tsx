"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sun, CalendarBlank, BookOpen, User } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";

/**
 * The app's primary navigation.
 *
 * The website's answer to "where do I go" is a header with a logo and four links, which is
 * right for a page you arrived at from a search and wrong for something on a home screen. An
 * app is expected to have its destinations along the bottom, in reach of a thumb, present on
 * every screen.
 *
 * This is rendered on every page but hidden by CSS unless the document is marked native, rather
 * than being conditionally rendered. Conditional rendering would mean the server produces one
 * tree and the client another, and React would replace the page on hydration.
 *
 * Four destinations, deliberately. The existing planner bar carries Today, Planner, Week and
 * Grocery, which are four views of one thing; those stay where they are, inside the planner.
 * These four are the parts of the product.
 */
const TABS = [
  { href: "/today", label: "Today", icon: Sun },
  { href: "/planner", label: "Plan", icon: CalendarBlank },
  { href: "/recipes", label: "Recipes", icon: BookOpen },
  { href: "/settings", label: "Profile", icon: User },
] as const;

function isActive(pathname: string, href: string): boolean {
  if (href === "/planner") return pathname.startsWith("/planner");
  if (href === "/recipes") return pathname.startsWith("/recipe");
  return pathname === href;
}

export function AppTabBar() {
  const pathname = usePathname();

  return (
    <nav
      data-app-tabbar
      data-print-hide
      aria-label="App sections"
      className={cn(
        // Hidden everywhere except inside the app. The website keeps its header.
        "hidden",
        // A bar rather than a floating pill, because it is permanent furniture here rather
        // than a control that belongs to one screen.
        "fixed inset-x-0 bottom-0 z-50 border-t border-border bg-surface/95 backdrop-blur",
        // Room for the gesture bar on a modern Android phone, so the last row of icons is not
        // sitting under the system's own navigation.
        "pb-[env(safe-area-inset-bottom)]"
      )}
    >
      <ul className="mx-auto flex w-full max-w-lg items-stretch">
        {TABS.map(({ href, label, icon: Icon }) => {
          const active = isActive(pathname, href);
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  // 56px, comfortably past the 44 a finger needs, and the height a thumb
                  // expects at the bottom of a phone.
                  "flex min-h-14 flex-col items-center justify-center gap-1 px-1 py-2 text-[11px] font-semibold transition",
                  active ? "text-primary" : "text-muted-foreground"
                )}
              >
                <span
                  className={cn(
                    // The active pill is what makes the current tab readable at a glance
                    // without relying on colour alone.
                    "flex h-8 w-14 items-center justify-center rounded-full transition",
                    active ? "bg-primary-soft" : "bg-transparent"
                  )}
                >
                  <Icon size={22} weight={active ? "fill" : "duotone"} aria-hidden />
                </span>
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
