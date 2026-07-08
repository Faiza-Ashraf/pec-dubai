import { Button } from "@/components/ui/button";
import { aboutBadges } from "@/data/home";
import { Container } from "@/components/layout/container";

export function AboutSection() {
  return (
    <section id="about" className="bg-[var(--color-obsidian)] py-[clamp(70px,10vw,140px)]">
      <Container>
        <div className="grid gap-[72px] lg:grid-cols-2 lg:items-center">
          <div className="relative">
            <div className="relative aspect-[3/4] overflow-hidden bg-[var(--color-surface-muted)] shadow-[0_24px_70px_rgba(30,30,30,0.12)]">
              <div className="absolute inset-0 bg-[linear-gradient(135deg,#FFFFFF,#F8F5F0)]" />
              <div className="absolute inset-0 grid place-items-center">
                <svg viewBox="0 0 360 480" className="h-[85%] w-[85%] opacity-55">
                  <rect x="30" y="60" width="300" height="380" fill="none" stroke="rgba(184,151,106,0.2)" strokeWidth="1" />
                  <rect x="60" y="100" width="100" height="110" fill="none" stroke="rgba(184,151,106,0.15)" strokeWidth="0.8" />
                  <rect x="200" y="100" width="100" height="110" fill="none" stroke="rgba(184,151,106,0.15)" strokeWidth="0.8" />
                  <rect x="60" y="250" width="240" height="160" fill="none" stroke="rgba(184,151,106,0.15)" strokeWidth="0.8" />
                  <line x1="30" y1="60" x2="180" y2="20" stroke="rgba(184,151,106,0.25)" strokeWidth="1" />
                  <line x1="330" y1="60" x2="180" y2="20" stroke="rgba(184,151,106,0.25)" strokeWidth="1" />
                  <line x1="180" y1="20" x2="180" y2="60" stroke="rgba(184,151,106,0.35)" strokeWidth="1.5" />
                  <rect x="75" y="115" width="70" height="70" fill="rgba(184,151,106,0.05)" stroke="rgba(184,151,106,0.2)" strokeWidth="0.5" />
                  <rect x="215" y="115" width="70" height="70" fill="rgba(184,151,106,0.05)" stroke="rgba(184,151,106,0.2)" strokeWidth="0.5" />
                  <rect x="145" y="300" width="70" height="90" fill="rgba(184,151,106,0.04)" stroke="rgba(184,151,106,0.18)" strokeWidth="0.5" />
                  <text x="180" y="474" textAnchor="middle" className="fill-[rgba(184,151,106,0.3)] font-mono text-[7px] tracking-[0.25em]">
                    NORTH ELEVATION
                  </text>
                </svg>
              </div>
              <div className="absolute bottom-[-16px] right-[-16px] min-w-[100px] bg-[var(--color-gold)] px-4 py-5 text-center text-white">
                <div className="font-display text-[2rem] leading-none">20+</div>
                <div className="mt-1 text-[0.55rem] font-semibold uppercase tracking-[0.12em]">
                  Years of
                  <br />
                  Excellence
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute bottom-[-20px] left-[20px] right-[-20px] top-[20px] -z-10 border border-[var(--color-gold-border)] max-[860px]:hidden" />
          </div>

          <div>
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.35em] text-[var(--color-gold)]">
              About PEC Dubai
            </span>
            <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.8rem)] font-light leading-[1.1] text-[var(--color-white)]">
              Built on Expertise,
              <br />
              <span className="text-[var(--color-gold-light)] italic">Driven by Vision</span>
            </h2>
            <p className="mt-6 text-[0.92rem] leading-[1.8] text-[var(--color-ink-soft)]">
              PEC Dubai is a multidisciplinary engineering and architecture consultancy
              delivering integrated design, structural engineering, MEP systems, and
              project supervision services across the UAE and GCC.
            </p>
            <p className="mt-6 text-[0.92rem] leading-[1.8] text-[var(--color-ink-soft)]">
              Founded on the principle that exceptional buildings are born from the
              union of creative vision and engineering precision, we serve private
              developers, government authorities, luxury real-estate developers, and
              international corporations.
            </p>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {aboutBadges.map((badge) => (
                <div
                  key={badge}
                  className="border border-[var(--color-gold-border)] bg-[var(--color-surface)] p-[18px] transition hover:border-[var(--color-bronze)] hover:bg-[var(--color-surface)]"
                >
                  <div className="mb-[10px] h-[2px] w-7 bg-[var(--color-gold)]" />
                  <div className="mb-1 text-[0.6rem] uppercase tracking-[0.18em] text-[var(--color-gold)]">
                    {badge === "ISO 9001"
                      ? "Certification"
                      : badge === "7 Emirates"
                        ? "Coverage"
                        : badge === "DDA Pre-Qualified"
                          ? "Approvals"
                          : "Sustainability"}
                  </div>
                  <div className="text-[0.88rem] text-[var(--color-white)]">{badge}</div>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Button href="/#contact">
                Begin Your Project
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
