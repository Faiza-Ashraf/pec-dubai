"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { Container } from "@/components/layout/container";
import { processSteps } from "@/data/home";

gsap.registerPlugin(ScrollTrigger);

export function ProcessSection() {
  const rootRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const phaseRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const detailRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    if (!rootRef.current || !fillRef.current) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const context = gsap.context(() => {
      gsap.set(fillRef.current, { width: "0%" });
      gsap.set(stepRefs.current, { y: 10 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 72%",
          end: "bottom 42%",
          scrub: 1,
        },
      });

      stepRefs.current.forEach((step, index) => {
        const dot = dotRefs.current[index];
        const phase = phaseRefs.current[index];
        const title = titleRefs.current[index];
        const detail = detailRefs.current[index];
        if (!step || !dot || !phase || !title || !detail) return;

        const startAt = index * 0.22;
        const progressWidth = `${((index + 1) / processSteps.length) * 80}%`;

        timeline.to(
          fillRef.current,
          {
            width: progressWidth,
            duration: 0.16,
            ease: "none",
          },
          startAt,
        );
        timeline.to(
          step,
          {
            y: 0,
            duration: 0.16,
          },
          startAt,
        );
        timeline.to(
          dot,
          {
            borderColor: "#b8976a",
            backgroundColor: "#b8976a",
            boxShadow: "0 0 28px rgba(184,151,106,0.4)",
            duration: 0.15,
          },
          startAt,
        );
        timeline.to(
          phase,
          {
            opacity: 1,
            duration: 0.12,
          },
          startAt,
        );
        timeline.to(
          title,
          {
            color: "#172027",
            duration: 0.12,
          },
          startAt,
        );
        timeline.fromTo(
          detail,
          { opacity: 0, y: 6 },
          {
            opacity: 1,
            y: 0,
            duration: 0.18,
          },
          startAt + 0.02,
        );
      });
    }, rootRef);

    return () => context.revert();
  }, []);

  return (
    <section id="process" className="bg-[#eee9df] py-[clamp(70px,10vw,140px)]">
      <Container>
        <div ref={rootRef}>
          <div className="text-center">
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.35em] text-[var(--color-gold)]">
              How We Work
            </p>
            <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.8rem)] font-light leading-[1.1] text-[var(--color-white)]">
              A Process Built for{" "}
              <span className="text-[var(--color-gold-light)] italic">Perfection</span>
            </h2>
            <p className="mx-auto mt-4 max-w-[480px] text-[0.92rem] leading-[1.7] text-[var(--color-fog)]">
              Every great building follows a disciplined path. Here&apos;s ours.
            </p>
          </div>

          <div className="relative mt-[72px]">
            <div className="absolute left-[10%] right-[10%] top-5 hidden h-px bg-[var(--color-gold-border)] lg:block" />
            <div
              ref={fillRef}
              className="absolute left-[10%] top-5 hidden h-px bg-[linear-gradient(90deg,var(--color-gold),var(--color-gold-light))] lg:block"
            />

            <div className="grid gap-4 lg:grid-cols-5 lg:gap-0">
              {processSteps.map((step, index) => (
                <div
                  key={step.title}
                  ref={(element) => {
                    stepRefs.current[index] = element;
                  }}
                  className="relative border-b border-[var(--color-gold-border)] pt-0 text-left lg:border-b-0 lg:px-2 lg:pt-[52px] lg:text-center"
                >
                  <div
                    ref={(element) => {
                      dotRefs.current[index] = element;
                    }}
                    className="absolute left-0 top-6 size-4 rounded-full border-2 border-[#d7d0c4] bg-[#eee9df] lg:left-1/2 lg:top-3 lg:-translate-x-1/2"
                  />
                  <p
                    ref={(element) => {
                      phaseRefs.current[index] = element;
                    }}
                    className="pb-2 pl-14 pt-5 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-[var(--color-gold)] opacity-35 lg:pb-[10px] lg:pl-0 lg:pt-0"
                  >
                    {step.phase}
                  </p>
                  <h3
                    ref={(element) => {
                      titleRefs.current[index] = element;
                    }}
                    className="pl-14 font-display text-[0.95rem] font-normal leading-[1.2] text-[var(--color-ink-soft)] lg:pl-0"
                  >
                    {step.title}
                  </h3>
                  <p
                    ref={(element) => {
                      detailRefs.current[index] = element;
                    }}
                    className="pb-5 pl-14 pt-[7px] text-[0.73rem] leading-[1.55] text-[var(--color-fog)] opacity-0 lg:pl-0"
                  >
                    {step.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
