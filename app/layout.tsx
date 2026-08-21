import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Script from "next/script";
import StructuredData from "@/components/StructuredData";
import ScrollDepthTracker from "@/components/ScrollDepthTracker";
import SectionViewTracker from "@/components/SectionViewTracker";
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

// Viewport / theme-colour (separate from metadata per Next.js 14 spec)
export const viewport: Viewport = {
  themeColor: "#C9A036", // ToothSafe gold — colours the browser chrome on mobile
};

export const metadata: Metadata = {
  // ── Core ─────────────────────────────────────────────────────────────────
  title: {
    default: "ToothSafe — The Tooth Fairy Box That Replaces the Pillow",
    template: "%s | ToothSafe",
  },
  description:
    "A tooth fairy box with a spinning lever: one compartment for the lost tooth, a hidden second one for the coin left behind. No pillow required. Join the waitlist.",
  keywords: [
    "tooth fairy pillow",
    "tooth fairy pillow alternative",
    "tooth fairy box",
    "tooth fairy storage box",
    "tooth fairy toy",
    "tooth fairy money box",
    "lost tooth holder",
    "first lost tooth",
    "what to do with baby teeth",
    "toothsafe",
    "wiggly tooth workshop",
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
    title: "ToothSafe — The Tooth Fairy Box That Replaces the Pillow",
    description:
      "Spin the tooth-shaped lever: one compartment for the lost tooth, a hidden second one for the coin the Tooth Fairy leaves behind. As seen in the animated short film.",
    images: [
      {
        url: "/images/og-image.png", // 1200×630 branded share image
        width: 1200,
        height: 630,
        alt: "ToothSafe — the tooth fairy box with a spinning tooth-shaped lever",
      },
    ],
    locale: "en_US",
  },

  // ── Twitter / X ──────────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: "ToothSafe — The Tooth Fairy Box That Replaces the Pillow",
    description:
      "Spin the tooth-shaped lever: one compartment for the lost tooth, a hidden second one for the coin left behind.",
    images: ["/images/og-image.png"],
  },

  // ── Icons ─────────────────────────────────────────────────────────────────
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" }, // modern browsers
      { url: "/favicon.ico" },                         // fallback
    ],
    shortcut: "/favicon.svg",
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
        <ScrollDepthTracker />
        <SectionViewTracker />
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
