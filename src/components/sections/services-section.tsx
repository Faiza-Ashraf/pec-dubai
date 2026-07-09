"use client";

import Image from "next/image";
import { useState } from "react";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/cn";

const serviceItems = [
  {
    id: "architectural-design",
    title: "Architectural Design",
    description:
      "Creating timeless, functional, and compliant designs tailored to your lifestyle and project goals.",
    tags: [
      "Concept Design",
      "Architectural Drawings",
      "Municipality Submission",
      "Permit Documentation",
    ],
    image: "/Services/Architectural design.jpeg",
    replacementImage: "/images/services/architectural-design.jpg",
  },
  {
    id: "structural-engineering",
    title: "Structural Engineering",
    description:
      "Safe, efficient, and durable structural solutions developed with technical precision and code compliance.",
    tags: ["Structural Drawings", "Structural Analysis", "RC Design", "Authority Compliance"],
    image: "/Services/Steel_beam_structure_under_const…_202607091745.jpeg",
    replacementImage: "/images/services/structural-engineering.jpg",
  },
  {
    id: "authority-approvals",
    title: "Authority Approvals & NOCs",
    description:
      "End-to-end coordination with authorities and developers to secure permits and NOCs efficiently.",
    tags: ["Dubai Municipality", "Trakhees", "DDA", "DEWA NOC", "RTA NOC", "Nakheel", "Emaar"],
    image: "/Services/Authority_Approvals_Government_D…_202607091744.jpeg",
    replacementImage: "/images/services/authority-approvals.jpg",
  },
  {
    id: "site-supervision",
    title: "Site Supervision",
    description:
      "On-site supervision to ensure quality construction, safety, and compliance at every stage.",
    tags: ["Site Inspections", "Quality Control", "Construction Monitoring", "Compliance Checks"],
    image: "/Services/Site_supervisor.jpeg",
    replacementImage: "/images/services/site-supervision.jpg",
  },
  {
    id: "project-consultancy",
    title: "Project Consultancy",
    description: "Strategic guidance and technical support from concept to completion.",
    tags: [
      "Project Coordination",
      "Technical Consultation",
      "Regulatory Guidance",
      "Design Management",
    ],
    image: "/Services/Project.jpeg",
    replacementImage: "/images/services/project-consultancy.jpg",
  },
];

export function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeService = serviceItems[activeIndex];

  return (
    <section id="services" className="relative overflow-hidden bg-[var(--color-surface)] py-[clamp(48px,7vw,88px)]">
      <Container>
        <div className="mx-auto max-w-[700px] text-center">
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.35em] text-[var(--color-gold)]">
            Our Services
          </span>
          <h2 className="mt-3 font-display text-[clamp(1.9rem,3.8vw,3.35rem)] font-light leading-[1.06] text-[var(--color-white)]">
            End-to-end expertise.
            <br />
            Every step, seamlessly delivered.
          </h2>
          <p className="mx-auto mt-4 max-w-[620px] text-[0.92rem] leading-[1.65] text-[var(--color-fog)]">
            From initial concept to final handover, PEC Dubai provides integrated design,
            engineering, approval, and supervision services with precision and purpose.
          </p>
        </div>

        <div className="mt-[clamp(28px,4.5vw,52px)] grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(440px,1.1fr)] lg:items-stretch xl:gap-12">
          <div
            className="divide-y divide-[var(--color-gold-border)] border-y border-[var(--color-gold-border)]"
            role="tablist"
            aria-label="PEC Dubai services"
          >
            {serviceItems.map((service, index) => {
              const active = index === activeIndex;

              return (
                <button
                  key={service.id}
                  type="button"
                  role="tab"
                  id={`service-tab-${service.id}`}
                  aria-controls="service-visual-panel"
                  aria-selected={active}
                  className={cn(
                    "group block w-full px-0 py-4 text-left outline-none transition duration-300 focus-visible:bg-[var(--color-surface-muted)] sm:py-5",
                    active && "bg-[linear-gradient(90deg,rgba(184,151,106,0.08),transparent)]",
                  )}
                  onClick={() => setActiveIndex(index)}
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  <div className="grid grid-cols-[42px_1fr] gap-4 sm:grid-cols-[56px_1fr] sm:gap-6">
                    <span
                      className={cn(
                        "pt-1 font-mono text-[0.78rem] tracking-[0.18em] transition",
                        active ? "text-[var(--color-gold)]" : "text-[var(--color-fog)]",
                      )}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3
                        className={cn(
                          "font-display text-[clamp(1.45rem,3vw,2.25rem)] font-light leading-[1.05] transition",
                          active ? "text-[var(--color-white)]" : "text-[var(--color-ink-soft)]",
                        )}
                      >
                        {service.title}
                      </h3>
                      <div
                        className={cn(
                          "overflow-hidden transition-all duration-500 ease-out",
                          active ? "mt-4 max-h-60 opacity-100" : "max-h-0 opacity-0",
                        )}
                      >
                        <ul
                          className={cn(
                            "grid gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[var(--color-bronze)]",
                            service.tags.length <= 4 && "sm:grid-cols-2",
                          )}
                        >
                          {service.tags.map((tag) => (
                            <li key={tag} className="flex items-start gap-2">
                              <span className="mt-[0.45em] size-1.5 shrink-0 rounded-full bg-[var(--color-gold)]" />
                              <span>{tag}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div
            id="service-visual-panel"
            role="tabpanel"
            aria-labelledby={`service-tab-${activeService.id}`}
            className="relative min-h-[320px] overflow-hidden rounded-[8px] border border-[var(--color-gold-border)] bg-[var(--color-surface-muted)] sm:min-h-[380px] lg:min-h-full"
          >
            {serviceItems.map((service, index) => (
              <Image
                key={service.id}
                src={service.image}
                alt={`${service.title} visual`}
                fill
                sizes="(max-width: 1024px) 100vw, 48vw"
                priority={index === 0}
                className={cn(
                  "object-cover transition duration-700 ease-out",
                  index === activeIndex ? "scale-100 opacity-100" : "scale-[1.025] opacity-0",
                )}
              />
            ))}
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(246,243,238,0.22),rgba(184,151,106,0.14),rgba(30,30,30,0.08))]" />
            <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(to_top,rgba(246,243,238,0.86),transparent)] p-5 sm:p-6">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-[var(--color-bronze)]">
                {String(activeIndex + 1).padStart(2, "0")} / PEC Dubai Service
              </p>
              <p className="mt-2 max-w-[520px] font-display text-[clamp(1.55rem,3vw,2.35rem)] font-light leading-[1.05] text-[var(--color-white)]">
                {activeService.title}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
