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

// ── The short film ──────────────────────────────────────────────────────────
// Hardcoded rather than secret-only: the ID is public and stable, and a missing
// GitHub secret would silently hide the film section (it did — see git history).
export const YOUTUBE_VIDEO_ID =
  process.env.NEXT_PUBLIC_YOUTUBE_VIDEO_ID || "9d0wilzzhnw";

export const FILM = {
  id: YOUTUBE_VIDEO_ID,
  title: "The Tooth Fairy's Secret Workshop",
  fullTitle: "The Tooth Fairy's Secret Workshop | Animated Short Film",
  /** Total runtime in seconds (4:10). Credits roll from 3:54. */
  durationSeconds: 250,
  /** ISO 8601 duration, for VideoObject schema. */
  durationISO: "PT4M10S",
  uploadDate: "2026-06-01T06:19:49-07:00",
  channelUrl: "https://www.youtube.com/@WigglyToothWorkshop",
  watchPageUrl: "https://wigglytoothworkshop.com/watch",
  youtubeUrl: `https://www.youtube.com/watch?v=${YOUTUBE_VIDEO_ID}`,
  poster: "/images/film-poster.webp",
  /** The chapter where the ToothSafe is introduced. */
  toothSafeChapter: {
    label: "The ToothSafe: A Treasure Chest for Teeth",
    startSeconds: 165,
    timestamp: "2:45",
  },
} as const;
