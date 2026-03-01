import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Çerez Politikası | Nexus Sigorta",
  description:
    "Nexus Sigorta çerez politikası. Web sitemizde kullanılan çerezler hakkında bilgi.",
};

export default function CerezPolitikasiPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative pt-20 pb-16 overflow-hidden bg-surface-warm">
        <div className="absolute inset-0 hero-grid-pattern opacity-50 pointer-events-none" />
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-brand/[0.04] blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-6 lg:px-8 max-w-7xl relative z-10">
          <span className="section-label mb-6 block">Yasal</span>
          <h1 className="font-[family-name:var(--font-syne)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-black font-bold leading-[1.02] mb-6">
            Çerez <em className="gradient-text not-italic">Politikası</em>
          </h1>
          <p className="text-lg text-black/60 max-w-xl leading-relaxed">
            Web sitemizde kullanılan çerezler ve tercihlerin yönetimi hakkında
            bilgi.
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
                Nexus Sigorta Aracılık Hizmetleri A.Ş. (&quot;Nexus Sigorta&quot;)
                olarak, web sitemizde (nexussigorta.com.tr) çerez ve benzeri
                teknolojiler kullanmaktayız. Bu politika, hangi çerezlerin
                kullanıldığını, neden kullanıldığını ve çerez tercihlerinizi
                nasıl yönetebileceğinizi açıklamaktadır.
              </p>
            </div>

            <div className="space-y-8">
              <section>
                <h2>1. Çerez Nedir?</h2>
                <p>
                  Çerezler, web sitelerini ziyaret ettiğinizde tarayıcınız
                  aracılığıyla cihazınıza (bilgisayar, tablet veya akıllı
                  telefon) yerleştirilen küçük metin dosyalarıdır. Çerezler,
                  web sitesinin düzgün çalışması, güvenliğin sağlanması,
                  kullanıcı deneyiminin iyileştirilmesi ve ziyaretçi
                  istatistiklerinin analiz edilmesi gibi amaçlarla
                  kullanılmaktadır.
                </p>
              </section>

              <section>
                <h2>2. Kullanılan Çerez Türleri</h2>

                <h3>2.1. Zorunlu Çerezler</h3>
                <p>
                  Web sitesinin temel işlevlerinin çalışması için gerekli olan
                  çerezlerdir. Bu çerezler olmadan web sitesinin bazı bölümleri
                  düzgün çalışmayabilir. Bu çerezler devre dışı bırakılamaz.
                </p>
                <div className="overflow-x-auto mt-4">
                  <table>
                    <thead>
                      <tr>
                        <th>Çerez Adı</th>
                        <th>Amacı</th>
                        <th>Süre</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>session_id</td>
                        <td>Oturum yönetimi</td>
                        <td>Oturum</td>
                      </tr>
                      <tr>
                        <td>csrf_token</td>
                        <td>Güvenlik doğrulaması</td>
                        <td>Oturum</td>
                      </tr>
                      <tr>
                        <td>cookie_consent</td>
                        <td>Çerez tercihi kaydı</td>
                        <td>1 yıl</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h3>2.2. Performans ve Analiz Çerezleri</h3>
                <p>
                  Web sitesinin nasıl kullanıldığını anlamamıza yardımcı olan
                  çerezlerdir. Ziyaretçi sayısı, sayfa görüntülenmeleri ve
                  trafik kaynakları gibi bilgileri anonim olarak toplarlar.
                </p>
                <div className="overflow-x-auto mt-4">
                  <table>
                    <thead>
                      <tr>
                        <th>Çerez Adı</th>
                        <th>Amacı</th>
                        <th>Süre</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>_ga</td>
                        <td>Google Analytics - Ziyaretçi tanıma</td>
                        <td>2 yıl</td>
                      </tr>
                      <tr>
                        <td>_ga_*</td>
                        <td>Google Analytics - Oturum durumu</td>
                        <td>2 yıl</td>
                      </tr>
                      <tr>
                        <td>_gid</td>
                        <td>Google Analytics - Ziyaretçi ayrımı</td>
                        <td>24 saat</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h3>2.3. İşlevsellik Çerezleri</h3>
                <p>
                  Dil tercihi, bölge seçimi gibi tercihlerinizi hatırlayarak
                  size kişiselleştirilmiş bir deneyim sunmamızı sağlayan
                  çerezlerdir.
                </p>

                <h3>2.4. Pazarlama Çerezleri</h3>
                <p>
                  Reklam ortaklarımız tarafından ilgi alanlarınıza göre
                  reklamlar gösterilmesi amacıyla kullanılabilir. Bu çerezler,
                  tarama alışkanlıklarınızı izleyerek size daha alakalı
                  içerikler sunmayı amaçlar.
                </p>
              </section>

              <section>
                <h2>3. Çerezlerin Yönetimi</h2>
                <p>
                  Tarayıcı ayarlarınızdan çerezleri kontrol edebilir ve
                  yönetebilirsiniz. Çoğu tarayıcı aşağıdaki seçenekleri sunar:
                </p>
                <ul>
                  <li>Tüm çerezleri kabul etme veya reddetme</li>
                  <li>Çerez yerleştirilmeden önce bildirim alma</li>
                  <li>Belirli çerezleri silme veya engelleme</li>
                </ul>

                <p className="mt-4">
                  Popüler tarayıcılarda çerez ayarlarını yönetmek için:
                </p>
                <ul>
                  <li>
                    <strong>Google Chrome:</strong> Ayarlar &gt; Gizlilik ve
                    güvenlik &gt; Çerezler
                  </li>
                  <li>
                    <strong>Mozilla Firefox:</strong> Ayarlar &gt; Gizlilik ve
                    Güvenlik &gt; Çerezler
                  </li>
                  <li>
                    <strong>Safari:</strong> Tercihler &gt; Gizlilik &gt;
                    Çerezler
                  </li>
                  <li>
                    <strong>Microsoft Edge:</strong> Ayarlar &gt; Çerezler ve
                    site izinleri
                  </li>
                </ul>

                <div className="glass-card rounded-xl p-5 mt-4 border-amber-500/15">
                  <p className="text-sm text-black/70">
                    <strong className="text-amber-600">Not:</strong> Çerezleri
                    devre dışı bırakmak, web sitesinin bazı özelliklerinin düzgün
                    çalışmamasına neden olabilir.
                  </p>
                </div>
              </section>

              <section>
                <h2>4. Üçüncü Taraf Çerezleri</h2>
                <p>
                  Web sitemiz, analiz ve reklam hizmetleri sağlayan üçüncü taraf
                  hizmet sağlayıcılarının çerezlerini kullanabilir. Bu
                  sağlayıcılar kendi gizlilik politikalarına tabidir:
                </p>
                <ul>
                  <li>
                    <strong>Google Analytics:</strong> Web sitesi trafiğinin
                    analizi
                  </li>
                  <li>
                    <strong>Google Ads:</strong> Reklam performansı ölçümü
                  </li>
                  <li>
                    <strong>Facebook Pixel:</strong> Sosyal medya reklam
                    optimizasyonu
                  </li>
                </ul>
              </section>

              <section>
                <h2>5. Hukuki Dayanak</h2>
                <p>
                  Çerez kullanımımız, 6698 Sayılı Kişisel Verilerin Korunması
                  Kanunu (KVKK) ve 5809 Sayılı Elektronik Haberleşme Kanunu
                  kapsamında yürütülmektedir. Zorunlu çerezler dışındaki
                  çerezler için açık rızanız talep edilmektedir.
                </p>
              </section>

              <section>
                <h2>6. Politika Güncellemeleri</h2>
                <p>
                  Bu Çerez Politikası, kullanılan çerezlerdeki değişikliklere
                  veya mevzuat güncellemelerine bağlı olarak zaman zaman
                  güncellenebilir. Güncellenmiş politika web sitemizde
                  yayınlandığı anda yürürlüğe girer.
                </p>
              </section>

              <section>
                <h2>7. İletişim</h2>
                <p>
                  Çerez politikamız hakkında sorularınız için bizimle iletişime
                  geçebilirsiniz:
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
                  href="/kullanim-kosullari"
                  className="text-sm text-black/60 hover:text-brand transition-colors underline underline-offset-4 decoration-black/10 hover:decoration-brand/40"
                >
                  Kullanım Koşulları
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
