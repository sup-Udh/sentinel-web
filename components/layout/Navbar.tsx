"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { GithubMark } from "@/components/ui/GithubMark";
import { EASE } from "@/lib/motion";
import { nav, site } from "@/lib/site";

/** Watches which section owns the viewport, so the pill can follow along. */
function useActiveSection() {
  const [active, setActive] = useState<string>(nav[0].section);

  useEffect(() => {
    const sections = nav
      .map((item) => document.getElementById(item.section))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // The section closest to the top third of the screen wins.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return active;
}

export function Navbar() {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const active = useActiveSection();
  const [hidden, setHidden] = useState(false);
  const [lifted, setLifted] = useState(false);
  const previous = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const delta = latest - previous.current;
    previous.current = latest;

    setLifted(latest > 24);

    // Ignore rubber-banding and hairline jitter; only commit to real intent.
    if (Math.abs(delta) < 6) return;
    setHidden(delta > 0 && latest > 160);
  });

  return (
    <motion.header
      className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:pt-5"
      animate={{ y: hidden && !reduced ? -96 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.4, ease: EASE }}
    >
      <nav
        aria-label="Primary"
        className={`pointer-events-auto flex items-center gap-0.5 rounded-full border bg-white/85 p-1 backdrop-blur-xl transition-all duration-300 sm:gap-1 sm:p-1.5 ${
          lifted
            ? "border-ink/10 shadow-[0_1px_2px_rgba(22,19,14,0.05),0_12px_28px_-16px_rgba(22,19,14,0.3)]"
            : "border-ink/[0.06] shadow-[0_1px_2px_rgba(22,19,14,0.03)]"
        }`}
      >
        {nav.map((item) => {
          const isActive = active === item.section;

          return (
            <a
              key={item.section}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`relative rounded-full px-3 py-1.5 text-[11px] font-medium tracking-tight transition-colors duration-200 sm:px-4 sm:text-[12px] ${
                isActive ? "text-ink" : "text-ink/45 hover:text-ink/75"
              }`}
            >
              {/* Deliberately not wrapped in AnimatePresence — the pill should
                  slide between links, which is what a bare shared layoutId
                  does. An exit animation would leave two pills mounted at once. */}
              {isActive ? (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-ink/[0.055]"
                  transition={{ duration: 0.35, ease: EASE }}
                />
              ) : null}
              {item.label}
            </a>
          );
        })}

        <span className="mx-1 h-4 w-px bg-ink/10" />

        <a
          href={site.github}
          target="_blank"
          rel="noreferrer noopener"
          className="group flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium tracking-tight text-ink/45 transition-colors duration-200 hover:text-ink sm:px-4 sm:text-[12px]"
        >
          <GithubMark className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-rotate-12" />
          GitHub
        </a>
      </nav>
    </motion.header>
  );
}
