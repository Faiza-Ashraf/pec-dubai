import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { AboutSection } from "@/components/sections/about-section";
import { SafariVideo } from "@/components/ui/safari-video";
import { buildMetadata } from "@/lib/schema";

export const metadata: Metadata = buildMetadata(
  "About | PEC Dubai",
  "Pioneer Engineering Consultants is a Dubai consultancy delivering architectural, structural, supervision, and inspection services since 1998.",
  "/about",
);

export default function AboutPage() {
  return (
    <main className="flex-1">
      <section className="relative isolate flex min-h-[min(72svh,720px)] items-end overflow-hidden border-b border-[var(--color-divider)] bg-[var(--color-deep-charcoal)] py-16 pt-28 sm:py-20 sm:pt-32">
        <SafariVideo
          src="/hero/About page hero.mp4"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
          aria-label="PEC Dubai project showcase"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(29,36,48,0.9)_0%,rgba(29,36,48,0.7)_50%,rgba(29,36,48,0.35)_100%)]" />
        <Container>
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.35em] text-[var(--color-canvas)]">
            About PEC
          </p>
          <h1 className="mt-5 max-w-4xl font-display text-[clamp(3rem,7vw,6.5rem)] font-light leading-[0.94] text-[var(--color-canvas)]">
            Dubai consultancy experience, built since 1998.
          </h1>
          <p className="mt-6 max-w-2xl text-[1rem] leading-8 text-[var(--color-light-gray)]">
            Pioneer Engineering Consultants supports construction projects with practical
            architectural, engineering, supervision, and inspection expertise.
          </p>
        </Container>
      </section>
      <AboutSection />
    </main>
  );
}

