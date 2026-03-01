import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

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
  title: "Nexus Sigorta — Güvenliğiniz İçin Özel Çalışır",
  description:
    "Nexus Sigorta Aracılık Hizmetleri - 10 yıllık deneyim ile kurumsal ve bireysel sigorta çözümleri. İstanbul Ataşehir.",
  icons: {
    icon: "/nexuslogoseffaf.png",
    apple: "/nexuslogoseffaf.png",
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
        <div className="grain" />
        <Navbar />
        {children}
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
