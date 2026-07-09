"use client";

import { forwardRef, useCallback, useEffect, useRef, type VideoHTMLAttributes } from "react";

type SafariVideoProps = VideoHTMLAttributes<HTMLVideoElement> & {
  src: string;
};

export const SafariVideo = forwardRef<HTMLVideoElement, SafariVideoProps>(function SafariVideo(
  { src, muted = true, preload = "auto", onLoadedMetadata, onCanPlay, ...props },
  ref,
) {
  const internalRef = useRef<HTMLVideoElement>(null);
  const videoRef = ref || internalRef;

  const attemptPlay = useCallback(() => {
    const video = typeof videoRef === "object" && videoRef ? videoRef.current : null;
    if (video) {
      console.debug("[SafariVideo] Attempting autoplay", {
        readyState: video.readyState,
        networkState: video.networkState,
        paused: video.paused,
        currentTime: video.currentTime,
      });

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.debug("[SafariVideo] Autoplay succeeded");
          })
          .catch((error) => {
            console.debug("[SafariVideo] Autoplay failed", error.name, error.message);
            // Retry once after a short delay if autoplay fails
            setTimeout(() => {
              const retryVideo = typeof videoRef === "object" && videoRef ? videoRef.current : null;
              if (retryVideo) {
                console.debug("[SafariVideo] Retrying autoplay");
                retryVideo.play().catch((err) => {
                  console.debug("[SafariVideo] Retry failed", err.name);
                });
              }
            }, 100);
          });
      }
    }
  }, [videoRef]);

  useEffect(() => {
    // Attempt playback on mount
    console.debug("[SafariVideo] Component mounted");
    attemptPlay();
  }, [attemptPlay]);

  const handleLoadedMetadata = useCallback(
    (e: React.SyntheticEvent<HTMLVideoElement>) => {
      console.debug("[SafariVideo] Metadata loaded");
      // Trigger play when metadata is loaded
      attemptPlay();
      onLoadedMetadata?.(e);
    },
    [attemptPlay, onLoadedMetadata],
  );

  const handleCanPlay = useCallback(
    (e: React.SyntheticEvent<HTMLVideoElement>) => {
      console.debug("[SafariVideo] Can play event fired");
      // Trigger play when video is ready to play
      attemptPlay();
      onCanPlay?.(e);
    },
    [attemptPlay, onCanPlay],
  );

  return (
    <video
      ref={videoRef}
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
