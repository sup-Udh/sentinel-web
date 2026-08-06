<div align="center">

# Sentinel

### Don't interrupt your coding flow

**Sentinel keeps an eye on Claude Code while you keep coding.**

An always-on-top desktop companion for live activity, inline approvals,
and notification history.

🚧 **Coming soon** — Sentinel is in final polish and releases shortly for Windows 10 & 11 (x64).

</div>

---

## What it does

Claude Code works in a terminal you're not looking at. It reads files, runs tests,
builds, and then stops — waiting on a permission prompt you never saw. Sentinel is a
small pane that floats above your editor so that never costs you a context switch.

- **Always-on-top widget** — a small pane that floats above your editor and never steals
  focus. Drag it anywhere, snap it to a corner, forget it's there.
- **Live activity** — reading, editing, testing, building. You see the current step and
  the file it's touching, without switching windows to find out.
- **Inline approvals** — when Claude needs permission, approve or deny right in the
  widget. One click, and Claude picks up where it stopped.
- **Notification history** — every prompt, approval, and result is kept in a scrollable
  log, so stepping away for ten minutes costs you nothing.

## How it works

1. **Start Claude Code** — launch it however you already do. Sentinel attaches to the
   session automatically.
2. **Keep coding** — the widget sits on top, quiet, until something is actually worth
   your attention.
3. **Sentinel notifies you** — a permission prompt, a failing test, a finished build,
   surfaced where you're already looking.
4. **Approve instantly** — one click in the widget. No window switch, no hunting for the
   terminal.
5. **Claude continues** — the answer goes straight back to the session and work resumes.

Sentinel doesn't replace Claude Code, and it doesn't patch, wrap, or inject anything. It
reads your local session only — no network required, nothing phoned home. Uninstalling
leaves your setup exactly where it was.

## Release

Sentinel is **not out yet**. The Windows build ships soon; watch
[the repository](https://github.com/sentinel-app/sentinel) to be notified when the first
release lands.

## This repository

`sentinel-web` is the marketing site for Sentinel, built with Next.js 16, React 19,
Tailwind CSS 4, and Framer Motion.

```bash
npm install
npm run dev     # http://localhost:3000
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

Release details (version, date, download URL, file size) live in `lib/site.ts` — update
them there at release time and the whole site follows. The download button links straight
to the tagged GitHub asset, so bumping `VERSION` there is enough as long as the installer
keeps the `Sentinel_<version>_x64-setup.exe` name.
