"use client";

import { forwardRef, useEffect, type VideoHTMLAttributes } from "react";

type SafariVideoProps = VideoHTMLAttributes<HTMLVideoElement> & {
  src: string;
};

export const SafariVideo = forwardRef<HTMLVideoElement, SafariVideoProps>(function SafariVideo(
  { src, muted = true, preload = "auto", ...props },
  ref,
) {
  useEffect(() => {
    // Attempt to play video on component mount for Safari compatibility
    if (ref && typeof ref === "object" && ref.current) {
      const playAttempt = ref.current.play();
      if (playAttempt !== undefined) {
        playAttempt.catch(() => {
          // Autoplay prevented, Safari requires user interaction or proper attributes
          console.debug("Autoplay prevented, video will play on user interaction");
        });
      }
    }
  }, [ref]);

  return (
    <video
      ref={ref}
      src={src}
      autoPlay
      loop
      muted={muted}
      playsInline
      preload={preload}
      {...props}
    />
  );
});
