import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE_URL = "https://tooth-safe.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    // /confirmed is excluded: disallowed in robots.txt and not worth indexing
  ];
}
