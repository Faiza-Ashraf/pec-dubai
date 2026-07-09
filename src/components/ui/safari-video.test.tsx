import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SafariVideo } from "./safari-video";

describe("SafariVideo", () => {
  it("renders Safari-compatible autoplay attributes", () => {
    render(<SafariVideo src="/videos/example.mp4" aria-label="Hero video" />);

    const video = screen.getByLabelText("Hero video");

    expect(video.getAttribute("playsinline")).toBe("true");
    expect(video.getAttribute("webkit-playsinline")).toBe("true");
    expect(video.getAttribute("preload")).toBe("auto");
    expect(video.hasAttribute("muted")).toBe(true);
  });
});
