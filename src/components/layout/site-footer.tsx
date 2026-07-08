import Link from "next/link";
import { Instagram, Mail } from "lucide-react";
import { siteMeta } from "@/data/home";
import { Container } from "./container";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--color-gold-border)] bg-[var(--color-surface-muted)] py-4 md:py-5">
      <Container>
        <div className="grid items-center gap-3 text-center md:grid-cols-[1fr_auto_1fr] md:gap-4">
          <nav className="hidden items-center justify-center gap-5 md:flex md:justify-start">
            <Link
              href="/about"
              className="text-[0.78rem] uppercase tracking-[0.2em] text-[var(--color-fog)] transition hover:text-[var(--color-bronze)]"
            >
              About
            </Link>
            <Link
              href="/#services"
              className="text-[0.78rem] uppercase tracking-[0.2em] text-[var(--color-fog)] transition hover:text-[var(--color-bronze)]"
            >
              Services
            </Link>
          </nav>

          <div className="order-1 md:order-none">
            <Link
              href="/"
              className="font-display text-[1.25rem] tracking-[0.16em] text-[var(--color-white)] md:text-[1.4rem]"
            >
              PEC<span className="text-[var(--color-gold)]">.</span> Dubai
            </Link>
            <div className="mt-2 flex items-center justify-center gap-3 md:hidden">
              <a
                href={`mailto:${siteMeta.email}`}
                className="flex size-9 items-center justify-center rounded-full bg-transparent text-[var(--color-bronze)] transition hover:text-[var(--color-gold)]"
                aria-label="Email PEC Dubai"
              >
                <Mail className="size-4" />
              </a>
              <a
                href="#"
                className="flex size-9 items-center justify-center rounded-full bg-transparent text-[var(--color-bronze)] transition hover:text-[var(--color-gold)]"
                aria-label="PEC Dubai on Instagram"
              >
                <Instagram className="size-4" />
              </a>
            </div>
            <p className="mt-0.5 text-[0.72rem] text-[var(--color-fog)] md:mt-1 md:text-[0.76rem]">
              &copy; 2026 PEC Dubai. All rights reserved.
            </p>
          </div>

          <div className="hidden items-center justify-center gap-3 md:order-none md:flex md:gap-5 md:justify-end">
            <a
              href={`mailto:${siteMeta.email}`}
              className="text-[0.78rem] uppercase tracking-[0.2em] text-[var(--color-fog)] transition hover:text-[var(--color-bronze)]"
              aria-label="Email PEC Dubai"
            >
              Email
            </a>
            <a
              href="#"
              className="text-[0.78rem] uppercase tracking-[0.2em] text-[var(--color-fog)] transition hover:text-[var(--color-bronze)]"
              aria-label="PEC Dubai on Instagram"
            >
              Instagram
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
