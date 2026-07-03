import type { ReactNode } from "react";
import { Container } from "@/components/layout/container";

type PageShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
};

export function PageShell({
  eyebrow,
  title,
  description,
  children,
}: PageShellProps) {
  return (
    <main className="flex-1">
      <section className="border-b border-white/8 py-20 sm:py-24">
        <Container>
          <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-[var(--color-gold-light)]">
            {eyebrow}
          </p>
          <h1 className="mt-5 max-w-4xl font-display text-5xl leading-[0.92] text-[var(--color-white)] sm:text-6xl lg:text-7xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--color-fog)]">
            {description}
          </p>
        </Container>
      </section>
      <section className="py-14 sm:py-16">
        <Container>{children}</Container>
      </section>
    </main>
  );
}
