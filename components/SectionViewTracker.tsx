"use client";

import { useEffect } from "react";
import { trackSectionView } from "@/lib/analytics";

const SECTION_IDS = [
  "the-story",
  "how-it-works",
  "why-it-matters",
  "the-workshop",
  "the-story-in-motion",
  "join-the-list",
];

/**
 * SectionViewTracker — mounts invisibly in the layout.
 * Uses IntersectionObserver to fire a GA4 `section_view` event the first
 * time each page section scrolls into the viewport.
 */
export default function SectionViewTracker() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            trackSectionView(id);
            observer.unobserve(entry.target); // fire only once per section
          }
        });
      },
      { threshold: 0.3 } // 30% visible before firing
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return null; // renders nothing
}
