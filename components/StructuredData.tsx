import { faqs } from "./FAQ";
import { FILM } from "@/lib/config";

/**
 * StructuredData — JSON-LD schema markup for SEO
 *
 * Includes:
 * - WebSite schema (enables Google Sitelinks search box)
 * - Product schema (helps Google understand this is a physical product)
 * - Organization schema (establishes brand identity)
 * - FAQPage schema (eligible for FAQ rich results / AI Overviews)
 * - VideoObject schema (eligible for video rich results + "Key moments",
 *   with the ToothSafe chapter marked up as a Clip)
 *
 * The FAQ Q&A is imported from FAQ.tsx so the markup can never drift from
 * the visible page text — Google requires the two to match.
 */
export default function StructuredData() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ToothSafe",
    url: "https://tooth-safe.com",
    description:
      "ToothSafe is a keepsake box for a child's first lost tooth — a real artifact from the Tooth Fairy's workshop, discovered by a boy named Arlo.",
    publisher: {
      "@type": "Organization",
      name: "ToothSafe",
      url: "https://tooth-safe.com",
    },
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "ToothSafe",
    description:
      "A keepsake box for a child's first lost tooth. Part of the Wiggly Tooth Workshop story universe.",
    brand: {
      "@type": "Brand",
      name: "ToothSafe",
    },
    url: "https://tooth-safe.com",
    image: "https://tooth-safe.com/images/toothsafe-product.png",
    category: "Toys & Games > Educational Toys",
    audience: {
      "@type": "PeopleAudience",
      suggestedMinAge: 4,
      suggestedMaxAge: 10,
    },
    // NOTE: no `offers` block until pricing is set. A placeholder price of "0"
    // is worse than omitting it — Google will happily surface a $0.00 product.
    // Add the Offer (priceCurrency + price + availability) the day price is known.
    isRelatedTo: {
      "@type": "WebSite",
      name: "Wiggly Tooth Workshop",
      url: "https://wigglytoothworkshop.com",
    },
    // Ties the product to the film it appears in.
    subjectOf: {
      "@type": "VideoObject",
      name: FILM.fullTitle,
      url: FILM.youtubeUrl,
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ToothSafe",
    url: "https://tooth-safe.com",
    logo: "https://tooth-safe.com/images/toothsafe-product.png",
    description:
      "Maker of ToothSafe, the keepsake box for a child's first lost tooth.",
    email: "hello@tooth-safe.com",
    sameAs: ["https://wigglytoothworkshop.com"],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: FILM.fullTitle,
    description:
      "An animated short film. Arlo asks the Tooth Fairy what she actually does with the teeth she collects — and she takes him to her workshop to show him, including the ToothSafe she uses to keep lost teeth safe.",
    thumbnailUrl: [`https://i.ytimg.com/vi/${FILM.id}/maxresdefault.jpg`],
    uploadDate: FILM.uploadDate,
    duration: FILM.durationISO,
    embedUrl: `https://www.youtube-nocookie.com/embed/${FILM.id}`,
    contentUrl: FILM.youtubeUrl,
    publisher: {
      "@type": "Organization",
      name: "Wiggly Tooth Workshop",
      url: "https://wigglytoothworkshop.com",
    },
    // Marks the ToothSafe chapter so Google can surface it as a key moment.
    hasPart: {
      "@type": "Clip",
      name: FILM.toothSafeChapter.label,
      startOffset: FILM.toothSafeChapter.startSeconds,
      endOffset: 234, // credits roll at 3:54
      url: `${FILM.youtubeUrl}&t=${FILM.toothSafeChapter.startSeconds}s`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
      />
    </>
  );
}
