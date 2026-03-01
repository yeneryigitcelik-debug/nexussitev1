"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ServiceIcon } from "@/components/ServiceIcon";

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
  hidden: { opacity: 0, scale: 0.92, filter: "blur(6px)" },
  visible: (d: number) => ({
    opacity: 1, scale: 1, filter: "blur(0px)",
    transition: { duration: 0.7, delay: d, ease: EASE },
  }),
};
/* eslint-enable @typescript-eslint/no-explicit-any */

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

const values = [
  {
    icon: "shield",
    title: "Güvenilirlik",
    desc: "Müşterilerimize karşı her zaman dürüst ve şeffaf bir yaklaşım benimsiyor, güvenilir bir iş ortağı olmayı hedefliyoruz.",
    color: "from-emerald-500/15 to-emerald-600/10",
    borderColor: "border-emerald-500/15",
    iconColor: "text-emerald-500",
  },
  {
    icon: "users",
    title: "Müşteri Odaklılık",
    desc: "Her müşterimizin ihtiyacını anlayarak kişiye özel çözümler üretiyoruz. Memnuniyetiniz önceliğimizdir.",
    color: "from-brand/15 to-brand-dark/10",
    borderColor: "border-brand/15",
    iconColor: "text-brand",
  },
  {
    icon: "activity",
    title: "Profesyonellik",
    desc: "Alanında uzman kadromuzla sektördeki en güncel bilgileri takip ediyor ve en doğru çözümleri sunuyoruz.",
    color: "from-amber-500/15 to-amber-600/10",
    borderColor: "border-amber-500/15",
    iconColor: "text-amber-500",
  },
  {
    icon: "zap",
    title: "Hız & Verimlilik",
    desc: "Poliçe düzenlemeden hasar sürecine kadar tüm işlemlerinizi hızlı ve sorunsuz bir şekilde tamamlıyoruz.",
    color: "from-purple-500/15 to-purple-600/10",
    borderColor: "border-purple-500/15",
    iconColor: "text-purple-500",
  },
  {
    icon: "heart",
    title: "Sürekli Destek",
    desc: "7/24 ulaşılabilir ekibimizle hasar anından poliçe yenilemeye kadar her aşamada yanınızdayız.",
    color: "from-rose-500/15 to-rose-600/10",
    borderColor: "border-rose-500/15",
    iconColor: "text-rose-500",
  },
  {
    icon: "globe",
    title: "Geniş Ağ",
    desc: "36 çözüm ortağımız sayesinde en uygun fiyat ve en kapsamlı teminat seçeneklerini sizlere sunabiliyoruz.",
    color: "from-sky-500/15 to-sky-600/10",
    borderColor: "border-sky-500/15",
    iconColor: "text-sky-500",
  },
];

const timeline = [
  { year: "2014", title: "Kuruluş", desc: "Nexus Sigorta, İstanbul Ataşehir'de sigorta aracılık hizmetleri sunmaya başladı." },
  { year: "2016", title: "İlk Büyük Ortaklıklar", desc: "Allianz ve Anadolu Sigorta ile yetkili acentelik anlaşmaları imzalandı." },
  { year: "2018", title: "Kurumsal Büyüme", desc: "Kurumsal sigorta portföyü genişledi, mühendislik ve enerji projeleri sigortası eklendi." },
  { year: "2020", title: "Dijital Dönüşüm", desc: "Online teklif ve poliçe düzenleme altyapısı kurularak dijitalleşme adımları atıldı." },
  { year: "2022", title: "36 Çözüm Ortağı", desc: "Çözüm ortağı sayısı 36'ya ulaştı, PTT AVM ve A101 ile özel garanti paketleri başlatıldı." },
  { year: "2024", title: "Sektör Lideri", desc: "10.000+ müşteri portföyü, %98 memnuniyet oranı ve ödüllü hizmet kalitesi." },
];

export default function HakkimizdaPage() {
  return (
    <main>
      {/* ═══ Hero ═══ */}
      <section className="relative pt-20 pb-16 overflow-hidden bg-surface-warm">
        <div className="absolute inset-0 hero-grid-pattern opacity-50 pointer-events-none" />
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-brand/[0.04] blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-6 lg:px-8 max-w-7xl relative z-10">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.3}>
            <span className="section-label mb-6 block">Hakkımızda</span>
          </motion.div>
          <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={0.5}
            className="font-[family-name:var(--font-syne)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-black font-bold leading-[1.02] mb-6">
            Güvencenizin{" "}
            <em className="gradient-text not-italic">Arkasındayız</em>
          </motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.7}
            className="text-lg text-black/60 max-w-xl leading-relaxed">
            10 yılı aşkın deneyimimiz ve 36 güçlü çözüm ortağımızla sigorta sektöründe fark yaratıyoruz.
          </motion.p>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══ Hikayemiz ═══ */}
      <section className="py-16 sm:py-28 lg:py-40 bg-white relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[700px] h-[700px] rounded-full bg-brand/[0.03] blur-[150px] pointer-events-none" />

        <div className="container mx-auto px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left — Visual */}
            <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.1}
              className="relative">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-black/[0.04] shadow-2xl shadow-black/10">
                <Image
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=85"
                  alt="Nexus Sigorta profesyonel ekip"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>

              {/* Floating badges */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: EASE }}
                className="absolute top-2 right-2 sm:-top-4 sm:-right-4 glass-card-deep px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl shadow-xl z-10"
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
                className="absolute bottom-2 left-2 sm:-bottom-4 sm:-left-4 glass-card-deep px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl shadow-xl z-10"
                style={{ animation: "float-gentle 4s ease-in-out infinite 2s" }}
              >
                <span className="font-[family-name:var(--font-syne)] text-lg font-bold gradient-text">36+</span>
                <span className="text-xs text-black/60 block">Çözüm Ortağı</span>
              </motion.div>

              <div className="corner-accent-tl" />
              <div className="corner-accent-br" />
            </motion.div>

            {/* Right — Content */}
            <motion.div variants={fadeRight} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.15}>
              <div className="heading-side-line">
                <span className="section-label mb-6 block">Hikayemiz</span>
                <h2 className="font-[family-name:var(--font-syne)] text-3xl sm:text-4xl lg:text-5xl text-black font-bold leading-[1.05] mb-6">
                  Nexus Sigorta{" "}
                  <em className="gradient-text not-italic">kimdir?</em>
                </h2>
              </div>

              <div className="glass-block mb-5">
                <p className="text-lg text-black/65 leading-relaxed">
                  Nexus Sigorta, 2014 yılında İstanbul Ataşehir&apos;de kurulmuş bir sigorta aracılık firmasıdır. Kuruluşumuzdan bu yana müşterilerimize en uygun ve kapsamlı sigorta çözümlerini sunma misyonuyla çalışıyoruz.
                </p>
              </div>

              <p className="text-black/60 leading-relaxed mb-5">
                <span className="glass-capsule-gold !py-1 !px-3 !text-sm !rounded-lg text-brand-dark font-medium">36 çözüm ortağı</span> firmamız ile birlikte çalışarak, kurumsal ve bireysel tüm sigorta ihtiyaçlarınız için kişiye özel poliçeler hazırlıyoruz. Allianz, Anadolu Sigorta, Sompo, Türkiye Sigorta gibi sektörün en büyük firmalarıyla yetkili acentelik anlaşmalarımız bulunmaktadır.
              </p>

              <p className="text-black/60 leading-relaxed mb-8">
                Müşteri memnuniyetini ön planda tutan yaklaşımımız, hızlı ve şeffaf süreç yönetimimiz ile sektörde güvenilir bir marka haline geldik. Trafik sigortasından enerji projelerine, sağlık sigortasından seyahat sigortasına kadar geniş bir ürün yelpazesiyle hizmet veriyoruz.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link href="/hizmetler" className="btn-primary shine-effect">
                  <span>Hizmetlerimizi İnceleyin</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
                </Link>
                <a href="#contact" className="btn-outline">
                  <span>Bize Ulaşın</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══ İstatistikler ═══ */}
      <section className="py-20 lg:py-28 bg-surface-2 relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />
        <div className="container mx-auto px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { value: 10, suffix: "+", label: "Yıllık Deneyim", icon: "activity" },
              { value: 36, suffix: "+", label: "Çözüm Ortağı", icon: "globe" },
              { value: 10000, suffix: "+", label: "Mutlu Müşteri", icon: "users" },
              { value: 98, suffix: "%", label: "Memnuniyet Oranı", icon: "heart" },
            ].map((stat, i) => (
              <motion.div key={stat.label} variants={scaleIn} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.1}
                className="stat-card">
                <div className="w-12 h-12 rounded-xl bg-brand/10 border border-brand/15 flex items-center justify-center text-brand mb-4 mx-auto">
                  <ServiceIcon name={stat.icon} />
                </div>
                <span className="font-[family-name:var(--font-syne)] text-3xl lg:text-4xl font-bold gradient-text block mb-2">
                  <Counter target={stat.value} suffix={stat.suffix} />
                </span>
                <span className="text-sm text-black/60 font-medium">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══ Misyon & Vizyon ═══ */}
      <section className="py-16 sm:py-28 lg:py-40 bg-white relative overflow-hidden">
        <div className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] rounded-full bg-brand/[0.03] blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-6 lg:px-8 max-w-7xl relative z-10">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} className="text-center mb-16 heading-decor">
            <div className="heading-ring" />
            <span className="section-label justify-center mb-5 block">Misyon & Vizyon</span>
            <h2 className="font-[family-name:var(--font-syne)] text-3xl sm:text-4xl lg:text-5xl text-black font-bold leading-tight">
              Nereye <em className="gradient-text not-italic">yürüyoruz?</em>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.1}>
              <div className="bento-card p-8 md:p-10 h-full bg-white">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand/15 to-brand-dark/10 border border-brand/15 flex items-center justify-center text-brand mb-6">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  </svg>
                </div>
                <h3 className="font-[family-name:var(--font-syne)] text-2xl font-bold text-black mb-4">Misyonumuz</h3>
                <p className="text-black/60 leading-relaxed text-lg">
                  Müşterilerimizin sigorta ihtiyaçlarını en doğru şekilde analiz ederek, en uygun fiyat ve en kapsamlı teminat seçeneklerini sunmak. Her bir müşterimize kişiye özel çözümler üreterek, sigorta sürecini basit, hızlı ve güvenilir hale getirmek.
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeRight} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.2}>
              <div className="bento-card p-8 md:p-10 h-full bg-white">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/15 to-emerald-600/10 border border-emerald-500/15 flex items-center justify-center text-emerald-500 mb-6">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="font-[family-name:var(--font-syne)] text-2xl font-bold text-black mb-4">Vizyonumuz</h3>
                <p className="text-black/60 leading-relaxed text-lg">
                  Türkiye&apos;nin en güvenilir ve yenilikçi sigorta aracılık firması olmak. Teknolojiyi ve insan odaklı yaklaşımı birleştirerek, sigorta sektöründe referans noktası haline gelmek ve müşterilerimizin hayatını kolaylaştırmak.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══ Değerlerimiz ═══ */}
      <section className="py-16 sm:py-28 lg:py-40 bg-surface-warm relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-200px] right-[-200px] w-[600px] h-[600px] rounded-full bg-brand/[0.04] blur-[100px] animate-aurora" />
        </div>

        <div className="container mx-auto px-6 lg:px-8 max-w-7xl relative z-10">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} className="text-center mb-16 heading-decor">
            <div className="heading-ring" />
            <span className="section-label justify-center mb-5 block">Değerlerimiz</span>
            <h2 className="font-[family-name:var(--font-syne)] text-3xl sm:text-4xl lg:text-5xl text-black font-bold leading-tight">
              Bizi biz yapan <em className="gradient-text not-italic">değerler</em>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map((item, i) => (
              <motion.div key={item.title} variants={scaleIn} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.08}>
                <div className="group glass-card rounded-2xl p-7 h-full">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} border ${item.borderColor} flex items-center justify-center ${item.iconColor} mb-5 group-hover:scale-110 transition-transform duration-500`}>
                    <ServiceIcon name={item.icon} />
                  </div>
                  <h3 className="font-semibold text-black/80 text-lg mb-2 group-hover:text-brand transition-colors">{item.title}</h3>
                  <p className="text-sm text-black/55 leading-relaxed group-hover:text-black/70 transition-colors">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══ Tarihçe / Timeline ═══ */}
      <section className="py-16 sm:py-28 lg:py-40 bg-white relative overflow-hidden">
        <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] rounded-full bg-brand/[0.03] blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-6 lg:px-8 max-w-4xl relative z-10">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} className="text-center mb-16 heading-decor">
            <div className="heading-ring" />
            <span className="section-label justify-center mb-5 block">Tarihçemiz</span>
            <h2 className="font-[family-name:var(--font-syne)] text-3xl sm:text-4xl lg:text-5xl text-black font-bold leading-tight">
              Yolculuğumuzun <em className="gradient-text not-italic">kilometre taşları</em>
            </h2>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-brand/30 via-brand/15 to-transparent lg:-translate-x-px" />

            <div className="space-y-12">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  variants={i % 2 === 0 ? fadeLeft : fadeRight}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={0.1}
                  className={`relative flex items-start gap-6 lg:gap-0 ${
                    i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-6 lg:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-brand border-[3px] border-white shadow-md shadow-brand/20 z-10 mt-2" />

                  {/* Content */}
                  <div className={`pl-14 lg:pl-0 lg:w-1/2 ${i % 2 === 0 ? "lg:pr-12 lg:text-right" : "lg:pl-12"}`}>
                    <div className="glass-card rounded-2xl p-6 inline-block">
                      <span className="inline-block px-3 py-1 bg-brand/10 text-brand text-xs font-bold rounded-full mb-3">{item.year}</span>
                      <h3 className="font-[family-name:var(--font-syne)] text-lg font-bold text-black mb-2">{item.title}</h3>
                      <p className="text-sm text-black/60 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>

                  {/* Spacer for other side */}
                  <div className="hidden lg:block lg:w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══ Neden Biz ═══ */}
      <section className="py-16 sm:py-28 lg:py-40 bg-surface-2 relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />
        <div className="container mx-auto px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.1}>
              <div className="heading-side-line">
                <span className="section-label mb-6 block">Neden Nexus?</span>
                <h2 className="font-[family-name:var(--font-syne)] text-3xl sm:text-4xl lg:text-5xl text-black font-bold leading-[1.05] mb-6">
                  Farkımız{" "}
                  <em className="gradient-text not-italic">nedir?</em>
                </h2>
              </div>

              <div className="space-y-5">
                {[
                  { num: "01", title: "Kişiye Özel Çözüm", desc: "Her müşterimizin ihtiyacına göre özelleştirilmiş poliçe seçenekleri sunuyoruz." },
                  { num: "02", title: "Rekabetçi Fiyatlandırma", desc: "36 çözüm ortağımız arasından en uygun fiyat teklifini sizin için buluyoruz." },
                  { num: "03", title: "Hızlı Hasar Yönetimi", desc: "Hasar anında hızlı müdahale ve sürecin sorunsuz tamamlanmasını sağlıyoruz." },
                  { num: "04", title: "Şeffaf İletişim", desc: "Poliçe detaylarını açık ve anlaşılır şekilde aktarıyor, sürpriz masraf bırakmıyoruz." },
                ].map((step, i) => (
                  <motion.div key={i} variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.2 + i * 0.1}
                    className="group flex gap-5 p-5 rounded-2xl glass-card">
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

            <motion.div variants={fadeRight} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.2}
              className="relative hidden lg:block">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl shadow-black/10">
                <Image
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=85"
                  alt="Nexus Sigorta danışmanlık"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>

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
                    <p className="text-black/80 text-sm font-semibold">%98 Memnuniyet</p>
                    <p className="text-black/50 text-xs">Müşteri değerlendirmesi</p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-brand" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  ))}
                </div>
              </motion.div>

              <div className="corner-accent-tl" />
              <div className="corner-accent-br" />
            </motion.div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══ CTA ═══ */}
      <section className="relative py-20 sm:py-32 lg:py-44 overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-br from-brand/[0.04] via-brand/[0.08] to-brand/[0.04]" />
        <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />
        <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full bg-brand/10 blur-[150px] pointer-events-none" />

        <div className="container mx-auto px-6 lg:px-8 max-w-7xl relative z-10 text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} className="heading-decor">
            <div className="heading-ring" />
            <span className="section-label justify-center mb-8 block">İletişime Geçin</span>
            <h2 className="font-[family-name:var(--font-syne)] text-4xl md:text-5xl lg:text-6xl text-black font-bold mb-6 leading-[1.05]">
              Geleceğinizi birlikte<br />
              <span className="gradient-text">güvence altına alalım</span>
            </h2>
            <p className="text-black/60 text-lg max-w-md mx-auto mb-10 leading-relaxed glass-block">
              Uzman ekibimizle tanışın, <span className="glass-capsule-gold !py-1 !px-3 !text-sm !rounded-lg text-brand-dark font-medium">ücretsiz danışmanlık</span> için hemen arayın.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="tel:+905332516773" className="btn-primary shine-effect">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <span>Hemen Arayın</span>
              </a>
              <a href="https://wa.me/905332516773" target="_blank" className="btn-outline">
                <span>WhatsApp ile Yazın</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
