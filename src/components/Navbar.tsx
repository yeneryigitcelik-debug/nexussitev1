"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "Hizmetler", href: "/hizmetler" },
  { label: "Çözüm Merkezi", href: "/cozum-merkezi" },
  { label: "Blog", href: "/blog" },
  { label: "İletişim", href: "#contact" },
];

const PHONE_NUMBER = "+905332516773";
const SCROLL_THRESHOLD = 20;
const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

/* eslint-disable @typescript-eslint/no-explicit-any */
const navbarVariants: any = {
  hidden: { y: -20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: EASE } },
};

const overlayVariants: any = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.25, ease: "easeIn" } },
};

const mobileMenuVariants: any = {
  hidden: { opacity: 0, x: "100%" },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: EASE } },
  exit: { opacity: 0, x: "100%", transition: { duration: 0.3, ease: EASE } },
};

const mobileLinkContainerVariants: any = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
  exit: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
};

const mobileLinkVariants: any = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: EASE } },
  exit: { opacity: 0, x: 40, transition: { duration: 0.2, ease: "easeIn" } },
};
/* eslint-enable @typescript-eslint/no-explicit-any */

function isActiveLink(href: string, pathname: string): boolean {
  if (href === "/") return pathname === "/";
  if (href.startsWith("#")) return false;
  return pathname.startsWith(href);
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function HamburgerButton({ isOpen, toggle }: { isOpen: boolean; toggle: () => void }) {
  return (
    <button onClick={toggle} aria-label={isOpen ? "Menüyü kapat" : "Menüyü aç"} aria-expanded={isOpen}
      className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-lg transition-colors hover:bg-black/5 lg:hidden">
      <motion.span animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} transition={{ duration: 0.3, ease: EASE }} className="block h-[2px] w-5 origin-center bg-black/70" />
      <motion.span animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }} transition={{ duration: 0.2 }} className="block h-[2px] w-5 origin-center bg-black/70" />
      <motion.span animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} transition={{ duration: 0.3, ease: EASE }} className="block h-[2px] w-5 origin-center bg-black/70" />
    </button>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);
  const toggleMobile = useCallback(() => setMobileOpen((prev) => !prev), []);

  const renderLink = (link: NavLink, className: string, onClick?: () => void) => {
    const isHash = link.href.startsWith("#");
    const active = isActiveLink(link.href, pathname);
    const sharedProps = {
      className: `${className} ${active ? "!text-brand font-semibold" : ""}`,
      onClick,
    };
    if (isHash) return <a key={link.href} href={link.href} {...sharedProps}>{link.label}</a>;
    return <Link key={link.href} href={link.href} {...sharedProps}>{link.label}</Link>;
  };

  return (
    <>
      <motion.header
        variants={navbarVariants}
        initial="hidden"
        animate="visible"
        className={`fixed inset-x-0 top-0 z-[100] transition-all duration-500 ${
          scrolled
            ? "border-b border-black/[0.06] bg-white shadow-[0_4px_30px_rgba(0,0,0,0.06)]"
            : "bg-white"
        }`}
      >
        <nav className="mx-auto flex h-[68px] sm:h-[68px] sm:h-[80px] max-w-7xl items-center justify-between px-4 sm:px-8 lg:px-10" aria-label="Ana gezinme">
          <Link href="/" className="relative z-50 flex shrink-0 items-center" aria-label="Nexus Sigorta ana sayfa">
            <Image src="/nexus-logo-master.png" alt="Nexus Sigorta" width={280} height={120} className="h-[40px] sm:h-[52px] w-auto" priority />
          </Link>

          {/* Desktop Links */}
          <div className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) =>
              renderLink(link, "relative px-4 py-2 text-[14px] font-medium text-black/50 transition-colors duration-200 hover:text-black")
            )}
          </div>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 lg:flex">
            <a href={`tel:${PHONE_NUMBER}`}
              className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-black/10 bg-black/[0.03] text-black/50 text-[13px] font-medium transition-all duration-200 hover:border-brand/30 hover:text-brand hover:bg-brand/5"
              aria-label="Bizi arayın">
              <PhoneIcon className="h-[16px] w-[16px]" />
              <span className="hidden xl:inline">0533 251 67 73</span>
            </a>
            <Link href="#contact"
              className="shine-effect inline-flex h-10 items-center rounded-full bg-brand px-6 text-[13px] font-semibold text-white tracking-wide shadow-[0_2px_10px_rgba(212,160,18,0.25)] transition-all duration-300 hover:bg-brand-light hover:shadow-[0_4px_20px_rgba(212,160,18,0.35)]">
              Teklif Al
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 lg:hidden">
            <a href={`tel:${PHONE_NUMBER}`}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-black/50 transition-colors hover:text-brand"
              aria-label="Bizi arayın">
              <PhoneIcon className="h-4 w-4" />
            </a>
            <HamburgerButton isOpen={mobileOpen} toggle={toggleMobile} />
          </div>
        </nav>
      </motion.header>

      {/* Mobile Overlay + Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div key="mobile-backdrop" variants={overlayVariants} initial="hidden" animate="visible" exit="exit"
              onClick={closeMobile} className="fixed inset-0 z-[90] bg-black/30 backdrop-blur-sm lg:hidden" aria-hidden="true" />

            <motion.div key="mobile-panel" variants={mobileMenuVariants} initial="hidden" animate="visible" exit="exit"
              className="fixed inset-y-0 right-0 z-[95] flex w-full max-w-sm flex-col bg-white border-l border-black/[0.06] shadow-[-8px_0_40px_rgba(0,0,0,0.08)] lg:hidden">
              <div className="h-[68px] sm:h-[80px] shrink-0" />
              <motion.div variants={mobileLinkContainerVariants} initial="hidden" animate="visible" exit="exit"
                className="flex flex-1 flex-col gap-1 overflow-y-auto px-6 py-6">
                {NAV_LINKS.map((link) => (
                  <motion.div key={link.href} variants={mobileLinkVariants}>
                    {renderLink(link,
                      `block rounded-xl px-4 py-3.5 font-[family-name:var(--font-syne)] text-[18px] sm:text-[22px] text-black/60 transition-colors duration-200 hover:bg-black/[0.03] hover:text-black ${
                        isActiveLink(link.href, pathname) ? "!text-brand bg-brand/[0.06]" : ""
                      }`,
                      closeMobile,
                    )}
                  </motion.div>
                ))}

                <div className="my-4 h-px bg-gradient-to-r from-transparent via-black/[0.06] to-transparent" />

                <motion.div variants={mobileLinkVariants}>
                  <Link href="#contact" onClick={closeMobile}
                    className="shine-effect flex h-12 w-full items-center justify-center rounded-full bg-brand text-[15px] font-semibold text-white transition-all duration-300 hover:bg-brand-light">
                    Teklif Al
                  </Link>
                </motion.div>

                <motion.div variants={mobileLinkVariants} className="mt-2">
                  <a href={`tel:${PHONE_NUMBER}`}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-black/60 transition-colors hover:bg-black/[0.03] hover:text-black">
                    <PhoneIcon className="h-5 w-5" />
                    <span className="text-[15px] font-medium">0533 251 67 73</span>
                  </a>
                </motion.div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="h-[68px] sm:h-[80px]" />
    </>
  );
}
