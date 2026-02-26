import Image from "next/image";
import Link from "next/link";

const kurumsalLinks = [
  { label: "Hakkımızda", href: "/#about" },
  { label: "Hizmetlerimiz", href: "/hizmetler" },
  { label: "Neden Biz", href: "/#why" },
  { label: "İletişim", href: "/#contact" },
];

const hizmetlerLinks = [
  { label: "Trafik Sigortası", href: "/hizmetler/trafik-sigortasi" },
  { label: "Kasko Sigortası", href: "/hizmetler/kasko" },
  { label: "Sağlık Sigortası", href: "/hizmetler/saglik-sigortasi" },
  { label: "Konut Sigortası", href: "/hizmetler/konut-sigortasi" },
  { label: "Hayat Sigortası", href: "/hizmetler/hayat-sigortasi" },
  { label: "İş Yeri Sigortası", href: "/hizmetler/isyeri-sigortasi" },
];

const yasalLinks = [
  { label: "Gizlilik Politikası", href: "/gizlilik-politikasi" },
  { label: "Kullanım Koşulları", href: "/kullanim-kosullari" },
  { label: "KVKK Aydınlatma Metni", href: "/kvkk" },
  { label: "Çerez Politikası", href: "/cerez-politikasi" },
];

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#111827] text-gray-300">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.png"
                alt="Nexus Sigorta"
                width={160}
                height={48}
                className="h-10 w-auto brightness-0 invert"
              />
            </Link>

            <p className="mt-6 text-sm leading-relaxed text-gray-400 font-[family-name:var(--font-outfit)]">
              10 yılı aşkın sektör deneyimimizle, bireysel ve kurumsal sigorta
              ihtiyaçlarınıza en uygun, güvenilir ve kapsamlı çözümler
              sunuyoruz.
            </p>

            {/* Contact Info */}
            <div className="mt-6 space-y-3">
              <div className="flex items-start gap-3">
                <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#E8B400]" />
                <p className="text-sm text-gray-400 font-[family-name:var(--font-outfit)]">
                  Barbaros Mh. Mor Sümbül Sk. No:5/A, Deluxia Palace
                  K:17/474, Ataşehir/İstanbul
                </p>
              </div>
              <div className="flex items-center gap-3">
                <PhoneIcon className="h-4 w-4 shrink-0 text-[#E8B400]" />
                <a
                  href="tel:+905332516773"
                  className="text-sm text-gray-400 transition-colors hover:text-[#E8B400] font-[family-name:var(--font-outfit)]"
                >
                  +90 533 251 67 73
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MailIcon className="h-4 w-4 shrink-0 text-[#E8B400]" />
                <a
                  href="mailto:info@nexussigorta.com"
                  className="text-sm text-gray-400 transition-colors hover:text-[#E8B400] font-[family-name:var(--font-outfit)]"
                >
                  info@nexussigorta.com
                </a>
              </div>
            </div>

            {/* Social Icons */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://instagram.com/nexussigorta"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-700 text-gray-400 transition-all duration-300 hover:border-[#E8B400] hover:bg-[#E8B400]/10 hover:text-[#E8B400] hover:scale-110"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href="https://youtube.com/@nexussigorta"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-700 text-gray-400 transition-all duration-300 hover:border-[#E8B400] hover:bg-[#E8B400]/10 hover:text-[#E8B400] hover:scale-110"
              >
                <YouTubeIcon className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com/company/nexussigorta"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-700 text-gray-400 transition-all duration-300 hover:border-[#E8B400] hover:bg-[#E8B400]/10 hover:text-[#E8B400] hover:scale-110"
              >
                <LinkedInIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Kurumsal Column */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white font-[family-name:var(--font-syne)]">
              Kurumsal
            </h3>
            <ul className="mt-6 space-y-3">
              {kurumsalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center text-sm text-gray-400 transition-colors hover:text-[#E8B400] font-[family-name:var(--font-outfit)]"
                  >
                    <span className="mr-2 inline-block h-px w-0 bg-[#E8B400] transition-all duration-300 group-hover:w-4" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hizmetler Column */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white font-[family-name:var(--font-syne)]">
              Hizmetler
            </h3>
            <ul className="mt-6 space-y-3">
              {hizmetlerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center text-sm text-gray-400 transition-colors hover:text-[#E8B400] font-[family-name:var(--font-outfit)]"
                  >
                    <span className="mr-2 inline-block h-px w-0 bg-[#E8B400] transition-all duration-300 group-hover:w-4" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Yasal Column */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white font-[family-name:var(--font-syne)]">
              Yasal
            </h3>
            <ul className="mt-6 space-y-3">
              {yasalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center text-sm text-gray-400 transition-colors hover:text-[#E8B400] font-[family-name:var(--font-outfit)]"
                  >
                    <span className="mr-2 inline-block h-px w-0 bg-[#E8B400] transition-all duration-300 group-hover:w-4" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 sm:flex-row lg:px-8">
          <p className="text-xs text-gray-500 font-[family-name:var(--font-outfit)]">
            &copy; 2024 Nexus Sigorta Arac&#305;l&#305;k Hizmetleri. T&uuml;m
            haklar&#305; sakl&#305;d&#305;r.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#E8B400]" />
            <span className="font-[family-name:var(--font-outfit)]">
              Güvenliğiniz İçin Özel Çalışır
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
