import { MessageCircle } from "lucide-react";
import { siteMeta } from "@/data/home";

export function MobileStickyCta() {
  return (
    <div className="fixed bottom-[18px] right-[18px] z-50 sm:bottom-7 sm:right-7">
      <a
        href={siteMeta.whatsapp}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-[10px] rounded-full bg-[#25D366] px-5 py-[13px] text-[0.75rem] font-medium text-white shadow-[0_8px_32px_rgba(37,211,102,0.3)] transition hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(37,211,102,0.4)]"
      >
        <MessageCircle size={18} />
        <span className="hidden min-[481px]:inline">WhatsApp Us</span>
      </a>
    </div>
  );
}
