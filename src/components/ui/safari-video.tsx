"use client";

import { forwardRef, useCallback, useEffect, type VideoHTMLAttributes } from "react";

type SafariVideoProps = VideoHTMLAttributes<HTMLVideoElement> & {
  src: string;
};

export const SafariVideo = forwardRef<HTMLVideoElement, SafariVideoProps>(function SafariVideo(
  { src, muted = true, preload = "auto", onLoadedMetadata, onCanPlay, ...props },
  ref,
) {
  const attemptPlay = useCallback(() => {
    if (ref && typeof ref === "object" && ref.current) {
      const playPromise = ref.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Retry once after a short delay if autoplay fails
          setTimeout(() => {
            if (ref && typeof ref === "object" && ref.current) {
              ref.current.play().catch(() => {
                console.debug("Video autoplay deferred");
              });
            }
          }, 100);
        });
      }
    }
  }, [ref]);

  useEffect(() => {
    // Attempt playback on mount
    attemptPlay();
  }, [attemptPlay]);

  const handleLoadedMetadata = useCallback((e: React.SyntheticEvent<HTMLVideoElement>) => {
    // Trigger play when metadata is loaded
    attemptPlay();
    onLoadedMetadata?.(e);
  }, [attemptPlay, onLoadedMetadata]);

  const handleCanPlay = useCallback((e: React.SyntheticEvent<HTMLVideoElement>) => {
    // Trigger play when video is ready to play
    attemptPlay();
    onCanPlay?.(e);
  }, [attemptPlay, onCanPlay]);

  return (
    <video
      ref={ref}
      src={src}
      autoPlay
      loop
      muted={muted}
      playsInline
      preload={preload}
      onLoadedMetadata={handleLoadedMetadata}
      onCanPlay={handleCanPlay}
      {...props}
    />
  );
});
