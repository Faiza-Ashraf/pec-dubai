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
        "fixed inset-x-0 top-0 z-[100] border-b border-[rgba(255,255,255,0.16)] bg-[rgba(50,56,66,0.94)] backdrop-blur-[14px] transition-all duration-300 min-[1051px]:z-50",
        scrolled &&
          "min-[1051px]:border-[rgba(255,255,255,0.2)] min-[1051px]:shadow-[0_12px_35px_rgba(44,51,60,0.08)]",
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
          className="relative z-[120] flex items-center"
          aria-label="PEC Dubai home"
        >
          <Image
            src="/PEC_CORRECTED_logo_package/PEC_mark_only_one_color_white_transparent.png"
            alt="PEC Dubai"
            width={1880}
            height={1096}
            priority
            className="h-6 w-auto object-contain sm:h-7"
          />
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden flex-1 items-center justify-end gap-12 min-[1051px]:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative text-[0.8rem] uppercase tracking-[0.22em] text-[#fff] transition hover:text-[var(--color-light-gray)] after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-[var(--color-light-gray)] after:transition-all after:duration-300 hover:after:w-full"
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
          "fixed inset-x-0 bottom-0 top-16 z-[105] bg-[rgba(44,51,60,0.62)] backdrop-blur-[6px] transition-opacity duration-500 min-[1051px]:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden="true"
      />

      <div
        className={cn(
          "fixed right-0 top-16 z-[110] flex h-[calc(100dvh-4rem)] min-h-[calc(100dvh-4rem)] w-[40vw] flex-col border-l border-t border-[rgba(255,255,255,0.65)] bg-[rgba(255,255,255,0.95)] px-4 py-8 shadow-[-18px_0_55px_rgba(18,24,31,0.18)] backdrop-blur-[18px] transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] min-[1051px]:hidden",
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
              className="flex min-h-[52px] w-full items-center justify-center border-b border-[rgba(44,51,60,0.14)] px-4 text-center font-display text-[clamp(1.25rem,5.5vw,1.75rem)] font-medium text-[var(--color-deep-charcoal)] transition-all duration-300 last:border-b-0 hover:text-[var(--color-charcoal)]"
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


