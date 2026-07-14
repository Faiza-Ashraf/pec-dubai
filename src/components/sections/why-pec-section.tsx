import { Container } from "@/components/layout/container";
import { credentials, whyPec } from "@/data/home";

export function WhyPecSection() {
  return (
    <section id="why" className="bg-[var(--color-canvas)] py-[clamp(70px,10vw,140px)]">
      <Container>
        <div className="grid gap-[72px] lg:grid-cols-2 lg:items-start">
          <div>
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.35em] text-[var(--color-deep-charcoal)]">
              Why Choose Us
            </span>
            <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.8rem)] font-light leading-[1.1] text-[var(--color-charcoal)]">
              Why the UAE&apos;s Best
              <br />
              Choose <span className="text-[var(--color-cool-gray)] italic">PEC</span>
            </h2>
            <div className="mt-9 flex flex-col">
              {whyPec.map((item, index) => (
                <div
                  key={item.title}
                  className="grid grid-cols-[44px_1fr] gap-[18px] border-b border-[var(--color-divider)] py-6 transition hover:pl-1.5"
                >
                  <span className="pt-[3px] font-mono text-[0.6rem] text-[var(--color-deep-charcoal)]">
                    0{index + 1}
                  </span>
                  <div>
                    <div className="mb-[7px] font-display text-[1.05rem] font-normal text-[var(--color-charcoal)]">
                      {item.title}
                    </div>
                    <p className="text-[0.8rem] leading-[1.65] text-[var(--color-cool-gray)]">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-[14px] sm:grid-cols-2">
            {credentials.map((credential) => (
              <div
                key={credential.id}
                className="border border-[var(--color-divider)] bg-[var(--color-surface)] p-[22px_16px] text-center transition hover:border-[var(--color-deep-charcoal)] hover:bg-[var(--color-surface)]"
              >
                <p className="font-mono text-[0.6rem] tracking-[0.15em] text-[var(--color-deep-charcoal)]">
                  {credential.id}
                </p>
                <p className="mt-2 text-[0.78rem] leading-[1.35] text-[var(--color-deep-charcoal)]">
                  {credential.name}
                </p>
                <p className="mt-1 text-[0.62rem] text-[var(--color-cool-gray)]">{credential.status}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}


