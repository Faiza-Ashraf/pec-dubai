"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

export function SiteLoader() {
  const [progress, setProgress] = useState(0);
  const [contentVisible, setContentVisible] = useState(false);
  const [fading, setFading] = useState(false);
  const [hidden, setHidden] = useState(false);
  const percentage = useMemo(() => `${Math.floor(progress)}%`, [progress]);

  useEffect(() => {
    if (!hidden) return;

    window.dispatchEvent(new Event("pec:site-loader-hidden"));
  }, [hidden]);

  useEffect(() => {
    const timeouts: number[] = [];

    const revealTimer = window.setTimeout(() => {
      setContentVisible(true);
      const tagTimer = window.setTimeout(() => setContentVisible(true), 350);
      timeouts.push(tagTimer);
    }, 0);

    const interval = window.setInterval(() => {
      setProgress((current) => {
        const next = Math.min(100, current + Math.random() * 13 + 4);

        if (next >= 100) {
          window.clearInterval(interval);
          const fadeTimer = window.setTimeout(() => {
            setFading(true);
            const hideTimer = window.setTimeout(() => setHidden(true), 700);
            timeouts.push(hideTimer);
          }, 400);
          timeouts.push(fadeTimer);
        }

        return next;
      });
    }, 70);

    return () => {
      window.clearTimeout(revealTimer);
      window.clearInterval(interval);
      timeouts.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      className="fixed inset-0 z-[9000] flex flex-col items-center justify-center gap-2 bg-[var(--color-canvas)] px-6 text-center"
      style={{
        opacity: fading ? 0 : 1,
        transition: "opacity .7s",
        pointerEvents: fading ? "none" : "auto",
      }}
    >
      <div
        className="max-w-full px-2"
        style={{
          opacity: contentVisible ? 1 : 0,
          transform: contentVisible ? "translateY(0)" : "translateY(16px)",
          transition: "opacity .6s, transform .6s",
        }}
      >
        <Image
          src="/PEC_Pioneer_Engineering_Consultants_APPROVED_FINAL/PEC main logo12.png"
          alt="PEC Dubai"
          width={1880}
          height={1096}
          priority
          className="h-32 w-auto object-contain sm:h-40 md:h-48"
        />
      </div>
      <div
        className="-mt-4 max-w-[min(92vw,38rem)] px-2 font-display text-[1rem] italic tracking-[0.18em] text-[var(--color-cool-gray)] sm:-mt-5 sm:text-[1.08rem] sm:tracking-[0.26em] md:-mt-6 md:text-[1.18rem]"
        style={{
          opacity: contentVisible ? 1 : 0,
          transition: "opacity .6s .4s",
        }}
      >
        Engineering Excellence. Architectural Vision.
      </div>
      <div className="relative h-px w-full max-w-[280px] overflow-hidden bg-[var(--color-divider)]">
        <div
          className="absolute inset-y-0 left-0 bg-[linear-gradient(90deg,var(--color-deep-charcoal),var(--color-steel-blue),var(--color-light-gray))]"
          style={{
            width: `${progress}%`,
            transition: "width .08s linear",
          }}
        />
      </div>
      <div className="font-mono text-[0.78rem] tracking-[0.24em] text-[var(--color-cool-gray)] sm:text-[0.86rem]">
        {percentage}
      </div>
    </div>
  );
}


