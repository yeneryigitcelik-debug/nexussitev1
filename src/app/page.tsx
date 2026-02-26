"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { services, partners } from "@/lib/services";
import { ServiceIcon } from "@/components/ServiceIcon";

type BezierDef = [number, number, number, number];
const EASE: BezierDef = [0.22, 1, 0.36, 1];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fadeUp: any = {
  hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
  visible: (d: number) => ({
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.7, delay: d, ease: EASE },
  }),
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fadeLeft: any = {
  hidden: { opacity: 0, x: -40, filter: "blur(6px)" },
  visible: (d: number) => ({
    opacity: 1, x: 0, filter: "blur(0px)",
    transition: { duration: 0.7, delay: d, ease: EASE },
  }),
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fadeRight: any = {
  hidden: { opacity: 0, x: 40, filter: "blur(6px)" },
  visible: (d: number) => ({
    opacity: 1, x: 0, filter: "blur(0px)",
    transition: { duration: 0.7, delay: d, ease: EASE },
  }),
};

/* ─── Counter ─── */
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const dur = 2000, start = performance.now();
    function tick(now: number) {
      const p = Math.min((now - start) / dur, 1);
      setVal(Math.round(target * (1 - Math.pow(1 - p, 4))));
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [inView, target]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ─── Cursor Glow ─── */
function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(hover: hover)").matches) return;
    const el = ref.current;
    if (!el) return;
    const move = (e: MouseEvent) => {
      el.style.left = e.clientX + "px";
      el.style.top = e.clientY + "px";
      el.style.opacity = "1";
    };
    const leave = () => { el.style.opacity = "0"; };
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
    const t = setTimeout(() => setHidden(true), 1400);
    const t2 = setTimeout(() => setGone(true), 2200);
    return () => { clearTimeout(t); clearTimeout(t2); };
  }, []);
  if (gone) return null;
  return (
    <div className={`preloader ${hidden ? "hidden" : ""}`}>
      <div className="text-center">
        <Image src="/logo.png" alt="Nexus Sigorta" width={200} height={100} className="h-[60px] w-auto mx-auto" style={{ animation: "aurora 3s ease-in-out infinite" }} priority />
        <div className="preloader-bar">
          <div className="preloader-bar-fill" />
        </div>
      </div>
    </div>
  );
}

/* ─── Tilt Card Wrapper ─── */
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const handleMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const tiltX = (y - 0.5) * 4;
    const tiltY = (x - 0.5) * -4;
    el.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-6px)`;
  }, []);
  const handleLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = "";
  }, []);
  return (
    <div ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave} className={className} style={{ transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1)" }}>
      {children}
    </div>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<"kurumsal" | "bireysel">("kurumsal");
  const filtered = services.filter((s) => s.category === activeTab);

  return (
    <>
      <Preloader />
      <CursorGlow />
      <main>
        {/* ─── HERO ─── */}
        <section id="hero" className="relative min-h-screen flex flex-col overflow-hidden bg-white scroll-mt-20">
          {/* Aurora Mesh Orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full bg-gradient-to-br from-amber-200/40 to-yellow-100/20 blur-[80px]" style={{ animation: "aurora 12s ease-in-out infinite" }} />
            <div className="absolute bottom-[-5%] left-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-amber-100/30 to-transparent blur-[80px]" style={{ animation: "aurora-slow 16s ease-in-out infinite" }} />
            <div className="absolute top-[40%] left-[30%] w-[400px] h-[400px] rounded-full bg-amber-100/15 blur-[80px]" style={{ animation: "aurora 20s ease-in-out infinite 6s" }} />
          </div>

          {/* Grid Lines */}
          <div className="absolute inset-0 hero-grid-pattern pointer-events-none" />

          <div className="container mx-auto px-6 lg:px-8 max-w-7xl relative z-10 flex-1 grid lg:grid-cols-[7fr_5fr] items-center gap-12 pt-32 pb-28">
            {/* Left Content */}
            <div>
              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.6}
                className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-amber-50/80 border border-amber-200/50 rounded-full mb-8 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inset-[-3px] rounded-full border-2 border-amber-400" style={{ animation: "ping-slow 2s ease-out infinite" }} />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
                </span>
                <span className="text-[13px] font-medium text-amber-700">10 Yıllık Deneyim & Güven</span>
              </motion.div>

              <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={0.8}
                className="font-[family-name:var(--font-syne)] text-5xl sm:text-6xl lg:text-[4.5rem] font-extrabold leading-[1.05] tracking-tight text-gray-900 mb-6">
                <span className="block">Güvenliğiniz</span>
                <span className="block">İçin <em className="gradient-text not-italic">Özel</em></span>
                <span className="block"><em className="gradient-text not-italic">Çalışır.</em></span>
              </motion.h1>

              <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={1}
                className="text-lg text-gray-500 max-w-[480px] leading-relaxed mb-10">
                Hayatınızın her anında yanınızda olan Nexus Sigorta, kurumsal ve bireysel
                sigorta çözümleriyle geleceğinizi güvence altına alır.
              </motion.p>

              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={1.2} className="flex flex-wrap gap-4">
                <Link href="/hizmetler"
                  className="shine-effect inline-flex items-center gap-2.5 px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-500 text-white font-semibold rounded-full hover:shadow-[0_0_30px_rgba(232,180,0,0.25),0_0_60px_rgba(232,180,0,0.1)] hover:-translate-y-0.5 transition-all duration-300">
                  <span>Hizmetlerimizi Keşfet</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
                </Link>
                <a href="#contact"
                  className="inline-flex items-center gap-2 px-8 py-4 border border-gray-200 text-gray-600 font-semibold rounded-full hover:border-amber-300 hover:text-amber-700 hover:bg-amber-50/50 transition-all duration-300">
                  Bize Ulaşın
                </a>
              </motion.div>
            </div>

            {/* Right Visual — Floating Cards + Orbit */}
            <motion.div variants={fadeRight} initial="hidden" animate="visible" custom={0.8}
              className="relative hidden lg:flex items-center justify-center h-[460px]">
              {/* Orbit Ring */}
              <div className="absolute w-[360px] h-[360px] rounded-full border border-dashed border-amber-200/30" style={{ animation: "orbit-spin 25s linear infinite" }}>
                <div className="absolute top-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(232,180,0,0.5)]" style={{ animation: "orbit-dot-pulse 3s ease-in-out infinite" }} />
                <div className="absolute top-1/2 left-[-4px] -translate-y-1/2 w-2 h-2 rounded-full bg-amber-300 shadow-[0_0_10px_rgba(232,180,0,0.4)]" style={{ animation: "orbit-dot-pulse 3s ease-in-out infinite 1s" }} />
                <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(232,180,0,0.5)]" style={{ animation: "orbit-dot-pulse 3s ease-in-out infinite 2s" }} />
              </div>

              {/* Float Card 1 — Shield */}
              <motion.div animate={{ y: [0, -14, 7, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[8%] left-[3%] flex items-center gap-3.5 px-5 py-4 bg-white/90 backdrop-blur-xl border border-gray-100 rounded-2xl shadow-xl shadow-gray-200/40 min-w-[230px]">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 flex-shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
                </div>
                <div>
                  <strong className="block text-[15px] font-semibold text-gray-900">Tam Koruma</strong>
                  <span className="text-xs text-gray-400">Kapsamlı sigorta paketleri</span>
                </div>
              </motion.div>

              {/* Float Card 2 — Clock */}
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute top-[40%] right-[-2%] flex items-center gap-3.5 px-5 py-4 bg-white/90 backdrop-blur-xl border border-gray-100 rounded-2xl shadow-xl shadow-gray-200/40 min-w-[220px]">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-100 to-green-50 border border-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                </div>
                <div>
                  <strong className="block text-[15px] font-semibold text-gray-900">7/24 Destek</strong>
                  <span className="text-xs text-gray-400">Her an yanınızda</span>
                </div>
              </motion.div>

              {/* Float Card 3 — Heart */}
              <motion.div animate={{ y: [0, -12, 5, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-[8%] left-[12%] flex items-center gap-3.5 px-5 py-4 bg-white/90 backdrop-blur-xl border border-gray-100 rounded-2xl shadow-xl shadow-gray-200/40 min-w-[230px]">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-100 to-rose-50 border border-rose-100 flex items-center justify-center text-rose-500 flex-shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                </div>
                <div>
                  <strong className="block text-[15px] font-semibold text-gray-900">%98 Memnuniyet</strong>
                  <span className="text-xs text-gray-400">Müşteri odaklı hizmet</span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Stats Bar */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={1.6} className="relative z-10 pb-8">
            <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
              <div className="grid grid-cols-2 md:grid-cols-4 bg-white/80 backdrop-blur-xl border border-gray-100 rounded-2xl p-6 shadow-xl shadow-gray-100/50">
                {[
                  { t: 100, s: "+", l: "Memnun Müşteri" },
                  { t: 36, s: "", l: "Çözüm Ortağı" },
                  { t: 98, s: "%", l: "Başarı Oranı" },
                  { t: 10, s: "+", l: "Yıl Deneyim" },
                ].map((x, i) => (
                  <div key={i} className="text-center py-2 relative">
                    {i > 0 && <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-10 bg-gradient-to-b from-transparent via-amber-200/30 to-transparent" />}
                    <p className="font-[family-name:var(--font-syne)] text-3xl md:text-4xl font-extrabold text-gray-900">
                      <Counter target={x.t} suffix={x.s} />
                    </p>
                    <p className="text-sm text-gray-400 mt-1 font-medium">{x.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={2}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-2 hidden lg:flex">
            <div className="w-6 h-10 rounded-full border-2 border-gray-200 flex justify-center pt-2">
              <div className="w-[3px] h-2 bg-amber-400 rounded-full" style={{ animation: "scroll-bounce 2s ease infinite" }} />
            </div>
            <span className="text-[10px] uppercase tracking-[3px] text-gray-300 font-medium">Kaydır</span>
          </motion.div>
        </section>

        {/* ─── MARQUEE ─── */}
        <div className="py-5 border-y border-gray-100 bg-[#FAFAF8] overflow-hidden">
          <div className="flex">
            <div className="flex items-center gap-8 whitespace-nowrap" style={{ animation: "marquee-left 40s linear infinite" }}>
              {[...Array(2)].flatMap((_, ri) =>
                ["Trafik Sigortası", "Kasko", "Sağlık Sigortası", "Konut Sigortası", "Hayat Sigortası", "İş Yeri Sigortası", "Seyahat Sigortası", "Yangın Sigortası"].map((t, i) => (
                  <span key={`${ri}-${i}`} className="flex items-center gap-8">
                    <span className="font-[family-name:var(--font-syne)] text-sm font-medium text-gray-300 uppercase tracking-wider">{t}</span>
                    <span className="text-amber-400 text-[8px]">&#9670;</span>
                  </span>
                ))
              )}
            </div>
          </div>
        </div>

        {/* ─── ABOUT ─── */}
        <section id="about" className="py-28 lg:py-36 bg-[#FAFAF8] scroll-mt-20">
          <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.1}>
                <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl shadow-gray-200/50">
                  <Image src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80" alt="Nexus Sigorta ekibi" fill className="object-cover" unoptimized />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8">
                    <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-5 flex items-center gap-4 shadow-lg">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-300/30">
                        <span className="font-[family-name:var(--font-syne)] text-2xl font-extrabold text-white">10+</span>
                      </div>
                      <div>
                        <p className="font-[family-name:var(--font-syne)] font-bold text-gray-900">Yıllık Deneyim</p>
                        <p className="text-sm text-gray-400">Sektörde güvenilir isim</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeRight} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.15}>
                <span className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[3px] text-amber-600 mb-5">
                  <span className="w-6 h-[2px] bg-amber-500" /> Hakkımızda
                </span>
                <h2 className="font-[family-name:var(--font-syne)] text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.1] mb-6">
                  Güvence altındaki <em className="gradient-text not-italic">geleceğiniz</em>
                </h2>
                <p className="text-gray-500 text-lg leading-relaxed mb-4">
                  Nexus Sigorta olarak, 10 yılı aşkın deneyimimizle müşterilerimize en uygun
                  sigorta çözümlerini sunuyoruz. 36 çözüm ortağı firmamız ile birlikte çalışarak,
                  her müşterimize özel poliçeler hazırlıyoruz.
                </p>
                <p className="text-gray-500 leading-relaxed mb-8">
                  Doğru poliçe seçimi, güvene alınan değerlerin korunması ve uygun zamanlama
                  ile müşteri memnuniyetini ön planda tutuyoruz.
                </p>
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    { icon: "shield", title: "Kapsamlı Koruma", desc: "Her risk için doğru poliçe" },
                    { icon: "users", title: "Uzman Kadro", desc: "Deneyimli ekibimiz" },
                    { icon: "activity", title: "Hızlı Süreç", desc: "Kolay ve hızlı işlem" },
                  ].map((f, i) => (
                    <TiltCard key={i} className="group p-5 rounded-2xl bg-white border border-gray-100 card-glow hover:border-amber-200 hover:shadow-xl hover:shadow-amber-50/50 transition-all duration-300">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-100 flex items-center justify-center text-amber-600 mb-3 group-hover:scale-110 transition-transform">
                        <ServiceIcon name={f.icon} />
                      </div>
                      <h4 className="font-[family-name:var(--font-syne)] font-semibold text-gray-900 text-sm mb-1">{f.title}</h4>
                      <p className="text-xs text-gray-400">{f.desc}</p>
                    </TiltCard>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* ─── SERVICES ─── */}
        <section id="services" className="py-28 lg:py-36 bg-white scroll-mt-20">
          <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} className="text-center mb-14">
              <span className="text-xs font-semibold uppercase tracking-[3px] text-amber-600 mb-4 block">Hizmetlerimiz</span>
              <h2 className="font-[family-name:var(--font-syne)] text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
                Kurumsal & Bireysel <em className="gradient-text not-italic">Sigorta Çözümleri</em>
              </h2>
              <p className="text-gray-500 max-w-lg mx-auto">İhtiyaçlarınıza özel, kapsamlı sigorta paketlerimiz ile sizi ve sevdiklerinizi güvence altına alıyoruz.</p>
            </motion.div>

            <div className="flex justify-center gap-2 mb-12">
              {(["kurumsal", "bireysel"] as const).map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`px-7 py-2.5 text-sm font-semibold rounded-full transition-all duration-400 ${
                    activeTab === tab
                      ? "bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow-lg shadow-amber-200/30"
                      : "bg-gray-50 text-gray-500 hover:bg-gray-100 border border-gray-100 hover:border-amber-200/50"
                  }`}>
                  {tab === "kurumsal" ? "Kurumsal" : "Bireysel"}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                transition={{ duration: 0.4, ease: EASE }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {filtered.map((svc, i) => (
                  <motion.div
                    key={svc.slug}
                    initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.5, delay: i * 0.07, ease: EASE }}
                  >
                    <TiltCard className="group block relative p-7 bg-[#FAFAF8] border border-gray-100 rounded-2xl overflow-hidden card-glow hover:border-amber-200 hover:shadow-xl hover:shadow-amber-50/50 transition-all duration-500">
                      <Link href={`/hizmetler/${svc.slug}`} className="block">
                        {/* Top gradient line */}
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                        <span className="absolute top-4 right-5 font-[family-name:var(--font-syne)] text-4xl font-extrabold text-gray-100 group-hover:text-amber-100 transition-colors">{String(i + 1).padStart(2, "0")}</span>
                        <div className="w-14 h-14 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-amber-600 mb-5 group-hover:bg-gradient-to-br group-hover:from-amber-500 group-hover:to-amber-600 group-hover:text-white group-hover:border-transparent group-hover:scale-110 transition-all duration-300 shadow-sm">
                          <ServiceIcon name={svc.icon} />
                        </div>
                        <h3 className="font-[family-name:var(--font-syne)] text-lg font-semibold text-gray-900 mb-2">{svc.title}</h3>
                        <p className="text-sm text-gray-400 leading-relaxed mb-5">{svc.description}</p>
                        <div className="flex items-center gap-2 text-sm font-medium text-amber-600 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                          Detaylı Bilgi
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                        </div>
                      </Link>
                    </TiltCard>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        <div className="section-divider" />

        {/* ─── PARTNERS ─── */}
        <section className="py-28 lg:py-36 bg-[#FAFAF8]">
          <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} className="text-center mb-16">
              <span className="text-xs font-semibold uppercase tracking-[3px] text-amber-600 mb-4 block">İş Ortaklarımız</span>
              <h2 className="font-[family-name:var(--font-syne)] text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
                Güçlü <em className="gradient-text not-italic">çözüm ortaklarımız</em>
              </h2>
              <p className="text-gray-500 max-w-lg mx-auto">Türkiye&apos;nin ve dünyanın önde gelen sigorta şirketleri ile birlikte çalışarak size en uygun teklifi sunuyoruz.</p>
            </motion.div>

            <div className="space-y-6">
              <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                <motion.div animate={{ x: [0, -1200] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="flex gap-6 w-max">
                  {[...partners, ...partners, ...partners].map((p, i) => (
                    <div key={i} className="flex-shrink-0 w-[220px] h-[100px] bg-white border border-gray-100 rounded-2xl flex items-center justify-center px-8 hover:border-amber-200 hover:shadow-lg hover:shadow-amber-50 hover:-translate-y-1 transition-all duration-300 group">
                      <Image src={p.logo} alt={p.name} width={120} height={50} className="object-contain max-h-[40px] opacity-40 group-hover:opacity-80 transition-opacity duration-300 grayscale group-hover:grayscale-0" unoptimized />
                    </div>
                  ))}
                </motion.div>
              </div>
              <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                <motion.div animate={{ x: [-1200, 0] }} transition={{ duration: 35, repeat: Infinity, ease: "linear" }} className="flex gap-6 w-max">
                  {[...partners.slice(4), ...partners, ...partners.slice(0, 4)].map((p, i) => (
                    <div key={i} className="flex-shrink-0 w-[220px] h-[100px] bg-white border border-gray-100 rounded-2xl flex items-center justify-center px-8 hover:border-amber-200 hover:shadow-lg hover:shadow-amber-50 hover:-translate-y-1 transition-all duration-300 group">
                      <Image src={p.logo} alt={p.name} width={120} height={50} className="object-contain max-h-[40px] opacity-40 group-hover:opacity-80 transition-opacity duration-300 grayscale group-hover:grayscale-0" unoptimized />
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>

            <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.2} className="text-center mt-14 text-gray-400 text-sm">
              <span className="font-[family-name:var(--font-syne)] text-2xl font-bold text-gray-900">36</span> çözüm ortağı firma ile birlikte çalışıyoruz
            </motion.p>
          </div>
        </section>

        <div className="section-divider" />

        {/* ─── WHY US ─── */}
        <section id="why" className="py-28 lg:py-36 bg-gray-900 text-white overflow-hidden relative scroll-mt-20">
          {/* Aurora orbs for dark section */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-[-200px] right-[-200px] w-[600px] h-[600px] rounded-full bg-amber-500/5 blur-[80px]" style={{ animation: "aurora 15s ease-in-out infinite" }} />
            <div className="absolute bottom-[-100px] left-[-100px] w-[400px] h-[400px] rounded-full bg-amber-400/3 blur-[60px]" style={{ animation: "aurora-slow 18s ease-in-out infinite" }} />
          </div>
          {/* Grid lines */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(232,180,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(232,180,0,0.02)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black,transparent)] pointer-events-none" />

          <div className="container mx-auto px-6 lg:px-8 max-w-7xl relative z-10">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} className="text-center mb-14">
              <span className="text-xs font-semibold uppercase tracking-[3px] text-amber-400 mb-4 block">Neden Nexus?</span>
              <h2 className="font-[family-name:var(--font-syne)] text-4xl lg:text-5xl font-bold text-white leading-tight">
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
                <motion.div key={i} variants={i < 3 ? (i === 0 ? fadeLeft : i === 2 ? fadeRight : fadeUp) : (i === 3 ? fadeLeft : i === 5 ? fadeRight : fadeUp)}
                  initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.08}>
                  <TiltCard className="group p-7 rounded-2xl bg-white/[0.04] border border-white/[0.06] backdrop-blur-sm hover:bg-white/[0.08] hover:border-amber-400/20 transition-all duration-500 relative overflow-hidden">
                    {/* Gradient border on hover */}
                    <div className="absolute inset-[-1px] rounded-[inherit] bg-gradient-to-br from-amber-400/30 via-amber-300/15 to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", WebkitMaskComposite: "xor", maskComposite: "exclude", padding: 1 }} />
                    <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/10 flex items-center justify-center text-amber-400 mb-5 group-hover:scale-110 group-hover:rotate-[-5deg] transition-transform duration-300">
                      <ServiceIcon name={item.icon} />
                    </div>
                    <h3 className="font-[family-name:var(--font-syne)] font-semibold text-white text-lg mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* ─── CTA ─── */}
        <section className="py-28 lg:py-36 bg-[#FAFAF8]">
          <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}
              className="relative text-center p-12 md:p-20 bg-gradient-to-br from-amber-500 to-amber-600 rounded-3xl overflow-hidden shadow-2xl shadow-amber-200/30">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
              <div className="absolute top-[-50%] left-[50%] -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-white/10 blur-3xl animate-pulse" />
              <div className="relative z-10">
                <h2 className="font-[family-name:var(--font-syne)] text-3xl md:text-5xl font-bold text-white mb-4">
                  Sigorta teklifinizi <em className="not-italic" style={{ WebkitTextFillColor: "white" }}>hemen alın</em>
                </h2>
                <p className="text-amber-100 text-lg max-w-md mx-auto mb-8 leading-relaxed">Size en uygun sigorta paketini birlikte belirleyelim. Ücretsiz danışmanlık için hemen arayın.</p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a href="tel:+905332516773" className="inline-flex items-center gap-2.5 px-8 py-4 bg-white text-amber-700 font-semibold rounded-full hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:-translate-y-0.5 transition-all duration-300">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    Hemen Arayın
                  </a>
                  <a href="https://wa.me/905332516773" target="_blank" className="inline-flex items-center gap-2.5 px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-300">
                    WhatsApp ile Yazın
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <div className="section-divider" />

        {/* ─── CONTACT ─── */}
        <section id="contact" className="py-28 lg:py-36 bg-white scroll-mt-20">
          <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-16">
              <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.1}>
                <span className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[3px] text-amber-600 mb-5">
                  <span className="w-6 h-[2px] bg-amber-500" /> İletişim
                </span>
                <h2 className="font-[family-name:var(--font-syne)] text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.1] mb-6">
                  Bizimle <em className="gradient-text not-italic">iletişime geçin</em>
                </h2>
                <p className="text-gray-500 leading-relaxed mb-10">Sigorta ihtiyaçlarınız hakkında bilgi almak veya teklif talep etmek için bize ulaşın.</p>
                <div className="space-y-6 mb-10">
                  {[
                    { icon: "map", title: "Adres", text: "Barbaros Mh. Mor Sümbül Sk. No:5/A\nDeluxia Palace K:17/474, Ataşehir / İstanbul" },
                    { icon: "phone", title: "Telefon", text: "+90 533 251 67 73", link: "tel:+905332516773" },
                    { icon: "mail", title: "E-posta", text: "info@nexussigorta.com", link: "mailto:info@nexussigorta.com" },
                  ].map((item, i) => (
                    <motion.div key={i} variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.2 + i * 0.08}
                      className="flex gap-4 items-start">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-100 flex items-center justify-center text-amber-600 flex-shrink-0">
                        {item.icon === "map" && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>}
                        {item.icon === "phone" && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>}
                        {item.icon === "mail" && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>}
                      </div>
                      <div>
                        <h4 className="font-[family-name:var(--font-syne)] font-semibold text-gray-900 text-sm mb-1">{item.title}</h4>
                        {item.link
                          ? <a href={item.link} className="text-sm text-amber-600 hover:text-amber-700 transition-colors">{item.text}</a>
                          : <p className="text-sm text-gray-500 whitespace-pre-line">{item.text}</p>
                        }
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Social Links */}
                <div className="flex gap-3">
                  {[
                    { label: "Instagram", href: "https://instagram.com/nexus.sigorta", icon: <><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></> },
                    { label: "YouTube", href: "https://youtube.com/@nexussigorta", icon: <><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.13C5.12 19.56 12 19.56 12 19.56s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></> },
                    { label: "LinkedIn", href: "https://linkedin.com/company/nexus-sigorta", icon: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></> },
                  ].map((s, i) => (
                    <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                      className="w-11 h-11 rounded-xl border border-gray-200 flex items-center justify-center text-gray-400 hover:border-amber-300 hover:text-amber-600 hover:bg-amber-50/50 hover:-translate-y-1 transition-all duration-300">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">{s.icon}</svg>
                    </a>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={fadeRight} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.2}
                className="bg-[#FAFAF8] border border-gray-100 rounded-3xl p-8 md:p-10 shadow-xl shadow-gray-100/50 relative overflow-hidden">
                {/* Subtle glow */}
                <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-amber-100/20 blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="relative z-10">
                  <h3 className="font-[family-name:var(--font-syne)] text-2xl font-bold text-gray-900 mb-2">Ücretsiz Teklif Alın</h3>
                  <p className="text-sm text-gray-400 mb-8">Formu doldurun, en kısa sürede size dönüş yapalım.</p>
                  <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                    <div>
                      <label className="block text-[13px] font-medium text-gray-600 mb-1.5">Ad Soyad</label>
                      <input type="text" placeholder="Adınız Soyadınız" className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-300 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 focus:shadow-[0_0_0_3px_rgba(232,180,0,0.08)] outline-none transition-all" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[13px] font-medium text-gray-600 mb-1.5">Telefon</label>
                        <input type="tel" placeholder="+90 5XX XXX XX XX" className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-300 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 focus:shadow-[0_0_0_3px_rgba(232,180,0,0.08)] outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[13px] font-medium text-gray-600 mb-1.5">E-posta</label>
                        <input type="email" placeholder="ornek@email.com" className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-300 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 focus:shadow-[0_0_0_3px_rgba(232,180,0,0.08)] outline-none transition-all" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium text-gray-600 mb-1.5">Sigorta Türü</label>
                      <select className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-xl text-gray-900 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 focus:shadow-[0_0_0_3px_rgba(232,180,0,0.08)] outline-none transition-all appearance-none bg-no-repeat bg-[right_16px_center] bg-[length:12px_8px]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%2394A3B8' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")` }}>
                        <option value="">Seçiniz</option>
                        {services.map(s => <option key={s.slug}>{s.title}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium text-gray-600 mb-1.5">Mesajınız</label>
                      <textarea rows={4} placeholder="Mesajınızı yazın..." className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-300 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 focus:shadow-[0_0_0_3px_rgba(232,180,0,0.08)] outline-none transition-all resize-none" />
                    </div>
                    <button type="submit" className="shine-effect w-full inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-500 text-white font-semibold rounded-xl hover:shadow-[0_0_30px_rgba(232,180,0,0.25)] transition-all duration-300">
                      <span>Teklif Talep Et</span>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2L11 13"/><path d="M22 2L15 22 11 13 2 9l20-7z"/></svg>
                    </button>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
