"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Check,
  CheckCheck,
  Clock,
  FilePen,
  FileSearch,
  FlaskConical,
  ShieldQuestionMark,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { WidgetIcon, WidgetStatus, WidgetTone } from "@/lib/demo-script";
import { EASE } from "@/lib/motion";

const ICONS: Record<WidgetIcon, LucideIcon> = {
  idle: Clock,
  thinking: Sparkles,
  reading: FileSearch,
  editing: FilePen,
  testing: FlaskConical,
  permission: ShieldQuestionMark,
  approved: Check,
  done: CheckCheck,
};

const TONES: Record<WidgetTone, { dot: string; icon: string; wash: string }> = {
  idle: { dot: "bg-ink/30", icon: "text-ink/40", wash: "bg-ink/[0.04]" },
  working: { dot: "bg-amber", icon: "text-amber", wash: "bg-amber/10" },
  attention: { dot: "bg-orange", icon: "text-orange", wash: "bg-orange/12" },
  success: { dot: "bg-orange", icon: "text-orange", wash: "bg-orange/10" },
};

function formatElapsed(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

/** Ticks only while the widget is on screen. Starts client-side, so no SSR drift. */
function useElapsed(running: boolean) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => window.clearInterval(id);
  }, [running]);

  return formatElapsed(seconds);
}

/** Indeterminate sweep — it says "busy", not "37% done", because we don't know. */
function ProgressSweep() {
  const reduced = useReducedMotion();
  if (reduced) return <div className="mt-3 h-[3px] rounded-full bg-amber/25" />;

  return (
    <div className="mt-3 h-[3px] overflow-hidden rounded-full bg-ink/[0.06]">
      <motion.div
        className="h-full w-1/3 rounded-full bg-gradient-to-r from-transparent via-amber to-transparent"
        animate={{ x: ["-110%", "310%"] }}
        transition={{ duration: 1.6, ease: "easeInOut", repeat: Infinity }}
      />
    </div>
  );
}

export type SentinelWidgetProps = {
  status: WidgetStatus;
  /** Drives the elapsed timer and the pulse; false when scrolled away. */
  active?: boolean;
  onApprove?: () => void;
  onDeny?: () => void;
  className?: string;
};

/**
 * The product, drawn in the browser. Both the hero and the live demo render
 * this same component — only the status they feed it differs.
 */
export function SentinelWidget({
  status,
  active = true,
  onApprove,
  onDeny,
  className = "",
}: SentinelWidgetProps) {
  const reduced = useReducedMotion();
  const elapsed = useElapsed(active);
  const tone = TONES[status.tone];
  const Icon = ICONS[status.icon];
  const busy = status.tone === "working";
  const urgent = status.tone === "attention";

  return (
    <motion.div
      layout
      transition={{ layout: { duration: 0.4, ease: EASE } }}
      className={`relative w-[19.5rem] max-w-full overflow-hidden rounded-2xl border border-ink/10 bg-paper/95 backdrop-blur-xl ${className}`}
      style={{
        boxShadow:
          "0 1px 1px rgba(22,19,14,0.04), 0 8px 20px -8px rgba(22,19,14,0.14), 0 28px 56px -28px rgba(22,19,14,0.22)",
      }}
    >
      {/* An orange edge is the only thing that ever raises its voice. */}
      <AnimatePresence>
        {urgent ? (
          <motion.span
            key="urgent-edge"
            className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-orange/45"
            initial={{ opacity: 0 }}
            animate={{ opacity: reduced ? 1 : [0.35, 1, 0.35] }}
            exit={{ opacity: 0 }}
            transition={
              reduced
                ? { duration: 0.2 }
                : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
            }
          />
        ) : null}
      </AnimatePresence>

      {/* Title bar */}
      <div className="flex items-center gap-2.5 border-b border-ink/[0.07] px-3.5 py-2.5">
        <span className="relative flex h-1.5 w-1.5 items-center justify-center">
          {busy || urgent ? (
            <motion.span
              className={`absolute h-1.5 w-1.5 rounded-full ${tone.dot}`}
              animate={reduced ? undefined : { scale: [1, 2.6], opacity: [0.5, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
            />
          ) : null}
          <span className={`relative h-1.5 w-1.5 rounded-full ${tone.dot}`} />
        </span>

        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink/80">
          Sentinel
        </span>

        <span className="ml-auto tabular-nums text-[10px] text-ink/30">
          {elapsed}
        </span>
      </div>

      {/* Body */}
      <div className="px-3.5 py-3.5">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={status.id}
            initial={{ opacity: 0, y: reduced ? 0 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduced ? 0 : -8 }}
            transition={{ duration: 0.24, ease: EASE }}
          >
            <div className="flex items-start gap-3">
              <span
                className={`mt-px flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${tone.wash}`}
              >
                <Icon className={`h-3.5 w-3.5 ${tone.icon}`} strokeWidth={2.2} />
              </span>

              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-semibold leading-tight tracking-tight">
                  {status.title}
                </p>
                <p className="mt-1 truncate text-[11px] leading-tight text-ink/45">
                  {status.detail}
                </p>
              </div>
            </div>

            {status.command ? (
              <div className="mt-3 rounded-lg border border-ink/[0.08] bg-cream/70 px-2.5 py-2">
                <p className="truncate text-[11px] text-ink/70">
                  <span className="mr-1.5 text-orange">$</span>
                  {status.command}
                </p>
              </div>
            ) : null}

            {status.progress ? <ProgressSweep /> : null}

            {status.needsApproval ? (
              <div className="mt-3 flex items-center gap-2">
                <motion.button
                  type="button"
                  onClick={onApprove}
                  whileHover={reduced ? undefined : { y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.18, ease: EASE }}
                  className="flex h-8 flex-1 items-center justify-center gap-1.5 rounded-lg bg-orange text-[11px] font-semibold text-cream transition-colors hover:bg-orange-deep"
                >
                  <Check className="h-3 w-3" strokeWidth={3} />
                  Approve
                </motion.button>

                <motion.button
                  type="button"
                  onClick={onDeny ?? onApprove}
                  whileHover={reduced ? undefined : { y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.18, ease: EASE }}
                  className="flex h-8 items-center justify-center rounded-lg border border-ink/12 px-3.5 text-[11px] font-medium text-ink/55 transition-colors hover:border-ink/25 hover:text-ink"
                >
                  Deny
                </motion.button>
              </div>
            ) : null}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-ink/[0.07] px-3.5 py-2">
        <span className="text-[10px] text-ink/30">claude-code</span>
        <span className="text-[10px] text-ink/30">
          <kbd className="font-mono">⌘⇧A</kbd> to approve
        </span>
      </div>
    </motion.div>
  );
}
