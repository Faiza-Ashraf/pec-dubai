import type { Metadata } from "next";
import { PageShell } from "@/components/sections/page-shell";
import { services } from "@/data/home";
import { buildMetadata } from "@/lib/schema";

export const metadata: Metadata = buildMetadata(
  "Services | PEC Dubai",
  "Architectural design, structural engineering, MEP, approvals, supervision, and sustainability advisory for Dubai developments.",
  "/services",
);

export default function ServicesPage() {
  return (
    <PageShell
      eyebrow="Services"
      title="Architecture, engineering, and authority support under one roof."
      description="The service structure follows the strongest premium consultancies in the Dubai market: integrated delivery, technical clarity, and fast movement from design intent to approval readiness."
    >
      <div className="grid gap-4 lg:grid-cols-2">
        {services.map((service) => (
          <article
            key={service.title}
            className="rounded-lg border border-[var(--color-gold-border)] bg-[var(--color-surface)] p-6 shadow-[0_18px_45px_rgba(30,30,30,0.06)]"
          >
            <h2 className="font-display text-4xl text-[var(--color-white)]">
              {service.title}
            </h2>
            <p className="mt-4 text-base leading-8 text-[var(--color-fog)]">{service.description}</p>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
