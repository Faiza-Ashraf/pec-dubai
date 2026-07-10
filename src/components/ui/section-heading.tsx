import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  description: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="max-w-3xl">
      <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--color-light-gray)]">
        {eyebrow}
      </p>
      <h2 className="mt-4 max-w-4xl font-display text-4xl leading-[0.92] text-[var(--color-charcoal)] sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--color-cool-gray)]">
        {description}
      </p>
    </div>
  );
}

