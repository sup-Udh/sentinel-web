"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE, VIEWPORT } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Seconds. Stagger siblings by hand rather than through a parent variant. */
  delay?: number;
  /** Travel distance in px. Set to 0 for a pure fade. */
  y?: number;
  duration?: number;
};

/**
 * The page's one scroll-reveal primitive. Everything fades up the same way,
 * which is what makes the scroll feel composed rather than busy.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 20,
  duration = 0.75,
}: RevealProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: reduced ? 0.2 : duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
