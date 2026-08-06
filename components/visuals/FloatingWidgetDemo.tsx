"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { heroStatuses } from "@/lib/demo-script";
import { useStatusCycle } from "@/lib/use-demo-sequence";
import { SentinelWidget } from "@/components/visuals/SentinelWidget";
import { EASE_SOFT } from "@/lib/motion";

/**
 * The hero's widget: floating free of any window, breathing, and cycling
 * through the states you'd actually see during a session.
 */
export function FloatingWidgetDemo({ className = "" }: { className?: string }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const { status, advance } = useStatusCycle(heroStatuses, inView);

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* The shadow it casts on the paper — grounds it without a frame. */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-8 bottom-2 h-10 rounded-[50%] bg-ink/10 blur-2xl"
        animate={
          reduced ? undefined : { scaleX: [1, 0.92, 1], opacity: [0.5, 0.35, 0.5] }
        }
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 28, rotate: -1.2, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, rotate: -1.2, scale: 1 }}
        transition={{ duration: 1.1, delay: 0.5, ease: EASE_SOFT }}
      >
        {/* Breathing lives on its own layer so it can't fight the entrance. */}
        <motion.div
          animate={reduced ? undefined : { y: [0, -9, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          <SentinelWidget
            status={status}
            active={inView}
            onApprove={advance}
            onDeny={advance}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
