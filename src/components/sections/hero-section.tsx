import { HeroCoverflowCarousel } from "./hero-coverflow-carousel";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-[var(--color-obsidian)] px-5 pb-16 pt-28 text-center sm:px-8 lg:px-10"
    >
      <div className="mx-auto flex w-full max-w-[1120px] flex-col items-center">
        <p className="font-mono text-[0.6rem] uppercase tracking-[0.35em] text-[var(--color-gold)]">
          Luxury Architecture & Engineering
        </p>
        <h1 className="mt-6 max-w-[920px] font-display text-[clamp(3.1rem,8vw,7.4rem)] font-light leading-[0.94] text-[var(--color-white)]">
          Design-led spaces,
          <br />
          engineered to endure.
        </h1>
        <p className="mt-6 max-w-[620px] text-[clamp(0.95rem,2vw,1.08rem)] font-light leading-[1.7] text-[var(--color-fog)]">
          Premium villas, residences, and development concepts shaped with architectural
          restraint, technical precision, and a calm luxury sensibility.
        </p>
      </div>

      <HeroCoverflowCarousel />
    </section>
  );
}
