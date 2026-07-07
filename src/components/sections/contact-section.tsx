import { MessageCircle, ShieldCheck } from "lucide-react";
import { Container } from "@/components/layout/container";
import { siteMeta, trustBullets } from "@/data/home";
import { InquiryForm } from "./inquiry-form";

export function ContactSection() {
  return (
    <section id="contact" className="relative bg-[#eee9df] py-[clamp(70px,10vw,140px)]">
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

        <div className="mx-auto grid max-w-[1060px] gap-[52px] lg:grid-cols-[1.2fr_1fr] lg:items-start">
          <div className="border border-[var(--color-gold-border)] bg-[var(--color-surface)] p-[28px_20px] shadow-[0_24px_70px_rgba(23,32,39,0.08)] sm:p-11">
            <InquiryForm />
          </div>

          <div className="grid gap-4">
            <a
              href={siteMeta.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-[14px] border border-[rgba(37,211,102,0.2)] bg-[rgba(37,211,102,0.08)] px-5 py-[18px] text-[#25D366] transition hover:border-[rgba(37,211,102,0.4)] hover:bg-[rgba(37,211,102,0.13)]"
            >
              <MessageCircle className="size-[26px] text-[#25D366]" />
              <div>
                <div className="text-[0.88rem] font-medium text-[#25D366]">WhatsApp Us Now</div>
                <div className="mt-0.5 text-[0.7rem] text-[rgba(37,211,102,0.7)]">
                  Typically replies within 1 hour
                </div>
              </div>
            </a>

            <div className="border-b border-[var(--color-gold-border)] pb-7">
              <div className="mb-[10px] font-mono text-[0.58rem] uppercase tracking-[0.22em] text-[var(--color-gold)]">
                Office Address
              </div>
              <div className="font-display text-[1rem] leading-[1.5] text-[var(--color-white)]">
                PEC Dubai
                <br />
                Business Bay, Dubai
                <br />
                United Arab Emirates
              </div>
            </div>
            <div className="border-b border-[var(--color-gold-border)] pb-7">
              <div className="mb-[10px] font-mono text-[0.58rem] uppercase tracking-[0.22em] text-[var(--color-gold)]">
                Email
              </div>
              <div className="font-display text-[1rem] leading-[1.5] text-[var(--color-white)]">
                {siteMeta.email}
              </div>
              <div className="mt-[5px] text-[0.75rem] text-[var(--color-fog)]">
                We respond to all inquiries within 24 hours
              </div>
            </div>
            <div className="border-b border-[var(--color-gold-border)] pb-7">
              <div className="mb-[10px] font-mono text-[0.58rem] uppercase tracking-[0.22em] text-[var(--color-gold)]">
                Phone
              </div>
              <div className="font-display text-[1rem] leading-[1.5] text-[var(--color-white)]">
                {siteMeta.phone}
              </div>
              <div className="mt-[5px] text-[0.75rem] text-[var(--color-fog)]">
                Sunday – Thursday, 8:00 AM – 6:00 PM GST
              </div>
            </div>
            <div>
              <div className="mb-[10px] font-mono text-[0.58rem] uppercase tracking-[0.22em] text-[var(--color-gold)]">
                Why consult with us?
              </div>
              <div className="mt-3 flex flex-col gap-[9px]">
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
