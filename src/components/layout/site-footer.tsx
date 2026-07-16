import Link from "next/link";
import Image from "next/image";
import { Instagram, Mail } from "lucide-react";
import { siteMeta } from "@/data/home";
import { Container } from "./container";

export function SiteFooter() {
  return (
    <footer className="border-t border-[rgba(247,248,249,0.16)] bg-[rgba(29,36,48,0.94)] pb-2 pt-0 text-[var(--color-canvas)]">
      <Container>
        <div className="grid items-center gap-0 text-center md:grid-cols-[1fr_auto_1fr]">
          <nav className="hidden items-center justify-center gap-5 md:flex md:justify-start">
            <Link
              href="/about"
              className="relative text-[0.78rem] uppercase tracking-[0.2em] text-[var(--color-canvas)] transition hover:text-[var(--color-steel-blue)] after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-[var(--color-steel-blue)] after:transition-all after:duration-300 hover:after:w-full"
            >
              About
            </Link>
            <Link
              href="/#services"
              className="relative text-[0.78rem] uppercase tracking-[0.2em] text-[var(--color-canvas)] transition hover:text-[var(--color-steel-blue)] after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-[var(--color-steel-blue)] after:transition-all after:duration-300 hover:after:w-full"
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
                src="/PEC_Pioneer_Engineering_Consultants_APPROVED_FINAL/white_main_logo_blue_E-removebg-preview.png"
                alt="PEC Dubai"
                width={1880}
                height={1096}
                className="footerlogo h-12 w-auto origin-center object-contain md:h-20 md:translate-y-3 md:scale-[1.3]"
              />
            </Link>
            <div className="mt-0 flex items-center justify-center gap-3 max-md:-mt-5 md:hidden">
              <a
                href={`mailto:${siteMeta.email}`}
                className="flex size-11 items-center justify-center rounded-full bg-transparent text-[var(--color-canvas)] transition hover:bg-[var(--color-steel-blue)]"
                aria-label="Email PEC Dubai"
              >
                <Mail className="size-6" />
              </a>
              <a
                href={siteMeta.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-11 items-center justify-center rounded-full bg-transparent text-[var(--color-canvas)] transition hover:bg-[var(--color-steel-blue)]"
                aria-label="PEC Dubai on Instagram"
              >
                <Instagram className="size-6" />
              </a>
            </div>
          </div>

          <div className="hidden items-center justify-center gap-3 md:order-none md:flex md:gap-5 md:justify-end">
            <a
              href={`mailto:${siteMeta.email}`}
              className="relative text-[0.78rem] uppercase tracking-[0.2em] text-[var(--color-canvas)] transition hover:text-[var(--color-steel-blue)] after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-[var(--color-steel-blue)] after:transition-all after:duration-300 hover:after:w-full"
              aria-label="Email PEC Dubai"
            >
              Email
            </a>
            <a
              href={siteMeta.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="relative text-[0.78rem] uppercase tracking-[0.2em] text-[var(--color-canvas)] transition hover:text-[var(--color-steel-blue)] after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-[var(--color-steel-blue)] after:transition-all after:duration-300 hover:after:w-full"
              aria-label="PEC Dubai on Instagram"
            >
              Instagram
            </a>
          </div>
        </div>
        <p className="mt-0 text-center text-[0.72rem] text-[var(--color-canvas)] md:text-[0.76rem]">
          &copy; 2026 PEC Dubai. All rights reserved.
        </p>      </Container>
    </footer>
  );
}
