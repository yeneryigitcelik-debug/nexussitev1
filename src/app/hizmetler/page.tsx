import Link from "next/link";
import Image from "next/image";
import { services } from "@/lib/services";
import { ServiceIcon } from "@/components/ServiceIcon";

export const metadata = { title: "Hizmetlerimiz — Nexus Sigorta" };

export default function HizmetlerPage() {
  const kurumsal = services.filter((s) => s.category === "kurumsal");
  const bireysel = services.filter((s) => s.category === "bireysel");

  return (
    <main>
      {/* Hero */}
      <section className="relative pt-36 pb-20 bg-white overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-amber-100/40 blur-3xl" />
        <div className="container mx-auto px-6 lg:px-8 max-w-7xl relative z-10">
          <span className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[3px] text-amber-600 mb-4">
            <span className="w-6 h-[2px] bg-amber-500" /> Hizmetlerimiz
          </span>
          <h1 className="font-[family-name:var(--font-syne)] text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.05] mb-4">
            Sigorta <em className="gradient-text not-italic">Çözümlerimiz</em>
          </h1>
          <p className="text-lg text-gray-500 max-w-xl">
            Kurumsal ve bireysel tüm sigorta ihtiyaçlarınız için kapsamlı çözümler sunuyoruz.
          </p>
        </div>
      </section>

      <div className="section-divider" />

      {/* Kurumsal */}
      <section className="py-20 bg-[#FAFAF8]">
        <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
          <h2 className="font-[family-name:var(--font-syne)] text-3xl font-bold text-gray-900 mb-10">Kurumsal Sigortalar</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {kurumsal.map((svc, i) => (
              <Link key={svc.slug} href={`/hizmetler/${svc.slug}`}
                className="group block relative bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-amber-200 hover:shadow-xl hover:shadow-amber-50/50 hover:-translate-y-1.5 transition-all duration-500">
                <div className="relative h-44 overflow-hidden">
                  <Image src={svc.image} alt={svc.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" unoptimized />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <span className="absolute bottom-4 left-5 font-[family-name:var(--font-syne)] text-5xl font-extrabold text-white/10">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 mb-4 -mt-12 relative z-10 shadow-lg group-hover:bg-gradient-to-br group-hover:from-amber-500 group-hover:to-amber-600 group-hover:text-white group-hover:border-transparent transition-all">
                    <ServiceIcon name={svc.icon} />
                  </div>
                  <h3 className="font-[family-name:var(--font-syne)] text-lg font-semibold text-gray-900 mb-2">{svc.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed mb-4">{svc.description}</p>
                  <span className="text-sm font-medium text-amber-600 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    Detaylı Bilgi <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Bireysel */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
          <h2 className="font-[family-name:var(--font-syne)] text-3xl font-bold text-gray-900 mb-10">Bireysel Sigortalar</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {bireysel.map((svc, i) => (
              <Link key={svc.slug} href={`/hizmetler/${svc.slug}`}
                className="group block relative bg-[#FAFAF8] border border-gray-100 rounded-2xl overflow-hidden hover:border-amber-200 hover:shadow-xl hover:shadow-amber-50/50 hover:-translate-y-1.5 transition-all duration-500">
                <div className="relative h-44 overflow-hidden">
                  <Image src={svc.image} alt={svc.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" unoptimized />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <span className="absolute bottom-4 left-5 font-[family-name:var(--font-syne)] text-5xl font-extrabold text-white/10">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 mb-4 -mt-12 relative z-10 shadow-lg group-hover:bg-gradient-to-br group-hover:from-amber-500 group-hover:to-amber-600 group-hover:text-white group-hover:border-transparent transition-all">
                    <ServiceIcon name={svc.icon} />
                  </div>
                  <h3 className="font-[family-name:var(--font-syne)] text-lg font-semibold text-gray-900 mb-2">{svc.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed mb-4">{svc.description}</p>
                  <span className="text-sm font-medium text-amber-600 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    Detaylı Bilgi <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
