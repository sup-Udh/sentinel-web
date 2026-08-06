"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  MousePointerClick,
  PanelTop,
  RotateCcwClock,
  Waypoints,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { EASE } from "@/lib/motion";

type Feature = {
  icon: LucideIcon;
  title: string;
  body: string;
};

const FEATURES: Feature[] = [
  {
    icon: PanelTop,
    title: "Always-on-top widget",
    body: "A small pane that floats above your editor and never steals focus. Drag it anywhere, snap it to a corner, forget it's there.",
  },
  {
    icon: Waypoints,
    title: "Live activity",
    body: "Reading, editing, testing, building — you see the current step and the file it's touching, without switching windows to find out.",
  },
  {
    icon: MousePointerClick,
    title: "Inline approvals",
    body: "When Claude needs permission, approve or deny right in the widget. One click, or ⌘⇧A. Claude picks up where it stopped.",
  },
  {
    icon: RotateCcwClock,
    title: "Notification history",
    body: "Every prompt, approval, and result is kept in a scrollable log — so stepping away for ten minutes costs you nothing.",
  },
];

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const reduced = useReducedMotion();
  const Icon = feature.icon;

  return (
    <Reveal delay={index * 0.08} y={26}>
      <motion.article
        whileHover={reduced ? undefined : { y: -6 }}
        transition={{ duration: 0.35, ease: EASE }}
        className="group relative h-full overflow-hidden rounded-2xl border border-ink/[0.08] bg-paper/80 p-7 shadow-[0_1px_2px_rgba(22,19,14,0.03)] transition-shadow duration-300 hover:border-ink/[0.14] hover:shadow-[0_2px_4px_rgba(22,19,14,0.04),0_20px_44px_-24px_rgba(22,19,14,0.28)] sm:p-8"
      >
        {/* Warmth that only shows up on hover. */}
        <span className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(217,119,87,0.16),transparent_65%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <span className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-ink/[0.08] bg-cream">
          <Icon
            className="h-4 w-4 text-orange transition-transform duration-500 ease-out group-hover:-rotate-6 group-hover:scale-110"
            strokeWidth={2}
          />
        </span>

        <h3 className="relative mt-6 text-[15px] font-semibold tracking-tight">
          {feature.title}
        </h3>

        <p className="relative mt-3 text-pretty text-[13px] leading-relaxed text-ink/50">
          {feature.body}
        </p>

        <span className="relative mt-6 block text-[10px] tracking-[0.2em] text-ink/20">
          {String(index + 1).padStart(2, "0")}
        </span>
      </motion.article>
    </Reveal>
  );
}

export function Features() {
  return (
    <Section id="features">
      <SectionHeading
        index="02"
        eyebrow="Features"
        title="Four things. Nothing else."
        lede="Sentinel does one job well and stays out of the way for everything else."
      />

      <div className="mt-14 grid gap-4 sm:grid-cols-2 md:mt-16 md:gap-5">
        {FEATURES.map((feature, index) => (
          <FeatureCard key={feature.title} feature={feature} index={index} />
        ))}
      </div>
    </Section>
  );
}
