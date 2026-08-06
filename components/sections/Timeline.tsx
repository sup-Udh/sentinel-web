"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";

const STEPS = [
  {
    title: "Start Claude Code",
    body: "Launch it however you already do. Sentinel attaches to the session automatically.",
  },
  {
    title: "Keep coding",
    body: "The widget sits on top, quiet, until something is actually worth your attention.",
  },
  {
    title: "Sentinel notifies you",
    body: "A permission prompt, a failing test, a finished build — surfaced where you're already looking.",
  },
  {
    title: "Approve instantly",
    body: "One click in the widget. No window switch, no hunting for the terminal.",
  },
  {
    title: "Claude continues",
    body: "The answer goes straight back to the session and work resumes. You never left your file.",
  },
];

export function Timeline() {
  const trackRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 72%", "end 62%"],
  });

  // Spring the raw progress so the line draws with weight instead of snapping.
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });
  const scaleY = useTransform(progress, [0, 1], [0, 1]);

  return (
    <Section>
      <SectionHeading
        index="03"
        eyebrow="How it works"
        title="Five steps, and you're never one of them."
      />

      <ol ref={trackRef} className="relative mt-16 md:mt-20">
        {/* The rail, and the ink that fills it as you scroll. */}
        <span className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px bg-ink/10 md:left-[11px]" />
        <motion.span
          className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px origin-top bg-orange md:left-[11px]"
          style={{ scaleY }}
        />

        {STEPS.map((step, index) => (
          <li key={step.title} className="relative pb-12 pl-10 last:pb-0 md:pl-16">
            <Reveal delay={0.05} y={18}>
              <span className="absolute left-0 top-1.5 flex h-[15px] w-[15px] items-center justify-center rounded-full border border-ink/12 bg-cream md:h-[23px] md:w-[23px]">
                <span className="h-[5px] w-[5px] rounded-full bg-orange md:h-[7px] md:w-[7px]" />
              </span>

              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="text-[11px] tracking-[0.2em] text-ink/25">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-[17px] font-semibold tracking-tight sm:text-lg">
                  {step.title}
                </h3>
              </div>

              <p className="mt-3 max-w-md text-pretty text-[13px] leading-relaxed text-ink/50">
                {step.body}
              </p>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
