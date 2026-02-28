"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { getAllPosts, getCategories } from "@/lib/blog";

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

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPage() {
  const allPosts = getAllPosts();
  const categories = getCategories();
  const [activeCategory, setActiveCategory] = useState("Tümü");

  const filteredPosts = activeCategory === "Tümü"
    ? allPosts
    : allPosts.filter((p) => p.category === activeCategory);

  const featuredPost = filteredPosts[0];
  const gridPosts = filteredPosts.slice(1);

  return (
    <main>
      {/* Hero */}
      <section className="relative pt-20 pb-16 overflow-hidden bg-surface-warm">
        <div className="absolute inset-0 hero-grid-pattern opacity-50 pointer-events-none" />
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-brand/[0.04] blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-6 lg:px-8 max-w-7xl relative z-10">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.3}>
            <span className="section-label mb-6 block">Blog</span>
          </motion.div>
          <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={0.5}
            className="font-[family-name:var(--font-syne)] text-5xl lg:text-6xl xl:text-7xl text-black font-bold leading-[1.02] mb-6">
            Sigorta{" "}
            <em className="gradient-text not-italic">Rehberi</em>
          </motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.7}
            className="text-lg text-black/40 max-w-xl leading-relaxed">
            Sigorta dünyasından güncel bilgiler, ipuçları ve uzman görüşleri ile doğru kararlar verin.
          </motion.p>
        </div>
      </section>

      <div className="section-divider" />

      {/* Category Filter + Posts */}
      <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />
        <div className="container mx-auto px-6 lg:px-8 max-w-7xl relative z-10">
          {/* Category Filter */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}
            className="flex flex-wrap items-center gap-2 mb-16">
            {["Tümü", ...categories].map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${
                  activeCategory === cat
                    ? "bg-brand text-white border-brand shadow-[0_2px_10px_rgba(212,160,18,0.25)]"
                    : "bg-white text-black/50 border-black/[0.08] hover:border-brand/30 hover:text-brand hover:bg-brand/5"
                }`}>
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Featured Post */}
          {featuredPost && (
            <motion.div variants={scaleIn} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}
              className="mb-16">
              <Link href={`/blog/${featuredPost.slug}`}
                className="group block rounded-3xl overflow-hidden bg-white border border-black/[0.06] hover:border-brand/25 transition-all duration-500 hover:-translate-y-1 shadow-sm hover:shadow-xl">
                <div className="grid md:grid-cols-2">
                  <div className="relative h-64 md:h-full min-h-[320px] overflow-hidden">
                    <Image src={featuredPost.image} alt={featuredPost.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" unoptimized />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent md:bg-gradient-to-l" />
                    <span className="absolute top-5 left-5 px-4 py-1.5 bg-brand/20 backdrop-blur-sm border border-brand/30 text-white text-[10px] font-semibold uppercase tracking-wider rounded-full">
                      Öne Çıkan
                    </span>
                  </div>
                  <div className="p-8 md:p-10 lg:p-14 flex flex-col justify-center">
                    <span className="inline-block px-3 py-1 bg-brand/10 text-brand text-xs font-semibold rounded-full mb-4 w-fit">
                      {featuredPost.category}
                    </span>
                    <h2 className="font-[family-name:var(--font-syne)] text-2xl lg:text-3xl text-black font-bold mb-4 group-hover:text-brand transition-colors leading-tight">
                      {featuredPost.title}
                    </h2>
                    <p className="text-black/40 leading-relaxed mb-6 line-clamp-3">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-black/30 mb-6">
                      <span className="flex items-center gap-1.5">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                        {formatDate(featuredPost.date)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        {featuredPost.readTime} okuma
                      </span>
                    </div>
                    <span className="flex items-center gap-1.5 text-sm font-semibold text-brand">
                      Devamını Oku
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Blog Grid */}
          {gridPosts.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {gridPosts.map((post, i) => (
                <motion.div key={post.slug} variants={scaleIn} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.08}>
                  <Link href={`/blog/${post.slug}`}
                    className="group block relative rounded-2xl overflow-hidden card-image-zoom bg-white border border-black/[0.06] hover:border-brand/25 transition-all duration-500 hover:-translate-y-2 shadow-sm hover:shadow-lg h-full">
                    <div className="relative h-52 overflow-hidden">
                      <Image src={post.image} alt={post.title} fill className="object-cover card-img" unoptimized />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                      <span className="absolute top-4 right-4 px-3 py-1 bg-brand/20 backdrop-blur-sm border border-brand/30 text-white text-[10px] font-medium uppercase tracking-wider rounded-full">
                        {post.category}
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="font-semibold text-black/80 text-lg mb-2 group-hover:text-brand transition-colors leading-snug">
                        {post.title}
                      </h3>
                      <p className="text-sm text-black/40 leading-relaxed mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-black/30 mb-4">
                        <span className="flex items-center gap-1">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                          {formatDate(post.date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                          {post.readTime}
                        </span>
                      </div>
                      <span className="flex items-center gap-1.5 text-sm font-medium text-brand opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400">
                        Devamını Oku
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          {filteredPosts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-black/30 text-lg">Bu kategoride henüz yazı bulunmuyor.</p>
            </div>
          )}
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
              Sigorta hakkında <span className="gradient-text">sorunuz mu var?</span>
            </h2>
            <p className="text-black/40 text-lg max-w-md mx-auto mb-10 leading-relaxed">
              Uzman ekibimiz tüm sorularınızı yanıtlamak için hazır.
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
