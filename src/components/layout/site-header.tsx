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
          ? "border-b border-[var(--color-gold-border)] bg-[rgba(8,10,12,0.82)] backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <Container
        className={cn(
          "flex items-center justify-between gap-4 transition-all duration-300",
          scrolled ? "h-16" : "h-[88px]",
        )}
      >
        <Link href="/" className="flex items-center gap-3 text-[var(--color-white)]">
          <p className="font-display text-[1.45rem] font-normal tracking-[0.15em]">
            PEC<span className="text-[var(--color-gold)]">.</span>
          </p>
        </Link>

        <nav className="hidden items-center gap-9 min-[1051px]:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative text-[0.68rem] uppercase tracking-[0.22em] text-[#c4c8ce] transition hover:text-[var(--color-white)] after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-[var(--color-gold)] after:transition-all after:duration-300 hover:after:w-full"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden min-[1051px]:block">
          <Link
            href="#contact"
            className="inline-flex min-h-10 items-center justify-center border border-[var(--color-gold)] px-[22px] text-[0.64rem] uppercase tracking-[0.22em] text-[var(--color-gold)] transition hover:bg-[var(--color-gold)] hover:text-[var(--color-obsidian)]"
          >
            Book Consultation
          </Link>
        </div>

        <button
          type="button"
          className="relative z-50 hidden flex-col gap-1.5 bg-transparent p-1 lg:hidden max-[1050px]:flex"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          <span
            className={cn(
              "block h-px w-[22px] bg-[var(--color-white)] transition duration-300",
              open && "translate-y-[7px] rotate-45",
            )}
          />
          <span
            className={cn(
              "block h-px w-[22px] bg-[var(--color-white)] transition duration-300",
              open && "opacity-0",
            )}
          />
          <span
            className={cn(
              "block h-px w-[22px] bg-[var(--color-white)] transition duration-300",
              open && "-translate-y-[7px] -rotate-45",
            )}
          />
        </button>
      </Container>

      <div
        className={cn(
          "fixed inset-0 z-40 flex flex-col items-center justify-center gap-7 bg-[var(--color-obsidian)] transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] lg:hidden max-[1050px]:flex",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="font-display text-[clamp(2rem,8vw,3rem)] font-light text-[#c4c8ce] transition hover:text-[var(--color-gold)]"
            onClick={() => setOpen(false)}
          >
            {item.label}
          </Link>
        ))}
        <Link
          href="#contact"
          className="mt-3 bg-[var(--color-gold)] px-9 py-4 text-[0.75rem] uppercase tracking-[0.2em] text-[var(--color-obsidian)]"
          onClick={() => setOpen(false)}
        >
          Book Consultation
        </Link>
      </div>
    </header>
  );
}
