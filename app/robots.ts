import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/confirmed", // no value indexing thank-you pages
    },
    sitemap: "https://tooth-safe.com/sitemap.xml",
  };
}
