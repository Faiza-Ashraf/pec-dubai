import type { Metadata } from "next";
import { PageShell } from "@/components/sections/page-shell";
import { aboutBadges, whyPec } from "@/data/home";
import { buildMetadata } from "@/lib/schema";

export const metadata: Metadata = buildMetadata(
  "About | PEC Dubai",
  "PEC Dubai brings architecture, structural, MEP, approvals, and supervision into one integrated consultancy experience.",
  "/about",
);

export default function AboutPage() {
  const proofCards = [
    ...aboutBadges.map((badge) => ({ title: badge, detail: "" })),
    ...whyPec.slice(0, 2),
  ];

  return (
    <PageShell
      eyebrow="About PEC"
      title="Built for clients who need design ambition and delivery discipline to coexist."
      description="The brand promise is simple: one consultancy relationship that can protect concept quality, technical depth, authority readiness, and execution oversight."
    >
      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-lg border border-[var(--color-gold-border)] bg-[var(--color-surface)] p-6 shadow-[0_18px_45px_rgba(30,30,30,0.06)]">
          <div className="space-y-5 text-base leading-8 text-[var(--color-fog)]">
            <p>
              PEC Dubai is modeled around the market realities that matter in this region:
              permit speed, coordination quality, engineering depth, and the ability to
              keep architecture elegant while still making it buildable.
            </p>
            <p>
              The site positions the company as a calm, technical, luxury-aware partner
              for private clients, developers, and investors across villas, towers, and
              mixed-use work.
            </p>
          </div>
        </div>
        <div className="grid gap-4">
          {proofCards.map((item) => (
            <div
              key={item.title}
              className="rounded-lg border border-[var(--color-gold-border)] bg-[linear-gradient(180deg,rgba(184,151,106,0.12),rgba(255,255,255,0.86))] p-5 text-[var(--color-white)]"
            >
              <div className="font-display text-xl">{item.title}</div>
              {item.detail ? (
                <p className="mt-2 text-sm leading-7 text-[var(--color-fog)]">{item.detail}</p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
