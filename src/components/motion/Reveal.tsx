"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "article" | "li";
  y?: number;
}

// Shared by the landing page and the guides so movement reads as one language across the
// site rather than two different houses.
//
// Honours prefers-reduced-motion: vestibular disorders are common, the setting is how people
// say so, and content that only appears after an animation is content some people never see.
export function Reveal({ children, delay = 0, className, as = "div", y = 24 }: RevealProps) {
  const MotionTag = motion[as];
  const reduced = useReducedMotion();

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
