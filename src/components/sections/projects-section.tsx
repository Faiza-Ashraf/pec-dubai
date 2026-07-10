"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, PointerEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/home";
import { cn } from "@/lib/cn";

function wrapIndex(value: number, total: number) {
  return ((value % total) + total) % total;
}

function shortestOffset(index: number, position: number, total: number) {
  const active = ((position % total) + total) % total;
  let offset = index - active;
  if (offset > total / 2) offset -= total;
  if (offset < -total / 2) offset += total;
  return offset;
}

export function ProjectsSection() {
  const [position, setPosition] = useState(0);
  const positionRef = useRef(0);
  const targetRef = useRef(0);
  const frameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const dragRef = useRef({
    active: false,
    startX: 0,
    startY: 0,
    startPosition: 0,
    moved: false,
  });
  const total = projects.length;
  const activeIndex = wrapIndex(Math.round(position), total);
  const activeProject = projects[activeIndex];

  const slides = useMemo(
    () =>
      projects.map((project, index) => {
        const offset = shortestOffset(index, position, total);
        const abs = Math.abs(offset);
        const clamped = Math.max(-2.4, Math.min(2.4, offset));

        const style: CSSProperties = {
          opacity: abs > 2.4 ? 0 : Math.max(0.3, 1 - abs * 0.22),
          zIndex: Math.round(30 - abs * 10),
          filter: `blur(${Math.min(abs * 0.18, 0.4)}px)`,
          transform: `translate3d(${clamped * 32}%, 0, ${-abs * 120}px) rotateY(${clamped * -18}deg) scale(${Math.max(0.8, 1 - abs * 0.085)})`,
        };

        return { ...project, index, offset, abs, style };
      }),
    [position, total],
  );

  const move = (direction: number) => {
    targetRef.current = Math.round(targetRef.current) + direction;
  };

  useEffect(() => {
    const animate = (time: number) => {
      const previous = lastTimeRef.current ?? time;
      const delta = Math.min(time - previous, 48);
      lastTimeRef.current = time;

      const distance = targetRef.current - positionRef.current;
      const ease = dragRef.current.active ? 1 : Math.min(0.2, 0.08 + delta * 0.002);
      positionRef.current += distance * ease;
      setPosition(positionRef.current);

      frameRef.current = window.requestAnimationFrame(animate);
    };

    frameRef.current = window.requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
      lastTimeRef.current = null;
    };
  }, [total]);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    dragRef.current = {
      active: true,
      startX: event.clientX,
      startY: event.clientY,
      startPosition: targetRef.current,
      moved: false,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag.active) return;

    const deltaX = event.clientX - drag.startX;
    const deltaY = event.clientY - drag.startY;
    if (Math.abs(deltaX) < 4 || Math.abs(deltaX) < Math.abs(deltaY) * 0.65) return;

    event.preventDefault();
    drag.moved = true;
    const nextPosition = drag.startPosition - deltaX / 190;
    targetRef.current = nextPosition;
    positionRef.current = nextPosition;
    setPosition(nextPosition);
  };

  const onPointerEnd = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active) return;
    dragRef.current.active = false;
    targetRef.current = Math.round(targetRef.current);

    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      // Pointer capture may already be released on some browsers.
    }
  };

  return (
    <section id="projects" className="flex min-h-[100svh] items-center overflow-hidden bg-[var(--color-canvas)] py-[clamp(42px,6vw,72px)]">
      <Container>
        <div className="flex flex-col items-start justify-between gap-3 md:mb-5 md:flex-row md:items-end">
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

        <div className="relative mx-auto max-w-[1180px]">
          <div
            className="relative h-[min(46vw,360px)] min-h-[250px] cursor-grab [perspective:1400px] [touch-action:pan-y] active:cursor-grabbing sm:min-h-[300px]"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerEnd}
            onPointerCancel={onPointerEnd}
          >
            <div className="absolute inset-x-[12%] bottom-5 h-20 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(44,51,60,0.16),transparent_68%)] blur-2xl" />
            {slides.map((slide) => (
              <Link
                key={slide.title}
                href={slide.href}
                className={cn(
                  "absolute left-1/2 top-4 h-[82%] w-[min(76vw,680px)] -translate-x-1/2 overflow-hidden rounded-[8px] border border-[var(--color-divider)] bg-[var(--color-surface)] shadow-[0_34px_80px_rgba(44,51,60,0.15)] outline-none transition-[border-color,box-shadow] duration-300 will-change-[transform,opacity,filter] focus-visible:border-[var(--color-steel-blue)] focus-visible:shadow-[0_0_0_4px_rgba(86,114,135,0.24),0_34px_80px_rgba(44,51,60,0.15)]",
                  slide.abs > 2.4 && "pointer-events-none",
                )}
                style={slide.style}
                aria-label={`Open ${slide.title}`}
                draggable={false}
                onDragStart={(event) => event.preventDefault()}
                onClick={(event) => {
                  if (dragRef.current.moved) {
                    event.preventDefault();
                    dragRef.current.moved = false;
                    return;
                  }
                  if (slide.index !== activeIndex) {
                    event.preventDefault();
                    targetRef.current = position + slide.offset;
                  }
                }}
              >
                <Image
                  src={slide.image}
                  alt={`${slide.title} in ${slide.location}`}
                  fill
                  sizes="(max-width: 640px) 76vw, (max-width: 1024px) 70vw, 680px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(255,255,255,0.48),rgba(255,255,255,0.08)_48%,transparent)]" />
                <div className="absolute bottom-5 left-5 font-mono text-[0.62rem] uppercase tracking-[0.24em] text-[var(--color-deep-charcoal)]">
                  {slide.location}
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-1 flex items-center justify-center gap-4">
            <button
              type="button"
              className="grid size-10 place-items-center rounded-full border border-[var(--color-divider)] bg-[var(--color-surface)] text-[var(--color-charcoal)] transition hover:border-[var(--color-deep-charcoal)] hover:text-[var(--color-deep-charcoal)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-steel-blue)]"
              onClick={() => move(-1)}
              aria-label="Previous project"
            >
              <ChevronLeft className="size-4" aria-hidden="true" />
            </button>
            <div className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-[var(--color-cool-gray)]">
              {String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </div>
            <button
              type="button"
              className="grid size-10 place-items-center rounded-full border border-[var(--color-divider)] bg-[var(--color-surface)] text-[var(--color-charcoal)] transition hover:border-[var(--color-deep-charcoal)] hover:text-[var(--color-deep-charcoal)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-steel-blue)]"
              onClick={() => move(1)}
              aria-label="Next project"
            >
              <ChevronRight className="size-4" aria-hidden="true" />
            </button>
          </div>

          <Link
            href={activeProject.href}
            className="mx-auto mt-4 block max-w-[760px] border-y border-[var(--color-divider)] py-4 text-center transition hover:border-[var(--color-steel-blue)]"
          >
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.28em] text-[var(--color-steel-blue)]">
              {activeProject.location}
            </p>
            <h3 className="mt-2 font-display text-[clamp(1.7rem,3vw,2.6rem)] font-light leading-[1.05] text-[var(--color-charcoal)]">
              {activeProject.title}
            </h3>
            <p className="mx-auto mt-3 max-w-[620px] text-[0.82rem] leading-[1.55] text-[var(--color-cool-gray)]">
              {activeProject.summary}
            </p>
            <p className="mt-3 font-mono text-[0.62rem] uppercase tracking-[0.24em] text-[var(--color-deep-charcoal)]">
              {activeProject.metrics}
            </p>
          </Link>
        </div>
      </Container>
    </section>
  );
}


