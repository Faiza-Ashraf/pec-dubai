"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { Container } from "@/components/layout/container";
import { blueprintStages } from "@/data/home";

gsap.registerPlugin(ScrollTrigger);

export function BlueprintStorySection() {
  const rootRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const labelsRef = useRef<SVGGElement>(null);
  const compassRef = useRef<SVGGElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!rootRef.current || !svgRef.current) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const drawings = Array.from(
      svgRef.current.querySelectorAll<SVGGeometryElement>(".bpd"),
    );

    drawings.forEach((shape) => {
      const length = shape.getTotalLength();
      shape.style.strokeDasharray = `${length}`;
      shape.style.strokeDashoffset = `${length}`;
    });

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 72%",
          end: "+=520",
          scrub: 0.55,
        },
      });

      timeline.to(drawings, {
        strokeDashoffset: 0,
        duration: 0.75,
        stagger: 0.02,
        ease: "none",
      });

      if (labelsRef.current) {
        timeline.to(labelsRef.current, { opacity: 1, duration: 0.18 }, 0.55);
      }

      if (compassRef.current) {
        timeline.to(compassRef.current, { opacity: 1, duration: 0.16 }, 0.62);
      }

      stepRefs.current.forEach((step, index) => {
        if (!step) return;
        timeline.to(
          step,
          {
            opacity: 1,
            backgroundColor: "rgba(255,255,255,0.82)",
            duration: 0.12,
          },
          0.68 + index * 0.06,
        );
      });
    }, rootRef.current);

    return () => context.revert();
  }, []);

  return (
    <section id="blueprint" className="bg-[var(--color-surface-muted)] py-[clamp(70px,10vw,140px)]">
      <Container>
        <div ref={rootRef}>
          <div className="mx-auto max-w-[760px] text-center">
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.35em] text-[var(--color-gold)]">
              Our Story in Lines
            </span>
            <h2 className="mt-4 font-display text-[clamp(2rem,5vw,4rem)] font-light leading-[1.08] text-[var(--color-white)]">
              Vision Drawn in <span className="text-[var(--color-gold-light)] italic">Blueprint,</span>
              <br />
              Built in Reality
            </h2>
            <p className="mx-auto mt-4 max-w-[620px] text-[0.92rem] leading-[1.75] text-[var(--color-fog)]">
              Every landmark begins as a single line. Watch how PEC transforms ideas into
              engineered masterpieces.
            </p>
          </div>

          <div className="mx-auto mt-[52px] max-w-[880px]">
            <svg
              ref={svgRef}
              id="bp-svg"
              viewBox="0 0 800 480"
              className="block h-auto w-full"
              fill="none"
              aria-label="Blueprint story drawing"
            >
              <defs>
                <pattern id="bp-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke="rgba(30,30,30,0.07)"
                    strokeWidth="0.5"
                  />
                </pattern>
              </defs>

              <rect width="800" height="480" fill="url(#bp-grid)" />
              <line
                x1="400"
                y1="0"
                x2="400"
                y2="480"
                stroke="rgba(30,30,30,0.055)"
                strokeWidth="1"
              />
              <line
                x1="0"
                y1="240"
                x2="800"
                y2="240"
                stroke="rgba(30,30,30,0.055)"
                strokeWidth="1"
              />

              <rect
                className="bpd"
                x="160"
                y="110"
                width="480"
                height="260"
                stroke="rgba(30,30,30,0.78)"
                strokeWidth="2"
              />
              <line
                className="bpd"
                x1="320"
                y1="110"
                x2="320"
                y2="370"
                stroke="rgba(30,30,30,0.78)"
                strokeWidth="2"
              />
              <line
                className="bpd"
                x1="480"
                y1="110"
                x2="480"
                y2="370"
                stroke="rgba(30,30,30,0.78)"
                strokeWidth="2"
              />
              <line
                className="bpd"
                x1="160"
                y1="240"
                x2="640"
                y2="240"
                stroke="rgba(30,30,30,0.78)"
                strokeWidth="2"
              />
              <line
                className="bpd"
                x1="160"
                y1="170"
                x2="640"
                y2="170"
                stroke="rgba(184,151,106,0.85)"
                strokeWidth="1"
              />
              <line
                className="bpd"
                x1="160"
                y1="310"
                x2="640"
                y2="310"
                stroke="rgba(184,151,106,0.85)"
                strokeWidth="1"
              />
              <polyline
                className="bpd"
                points="220,110 220,70 580,70 580,110"
                stroke="rgba(184,151,106,0.55)"
                strokeWidth="1"
              />
              <polyline
                className="bpd"
                points="220,370 220,410 580,410 580,370"
                stroke="rgba(184,151,106,0.55)"
                strokeWidth="1"
              />
              <line
                className="bpd"
                x1="210"
                y1="150"
                x2="270"
                y2="150"
                stroke="rgba(184,151,106,0.3)"
                strokeWidth="1"
              />
              <line
                className="bpd"
                x1="450"
                y1="325"
                x2="500"
                y2="325"
                stroke="rgba(184,151,106,0.3)"
                strokeWidth="1"
              />
              <line
                className="bpd"
                x1="160"
                y1="420"
                x2="640"
                y2="420"
                stroke="rgba(184,151,106,0.25)"
                strokeWidth="0.5"
                strokeDasharray="4 4"
              />

              <g
                ref={labelsRef}
                id="bp-labels"
                style={{
                  fontFamily: "monospace",
                  fontSize: "9px",
                  fill: "rgba(184,151,106,0.55)",
                }}
                opacity="0"
              >
                <text x="200" y="175">
                  LIVING ROOM
                </text>
                <text x="184" y="305">
                  MASTER SUITE
                </text>
                <text x="426" y="175">
                  KITCHEN
                </text>
                <text x="430" y="312">
                  BEDROOMS
                </text>
                <text x="356" y="440">
                  18,500 mm
                </text>
                <text x="20" y="462" style={{ fontSize: "7px", letterSpacing: ".25em" }}>
                  SCALE 1:100 | GROUND FLOOR PLAN | PEC DUBAI
                </text>
              </g>

              <g ref={compassRef} id="bp-compass" opacity="0">
                <circle
                  cx="740"
                  cy="60"
                  r="20"
                  fill="none"
                  stroke="rgba(184,151,106,0.3)"
                  strokeWidth="0.5"
                />
                <text
                  x="740"
                  y="46"
                  textAnchor="middle"
                  style={{
                    fontFamily: "monospace",
                    fontSize: "8px",
                    fill: "rgba(184,151,106,0.7)",
                  }}
                >
                  N
                </text>
                <polygon
                  points="740,50 737,62 740,60 743,62"
                  fill="rgba(184,151,106,0.5)"
                />
              </g>
            </svg>
          </div>

          <div className="mt-[52px] grid grid-cols-2 gap-px border border-[var(--color-gold-border)] bg-[var(--color-gold-border)] md:grid-cols-5">
            {blueprintStages.map((stage, index) => (
              <div
                key={stage.id}
                ref={(element) => {
                  stepRefs.current[index] = element;
                }}
                className="bg-[var(--color-surface-muted)] px-[18px] py-7 text-center opacity-25"
              >
                <div className="font-mono text-[0.6rem] text-[var(--color-gold)]">{stage.id}</div>
                <div className="mt-[10px] font-display text-[0.95rem] font-normal leading-[1.25] text-[var(--color-white)]">
                  {stage.title}
                </div>
                <div className="mt-[10px] text-[0.73rem] leading-[1.55] text-[var(--color-fog)]">
                  {stage.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
