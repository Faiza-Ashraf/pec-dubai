import { Button } from "@/components/ui/button";
import { heroStats } from "@/data/home";
import { HeroBlueprintCanvas } from "@/components/three/hero-blueprint-canvas";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden"
    >
      <HeroBlueprintCanvas />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(246,243,238,0.58)_0%,rgba(246,243,238,0.24)_42%,rgba(246,243,238,0.7)_78%,rgba(246,243,238,1)_100%)]" />
      <div className="relative z-10 mx-auto flex w-full max-w-[900px] flex-col items-center px-5 pt-28 text-center sm:px-8 lg:px-10">
        <p className="font-mono text-[0.6rem] uppercase tracking-[0.35em] text-[var(--color-gold)]">
          Dubai&apos;s Premier Engineering Consultancy
        </p>
        <h1 className="mt-6 font-display text-[clamp(2.95rem,8vw,7rem)] font-light leading-[1.03] tracking-[-0.01em] text-[var(--color-white)]">
          From Concept
          <br />
          to{" "}
          <span className="text-[var(--color-gold-light)] italic">Masterpiece.</span>
        </h1>
        <p className="mt-5 max-w-[560px] text-[clamp(0.92rem,2vw,1.05rem)] font-light leading-[1.65] text-[var(--color-ink-soft)]">
          We transform architectural visions into engineered realities —
          delivering structural, MEP, and architectural excellence across the UAE
          since 2002.
        </p>

        <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
          <Button href="#contact" className="min-w-[280px]">
            Start Your Project
          </Button>
          <Button href="#projects" variant="secondary" className="min-w-[236px]">
            View Our Work
          </Button>
        </div>

        <div className="mt-8 inline-flex rounded-full border border-[var(--color-gold-border)] bg-[var(--color-surface)] px-5 py-3 text-sm text-[var(--color-gold)] shadow-[0_10px_30px_rgba(30,30,30,0.08)] backdrop-blur-md">
          <span>Free consultation and response within 24 hours</span>
        </div>

        <div className="absolute bottom-[150px] left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 opacity-90 md:flex">
          <div className="h-14 w-px origin-top animate-[scrollLine_2.2s_ease-in-out_infinite] bg-gradient-to-b from-[var(--color-gold)] to-transparent" />
          <div className="font-mono text-[0.55rem] tracking-[0.3em] text-[var(--color-fog)]">
            SCROLL
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 hidden border-t border-[var(--color-gold-border)] bg-[rgba(255,255,255,0.78)] shadow-[0_-18px_45px_rgba(30,30,30,0.06)] backdrop-blur-[14px] sm:flex">
        {heroStats.map((stat, index) => (
          <div
            key={stat.label}
            className="flex-1 px-6 py-5 text-center"
            style={{
              borderRight:
                index === heroStats.length - 1 ? "none" : "1px solid #E8E1D8",
            }}
          >
            <div className="font-display text-[clamp(1.6rem,3.5vw,2.6rem)] font-light leading-none text-[var(--color-gold)]">
              {stat.value}
            </div>
            <div className="mt-1 text-[0.6rem] uppercase tracking-[0.18em] text-[var(--color-fog)]">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
