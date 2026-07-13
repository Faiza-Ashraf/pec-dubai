import Link from "next/link";
import Image from "next/image";
import { Instagram, Mail } from "lucide-react";
import { siteMeta } from "@/data/home";
import { Container } from "./container";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--color-divider)] bg-[var(--color-surface-muted)] py-4 md:py-5">
      <Container>
        <div className="grid items-center gap-3 text-center md:grid-cols-[1fr_auto_1fr] md:gap-4">
          <nav className="hidden items-center justify-center gap-5 md:flex md:justify-start">
            <Link
              href="/about"
              className="text-[0.78rem] uppercase tracking-[0.2em] text-[var(--color-cool-gray)] transition hover:text-[var(--color-deep-charcoal)]"
            >
              About
            </Link>
            <Link
              href="/#services"
              className="text-[0.78rem] uppercase tracking-[0.2em] text-[var(--color-cool-gray)] transition hover:text-[var(--color-deep-charcoal)]"
            >
              Services
            </Link>
          </nav>

          <div className="order-1 md:order-none">
            <Link
              href="/"
              className="mx-auto flex w-fit items-center justify-center"
              aria-label="PEC Dubai home"
            >
              <Image
                src="/PEC_CORRECTED_logo_package/PEC_logo_APPROVED_transparent_clean.png"
                alt="PEC Dubai"
                width={1880}
                height={1096}
                className="h-12 w-auto object-contain md:h-14"
              />
            </Link>
            <div className="mt-2 flex items-center justify-center gap-3 md:hidden">
              <a
                href={`mailto:${siteMeta.email}`}
                className="flex size-9 items-center justify-center rounded-full bg-transparent text-[var(--color-deep-charcoal)] transition hover:text-[var(--color-steel-blue)]"
                aria-label="Email PEC Dubai"
              >
                <Mail className="size-4" />
              </a>
              <a
                href={siteMeta.instagram}
                className="flex size-9 items-center justify-center rounded-full bg-transparent text-[var(--color-deep-charcoal)] transition hover:text-[var(--color-steel-blue)]"
                aria-label="PEC Dubai on Instagram"
              >
                <Instagram className="size-4" />
              </a>
            </div>
            <p className="mt-0.5 text-[0.72rem] text-[var(--color-cool-gray)] md:mt-1 md:text-[0.76rem]">
              &copy; 2026 PEC Dubai. All rights reserved.
            </p>
          </div>

          <div className="hidden items-center justify-center gap-3 md:order-none md:flex md:gap-5 md:justify-end">
            <a
              href={`mailto:${siteMeta.email}`}
              className="text-[0.78rem] uppercase tracking-[0.2em] text-[var(--color-cool-gray)] transition hover:text-[var(--color-deep-charcoal)]"
              aria-label="Email PEC Dubai"
            >
              Email
            </a>
            <a
              href={siteMeta.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[0.78rem] uppercase tracking-[0.2em] text-[var(--color-cool-gray)] transition hover:text-[var(--color-deep-charcoal)]"
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


