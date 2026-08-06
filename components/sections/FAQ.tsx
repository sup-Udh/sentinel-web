"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { EASE } from "@/lib/motion";

const QUESTIONS = [
  {
    q: "Does it replace Claude Code?",
    a: "No. Sentinel reads the session and shows you what's happening. Claude Code stays exactly as it is — same CLI, same behaviour, same output.",
  },
  {
    q: "Does it work offline?",
    a: "Yes. Sentinel talks to your local session only. It never phones home, and it works with no network at all.",
  },
  {
    q: "Does it modify Claude?",
    a: "No. It doesn't patch, wrap, or inject anything. Uninstalling it leaves your setup byte-for-byte where it was.",
  },
  {
    q: "Is it open source?",
    a: "Configurable. The core is open on GitHub; the packaged Windows build ships with defaults you can change or compile out.",
  },
];

function Item({ item, index }: { item: (typeof QUESTIONS)[number]; index: number }) {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const panelId = `faq-panel-${index}`;

  return (
    <Reveal delay={index * 0.06} y={16}>
      <div className="border-b border-ink/[0.09]">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls={panelId}
          className="group flex w-full items-center justify-between gap-6 py-6 text-left"
        >
          <span className="text-[15px] font-medium tracking-tight transition-colors duration-200 group-hover:text-ink/70">
            {item.q}
          </span>

          <motion.span
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-ink/10 text-ink/40 transition-colors duration-200 group-hover:border-ink/25 group-hover:text-ink"
            animate={{ rotate: open ? 135 : 0 }}
            transition={{ duration: 0.32, ease: EASE }}
          >
            <Plus className="h-3 w-3" strokeWidth={2.5} />
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {open ? (
            <motion.div
              key="answer"
              id={panelId}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                duration: reduced ? 0.15 : 0.38,
                ease: EASE,
                opacity: { duration: 0.22 },
              }}
              className="overflow-hidden"
            >
              <p className="max-w-xl pb-7 text-pretty text-[13px] leading-relaxed text-ink/50">
                {item.a}
              </p>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </Reveal>
  );
}

export function FAQ() {
  return (
    <Section>
      <SectionHeading index="05" eyebrow="FAQ" title="Short answers." />

      <div className="mt-12 max-w-3xl border-t border-ink/[0.09] md:mt-14">
        {QUESTIONS.map((item, index) => (
          <Item key={item.q} item={item} index={index} />
        ))}
      </div>
    </Section>
  );
}
