import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Space_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { MobileStickyCta } from "@/components/layout/mobile-sticky-cta";
import { PullToRefresh } from "@/components/layout/pull-to-refresh";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteLoader } from "@/components/layout/site-loader";
import { buildMetadata } from "@/lib/schema";
import "./globals.css";

const displayFont = Cormorant_Garamond({
  variable: "--font-display-source",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const bodyFont = Inter({
  variable: "--font-sans-source",
  subsets: ["latin"],
});

const monoFont = Space_Mono({
  variable: "--font-mono-source",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = buildMetadata(
  "PEC Dubai | Engineering Consultancy and Architecture in Dubai",
  "Architecture, structural, MEP, approvals, and supervision for luxury villas and ambitious developments across Dubai.",
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-[var(--color-canvas)] font-sans text-[var(--color-charcoal)]">
        <SiteLoader />
        <SiteHeader />
        <PullToRefresh />
        {children}
        <SiteFooter />
        <MobileStickyCta />
        <Analytics />
      </body>
    </html>
  );
}

