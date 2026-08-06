"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { SentinelWidget } from "@/components/visuals/SentinelWidget";
import { TerminalDemo } from "@/components/visuals/TerminalDemo";
import { demoSteps } from "@/lib/demo-script";
import { EASE, EASE_SOFT } from "@/lib/motion";
import { useDemoSequence } from "@/lib/use-demo-sequence";

/** Tiny read-out under the demo so the loop's position is always legible. */
function StepTicker({ stepId }: { stepId: string }) {
  return (
    <div className="mt-6 flex flex-wrap items-center justify-center gap-1.5">
      {demoSteps.map((step) => {
        const isCurrent = step.id === stepId;
        return (
          <motion.span
            key={step.id}
            className="h-1 rounded-full bg-ink"
            animate={{
              width: isCurrent ? 26 : 6,
              opacity: isCurrent ? 0.55 : 0.13,
            }}
            transition={{ duration: 0.4, ease: EASE }}
          />
        );
      })}
    </div>
  );
}

export function LiveDemo() {
  const reduced = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  // The sequence only runs while you can actually see it.
  const inView = useInView(stageRef, { amount: 0.25 });
  const { lines, typing, widget, awaiting, stepId, approve } = useDemoSequence(
    inView,
    reduced ?? false,
  );

  return (
    <Section id="demo" className="pt-8 md:pt-12">
      <SectionHeading
        index="01"
        eyebrow="Live demo"
        title="Watch it work."
        lede="Claude Code runs on the left. Sentinel sits on top of everything else on the right — telling you what's happening, and asking only when it needs you."
      />

      <Reveal delay={0.1} y={32} duration={0.9}>
        <div
          ref={stageRef}
          className="relative mt-14 overflow-hidden rounded-2xl border border-ink/[0.09] bg-cream-deep/40 p-3 sm:p-5 md:mt-16 md:p-8"
          style={{
            boxShadow:
              "0 1px 2px rgba(22,19,14,0.04), 0 24px 60px -32px rgba(22,19,14,0.3)",
          }}
        >
          {/* Desktop chrome — just enough to read as "a screen". */}
          <div className="mb-3 flex items-center justify-between px-1 sm:mb-5">
            <span className="text-[10px] tracking-[0.18em] text-ink/30">
              YOUR DESKTOP
            </span>
            <span className="hidden text-[10px] tracking-[0.18em] text-ink/30 lg:block">
              SENTINEL · ALWAYS ON TOP
            </span>
          </div>

          {/* The widget column is pinned to the widget's real width so it never
              gets squeezed; the terminal absorbs whatever is left. */}
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_19.5rem] lg:items-start lg:gap-6">
            <div className="h-[19rem] sm:h-[21rem] md:h-[23rem]">
              <TerminalDemo lines={lines} typing={typing} />
            </div>

            <div className="relative flex justify-center lg:justify-end lg:pt-6">
              {/* Slides in from the right the way the real window does. */}
              <motion.div
                initial={{ opacity: 0, x: reduced ? 0 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.9, delay: 0.35, ease: EASE_SOFT }}
              >
                <motion.div
                  animate={
                    awaiting && !reduced ? { scale: [1, 1.015, 1] } : { scale: 1 }
                  }
                  transition={{
                    duration: 1.6,
                    repeat: awaiting ? Infinity : 0,
                    ease: "easeInOut",
                  }}
                >
                  <SentinelWidget
                    status={widget}
                    active={inView}
                    onApprove={approve}
                    onDeny={approve}
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>

          <StepTicker stepId={stepId} />
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <p className="mt-6 text-center text-[11px] text-ink/35">
          The demo loops on its own — or hit{" "}
          <span className="text-orange">Approve</span> yourself when it asks.
        </p>
      </Reveal>
    </Section>
  );
}
