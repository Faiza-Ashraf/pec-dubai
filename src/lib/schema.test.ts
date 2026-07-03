import { describe, expect, it } from "vitest";
import { buildMetadata, buildOrganizationSchema } from "./schema";

describe("schema helpers", () => {
  it("builds metadata with canonical and open graph data", () => {
    const metadata = buildMetadata("Services | PEC Dubai", "Service detail", "/services");

    expect(metadata.title).toBe("Services | PEC Dubai");
    expect(metadata.alternates?.canonical).toBe("https://www.pecdubai.com/services");
    expect(metadata.openGraph?.url).toBe("https://www.pecdubai.com/services");
  });

  it("returns professional service structured data", () => {
    const schema = buildOrganizationSchema();

    expect(schema["@type"]).toBe("ProfessionalService");
    expect(schema.serviceType).toContain("Structural Engineering");
    expect(schema.address.addressLocality).toBe("Dubai");
  });
});
