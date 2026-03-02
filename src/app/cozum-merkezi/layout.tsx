import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Çözüm Merkezi",
  description:
    "Sigorta işlemleriniz için gerekli belgeler ve başvuru rehberi. Trafik, kasko, sağlık, konut sigortası için gerekli evraklar.",
  path: "/cozum-merkezi",
  keywords: [
    "sigorta evrakları",
    "sigorta başvuru",
    "gerekli belgeler",
    "sigorta rehberi",
    "hasar başvurusu",
  ],
});

export default function CozumMerkeziLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
