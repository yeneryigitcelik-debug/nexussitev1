import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { services, getServiceBySlug } from "@/lib/services";
import { ServiceIcon } from "@/components/ServiceIcon";
import { JsonLd } from "@/components/JsonLd";
import {
  createPageMetadata,
  createServiceJsonLd,
  createBreadcrumbJsonLd,
  SITE_URL,
} from "@/lib/seo";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const svc = getServiceBySlug(slug);
  if (!svc) return { title: "Hizmet Bulunamadı" };
  return createPageMetadata({
    title: svc.title,
    description: svc.description,
    path: `/hizmetler/${svc.slug}`,
    ogImage: svc.image,
    keywords: [svc.title, svc.shortTitle, "sigorta", svc.category === "kurumsal" ? "kurumsal sigorta" : "bireysel sigorta"],
  });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const svc = getServiceBySlug(slug);
  if (!svc) notFound();

  const related = services.filter((s) => s.category === svc.category && s.slug !== svc.slug).slice(0, 3);

  return (
    <main>
      <JsonLd data={createServiceJsonLd(svc)} />
      <JsonLd
        data={createBreadcrumbJsonLd([
          { name: "Ana Sayfa", url: SITE_URL },
          { name: "Hizmetler", url: `${SITE_URL}/hizmetler` },
          { name: svc.title, url: `${SITE_URL}/hizmetler/${svc.slug}` },
        ])}
      />
      {/* Hero */}
      <section className="relative pt-0 pb-0 overflow-hidden">
        <div className="relative h-[320px] sm:h-[400px] md:h-[560px]">
          <Image src={svc.image} alt={svc.title} fill className="object-cover" priority unoptimized />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
          <div className="absolute inset-0 hero-grid-pattern opacity-20 pointer-events-none" />

          <div className="absolute bottom-0 left-0 right-0 z-10">
            <div className="container mx-auto px-6 lg:px-8 max-w-7xl pb-14">
              <Link href="/hizmetler"
                className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white mb-8 transition-colors group">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:-translate-x-1 transition-transform"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                Tüm Hizmetler
              </Link>

              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-xl bg-white/10 backdrop-blur-lg border border-white/15 flex items-center justify-center text-brand-light">
                  <ServiceIcon name={svc.icon} />
                </div>
                <span className="px-4 py-1.5 bg-brand/20 backdrop-blur-sm border border-brand/30 text-white text-xs font-semibold uppercase tracking-wider rounded-full">
                  {svc.category === "kurumsal" ? "Kurumsal" : "Bireysel"}
                </span>
              </div>

              <h1 className="font-[family-name:var(--font-syne)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-[1.05] font-bold">
                {svc.title}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
          <div className="grid lg:grid-cols-3 gap-16">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <p className="text-xl text-black/50 leading-relaxed mb-12">{svc.longDescription}</p>

              {/* Features */}
              <h2 className="font-[family-name:var(--font-syne)] text-2xl text-black font-bold mb-6">Öne Çıkan Özellikler</h2>
              <div className="grid sm:grid-cols-2 gap-4 mb-16">
                {svc.features.map((f, i) => (
                  <div key={i} className="group flex items-center gap-4 p-5 glass-card rounded-2xl">
                    <div className="w-10 h-10 rounded-xl bg-brand/10 border border-brand/15 flex items-center justify-center text-brand flex-shrink-0 group-hover:bg-brand group-hover:text-white group-hover:border-brand transition-all duration-500">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>
                    </div>
                    <span className="font-medium text-black/60">{f}</span>
                  </div>
                ))}
              </div>

              {/* Coverages */}
              <h2 className="font-[family-name:var(--font-syne)] text-2xl text-black font-bold mb-6">Teminat Kapsamı</h2>
              <div className="grid sm:grid-cols-2 gap-3 mb-10">
                {svc.coverages.map((c, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 rounded-xl glass-card-gold">
                    <div className="w-8 h-8 rounded-lg bg-brand/15 flex items-center justify-center text-brand flex-shrink-0">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    </div>
                    <span className="text-sm font-medium text-black/50">{c}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-6">
                {/* CTA Card */}
                <div className="relative rounded-3xl overflow-hidden p-8 text-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand to-brand-dark" />
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
                  <div className="relative z-10">
                    <h3 className="font-[family-name:var(--font-syne)] text-2xl text-white font-bold mb-3">Ücretsiz Teklif Alın</h3>
                    <p className="text-white/70 text-sm mb-6 leading-relaxed">
                      En uygun {svc.shortTitle.toLowerCase()} sigortası teklifini hemen alın.
                    </p>
                    <a href="tel:+905332516773"
                      className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-white text-black font-semibold rounded-xl hover:bg-gray-100 transition-all mb-3">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                      Hemen Arayın
                    </a>
                    <a href="https://wa.me/905332516773" target="_blank"
                      className="flex items-center justify-center gap-2 w-full px-6 py-4 border-2 border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-all">
                      WhatsApp ile Yazın
                    </a>
                  </div>
                </div>

                {/* Quick Info */}
                <div className="glass-card rounded-2xl p-6 space-y-4">
                  <h4 className="font-semibold text-black/80">Hızlı Bilgi</h4>
                  {[
                    { l: "Kategori", v: svc.category === "kurumsal" ? "Kurumsal" : "Bireysel" },
                    { l: "Çözüm Ortağı", v: "36 Firma" },
                    { l: "Destek", v: "7/24 Aktif" },
                  ].map((x, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-black/[0.06] last:border-0">
                      <span className="text-sm text-black/35">{x.l}</span>
                      <span className="text-sm font-semibold text-black/70">{x.v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Related Services */}
      <section className="py-20 lg:py-28 bg-surface-warm">
        <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="font-[family-name:var(--font-syne)] text-3xl text-black font-bold">İlgili Hizmetler</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-brand/20 to-transparent" />
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {related.map((r) => (
              <Link key={r.slug} href={`/hizmetler/${r.slug}`}
                className="group block rounded-2xl overflow-hidden card-image-zoom bg-white border border-black/[0.06] hover:border-brand/25 transition-all duration-500 hover:-translate-y-2 shadow-sm hover:shadow-lg">
                <div className="relative h-44 overflow-hidden">
                  <Image src={r.image} alt={r.title} fill className="object-cover card-img" unoptimized />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                </div>
                <div className="p-5">
                  <div className="w-10 h-10 rounded-lg bg-brand/10 border border-brand/15 flex items-center justify-center text-brand mb-3 -mt-8 relative z-10 shadow-md shadow-black/10 group-hover:bg-brand group-hover:text-white group-hover:border-brand transition-all duration-500">
                    <ServiceIcon name={r.icon} />
                  </div>
                  <h3 className="font-semibold text-black/80 mb-1 group-hover:text-brand transition-colors">{r.title}</h3>
                  <p className="text-sm text-black/60 line-clamp-2">{r.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
