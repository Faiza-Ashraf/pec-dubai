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
    onLoadedData,
    onCanPlay,
    onCanPlayThrough,
    ...props
  },
  ref,
) {
  const internalRef = useRef<HTMLVideoElement>(null);
  const retryTimeoutRef = useRef<number | null>(null);
  const startupIntervalRef = useRef<number | null>(null);
  const startupStopTimeoutRef = useRef<number | null>(null);

  const prepareForAutoplay = useCallback(() => {
    const video = internalRef.current;
    if (!video) return null;

    video.autoplay = autoPlay;
    video.loop = loop;
    video.playsInline = true;
    video.setAttribute("playsinline", "true");
    video.setAttribute("webkit-playsinline", "true");

    if (muted) {
      video.muted = true;
      video.defaultMuted = true;
      video.setAttribute("muted", "");
    }

    return video;
  }, [autoPlay, loop, muted]);

  const attemptPlay = useCallback(() => {
    const video = prepareForAutoplay();
    if (!video || !autoPlay || document.visibilityState === "hidden") return;

    if (video.paused && video.readyState === HTMLMediaElement.HAVE_NOTHING) {
      video.load();
    }

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

  const setVideoRef = useCallback(
    (video: HTMLVideoElement | null) => {
      internalRef.current = video;
      applyForwardedRef(ref, video);
      prepareForAutoplay();

      if (video && autoPlay) {
        window.requestAnimationFrame(attemptPlay);
      }
    },
    [attemptPlay, autoPlay, prepareForAutoplay, ref],
  );

  useEffect(() => {
    const stopStartupAttempts = () => {
      if (startupIntervalRef.current !== null) {
        window.clearInterval(startupIntervalRef.current);
        startupIntervalRef.current = null;
      }
      if (startupStopTimeoutRef.current !== null) {
        window.clearTimeout(startupStopTimeoutRef.current);
        startupStopTimeoutRef.current = null;
      }
    };

    const keepStartingUntilPlaying = () => {
      const video = internalRef.current;
      if (!video || !autoPlay) return;

      attemptPlay();

      if (!video.paused && video.currentTime > 0) {
        stopStartupAttempts();
      }
    };

    attemptPlay();
    startupIntervalRef.current = window.setInterval(keepStartingUntilPlaying, 300);
    startupStopTimeoutRef.current = window.setTimeout(stopStartupAttempts, 8000);

    window.addEventListener("pageshow", keepStartingUntilPlaying);
    window.addEventListener("focus", keepStartingUntilPlaying);
    window.addEventListener("scroll", keepStartingUntilPlaying, { passive: true });
    window.addEventListener("resize", keepStartingUntilPlaying);
    window.addEventListener("orientationchange", keepStartingUntilPlaying);
    window.addEventListener("pec:site-loader-hidden", keepStartingUntilPlaying);
    document.addEventListener("visibilitychange", keepStartingUntilPlaying);

    return () => {
      if (retryTimeoutRef.current !== null) {
        window.clearTimeout(retryTimeoutRef.current);
        retryTimeoutRef.current = null;
      }
      stopStartupAttempts();
      window.removeEventListener("pageshow", keepStartingUntilPlaying);
      window.removeEventListener("focus", keepStartingUntilPlaying);
      window.removeEventListener("scroll", keepStartingUntilPlaying);
      window.removeEventListener("resize", keepStartingUntilPlaying);
      window.removeEventListener("orientationchange", keepStartingUntilPlaying);
      window.removeEventListener("pec:site-loader-hidden", keepStartingUntilPlaying);
      document.removeEventListener("visibilitychange", keepStartingUntilPlaying);
    };
  }, [attemptPlay, autoPlay]);

  const handleLoadedMetadata = useCallback(
    (event: SyntheticEvent<HTMLVideoElement>) => {
      attemptPlay();
      onLoadedMetadata?.(event);
    },
    [attemptPlay, onLoadedMetadata],
  );

  const handleLoadedData = useCallback(
    (event: SyntheticEvent<HTMLVideoElement>) => {
      attemptPlay();
      onLoadedData?.(event);
    },
    [attemptPlay, onLoadedData],
  );

  const handleCanPlay = useCallback(
    (event: SyntheticEvent<HTMLVideoElement>) => {
      attemptPlay();
      onCanPlay?.(event);
    },
    [attemptPlay, onCanPlay],
  );

  const handleCanPlayThrough = useCallback(
    (event: SyntheticEvent<HTMLVideoElement>) => {
      attemptPlay();
      onCanPlayThrough?.(event);
    },
    [attemptPlay, onCanPlayThrough],
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
      onLoadedData={handleLoadedData}
      onCanPlay={handleCanPlay}
      onCanPlayThrough={handleCanPlayThrough}
    />
  );
});
