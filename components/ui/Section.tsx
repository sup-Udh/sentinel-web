import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
};

/** Consistent page gutter and vertical rhythm. Whitespace is the layout. */
export function Section({ id, children, className = "" }: SectionProps) {
  return (
    <section
      id={id}
      className={`relative mx-auto w-full max-w-6xl scroll-mt-28 px-6 py-24 sm:px-8 md:py-32 lg:px-12 ${className}`}
    >
      {children}
    </section>
  );
}

type SectionHeadingProps = {
  /** Editorial index, e.g. "02". */
  index: string;
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  className?: string;
};

export function SectionHeading({
  index,
  eyebrow,
  title,
  lede,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`max-w-3xl ${className}`}>
      <Reveal y={12} duration={0.6}>
        <div className="flex items-center gap-4">
          <span className="text-[11px] font-bold tracking-[0.2em] text-orange">
            {index}
          </span>
          <span className="text-[11px] font-medium uppercase tracking-[0.24em] text-ink/45">
            {eyebrow}
          </span>
          <span className="h-px flex-1 bg-ink/10" />
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <h2 className="mt-7 text-balance text-[clamp(1.75rem,3.6vw,2.75rem)] font-bold leading-[1.08] tracking-[-0.035em]">
          {title}
        </h2>
      </Reveal>

      {lede ? (
        <Reveal delay={0.14}>
          <p className="mt-5 max-w-xl text-pretty text-sm leading-relaxed text-ink/55">
            {lede}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
