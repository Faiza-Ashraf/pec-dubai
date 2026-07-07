import { MessageCircle } from "lucide-react";
import { siteMeta } from "@/data/home";

export function MobileStickyCta() {
  return (
    <div className="fixed bottom-[18px] right-[18px] z-50 sm:bottom-7 sm:right-7">
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
