import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kullanım Koşulları | Nexus Sigorta",
  description:
    "Nexus Sigorta web sitesi kullanım koşulları ve şartları.",
};

export default function KullanimKosullariPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative pt-20 pb-16 overflow-hidden bg-surface-warm">
        <div className="absolute inset-0 hero-grid-pattern opacity-50 pointer-events-none" />
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-brand/[0.04] blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-6 lg:px-8 max-w-7xl relative z-10">
          <span className="section-label mb-6 block">Yasal</span>
          <h1 className="font-[family-name:var(--font-syne)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-black font-bold leading-[1.02] mb-6">
            Kullanım{" "}
            <em className="gradient-text not-italic">Koşulları</em>
          </h1>
          <p className="text-lg text-black/60 max-w-xl leading-relaxed">
            Web sitemizi kullanmadan önce lütfen aşağıdaki koşulları
            dikkatlice okuyunuz.
          </p>
        </div>
      </section>

      <div className="section-divider" />

      {/* Content */}
      <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[700px] h-[700px] rounded-full bg-brand/[0.03] blur-[150px] pointer-events-none" />

        <div className="container mx-auto px-6 lg:px-8 max-w-4xl relative z-10">
          <div className="prose-legal">
            <div className="glass-card rounded-2xl p-8 md:p-12 mb-8">
              <p>
                Bu web sitesi (nexussigorta.com.tr), Nexus Sigorta Aracılık
                Hizmetleri A.Ş. (&quot;Nexus Sigorta&quot;) tarafından
                işletilmektedir. Web sitemizi kullanarak aşağıdaki koşulları
                kabul etmiş sayılırsınız. Lütfen bu koşulları dikkatlice
                okuyunuz.
              </p>
            </div>

            <div className="space-y-8">
              <section>
                <h2>1. Genel Hükümler</h2>
                <p>
                  Bu web sitesine erişim sağlayarak veya siteyi kullanarak, bu
                  Kullanım Koşullarını okuduğunuzu, anladığınızı ve kabul
                  ettiğinizi beyan etmektesiniz. Bu koşulları kabul etmiyorsanız,
                  lütfen web sitemizi kullanmayınız.
                </p>
                <p>
                  Nexus Sigorta, bu kullanım koşullarını herhangi bir zamanda,
                  önceden bildirimde bulunmaksızın değiştirme hakkını saklı
                  tutar. Değişiklikler web sitesinde yayınlandığı anda yürürlüğe
                  girer.
                </p>
              </section>

              <section>
                <h2>2. Hizmet Tanımı</h2>
                <p>
                  Nexus Sigorta, sigorta aracılık hizmetleri sunan bir firmadır.
                  Web sitemiz aracılığıyla:
                </p>
                <ul>
                  <li>Sigorta ürünleri hakkında bilgi edinebilir,</li>
                  <li>
                    Sigorta teklifi talep edebilir ve iletişim
                    kurabilirsiniz.
                  </li>
                </ul>
                <p>
                  Web sitemizdeki bilgiler genel bilgilendirme amaçlıdır ve
                  kesin teklif niteliği taşımaz. Nihai sigorta teklifleri ve
                  poliçe koşulları, bireysel değerlendirme sonucunda
                  belirlenecektir.
                </p>
              </section>

              <section>
                <h2>3. Fikri Mülkiyet Hakları</h2>
                <p>
                  Bu web sitesindeki tüm içerikler (metinler, görseller,
                  logolar, tasarımlar, grafikler, yazılım ve diğer materyaller)
                  Nexus Sigorta&apos;nın veya lisans verenlerinin fikri mülkiyet
                  hakları kapsamındadır. Bu içerikler:
                </p>
                <ul>
                  <li>
                    Nexus Sigorta&apos;nın yazılı izni olmaksızın kopyalanamaz,
                    çoğaltılamaz, dağıtılamaz veya yeniden yayınlanamaz.
                  </li>
                  <li>
                    Ticari amaçlarla kullanılamaz veya değiştirilemez.
                  </li>
                  <li>
                    Üçüncü taraflara aktarılamaz veya başka bir web sitesinde
                    kullanılamaz.
                  </li>
                </ul>
              </section>

              <section>
                <h2>4. Kullanıcı Yükümlülükleri</h2>
                <p>Web sitemizi kullanırken:</p>
                <ul>
                  <li>
                    Doğru, güncel ve eksiksiz bilgi sağlamayı kabul edersiniz.
                  </li>
                  <li>
                    Web sitesini yalnızca yasal amaçlarla kullanmayı taahhüt
                    edersiniz.
                  </li>
                  <li>
                    Web sitesinin güvenliğini tehlikeye atacak herhangi bir
                    eylemde bulunmamayı kabul edersiniz.
                  </li>
                  <li>
                    Web sitesine zararlı yazılım, virüs veya benzeri unsurlar
                    yüklememeyi taahhüt edersiniz.
                  </li>
                  <li>
                    Diğer kullanıcıların haklarına saygı göstermeyi kabul
                    edersiniz.
                  </li>
                </ul>
              </section>

              <section>
                <h2>5. Sorumluluk Sınırlandırması</h2>
                <p>
                  Web sitemizde yer alan bilgiler, sigorta ürünleri ve
                  hizmetleri hakkında genel bilgilendirme amacıyla
                  sunulmaktadır. Nexus Sigorta:
                </p>
                <ul>
                  <li>
                    Web sitesindeki bilgilerin doğruluğunu, eksiksizliğini veya
                    güncelliğini garanti etmez.
                  </li>
                  <li>
                    Web sitesinin kesintisiz veya hatasız çalışacağını garanti
                    etmez.
                  </li>
                  <li>
                    Web sitesinin kullanımından doğabilecek doğrudan veya dolaylı
                    zararlardan sorumlu değildir.
                  </li>
                  <li>
                    Üçüncü taraf web sitelerine verilen bağlantıların
                    içeriklerinden sorumlu değildir.
                  </li>
                </ul>
              </section>

              <section>
                <h2>6. Gizlilik</h2>
                <p>
                  Kişisel verilerinizin korunması ve işlenmesi hakkında detaylı
                  bilgi için{" "}
                  <Link
                    href="/gizlilik-politikasi"
                    className="text-brand hover:underline font-medium"
                  >
                    Gizlilik Politikamızı
                  </Link>{" "}
                  ve{" "}
                  <Link
                    href="/kvkk"
                    className="text-brand hover:underline font-medium"
                  >
                    KVKK Aydınlatma Metnimizi
                  </Link>{" "}
                  inceleyebilirsiniz.
                </p>
              </section>

              <section>
                <h2>7. Çerezler</h2>
                <p>
                  Web sitemiz çerez teknolojisi kullanmaktadır. Çerezlerin
                  kullanımı hakkında detaylı bilgi için{" "}
                  <Link
                    href="/cerez-politikasi"
                    className="text-brand hover:underline font-medium"
                  >
                    Çerez Politikamızı
                  </Link>{" "}
                  inceleyebilirsiniz.
                </p>
              </section>

              <section>
                <h2>8. Uygulanacak Hukuk ve Yetki</h2>
                <p>
                  Bu Kullanım Koşulları, Türkiye Cumhuriyeti kanunlarına
                  tabidir. Bu koşullardan doğabilecek her türlü uyuşmazlıkta
                  İstanbul Anadolu Mahkemeleri ve İcra Daireleri yetkilidir.
                </p>
              </section>

              <section>
                <h2>9. İletişim</h2>
                <p>
                  Kullanım koşulları hakkında sorularınız için bizimle
                  iletişime geçebilirsiniz:
                </p>
                <div className="mt-4 p-6 rounded-xl bg-surface-warm border border-brand/10">
                  <p className="text-sm text-black/60 mb-1">
                    <strong className="text-black/80">
                      Nexus Sigorta Aracılık Hizmetleri A.Ş.
                    </strong>
                  </p>
                  <p className="text-sm text-black/60 mb-1">
                    Barbaros Mh. Mor Sümbül Sk. No:5/A K:13/379
                    Ataşehir/İstanbul 34758
                  </p>
                  <p className="text-sm text-black/60 mb-1">
                    E-posta:{" "}
                    <a
                      href="mailto:info@nexussigorta.com"
                      className="text-brand hover:underline"
                    >
                      info@nexussigorta.com
                    </a>
                  </p>
                  <p className="text-sm text-black/60">
                    Telefon:{" "}
                    <a
                      href="tel:+905332516773"
                      className="text-brand hover:underline"
                    >
                      +90 533 251 67 73
                    </a>
                  </p>
                </div>
              </section>
            </div>

            {/* Other Legal Pages */}
            <div className="mt-16 pt-8 border-t border-black/[0.06]">
              <h3 className="text-sm font-semibold text-black/40 uppercase tracking-wider mb-4">
                Diğer Yasal Sayfalar
              </h3>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/kvkk"
                  className="text-sm text-black/60 hover:text-brand transition-colors underline underline-offset-4 decoration-black/10 hover:decoration-brand/40"
                >
                  KVKK Aydınlatma Metni
                </Link>
                <Link
                  href="/gizlilik-politikasi"
                  className="text-sm text-black/60 hover:text-brand transition-colors underline underline-offset-4 decoration-black/10 hover:decoration-brand/40"
                >
                  Gizlilik Politikası
                </Link>
                <Link
                  href="/cerez-politikasi"
                  className="text-sm text-black/60 hover:text-brand transition-colors underline underline-offset-4 decoration-black/10 hover:decoration-brand/40"
                >
                  Çerez Politikası
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
