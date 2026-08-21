/**
 * submitLead — ToothSafe lead capture
 *
 * Posts to the same Google Apps Script endpoint as wigglytoothworkshop.com.
 *
 * ── WIRE FORMAT: form fields, NOT a JSON body ────────────────────────────
 * The Apps Script reads its input from `e.parameter`, i.e. form fields. It
 * does not parse `e.postData.contents`. Posting a JSON body silently falls
 * through to the doGet handler: the request returns HTTP 200 with the body
 * "Tooth Fairy Workshop signup endpoint is running!" and NOTHING is written
 * to the sheet.
 *
 * That is exactly what this file used to do, and because it also used
 * `mode: "no-cors"` the failure was invisible — the opaque response could
 * not be inspected, so every signup reported success while writing nothing.
 *
 * So: URLSearchParams (which sets the CORS-safelisted content type
 * `application/x-www-form-urlencoded`, avoiding a preflight the Apps Script
 * cannot answer), in normal cors mode, and we read the actual reply. The
 * endpoint returns `{"result":"success"}` and sends
 * `access-control-allow-origin: *`, so the response is readable.
 *
 * Verify a change here by watching for a real row in the sheet — a 200 is
 * not evidence on its own, as the above shows.
 */

import { GOOGLE_SHEETS_ENDPOINT, CONTACT_EMAIL, LEAD_SOURCE } from "./config";

/** Give up rather than leave the button spinning forever. */
const TIMEOUT_MS = 15000;

const GENERIC_ERROR = `Something went wrong. Please try again or email ${CONTACT_EMAIL}.`;

export async function submitLead(
  email: string,
  firstName = ""
): Promise<{ success: boolean; error?: string }> {
  const body = new URLSearchParams({
    email: email.trim().toLowerCase(),
    firstName: firstName.trim(),
    virtue: LEAD_SOURCE, // source identifier, so signups are filterable in the shared sheet
    timestamp: new Date().toISOString(),
  });

  if (GOOGLE_SHEETS_ENDPOINT === "PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE") {
    console.log("[ToothSafe] Lead captured (endpoint not configured):", body.toString());
    console.log(`[ToothSafe] Or email ${CONTACT_EMAIL} to join manually.`);
    return { success: true };
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(GOOGLE_SHEETS_ENDPOINT, {
      method: "POST",
      body, // sets application/x-www-form-urlencoded — do not add a JSON header
      signal: controller.signal,
    });

    if (!res.ok) {
      console.error("[ToothSafe] Lead endpoint returned", res.status);
      return { success: false, error: GENERIC_ERROR };
    }

    const text = await res.text();

    // The doGet fallback means the write did not happen — treat it as failure.
    if (text.includes("endpoint is running")) {
      console.error(
        "[ToothSafe] Endpoint fell through to doGet — the row was NOT written.",
        text
      );
      return { success: false, error: GENERIC_ERROR };
    }

    try {
      const data = JSON.parse(text);
      if (data?.result === "success") return { success: true };
      console.error("[ToothSafe] Endpoint reported failure:", data);
      return { success: false, error: GENERIC_ERROR };
    } catch {
      // Not JSON. Anything other than the doGet fallback is unexpected.
      console.error("[ToothSafe] Unexpected endpoint response:", text.slice(0, 200));
      return { success: false, error: GENERIC_ERROR };
    }
  } catch (err) {
    const aborted = err instanceof Error && err.name === "AbortError";
    console.error("[ToothSafe] Lead submission error:", err);
    return {
      success: false,
      error: aborted
        ? `That took too long. Please try again or email ${CONTACT_EMAIL}.`
        : GENERIC_ERROR,
    };
  } finally {
    clearTimeout(timer);
  }
}
