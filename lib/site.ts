/**
 * Single source of truth for everything the marketing copy repeats.
 * Swap these values at release time — nothing else needs to change.
 */
const GITHUB = "https://github.com/sentinel-app/sentinel";

export const site = {
  name: "Sentinel",
  product: "Sentinel.",
  description:
    "Sentinel keeps an eye on Claude Code while you keep coding. An always-on-top desktop companion for live activity, inline approvals, and notification history.",
  url: "https://sentinel.app",
  github: GITHUB,
} as const;

export const release = {
  version: "1.4.2",
  date: "August 2026",
  file: "Sentinel-Setup-1.4.2-x64.exe",
  size: "24.8 MB",
  download: `${GITHUB}/releases/latest/download/Sentinel-Setup-1.4.2-x64.exe`,
} as const;

export const nav = [
  { label: "Home", href: "#top", section: "top" },
  { label: "Features", href: "#features", section: "features" },
  { label: "Download", href: "#download", section: "download" },
] as const;
