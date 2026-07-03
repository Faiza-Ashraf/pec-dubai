import type { Metadata } from "next";
import { siteMeta } from "@/data/home";

export function buildMetadata(
  title: string,
  description: string,
  path = "/",
): Metadata {
  const url = new URL(path, siteMeta.url).toString();

  return {
    title,
    description,
    metadataBase: new URL(siteMeta.url),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteMeta.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteMeta.name,
    url: siteMeta.url,
    telephone: siteMeta.phone,
    email: siteMeta.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteMeta.address,
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
    areaServed: "Dubai",
    sameAs: [siteMeta.whatsapp],
    description: siteMeta.description,
    serviceType: [
      "Architectural Design",
      "Structural Engineering",
      "MEP Engineering",
      "Authority Approvals",
      "Project Supervision",
    ],
  };
}
