/**
 * Single source of truth for everything the marketing copy repeats.
 * Swap these values at release time — nothing else needs to change.
 */
const GITHUB = "https://github.com/sup-Udh/-sentinel-";

export const site = {
  name: "Sentinel",
  product: "Sentinel.",
  description:
    "Sentinel keeps an eye on Claude Code while you keep coding. An always-on-top desktop companion for live activity, inline approvals, and notification history.",
  url: "https://sentinel.app",
  github: GITHUB,
} as const;

const VERSION = "1.1.0";
const INSTALLER = `Sentinel_${VERSION}_x64-setup.exe`;

export const release = {
  version: VERSION,
  date: "August 2026",
  file: INSTALLER,
  size: "2.8 MB",
  /**
   * Points at the tagged asset, not `/releases/latest/download/…`, because the
   * installer name carries the version — the "latest" alias only resolves when
   * the filename is stable across releases.
   */
  download: `${GITHUB}/releases/download/v${VERSION}/${INSTALLER}`,
  releases: `${GITHUB}/releases`,
} as const;

export const nav = [
  { label: "Home", href: "#top", section: "top" },
  { label: "Features", href: "#features", section: "features" },
  { label: "Download", href: "#download", section: "download" },
] as const;
