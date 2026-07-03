"use client";

import { useEffect, useMemo, useState } from "react";

export function SiteLoader() {
  const [progress, setProgress] = useState(0);
  const [contentVisible, setContentVisible] = useState(false);
  const [fading, setFading] = useState(false);
  const [hidden, setHidden] = useState(false);
  const percentage = useMemo(() => `${Math.floor(progress)}%`, [progress]);

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
      className="fixed inset-0 z-[9000] flex flex-col items-center justify-center gap-8 bg-[var(--color-obsidian)] px-6 text-center"
      style={{
        opacity: fading ? 0 : 1,
        transition: "opacity .7s",
        pointerEvents: fading ? "none" : "auto",
      }}
    >
      <div
        className="max-w-full px-2 font-display text-[clamp(2rem,5vw,3.2rem)] font-light tracking-[0.3em] text-[var(--color-white)]"
        style={{
          opacity: contentVisible ? 1 : 0,
          transform: contentVisible ? "translateY(0)" : "translateY(16px)",
          transition: "opacity .6s, transform .6s",
        }}
      >
        PEC<span className="text-[var(--color-gold)]">.</span>DUBAI
      </div>
      <div
        className="max-w-[min(92vw,32rem)] px-2 font-display text-[0.82rem] italic tracking-[0.22em] text-[var(--color-fog)] sm:text-[0.9rem] sm:tracking-[0.3em]"
        style={{
          opacity: contentVisible ? 1 : 0,
          transition: "opacity .6s .4s",
        }}
      >
        Engineering Excellence. Architectural Vision.
      </div>
      <div className="relative h-px w-full max-w-[280px] overflow-hidden bg-[#1e2328]">
        <div
          className="absolute inset-y-0 left-0 bg-[linear-gradient(90deg,#8a6e4a,var(--color-gold),var(--color-gold-light))]"
          style={{
            width: `${progress}%`,
            transition: "width .08s linear",
          }}
        />
      </div>
      <div className="font-mono text-[0.65rem] tracking-[0.2em] text-[var(--color-fog)]">
        {percentage}
      </div>
    </div>
  );
}
