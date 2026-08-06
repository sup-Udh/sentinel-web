"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FloatingWidgetDemo } from "@/components/visuals/FloatingWidgetDemo";
import { EASE, EASE_SOFT } from "@/lib/motion";
import { release } from "@/lib/site";

/** Each hero element arrives on its own beat rather than all at once. */
function line(delay: number, reduced: boolean | null) {
  return {
    initial: { opacity: 0, y: reduced ? 0 : 26 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.95, delay, ease: EASE_SOFT },
  };
}

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section
      id="top"
      className="relative mx-auto w-full max-w-6xl px-6 pb-20 pt-36 sm:px-8 sm:pt-44 lg:px-12 lg:pb-28 lg:pt-52"
    >
      <div className="grid items-center gap-16 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-12">
        <div>
          <motion.div
            {...line(0.05, reduced)}
            className="flex items-center gap-3"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-orange" />
            </span>
            <span className="text-[11px] font-medium uppercase tracking-[0.24em] text-ink/45">
              Desktop companion for Claude Code
            </span>
          </motion.div>

          <h1 className="mt-8">
            <motion.span
              {...line(0.15, reduced)}
              className="block text-balance text-[clamp(2rem,5.9vw,4.4rem)] font-bold leading-[1.02] tracking-[-0.045em]"
            >
              Don&rsquo;t interrupt
              <br className="hidden sm:block" /> your coding flow
            </motion.span>

            <motion.span
              {...line(0.3, reduced)}
              className="mt-2 block font-script text-[clamp(2.8rem,9vw,6.6rem)] font-normal leading-[1.12] tracking-tight sm:mt-1"
            >
              use Sentinel.
            </motion.span>
          </h1>

          <motion.p
            {...line(0.45, reduced)}
            className="mt-8 max-w-md text-pretty text-sm leading-relaxed text-ink/55 sm:text-[15px]"
          >
            Sentinel keeps an eye on Claude Code while you keep coding.
          </motion.p>

          <motion.div
            {...line(0.56, reduced)}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Button href="#download" size="lg" className="w-full sm:w-auto">
              <Download
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5"
                strokeWidth={2.2}
              />
              Download for Windows
            </Button>

            <Button
              href="#demo"
              variant="ghost"
              size="lg"
              className="w-full sm:w-auto"
            >
              View Demo
              <ArrowDown
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5"
                strokeWidth={2.2}
              />
            </Button>
          </motion.div>

          <motion.p
            {...line(0.68, reduced)}
            className="mt-6 text-[11px] tracking-tight text-ink/35"
          >
            Version {release.version} · Windows 10 & 11 · x64 · {release.size}
          </motion.p>
        </div>

        <FloatingWidgetDemo className="mx-auto w-full max-w-[21rem] lg:mr-4 lg:w-auto" />
      </div>

      {/* Hairline that closes the hero and opens the page proper. */}
      <motion.div
        className="mt-20 h-px w-full origin-left bg-ink/10 lg:mt-28"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.4, delay: 0.9, ease: EASE }}
      />
    </section>
  );
}
