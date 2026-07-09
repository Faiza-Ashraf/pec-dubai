"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  type ForwardedRef,
  type SyntheticEvent,
  type VideoHTMLAttributes,
} from "react";

type SafariVideoProps = VideoHTMLAttributes<HTMLVideoElement> & {
  src: string;
};

function applyForwardedRef<T>(ref: ForwardedRef<T>, value: T | null) {
  if (typeof ref === "function") {
    ref(value);
    return;
  }

  if (ref) {
    ref.current = value;
  }
}

export const SafariVideo = forwardRef<HTMLVideoElement, SafariVideoProps>(function SafariVideo(
  {
    src,
    autoPlay = true,
    loop = true,
    muted = true,
    preload = "auto",
    onLoadedMetadata,
    onCanPlay,
    ...props
  },
  ref,
) {
  const internalRef = useRef<HTMLVideoElement>(null);
  const retryTimeoutRef = useRef<number | null>(null);

  const setVideoRef = useCallback(
    (video: HTMLVideoElement | null) => {
      internalRef.current = video;
      applyForwardedRef(ref, video);
    },
    [ref],
  );

  const prepareForAutoplay = useCallback(() => {
    const video = internalRef.current;
    if (!video) return null;

    video.playsInline = true;
    video.setAttribute("playsinline", "true");
    video.setAttribute("webkit-playsinline", "true");

    if (muted) {
      video.muted = true;
      video.defaultMuted = true;
      video.setAttribute("muted", "");
    }

    return video;
  }, [muted]);

  const attemptPlay = useCallback(() => {
    const video = prepareForAutoplay();
    if (!video || !autoPlay) return;

    const playPromise = video.play();
    if (playPromise === undefined) return;

    playPromise.catch(() => {
      if (retryTimeoutRef.current !== null) {
        window.clearTimeout(retryTimeoutRef.current);
      }

      retryTimeoutRef.current = window.setTimeout(() => {
        const retryVideo = prepareForAutoplay();
        retryVideo?.play().catch(() => {
          // Autoplay can still be blocked by iOS Low Power Mode or user browser settings.
        });
      }, 150);
    });
  }, [autoPlay, prepareForAutoplay]);

  useEffect(() => {
    attemptPlay();

    return () => {
      if (retryTimeoutRef.current !== null) {
        window.clearTimeout(retryTimeoutRef.current);
        retryTimeoutRef.current = null;
      }
    };
  }, [attemptPlay]);

  const handleLoadedMetadata = useCallback(
    (event: SyntheticEvent<HTMLVideoElement>) => {
      attemptPlay();
      onLoadedMetadata?.(event);
    },
    [attemptPlay, onLoadedMetadata],
  );

  const handleCanPlay = useCallback(
    (event: SyntheticEvent<HTMLVideoElement>) => {
      attemptPlay();
      onCanPlay?.(event);
    },
    [attemptPlay, onCanPlay],
  );

  return (
    <video
      {...props}
      ref={setVideoRef}
      src={src}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      playsInline
      webkit-playsinline="true"
      preload={preload}
      onLoadedMetadata={handleLoadedMetadata}
      onCanPlay={handleCanPlay}
    />
  );
});
