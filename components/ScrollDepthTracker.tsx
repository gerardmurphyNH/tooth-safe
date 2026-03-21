"use client";

import { useEffect, useRef } from "react";
import { trackScrollDepth } from "@/lib/analytics";

const MILESTONES = [25, 50, 75, 90];

/**
 * ScrollDepthTracker — mounts invisibly in the layout.
 * Fires a GA4 `scroll_depth` event at 25 / 50 / 75 / 90% scroll milestones.
 * Each milestone fires only once per page load.
 */
export default function ScrollDepthTracker() {
  const fired = useRef(new Set<number>());

  useEffect(() => {
    function onScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;

      const pct = Math.round((scrollTop / docHeight) * 100);

      for (const milestone of MILESTONES) {
        if (pct >= milestone && !fired.current.has(milestone)) {
          fired.current.add(milestone);
          trackScrollDepth(milestone);
        }
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null; // renders nothing
}
