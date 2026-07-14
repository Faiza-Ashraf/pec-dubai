"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import type { CSSProperties, PointerEvent, WheelEvent } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type HeroImage = {
  src: string;
  alt: string;
};

const images: HeroImage[] = [
  { src: "/hero/villa-01.jpg", alt: "Modern luxury villa exterior at dusk" },
  { src: "/hero/villa-02.jpg", alt: "Warm neutral residential building exterior" },
  { src: "/hero/villa-03.jpg", alt: "Contemporary villa with illuminated glazing" },
  { src: "/hero/villa-04.jpg", alt: "Minimal villa facade with tall glass panels" },
  { src: "/hero/villa-05.jpg", alt: "Luxury residential facade framed by palms" },
  { src: "/hero/villa-06.jpg", alt: "Contemporary villa with stone and glass facade" },
  { src: "/hero/villa-07.jpg", alt: "Tall modern villa with warm accent lighting" },
  { src: "/hero/villa-08.jpg", alt: "Luxury villa surrounded by palm landscaping" },
  { src: "/hero/villa-09.jpg", alt: "Premium villa concept with broad glass facade" },
  { src: "/hero/villa-10.jpg", alt: "Elegant villa elevation with vertical fins" },
  { src: "/hero/villa-11.jpg", alt: "Modern residence with symmetrical facade" },
  { src: "/hero/villa-12.jpeg", alt: "Large architectural development render" },
];

function wrapIndex(value: number, total: number) {
  return ((value % total) + total) % total;
}

function shortestOffset(index: number, position: number, total: number) {
  let offset = index - wrapIndex(position, total);
  if (offset > total / 2) offset -= total;
  if (offset < -total / 2) offset += total;
  return offset;
}

export function HeroCoverflowCarousel() {
  const total = images.length;
  const [position, setPosition] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(1200);
  const positionRef = useRef(0);
  const targetRef = useRef(0);
  const frameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const dragRef = useRef<{
    active: boolean;
    startX: number;
    startY: number;
    startPosition: number;
    horizontal: boolean | null;
  }>({
    active: false,
    startX: 0,
    startY: 0,
    startPosition: 0,
    horizontal: null,
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(mediaQuery.matches);
    const updateViewport = () => setViewportWidth(window.innerWidth);

    updatePreference();
    updateViewport();
    mediaQuery.addEventListener("change", updatePreference);
    window.addEventListener("resize", updateViewport);

    return () => {
      mediaQuery.removeEventListener("change", updatePreference);
      window.removeEventListener("resize", updateViewport);
    };
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setPosition(Math.round(positionRef.current));
      return;
    }

    const animate = (time: number) => {
      const previous = lastTimeRef.current ?? time;
      const delta = Math.min(time - previous, 48);
      lastTimeRef.current = time;

      if (!paused && !dragRef.current.active) {
        targetRef.current += delta * 0.00012;
      }

      const distance = targetRef.current - positionRef.current;
      positionRef.current += distance * 0.16;

      setPosition(positionRef.current);
      setActiveIndex(wrapIndex(Math.round(positionRef.current), total));
      frameRef.current = window.requestAnimationFrame(animate);
    };

    frameRef.current = window.requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
      lastTimeRef.current = null;
    };
  }, [paused, reducedMotion, total]);

  const moveTo = useCallback(
    (nextPosition: number) => {
      targetRef.current = nextPosition;
      if (reducedMotion) {
        positionRef.current = nextPosition;
        setPosition(nextPosition);
        setActiveIndex(wrapIndex(Math.round(nextPosition), total));
      }
    },
    [reducedMotion, total],
  );

  const goToOffset = useCallback(
    (offset: number) => {
      moveTo(Math.round(targetRef.current) + offset);
    },
    [moveTo],
  );

  const visibleSlides = useMemo(
    () =>
      images.map((image, index) => {
        const offset = shortestOffset(index, position, total);
        const abs = Math.abs(offset);
        const clamped = Math.max(-3, Math.min(3, offset));
        const spacing = viewportWidth < 640 ? 155 : viewportWidth < 1024 ? 235 : 295;
        const depth = viewportWidth < 640 ? 70 : 130;
        const translateX = clamped * spacing;
        const translateZ = -abs * depth;
        const rotateY = clamped * (viewportWidth < 640 ? -14 : -22);
        const scale = Math.max(viewportWidth < 640 ? 0.82 : 0.76, 1 - abs * 0.09);
        const opacity = abs > 3.4 ? 0 : Math.max(0.28, 1 - abs * 0.2);
        const blur = Math.min(abs * 0.45, 1.4);

        const style: CSSProperties = {
          opacity,
          zIndex: Math.round(100 - abs * 10),
          filter: `blur(${blur}px)`,
          transform: `translate3d(${translateX}px, 0, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
        };

        return {
          ...image,
          index,
          offset,
          abs,
          isActive: wrapIndex(Math.round(position), total) === index,
          style,
        };
      }),
    [position, total, viewportWidth],
  );

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    setPaused(true);
    dragRef.current = {
      active: true,
      startX: event.clientX,
      startY: event.clientY,
      startPosition: targetRef.current,
      horizontal: null,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag.active) return;

    const deltaX = event.clientX - drag.startX;
    const deltaY = event.clientY - drag.startY;

    if (drag.horizontal === null && Math.hypot(deltaX, deltaY) > 8) {
      drag.horizontal = Math.abs(deltaX) > Math.abs(deltaY);
    }

    if (!drag.horizontal) return;

    event.preventDefault();
    const nextPosition = drag.startPosition - deltaX / 180;
    targetRef.current = nextPosition;
    positionRef.current = nextPosition;
    setPosition(nextPosition);
    setActiveIndex(wrapIndex(Math.round(nextPosition), total));
  };

  const onPointerEnd = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active) return;

    dragRef.current.active = false;
    moveTo(Math.round(targetRef.current));

    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      // Pointer capture may already be released on some mobile browsers.
    }
  };

  const onWheel = (event: WheelEvent<HTMLDivElement>) => {
    const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    if (Math.abs(delta) < 2) return;
    event.preventDefault();
    setPaused(true);
    moveTo(targetRef.current + delta * 0.0055);
    window.setTimeout(() => setPaused(false), 700);
  };

  return (
    <div
      className="relative mx-auto mt-12 w-full max-w-[1180px] select-none outline-none"
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured architectural renders"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") goToOffset(-1);
        if (event.key === "ArrowRight") goToOffset(1);
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onWheel={onWheel}
    >
      <div
        className="relative h-[min(54vw,460px)] min-h-[250px] overflow-hidden [perspective:1400px] [touch-action:pan-y] sm:min-h-[320px]"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
      >
        <div className="absolute inset-x-8 bottom-3 h-16 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(29,36,48,0.16),transparent_68%)] blur-xl" />
        {visibleSlides.map((slide) => (
          <button
            key={slide.src}
            type="button"
            className={cn(
              "absolute left-1/2 top-5 h-[78%] w-[min(72vw,620px)] -translate-x-1/2 overflow-hidden rounded-[18px] border border-[var(--color-divider)] bg-[var(--color-surface)] shadow-[0_34px_80px_rgba(29,36,48,0.18)] outline-none transition-[box-shadow,border-color] duration-300 will-change-[transform,opacity,filter] focus-visible:border-[var(--color-steel-blue)] focus-visible:shadow-[0_0_0_4px_rgba(76,106,135,0.22),0_34px_80px_rgba(29,36,48,0.18)]",
              slide.abs > 3.4 && "pointer-events-none",
            )}
            style={slide.style}
            aria-label={`View ${slide.alt}`}
            aria-current={slide.isActive}
            onClick={() => moveTo(position + slide.offset)}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={slide.index < 2}
              sizes="(max-width: 640px) 72vw, (max-width: 1024px) 68vw, 620px"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-[18%] bg-[linear-gradient(to_right,var(--color-canvas),transparent)] md:block" />
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[18%] bg-[linear-gradient(to_left,var(--color-canvas),transparent)] md:block" />

      <div className="mt-5 flex items-center justify-center gap-4">
        <button
          type="button"
          className="grid size-11 place-items-center rounded-full border border-[var(--color-divider)] bg-[var(--color-surface)] text-[var(--color-charcoal)] shadow-[0_12px_28px_rgba(29,36,48,0.08)] transition hover:border-[var(--color-deep-charcoal)] hover:text-[var(--color-deep-charcoal)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-steel-blue)]"
          onClick={() => goToOffset(-1)}
          aria-label="Previous architectural render"
        >
          <ChevronLeft className="size-4" aria-hidden="true" />
        </button>
        <div className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-[var(--color-cool-gray)]">
          {String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </div>
        <button
          type="button"
          className="grid size-11 place-items-center rounded-full border border-[var(--color-divider)] bg-[var(--color-surface)] text-[var(--color-charcoal)] shadow-[0_12px_28px_rgba(29,36,48,0.08)] transition hover:border-[var(--color-deep-charcoal)] hover:text-[var(--color-deep-charcoal)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-steel-blue)]"
          onClick={() => goToOffset(1)}
          aria-label="Next architectural render"
        >
          <ChevronRight className="size-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}


