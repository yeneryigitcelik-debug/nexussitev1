import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { JsonLd } from "@/components/JsonLd";
import { TransitionOverlay } from "@/components/TransitionOverlay";
import {
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
  SITE_LOCALE,
  SITE_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  createOrganizationJsonLd,
  createLocalBusinessJsonLd,
} from "@/lib/seo";

const poppins = Poppins({
  variable: "--font-syne",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-space",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "sigorta",
    "nexus sigorta",
    "sigorta aracılık",
    "trafik sigortası",
    "kasko",
    "sağlık sigortası",
    "konut sigortası",
    "hayat sigortası",
    "kurumsal sigorta",
    "bireysel sigorta",
    "İstanbul sigorta",
    "Ataşehir sigorta",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  icons: {
    icon: "/nexuslogoseffaf.png",
    apple: "/nexuslogoseffaf.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: SITE_LOCALE,
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${poppins.variable} ${inter.variable} antialiased`}>
        <JsonLd data={[createOrganizationJsonLd(), createLocalBusinessJsonLd()]} />
        <div className="grain" />
        <TransitionOverlay />
        <Navbar />
        {children}
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
