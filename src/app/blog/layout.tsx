import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Blog",
  description:
    "Sigorta dünyasından güncel haberler, ipuçları ve bilgilendirici yazılar. Nexus Sigorta blog sayfası.",
  path: "/blog",
  keywords: [
    "sigorta blog",
    "sigorta haberleri",
    "sigorta rehberi",
    "sigorta ipuçları",
    "trafik sigortası rehberi",
    "kasko rehberi",
  ],
});

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
