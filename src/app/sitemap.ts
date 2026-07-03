import type { MetadataRoute } from "next";
import { siteMeta } from "@/data/home";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/projects", "/services", "/about", "/contact"].map((path) => ({
    url: `${siteMeta.url}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.8,
  }));
}
