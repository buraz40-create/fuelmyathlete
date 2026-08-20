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
// That last sentence was already here and the component was doing it anyway, fading content in
// from opacity 0. Now it only moves.
export function Reveal({ children, delay = 0, className, as = "div", y = 24 }: RevealProps) {
  const MotionTag = motion[as];
  const reduced = useReducedMotion();

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  // Movement only, no opacity. This wraps six sections of the landing page, all of which are
  // real content: the FAQ, the credibility panel, the founder note, the sample week.
  //
  // whileInView means the animation waits for an intersection, so anything that stops the
  // observer firing leaves the section permanently invisible rather than merely unanimated.
  // A background tab does exactly that, and so does a partial JS failure. Sliding content up
  // eight pixels reads the same to a visitor and cannot hide anything.
  return (
    <MotionTag
      initial={{ y }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
