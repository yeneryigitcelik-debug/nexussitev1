import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hizmetlerimiz — Nexus Sigorta",
  description: "Nexus Sigorta kurumsal ve bireysel sigorta çözümleri. Trafik, kasko, sağlık, konut, hayat ve daha fazlası.",
};

export default function HizmetlerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
