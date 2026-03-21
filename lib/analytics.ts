/**
 * analytics.ts — GA4 event tracking helpers
 *
 * All events are no-ops when GA4 is not loaded (safe to call anywhere).
 *
 * ── CONVERSION EVENTS (mark these in GA4 → Admin → Events → Conversions) ──
 *   sign_up          — email captured (primary conversion)
 *   outbound_click   — user clicks through to wigglytoothworkshop.com
 *
 * ── ENGAGEMENT EVENTS (use in GA4 Explorations / Audiences) ─────────────
 *   form_start       — user focuses the email field
 *   form_error       — validation failed (with reason)
 *   scroll_depth     — 25 / 50 / 75 / 90 % scroll milestones
 *   section_view     — a section enters the viewport
 *   video_interact   — user clicks into the YouTube embed
 *   cta_click        — any labelled CTA button
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function gtag(...args: unknown[]) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag(...args);
  }
}

// ── Email / Lead capture ─────────────────────────────────────────────────────

/** Fire when a lead is successfully captured. `location` identifies which form. */
export function trackSignupSuccess(location: "hero" | "cta_section" = "hero") {
  gtag("event", "sign_up", {
    method: "email_form",
    event_category: "conversion",
    event_label: `toothsafe_lead_${location}`,
  });
}

/** Fire when the user first focuses the email input. */
export function trackFormStart(location: "hero" | "cta_section" = "hero") {
  gtag("event", "form_start", {
    event_category: "engagement",
    event_label: `email_form_${location}`,
  });
}

/** Fire on client-side validation failure. */
export function trackFormError(reason: string) {
  gtag("event", "form_error", {
    event_category: "engagement",
    event_label: reason,
  });
}

// ── Outbound links ───────────────────────────────────────────────────────────

/**
 * Fire when any outbound link is clicked.
 * GA4 marks `outbound_click` as a recommended conversion event — enable it in
 * Admin → Events → toggle the star next to outbound_click.
 */
export function trackOutboundClick(label: string, destination: string) {
  gtag("event", "outbound_click", {
    event_category: "outbound",
    event_label: label,
    link_url: destination,
    link_domain: new URL(destination).hostname,
  });
}

// ── Scroll depth ─────────────────────────────────────────────────────────────

/** Fire at scroll milestones (25 / 50 / 75 / 90). */
export function trackScrollDepth(percent: number) {
  gtag("event", "scroll_depth", {
    event_category: "engagement",
    event_label: `${percent}%`,
    value: percent,
  });
}

// ── Section visibility ───────────────────────────────────────────────────────

/** Fire when a page section enters the viewport for the first time. */
export function trackSectionView(sectionId: string) {
  gtag("event", "section_view", {
    event_category: "engagement",
    event_label: sectionId,
  });
}

// ── Video ────────────────────────────────────────────────────────────────────

/** Fire when the user clicks into the YouTube embed. */
export function trackVideoInteract(videoTitle: string) {
  gtag("event", "video_interact", {
    event_category: "engagement",
    event_label: videoTitle,
    video_provider: "youtube",
  });
}

// ── Generic CTA ──────────────────────────────────────────────────────────────

export function trackCtaClick(label: string) {
  gtag("event", "cta_click", {
    event_category: "engagement",
    event_label: label,
  });
}
