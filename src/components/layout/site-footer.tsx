import Link from "next/link";
import { siteMeta } from "@/data/home";
import { Container } from "./container";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--color-gold-border)] bg-[var(--color-surface-muted)] py-5">
      <Container>
        <div className="grid items-center gap-4 text-center md:grid-cols-[1fr_auto_1fr]">
          <nav className="flex items-center justify-center gap-5 md:justify-start">
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

          <div>
            <Link
              href="/"
              className="font-display text-[1.4rem] tracking-[0.16em] text-[var(--color-white)]"
            >
              PEC<span className="text-[var(--color-gold)]">.</span> Dubai
            </Link>
            <p className="mt-1 text-[0.76rem] text-[var(--color-fog)]">
              &copy; 2026 PEC Dubai. All rights reserved.
            </p>
          </div>

          <div className="flex items-center justify-center gap-5 md:justify-end">
            <a
              href={`mailto:${siteMeta.email}`}
              className="text-[0.78rem] uppercase tracking-[0.2em] text-[var(--color-fog)] transition hover:text-[var(--color-bronze)]"
            >
              Email
            </a>
            <a
              href="#"
              className="text-[0.78rem] uppercase tracking-[0.2em] text-[var(--color-fog)] transition hover:text-[var(--color-bronze)]"
            >
              Instagram
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
