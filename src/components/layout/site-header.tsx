"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { navItems } from "@/data/home";
import { cn } from "@/lib/cn";
import { Container } from "./container";

const mobileNavItems = navItems;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);

    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // PREMIUM MOBILE MENU SCROLL LOCK
  useEffect(() => {
    if (open) {
      const scrollY = window.scrollY;

      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
    } else {
      const scrollY = document.body.style.top;

      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";

      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[100] border-b border-[rgba(247,248,249,0.16)] bg-[rgba(29,36,48,0.94)] backdrop-blur-[14px] transition-all duration-300 min-[1051px]:z-50",
        scrolled &&
          "min-[1051px]:border-[rgba(255,255,255,0.2)] min-[1051px]:shadow-[0_12px_35px_rgba(29,36,48,0.08)]",
      )}
    >
      <Container
        className={cn(
          "flex h-16 items-center justify-between gap-4 transition-all duration-300 max-md:px-4",
          scrolled && "min-[1051px]:h-14",
        )}
      >
        {/* LOGO */}
        <Link
          href="/"
          className="relative z-[120] flex h-16 min-w-0 max-w-[min(49.6vw,218px)] items-center gap-3 min-[1051px]:h-14 min-[1051px]:w-[clamp(205px,23.04vw,333px)] min-[1051px]:max-w-none min-[1051px]:shrink-0 min-[1051px]:gap-4"
          aria-label="PEC Dubai home"
        >
          <span className="relative block w-[32%] shrink-0">
            <Image
              src="/PEC_Pioneer_Engineering_Consultants_APPROVED_FINAL/White PEC with blue E.png"
              alt="PEC"
              width={1536}
              height={1024}
              sizes="(min-width: 1051px) clamp(102px, 11.5vw, 166px), min(25vw, 109px)"
              priority
              className={cn(
                "h-auto w-full object-contain object-[left_center] transition-all duration-300",
                scrolled && "min-[1051px]:w-full",
              )}
            />
          </span>
          <span className="relative block min-w-0 flex-1">
            <Image
              src="/PEC_Pioneer_Engineering_Consultants_APPROVED_FINAL/side text only white.png"
              alt="PEC Dubai"
              width={1672}
              height={941}
              sizes="(min-width: 1051px) clamp(202px, 22.5vw, 338px), min(50vw, 219px)"
              priority
              className={cn(
                "h-auto w-full object-contain object-[left_center] transition-all duration-300",
                scrolled && "min-[1051px]:w-full",
              )}
            />
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden flex-1 items-center justify-end gap-12 min-[1051px]:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              scroll
              prefetch={item.href === "/about"}
              className="relative text-[0.8rem] uppercase tracking-[0.22em] text-[var(--color-canvas)] transition hover:text-[var(--color-steel-blue)] after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-[var(--color-steel-blue)] after:transition-all after:duration-300 hover:after:w-full"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          className="relative z-[120] -mr-2 flex min-h-11 min-w-11 flex-col items-center justify-center gap-1.5 bg-transparent p-2 min-[1051px]:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          <span
            className={cn(
              "block h-px w-[22px] bg-[#fff] transition duration-300",
              open && "translate-y-[7px] rotate-45",
            )}
          />

          <span
            className={cn(
              "block h-px w-[22px] bg-[#fff] transition duration-300",
              open && "opacity-0",
            )}
          />

          <span
            className={cn(
              "block h-px w-[22px] bg-[#fff] transition duration-300",
              open && "-translate-y-[7px] -rotate-45",
            )}
          />
        </button>
      </Container>

      {/* MOBILE MENU */}
      <div
        className={cn(
          "fixed inset-x-0 bottom-0 top-16 z-[105] bg-[rgba(29,36,48,0.62)] backdrop-blur-[6px] transition-opacity duration-500 min-[1051px]:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden="true"
      />

      <div
        className={cn(
          "fixed right-0 top-16 z-[110] flex h-[calc(100dvh-4rem)] min-h-[calc(100dvh-4rem)] w-[40vw] flex-col border-l border-t border-[var(--color-divider)] bg-[var(--color-surface)] px-4 py-8 shadow-[-18px_0_55px_rgba(18,24,31,0.18)] backdrop-blur-[18px] transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] min-[1051px]:hidden",
          open
            ? "translate-x-0 opacity-100"
            : "pointer-events-none translate-x-full opacity-0",
        )}
      >
        {/* NAV LINKS */}
        <div className="flex flex-col items-center justify-center gap-4">
          {mobileNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              scroll
              prefetch={item.href === "/about"}
              className="flex min-h-[52px] w-full items-center justify-center border-b border-[var(--color-divider)] px-4 text-center font-display text-[clamp(1.25rem,5.5vw,1.75rem)] font-medium text-[var(--color-charcoal)] transition-all duration-300 last:border-b-0 hover:text-[var(--color-deep-charcoal)]"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}


