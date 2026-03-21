import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Script from "next/script";
import StructuredData from "@/components/StructuredData";
import { GA_MEASUREMENT_ID } from "@/lib/config";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const BASE_URL = "https://tooth-safe.com";

export const metadata: Metadata = {
  // ── Core ─────────────────────────────────────────────────────────────────
  title: {
    default: "ToothSafe — A Discovery by Arlo",
    template: "%s | ToothSafe",
  },
  description:
    "Some things are too important to lose. ToothSafe is a keepsake disc for a child's first lost tooth — a real artifact from the Tooth Fairy's workshop, discovered by a boy named Arlo.",
  keywords: [
    "tooth fairy",
    "lost tooth keepsake",
    "first tooth",
    "tooth fairy gift",
    "child keepsake",
    "tooth safe",
    "baby teeth",
    "toothsafe",
    "wiggly tooth workshop",
    "Arlo",
  ],

  // ── Canonical & Indexing ─────────────────────────────────────────────────
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  // ── Open Graph ───────────────────────────────────────────────────────────
  openGraph: {
    type: "website",
    url: BASE_URL,
    siteName: "ToothSafe",
    title: "ToothSafe — A Discovery by Arlo",
    description:
      "Some things are too important to lose. ToothSafe is a keepsake disc for a child's first lost tooth. Coming soon.",
    images: [
      {
        url: "/images/og-image.png", // 1200×630 — create this later
        width: 1200,
        height: 630,
        alt: "ToothSafe — the keepsake disc for a child's first lost tooth",
      },
    ],
    locale: "en_US",
  },

  // ── Twitter / X ──────────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: "ToothSafe — A Discovery by Arlo",
    description: "Some things are too important to lose. Coming soon.",
    images: ["/images/og-image.png"],
  },

  // ── Icons ─────────────────────────────────────────────────────────────────
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  // ── Verification (add when ready) ────────────────────────────────────────
  // verification: {
  //   google: "YOUR_GOOGLE_SEARCH_CONSOLE_TOKEN",
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <StructuredData />
      </head>
      <body className="min-h-screen bg-deep-blue text-cream">
        {children}

        {/* Google Analytics 4 */}
        {GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== "G-XXXXXXXXXX" && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', {
                  page_title: document.title,
                  send_page_view: true,
                });
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
