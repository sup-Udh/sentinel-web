/**
 * The script behind the live demo.
 *
 * One sequence drives both halves of the mock desktop: the terminal transcript
 * on the left and the Sentinel widget on the right always describe the same
 * moment, because they are read off the same step.
 */

export type WidgetTone = "idle" | "working" | "attention" | "success";

/** Icon keys resolved to Lucide components in the widget, so data stays plain. */
export type WidgetIcon =
  | "idle"
  | "thinking"
  | "reading"
  | "editing"
  | "testing"
  | "permission"
  | "approved"
  | "done";

export type WidgetStatus = {
  id: string;
  tone: WidgetTone;
  icon: WidgetIcon;
  /** Primary line — the thing a glance should land on. */
  title: string;
  /** Secondary line — the specifics. */
  detail: string;
  /** Shown as a monospace chip when a command needs a decision. */
  command?: string;
  progress?: boolean;
  needsApproval?: boolean;
};

export type LineTone =
  | "prompt"
  | "user"
  | "tool"
  | "result"
  | "success"
  | "warn"
  | "muted";

export type TerminalLine = {
  id: string;
  text: string;
  tone: LineTone;
  /** Typed character by character rather than appearing at once. */
  typed?: boolean;
};

export type DemoStep = {
  id: string;
  widget: WidgetStatus;
  lines: TerminalLine[];
  /** Milliseconds to sit on this step once its lines have landed. */
  hold: number;
  /** Wipe the transcript before playing — used to loop cleanly. */
  clearBefore?: boolean;
  /** Pause for a decision (auto-approves so the loop never stalls). */
  awaitApproval?: boolean;
};

export const demoSteps: DemoStep[] = [
  {
    id: "boot",
    clearBefore: true,
    widget: {
      id: "connected",
      tone: "idle",
      icon: "idle",
      title: "Connected",
      detail: "Watching this session",
    },
    lines: [
      { id: "boot-1", text: "claude", tone: "prompt", typed: true },
      { id: "boot-2", text: "Claude Code · ~/projects/sentinel", tone: "muted" },
    ],
    hold: 700,
  },
  {
    id: "ask",
    widget: {
      id: "thinking",
      tone: "working",
      icon: "thinking",
      title: "Thinking",
      detail: "Planning the change",
      progress: true,
    },
    lines: [
      {
        id: "ask-1",
        text: "add rate limiting to the auth routes",
        tone: "user",
        typed: true,
      },
    ],
    hold: 900,
  },
  {
    id: "read",
    widget: {
      id: "reading",
      tone: "working",
      icon: "reading",
      title: "Reading auth.ts",
      detail: "src/server/auth.ts · 214 lines",
      progress: true,
    },
    lines: [
      { id: "read-1", text: "Read(src/server/auth.ts)", tone: "tool" },
      { id: "read-2", text: "214 lines read", tone: "result" },
    ],
    hold: 1400,
  },
  {
    id: "edit",
    widget: {
      id: "editing",
      tone: "working",
      icon: "editing",
      title: "Editing auth.ts",
      detail: "+38 −4 across 2 files",
      progress: true,
    },
    lines: [
      { id: "edit-1", text: "Edit(src/server/auth.ts)", tone: "tool" },
      { id: "edit-2", text: "+38 −4", tone: "result" },
    ],
    hold: 1200,
  },
  {
    id: "test",
    widget: {
      id: "testing",
      tone: "working",
      icon: "testing",
      title: "Running tests",
      detail: "npm test · 12 of 12 passed",
      progress: true,
    },
    lines: [
      { id: "test-1", text: "Bash(npm test)", tone: "tool" },
      { id: "test-2", text: "12 passed in 3.1s", tone: "success" },
    ],
    hold: 1500,
  },
  {
    id: "permission",
    awaitApproval: true,
    widget: {
      id: "permission",
      tone: "attention",
      icon: "permission",
      title: "Permission required",
      detail: "Claude wants to run a build",
      command: "npm run build",
      needsApproval: true,
    },
    lines: [
      { id: "perm-1", text: "Bash(npm run build)", tone: "tool" },
      { id: "perm-2", text: "waiting for permission", tone: "warn" },
    ],
    hold: 400,
  },
  {
    id: "approved",
    widget: {
      id: "approved",
      tone: "success",
      icon: "approved",
      title: "Approved",
      detail: "Sent back to Claude Code",
    },
    lines: [{ id: "appr-1", text: "approved from Sentinel", tone: "success" }],
    hold: 1200,
  },
  {
    id: "finished",
    widget: {
      id: "finished",
      tone: "success",
      icon: "done",
      title: "Finished",
      detail: "3 files changed · 12 tests passed",
    },
    lines: [
      { id: "fin-1", text: "build succeeded in 4.2s", tone: "success" },
      { id: "fin-2", text: "Done · 3 files changed", tone: "muted" },
    ],
    hold: 1800,
  },
  {
    id: "waiting",
    widget: {
      id: "waiting",
      tone: "idle",
      icon: "idle",
      title: "Waiting for your next prompt",
      detail: "Idle · nothing needs you",
    },
    lines: [],
    hold: 2600,
  },
];

/**
 * A shorter loop for the hero, where there is no terminal to explain context.
 * Same widget vocabulary, so the hero teaches the demo below it.
 */
export const heroStatuses: WidgetStatus[] = [
  {
    id: "hero-read",
    tone: "working",
    icon: "reading",
    title: "Reading auth.ts",
    detail: "src/server/auth.ts",
    progress: true,
  },
  {
    id: "hero-test",
    tone: "working",
    icon: "testing",
    title: "Running tests",
    detail: "npm test · 12 passed",
    progress: true,
  },
  {
    id: "hero-perm",
    tone: "attention",
    icon: "permission",
    title: "Permission required",
    detail: "Claude wants to run a build",
    command: "npm run build",
    needsApproval: true,
  },
  {
    id: "hero-appr",
    tone: "success",
    icon: "approved",
    title: "Approved",
    detail: "Sent back to Claude Code",
  },
  {
    id: "hero-idle",
    tone: "idle",
    icon: "idle",
    title: "Waiting for your next prompt",
    detail: "Idle · nothing needs you",
  },
];
