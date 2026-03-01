"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { services } from "@/lib/services";
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

const scaleIn: any = {
  hidden: { opacity: 0, scale: 0.92, filter: "blur(6px)" },
  visible: (d: number) => ({
    opacity: 1, scale: 1, filter: "blur(0px)",
    transition: { duration: 0.7, delay: d, ease: EASE },
  }),
};
/* eslint-enable @typescript-eslint/no-explicit-any */

export default function HizmetlerPage() {
  const kurumsal = services.filter((s) => s.category === "kurumsal");
  const bireysel = services.filter((s) => s.category === "bireysel");

  return (
    <main>
      {/* Hero */}
      <section className="relative pt-20 pb-16 overflow-hidden bg-surface-warm">
        <div className="absolute inset-0 hero-grid-pattern opacity-50 pointer-events-none" />
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-brand/[0.04] blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-6 lg:px-8 max-w-7xl relative z-10">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.3}>
            <span className="section-label mb-6 block">Hizmetlerimiz</span>
          </motion.div>
          <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={0.5}
            className="font-[family-name:var(--font-syne)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-black font-bold leading-[1.02] mb-6">
            Sigorta{" "}
            <em className="gradient-text not-italic">Çözümlerimiz</em>
          </motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.7}
            className="text-lg text-black/60 max-w-xl leading-relaxed">
            Kurumsal ve bireysel tüm sigorta ihtiyaçlarınız için kapsamlı ve güvenilir çözümler sunuyoruz.
          </motion.p>
        </div>
      </section>

      <div className="section-divider" />

      {/* Kurumsal */}
      <section className="py-24 lg:py-32 bg-surface-2 relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />
        <div className="container mx-auto px-6 lg:px-8 max-w-7xl relative z-10">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}
            className="flex items-center gap-4 mb-12">
            <h2 className="font-[family-name:var(--font-syne)] text-3xl lg:text-4xl text-black font-bold">Kurumsal Sigortalar</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-brand/20 to-transparent" />
            <span className="text-brand/60 text-sm font-medium">{kurumsal.length} Hizmet</span>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {kurumsal.map((svc, i) => (
              <motion.div key={svc.slug} variants={scaleIn} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.08}
                className="flex">
                <Link href={`/hizmetler/${svc.slug}`}
                  className="group flex flex-col relative rounded-2xl overflow-hidden card-image-zoom bg-white border border-black/[0.12] hover:border-brand/30 transition-all duration-500 hover:-translate-y-2 shadow-[0_4px_20px_rgba(0,0,0,0.10)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] w-full">
                  <div className="relative h-52 overflow-hidden flex-shrink-0">
                    <Image src={svc.image} alt={svc.title} fill className="object-cover card-img" unoptimized />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                    <span className="absolute bottom-4 left-5 font-[family-name:var(--font-syne)] text-5xl font-bold text-white/[0.06] group-hover:text-brand/[0.15] transition-colors duration-500">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="absolute top-4 right-4 px-3 py-1 bg-brand/20 backdrop-blur-sm border border-brand/30 text-white text-[10px] font-medium uppercase tracking-wider rounded-full">
                      Kurumsal
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="w-12 h-12 rounded-xl bg-brand/10 border border-brand/15 flex items-center justify-center text-brand mb-4 -mt-12 relative z-10 shadow-lg shadow-black/10 group-hover:bg-brand group-hover:text-white group-hover:border-brand transition-all duration-500">
                      <ServiceIcon name={svc.icon} />
                    </div>
                    <h3 className="font-semibold text-black/80 text-lg mb-2 group-hover:text-brand transition-colors">{svc.title}</h3>
                    <p className="text-sm text-black/60 leading-relaxed mb-4 flex-1">{svc.description}</p>
                    <span className="flex items-center gap-1.5 text-sm font-medium text-brand opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400">
                      Detaylı Bilgi
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Bireysel */}
      <section className="py-24 lg:py-32 bg-surface-warm relative overflow-hidden">
        <div className="absolute bottom-[-200px] left-[-200px] w-[500px] h-[500px] rounded-full bg-brand/[0.03] blur-[120px] pointer-events-none" />
        <div className="container mx-auto px-6 lg:px-8 max-w-7xl relative z-10">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}
            className="flex items-center gap-4 mb-12">
            <h2 className="font-[family-name:var(--font-syne)] text-3xl lg:text-4xl text-black font-bold">Bireysel Sigortalar</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-brand/20 to-transparent" />
            <span className="text-brand/60 text-sm font-medium">{bireysel.length} Hizmet</span>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {bireysel.map((svc, i) => (
              <motion.div key={svc.slug} variants={scaleIn} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.08}
                className="flex">
                <Link href={`/hizmetler/${svc.slug}`}
                  className="group flex flex-col relative rounded-2xl overflow-hidden card-image-zoom bg-white border border-black/[0.12] hover:border-brand/30 transition-all duration-500 hover:-translate-y-2 shadow-[0_4px_20px_rgba(0,0,0,0.10)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] w-full">
                  <div className="relative h-52 overflow-hidden flex-shrink-0">
                    <Image src={svc.image} alt={svc.title} fill className="object-cover card-img" unoptimized />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                    <span className="absolute bottom-4 left-5 font-[family-name:var(--font-syne)] text-5xl font-bold text-white/[0.06] group-hover:text-brand/[0.15] transition-colors duration-500">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="absolute top-4 right-4 px-3 py-1 bg-black/20 backdrop-blur-sm text-white/70 text-[10px] font-medium uppercase tracking-wider rounded-full">
                      Bireysel
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="w-12 h-12 rounded-xl bg-brand/10 border border-brand/15 flex items-center justify-center text-brand mb-4 -mt-12 relative z-10 shadow-lg shadow-black/10 group-hover:bg-brand group-hover:text-white group-hover:border-brand transition-all duration-500">
                      <ServiceIcon name={svc.icon} />
                    </div>
                    <h3 className="font-semibold text-black/80 text-lg mb-2 group-hover:text-brand transition-colors">{svc.title}</h3>
                    <p className="text-sm text-black/60 leading-relaxed mb-4 flex-1">{svc.description}</p>
                    <span className="flex items-center gap-1.5 text-sm font-medium text-brand opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400">
                      Detaylı Bilgi
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* CTA */}
      <section className="relative py-32 overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-br from-brand/[0.04] via-brand/[0.08] to-brand/[0.04]" />
        <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full bg-brand/10 blur-[150px] pointer-events-none" />

        <div className="container mx-auto px-6 lg:px-8 max-w-7xl relative z-10 text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}>
            <h2 className="font-[family-name:var(--font-syne)] text-4xl md:text-5xl lg:text-6xl text-black font-bold mb-6">
              Hangi sigortaya <span className="gradient-text">ihtiyacınız var?</span>
            </h2>
            <p className="text-black/60 text-lg max-w-md mx-auto mb-10 leading-relaxed">
              Size en uygun sigorta paketini birlikte belirleyelim.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="tel:+905332516773" className="btn-primary shine-effect">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <span>Hemen Arayın</span>
              </a>
              <a href="https://wa.me/905332516773" target="_blank" className="btn-outline">
                <span>WhatsApp ile Yazın</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
