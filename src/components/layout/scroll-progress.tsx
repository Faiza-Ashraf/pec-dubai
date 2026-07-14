"use client";

import type { CSSProperties } from "react";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [footerOffset, setFooterOffset] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollableHeight > 0 ? Math.round((window.scrollY / scrollableHeight) * 100) : 0);

      const footer = document.querySelector("footer");
      const footerTop = footer?.getBoundingClientRect().top ?? window.innerHeight;
      setFooterOffset(Math.max(0, window.innerHeight - footerTop));
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-[calc(var(--footer-offset)+20px)] left-5 z-50 grid size-12 place-items-center rounded-full p-[3px] shadow-[0_10px_28px_rgba(44,51,60,0.18)] transition-[bottom,transform] duration-150 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-steel-blue)] sm:bottom-[calc(var(--footer-offset)+28px)] sm:left-7"
      style={{
        "--footer-offset": `${footerOffset}px`,
        background: `conic-gradient(var(--color-charcoal) ${progress * 3.6}deg, var(--color-divider) 0deg)`,
      } as CSSProperties}
      aria-label={`Scroll progress ${progress} percent. Return to top.`}
      title="Return to top"
    >
      <span className="grid size-full place-items-center rounded-full bg-[var(--color-surface)] text-[var(--color-charcoal)]">
        <ArrowUp className="size-4" aria-hidden="true" />
      </span>
    </button>
  );
}
