"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ComponentProps, ReactNode } from "react";
import { EASE } from "@/lib/motion";

type Variant = "primary" | "ghost";
type Size = "md" | "lg";

const base =
  "group relative inline-flex select-none items-center justify-center gap-2.5 rounded-full font-medium tracking-tight transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-orange text-cream shadow-[0_1px_2px_rgba(22,19,14,0.14),0_10px_24px_-12px_rgba(217,119,87,0.7)] hover:bg-orange-deep",
  ghost:
    "border border-ink/12 bg-paper/70 text-ink hover:border-ink/25 hover:bg-paper",
};

const sizes: Record<Size, string> = {
  md: "h-10 px-5 text-[13px]",
  lg: "h-13 px-7 text-sm sm:h-14 sm:px-8",
};

type ButtonProps = ComponentProps<typeof motion.a> & {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
};

/**
 * Buttons lift a hair on hover and settle on press. That's the whole trick —
 * anything more reads as a toy.
 */
export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const reduced = useReducedMotion();

  return (
    <motion.a
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      whileHover={reduced ? undefined : { y: -2 }}
      whileTap={reduced ? undefined : { y: 0, scale: 0.985 }}
      transition={{ duration: 0.25, ease: EASE }}
      {...props}
    >
      {children}
    </motion.a>
  );
}
