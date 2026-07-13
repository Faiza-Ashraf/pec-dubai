"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/home";
import { cn } from "@/lib/cn";

export function ProjectsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const activeProject = projects[activeIndex];

  const scrollToProject = (index: number) => {
    const nextIndex = (index + projects.length) % projects.length;
    setActiveIndex(nextIndex);
    cardRefs.current[nextIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  const updateActiveFromScroll = () => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const viewportCenter = viewport.getBoundingClientRect().left + viewport.clientWidth / 2;
    const closestIndex = cardRefs.current.reduce((closest, card, index) => {
      if (!card) return closest;

      const rect = card.getBoundingClientRect();
      const distance = Math.abs(rect.left + rect.width / 2 - viewportCenter);
      return distance < closest.distance ? { index, distance } : closest;
    }, { index: activeIndex, distance: Number.POSITIVE_INFINITY }).index;

    if (closestIndex !== activeIndex) {
      setActiveIndex(closestIndex);
    }
  };

  return (
    <section
      id="projects"
      className="overflow-hidden bg-[var(--color-canvas)] py-[clamp(36px,5vw,60px)] max-md:py-10"
    >
      <Container>
        <div className="flex flex-col items-start justify-between gap-4 md:mb-7 md:flex-row md:items-end">
          <div>
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.35em] text-[var(--color-steel-blue)]">
              Selected Work
            </span>
            <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3.6rem)] font-light leading-[1.05] text-[var(--color-charcoal)]">
              Featured <span className="text-[var(--color-light-gray)] italic">Projects</span>
            </h2>
          </div>
          <Button href="/projects" variant="secondary" className="min-h-12 px-6 py-3">
            View All Projects
          </Button>
        </div>

        <div className="mt-5 lg:mt-7">
          <div
            ref={viewportRef}
            className="overflow-x-auto pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-label="Featured project gallery"
            onScroll={updateActiveFromScroll}
          >
            <div className="flex w-max snap-x snap-mandatory gap-4 lg:gap-6">
              {projects.map((project, index) => (
                <Link
                  key={project.title}
                  href={project.href}
                  ref={(element) => {
                    cardRefs.current[index] = element;
                  }}
                  className={cn(
                    "group relative isolate h-[280px] w-[min(90vw,520px)] snap-center overflow-hidden rounded-[8px] border border-[var(--color-divider)] bg-[var(--color-surface-muted)] shadow-[0_22px_62px_rgba(44,51,60,0.1)] outline-none transition duration-300 hover:-translate-y-1 hover:border-[rgba(86,114,135,0.58)] hover:shadow-[0_28px_76px_rgba(44,51,60,0.15)] focus-visible:border-[var(--color-steel-blue)] focus-visible:shadow-[0_0_0_4px_rgba(86,114,135,0.22),0_28px_76px_rgba(44,51,60,0.15)] sm:h-[330px] sm:w-[min(80vw,620px)] lg:h-[min(46svh,500px)] lg:min-h-[390px] lg:w-[min(58vw,860px)]",
                    index === activeIndex && "border-[rgba(86,114,135,0.62)]",
                  )}
                  aria-label={`Open ${project.title}`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                >
                  <Image
                    src={project.image}
                    alt={`${project.title} in ${project.location}`}
                    fill
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 80vw, 58vw"
                    priority={index === 0}
                    className="object-cover transition duration-500 ease-out group-hover:scale-[1.025]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(44,51,60,0.02)_0%,rgba(44,51,60,0.18)_42%,rgba(44,51,60,0.74)_100%)]" />
                  <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-5">
                    <div className="flex flex-wrap items-center gap-2 font-mono text-[0.58rem] uppercase tracking-[0.22em] text-[rgba(255,255,255,0.76)]">
                      <span>{project.metrics}</span>
                      <span className="h-px w-7 bg-[rgba(255,255,255,0.45)]" aria-hidden="true" />
                      <span>{project.location}</span>
                    </div>
                    <h3 className="mt-2 max-w-[680px] font-display text-[clamp(1.25rem,2.4vw,2rem)] font-light leading-[1.04]">
                      {project.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <Link
            href={activeProject.href}
            className="relative mx-auto mt-1 block h-[136px] max-w-[840px] overflow-hidden border-y border-[var(--color-steel-blue)] text-center transition hover:border-[var(--color-deep-charcoal)] sm:h-[148px] lg:h-[152px]"
          >
            {projects.map((project, index) => (
              <div
                key={project.title}
                aria-hidden={index !== activeIndex}
                className={cn(
                  "absolute inset-0 flex flex-col items-center justify-center px-2 py-3 transition-all duration-500 ease-out sm:py-4",
                  index === activeIndex
                    ? "translate-y-0 opacity-100 blur-0"
                    : "pointer-events-none translate-y-2 opacity-0 blur-[2px]",
                )}
              >
                <p className="font-mono text-[0.54rem] uppercase tracking-[0.3em] text-[var(--color-steel-blue)]">
                  {project.location}
                </p>
                <h3 className="mt-1 font-display text-[clamp(1.45rem,2.8vw,2.35rem)] font-light leading-[1.02] text-[var(--color-charcoal)]">
                  {project.title}
                </h3>
                <p className="mx-auto mt-2 line-clamp-2 max-w-[700px] text-[clamp(0.78rem,1vw,0.9rem)] leading-[1.45] text-[var(--color-cool-gray)]">
                  {project.summary}
                </p>
                <p className="mt-2 font-mono text-[0.54rem] uppercase tracking-[0.3em] text-[var(--color-deep-charcoal)]">
                  {project.metrics}
                </p>
              </div>
            ))}
          </Link>

          <div className="mt-3 flex items-center justify-center gap-4">
            <button
              type="button"
              className="grid size-10 place-items-center rounded-full border border-[var(--color-divider)] bg-[var(--color-surface)] text-[var(--color-charcoal)] transition hover:border-[var(--color-deep-charcoal)] hover:text-[var(--color-deep-charcoal)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-steel-blue)]"
              onClick={() => scrollToProject(activeIndex - 1)}
              aria-label="Previous project"
            >
              <ChevronLeft className="size-4" aria-hidden="true" />
            </button>
            <div className="font-mono text-[0.62rem] uppercase tracking-[0.28em] text-[var(--color-cool-gray)]">
              {String(activeIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </div>
            <button
              type="button"
              className="grid size-10 place-items-center rounded-full border border-[var(--color-divider)] bg-[var(--color-surface)] text-[var(--color-charcoal)] transition hover:border-[var(--color-deep-charcoal)] hover:text-[var(--color-deep-charcoal)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-steel-blue)]"
              onClick={() => scrollToProject(activeIndex + 1)}
              aria-label="Next project"
            >
              <ChevronRight className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
