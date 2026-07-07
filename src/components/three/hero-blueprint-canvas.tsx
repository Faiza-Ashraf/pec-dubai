"use client";

import { AdaptiveDpr } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { HeroBlueprintScene } from "./hero-blueprint-scene";

function getHeroCapabilities() {
  if (typeof window === "undefined") {
    return { canRender: false, reducedMotion: false };
  }

  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const lowPower = (navigator.hardwareConcurrency ?? 8) <= 4;
  const desktop = window.innerWidth >= 1024;

  return {
    canRender: desktop && !lowPower,
    reducedMotion: mediaQuery.matches,
  };
}

export function HeroBlueprintCanvas() {
  const [mounted, setMounted] = useState(false);
  const [, setViewportTick] = useState(0);
  const state = mounted ? getHeroCapabilities() : { canRender: false, reducedMotion: false };

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setMounted(true));
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onResize = () => setViewportTick((value) => value + 1);

    mediaQuery.addEventListener("change", onResize);
    window.addEventListener("resize", onResize);

    return () => {
      window.cancelAnimationFrame(frame);
      mediaQuery.removeEventListener("change", onResize);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  if (!state.canRender) {
    return (
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_32%,rgba(111,143,166,0.18),transparent_18%),radial-gradient(circle_at_20%_18%,rgba(191,154,100,0.18),transparent_22%),linear-gradient(180deg,rgba(23,32,39,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(23,32,39,0.055)_1px,transparent_1px)] bg-[size:auto,auto,68px_68px,68px_68px]" />
    );
  }

  return (
    <div className="absolute inset-0">
      <Canvas
        dpr={[1, 1.25]}
        camera={{ position: [0.5, 4.65, 6.25], fov: 30 }}
        gl={{ antialias: false, powerPreference: "high-performance" }}
      >
        <AdaptiveDpr pixelated />
        <HeroBlueprintScene reducedMotion={state.reducedMotion} />
      </Canvas>
    </div>
  );
}
