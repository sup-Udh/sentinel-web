/** Shared easing and viewport settings, so every reveal on the page agrees. */

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** A slower, heavier curve for large elements like the hero and the demo. */
export const EASE_SOFT: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const VIEWPORT = {
  once: true,
  amount: 0.25,
  margin: "0px 0px -80px 0px",
} as const;
