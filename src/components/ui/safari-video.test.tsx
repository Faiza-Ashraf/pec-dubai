import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { SafariVideo } from "./safari-video";

describe("SafariVideo", () => {
  it("renders Safari-compatible autoplay attributes", () => {
    const markup = renderToStaticMarkup(
      <SafariVideo src="/videos/example.mp4" aria-label="Hero video" />,
    );

    expect(markup).toContain('playsinline=""');
    expect(markup).toContain('webkit-playsinline="true"');
    expect(markup).toContain('preload="auto"');
    expect(markup).toContain("muted");
  });
});
