"use client";

import { motion, useInView, AnimatePresence, useMotionValue, useTransform, useSpring, useScroll } from "framer-motion";
import { useRef, useState, useEffect, useCallback, type MouseEvent as ReactMouseEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { services, partners } from "@/lib/services";
import { ServiceIcon } from "@/components/ServiceIcon";
import { MagneticButton } from "@/components/interactions/MagneticButton";
import { ScrambleText } from "@/components/interactions/ScrambleText";
import { OdometerCounter } from "@/components/interactions/OdometerCounter";
import { LiquidBlob } from "@/components/interactions/LiquidBlob";
import { SplitText } from "@/components/animations/SplitText";
import { ParallaxLayer } from "@/components/animations/ParallaxLayer";
import { ScrollMorph } from "@/components/animations/ScrollMorph";


type BezierDef = [number, number, number, number];
const EASE: BezierDef = [0.22, 1, 0.36, 1];

/* eslint-disable @typescript-eslint/no-explicit-any */
const fadeUp: any = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: (d: number) => ({
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.9, delay: d, ease: EASE },
  }),
};

const fadeLeft: any = {
  hidden: { opacity: 0, x: -50, filter: "blur(8px)" },
  visible: (d: number) => ({
    opacity: 1, x: 0, filter: "blur(0px)",
    transition: { duration: 0.9, delay: d, ease: EASE },
  }),
};

const fadeRight: any = {
  hidden: { opacity: 0, x: 50, filter: "blur(8px)" },
  visible: (d: number) => ({
    opacity: 1, x: 0, filter: "blur(0px)",
    transition: { duration: 0.9, delay: d, ease: EASE },
  }),
};

const scaleIn: any = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (d: number) => ({
    opacity: 1, scale: 1,
    transition: { duration: 0.8, delay: d, ease: EASE },
  }),
};
/* eslint-enable @typescript-eslint/no-explicit-any */

/* ─── Counter ─── */
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const dur = 2200, start = performance.now();
    function tick(now: number) {
      const p = Math.min((now - start) / dur, 1);
      setVal(Math.round(target * (1 - Math.pow(1 - p, 4))));
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [inView, target]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ─── Cursor Glow (Lerp-based) ─── */
function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(hover: hover)").matches) return;
    const el = ref.current;
    if (!el) return;
    let mx = 0, my = 0, cx = 0, cy = 0, visible = false;
    const node = el;
    const lerp = 0.08;
    function loop() {
      cx += (mx - cx) * lerp;
      cy += (my - cy) * lerp;
      node.style.left = cx + "px";
      node.style.top = cy + "px";
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
    const move = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; if (!visible) { node.style.opacity = "1"; visible = true; } };
    const leave = () => { node.style.opacity = "0"; visible = false; };
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    return () => { document.removeEventListener("mousemove", move); document.removeEventListener("mouseleave", leave); };
  }, []);
  return <div ref={ref} className="cursor-glow" />;
}

/* ─── Preloader ─── */
function Preloader() {
  const [hidden, setHidden] = useState(false);
  const [gone, setGone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHidden(true), 1600);
    const t2 = setTimeout(() => setGone(true), 2600);
    return () => { clearTimeout(t); clearTimeout(t2); };
  }, []);
  if (gone) return null;
  return (
    <div className={`preloader ${hidden ? "hidden" : ""}`}>
      <div className="text-center">
        <Image src="/nexus-logo-master.png" alt="Nexus Sigorta" width={240} height={100} className="h-[60px] w-auto mx-auto" priority />
        <div className="preloader-bar">
          <div className="preloader-bar-fill" />
        </div>
        <p className="mt-6 text-[11px] uppercase tracking-[5px] text-text-muted font-medium">Yükleniyor</p>
      </div>
    </div>
  );
}

/* ─── 3D Tilt Card (disabled on touch devices) ─── */
function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 25 });
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(!window.matchMedia("(hover: hover)").matches);
  }, []);

  function handleMove(e: ReactMouseEvent) {
    if (isTouch) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function handleLeave() { x.set(0); y.set(0); }

  return (
    <motion.div
      style={isTouch ? {} : { rotateX, rotateY, transformPerspective: 1000, transformStyle: "preserve-3d" }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Bento Card Mouse Tracker ─── */
function useBentoMouse(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
      el.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
    };
    el.addEventListener("mousemove", move);
    return () => el.removeEventListener("mousemove", move);
  }, [ref]);
}

/* ─── Hero Slides ─── */
const heroSlides = [
  {
    title: "Güvenliğiniz İçin",
    highlight: "Özel Çalışır.",
    desc: "36 çözüm ortağı ile kurumsal ve bireysel sigorta çözümleriyle geleceğinizi güvence altına alır.",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1920&q=80",
    badge: "10+ Yıllık Deneyim",
  },
  {
    title: "Profesyonel",
    highlight: "Sigorta Danışmanlığı",
    desc: "10 yılı aşkın deneyimimizle en uygun poliçeyi sizin için buluyoruz.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&q=80",
    badge: "36 Çözüm Ortağı",
  },
  {
    title: "Her An",
    highlight: "Yanınızdayız.",
    desc: "Hasar sürecinden poliçe yenilemeye kadar 7/24 profesyonel destek.",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1920&q=80",
    badge: "7/24 Destek",
  },
];

const imageVariants = [
  { initial: { scale: 1.15, x: 20 }, animate: { scale: 1.05, x: -10 } },
  { initial: { scale: 1.2, y: 15 }, animate: { scale: 1.05, y: -10 } },
  { initial: { scale: 1.1, x: -15 }, animate: { scale: 1.15, x: 10 } },
];

const SLIDE_DURATION = 6000;

/* ─── Testimonials ─── */
const testimonials = [
  {
    name: "Ahmet Yılmaz",
    role: "Şirket Sahibi",
    text: "Nexus Sigorta ile çalışmaya başladığımızdan beri tüm sigorta süreçlerimiz çok daha hızlı ve profesyonel ilerliyor. Hasar sürecinde gösterdikleri ilgi gerçekten takdire şayan.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
  },
  {
    name: "Elif Demir",
    role: "Pazarlama Direktörü",
    text: "Grup sağlık sigortamız için aldığımız hizmet mükemmel. Çalışanlarımız çok memnun. Her konuda bize özel çözümler sunuyorlar.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
  },
  {
    name: "Mehmet Kaya",
    role: "İnşaat Mühendisi",
    text: "Mühendislik sigortalarında son derece bilgili ve profesyonel bir ekip. Projelerimiz için en doğru teminatları buldular.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
  },
];

/* ─── Process Steps ─── */
const processSteps = [
  { num: "01", title: "İhtiyaç Analizi", desc: "Sizinle detaylı görüşerek sigorta ihtiyaçlarınızı belirliyoruz." },
  { num: "02", title: "Teklif Karşılaştırma", desc: "36 firmadan en uygun teklifleri sizin için topluyoruz." },
  { num: "03", title: "Poliçe Düzenleme", desc: "Size en uygun poliçeyi hızlıca düzenliyoruz." },
];

/* ─── Bento Services ─── */
const bentoServices = [
  { title: "Trafik & Kasko", desc: "Araç sigortalarında en uygun fiyat garantisi", icon: "car", slug: "trafik-sigortasi", image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80", highlight: "En Popüler" },
  { title: "Sağlık Sigortası", desc: "Bireysel ve kurumsal sağlık güvencesi", icon: "heart", slug: "saglik-sigortasi", image: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=800&q=80", highlight: "Kapsamlı" },
  { title: "İş Yeri Sigortası", desc: "İşletmenizi tüm risklere karşı koruyun", icon: "building", slug: "isyeri-sigortasi", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80", highlight: "Kurumsal" },
  { title: "Konut Sigortası", desc: "Eviniz ve eşyalarınız güvence altında", icon: "home", slug: "konut-sigortasi", image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80", highlight: "Bireysel" },
];

/* ─── Marquee Items ─── */
const marqueeTop = [
  "Sigorta Çözümleri", "Kurumsal Hizmetler", "Bireysel Poliçeler", "Trafik Sigortası",
  "Sağlık Güvencesi", "Kasko Sigortası", "Konut Koruması", "Hayat Sigortası",
];
const marqueeBottom = [
  "Profesyonel Danışmanlık", "Hasar Yönetimi", "Poliçe Analizi", "Risk Değerlendirme",
  "Teklif Karşılaştırma", "7/24 Destek", "Hızlı Çözüm", "Güvenilir Hizmet",
];

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activePartner, setActivePartner] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const heroRef = useRef(null);
  const progressRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* Hero parallax */
  const { scrollYProgress: heroScrollY } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroContentY = useTransform(heroScrollY, [0, 1], [0, 80]);
  const heroContentOpacity = useTransform(heroScrollY, [0, 0.5], [1, 0]);

  const goToSlide = useCallback((i: number) => {
    setActiveSlide(i);
    progressRef.current = 0;
    setProgress(0);
  }, []);

  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
      return;
    }
    progressRef.current = 0;
    setProgress(0);
    timerRef.current = setInterval(() => {
      progressRef.current += 100 / (SLIDE_DURATION / 50);
      if (progressRef.current >= 100) {
        progressRef.current = 0;
        setActiveSlide((prev) => (prev + 1) % heroSlides.length);
        setProgress(0);
      } else {
        setProgress(progressRef.current);
      }
    }, 50);
    return () => { if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; } };
  }, [isPaused, activeSlide]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  /* Brand reveal scroll */
  const brandRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  const { scrollYProgress: brandScrollY } = useScroll({
    target: brandRef,
    offset: ["start start", "end end"],
  });
  /* On mobile: all values default to fully visible (no scroll animation) */
  const brandTitleOpacity = useTransform(brandScrollY, [0.02, 0.15], isMobile ? [1, 1] : [0, 1]);
  const brandTitleY = useTransform(brandScrollY, [0.02, 0.15], isMobile ? [0, 0] : [40, 0]);
  const brandSubOpacity = useTransform(brandScrollY, [0.1, 0.25], isMobile ? [1, 1] : [0, 1]);
  const brandGlowScale = useTransform(brandScrollY, [0, 0.25, 0.5], isMobile ? [0, 0, 0] : [0.5, 1.2, 0.6]);
  const brandGlowOpacity = useTransform(brandScrollY, [0.15, 0.35, 0.55], isMobile ? [0, 0, 0] : [0, 0.6, 0]);
  const brandGridOpacity = useTransform(brandScrollY, [0.35, 0.55], isMobile ? [1, 1] : [0, 1]);
  const brandGridScale = useTransform(brandScrollY, [0.35, 0.55], isMobile ? [1, 1] : [0.92, 1]);
  const brandGridY = useTransform(brandScrollY, [0.35, 0.55], isMobile ? [0, 0] : [60, 0]);

  const slide = heroSlides[activeSlide];

  return (
    <>
      <Preloader />
      <CursorGlow />
      <div className="grain" />
      <main>

        {/* ═══════════════════════════════════════════════════════
            HERO — Ephorsite-style fullscreen slider
            ═══════════════════════════════════════════════════════ */}
        <section
          ref={heroRef}
          id="hero"
          className="relative min-h-screen flex items-start overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Background image with Ken Burns */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`bg-${activeSlide}`}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 1.4, ease: EASE }}
              className="absolute inset-0 z-0"
            >
              <motion.div
                initial={imageVariants[activeSlide].initial}
                animate={imageVariants[activeSlide].animate}
                transition={{ duration: SLIDE_DURATION / 1000 + 1, ease: "linear" }}
                className="absolute inset-0"
              >
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority={activeSlide === 0}
                  unoptimized
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Layered overlays — fixed, outside AnimatePresence */}
          <div className="absolute inset-0 bg-white/60 z-[0]" />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-white/25 z-[0]" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/50 z-[0]" />
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-brand/[0.03] to-transparent z-[0]" />

          {/* Fine grid overlay */}
          <div
            className="absolute inset-0 z-[1] opacity-[0.015]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(212,160,18,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,160,18,0.3) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          {/* Content */}
          <motion.div
            style={{ y: heroContentY, opacity: heroContentOpacity }}
            className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 pt-[15px] lg:pt-[35px] pb-20 w-full"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left content — 7 cols */}
              <div className="lg:col-span-7">
                {/* Animated badge — fixed height container */}
                <div className="relative h-[44px] mb-8">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`badge-${activeSlide}`}
                      initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -10, filter: "blur(8px)" }}
                      transition={{ duration: 0.6, ease: EASE }}
                      className="absolute inset-0"
                    >
                      <span className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-brand/15 bg-brand/[0.06] text-sm font-medium text-brand-dark backdrop-blur-sm">
                        <span className="relative flex h-2 w-2">
                          <span className="absolute inset-[-3px] rounded-full border border-brand/50" style={{ animation: "ping-slow 2.5s ease-out infinite" }} />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-brand" />
                        </span>
                        {slide.badge}
                      </span>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Animated heading — fixed height container */}
                <div className="relative h-[110px] sm:h-[140px] md:h-[200px] lg:h-[230px] xl:h-[270px] overflow-visible">
                  <AnimatePresence mode="wait">
                    <motion.h1
                      key={`title-${activeSlide}`}
                      className="absolute inset-x-0 top-0 font-[family-name:var(--font-syne)] text-[2rem] sm:text-4xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-extrabold leading-[1.25] tracking-tight pb-2"
                    >
                      <motion.span
                        initial={{ opacity: 0, y: 80, filter: "blur(12px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -30, filter: "blur(6px)" }}
                        transition={{ duration: 0.8, ease: EASE }}
                        className="block text-black"
                      >
                        {slide.title}
                      </motion.span>
                      <motion.span
                        initial={{ opacity: 0, y: 80, filter: "blur(12px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -30, filter: "blur(6px)" }}
                        transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
                        className="block gradient-text"
                      >
                        {slide.highlight}
                      </motion.span>
                    </motion.h1>
                  </AnimatePresence>
                </div>

                {/* Animated subtitle — fixed height container */}
                <div className="relative h-[90px] sm:h-[80px] md:h-[72px] mt-14 sm:mt-16 md:mt-18">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={`sub-${activeSlide}`}
                      initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -15, filter: "blur(4px)" }}
                      transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
                      className="absolute inset-0 max-w-xl text-base sm:text-lg md:text-xl text-black/65 leading-relaxed glass-block"
                    >
                      {slide.desc}
                    </motion.p>
                  </AnimatePresence>
                </div>

                {/* CTA buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                  className="mt-10 flex flex-col sm:flex-row items-start gap-4"
                >
                  <MagneticButton strength={0.3}>
                    <Link href="/hizmetler" className="btn-primary shine-effect">
                      <span>Hizmetleri Keşfet</span>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
                    </Link>
                  </MagneticButton>
                  <MagneticButton strength={0.3}>
                    <a href="#contact" className="btn-outline">
                      <span>Teklif Alın</span>
                    </a>
                  </MagneticButton>
                </motion.div>
              </div>

              {/* Right — Slide thumbnails (Desktop) */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="lg:col-span-5 hidden lg:flex flex-col gap-3"
              >
                {heroSlides.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => goToSlide(i)}
                    className={`group relative flex items-center gap-4 p-3.5 rounded-xl text-left transition-all duration-500 ${
                      i === activeSlide
                        ? "bg-brand/[0.06] border border-brand/20 shadow-lg shadow-brand/5"
                        : "bg-transparent border border-transparent hover:bg-black/[0.03] hover:border-black/[0.06]"
                    }`}
                  >
                    {/* Thumbnail */}
                    <div className={`relative w-20 h-14 rounded-lg overflow-hidden flex-shrink-0 transition-all duration-500 ${
                      i === activeSlide
                        ? "ring-2 ring-brand/40 shadow-lg shadow-brand/10"
                        : "opacity-40 group-hover:opacity-70 grayscale group-hover:grayscale-0"
                    }`}>
                      <Image src={s.image} alt={s.title} fill className="object-cover" unoptimized sizes="80px" />
                      {i !== activeSlide && <div className="absolute inset-0 bg-white/40" />}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-semibold truncate transition-colors duration-300 ${
                        i === activeSlide ? "text-brand" : "text-black/40 group-hover:text-black/60"
                      }`}>
                        {s.highlight}
                      </p>
                      <p className="text-xs text-black/50 truncate mt-0.5">{s.title}</p>
                    </div>

                    {/* Progress bar for active */}
                    {i === activeSlide && (
                      <div className="absolute bottom-0 left-3.5 right-3.5 h-[2px] rounded-full bg-black/[0.04] overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-brand to-brand-light rounded-full"
                          style={{ width: `${progress}%`, transition: "width 0.05s linear" }}
                        />
                      </div>
                    )}
                  </button>
                ))}
              </motion.div>
            </div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="mt-16"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {[
                  { val: 100, suffix: "+", label: "Memnun Müşteri", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" },
                  { val: 36, suffix: "", label: "Çözüm Ortağı", icon: "M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" },
                  { val: 98, suffix: "%", label: "Müşteri Memnuniyeti", icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" },
                  { val: 10, suffix: "+", label: "Yıl Deneyim", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
                ].map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.6 + i * 0.15 }}
                    className="stat-card group flex flex-col items-center gap-3 py-6 px-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-brand/10 border border-brand/15 flex items-center justify-center mb-1 group-hover:scale-110 group-hover:bg-brand/15 transition-all duration-500">
                      <svg className="w-5 h-5 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={s.icon} />
                      </svg>
                    </div>
                    <span className="font-[family-name:var(--font-syne)] text-4xl md:text-5xl font-extrabold gradient-text tabular-nums">
                      <OdometerCounter target={s.val} suffix={s.suffix} />
                    </span>
                    <span className="text-xs text-black/35 font-medium tracking-widest uppercase glass-capsule !py-1.5 !px-4 !gap-0">
                      {s.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Mobile slide indicators — enlarged tap targets */}
            <div className="flex lg:hidden justify-center gap-3 mt-10">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  className="relative h-2 rounded-full overflow-hidden transition-all duration-500"
                  style={{ width: i === activeSlide ? 48 : 20, minHeight: 44, paddingTop: 20, paddingBottom: 20, marginTop: -20, marginBottom: -20 }}
                >
                  <div className="absolute inset-0 bg-black/10 rounded-full" />
                  {i === activeSlide && (
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-brand to-brand-light rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  )}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-[10px] uppercase tracking-[0.2em] text-black/50 font-medium">Keşfet</span>
              <div className="w-5 h-9 rounded-full border border-brand/20 flex items-start justify-center p-1.5">
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="w-1 h-2 rounded-full bg-brand"
                />
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            MARQUEE — Dual-direction text scroll
            ═══════════════════════════════════════════════════════ */}
        <div className="relative py-6 overflow-hidden border-y border-black/[0.04] bg-surface-warm">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-surface-warm to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-surface-warm to-transparent z-10" />

          {/* Top row — scrolls left */}
          <div className="mb-4">
            <div className="flex animate-marquee-left whitespace-nowrap">
              {[...marqueeTop, ...marqueeTop, ...marqueeTop, ...marqueeTop].map((item, i) => (
                <span
                  key={`t-${i}`}
                  className="flex items-center gap-3 sm:gap-5 mx-4 sm:mx-6 text-sm sm:text-lg font-[family-name:var(--font-syne)] font-bold text-black/35 hover:text-brand/60 transition-colors duration-500 select-none"
                >
                  {item}
                  <span className="w-2 h-2 rounded-full bg-brand/15 flex-shrink-0" />
                </span>
              ))}
            </div>
          </div>

          {/* Bottom row — scrolls right */}
          <div>
            <div className="flex animate-marquee-right whitespace-nowrap">
              {[...marqueeBottom, ...marqueeBottom, ...marqueeBottom, ...marqueeBottom].map((item, i) => (
                <span
                  key={`b-${i}`}
                  className="flex items-center gap-3 sm:gap-5 mx-4 sm:mx-6 text-sm sm:text-lg font-[family-name:var(--font-syne)] font-bold text-black/50 hover:text-brand/70 transition-colors duration-500 select-none"
                >
                  {item}
                  <svg className="w-3 h-3 text-brand/10 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  </svg>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════
            SERVICES — Bento Grid with mouse-position glow
            ═══════════════════════════════════════════════════════ */}
        <section className="py-16 lg:py-24 bg-surface-2 relative overflow-hidden">
          <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />

          {/* Ambient orbs */}
          <ParallaxLayer speed={0.2} className="absolute top-[-200px] right-[-200px] pointer-events-none">
            <div className="w-[600px] h-[600px] rounded-full bg-brand/[0.03] blur-[150px]" style={{ animation: "aurora-slow 18s ease-in-out infinite" }} />
          </ParallaxLayer>
          <ScrollMorph className="absolute bottom-[-100px] left-[-50px] pointer-events-none" size={400} color="rgba(212, 160, 18, 0.04)" />

          <div className="container mx-auto px-6 lg:px-8 max-w-7xl relative z-10">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} className="text-center mb-16 heading-decor">
              <div className="heading-ring" />
              <span className="section-label justify-center mb-5 block"><ScrambleText text="Hizmetlerimiz" trigger="inView" /></span>
              <h2 className="font-[family-name:var(--font-syne)] text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-black font-bold leading-tight mb-4">
                <SplitText mode="words" delay={0.1}>Size özel sigorta çözümleri</SplitText>
              </h2>
              <p className="text-black/60 max-w-lg mx-auto glass-block inline-block">Kurumsal ve bireysel tüm sigorta ihtiyaçlarınız için kapsamlı paketler sunuyoruz.</p>
            </motion.div>

            {/* 2x2 Bento Grid with 3D Tilt */}
            <div className="grid md:grid-cols-2 gap-5">
              {bentoServices.map((svc, i) => (
                <motion.div key={svc.slug} variants={scaleIn} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.1}>
                  <TiltCard>
                    <BentoServiceCard svc={svc} index={i} />
                  </TiltCard>
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.3} className="text-center mt-12">
              <Link href="/hizmetler" className="btn-outline inline-flex text-sm">
                Tüm Hizmetleri Gör
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </motion.div>
          </div>
        </section>

        <div className="section-divider" />

        {/* ═══════════════════════════════════════════════════════
            ABOUT — Ephorsite-style with floating badges
            ═══════════════════════════════════════════════════════ */}
        <section id="about" className="py-28 lg:py-40 bg-white scroll-mt-20 relative overflow-hidden">
          <ParallaxLayer speed={0.15} className="absolute bottom-0 right-0 pointer-events-none">
            <div className="w-[700px] h-[700px] rounded-full bg-brand/[0.03] blur-[150px]" />
          </ParallaxLayer>

          <div className="container mx-auto px-6 lg:px-8 max-w-7xl relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              {/* Left — Visual with floating badges */}
              <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.1}
                className="relative">
                <div className="relative aspect-square rounded-2xl overflow-hidden border border-black/[0.04] shadow-2xl shadow-black/10">
                  <Image
                    src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=85"
                    alt="Nexus Sigorta profesyonel danışmanlık"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </div>

                {/* Floating badges */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="absolute -top-4 -right-4 glass-card-deep px-5 py-3 rounded-xl shadow-xl z-10"
                  style={{ animation: "float-gentle 4s ease-in-out infinite" }}
                >
                  <span className="font-[family-name:var(--font-syne)] text-lg font-bold gradient-text">10+</span>
                  <span className="text-xs text-black/60 block">Yıllık Deneyim</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.6, ease: EASE }}
                  className="absolute -bottom-4 -left-4 glass-card-deep px-5 py-3 rounded-xl shadow-xl z-10"
                  style={{ animation: "float-gentle 4s ease-in-out infinite 2s" }}
                >
                  <span className="font-[family-name:var(--font-syne)] text-lg font-bold gradient-text">36+</span>
                  <span className="text-xs text-black/60 block">Çözüm Ortağı</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.6, ease: EASE }}
                  className="absolute top-1/2 -right-6 glass-card-deep px-4 py-3 rounded-xl shadow-xl hidden lg:block z-10"
                  style={{ animation: "float-gentle 4s ease-in-out infinite 4s" }}
                >
                  <span className="font-[family-name:var(--font-syne)] text-lg font-bold text-green-600">%98</span>
                  <span className="text-xs text-black/60 block">Memnuniyet</span>
                </motion.div>

                {/* Corner accent lines */}
                <div className="corner-accent-tl" />
                <div className="corner-accent-br" />
              </motion.div>

              {/* Right — Content */}
              <motion.div variants={fadeRight} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.15}>
                <div className="heading-side-line">
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand/15 bg-brand/[0.06] text-sm font-medium text-brand-dark mb-6">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                    </svg>
                    Hakkımızda
                  </span>

                  <h2 className="font-[family-name:var(--font-syne)] text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-black font-bold leading-[1.05] mb-6">
                    Güvence altındaki{" "}
                    <em className="gradient-text not-italic">geleceğiniz</em>
                  </h2>
                </div>

                <div className="glass-block mb-4">
                  <p className="text-lg text-black/65 leading-relaxed">
                    Nexus Sigorta olarak, 10 yılı aşkın deneyimimizle müşterilerimize en uygun
                    sigorta çözümlerini sunuyoruz. <span className="glass-capsule-gold !py-1 !px-3 !text-sm !rounded-lg text-brand-dark font-medium">36 çözüm ortağı</span> firmamız ile birlikte çalışarak,
                    her müşterimize özel poliçeler hazırlıyoruz.
                  </p>
                </div>
                <p className="text-black/60 leading-relaxed mb-8">
                  Doğru poliçe seçimi, güvene alınan değerlerin korunması ve uygun zamanlama
                  ile müşteri memnuniyetini ön planda tutuyoruz.
                </p>

                <div className="flex flex-wrap gap-4 mb-10">
                  <Link
                    href="/hakkimizda"
                    className="btn-primary shine-effect"
                  >
                    <span>Devamını Gör</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
                  </Link>
                  <Link
                    href="/hizmetler"
                    className="btn-outline"
                  >
                    <span>Tüm Hizmetleri Gör</span>
                  </Link>
                </div>

                {/* Feature grid 2x2 */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { title: "Kapsamlı Koruma", desc: "Her risk için doğru poliçe", color: "from-emerald-500/15 to-emerald-600/10", borderColor: "border-emerald-500/15", iconColor: "text-emerald-500", icon: "shield" },
                    { title: "Uzman Kadro", desc: "Deneyimli ekibimiz", color: "from-brand/15 to-brand-dark/10", borderColor: "border-brand/15", iconColor: "text-brand", icon: "users" },
                    { title: "Hızlı Süreç", desc: "Kolay ve hızlı işlem", color: "from-amber-500/15 to-amber-600/10", borderColor: "border-amber-500/15", iconColor: "text-amber-500", icon: "activity" },
                    { title: "Güvenilir Hizmet", desc: "10+ yıl sektör deneyimi", color: "from-purple-500/15 to-purple-600/10", borderColor: "border-purple-500/15", iconColor: "text-purple-500", icon: "globe" },
                  ].map((feat, i) => (
                    <motion.div
                      key={feat.title}
                      variants={scaleIn}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      custom={0.3 + i * 0.1}
                      className="group p-4 rounded-xl bg-white border border-black/[0.04] hover:border-brand/20 hover:shadow-lg hover:shadow-brand/5 transition-all duration-500 hover-lift"
                    >
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${feat.color} border ${feat.borderColor} flex items-center justify-center ${feat.iconColor} mb-3 group-hover:scale-110 transition-transform duration-500`}>
                        <ServiceIcon name={feat.icon} />
                      </div>
                      <h4 className="font-[family-name:var(--font-syne)] font-bold text-sm text-black/80 mb-1">{feat.title}</h4>
                      <p className="text-xs text-black/55 leading-relaxed">{feat.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* ═══════════════════════════════════════════════════════
            PROCESS — How It Works
            ═══════════════════════════════════════════════════════ */}
        <section className="py-28 lg:py-40 bg-surface-2 relative overflow-hidden">
          <div className="absolute bottom-[-100px] left-[-100px] w-[400px] h-[400px] rounded-full bg-brand/[0.02] blur-[120px] pointer-events-none animate-aurora" />

          <div className="container mx-auto px-6 lg:px-8 max-w-7xl relative z-10">
            <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-24 items-center">
              {/* Left — Content */}
              <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.1}>
                <div className="heading-side-line">
                  <span className="section-label mb-6 block"><ScrambleText text="Nasıl Çalışıyoruz" trigger="inView" /></span>
                  <h2 className="font-[family-name:var(--font-syne)] text-3xl sm:text-4xl lg:text-5xl text-black font-bold leading-[1.05] mb-6">
                    <SplitText mode="words" delay={0.1}>3 adımda sigorta çözümü</SplitText>
                  </h2>
                  <p className="text-black/60 text-lg leading-relaxed mb-0 glass-block">
                    Sigorta sürecinizi en verimli şekilde yönetmek için profesyonel bir yaklaşım izliyoruz.
                  </p>
                </div>
                <div className="h-10" />

                <div className="space-y-5">
                  {processSteps.map((step, i) => (
                    <motion.div
                      key={i}
                      variants={fadeLeft}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      custom={0.2 + i * 0.1}
                      className="group flex gap-5 p-5 rounded-2xl glass-card"
                    >
                      <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-brand/10 border border-brand/15 flex items-center justify-center group-hover:bg-brand group-hover:border-brand transition-all duration-500">
                        <span className="font-[family-name:var(--font-syne)] text-lg font-bold text-brand group-hover:text-white transition-colors">{step.num}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-black/80 text-base mb-1">{step.title}</h3>
                        <p className="text-sm text-black/55">{step.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Right — Visual */}
              <motion.div variants={fadeRight} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.2}
                className="relative hidden lg:block">
                <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl shadow-black/10">
                  <Image
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=85"
                    alt="Profesyonel danışmanlık süreci"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </div>
                {/* Floating notification card */}
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-6 -left-8 rounded-2xl p-6 shadow-2xl max-w-[280px] bg-white border border-black/[0.06]"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>
                    </div>
                    <div>
                      <p className="text-black/80 text-sm font-semibold">Poliçe Onaylandı</p>
                      <p className="text-black/50 text-xs">Az önce</p>
                    </div>
                  </div>
                  <span className="glass-capsule-gold !py-1.5 !px-3 !text-xs !rounded-lg text-black/60">Kasko sigortanız başarıyla düzenlendi.</span>
                </motion.div>

                {/* Corner accents */}
                <div className="corner-accent-tl" />
                <div className="corner-accent-br" />
              </motion.div>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* ═══════════════════════════════════════════════════════
            BRAND REVEAL — Scroll-driven partners section
            ═══════════════════════════════════════════════════════ */}
        <section ref={brandRef} className="relative h-auto md:h-[180vh]">
          <div className="py-20 md:py-0 md:sticky md:top-0 md:h-screen flex items-center justify-center overflow-hidden bg-surface-warm">
            {/* Ambient glow orbs */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-[20%] right-[8%] w-[500px] h-[500px] rounded-full bg-brand/[0.03] blur-[150px]" />
              <div className="absolute bottom-[15%] left-[5%] w-[400px] h-[400px] rounded-full bg-brand/[0.02] blur-[120px]" />
            </div>

            <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8 w-full">
              {/* Title block */}
              <motion.div style={{ opacity: brandTitleOpacity, y: brandTitleY }} className="text-center mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand/15 bg-brand/[0.06] text-sm font-medium text-brand-dark mb-5">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                  </svg>
                  Çözüm Ortaklarımız
                </span>
                <h2 className="font-[family-name:var(--font-syne)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-black">
                  Güçlü{" "}
                  <span className="gradient-text">Çözüm Ortaklarımız</span>
                </h2>
              </motion.div>

              <motion.p
                style={{ opacity: brandSubOpacity }}
                className="text-center text-lg text-black/60 max-w-2xl mx-auto mb-10 glass-block"
              >
                <span className="glass-capsule-gold !py-1 !px-3 !text-sm !rounded-lg text-brand-dark font-medium">36+</span> sigorta şirketi ile güçlü iş birliği yaparak müşterilerimize en kaliteli hizmeti sunuyoruz.
              </motion.p>

              {/* Partner grid + detail panel */}
              <div className="relative">
                <motion.div
                  style={{ opacity: brandGridOpacity, scale: brandGridScale, y: brandGridY }}
                >
                  {/* Grid */}
                  <div className="partner-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-5 mb-6">
                    {partners.map((partner, i) => (
                      <div
                        key={partner.name}
                        onClick={() => setActivePartner(activePartner === i ? null : i)}
                        className={`partner-card group relative flex flex-col items-center justify-center rounded-2xl border cursor-pointer shadow-sm transition-all duration-500 ${
                          activePartner === i
                            ? "border-brand/40 bg-gradient-to-b from-white to-surface-warm ring-2 ring-brand/20 shadow-lg shadow-brand/10 scale-[1.02]"
                            : "border-black/[0.08] bg-gradient-to-b from-white to-surface-2"
                        }`}
                        style={{ transitionDelay: `${i * 40}ms` }}
                      >
                        <div className="py-8 px-6 flex items-center justify-center w-full">
                          <Image
                            src={partner.logo}
                            alt={partner.name}
                            width={130}
                            height={55}
                            className={`object-contain max-h-[48px] transition-all duration-500 ${
                              activePartner === i
                                ? "grayscale-0 opacity-100"
                                : "grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100"
                            }`}
                            unoptimized
                          />
                        </div>
                        <div className="absolute bottom-3 left-0 right-0 text-center px-2">
                          <p className={`text-[10px] font-semibold transition-colors duration-500 tracking-wide uppercase ${
                            activePartner === i ? "text-brand-dark" : "text-black/40 group-hover:text-brand-dark"
                          }`}>{partner.name}</p>
                        </div>
                        {/* Active indicator */}
                        {activePartner === i && (
                          <motion.div
                            layoutId="partner-indicator"
                            className="absolute -bottom-[13px] left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-white border-b border-r border-brand/20 z-20"
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Animated detail panel */}
                  <AnimatePresence mode="wait">
                    {activePartner !== null && (
                      <motion.div
                        key={activePartner}
                        initial={{ opacity: 0, height: 0, y: -10 }}
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -10 }}
                        transition={{ duration: 0.4, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <div className="bento-card p-5 sm:p-6 md:p-8 bg-white">
                          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
                            {/* Logo + name */}
                            <div className="flex-shrink-0 flex items-center gap-4">
                              <div className="w-16 h-16 rounded-xl bg-surface-2 border border-black/[0.06] flex items-center justify-center p-2">
                                <Image
                                  src={partners[activePartner].logo}
                                  alt={partners[activePartner].name}
                                  width={56}
                                  height={40}
                                  className="object-contain max-h-[36px]"
                                  unoptimized
                                />
                              </div>
                              <div>
                                <h4 className="font-[family-name:var(--font-syne)] text-lg font-bold text-black">{partners[activePartner].name}</h4>
                                <span className="glass-capsule-gold !py-0.5 !px-2.5 !text-[10px] !rounded-md text-brand-dark font-semibold uppercase tracking-wider">{partners[activePartner].desc}</span>
                              </div>
                            </div>

                            {/* Description */}
                            <div className="flex-1 min-w-0">
                              <motion.p
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.15, duration: 0.5, ease: EASE }}
                                className="text-black/65 leading-relaxed mb-4"
                              >
                                {partners[activePartner].work}
                              </motion.p>
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.25, duration: 0.4, ease: EASE }}
                                className="flex flex-wrap gap-2"
                              >
                                {partners[activePartner].tags.map((tag) => (
                                  <span key={tag} className="px-3 py-1 bg-brand/[0.06] border border-brand/15 text-brand-dark text-xs font-medium rounded-full">
                                    {tag}
                                  </span>
                                ))}
                              </motion.div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>

              {/* Bottom stat line */}
              <motion.div
                style={{ opacity: brandGridOpacity }}
                className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-black/55"
              >
                <span className="glass-capsule !py-2 !px-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand" />
                  10+ Çözüm Ortağı
                </span>
                <span className="glass-capsule !py-2 !px-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand" />
                  Türkiye Genelinde
                </span>
                <span className="glass-capsule !py-2 !px-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand" />
                  Güvenilir Hizmet
                </span>
              </motion.div>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* ═══════════════════════════════════════════════════════
            TESTIMONIALS — Rotating quotes
            ═══════════════════════════════════════════════════════ */}
        <section className="py-28 lg:py-40 bg-white relative overflow-hidden">
          <div className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] rounded-full bg-brand/[0.02] blur-[150px] pointer-events-none animate-aurora" />

          <div className="container mx-auto px-6 lg:px-8 max-w-7xl relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              {/* Left — Content */}
              <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.1}>
                <div className="heading-side-line mb-12">
                  <span className="section-label mb-6 block"><ScrambleText text="Müşteri Yorumları" trigger="inView" /></span>
                  <h2 className="font-[family-name:var(--font-syne)] text-3xl sm:text-4xl lg:text-5xl text-black font-bold leading-[1.05]">
                    Müşterilerimiz <em className="gradient-text not-italic">ne diyor?</em>
                  </h2>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTestimonial}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.5, ease: EASE }}
                  >
                    <div className="relative">
                      <svg className="absolute -top-4 -left-2 w-12 h-12 text-brand/10" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
                      <p className="text-black/65 text-lg leading-relaxed mb-8 pl-8 glass-block">
                        {testimonials[activeTestimonial].text}
                      </p>
                      <div className="flex items-center gap-4 pl-8">
                        <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-brand/30">
                          <Image
                            src={testimonials[activeTestimonial].image}
                            alt={testimonials[activeTestimonial].name}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-black/80">{testimonials[activeTestimonial].name}</p>
                          <span className="glass-capsule-gold !py-0.5 !px-2.5 !text-xs !rounded-md text-black/60 mt-1">{testimonials[activeTestimonial].role}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="flex gap-2 mt-10 pl-8">
                  {testimonials.map((_, i) => (
                    <button key={i} onClick={() => setActiveTestimonial(i)}
                      className={`h-1.5 rounded-full transition-all duration-500 ${i === activeTestimonial ? "w-8 bg-brand" : "w-1.5 bg-black/10 hover:bg-black/20"}`} />
                  ))}
                </div>
              </motion.div>

              {/* Right — Visual */}
              <motion.div variants={fadeRight} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.2}
                className="relative hidden lg:block">
                <div className="relative rounded-3xl overflow-hidden aspect-square shadow-2xl shadow-black/10">
                  <Image
                    src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=800&q=85"
                    alt="Mutlu müşteriler"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </div>
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-8 -right-4 glass-card-deep rounded-2xl p-5 shadow-xl"
                >
                  <span className="font-[family-name:var(--font-syne)] text-3xl font-bold gradient-text block leading-none">%98</span>
                  <span className="text-black/60 text-xs font-semibold">Memnuniyet</span>
                </motion.div>
                <div className="corner-accent-tl" />
                <div className="corner-accent-br" />
              </motion.div>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* ═══════════════════════════════════════════════════════
            WHY US — Feature Grid
            ═══════════════════════════════════════════════════════ */}
        <section id="why" className="py-28 lg:py-40 bg-surface-warm relative overflow-hidden scroll-mt-20">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-[-200px] right-[-200px] w-[600px] h-[600px] rounded-full bg-brand/[0.04] blur-[100px] animate-aurora" />
          </div>

          <div className="container mx-auto px-6 lg:px-8 max-w-7xl relative z-10">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} className="text-center mb-16 heading-decor">
              <div className="heading-ring" />
              <span className="section-label justify-center mb-5 block"><ScrambleText text="Neden Nexus?" trigger="inView" /></span>
              <h2 className="font-[family-name:var(--font-syne)] text-3xl sm:text-4xl lg:text-5xl text-black font-bold leading-tight">
                Farkımızı <em className="gradient-text not-italic">keşfedin</em>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { icon: "shield", title: "Güvenilir Hizmet", desc: "10 yılı aşkın sektör deneyimimiz ile güvenilir ve şeffaf hizmet sunuyoruz." },
                { icon: "activity", title: "Hızlı Hasar Süreci", desc: "Hasar süreçlerinizi hızlı ve sorunsuz bir şekilde yönetiyoruz." },
                { icon: "globe", title: "Geniş Ürün Yelpazesi", desc: "Kurumsal ve bireysel tüm sigorta ihtiyaçlarınız için çözüm sunuyoruz." },
                { icon: "users", title: "Kişiye Özel Çözüm", desc: "Her müşterimize özel, ihtiyaca yönelik poliçeler hazırlıyoruz." },
                { icon: "zap", title: "Uygun Fiyat", desc: "36 çözüm ortağımız ile en uygun fiyat teklifini oluşturuyoruz." },
                { icon: "heart", title: "7/24 Destek", desc: "Her an yanınızda, ihtiyaç duyduğunuz her anda ulaşabilirsiniz." },
              ].map((item, i) => (
                <motion.div key={i} variants={scaleIn}
                  initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.08}>
                  <TiltCard>
                    <LiquidBlob className="h-full">
                      <div className="group glass-card rounded-2xl p-7 h-full">
                        <div className="w-12 h-12 rounded-xl bg-brand/10 border border-brand/15 flex items-center justify-center text-brand mb-5 group-hover:bg-brand group-hover:text-white group-hover:border-brand group-hover:scale-110 transition-all duration-500">
                          <ServiceIcon name={item.icon} />
                        </div>
                        <h3 className="font-semibold text-black/80 text-lg mb-2 group-hover:text-brand transition-colors">{item.title}</h3>
                        <p className="text-sm text-black/55 leading-relaxed group-hover:text-black/70 transition-colors">{item.desc}</p>
                      </div>
                    </LiquidBlob>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* ═══════════════════════════════════════════════════════
            CTA — Call to action
            ═══════════════════════════════════════════════════════ */}
        <section className="relative py-32 lg:py-44 overflow-hidden bg-white">
          <div className="absolute inset-0 bg-gradient-to-br from-brand/[0.04] via-brand/[0.08] to-brand/[0.04]" />
          <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />
          <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full bg-brand/10 blur-[150px] pointer-events-none" />
          <div className="absolute bottom-[-100px] left-[-100px] w-[400px] h-[400px] rounded-full bg-brand/[0.06] blur-[120px] pointer-events-none" />

          {/* Orbit dots */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none hidden lg:block">
            <div className="w-3 h-3 rounded-full bg-brand/20" style={{ animation: "orbit 12s linear infinite", ["--orbit-radius" as string]: "200px" }} />
            <div className="w-2 h-2 rounded-full bg-brand/15" style={{ animation: "orbit 18s linear infinite reverse", ["--orbit-radius" as string]: "280px" }} />
          </div>

          <div className="container mx-auto px-6 lg:px-8 max-w-7xl relative z-10 text-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} className="heading-decor">
              <div className="heading-ring" />
              <span className="section-label justify-center mb-8 block"><ScrambleText text="Hemen Başlayın" trigger="inView" /></span>
              <h2 className="font-[family-name:var(--font-syne)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-black font-bold mb-6 leading-[1.05]">
                Sigorta teklifinizi<br />
                <span className="gradient-text">hemen alın</span>
              </h2>
              <p className="text-black/60 text-lg max-w-md mx-auto mb-10 leading-relaxed glass-block">
                Size en uygun sigorta paketini birlikte belirleyelim. <span className="glass-capsule-gold !py-1 !px-3 !text-sm !rounded-lg text-brand-dark font-medium">Ücretsiz danışmanlık</span> için hemen arayın.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <MagneticButton strength={0.3}>
                  <a href="tel:+905332516773" className="btn-primary shine-effect">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    <span>Hemen Arayın</span>
                  </a>
                </MagneticButton>
                <MagneticButton strength={0.3}>
                  <a href="https://wa.me/905332516773" target="_blank" className="btn-outline">
                    <span>WhatsApp ile Yazın</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
                  </a>
                </MagneticButton>
              </div>
            </motion.div>
          </div>
        </section>

        <div className="section-divider" />

        {/* ═══════════════════════════════════════════════════════
            CONTACT — Ephorsite-style form layout
            ═══════════════════════════════════════════════════════ */}
        <section id="contact" className="py-28 lg:py-40 bg-surface-warm scroll-mt-20 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full bg-brand/[0.025] blur-[200px] pointer-events-none" />

          <div className="container mx-auto px-6 lg:px-8 max-w-7xl relative z-10">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} className="text-center mb-16 heading-decor">
              <div className="heading-ring" />
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand/15 bg-brand/[0.06] text-sm font-medium text-brand-dark mb-6">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                İletişim
              </span>
              <h2 className="font-[family-name:var(--font-syne)] text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-black font-extrabold tracking-tight">
                Bizimle{" "}
                <span className="gradient-text">İletişime Geçin</span>
              </h2>
              <p className="mt-6 max-w-2xl mx-auto text-lg text-black/60 glass-block inline-block">
                Sigorta ihtiyaçlarınız hakkında bilgi almak veya teklif talep etmek için bize ulaşın.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Form — 3 cols */}
              <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.2} className="lg:col-span-3">
                <div className="bento-card p-8 md:p-10 bg-white">
                  <h3 className="font-[family-name:var(--font-syne)] text-xl font-bold mb-8 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand/15 to-brand-dark/10 border border-brand/15 flex items-center justify-center text-brand">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                      </svg>
                    </div>
                    Ücretsiz Teklif Alın
                  </h3>
                  <form className="space-y-6" onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    const fd = new FormData(form);
                    const name = (fd.get("name") as string) || "";
                    const phone = (fd.get("phone") as string) || "";
                    const service = (fd.get("service") as string) || "";
                    const message = (fd.get("message") as string) || "";
                    const lines = [
                      `Merhaba, Nexus Sigorta web sitesinden teklif talebi:`,
                      name && `Ad Soyad: ${name}`,
                      phone && `Telefon: ${phone}`,
                      service && `Sigorta Türü: ${service}`,
                      message && `Mesaj: ${message}`,
                    ].filter(Boolean).join("\n");
                    window.open(`https://wa.me/905332516773?text=${encodeURIComponent(lines)}`, "_blank");
                  }}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="group">
                        <label className="block text-[13px] font-medium text-black/65 mb-2 group-focus-within:text-brand transition-colors duration-300">Ad Soyad</label>
                        <div className="input-focus-ring rounded-xl">
                          <input type="text" name="name" required placeholder="Adınız Soyadınız"
                            className="w-full px-5 py-3.5 rounded-xl bg-surface-2 border border-black/[0.06] text-black placeholder:text-black/25 focus:outline-none focus:border-brand/40 focus:bg-white transition-all duration-300" />
                        </div>
                      </div>
                      <div className="group">
                        <label className="block text-[13px] font-medium text-black/65 mb-2 group-focus-within:text-brand transition-colors duration-300">Telefon</label>
                        <div className="input-focus-ring rounded-xl">
                          <input type="tel" name="phone" required placeholder="+90 5XX XXX XX XX"
                            className="w-full px-5 py-3.5 rounded-xl bg-surface-2 border border-black/[0.06] text-black placeholder:text-black/25 focus:outline-none focus:border-brand/40 focus:bg-white transition-all duration-300" />
                        </div>
                      </div>
                    </div>
                    <div className="group">
                      <label className="block text-[13px] font-medium text-black/65 mb-2 group-focus-within:text-brand transition-colors duration-300">Sigorta Türü</label>
                      <div className="input-focus-ring rounded-xl">
                        <select name="service" className="w-full px-5 py-3.5 rounded-xl bg-surface-2 border border-black/[0.06] text-black/65 focus:outline-none focus:border-brand/40 focus:bg-white transition-all duration-300 appearance-none cursor-pointer"
                          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23D4A012' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 16px center", backgroundSize: "12px 8px" }}>
                          <option value="">Seçiniz</option>
                          {services.map(s => <option key={s.slug}>{s.title}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="group">
                      <label className="block text-[13px] font-medium text-black/65 mb-2 group-focus-within:text-brand transition-colors duration-300">Mesajınız</label>
                      <div className="input-focus-ring rounded-xl">
                        <textarea rows={4} name="message" placeholder="Mesajınızı yazın..."
                          className="w-full px-5 py-3.5 rounded-xl bg-surface-2 border border-black/[0.06] text-black placeholder:text-black/25 focus:outline-none focus:border-brand/40 focus:bg-white transition-all duration-300 resize-none" />
                      </div>
                    </div>
                    <button type="submit" className="btn-primary shine-effect w-full sm:w-auto justify-center">
                      <span>WhatsApp ile Gönder</span>
                      <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    </button>
                  </form>
                </div>
              </motion.div>

              {/* Contact info cards — 2 cols */}
              <div className="lg:col-span-2 space-y-4">
                {[
                  { label: "Telefon", value: "+90 533 251 67 73", href: "tel:+905332516773", color: "from-emerald-500/15 to-emerald-600/10", borderColor: "border-emerald-500/15", iconColor: "text-emerald-500",
                    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg> },
                  { label: "E-posta", value: "info@nexussigorta.com", href: "mailto:info@nexussigorta.com", color: "from-brand/15 to-brand-dark/10", borderColor: "border-brand/15", iconColor: "text-brand",
                    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg> },
                  { label: "Adres", value: "Barbaros Mh. Mor Sümbül Sk. No:5/A\nDeluxia Palace K:17/474, Ataşehir / İstanbul", href: null, color: "from-amber-500/15 to-amber-600/10", borderColor: "border-amber-500/15", iconColor: "text-amber-500",
                    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg> },
                  { label: "WhatsApp", value: "+90 533 251 67 73", href: "https://wa.me/905332516773", color: "from-green-500/15 to-green-600/10", borderColor: "border-green-500/15", iconColor: "text-green-500",
                    icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg> },
                ].map((item, i) => (
                  <motion.div key={item.label} variants={fadeRight} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.4 + i * 0.1}>
                    <motion.div
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className="group bento-card p-6 bg-white"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} border ${item.borderColor} flex items-center justify-center ${item.iconColor} group-hover:scale-110 group-hover:border-brand/30 transition-all duration-500`}>
                          {item.icon}
                        </div>
                        <div>
                          <span className="block text-xs font-medium text-black/55 uppercase tracking-wider mb-1">{item.label}</span>
                          {item.href ? (
                            <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} className="text-sm text-black/60 hover:text-brand transition-colors duration-300">{item.value}</a>
                          ) : (
                            <p className="text-sm text-black/65 leading-relaxed whitespace-pre-line">{item.value}</p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}

                {/* Social media */}
                <motion.div variants={fadeRight} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.8}>
                  <div className="bento-card p-6 bg-white">
                    <span className="block text-xs font-medium text-black/55 uppercase tracking-wider mb-4">Sosyal Medya</span>
                    <div className="flex gap-3">
                      {[
                        { label: "Instagram", href: "https://instagram.com/nexussigorta", icon: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/> },
                        { label: "YouTube", href: "https://youtube.com/@nexussigorta", icon: <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/> },
                        { label: "LinkedIn", href: "https://linkedin.com/company/nexussigorta", icon: <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/> },
                      ].map((s, i) => (
                        <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                          className="group w-10 h-10 rounded-xl bg-brand/5 border border-brand/15 flex items-center justify-center text-brand hover:scale-110 hover:bg-brand/10 hover:border-brand/30 transition-all duration-500">
                          <svg className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">{s.icon}</svg>
                        </a>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}

/* ─── Bento Service Card with mouse tracking ─── */
function BentoServiceCard({ svc, index }: { svc: typeof bentoServices[number]; index: number }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  useBentoMouse(cardRef);

  return (
    <Link
      ref={cardRef}
      href={`/hizmetler/${svc.slug}`}
      className="group bento-card block relative h-[320px] lg:h-[380px]"
    >
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        <Image src={svc.image} alt={svc.title} fill className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110" unoptimized />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
        <div className="absolute inset-0 bg-brand/0 group-hover:bg-brand/10 transition-colors duration-700" />
      </div>

      <div className="relative z-10 flex flex-col justify-between h-full p-7 lg:p-8">
        <div className="flex justify-between items-start">
          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-lg border border-white/20 flex items-center justify-center text-white group-hover:bg-brand group-hover:text-white group-hover:border-brand transition-all duration-500">
            <ServiceIcon name={svc.icon} />
          </div>
          <span className="px-3 py-1.5 bg-brand/20 backdrop-blur-sm border border-brand/30 text-white text-[10px] font-semibold uppercase tracking-wider rounded-full opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
            {svc.highlight}
          </span>
        </div>

        <div>
          <h3 className="font-[family-name:var(--font-syne)] text-2xl lg:text-3xl text-white mb-2 group-hover:text-brand-light transition-colors duration-500 font-bold">
            {svc.title}
          </h3>
          <p className="text-white/60 text-sm leading-relaxed mb-4 max-w-sm">{svc.desc}</p>
          <div className="flex items-center gap-2 text-brand-light text-sm font-medium translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            Detaylı Bilgi
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform duration-300 group-hover:translate-x-0.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </div>
        </div>
      </div>

      <span className="absolute top-6 right-7 font-[family-name:var(--font-syne)] text-7xl font-bold text-white/[0.04] group-hover:text-brand/[0.08] transition-colors duration-700">
        {String(index + 1).padStart(2, "0")}
      </span>
    </Link>
  );
}
