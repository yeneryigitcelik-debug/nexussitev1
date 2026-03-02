import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Gizlilik Politikası",
  description:
    "Nexus Sigorta gizlilik politikası. Kişisel verilerinizin nasıl toplandığı, işlendiği ve korunduğu hakkında bilgi.",
  path: "/gizlilik-politikasi",
  noIndex: true,
});

export default function GizlilikPolitikasiPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative pt-20 pb-16 overflow-hidden bg-surface-warm">
        <div className="absolute inset-0 hero-grid-pattern opacity-50 pointer-events-none" />
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-brand/[0.04] blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-6 lg:px-8 max-w-7xl relative z-10">
          <span className="section-label mb-6 block">Yasal</span>
          <h1 className="font-[family-name:var(--font-syne)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-black font-bold leading-[1.02] mb-6">
            Gizlilik <em className="gradient-text not-italic">Politikası</em>
          </h1>
          <p className="text-lg text-black/60 max-w-xl leading-relaxed">
            Kişisel verilerinizin nasıl toplandığı, işlendiği ve korunduğu
            hakkında detaylı bilgi.
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
                olarak, web sitemizi (nexussigorta.com.tr) ziyaret eden
                kullanıcılarımızın gizliliğine büyük önem vermekteyiz. Bu
                Gizlilik Politikası, hangi kişisel verilerin toplandığını, nasıl
                kullanıldığını ve nasıl korunduğunu açıklamaktadır.
              </p>
            </div>

            <div className="space-y-8">
              <section>
                <h2>1. Toplanan Bilgiler</h2>
                <p>Web sitemizi kullanırken aşağıdaki bilgileri toplayabiliriz:</p>
                <h3>1.1. Doğrudan Sağladığınız Bilgiler</h3>
                <ul>
                  <li>Ad, soyad ve iletişim bilgileri (telefon, e-posta)</li>
                  <li>T.C. kimlik numarası</li>
                  <li>Adres bilgileri</li>
                  <li>
                    Sigorta teklifi ve poliçe işlemleri için gerekli bilgiler
                    (araç bilgileri, sağlık bilgileri vb.)
                  </li>
                  <li>İletişim formları aracılığıyla gönderdiğiniz mesajlar</li>
                </ul>

                <h3>1.2. Otomatik Olarak Toplanan Bilgiler</h3>
                <ul>
                  <li>IP adresi ve tarayıcı bilgileri</li>
                  <li>Çerez verileri (detaylar için Çerez Politikamıza bakınız)</li>
                  <li>Ziyaret edilen sayfalar ve tıklama verileri</li>
                  <li>Cihaz bilgileri ve işletim sistemi</li>
                  <li>Ziyaret tarihi ve saati</li>
                </ul>
              </section>

              <section>
                <h2>2. Bilgilerin Kullanım Amaçları</h2>
                <p>Topladığımız kişisel verileri aşağıdaki amaçlarla kullanırız:</p>
                <ul>
                  <li>
                    Sigorta teklifi hazırlama, poliçe düzenleme ve hasar
                    yönetimi hizmetlerinin sunulması
                  </li>
                  <li>
                    Müşteri taleplerine yanıt verilmesi ve iletişim kurulması
                  </li>
                  <li>Yasal yükümlülüklerin yerine getirilmesi</li>
                  <li>
                    Hizmet kalitesinin artırılması ve web sitesi deneyiminin
                    iyileştirilmesi
                  </li>
                  <li>
                    İzniniz dahilinde kampanya ve bilgilendirme iletilerinin
                    gönderilmesi
                  </li>
                  <li>İstatistiksel analiz ve raporlama</li>
                </ul>
              </section>

              <section>
                <h2>3. Bilgilerin Paylaşımı</h2>
                <p>
                  Kişisel verileriniz, aşağıdaki durumlar haricinde üçüncü
                  taraflarla paylaşılmaz:
                </p>
                <ul>
                  <li>
                    Sigorta şirketleri: Poliçe ve teklif işlemleri kapsamında
                    iş birliği yaptığımız sigorta şirketleriyle
                  </li>
                  <li>
                    Yasal zorunluluklar: Mahkeme kararı, resmi kurum talebi veya
                    mevzuat gereği
                  </li>
                  <li>
                    Hizmet sağlayıcılar: Web sitesi hosting, e-posta iletimi
                    gibi teknik hizmet sağlayıcılarıyla (gizlilik sözleşmesi
                    kapsamında)
                  </li>
                  <li>Açık rızanızın bulunması halinde</li>
                </ul>
              </section>

              <section>
                <h2>4. Veri Güvenliği</h2>
                <p>
                  Kişisel verilerinizin güvenliğini sağlamak için aşağıdaki
                  tedbirleri almaktayız:
                </p>
                <ul>
                  <li>SSL/TLS şifreleme ile güvenli veri iletimi</li>
                  <li>Güvenlik duvarı ve saldırı tespit sistemleri</li>
                  <li>Düzenli güvenlik güncellemeleri ve denetimleri</li>
                  <li>Veri erişiminin yetkili personelle sınırlandırılması</li>
                  <li>Fiziksel ve dijital ortamda veri koruma önlemleri</li>
                </ul>
              </section>

              <section>
                <h2>5. Veri Saklama Süresi</h2>
                <p>
                  Kişisel verileriniz, toplanma amacının gerektirdiği süre
                  boyunca ve ilgili mevzuatın öngördüğü zorunlu saklama süreleri
                  kapsamında muhafaza edilmektedir. Saklama süresinin sona
                  ermesinin ardından verileriniz güvenli bir şekilde silinir,
                  yok edilir veya anonim hale getirilir.
                </p>
              </section>

              <section>
                <h2>6. Üçüncü Taraf Bağlantılar</h2>
                <p>
                  Web sitemiz, üçüncü taraf web sitelerine bağlantılar
                  içerebilir. Bu sitelerin gizlilik uygulamalarından sorumlu
                  değiliz. Bu siteleri ziyaret ettiğinizde ilgili sitenin
                  gizlilik politikasını incelemenizi tavsiye ederiz.
                </p>
              </section>

              <section>
                <h2>7. Haklarınız</h2>
                <p>
                  KVKK kapsamında kişisel verilerinize ilişkin haklarınız
                  hakkında detaylı bilgi için{" "}
                  <Link href="/kvkk" className="text-brand hover:underline font-medium">
                    KVKK Aydınlatma Metni
                  </Link>{" "}
                  sayfamızı inceleyebilirsiniz.
                </p>
              </section>

              <section>
                <h2>8. Politika Güncellemeleri</h2>
                <p>
                  Bu Gizlilik Politikası, mevzuat değişiklikleri veya şirket
                  politikalarındaki güncellemeler doğrultusunda zaman zaman
                  değiştirilebilir. Güncellemeler web sitemizde yayınlandığı
                  anda yürürlüğe girer. Önemli değişikliklerde ayrıca
                  bilgilendirme yapılacaktır.
                </p>
              </section>

              <section>
                <h2>9. İletişim</h2>
                <p>
                  Gizlilik politikamız hakkında sorularınız veya talepleriniz
                  için bizimle iletişime geçebilirsiniz:
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
                  href="/kullanim-kosullari"
                  className="text-sm text-black/60 hover:text-brand transition-colors underline underline-offset-4 decoration-black/10 hover:decoration-brand/40"
                >
                  Kullanım Koşulları
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
