import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE_URL = "https://tooth-safe.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      // Bump this by hand when the page content actually changes. Using
      // new Date() re-stamps every build and trains Google to ignore lastmod.
      url: `${BASE_URL}/`,
      lastModified: new Date("2026-08-20"),
      changeFrequency: "monthly",
      priority: 1,
    },
    // /confirmed is excluded: disallowed in robots.txt and not worth indexing
  ];
}
