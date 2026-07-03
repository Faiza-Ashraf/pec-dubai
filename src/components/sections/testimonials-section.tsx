import { Container } from "@/components/layout/container";
import { testimonials, trustStats } from "@/data/home";

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="bg-[#171b20] py-[clamp(70px,10vw,140px)]">
      <Container>
        <div className="text-center">
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.35em] text-[var(--color-gold)]">
            Client Stories
          </span>
          <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.8rem)] font-light leading-[1.1] text-[var(--color-white)]">
            What Our Clients <span className="text-[var(--color-gold-light)] italic">Say</span>
          </h2>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.author}
              className="relative border border-[var(--color-gold-border)] bg-[#0f1215] px-[30px] py-9 transition duration-300 hover:-translate-y-1 hover:border-[#8a6e4a]"
            >
              <div className="mb-[18px] font-display text-[3rem] italic leading-[0.7] text-[#8a6e4a]">
                &ldquo;
              </div>
              <div className="absolute right-7 top-7 text-[0.6rem] tracking-[3px] text-[var(--color-gold)]">
                ★★★★★
              </div>
              <p className="font-display text-[0.97rem] italic leading-[1.75] text-[#c4c8ce]">
                {testimonial.quote}
              </p>
              <div className="mt-6 flex items-center gap-[14px]">
                <div className="grid size-10 place-items-center rounded-full border border-[#8a6e4a] bg-[#1e2328] font-display text-[0.95rem] text-[var(--color-gold)]">
                  {testimonial.initials}
                </div>
                <div>
                  <p className="text-[0.82rem] font-medium text-[var(--color-white)]">{testimonial.author}</p>
                  <p className="mt-0.5 text-[0.68rem] text-[var(--color-fog)]">{testimonial.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-[52px] grid border border-[var(--color-gold-border)] sm:grid-cols-2 lg:grid-cols-4">
          {trustStats.map((stat) => (
            <div
              key={stat.value}
              className="border-b border-r border-[var(--color-gold-border)] px-7 py-7 text-center last:border-r-0 max-lg:last:border-b-0 lg:border-b-0"
            >
              <p className="font-display text-[clamp(1.5rem,3vw,2.2rem)] font-light leading-none text-[var(--color-gold)]">
                {stat.value}
              </p>
              <p className="mt-[7px] text-[0.62rem] uppercase tracking-[0.18em] text-[var(--color-fog)]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
