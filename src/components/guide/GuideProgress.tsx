"use client";

import { motion, useScroll, useSpring, useReducedMotion } from "motion/react";

// A guide is a long read on a phone. The bar is the one honest signal of "how much is left",
// and it costs no layout space. Spring-smoothed so it glides rather than jitters with the
// scroll wheel.
export function GuideProgress() {
  const { scrollYProgress } = useScroll();
  const reduced = useReducedMotion();
  const width = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      data-print-hide
      style={{ scaleX: reduced ? scrollYProgress : width }}
      className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-primary"
    />
  );
}
