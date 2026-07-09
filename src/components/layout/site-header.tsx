"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { navItems } from "@/data/home";
import { cn } from "@/lib/cn";
import { Container } from "./container";

const mobileNavItems = navItems.filter((item) => item.label !== "About");

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
        "fixed inset-x-0 top-0 z-[100] transition-all duration-300 min-[1051px]:z-50",
        scrolled
          ? "border-b border-[rgba(255,255,255,0.2)] bg-[rgba(184,151,106,0.94)] shadow-[0_12px_35px_rgba(30,30,30,0.08)] backdrop-blur-[14px]"
          : "border-b border-[rgba(255,255,255,0.16)] bg-[rgba(184,151,106,0.92)] backdrop-blur-[14px]",
      )}
    >
      <Container
        className={cn(
          "flex items-center justify-between gap-4 transition-all duration-300 max-md:px-4",
          scrolled ? "h-14" : "h-16",
        )}
      >
        {/* LOGO */}
        <Link
          href="/"
          className="relative z-[120] flex items-center gap-3 text-[#fff]"
        >
          <p className="font-display text-[1.35rem] font-normal tracking-[0.15em]">
            PEC<span className="text-[#F6F3EE]">.</span>
          </p>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden flex-1 items-center justify-end gap-12 min-[1051px]:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative text-[0.8rem] uppercase tracking-[0.22em] text-[#fff] transition hover:text-[var(--color-white)] after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-[var(--color-white)] after:transition-all after:duration-300 hover:after:w-full"
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
          "fixed inset-0 z-[105] bg-[rgba(30,30,30,0.12)] backdrop-blur-[12px] transition-opacity duration-500 min-[1051px]:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden="true"
      />

      <div
        className={cn(
          "fixed inset-y-0 right-0 z-[110] flex h-[100dvh] min-h-screen w-1/2 flex-col justify-center border-l border-[rgba(255,255,255,0.42)] bg-[rgba(255,255,255,0.85)] px-4 py-24 shadow-[-18px_0_55px_rgba(30,30,30,0.18)] backdrop-blur-[98px] ring-1 ring-[rgba(255,255,255,0.35)] transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] min-[1051px]:hidden",
          open
            ? "translate-x-0 opacity-100"
            : "pointer-events-none translate-x-full opacity-0",
        )}
      >
        {/* NAV LINKS */}
        <div className="flex flex-col items-center justify-center gap-3">
          {mobileNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex min-h-[52px] w-full items-center justify-center px-4 text-center font-display text-[clamp(1.35rem,6vw,1.9rem)] font-medium text-[var(--color-bronze)] opacity-100 transition-all duration-500 hover:text-[var(--color-gold)]"
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
