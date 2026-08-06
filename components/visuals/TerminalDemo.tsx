"use client";

import { memo, useEffect, useRef } from "react";
import type { LineTone } from "@/lib/demo-script";
import type { RenderedLine } from "@/lib/use-demo-sequence";

const TONE_CLASS: Record<LineTone, string> = {
  prompt: "text-ink/70",
  user: "text-ink",
  tool: "text-ink/80",
  result: "text-ink/40",
  success: "text-orange",
  warn: "text-amber",
  muted: "text-ink/35",
};

/** The little glyph in the gutter that tells you what kind of line this is. */
function Gutter({ tone }: { tone: LineTone }) {
  if (tone === "prompt") return <span className="text-orange">$</span>;
  if (tone === "user") return <span className="text-orange">&gt;</span>;
  if (tone === "tool") return <span className="text-ink/45">●</span>;
  if (tone === "result" || tone === "success" || tone === "warn")
    return <span className="text-ink/25">⎿</span>;
  return <span className="text-transparent">·</span>;
}

function Line({ line, chars }: { line: RenderedLine; chars?: number }) {
  const text = chars === undefined ? line.text : line.text.slice(0, chars);

  return (
    <div className="flex gap-2.5 leading-relaxed">
      <span className="w-3 shrink-0 select-none text-right text-[11px]">
        <Gutter tone={line.tone} />
      </span>
      <span className={`min-w-0 break-words ${TONE_CLASS[line.tone]}`}>
        {text}
        {chars !== undefined ? <Caret /> : null}
      </span>
    </div>
  );
}

function Caret() {
  return (
    <span className="animate-blink ml-px inline-block h-[1.05em] w-[0.5em] translate-y-[0.16em] bg-ink/70" />
  );
}

/** Settled lines never change, so they never re-render while typing runs. */
const SettledLines = memo(function SettledLines({
  lines,
}: {
  lines: RenderedLine[];
}) {
  return (
    <>
      {lines.map((line) => (
        <Line key={line.key} line={line} />
      ))}
    </>
  );
});

export type TerminalDemoProps = {
  lines: RenderedLine[];
  typing: { line: RenderedLine; chars: number } | null;
  className?: string;
};

/**
 * Claude Code, recreated. Not a screenshot — every character is typed live so
 * the pacing matches the widget beside it.
 */
export function TerminalDemo({
  lines,
  typing,
  className = "",
}: TerminalDemoProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Keep the newest line in view without ever showing a scrollbar.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines, typing]);

  return (
    <div
      className={`flex h-full flex-col overflow-hidden rounded-xl border border-ink/[0.09] bg-paper ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-ink/[0.07] px-3.5 py-2.5">
        <span className="h-2 w-2 rounded-full bg-ink/12" />
        <span className="h-2 w-2 rounded-full bg-ink/12" />
        <span className="h-2 w-2 rounded-full bg-ink/12" />
        <span className="ml-2 text-[10px] tracking-[0.14em] text-ink/35">
          claude — ~/projects/sentinel
        </span>
      </div>

      <div
        ref={scrollRef}
        className="no-scrollbar flex-1 overflow-y-auto px-4 py-4 text-[12px] sm:text-[13px]"
      >
        <div className="flex flex-col gap-1.5">
          <SettledLines lines={lines} />
          {typing ? <Line line={typing.line} chars={typing.chars} /> : null}
          {!typing ? (
            <div className="flex gap-2.5">
              <span className="w-3 shrink-0 text-right text-[11px] text-orange">
                &gt;
              </span>
              <Caret />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
