"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Download as DownloadIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { EASE } from "@/lib/motion";
import { release } from "@/lib/site";

const SPECS = [
  { label: "Supported", value: "Windows 10 · Windows 11" },
  { label: "Architecture", value: "x64" },
  { label: "Installer", value: release.size },
  { label: "Released", value: release.date },
];

const INSTALL = [
  "Download the installer",
  "Run it — no admin rights needed",
  "Launch Sentinel",
  "Done. It finds Claude Code on its own.",
];

export function Download() {
  const reduced = useReducedMotion();

  return (
    <Section id="download">
      <SectionHeading
        index="04"
        eyebrow="Download"
        title={
          <>
            Get{" "}
            {/* The script face is 400-only and optically small next to the mono,
                so it needs its own weight, tracking, and a size bump. */}
            <span className="font-script text-[1.15em] font-normal tracking-normal">
              Sentinel
            </span>{" "}
            for Windows.
          </>
        }
        lede="One installer. No account, no telemetry, no background service you didn't ask for."
      />

      <div className="mt-14 grid gap-4 md:mt-16 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] md:gap-5">
        {/* Primary card */}
        <Reveal y={26}>
          <motion.div
            whileHover={reduced ? undefined : { y: -4 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="relative flex h-full flex-col justify-center overflow-hidden rounded-2xl border border-ink/[0.1] bg-paper p-7 shadow-[0_1px_2px_rgba(22,19,14,0.03),0_20px_44px_-28px_rgba(22,19,14,0.25)] sm:p-9"
          >
            <span className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(217,119,87,0.14),transparent_66%)]" />

            <div className="relative flex items-center gap-3">
              <span className="rounded-full border border-orange/25 bg-orange/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-orange">
                Latest
              </span>
              <span className="text-[11px] tracking-tight text-ink/40">
                v{release.version} · {release.date}
              </span>
            </div>

            <h3 className="relative mt-6 text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-tight tracking-[-0.035em]">
              Sentinel for Windows
            </h3>

            <p className="relative mt-3 text-[13px] leading-relaxed text-ink/50">
              {release.file}
            </p>

            <Button
              href={release.download}
              size="lg"
              className="relative mt-8 w-full sm:w-auto sm:self-start"
            >
              <DownloadIcon
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5"
                strokeWidth={2.2}
              />
              Download for Windows
            </Button>

            <a
              href={release.releases}
              target="_blank"
              rel="noreferrer"
              className="relative mt-5 self-start text-[12px] text-ink/40 underline-offset-4 transition-colors hover:text-ink/70 hover:underline"
            >
              Checksums, older versions, and release notes on GitHub
            </a>
          </motion.div>
        </Reveal>

        {/* Specs + install */}
        <div className="grid gap-4 md:gap-5">
          <Reveal delay={0.08} y={26}>
            <div className="rounded-2xl border border-ink/[0.08] bg-paper/70 p-7">
              <h4 className="text-[10px] uppercase tracking-[0.2em] text-ink/35">
                Requirements
              </h4>
              <dl className="mt-5 space-y-3.5">
                {SPECS.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex items-baseline justify-between gap-4 border-b border-ink/[0.06] pb-3.5 last:border-0 last:pb-0"
                  >
                    <dt className="text-[12px] text-ink/40">{spec.label}</dt>
                    <dd className="text-right text-[12px] font-medium tracking-tight">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>

          <Reveal delay={0.14} y={26}>
            <div className="rounded-2xl border border-ink/[0.08] bg-paper/70 p-7">
              <h4 className="text-[10px] uppercase tracking-[0.2em] text-ink/35">
                Installation
              </h4>
              <ol className="mt-5 space-y-3">
                {INSTALL.map((step, index) => (
                  <li key={step} className="flex items-start gap-3">
                    <span className="mt-px text-[10px] tabular-nums text-orange">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[12px] leading-relaxed text-ink/60">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
