import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { AboutSection } from "@/components/sections/about-section";
import { WhyPecSection } from "@/components/sections/why-pec-section";
import { buildMetadata } from "@/lib/schema";

export const metadata: Metadata = buildMetadata(
  "About | PEC Dubai",
  "PEC Dubai brings architecture, structural, approvals, and supervision into one integrated consultancy experience.",
  "/about",
);

export default function AboutPage() {
  return (
    <main className="flex-1">
      <section className="border-b border-[var(--color-divider)] bg-[var(--color-canvas)] pb-16 pt-28 sm:pb-20 sm:pt-32">
        <Container>
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.35em] text-[var(--color-steel-blue)]">
            About PEC
          </p>
          <h1 className="mt-5 max-w-4xl font-display text-[clamp(3rem,7vw,6.5rem)] font-light leading-[0.94] text-[var(--color-charcoal)]">
            Design ambition, technical discipline, and calm delivery.
          </h1>
          <p className="mt-6 max-w-2xl text-[1rem] leading-8 text-[var(--color-cool-gray)]">
            Explore the PEC Dubai approach, credentials, and reasons clients choose our
            integrated architecture and engineering consultancy.
          </p>
        </Container>
      </section>
      <AboutSection />
      <WhyPecSection />
    </main>
  );
}

