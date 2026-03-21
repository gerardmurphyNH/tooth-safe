/**
 * analytics.ts — GA4 event tracking helpers
 *
 * Matches the pattern used on wigglytoothworkshop.com.
 * All events are no-ops if GA4 is not loaded.
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

export function trackSignupSuccess() {
  gtag("event", "sign_up", {
    method: "email_form",
    event_category: "engagement",
    event_label: "toothsafe_lead",
  });
}

export function trackFormStart() {
  gtag("event", "form_start", {
    event_category: "engagement",
    event_label: "email_form",
  });
}

export function trackFormError(reason: string) {
  gtag("event", "form_error", {
    event_category: "engagement",
    event_label: reason,
  });
}

export function trackCtaClick(label: string) {
  gtag("event", "cta_click", {
    event_category: "engagement",
    event_label: label,
  });
}
