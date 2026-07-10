import { Button } from "@/components/ui/button";
import { SafariVideo } from "@/components/ui/safari-video";

const heroVideoSrc = "/videos/blueprint-folding-building-no-audio.mp4";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-[var(--color-canvas)] max-md:pt-16 lg:min-h-[100svh]"
    >
      <div className="relative z-10 mx-5 mb-6 mt-20 aspect-video overflow-hidden rounded-[8px] border border-[var(--color-divider)] bg-[var(--color-surface)] max-md:mx-0 max-md:mb-0 max-md:mt-0 max-md:w-[100vw] max-md:max-w-none max-md:rounded-none max-md:border-0 max-md:relative max-md:left-1/2 max-md:-translate-x-1/2 sm:mx-8 sm:mt-24 lg:pointer-events-none lg:absolute lg:inset-y-0 lg:right-0 lg:z-0 lg:mx-0 lg:mb-0 lg:mt-0 lg:h-full lg:w-[56vw] lg:rounded-none lg:border-0">
        <SafariVideo
          className="h-full w-full object-cover max-md:object-contain"
          src={heroVideoSrc}
          preload="auto"
          aria-label="Blueprint folding into a 3D architectural building"
        />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),rgba(86,114,135,0.08),rgba(44,51,60,0.02))] lg:bg-[linear-gradient(90deg,var(--color-canvas)_0%,rgba(255,255,255,0.82)_8%,rgba(255,255,255,0.58)_20%,rgba(255,255,255,0.22)_36%,rgba(255,255,255,0.05)_56%,rgba(255,255,255,0.01)_100%)]" />
        <div className="absolute inset-0 hidden bg-[linear-gradient(135deg,rgba(86,114,135,0.08),rgba(255,255,255,0.04)_42%,rgba(86,114,135,0.05))] lg:block" />
        <div className="absolute inset-y-0 left-0 hidden w-[30%] backdrop-blur-[3px] lg:block" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-[1280px] grid-cols-1 items-center px-5 pb-8 sm:px-8 lg:min-h-[100svh] lg:grid-cols-[minmax(0,0.72fr)_minmax(520px,1fr)] lg:gap-20 lg:px-12 lg:pb-20 lg:pt-32 xl:grid-cols-[minmax(0,0.68fr)_minmax(600px,1fr)]">
        <div className="max-w-[600px] pr-0 text-left lg:pr-8">
          <p className="hidden font-mono text-[0.58rem] uppercase tracking-[0.35em] text-[var(--color-steel-blue)] lg:block">
            Luxury Architecture & Engineering
          </p>
          <h1 className="mt-0 max-w-[580px] pt-4 font-display text-[clamp(3rem,5.4vw,5.9rem)] font-light leading-[0.98] text-[var(--color-charcoal)] max-md:pt-4 lg:mt-6 lg:pt-0">
            Design-led spaces, engineered to endure.
          </h1>
          <p className="mt-6 max-w-[520px] text-[clamp(0.98rem,1.35vw,1.06rem)] font-light leading-[1.75] text-[var(--color-cool-gray)]">
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
    </section>
  );
}

