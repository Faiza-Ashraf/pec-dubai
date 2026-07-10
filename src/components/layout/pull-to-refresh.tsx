"use client";

import { useEffect, useRef, useState } from "react";
import { RefreshCw } from "lucide-react";
import { cn } from "@/lib/cn";

const REFRESH_THRESHOLD = 86;
const MAX_PULL_DISTANCE = 122;

type RefreshState = "idle" | "pulling" | "ready" | "refreshing";

function getPullDistance(deltaY: number) {
  return Math.min(MAX_PULL_DISTANCE, Math.pow(deltaY, 0.82));
}

function shouldIgnoreTouch(target: EventTarget | null) {
  if (!(target instanceof Element)) {
    return true;
  }

  return Boolean(
    target.closest(
      "header, a, button, input, textarea, select, summary, [role='button'], [data-pull-to-refresh-ignore]",
    ),
  );
}

export function PullToRefresh() {
  const [pullDistance, setPullDistance] = useState(0);
  const [refreshState, setRefreshState] = useState<RefreshState>("idle");
  const pullDistanceRef = useRef(0);
  const startYRef = useRef(0);
  const startXRef = useRef(0);
  const pullingRef = useRef(false);
  const refreshingRef = useRef(false);
  const ignoredRef = useRef(false);

  useEffect(() => {
    const supportsTouch =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const prefersTouch =
      window.matchMedia?.("(pointer: coarse)").matches ?? supportsTouch;

    if (!supportsTouch || !prefersTouch) {
      return;
    }

    const isAtTop = () => window.scrollY <= 0;

    const resetPull = () => {
      pullingRef.current = false;
      ignoredRef.current = false;
      startYRef.current = 0;
      startXRef.current = 0;
      pullDistanceRef.current = 0;
      setPullDistance(0);
      setRefreshState("idle");
    };

    const onTouchStart = (event: TouchEvent) => {
      if (
        refreshingRef.current ||
        event.touches.length !== 1 ||
        !isAtTop() ||
        document.body.style.position === "fixed"
      ) {
        ignoredRef.current = true;
        return;
      }

      ignoredRef.current = shouldIgnoreTouch(event.target);
      if (ignoredRef.current) {
        return;
      }

      const touch = event.touches[0];
      startYRef.current = touch.clientY;
      startXRef.current = touch.clientX;
      pullingRef.current = false;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (
        ignoredRef.current ||
        refreshingRef.current ||
        event.touches.length !== 1
      ) {
        return;
      }

      const touch = event.touches[0];
      const deltaY = touch.clientY - startYRef.current;
      const deltaX = Math.abs(touch.clientX - startXRef.current);

      if (deltaY <= 0 || deltaX > deltaY || !isAtTop()) {
        if (!pullingRef.current) {
          return;
        }

        resetPull();
        return;
      }

      if (deltaY < 10 && !pullingRef.current) {
        return;
      }

      pullingRef.current = true;
      event.preventDefault();

      const distance = getPullDistance(deltaY);
      pullDistanceRef.current = distance;
      setPullDistance(distance);
      setRefreshState(distance >= REFRESH_THRESHOLD ? "ready" : "pulling");
    };

    const onTouchEnd = () => {
      if (!pullingRef.current || refreshingRef.current) {
        resetPull();
        return;
      }

      if (pullDistanceRef.current >= REFRESH_THRESHOLD) {
        refreshingRef.current = true;
        pullDistanceRef.current = 64;
        setPullDistance(64);
        setRefreshState("refreshing");
        window.setTimeout(() => window.location.reload(), 180);
        return;
      }

      resetPull();
    };

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", resetPull, { passive: true });

    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", resetPull);
    };
  }, []);

  const isVisible = refreshState !== "idle";
  const progress = Math.min(1, pullDistance / REFRESH_THRESHOLD);
  const label =
    refreshState === "refreshing"
      ? "Refreshing"
      : refreshState === "ready"
        ? "Release to refresh"
        : "Pull to refresh";

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className={cn(
        "pointer-events-none fixed inset-x-0 top-0 z-[90] flex justify-center pt-3 transition-opacity duration-200 min-[1051px]:hidden",
        isVisible ? "opacity-100" : "opacity-0",
      )}
      style={{
        transform: `translate3d(0, ${Math.max(0, pullDistance - 44)}px, 0)`,
      }}
    >
      <div className="flex h-10 items-center gap-2 rounded-full border border-[rgba(86,114,135,0.2)] bg-white/92 px-3 text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--color-deep-charcoal)] shadow-[0_12px_32px_rgba(44,51,60,0.14)] backdrop-blur-md">
        <span className="relative flex size-5 items-center justify-center">
          <span
            className="absolute inset-0 rounded-full border border-[rgba(86,114,135,0.22)]"
            style={{ transform: `scale(${0.78 + progress * 0.22})` }}
          />
          <RefreshCw
            aria-hidden="true"
            className={cn(
              "size-3.5 text-[var(--color-steel-blue)]",
              refreshState === "refreshing" && "animate-spin",
            )}
            style={{
              transform:
                refreshState === "refreshing"
                  ? undefined
                  : `rotate(${progress * 180}deg)`,
            }}
          />
        </span>
        <span>{label}</span>
      </div>
    </div>
  );
}
