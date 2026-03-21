import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // ── Static Export (required for GitHub Pages) ──────────────────────────
  output: "export",
  trailingSlash: true, // /confirmed → /confirmed/index.html (GitHub Pages compatible)

  // ── Turbopack root (suppresses lockfile warning) ───────────────────────
  turbopack: {
    root: path.resolve(__dirname),
  },

  // ── Images ──────────────────────────────────────────────────────────────
  images: {
    // Static export does not support Next.js image optimization server.
    // Images are still served, just not auto-optimized.
    unoptimized: true,
  },
};

export default nextConfig;
