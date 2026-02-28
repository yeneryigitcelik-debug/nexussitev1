import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Nexus Sigorta",
  description: "Sigorta dünyasından güncel haberler, ipuçları ve bilgilendirici yazılar. Nexus Sigorta blog sayfası.",
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
