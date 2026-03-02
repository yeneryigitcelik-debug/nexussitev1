import type { Metadata } from "next";

// ── Site Constants ──────────────────────────────────────────
export const SITE_NAME = "Nexus Sigorta";
export const SITE_TAGLINE = "Güvenliğiniz İçin Özel Çalışır";
export const SITE_URL = "https://www.nexussigorta.com.tr";
export const SITE_LOCALE = "tr_TR";
export const SITE_DESCRIPTION =
  "Nexus Sigorta Aracılık Hizmetleri - 10 yıllık deneyim ile kurumsal ve bireysel sigorta çözümleri. İstanbul Ataşehir.";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/opengraph-image`;
export const BRAND_COLOR = "#D4A012";

export const BUSINESS_INFO = {
  name: "Nexus Sigorta Aracılık Hizmetleri",
  legalName: "Nexus Sigorta Aracılık Hizmetleri Ltd. Şti.",
  phone: "+905332516773",
  phoneDisplay: "0533 251 67 73",
  email: "info@nexussigorta.com",
  address: {
    street: "Barbaros Mh. Mor Sümbül Sk. No:5/A K:13/379",
    city: "Ataşehir",
    region: "İstanbul",
    postalCode: "34758",
    country: "TR",
  },
  foundingYear: 2014,
  coordinates: { lat: 40.9923, lng: 29.1244 },
  socialLinks: {
    instagram: "https://www.instagram.com/nexussigorta",
    linkedin: "https://www.linkedin.com/company/nexussigorta",
    youtube: "https://www.youtube.com/@nexussigorta",
  },
};

// ── Page Metadata Helper ────────────────────────────────────
interface PageMetadataOptions {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
  noIndex?: boolean;
  keywords?: string[];
}

export function createPageMetadata({
  title,
  description,
  path = "",
  ogImage,
  noIndex = false,
  keywords = [],
}: PageMetadataOptions): Metadata {
  const url = `${SITE_URL}${path}`;
  const image = ogImage || DEFAULT_OG_IMAGE;

  return {
    title,
    description,
    keywords: keywords.length > 0 ? keywords : undefined,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: SITE_LOCALE,
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
        googleBot: { index: false, follow: false },
      },
    }),
  };
}

// ── Article Metadata Helper ─────────────────────────────────
interface ArticleMetadataOptions {
  title: string;
  description: string;
  path: string;
  image: string;
  date: string;
  author: string;
  tags: string[];
  category: string;
}

export function createArticleMetadata({
  title,
  description,
  path,
  image,
  date,
  author,
  tags,
  category,
}: ArticleMetadataOptions): Metadata {
  const url = `${SITE_URL}${path}`;
  const ogImage = image || DEFAULT_OG_IMAGE;

  return {
    title,
    description,
    keywords: tags,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: SITE_LOCALE,
      publishedTime: date,
      authors: [author],
      tags,
      section: category,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

// ── JSON-LD Generators ──────────────────────────────────────

const LOGO_URL = `${SITE_URL}/nexuslogoseffaf.png`;

function buildPostalAddress() {
  return {
    "@type": "PostalAddress" as const,
    streetAddress: BUSINESS_INFO.address.street,
    addressLocality: BUSINESS_INFO.address.city,
    addressRegion: BUSINESS_INFO.address.region,
    postalCode: BUSINESS_INFO.address.postalCode,
    addressCountry: BUSINESS_INFO.address.country,
  };
}

export function createOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    name: BUSINESS_INFO.name,
    legalName: BUSINESS_INFO.legalName,
    url: SITE_URL,
    logo: LOGO_URL,
    description: SITE_DESCRIPTION,
    telephone: BUSINESS_INFO.phone,
    email: BUSINESS_INFO.email,
    foundingDate: String(BUSINESS_INFO.foundingYear),
    sameAs: Object.values(BUSINESS_INFO.socialLinks),
    address: buildPostalAddress(),
  };
}

export function createLocalBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#localbusiness`,
    name: BUSINESS_INFO.name,
    url: SITE_URL,
    telephone: BUSINESS_INFO.phone,
    email: BUSINESS_INFO.email,
    image: LOGO_URL,
    priceRange: "$$",
    address: buildPostalAddress(),
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS_INFO.coordinates.lat,
      longitude: BUSINESS_INFO.coordinates.lng,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
  };
}

export function createServiceJsonLd(service: {
  title: string;
  description: string;
  slug: string;
  image: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    url: `${SITE_URL}/hizmetler/${service.slug}`,
    image: service.image,
    provider: {
      "@type": "InsuranceAgency",
      name: BUSINESS_INFO.name,
      url: SITE_URL,
    },
    areaServed: {
      "@type": "Country",
      name: "Türkiye",
    },
  };
}

export function createArticleJsonLd(post: {
  title: string;
  excerpt: string;
  slug: string;
  image: string;
  date: string;
  author: string;
  tags: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    url: `${SITE_URL}/blog/${post.slug}`,
    image: post.image,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: BUSINESS_INFO.name,
      logo: {
        "@type": "ImageObject",
        url: LOGO_URL,
      },
    },
    keywords: post.tags.join(", "),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
  };
}

export function createBreadcrumbJsonLd(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
