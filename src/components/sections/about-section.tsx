import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";

export function AboutSection() {
  return (
    <section id="about" className="bg-[var(--color-canvas)] py-[clamp(70px,10vw,140px)]">
      <Container>
        <div className="mx-auto max-w-3xl">
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.35em] text-[var(--color-deep-charcoal)]">
            About PEC Dubai
          </span>
          <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.8rem)] font-light leading-[1.1] text-[var(--color-charcoal)]">
            Practical Design,
            <br />
            <span className="text-[var(--color-cool-gray)] italic">Measured Delivery</span>
          </h2>
          <p className="mt-6 text-[0.92rem] leading-[1.8] text-[var(--color-deep-charcoal)]">
            Pioneer Engineering Consultants is a Dubai-based consultancy providing
            architectural and engineering services since 1998. We support construction
            projects through planning, design, supervision, inspection, and contract
            administration.
          </p>
          <p className="mt-6 text-[0.92rem] leading-[1.8] text-[var(--color-deep-charcoal)]">
            Our team works across new construction, redevelopment, and additions,
            with experience in residential schemes, industrial projects, and mosques
            under Dubai Municipality, Dubai Development Authority, Dubai South, and
            Trakhees jurisdictions.
          </p>
          <p className="mt-6 text-[0.92rem] leading-[1.8] text-[var(--color-deep-charcoal)]">
            With experienced professionals from varied construction backgrounds, PEC
            helps clients move projects forward with better control over time, cost,
            performance, and approval requirements.
          </p>
          <div className="mt-8">
            <Button href="/#contact">Begin Your Project</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}


