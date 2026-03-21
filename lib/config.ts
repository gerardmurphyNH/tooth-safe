/**
 * ToothSafe — Shared Configuration
 *
 * This uses the SAME Google Sheets endpoint as wigglytoothworkshop.com.
 * Both sites write to the same spreadsheet.
 *
 * The Apps Script endpoint expects: { email, firstName, virtue, timestamp }
 * ToothSafe sends: { email, firstName, virtue: "toothsafe", timestamp }
 * so leads from each site are distinguishable in the sheet.
 *
 * See README for Google Sheets setup instructions.
 */

// Google Apps Script Web App URL (shared with wigglytoothworkshop.com)
export const GOOGLE_SHEETS_ENDPOINT =
  process.env.NEXT_PUBLIC_GOOGLE_SHEETS_ENDPOINT ||
  "PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE";

// Google Analytics 4 Measurement ID
export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-8M7LNF6VW7";

// Fallback contact email
export const CONTACT_EMAIL = "hello@tooth-safe.com";

// Source identifier written to the "virtue" column so you can
// filter ToothSafe vs workshop signups in the same sheet.
export const LEAD_SOURCE = "toothsafe";
