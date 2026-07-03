import { Container } from "@/components/layout/container";
import { services } from "@/data/home";

const icons = [
  (
    <svg key="service-icon-1" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="6" y="8" width="36" height="32" rx="1" />
      <path d="M6 16h36M16 8v8M32 8v8M14 24h20M14 30h12" />
    </svg>
  ),
  (
    <svg key="service-icon-2" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M24 6L6 18v24h36V18L24 6z" />
      <path d="M16 42V28h6v14M26 42V28h6v14" />
      <line x1="6" y1="18" x2="42" y2="18" />
    </svg>
  ),
  (
    <svg key="service-icon-3" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="24" cy="24" r="8" />
      <path d="M24 6v6M24 36v6M6 24h6M36 24h6M10.1 10.1l4.2 4.2M33.7 33.7l4.2 4.2M33.7 10.1l-4.2 4.2M10.1 33.7l4.2 4.2" />
    </svg>
  ),
  (
    <svg key="service-icon-4" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="6" y="6" width="36" height="36" rx="2" />
      <path d="M6 16h36M16 6v10M32 6v10M12 24l6 6 12-12" />
    </svg>
  ),
  (
    <svg key="service-icon-5" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M24 42C24 42 8 34 8 20a16 16 0 0132 0c0 14-16 22-16 22z" />
      <path d="M24 28v-8M20 24l4-4 4 4" />
    </svg>
  ),
  (
    <svg key="service-icon-6" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="8" y="12" width="32" height="28" rx="1" />
      <path d="M14 12V8h20v4M8 32h8v8H8zM32 32h8v8h-8z" />
      <line x1="8" y1="24" x2="40" y2="24" />
    </svg>
  ),
];

export function ServicesSection() {
  return (
    <section id="services" className="relative overflow-hidden bg-[#171b20] py-[clamp(70px,10vw,140px)]">
      <div className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 font-display text-[clamp(70px,14vw,160px)] font-light tracking-[0.1em] text-[rgba(184,151,106,0.025)] lg:block">
        SERVICES
      </div>
      <Container>
        <div className="mb-[70px] text-center">
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.35em] text-[var(--color-gold)]">
            What We Do
          </span>
          <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.8rem)] font-light leading-[1.1] text-[var(--color-white)]">
            Integrated Engineering
            <br />
            <span className="text-[var(--color-gold-light)] italic">Excellence</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[480px] text-[0.92rem] leading-[1.7] text-[var(--color-fog)]">
            End-to-end consultancy covering every discipline your project demands.
          </p>
        </div>

        <div className="grid gap-px border border-[var(--color-gold-border)] bg-[var(--color-gold-border)] md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => {
            const icon = icons[index];

            return (
              <article
                key={service.title}
                className="group relative overflow-hidden bg-[#171b20] px-9 py-11 transition duration-500 hover:bg-[rgba(184,151,106,0.02)]"
              >
                <div className="absolute inset-x-0 top-0 h-0 bg-[linear-gradient(to_bottom,rgba(184,151,106,0.06),transparent)] transition-all duration-500 ease-out group-hover:h-full" />
                <div className="relative">
                  <span className="font-mono text-[0.6rem] tracking-[0.2em] text-[#8a6e4a]">
                    0{index + 1}
                  </span>
                  <div className="mt-7 h-12 w-12 text-[var(--color-gold)] [&_svg]:h-full [&_svg]:w-full">
                    {icon}
                  </div>
                  <h3 className="mt-6 font-display text-[1.35rem] font-normal leading-[1.2] text-[var(--color-white)]">
                    {service.title}
                  </h3>
                  <p className="mt-4 text-[0.82rem] leading-[1.7] text-[var(--color-fog)]">
                    {service.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-[7px]">
                    {service.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="border border-[var(--color-gold-border)] px-[11px] py-[5px] text-[0.58rem] uppercase tracking-[0.12em] text-[var(--color-fog)] transition group-hover:border-[#8a6e4a] group-hover:text-[var(--color-gold-light)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
