import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Hakkımızda",
  description:
    "2014'ten bu yana İstanbul Ataşehir'de kurumsal ve bireysel sigorta çözümleri sunan Nexus Sigorta'yı tanıyın. 10+ yıl deneyim, 36+ çözüm ortağı.",
  path: "/hakkimizda",
  keywords: [
    "nexus sigorta hakkında",
    "sigorta şirketi",
    "İstanbul sigorta acentesi",
    "Ataşehir sigorta",
    "sigorta aracılık",
  ],
});

export default function HakkimizdaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
