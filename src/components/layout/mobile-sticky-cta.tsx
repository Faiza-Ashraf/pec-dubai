"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { siteMeta } from "@/data/home";

export function MobileStickyCta() {
  const [footerOffset, setFooterOffset] = useState(0);

  useEffect(() => {
    const updateFooterOffset = () => {
      const footer = document.querySelector("footer");

      if (!footer) {
        setFooterOffset(0);
        return;
      }

      const footerRect = footer.getBoundingClientRect();
      setFooterOffset(Math.max(0, window.innerHeight - footerRect.top));
    };

    updateFooterOffset();
    window.addEventListener("scroll", updateFooterOffset, { passive: true });
    window.addEventListener("resize", updateFooterOffset);

    return () => {
      window.removeEventListener("scroll", updateFooterOffset);
      window.removeEventListener("resize", updateFooterOffset);
    };
  }, []);

  return (
    <div
      className="fixed bottom-[calc(var(--footer-offset)+18px)] right-[18px] z-50 transition-[bottom] duration-150 sm:bottom-[calc(var(--footer-offset)+28px)] sm:right-7"
      style={{ "--footer-offset": `${footerOffset}px` } as CSSProperties}
    >
      <a
        href={siteMeta.whatsapp}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-[10px] rounded-full bg-[var(--color-gold)] px-5 py-[13px] text-[0.75rem] font-medium text-white shadow-[0_8px_32px_rgba(184,151,106,0.24)] transition hover:-translate-y-1 hover:bg-[var(--color-bronze)] hover:shadow-[0_16px_48px_rgba(157,124,78,0.28)]"
      >
        <MessageCircle size={18} />
        <span className="hidden min-[481px]:inline">WhatsApp Us</span>
      </a>
    </div>
  );
}
