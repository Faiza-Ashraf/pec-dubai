import { Mail, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import { Container } from "@/components/layout/container";
import { siteMeta, trustBullets } from "@/data/home";
import { InquiryForm } from "./inquiry-form";

export function ContactSection() {
  return (
    <section id="contact" className="relative bg-[var(--color-surface-muted)] py-[clamp(70px,10vw,140px)]">
      <div className="absolute left-1/2 top-0 h-[60px] w-px -translate-x-1/2 bg-[linear-gradient(to_bottom,transparent,var(--color-gold))]" />
      <Container>
        <div className="mx-auto mb-[72px] max-w-[680px] text-center">
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.35em] text-[var(--color-gold)]">
            Let&apos;s Build Together
          </span>
          <h2 className="mt-4 font-display text-[clamp(2.2rem,6vw,4.5rem)] font-light leading-[1.05] text-[var(--color-white)]">
            Ready to Begin
            <br />
            Your <span className="text-[var(--color-gold-light)] italic">Project?</span>
          </h2>
          <p className="mt-[18px] text-[0.95rem] text-[var(--color-fog)]">
            Tell us about your vision. Our senior consultants respond within 24 hours
            with a tailored proposal.
          </p>
        </div>

        <div className="mx-auto grid max-w-[1180px] gap-[52px] lg:grid-cols-2 lg:items-start">
          <div className="border border-[var(--color-gold-border)] bg-[var(--color-surface)] p-[28px_20px] shadow-[0_24px_70px_rgba(30,30,30,0.08)] sm:p-11">
            <InquiryForm />
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <div className="mb-[10px] font-mono text-[0.58rem] uppercase tracking-[0.22em] text-[var(--color-gold)]">
                Office Address
              </div>
              <div className="overflow-hidden rounded-[8px] border border-[var(--color-gold-border)] bg-[var(--color-surface-muted)]">
                <iframe
                  src="https://share.google/Vn5LVI3BM586fY2Gh"
                  title="PEC Dubai office location"
                  className="h-[250px] w-full sm:h-[280px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="mt-5 grid grid-cols-3 divide-x divide-[var(--color-gold-border)] border-y border-[var(--color-gold-border)]">
                <a
                  href={`mailto:${siteMeta.email}`}
                  className="group flex min-h-16 flex-col items-center justify-center gap-1.5 text-center text-[var(--color-gold)] transition hover:bg-[var(--color-surface-muted)]"
                  aria-label={`Email ${siteMeta.email}`}
                >
                  <Mail className="size-5 transition group-hover:text-[var(--color-bronze)]" />
                  <span className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-[var(--color-white)]">
                    Email
                  </span>
                </a>
                <a
                  href={`tel:${siteMeta.phone}`}
                  className="group flex min-h-16 flex-col items-center justify-center gap-1.5 text-center text-[var(--color-gold)] transition hover:bg-[var(--color-surface-muted)]"
                  aria-label={`Call ${siteMeta.phone}`}
                >
                  <Phone className="size-5 transition group-hover:text-[var(--color-bronze)]" />
                  <span className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-[var(--color-white)]">
                    Phone
                  </span>
                </a>
                <a
                  href={siteMeta.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex min-h-16 flex-col items-center justify-center gap-1.5 text-center text-[var(--color-gold)] transition hover:bg-[var(--color-surface-muted)]"
                  aria-label="Message PEC Dubai on WhatsApp"
                >
                  <MessageCircle className="size-5 transition group-hover:text-[var(--color-bronze)]" />
                  <span className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-[var(--color-white)]">
                    WhatsApp
                  </span>
                </a>
              </div>

              <p className="mt-4 text-center font-display text-[1rem] text-[var(--color-white)]">
                Monday – Friday, 9:00 AM – 6:00 PM
              </p>
            </div>

            <div className="mt-5 border-t border-[var(--color-gold-border)] pt-5">
              <div className="mb-[10px] font-mono text-[0.58rem] uppercase tracking-[0.22em] text-[var(--color-gold)]">
                Why consult with us?
              </div>
              <div className="mt-3 flex flex-col gap-[7px]">
                {trustBullets.map((item) => (
                  <div key={item} className="flex items-start gap-[10px] text-[0.78rem] text-[var(--color-ink-soft)]">
                    <ShieldCheck className="mt-0.5 size-4 shrink-0 text-[var(--color-gold)]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
