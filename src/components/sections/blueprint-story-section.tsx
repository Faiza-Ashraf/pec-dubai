"use client";

import { Container } from "@/components/layout/container";

export function BlueprintStorySection() {
  return (
    <section
      id="blueprint"
      className="flex h-[100svh] items-center overflow-hidden bg-[var(--color-surface-muted)] py-8 sm:py-10 lg:py-12"
    >
      <Container className="flex h-full flex-col justify-center">
        <div className="mx-auto max-w-[760px] text-center">
          <span className="font-mono text-[0.56rem] uppercase tracking-[0.35em] text-[var(--color-gold)]">
            Our Story in Lines
          </span>
          <h2 className="mt-3 font-display text-[clamp(2rem,4.4vw,3.85rem)] font-light leading-[1.05] text-[var(--color-white)]">
            Vision Drawn in{" "}
            <span className="text-[var(--color-gold-light)] italic">Blueprint,</span>
            <br />
            Built in Reality
          </h2>
          <p className="mx-auto mt-4 max-w-[620px] text-[0.9rem] leading-[1.65] text-[var(--color-fog)]">
            Every landmark begins as a single line. Watch how PEC transforms ideas into
            engineered masterpieces.
          </p>
        </div>

        <div className="mx-auto mt-7 aspect-video max-h-[min(54svh,520px)] w-full max-w-[920px] overflow-hidden rounded-[8px] border border-[var(--color-gold-border)] bg-[var(--color-surface)] shadow-[0_22px_70px_rgba(30,30,30,0.08)]">
          <video
            className="h-full w-full object-cover"
            src="/videos/blueprint-folding-building.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-label="Blueprint folding into a 3D building"
          />
        </div>
      </Container>
    </section>
  );
}
