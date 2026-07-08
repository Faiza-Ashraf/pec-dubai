import { Button } from "@/components/ui/button";

const heroVideoSrc = "/videos/blueprint-folding-building.mp4";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-[var(--color-obsidian)] lg:min-h-[100svh]"
    >
      <div className="relative z-10 mx-auto grid w-full max-w-[1280px] grid-cols-1 items-center px-5 pb-8 pt-28 sm:px-8 lg:min-h-[100svh] lg:grid-cols-[minmax(0,0.72fr)_minmax(520px,1fr)] lg:gap-20 lg:px-12 lg:pb-20 lg:pt-32 xl:grid-cols-[minmax(0,0.68fr)_minmax(600px,1fr)]">
        <div className="max-w-[600px] pr-0 text-left lg:pr-8">
          <p className="font-mono text-[0.58rem] uppercase tracking-[0.35em] text-[var(--color-gold)]">
            Luxury Architecture & Engineering
          </p>
          <h1 className="mt-6 max-w-[580px] font-display text-[clamp(3rem,5.4vw,5.9rem)] font-light leading-[0.98] text-[var(--color-white)]">
            Design-led spaces, engineered to endure.
          </h1>
          <p className="mt-6 max-w-[520px] text-[clamp(0.98rem,1.35vw,1.06rem)] font-light leading-[1.75] text-[var(--color-fog)]">
            Premium villas, residences, and development concepts shaped with architectural
            restraint, technical precision, and a calm luxury sensibility.
          </p>
          <div className="mt-9 flex flex-wrap gap-3 sm:gap-4">
            <Button href="#contact" className="w-full sm:w-auto">
              Book Consultation
            </Button>
            <Button href="#services" variant="secondary" className="w-full sm:w-auto">
              View Services
            </Button>
          </div>
        </div>

        <div className="hidden lg:block" aria-hidden="true" />
      </div>

      <div className="relative z-10 mx-5 mb-12 min-h-[340px] overflow-hidden rounded-[8px] border border-[var(--color-gold-border)] bg-[var(--color-surface)] sm:mx-8 sm:min-h-[420px] lg:pointer-events-none lg:absolute lg:inset-y-0 lg:right-0 lg:z-0 lg:mx-0 lg:mb-0 lg:h-full lg:w-[56vw] lg:rounded-none lg:border-0">
        <video
          className="h-full w-full object-cover"
          src={heroVideoSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="Blueprint folding into a 3D architectural building"
        />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(246,243,238,0.28),rgba(184,151,106,0.16),rgba(30,30,30,0.05))] lg:bg-[linear-gradient(90deg,var(--color-obsidian)_0%,rgba(246,243,238,0.98)_10%,rgba(246,243,238,0.82)_24%,rgba(246,243,238,0.46)_42%,rgba(246,243,238,0.16)_64%,rgba(246,243,238,0.06)_100%)]" />
        <div className="absolute inset-0 hidden bg-[linear-gradient(135deg,rgba(184,151,106,0.18),rgba(255,255,255,0.1)_42%,rgba(184,151,106,0.1))] lg:block" />
        <div className="absolute inset-y-0 left-0 hidden w-[48%] backdrop-blur-[2px] lg:block" />
      </div>
    </section>
  );
}
