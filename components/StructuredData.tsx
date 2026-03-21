/**
 * StructuredData — JSON-LD schema markup for SEO
 *
 * Includes:
 * - WebSite schema (enables Google Sitelinks search box)
 * - Product schema (helps Google understand this is a physical product)
 * - Organization schema (establishes brand identity)
 */
export default function StructuredData() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ToothSafe",
    url: "https://tooth-safe.com",
    description:
      "ToothSafe — a real artifact from the Tooth Fairy's workshop, discovered by a boy named Arlo. A keepsake disc for a child's first lost tooth.",
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
      "A circular keepsake disc for a child's first lost tooth. Made from soft silicone with a personalised back for the child's name and qualities. Part of the Wiggly Tooth Workshop story universe.",
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
    offers: {
      "@type": "Offer",
      url: "https://tooth-safe.com",
      availability: "https://schema.org/PreOrder",
      priceCurrency: "USD",
      price: "0",                      // price TBD — keeps schema valid
      priceValidUntil: "2027-12-31",
      description: "Coming soon — join the waitlist for early access",
      seller: {
        "@type": "Organization",
        name: "ToothSafe",
      },
    },
    isRelatedTo: {
      "@type": "WebSite",
      name: "Wiggly Tooth Workshop",
      url: "https://wigglytoothworkshop.com",
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ToothSafe",
    url: "https://tooth-safe.com",
    logo: "https://tooth-safe.com/images/toothsafe-product.png",
    email: "hello@tooth-safe.com",
    sameAs: ["https://wigglytoothworkshop.com"],
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
    </>
  );
}
