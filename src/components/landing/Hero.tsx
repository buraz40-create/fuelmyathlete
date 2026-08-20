"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { LiveCalculator } from "@/components/landing/LiveCalculator";

// Movement only. The name is kept because it reads well at the call sites, but nothing here
// touches opacity any more.
//
// The headline, the subheading, the call to action and the calculator all used to start at
// opacity 0. This is the landing page: statically prerendered, the first thing a visitor sees,
// and the page Google indexes. Content that is invisible until an animation finishes is
// content that is sometimes just invisible, and that has now bitten this project three times.
// The rule is in HANDOFF: on anything that has to be read, animate position, never visibility.
const fadeIn = {
  initial: { y: 18 },
  animate: { y: 0 },
};

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden px-4 pt-10 pb-16 md:px-8 md:pt-16 md:pb-24"
    >
      {/* Decorative gradient blobs. These DO fade, and that is fine: they are aria-hidden
          decoration, so a blob that never appears costs a visitor nothing. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute -top-32 -right-20 h-80 w-80 rounded-full bg-meal-dinner blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 0.45, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
          className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-meal-breakfast blur-3xl"
        />
      </div>

      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 md:grid-cols-[1.05fr_1fr] md:gap-12">
        <div>
          <motion.p
            {...fadeIn}
            transition={{ duration: 0.45, delay: 0 }}
            className="inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary"
          >
            For young athletes, ages 8 to 14
          </motion.p>

          <motion.h1
            id="hero-title"
            {...fadeIn}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="mt-4"
          >
            Plan the week. Shop once. Cook smart.
          </motion.h1>

          <motion.p
            {...fadeIn}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="mt-4 max-w-xl text-base text-muted-foreground md:text-lg"
          >
            A weekly meal planner for young athletes, roughly ages 8 to 14. Pick what they
            will eat, get an auto grocery list, and track hydration against pediatric
            guidelines. Calorie counts stay hidden from kids, per AAP guidance. No signup
            needed to start.
          </motion.p>

          <motion.div
            {...fadeIn}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-7 flex flex-wrap items-center gap-3"
          >
            <Link
              href="/onboarding"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              Try the planner
              <ArrowRight
                size={16}
                weight="bold"
                aria-hidden
                className="transition group-hover:translate-x-0.5"
              />
            </Link>
            <a
              href="#how"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:border-primary"
            >
              See how it works
            </a>
          </motion.div>

          <motion.p
            {...fadeIn}
            transition={{ duration: 0.55, delay: 0.35 }}
            className="mt-5 text-sm text-muted-foreground"
          >
            Built by a parent of a competitive youth soccer player. Free, no ads, no upsell.
          </motion.p>
        </div>

        <motion.div
          // Same rule. The calculator is the interactive proof this site works, so it must not
          // depend on an animation completing to be visible.
          initial={{ y: 30 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <LiveCalculator />
        </motion.div>
      </div>
    </section>
  );
}
