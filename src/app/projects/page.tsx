import type { Metadata } from "next";
import { PageShell } from "@/components/sections/page-shell";
import { projects } from "@/data/home";
import { buildMetadata } from "@/lib/schema";

export const metadata: Metadata = buildMetadata(
  "Projects | PEC Dubai",
  "Selected villas, commercial work, and mixed-use developments shaped through architecture and engineering coordination in Dubai.",
  "/projects",
);

export default function ProjectsPage() {
  return (
    <PageShell
      eyebrow="Portfolio"
      title="Selected work shaped with architectural clarity and engineering discipline."
      description="This route is ready to expand into a full CMS-backed portfolio. For now, it presents the featured project language, location context, and proof structure defined in the strategy."
    >
      <div className="grid gap-4 lg:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.title}
            className="rounded-lg border border-[var(--color-gold-border)] bg-[var(--color-surface)] p-6 shadow-[0_18px_45px_rgba(30,30,30,0.06)]"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--color-gold-light)]">
              {project.location}
            </p>
            <h2 className="mt-4 font-display text-4xl text-[var(--color-white)]">
              {project.title}
            </h2>
            <p className="mt-4 text-base leading-8 text-[var(--color-fog)]">{project.summary}</p>
            <p className="mt-6 text-sm text-[var(--color-white)]">{project.metrics}</p>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
