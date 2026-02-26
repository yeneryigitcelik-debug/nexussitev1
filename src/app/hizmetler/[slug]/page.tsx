import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { services, getServiceBySlug } from "@/lib/services";
import { ServiceIcon } from "@/components/ServiceIcon";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const svc = getServiceBySlug(slug);
  if (!svc) return { title: "Hizmet Bulunamadı" };
  return { title: `${svc.title} — Nexus Sigorta`, description: svc.description };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const svc = getServiceBySlug(slug);
  if (!svc) notFound();

  const related = services.filter((s) => s.category === svc.category && s.slug !== svc.slug).slice(0, 3);

  return (
    <main>
      {/* Hero */}
      <section className="relative pt-32 pb-0 overflow-hidden">
        <div className="relative h-[400px] md:h-[480px]">
          <Image src={svc.image} alt={svc.title} fill className="object-cover" priority unoptimized />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
          <div className="absolute bottom-0 left-0 right-0 z-10">
            <div className="container mx-auto px-6 lg:px-8 max-w-7xl pb-12">
              <Link href="/hizmetler" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white mb-6 transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                Tüm Hizmetler
              </Link>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 flex items-center justify-center text-amber-400">
                  <ServiceIcon name={svc.icon} />
                </div>
                <span className="px-4 py-1.5 bg-amber-500/20 backdrop-blur-sm border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-wider rounded-full">
                  {svc.category === "kurumsal" ? "Kurumsal" : "Bireysel"}
                </span>
              </div>
              <h1 className="font-[family-name:var(--font-syne)] text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.05]">
                {svc.title}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
          <div className="grid lg:grid-cols-3 gap-16">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <p className="text-xl text-gray-600 leading-relaxed mb-10">{svc.longDescription}</p>

              {/* Features */}
              <h2 className="font-[family-name:var(--font-syne)] text-2xl font-bold text-gray-900 mb-6">Öne Çıkan Özellikler</h2>
              <div className="grid sm:grid-cols-2 gap-4 mb-14">
                {svc.features.map((f, i) => (
                  <div key={i} className="group flex items-center gap-4 p-5 bg-[#FAFAF8] border border-gray-100 rounded-2xl hover:border-amber-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 flex-shrink-0 group-hover:bg-amber-500 group-hover:text-white group-hover:border-transparent transition-all">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>
                    </div>
                    <span className="font-medium text-gray-700">{f}</span>
                  </div>
                ))}
              </div>

              {/* Coverages */}
              <h2 className="font-[family-name:var(--font-syne)] text-2xl font-bold text-gray-900 mb-6">Teminat Kapsamı</h2>
              <div className="grid sm:grid-cols-2 gap-3 mb-10">
                {svc.coverages.map((c, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-gray-900 text-white">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400 flex-shrink-0">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    </div>
                    <span className="text-sm font-medium">{c}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* CTA Card */}
              <div className="sticky top-28 space-y-6">
                <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-3xl p-8 text-center shadow-xl shadow-amber-200/30">
                  <h3 className="font-[family-name:var(--font-syne)] text-2xl font-bold text-white mb-3">Ücretsiz Teklif Alın</h3>
                  <p className="text-amber-100 text-sm mb-6 leading-relaxed">En uygun {svc.shortTitle.toLowerCase()} sigortası teklifini hemen alın.</p>
                  <a href="tel:+905332516773"
                    className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-white text-amber-700 font-semibold rounded-xl hover:shadow-lg transition-all mb-3">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    Hemen Arayın
                  </a>
                  <a href="https://wa.me/905332516773" target="_blank"
                    className="flex items-center justify-center gap-2 w-full px-6 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all">
                    WhatsApp ile Yazın
                  </a>
                </div>

                {/* Quick Info */}
                <div className="bg-[#FAFAF8] border border-gray-100 rounded-2xl p-6 space-y-4">
                  <h4 className="font-[family-name:var(--font-syne)] font-bold text-gray-900">Hızlı Bilgi</h4>
                  {[
                    { l: "Kategori", v: svc.category === "kurumsal" ? "Kurumsal" : "Bireysel" },
                    { l: "Çözüm Ortağı", v: "36 Firma" },
                    { l: "Destek", v: "7/24 Aktif" },
                  ].map((x, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                      <span className="text-sm text-gray-400">{x.l}</span>
                      <span className="text-sm font-semibold text-gray-900">{x.v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Related */}
      <section className="py-20 bg-[#FAFAF8]">
        <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
          <h2 className="font-[family-name:var(--font-syne)] text-3xl font-bold text-gray-900 mb-10">İlgili Hizmetler</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {related.map((r) => (
              <Link key={r.slug} href={`/hizmetler/${r.slug}`}
                className="group block bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-amber-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
                <div className="relative h-40 overflow-hidden">
                  <Image src={r.image} alt={r.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" unoptimized />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
                <div className="p-5">
                  <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 mb-3 -mt-8 relative z-10 shadow-md border border-amber-100">
                    <ServiceIcon name={r.icon} />
                  </div>
                  <h3 className="font-[family-name:var(--font-syne)] font-semibold text-gray-900 mb-1">{r.title}</h3>
                  <p className="text-sm text-gray-400 line-clamp-2">{r.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
