"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { navItems } from "@/data/home";
import { cn } from "@/lib/cn";
import { Container } from "./container";

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
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-[rgba(255,255,255,0.2)] bg-[rgba(184,151,106,0.94)] shadow-[0_12px_35px_rgba(30,30,30,0.08)] backdrop-blur-[14px]"
          : "border-b border-[rgba(255,255,255,0.16)] bg-[rgba(184,151,106,0.92)] backdrop-blur-[14px]",
      )}
    >
      <Container
        className={cn(
          "flex items-center justify-between gap-4 transition-all duration-300",
          scrolled ? "h-14" : "h-16",
        )}
      >
        {/* LOGO */}
        <Link
          href="/"
          className="relative z-50 flex items-center gap-3 text-[#fff]"
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
          className="relative z-50 hidden flex-col gap-1.5 bg-transparent p-1 lg:hidden max-[1050px]:flex"
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
          "fixed inset-0 z-40 flex flex-col justify-between bg-[rgba(184,151,106,0.97)] px-8 py-24 backdrop-blur-2xl transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] lg:hidden max-[1050px]:flex",
          open
            ? "translate-x-0 opacity-100"
            : "pointer-events-none translate-x-full opacity-0",
        )}
      >
        {/* TOP */}
        <div />

        {/* NAV LINKS */}
        <div className="flex flex-col items-center gap-7">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="translate-y-0 font-display text-[clamp(2.25rem,9vw,3.4rem)] font-light text-[#fff] opacity-100 transition-all duration-500 hover:text-[var(--color-white)]"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div />
      </div>
    </header>
  );
}
