"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  demoSteps,
  type TerminalLine,
  type WidgetStatus,
} from "@/lib/demo-script";

export type RenderedLine = TerminalLine & { key: string };

type DemoState = {
  stepId: string;
  lines: RenderedLine[];
  /** The line currently being typed, revealed `chars` characters in. */
  typing: { line: RenderedLine; chars: number } | null;
  widget: WidgetStatus;
  awaiting: boolean;
};

const initialState: DemoState = {
  stepId: demoSteps[0].id,
  lines: [],
  typing: null,
  widget: demoSteps[0].widget,
  awaiting: false,
};

const TYPE_SPEED = 26;
const AUTO_APPROVE_AFTER = 2400;

/**
 * Plays the demo script on a loop while `enabled`, driving the terminal and the
 * widget from one clock so they never disagree.
 *
 * The loop is a plain async function rather than a chain of `setTimeout`s: the
 * script reads top to bottom, and a single cancellation flag unwinds all of it.
 */
export function useDemoSequence(enabled: boolean, reducedMotion = false) {
  const [state, setState] = useState<DemoState>(initialState);
  const approveRef = useRef<(() => void) | null>(null);

  const approve = useCallback(() => {
    approveRef.current?.();
  }, []);

  useEffect(() => {
    if (!enabled) return;

    let cancelled = false;
    let timer: number | null = null;
    let release: (() => void) | null = null;

    // setState that goes quiet the moment the effect is torn down.
    const set = (updater: (previous: DemoState) => DemoState) => {
      if (!cancelled) setState(updater);
    };

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        const done = () => {
          release = null;
          timer = null;
          resolve();
        };
        release = done;
        timer = window.setTimeout(done, ms);
      });

    const waitForApproval = (ms: number) =>
      new Promise<void>((resolve) => {
        let settled = false;
        const done = () => {
          if (settled) return;
          settled = true;
          if (timer) window.clearTimeout(timer);
          approveRef.current = null;
          release = null;
          timer = null;
          resolve();
        };
        approveRef.current = done;
        release = done;
        timer = window.setTimeout(done, ms);
      });

    const typeLine = async (line: RenderedLine) => {
      if (reducedMotion) {
        set((s) => ({ ...s, lines: [...s.lines, line] }));
        await wait(260);
        return;
      }

      set((s) => ({ ...s, typing: { line, chars: 0 } }));

      for (let i = 1; i <= line.text.length; i += 1) {
        if (cancelled) return;
        set((s) => (s.typing ? { ...s, typing: { line, chars: i } } : s));

        // Hesitate at word breaks and punctuation so it reads like a person.
        const char = line.text[i - 1];
        const pause = char === " " ? 34 : ".,:".includes(char) ? 110 : 0;
        await wait(TYPE_SPEED + pause + Math.random() * 24);
      }

      if (cancelled) return;
      await wait(200);
      set((s) => ({ ...s, lines: [...s.lines, line], typing: null }));
    };

    const run = async () => {
      let pass = 0;

      while (!cancelled) {
        for (const step of demoSteps) {
          if (cancelled) return;

          set((s) => ({
            ...s,
            stepId: step.id,
            widget: step.widget,
            awaiting: false,
            ...(step.clearBefore ? { lines: [], typing: null } : null),
          }));

          // Let the widget's transition land before the terminal answers it.
          await wait(240);

          for (const line of step.lines) {
            if (cancelled) return;
            const rendered: RenderedLine = { ...line, key: `${line.id}-${pass}` };

            if (line.typed) {
              await typeLine(rendered);
            } else {
              set((s) => ({ ...s, lines: [...s.lines, rendered] }));
              await wait(240);
            }
          }

          if (step.awaitApproval) {
            if (cancelled) return;
            set((s) => ({ ...s, awaiting: true }));
            await waitForApproval(AUTO_APPROVE_AFTER);
            if (cancelled) return;
            set((s) => ({ ...s, awaiting: false }));
          }

          await wait(step.hold);
        }

        pass += 1;
      }
    };

    void run();

    return () => {
      cancelled = true;
      if (timer) window.clearTimeout(timer);
      approveRef.current = null;
      // Unblock whatever the loop is awaiting so it can unwind and stop.
      release?.();
    };
  }, [enabled, reducedMotion]);

  return { ...state, approve };
}

/**
 * The hero has no terminal to give context, so it just walks the widget through
 * a short loop of its own.
 */
export function useStatusCycle(
  statuses: readonly WidgetStatus[],
  enabled: boolean,
  interval = 2800,
) {
  const [index, setIndex] = useState(0);

  const advance = useCallback(() => {
    setIndex((i) => (i + 1) % statuses.length);
  }, [statuses.length]);

  useEffect(() => {
    if (!enabled || statuses.length < 2) return;
    const id = window.setInterval(advance, interval);
    return () => window.clearInterval(id);
  }, [enabled, statuses.length, interval, advance]);

  return { status: statuses[index], advance };
}
