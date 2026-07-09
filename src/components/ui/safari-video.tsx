import { forwardRef, type VideoHTMLAttributes } from "react";

type SafariVideoProps = VideoHTMLAttributes<HTMLVideoElement> & {
  src: string;
};

export const SafariVideo = forwardRef<HTMLVideoElement, SafariVideoProps>(function SafariVideo(
  { src, muted = true, preload = "auto", ...props },
  ref,
) {
  return (
    <video
      ref={ref}
      src={src}
      autoPlay
      loop
      muted={muted}
      playsInline
      preload={preload}
      webkit-playsinline="true"
      {...props}
    />
  );
});
