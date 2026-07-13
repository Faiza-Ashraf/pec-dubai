import { Instagram, Mail, MessageCircle, Phone } from "lucide-react";
import { Container } from "@/components/layout/container";
import { siteMeta } from "@/data/home";
import { InquiryForm } from "./inquiry-form";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative bg-[var(--color-surface-muted)] py-[clamp(70px,10vw,140px)] max-md:py-12"
    >
      <div className="absolute left-1/2 top-0 h-[60px] w-px -translate-x-1/2 bg-[linear-gradient(to_bottom,transparent,var(--color-steel-blue))]" />
      <Container>
        <div className="mx-auto mb-[72px] max-w-[680px] text-center">
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.35em] text-[var(--color-steel-blue)]">
            Let&apos;s Build Together
          </span>
          <h2 className="mt-4 font-display text-[clamp(2.2rem,6vw,4.5rem)] font-light leading-[1.05] text-[var(--color-charcoal)]">
            Ready to Begin
            <br />
            Your <span className="text-[var(--color-light-gray)] italic">Project?</span>
          </h2>
          <p className="mt-[18px] text-[0.95rem] text-[var(--color-cool-gray)]">
            Tell us about your vision. Our senior consultants respond within 24 hours
            with a tailored proposal.
          </p>
        </div>

        <div className="mx-auto grid max-w-[1180px] gap-[52px] lg:grid-cols-2 lg:items-start">
          <div className="border border-[var(--color-divider)] bg-[var(--color-surface)] p-[28px_20px] shadow-[0_24px_70px_rgba(44,51,60,0.08)] sm:p-11">
            <InquiryForm />
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <div className="mb-[10px] font-mono text-[0.58rem] uppercase tracking-[0.22em] text-[var(--color-steel-blue)]">
                Office Address
              </div>
              <div className="overflow-hidden rounded-[8px] border border-[var(--color-divider)] bg-[var(--color-surface-muted)]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2969.085010567674!2d55.314743374474155!3d25.27051687766382!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5cb583641b27%3A0x1f0118f368d13c37!2sPioneer%20Engineering%20Consultants!5e1!3m2!1sen!2sae!4v1783609477523!5m2!1sen!2sae"
                  title="PEC Dubai office location map"
                  className="h-[250px] w-full sm:h-[280px]"
                  loading="lazy"
                  allowFullScreen={false}
                  referrerPolicy="strict-origin-when-cross-origin"
                  style={{ border: 0 }}
                />
              </div>

              <div className="mt-5 grid grid-cols-2 divide-x divide-y divide-[var(--color-divider)] border-y border-[var(--color-divider)] sm:grid-cols-4 sm:divide-y-0">
                <a
                  href={`mailto:${siteMeta.email}`}
                  className="group flex min-h-16 flex-col items-center justify-center gap-1.5 text-center text-[var(--color-steel-blue)] transition hover:bg-[var(--color-surface-muted)]"
                  aria-label={`Email ${siteMeta.email}`}
                >
                  <Mail className="size-5 transition group-hover:text-[var(--color-deep-charcoal)]" />
                  <span className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-[var(--color-charcoal)]">
                    Email
                  </span>
                </a>
                <a
                  href={`tel:${siteMeta.phone.replace(/\s/g, "")}`}
                  className="group flex min-h-16 flex-col items-center justify-center gap-1.5 text-center text-[var(--color-steel-blue)] transition hover:bg-[var(--color-surface-muted)]"
                  aria-label={`Call ${siteMeta.phone}`}
                >
                  <Phone className="size-5 transition group-hover:text-[var(--color-deep-charcoal)]" />
                  <span className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-[var(--color-charcoal)]">
                    Phone
                  </span>
                </a>
                <a
                  href={siteMeta.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex min-h-16 flex-col items-center justify-center gap-1.5 text-center text-[var(--color-steel-blue)] transition hover:bg-[var(--color-surface-muted)]"
                  aria-label="Message PEC Dubai on WhatsApp"
                >
                  <MessageCircle className="size-5 transition group-hover:text-[var(--color-deep-charcoal)]" />
                  <span className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-[var(--color-charcoal)]">
                    WhatsApp
                  </span>
                </a>
                <a
                  href={siteMeta.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex min-h-16 flex-col items-center justify-center gap-1.5 text-center text-[var(--color-steel-blue)] transition hover:bg-[var(--color-surface-muted)]"
                  aria-label="PEC Dubai on Instagram"
                >
                  <Instagram className="size-5 transition group-hover:text-[var(--color-deep-charcoal)]" />
                  <span className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-[var(--color-charcoal)]">
                    Instagram
                  </span>
                </a>
              </div>

              <p className="mt-5 text-center font-display text-[1rem] leading-7 text-[var(--color-charcoal)]">
                Telephone: {siteMeta.phone}
                <br />
                Mobile / WhatsApp: {siteMeta.mobile}
                <br />
                Email: {siteMeta.email}
              </p>

              <p className="mt-4 text-center font-display text-[1rem] text-[var(--color-charcoal)]">
                Monday – Friday <br /> 9:00 AM – 6:00 PM
              </p>
            </div>

          </div>
        </div>
      </Container>
    </section>
  );
}


