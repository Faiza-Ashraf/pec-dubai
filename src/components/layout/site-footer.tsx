import Link from "next/link";
import { footerLinks, siteMeta } from "@/data/home";
import { Container } from "./container";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--color-gold-border)] bg-[var(--color-obsidian)] py-14">
      <Container className="grid gap-10 lg:grid-cols-[2fr_1fr_1fr_1fr]">
        <div>
          <p className="font-display text-[1.35rem] tracking-[0.15em] text-[var(--color-white)]">
            PEC<span className="text-[var(--color-gold)]">.</span>Dubai
          </p>
          <p className="mt-4 max-w-[280px] text-[0.78rem] leading-7 text-[var(--color-fog)]">
            Engineering excellence and architectural vision for the UAE&apos;s most
            ambitious projects. From concept to masterpiece.
          </p>
        </div>

        <div>
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-[var(--color-gold)]">
            Services
          </p>
          <div className="mt-4 flex flex-col gap-2.5">
            <Link href="#services" className="text-[0.8rem] text-[var(--color-fog)] transition hover:text-white">
              Architectural Design
            </Link>
            <Link href="#services" className="text-[0.8rem] text-[var(--color-fog)] transition hover:text-white">
              Structural Engineering
            </Link>
            <Link href="#services" className="text-[0.8rem] text-[var(--color-fog)] transition hover:text-white">
              MEP Engineering
            </Link>
            <Link href="#services" className="text-[0.8rem] text-[var(--color-fog)] transition hover:text-white">
              Project Management
            </Link>
            <Link href="#services" className="text-[0.8rem] text-[var(--color-fog)] transition hover:text-white">
              Green Building
            </Link>
            <Link href="#services" className="text-[0.8rem] text-[var(--color-fog)] transition hover:text-white">
              Interior & Fit-Out
            </Link>
          </div>
        </div>

        <div>
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-[var(--color-gold)]">
            Company
          </p>
          <div className="mt-4 flex flex-col gap-2.5">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[0.8rem] text-[var(--color-fog)] transition hover:text-white"
              >
                {link.label === "About" ? "About PEC" : link.label}
              </Link>
            ))}
            <Link href="#testimonials" className="text-[0.8rem] text-[var(--color-fog)] transition hover:text-white">
              Client Stories
            </Link>
          </div>
        </div>

        <div>
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-[var(--color-gold)]">
            Get In Touch
          </p>
          <div className="mt-4 flex flex-col gap-2.5">
            <a href={`tel:${siteMeta.phone}`} className="text-[0.8rem] text-[var(--color-fog)] transition hover:text-white">
              {siteMeta.phone}
            </a>
            <a href={`mailto:${siteMeta.email}`} className="text-[0.8rem] text-[var(--color-fog)] transition hover:text-white">
              {siteMeta.email}
            </a>
            <a href={siteMeta.whatsapp} target="_blank" rel="noreferrer" className="text-[0.8rem] text-[var(--color-fog)] transition hover:text-white">
              WhatsApp
            </a>
            <a href="#" className="text-[0.8rem] text-[var(--color-fog)] transition hover:text-white">
              LinkedIn
            </a>
            <a href="#" className="text-[0.8rem] text-[var(--color-fog)] transition hover:text-white">
              Instagram
            </a>
          </div>
        </div>
      </Container>

      <Container className="mt-10 flex flex-col gap-3 border-t border-[var(--color-gold-border)] pt-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
        <p className="text-[0.68rem] text-[var(--color-fog)]">
          © 2025 PEC Dubai. All rights reserved. | ISO 9001 Certified Engineering Consultancy
        </p>
        <div className="flex items-center justify-center gap-5 sm:justify-end">
          <a href="#" className="text-[0.68rem] text-[var(--color-fog)] transition hover:text-[var(--color-gold)]">
            Privacy Policy
          </a>
          <a href="#" className="text-[0.68rem] text-[var(--color-fog)] transition hover:text-[var(--color-gold)]">
            Terms of Service
          </a>
        </div>
      </Container>
    </footer>
  );
}
