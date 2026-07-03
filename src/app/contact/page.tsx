import type { Metadata } from "next";
import { ContactSection } from "@/components/sections/contact-section";
import { buildMetadata } from "@/lib/schema";

export const metadata: Metadata = buildMetadata(
  "Contact | PEC Dubai",
  "Request a consultation for architectural design, engineering, approvals, or supervision in Dubai.",
  "/contact",
);

export default function ContactPage() {
  return (
    <main className="flex-1">
      <ContactSection />
    </main>
  );
}
