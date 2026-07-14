"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function SectionMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main > section"));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion || !window.IntersectionObserver) {
      sections.forEach((section) => section.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
