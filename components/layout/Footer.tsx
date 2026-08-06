import { GithubMark } from "@/components/ui/GithubMark";
import { release, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative mx-auto w-full max-w-6xl px-6 pb-14 pt-8 sm:px-8 lg:px-12">
      <div className="h-px w-full bg-ink/10" />

      <div className="flex flex-col gap-8 pt-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[15px] font-bold tracking-[-0.02em]">{site.name}</p>
          <p className="mt-2 text-[12px] text-ink/40">Built for Claude Code.</p>
        </div>

        <nav
          aria-label="Footer"
          className="flex items-center gap-7 text-[12px] text-ink/45"
        >
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer noopener"
            className="group flex items-center gap-1.5 transition-colors hover:text-ink"
          >
            <GithubMark className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-rotate-12" />
            GitHub
          </a>

          <a href="#download" className="transition-colors hover:text-ink">
            Download
          </a>

          <span className="tabular-nums text-ink/30">v{release.version}</span>
        </nav>
      </div>
    </footer>
  );
}
