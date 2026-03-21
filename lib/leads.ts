/**
 * submitLead — ToothSafe lead capture
 *
 * Uses the SAME Google Apps Script endpoint as wigglytoothworkshop.com.
 * No changes to the Apps Script are needed — the payload matches exactly:
 *   { email, firstName, virtue, timestamp }
 *
 * The "virtue" field is used here as a source identifier ("toothsafe")
 * so you can filter signups by site in the shared Google Sheet.
 *
 * SETUP:
 * ─────────────────────────────────────────────────────────────────
 * 1. Copy the GOOGLE_SHEETS_ENDPOINT value from wigglytoothworkshop.com's
 *    src/lib/config.ts (or from the Vercel env vars on that project).
 *
 * 2. Add to tooth-safe/.env.local:
 *      NEXT_PUBLIC_GOOGLE_SHEETS_ENDPOINT=<your Apps Script URL>
 *
 * 3. That's it — no changes to the Apps Script needed.
 *
 * RECOMMENDED SHEET IMPROVEMENT (optional):
 * ─────────────────────────────────────────────────────────────────
 * Add a "source" column to your Google Sheet for clarity.
 * In your Apps Script doPost(), add:
 *   sheet.appendRow([data.email, data.firstName, data.virtue, data.timestamp, data.source]);
 * Then both sites can pass source: "toothsafe" / source: "workshop".
 * ─────────────────────────────────────────────────────────────────
 */

import { GOOGLE_SHEETS_ENDPOINT, CONTACT_EMAIL, LEAD_SOURCE } from "./config";

export interface LeadPayload {
  email: string;
  firstName?: string;
  virtue: string;       // used as source identifier for ToothSafe
  timestamp: string;
}

export async function submitLead(
  email: string,
  firstName = ""
): Promise<{ success: boolean; error?: string }> {
  const payload: LeadPayload = {
    email: email.trim().toLowerCase(),
    firstName: firstName.trim(),
    virtue: LEAD_SOURCE,  // "toothsafe" — identifies this signup in the shared sheet
    timestamp: new Date().toISOString(),
  };

  // If endpoint not configured, log in dev and succeed silently
  if (GOOGLE_SHEETS_ENDPOINT === "PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE") {
    console.log("[ToothSafe] Lead captured (endpoint not configured):", payload);
    console.log(`[ToothSafe] Set NEXT_PUBLIC_GOOGLE_SHEETS_ENDPOINT in .env.local`);
    console.log(`[ToothSafe] Or email ${CONTACT_EMAIL} to join manually.`);
    return { success: true };
  }

  try {
    // Apps Script requires no-cors mode — response will be opaque (that's expected)
    await fetch(GOOGLE_SHEETS_ENDPOINT, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    // no-cors always returns opaque response — we assume success if no exception
    return { success: true };
  } catch (err) {
    console.error("[ToothSafe] Lead submission error:", err);
    return {
      success: false,
      error: `Something went wrong. Please try again or email ${CONTACT_EMAIL}.`,
    };
  }
}
