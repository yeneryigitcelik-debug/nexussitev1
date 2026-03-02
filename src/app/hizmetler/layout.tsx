import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Hizmetlerimiz",
  description:
    "Nexus Sigorta kurumsal ve bireysel sigorta çözümleri. Trafik, kasko, sağlık, konut, hayat ve daha fazlası.",
  path: "/hizmetler",
  keywords: [
    "sigorta hizmetleri",
    "kurumsal sigorta",
    "bireysel sigorta",
    "trafik sigortası",
    "kasko sigortası",
    "sağlık sigortası",
  ],
});

export default function HizmetlerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
