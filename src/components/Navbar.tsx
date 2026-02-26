"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Types & Constants                                                  */
/* ------------------------------------------------------------------ */

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Hakk\u0131m\u0131zda", href: "#about" },
  { label: "Hizmetler", href: "/hizmetler" },
  { label: "\u0130leti\u015fim", href: "#contact" },
];

const PHONE_NUMBER = "+905332516773";
const SCROLL_THRESHOLD = 20;

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const navbarVariants: any = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: EASE },
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const overlayVariants: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.25, ease: "easeIn" },
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mobileMenuVariants: any = {
  hidden: { opacity: 0, x: "100%" },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: EASE },
  },
  exit: {
    opacity: 0,
    x: "100%",
    transition: { duration: 0.3, ease: EASE },
  },
};

const mobileLinkContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.15 },
  },
  exit: {
    transition: { staggerChildren: 0.04, staggerDirection: -1 },
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mobileLinkVariants: any = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: EASE },
  },
  exit: {
    opacity: 0,
    x: 40,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function isActiveLink(href: string, pathname: string): boolean {
  if (href === "/") return pathname === "/";
  if (href.startsWith("#")) return false;
  return pathname.startsWith(href);
}

/* ------------------------------------------------------------------ */
/*  Phone Icon                                                         */
/* ------------------------------------------------------------------ */

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Hamburger Button                                                   */
/* ------------------------------------------------------------------ */

function HamburgerButton({
  isOpen,
  toggle,
}: {
  isOpen: boolean;
  toggle: () => void;
}) {
  return (
    <button
      onClick={toggle}
      aria-label={isOpen ? "Men\u00fcy\u00fc kapat" : "Men\u00fcy\u00fc a\u00e7"}
      aria-expanded={isOpen}
      className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-lg transition-colors hover:bg-black/5 lg:hidden"
    >
      <motion.span
        animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3, ease: EASE }}
        className="block h-[2px] w-5 origin-center bg-dark"
      />
      <motion.span
        animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.2 }}
        className="block h-[2px] w-5 origin-center bg-dark"
      />
      <motion.span
        animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3, ease: EASE }}
        className="block h-[2px] w-5 origin-center bg-dark"
      />
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Navbar Component                                                   */
/* ------------------------------------------------------------------ */

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  /* Scroll listener */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    };
    handleScroll(); // check initial position
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  /* Close mobile menu on route change */
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);
  const toggleMobile = useCallback(() => setMobileOpen((prev) => !prev), []);

  /* ------ Render link element (handles hash vs page links) ------ */
  const renderLink = (
    link: NavLink,
    className: string,
    onClick?: () => void,
  ) => {
    const isHash = link.href.startsWith("#");
    const active = isActiveLink(link.href, pathname);

    const sharedProps = {
      className: `${className} ${active ? "text-brand font-semibold" : ""}`,
      onClick,
    };

    if (isHash) {
      return (
        <a key={link.href} href={link.href} {...sharedProps}>
          {link.label}
        </a>
      );
    }
    return (
      <Link key={link.href} href={link.href} {...sharedProps}>
        {link.label}
      </Link>
    );
  };

  return (
    <>
      <motion.header
        variants={navbarVariants}
        initial="hidden"
        animate="visible"
        className={`fixed inset-x-0 top-0 z-[100] transition-all duration-500 ${
          scrolled
            ? "border-b border-black/[0.04] bg-[#FAFAF8]/80 shadow-[0_1px_12px_rgba(0,0,0,0.04)] backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <nav
          className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10"
          aria-label="Ana gezinme"
        >
          {/* ---- Logo ---- */}
          <Link
            href="/"
            className="relative z-50 flex shrink-0 items-center"
            aria-label="Nexus Sigorta ana sayfa"
          >
            <Image
              src="/logo.png"
              alt="Nexus Sigorta"
              width={200}
              height={100}
              className="h-[36px] w-auto"
              priority
            />
          </Link>

          {/* ---- Desktop Links ---- */}
          <div className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) =>
              renderLink(
                link,
                "relative px-4 py-2 text-[15px] font-medium text-dark/75 transition-colors duration-200 hover:text-dark",
              ),
            )}
          </div>

          {/* ---- Desktop Actions ---- */}
          <div className="hidden items-center gap-3 lg:flex">
            {/* Phone button */}
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-black/[0.06] bg-white text-dark/60 transition-all duration-200 hover:border-brand/30 hover:text-brand hover:shadow-[0_0_0_3px_rgba(232,180,0,0.08)]"
              aria-label="Bizi aray\u0131n"
            >
              <PhoneIcon className="h-[18px] w-[18px]" />
            </a>

            {/* CTA */}
            <Link
              href="#contact"
              className="shine-effect inline-flex h-10 items-center rounded-full bg-brand px-6 text-[14px] font-semibold text-dark shadow-[0_1px_2px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.15)] transition-all duration-300 hover:bg-brand-light hover:shadow-[0_4px_16px_rgba(232,180,0,0.3)]"
            >
              Teklif Al
            </Link>
          </div>

          {/* ---- Mobile Actions ---- */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-black/[0.06] bg-white text-dark/60 transition-colors hover:text-brand"
              aria-label="Bizi aray\u0131n"
            >
              <PhoneIcon className="h-4 w-4" />
            </a>
            <HamburgerButton isOpen={mobileOpen} toggle={toggleMobile} />
          </div>
        </nav>
      </motion.header>

      {/* ---- Mobile Overlay + Menu ---- */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="mobile-backdrop"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={closeMobile}
              className="fixed inset-0 z-[90] bg-dark/40 backdrop-blur-sm lg:hidden"
              aria-hidden="true"
            />

            {/* Panel */}
            <motion.div
              key="mobile-panel"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-y-0 right-0 z-[95] flex w-full max-w-sm flex-col bg-[#FAFAF8] shadow-[-8px_0_30px_rgba(0,0,0,0.08)] lg:hidden"
            >
              {/* Spacer for header height */}
              <div className="h-[72px] shrink-0" />

              {/* Links */}
              <motion.div
                variants={mobileLinkContainerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-1 flex-col gap-1 overflow-y-auto px-6 py-6"
              >
                {NAV_LINKS.map((link) => (
                  <motion.div key={link.href} variants={mobileLinkVariants}>
                    {renderLink(
                      link,
                      `block rounded-xl px-4 py-3.5 font-display text-[22px] font-semibold tracking-tight text-dark/80 transition-colors duration-200 hover:bg-brand/[0.06] hover:text-dark ${
                        isActiveLink(link.href, pathname)
                          ? "!text-brand bg-brand/[0.06]"
                          : ""
                      }`,
                      closeMobile,
                    )}
                  </motion.div>
                ))}

                {/* Divider */}
                <div className="my-4 h-px bg-gradient-to-r from-transparent via-black/[0.06] to-transparent" />

                {/* Mobile CTA */}
                <motion.div variants={mobileLinkVariants}>
                  <Link
                    href="#contact"
                    onClick={closeMobile}
                    className="shine-effect flex h-12 w-full items-center justify-center rounded-full bg-brand text-[15px] font-semibold text-dark shadow-[0_1px_2px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.15)] transition-all duration-300 hover:bg-brand-light hover:shadow-[0_4px_16px_rgba(232,180,0,0.3)]"
                  >
                    Teklif Al
                  </Link>
                </motion.div>

                {/* Mobile phone row */}
                <motion.div variants={mobileLinkVariants} className="mt-2">
                  <a
                    href={`tel:${PHONE_NUMBER}`}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-dark/60 transition-colors hover:bg-black/[0.03] hover:text-dark"
                  >
                    <PhoneIcon className="h-5 w-5" />
                    <span className="text-[15px] font-medium">
                      0533 251 67 73
                    </span>
                  </a>
                </motion.div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer so content is not hidden behind the fixed header */}
      <div className="h-[72px]" />
    </>
  );
}
