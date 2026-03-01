"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

/* ─── Data ─── */

interface DocItem {
  title: string;
  icon: string;
  bilgiler: string[];
  belgeler: string[];
}

const requiredDocs: DocItem[] = [
  {
    title: "Zorunlu Trafik Sigortası",
    icon: "🚗",
    bilgiler: [
      "Plaka (varsa)",
      "Ruhsat seri no / tescil tarihi",
      "Araç tipi / kullanım şekli (hususi-ticari)",
      "Sigortalı TCKN/VKN, ad-soyad/ünvan",
      "Cep no, e-posta",
    ],
    belgeler: [
      "Ruhsat (foto/PDF)",
      "Tüzel ise: vergi levhası (gerektiğinde)",
    ],
  },
  {
    title: "Kasko",
    icon: "🛡",
    bilgiler: [
      "Plaka, marka-model, model yılı",
      "Kullanım tipi (hususi/ticari), sürücü bilgisi",
      "Hasar geçmişi beyanı (varsa)",
      "Sigortalı TCKN/VKN + iletişim",
    ],
    belgeler: [
      "Ruhsat",
      "Önceki kasko poliçesi / hasarsızlık belgesi (gerektiğinde)",
    ],
  },
  {
    title: "Konut Sigortası",
    icon: "🏠",
    bilgiler: [
      "Risk adresi (tam)",
      "Konut tipi (daire/müstakil), m², bina yaşı",
      "Eşya bedeli / bina bedeli (yaklaşık)",
      "Sigortalı TCKN + iletişim",
    ],
    belgeler: [
      "Adres bilgisi teyidi (tapu/abonelik)",
      "Fotoğraf/video (yüksek bedellerde, opsiyonel)",
    ],
  },
  {
    title: "DASK",
    icon: "🏗",
    bilgiler: [
      "UAVT adres kodu (varsa)",
      "Tapu bilgileri / ada-parsel (alternatif)",
      "Bina yapı tipi, kat sayısı, brüt m²",
      "Sigortalı TCKN + iletişim",
    ],
    belgeler: [
      "Tapu veya adres teyidi (UAVT ile de çözülebilir)",
      "Önceki DASK poliçesi (gerektiğinde)",
    ],
  },
  {
    title: "Tamamlayıcı Sağlık (TSS)",
    icon: "🏥",
    bilgiler: [
      "Sigortalı TCKN, ad-soyad, doğum tarihi",
      "Cep no, e-posta",
      "İl/ilçe (network için)",
      "SGK durumu (ürün kuralına göre)",
    ],
    belgeler: [
      "TCKN bilgisi (genelde yeterli)",
      "Aile bireyleri için kimlik bilgileri (gerektiğinde)",
      "Mevcut poliçe/yenileme bilgisi (gerektiğinde)",
    ],
  },
  {
    title: "Özel Sağlık (ÖSS)",
    icon: "💊",
    bilgiler: [
      "TCKN, doğum tarihi, iletişim",
      "Plan/limit tercihleri",
      "Sağlık beyan süreci yönlendirmesi",
    ],
    belgeler: [
      "Sağlık beyan formu / ek tetkikler (şirket kuralına göre)",
    ],
  },
  {
    title: "Seyahat Sağlık",
    icon: "✈",
    bilgiler: [
      "TCKN / pasaport bilgisi (ülkeye göre)",
      "Seyahat tarihleri (gidiş-dönüş)",
      "Ülke / Schengen durumu",
      "İletişim",
    ],
    belgeler: [
      "Pasaport görseli (bazı düzenlerde)",
      "Vize randevusu/başvuru evrakı (müşteri talebine göre)",
    ],
  },
  {
    title: "Ferdi Kaza",
    icon: "🛡",
    bilgiler: [
      "TCKN, doğum tarihi",
      "Meslek (risk değerlendirmesi için kritik)",
      "Teminat/limit tercihi",
      "İletişim",
    ],
    belgeler: [
      "Kimlik bilgileri (genelde yeterli)",
    ],
  },
];

interface FaqItem {
  q: string;
  a: string;
}

const pttFaq: FaqItem[] = [
  {
    q: "Poliçem sisteme yüklenmedi, ne yapmalıyım?",
    a: "Bu durum genellikle isim, soyisim, doğum tarihi veya T.C. Kimlik bilgilerinde uyuşmazlık olduğunda yaşanmaktadır. Poliçenizin oluşturulabilmesi için 444 1 888 numaradan PTT AVM müşteri hizmetleriyle iletişime geçerek bilgilerinizin güncellenmesi gerekmektedir. Bilgileriniz güncellendikten sonra Siparişlerim > Faturalarım bölümünden poliçenizi görüntüleyebilirsiniz.",
  },
  {
    q: "Ürünüm arızalandı, ne yapmalıyım?",
    a: "Üretici garanti süresi devam ediyorsa, arıza işlemleri için satın aldığınız mağaza veya yetkili servis ile iletişime geçmeniz gerekmektedir. Üretici garanti süresi sona ermişse, uzatılmış garanti poliçenizde yer alan teminat kapsamındaki arıza durumları için 0850 252 52 62 numaralı GIG Sigorta çağrı merkezi ile iletişime geçebilirsiniz. Hasar kaydı oluşturulmadan önce, cihazın herhangi bir servise teslim edilmemesi önemlidir.",
  },
  {
    q: "Poliçemi mail olarak alabilir miyim?",
    a: "Mail adresinizi bize iletmeniz halinde poliçenizi mail yoluyla tarafınıza gönderebiliriz. Ayrıca poliçenize dilediğiniz zaman PTT AVM > Siparişlerim > Faturalarım bölümünden de ulaşabilirsiniz.",
  },
  {
    q: "Ürünü başka siteden alsam sigortam devam eder mi?",
    a: "Uzatılmış garanti sigortası, sigortanın satın alındığı ürün ve cihaza özel olarak düzenlenmektedir. Bu nedenle ürünün farklı bir site veya satıcıdan yeniden satın alınması durumunda mevcut sigorta geçerliliğini korumaz. Sigortanın geçerli olabilmesi için, sigortanın ilgili ürünle birlikte satın alınmış olması gerekmektedir.",
  },
  {
    q: "Poliçemi nasıl görüntüleyebilirim?",
    a: "Poliçenizi PTT AVM > Siparişlerim > Faturalarım bölümünden görüntüleyebilirsiniz. Eğer poliçeniz Faturalarım kısmına henüz yüklenmediyse, bu durum genellikle kişisel bilgilerinizde uyuşmazlık olduğunda yaşanmaktadır. Bu durumda PTT AVM müşteri hizmetleri ile iletişime geçerek bilgilerinizin güncellenmesini rica ederiz.",
  },
  {
    q: "Siparişim teslim edildi görünüyor ama bana ulaşan bir şey yok?",
    a: "Poliçeniz fiziki olarak iletilmemekte olup, dijital olarak paylaşılmaktadır. Poliçenizi PTT AVM > Siparişlerim > Faturalarım bölümünden görüntüleyebilirsiniz. Eğer poliçeniz Faturalarım kısmında yer almıyorsa, PTT AVM müşteri hizmetleri ile iletişime geçerek bilgilerinizin güncellenmesini rica ederiz.",
  },
  {
    q: "Poliçemi iptal etmek istiyorum, ne yapmalıyım?",
    a: "Poliçe iptal işlemleri tarafımızca gerçekleştirilememektedir. İptal talebiniz için 444 1 888 numaralı PTT AVM müşteri hizmetleri ile iletişime geçmenizi rica ederiz.",
  },
  {
    q: "Sigorta yaptırdım ama size nasıl ulaşabilirim?",
    a: "Bize dilediğiniz zaman PTT AVM platformu üzerinden yazarak ya da Nexus Sigorta iletişim hattı olan 0533 251 67 73 numarasından ulaşabilirsiniz.",
  },
];

interface InfoSection {
  title: string;
  items: string[];
}

interface InsuranceGuide {
  title: string;
  subtitle: string;
  description: string;
  sections: InfoSection[];
  notes: string[];
}

const tssGuide: InsuranceGuide = {
  title: "Tamamlayıcı Sağlık Sigortası (TSS)",
  subtitle: "SGK anlaşmalı özel hastanelerde fark ücreti ödemeden sağlık hizmeti",
  description: "Tamamlayıcı Sağlık Sigortası (TSS), SGK kapsamında olan kişilerin, SGK ile anlaşmalı özel hastanelerde aldıkları sağlık hizmetleri için ödemeleri gereken fark ücretlerini karşılayan bir sigorta türüdür. SGK'lı olma zorunluluğu vardır.",
  sections: [
    {
      title: "Yatarak Tedavi Kapsamı",
      items: [
        "Ameliyatlar ve hastane yatışları",
        "Oda ve refakatçi giderleri",
        "Yoğun bakım",
        "Kemoterapi, radyoterapi ve diyaliz",
        "Genellikle %100 ve limitsiz karşılanır",
      ],
    },
    {
      title: "Ayakta Tedavi Kapsamı",
      items: [
        "Doktor muayeneleri",
        "Laboratuvar tetkikleri",
        "MR, röntgen, tomografi",
        "Fizik tedavi",
        "Yıllık belirli vaka sayısı veya limit ile sınırlıdır",
      ],
    },
    {
      title: "Ek Hizmetler",
      items: [
        "Check-up",
        "Ambulans hizmetleri",
        "Diş bakım paketleri",
        "Diyetisyen ve psikolojik danışmanlık",
        "Doğum teminatı (ek prim ile, bekleme süresi uygulanır)",
      ],
    },
  ],
  notes: [
    "SGK hak sahipliği aktif olmalıdır",
    "Poliçe başlangıcından önce var olan hastalıklar kapsam dışıdır",
    "SGK'nın karşılamadığı işlemler bu sigortada da yer almaz",
    "Yurtdışı tedaviler (KKTC dahil) kapsam dışıdır",
    "3-4 yıl kesintisiz yenilemede Ömür Boyu Yenileme Garantisi kazanılabilir",
  ],
};

const ossGuide: InsuranceGuide = {
  title: "Özel Sağlık Sigortası (ÖSS)",
  subtitle: "SGK şartı olmaksızın, geniş hastane ağında kapsamlı sağlık güvencesi",
  description: "Özel Sağlık Sigortası (ÖSS), sigortalıların SGK şartı olmaksızın, sigorta şirketinin anlaşmalı olduğu özel sağlık kuruluşlarında sağlık hizmetlerinden yararlanmasını sağlar. TSS'ye kıyasla daha geniş kapsam ve daha yüksek limitler sunar.",
  sections: [
    {
      title: "Yatarak Tedavi Kapsamı",
      items: [
        "Ameliyatlar ve hastane yatışları",
        "Oda ve refakatçi giderleri, yoğun bakım",
        "Kemoterapi, radyoterapi ve diyaliz",
        "Çoğu poliçede yüksek limitli veya limitsiz",
      ],
    },
    {
      title: "Ayakta Tedavi Kapsamı",
      items: [
        "Doktor muayeneleri",
        "Laboratuvar tetkikleri, MR, tomografi, röntgen",
        "Fizik tedavi",
        "Yıllık belirli limit veya adet ile sınırlıdır",
      ],
    },
    {
      title: "Ek Teminat ve Hizmetler",
      items: [
        "Check-up ve ambulans hizmetleri",
        "Diş tedavileri, göz",
        "Psikolojik danışmanlık, diyetisyen",
        "Doğum teminatı (ek prim, bekleme süresi uygulanır)",
      ],
    },
  ],
  notes: [
    "SGK zorunluluğu yoktur",
    "Poliçe öncesi var olan hastalıklar kapsam dışıdır",
    "Estetik amaçlı işlemler kapsam dışıdır",
    "Bekleme süresi dolmadan gerçekleşen bazı giderler kapsam dışıdır",
    "3-4 yıl kesintisiz yenilemede Ömür Boyu Yenileme Garantisi kazanılabilir",
  ],
};

const kaskoGuide: InsuranceGuide = {
  title: "Kasko Sigortası",
  subtitle: "Aracınızı her türlü maddi zarara karşı güvence altına alın",
  description: "Kasko sigortası; aracınızın çarpma, çarpışma, yanma, çalınma gibi durumlarda uğrayacağı maddi zararları güvence altına alır. İhtiyari mali mesuliyet, ferdi kaza, ikame araç gibi ek teminatlarla kapsamı genişletilebilir.",
  sections: [
    {
      title: "Ana Teminatlar",
      items: [
        "Çarpma ve çarpışma",
        "Yanma",
        "Çalınma / çalınmaya teşebbüs",
        "Üçüncü kişilerin kötü niyetli hareketleri",
        "Doğal afetler (sel, dolu, fırtına vb.)",
      ],
    },
    {
      title: "Ek Teminatlar",
      items: [
        "İhtiyari Mali Mesuliyet (IMM)",
        "Ferdi Kaza Teminatı",
        "Hukuksal Koruma",
        "Kişisel Eşya Teminatı",
        "İkame araç hizmeti",
      ],
    },
    {
      title: "Asistans Hizmetleri",
      items: [
        "Yol yardım / çekici hizmeti",
        "Mini onarım hizmeti",
        "Cam hasarı onarım / değişim",
      ],
    },
  ],
  notes: [
    "Poliçe kapsamı seçilen teminatlara göre değişir",
    "Muafiyet uygulanabilir",
    "Hasarsızlık indirimi duruma göre etkilenebilir",
    "Anlaşmalı / anlaşmasız servis farkları olabilir",
  ],
};

/* ─── Accordion Component ─── */
function Accordion({ items, type }: { items: FaqItem[]; type?: "faq" }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <motion.div
            key={i}
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={i * 0.05}
          >
            <div className={`rounded-2xl border transition-all duration-300 ${
              isOpen
                ? "bg-white border-brand/20 shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
                : "bg-white border-black/[0.08] hover:border-brand/15 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
            }`}>
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left"
              >
                <span className="flex items-center gap-3 min-w-0">
                  {type === "faq" && (
                    <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-brand/10 flex items-center justify-center text-brand text-sm font-bold">
                      ?
                    </span>
                  )}
                  <span className={`font-semibold text-sm sm:text-base ${isOpen ? "text-brand" : "text-black/80"} transition-colors`}>
                    {item.q}
                  </span>
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="flex-shrink-0 w-8 h-8 rounded-full bg-black/[0.04] flex items-center justify-center"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-black/40">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </motion.span>
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                      <div className="pt-2 border-t border-black/[0.06]">
                        <p className="text-sm sm:text-base text-black/60 leading-relaxed mt-4">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ─── Doc Card Component ─── */
function DocCard({ doc, index }: { doc: DocItem; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={index * 0.06}
    >
      <div className={`rounded-2xl border transition-all duration-300 ${
        open
          ? "bg-white border-brand/20 shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
          : "bg-white border-black/[0.08] hover:border-brand/15 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
      }`}>
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left"
        >
          <span className="flex items-center gap-3.5">
            <span className="flex-shrink-0 w-11 h-11 rounded-xl bg-brand/10 border border-brand/15 flex items-center justify-center text-xl">
              {doc.icon}
            </span>
            <span className={`font-semibold text-sm sm:text-base ${open ? "text-brand" : "text-black/80"} transition-colors`}>
              {doc.title}
            </span>
          </span>
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="flex-shrink-0 w-8 h-8 rounded-full bg-black/[0.04] flex items-center justify-center"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-black/40">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </motion.span>
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="overflow-hidden"
            >
              <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                <div className="pt-2 border-t border-black/[0.06]">
                  <div className="grid sm:grid-cols-2 gap-5 mt-4">
                    <div>
                      <h4 className="flex items-center gap-2 text-sm font-semibold text-black/70 mb-3">
                        <span className="w-5 h-5 rounded bg-blue-500/10 flex items-center justify-center">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>
                        </span>
                        Gerekli Bilgiler
                      </h4>
                      <ul className="space-y-2">
                        {doc.bilgiler.map((b, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-black/60">
                            <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-brand/50 mt-1.5" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="flex items-center gap-2 text-sm font-semibold text-black/70 mb-3">
                        <span className="w-5 h-5 rounded bg-emerald-500/10 flex items-center justify-center">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>
                        </span>
                        İstenen Belgeler
                      </h4>
                      <ul className="space-y-2">
                        {doc.belgeler.map((b, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-black/60">
                            <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-500/50 mt-1.5" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ─── Insurance Guide Card ─── */
function GuideCard({ guide, index }: { guide: InsuranceGuide; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={index * 0.1}
    >
      <div className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
        open
          ? "bg-white border-brand/20 shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
          : "bg-white border-black/[0.08] hover:border-brand/15 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
      }`}>
        {/* Header — always visible */}
        <button
          onClick={() => setOpen(!open)}
          className="w-full text-left p-6 sm:p-8"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-[family-name:var(--font-syne)] text-xl sm:text-2xl font-bold text-black mb-2">
                {guide.title}
              </h3>
              <p className="text-sm text-brand font-medium mb-3">{guide.subtitle}</p>
              <p className="text-sm text-black/55 leading-relaxed max-w-2xl">{guide.description}</p>
            </div>
            <motion.span
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="flex-shrink-0 w-10 h-10 rounded-full bg-brand/10 border border-brand/15 flex items-center justify-center mt-1"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-brand">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </motion.span>
          </div>
        </button>

        {/* Expandable content */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="overflow-hidden"
            >
              <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                <div className="border-t border-black/[0.06] pt-6">
                  {/* Sections */}
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
                    {guide.sections.map((section, si) => (
                      <div key={si} className="rounded-xl bg-surface-2 p-5 border border-black/[0.04]">
                        <h4 className="font-semibold text-black/75 text-sm mb-3 flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-brand/10 flex items-center justify-center">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#D4A012" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                          </span>
                          {section.title}
                        </h4>
                        <ul className="space-y-2">
                          {section.items.map((item, ii) => (
                            <li key={ii} className="flex items-start gap-2 text-sm text-black/60">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4A012" strokeWidth="2" className="flex-shrink-0 mt-0.5"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {/* Notes */}
                  <div className="rounded-xl bg-brand/[0.04] border border-brand/10 p-5">
                    <h4 className="font-semibold text-black/75 text-sm mb-3 flex items-center gap-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4A012" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                      Dikkat Edilmesi Gerekenler
                    </h4>
                    <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                      {guide.notes.map((note, ni) => (
                        <li key={ni} className="flex items-start gap-2 text-sm text-black/60">
                          <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-brand/60 mt-1.5" />
                          {note}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ─── Tab Navigation ─── */
const tabs = [
  { id: "evraklar", label: "Gerekli Evraklar", icon: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" },
  { id: "pttavm", label: "PTT AVM SSS", icon: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01" },
  { id: "saglik", label: "Sağlık Rehberi", icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" },
  { id: "kasko", label: "Kasko Rehberi", icon: "M9 17a2 2 0 11-4 0 2 2 0 014 0zm10 0a2 2 0 11-4 0 2 2 0 014 0z" },
];

/* ─── Page ─── */
export default function CozumMerkeziPage() {
  const [activeTab, setActiveTab] = useState("evraklar");

  return (
    <main>
      {/* Hero */}
      <section className="relative pt-20 pb-16 overflow-hidden bg-surface-warm">
        <div className="absolute inset-0 hero-grid-pattern opacity-50 pointer-events-none" />
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-brand/[0.04] blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-6 lg:px-8 max-w-7xl relative z-10">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.3}>
            <span className="section-label mb-6 block">Destek & Bilgi</span>
          </motion.div>
          <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={0.5}
            className="font-[family-name:var(--font-syne)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-black font-bold leading-[1.08] mb-6">
            Çözüm{" "}
            <em className="gradient-text not-italic">Merkezi</em>
          </motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.7}
            className="text-lg text-black/60 max-w-2xl leading-relaxed">
            Sigorta ürünleri için gerekli belgeler, PTT AVM sık sorulan sorular ve detaylı sigorta rehberlerine tek bir yerden ulaşın.
          </motion.p>
        </div>
      </section>

      <div className="section-divider" />

      {/* Tab Navigation + Content */}
      <section className="py-16 sm:py-24 lg:py-32 bg-surface-2 relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />
        <div className="container mx-auto px-6 lg:px-8 max-w-5xl relative z-10">

          {/* Tab Buttons */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.2}
            className="flex flex-wrap gap-2 mb-12 sm:mb-16">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full text-sm font-medium transition-all duration-300 border ${
                  activeTab === tab.id
                    ? "bg-brand text-white border-brand shadow-[0_2px_12px_rgba(212,160,18,0.3)]"
                    : "bg-white text-black/50 border-black/[0.08] hover:border-brand/30 hover:text-brand hover:bg-brand/5"
                }`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={tab.icon} />
                </svg>
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.label.split(" ")[0]}</span>
              </button>
            ))}
          </motion.div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === "evraklar" && (
              <motion.div
                key="evraklar"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <div className="mb-8">
                  <h2 className="font-[family-name:var(--font-syne)] text-2xl sm:text-3xl text-black font-bold mb-3">
                    Ürünler İçin Gerekli Bilgiler & Evraklar
                  </h2>
                  <p className="text-black/55 text-sm sm:text-base max-w-xl">
                    Sigorta poliçenizin hızlıca oluşturulabilmesi için ürün bazında gerekli bilgi ve belgeleri aşağıda bulabilirsiniz.
                  </p>
                </div>
                <div className="space-y-3">
                  {requiredDocs.map((doc, i) => (
                    <DocCard key={doc.title} doc={doc} index={i} />
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "pttavm" && (
              <motion.div
                key="pttavm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-3">
                    <h2 className="font-[family-name:var(--font-syne)] text-2xl sm:text-3xl text-black font-bold">
                      PTT AVM Sık Sorulan Sorular
                    </h2>
                  </div>
                  <p className="text-black/55 text-sm sm:text-base max-w-xl">
                    PTT AVM üzerinden sigorta satın alan müşterilerimizin en çok sorduğu sorular ve çözümleri.
                  </p>
                </div>

                {/* Info Banner */}
                <div className="rounded-2xl bg-brand/[0.06] border border-brand/15 p-5 sm:p-6 mb-8 flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-brand/15 flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4A012" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-black/75 mb-1">PTT AVM Müşteri Desteği</p>
                    <p className="text-sm text-black/55 leading-relaxed">
                      PTT AVM&apos;den satın aldığınız sigorta ürünleri hakkında destek almak için bize
                      <a href="tel:+905332516773" className="text-brand font-medium"> 0533 251 67 73 </a>
                      numarasından ulaşabilirsiniz. Aşağıda en çok sorulan soruların yanıtlarını bulabilirsiniz.
                    </p>
                  </div>
                </div>

                <Accordion items={pttFaq} type="faq" />
              </motion.div>
            )}

            {activeTab === "saglik" && (
              <motion.div
                key="saglik"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <div className="mb-8">
                  <h2 className="font-[family-name:var(--font-syne)] text-2xl sm:text-3xl text-black font-bold mb-3">
                    Sağlık Sigortaları Rehberi
                  </h2>
                  <p className="text-black/55 text-sm sm:text-base max-w-xl">
                    Tamamlayıcı ve Özel Sağlık Sigortası hakkında bilmeniz gereken her şey.
                  </p>
                </div>

                {/* TSS vs ÖSS Visual Comparison */}
                <motion.div variants={scaleIn} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}>
                  <div className="rounded-3xl bg-white border border-black/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.06)] overflow-hidden mb-10">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-brand/[0.06] via-brand/[0.03] to-emerald-500/[0.06] px-6 sm:px-8 py-6 border-b border-black/[0.06]">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-9 h-9 rounded-xl bg-white shadow-sm flex items-center justify-center">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4A012" strokeWidth="2"><path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/></svg>
                        </div>
                        <h3 className="font-[family-name:var(--font-syne)] text-xl sm:text-2xl font-bold text-black">TSS vs ÖSS Karşılaştırma</h3>
                      </div>
                      <p className="text-sm text-black/50 ml-12">Hangi sağlık sigortası size daha uygun? Detaylı karşılaştırmayı inceleyin.</p>
                    </div>

                    {/* Two Column Headers */}
                    <div className="grid grid-cols-[1fr_1fr] sm:grid-cols-[1.2fr_1fr_1fr]">
                      <div className="hidden sm:block" />
                      <div className="px-4 sm:px-6 py-4 bg-brand/[0.04] border-b border-brand/10 text-center">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand/10 border border-brand/15 text-brand text-xs font-bold uppercase tracking-wider">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                          TSS
                        </span>
                        <p className="text-[10px] text-black/40 mt-1.5 font-medium">Tamamlayıcı Sağlık</p>
                      </div>
                      <div className="px-4 sm:px-6 py-4 bg-emerald-500/[0.04] border-b border-emerald-500/10 text-center">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/15 text-emerald-600 text-xs font-bold uppercase tracking-wider">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                          ÖSS
                        </span>
                        <p className="text-[10px] text-black/40 mt-1.5 font-medium">Özel Sağlık</p>
                      </div>
                    </div>

                    {/* Comparison Rows */}
                    {[
                      {
                        label: "SGK Şartı",
                        icon: "M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v-2",
                        tss: "Zorunlu",
                        tssNote: "SGK aktif olmalıdır",
                        oss: "Yok",
                        ossNote: "SGK bağımsız çalışır",
                        tssBadge: "warning",
                        ossBadge: "success",
                      },
                      {
                        label: "Hastane Ağı",
                        icon: "M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4z",
                        tss: "SGK Anlaşmalı",
                        tssNote: "Sadece SGK anlaşmalı özel hastaneler",
                        oss: "Tüm Anlaşmalı",
                        ossNote: "SGK anlaşması olmayan özel hastaneler dahil",
                        tssBadge: "neutral",
                        ossBadge: "success",
                      },
                      {
                        label: "Yatarak Tedavi",
                        icon: "M2 4v16h20V4H2zm0 8h20",
                        tss: "%100 Limitsiz",
                        tssNote: "Ameliyat, yoğun bakım, kemoterapi",
                        oss: "%100 Limitsiz",
                        ossNote: "Ameliyat, yoğun bakım, kemoterapi",
                        tssBadge: "success",
                        ossBadge: "success",
                      },
                      {
                        label: "Ayakta Tedavi",
                        icon: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z",
                        tss: "Limitli",
                        tssNote: "Yıllık belirli vaka sayısı ile sınırlı",
                        oss: "Limitli",
                        ossNote: "Daha yüksek limitler, geniş kapsam",
                        tssBadge: "neutral",
                        ossBadge: "neutral",
                      },
                      {
                        label: "Doğum Teminatı",
                        icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
                        tss: "Ek Prim ile",
                        tssNote: "Bekleme süresi uygulanır (6-12 ay)",
                        oss: "Ek Prim ile",
                        ossNote: "Bekleme süresi uygulanır, daha geniş kapsam",
                        tssBadge: "neutral",
                        ossBadge: "neutral",
                      },
                      {
                        label: "Prim Tutarı",
                        icon: "M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6",
                        tss: "Ekonomik",
                        tssNote: "Aylık 300-800 TL arası",
                        oss: "Yüksek",
                        ossNote: "Aylık 1.000-5.000+ TL arası",
                        tssBadge: "success",
                        ossBadge: "warning",
                      },
                      {
                        label: "Teminat Kapsamı",
                        icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
                        tss: "Standart",
                        tssNote: "SGK sistemine dayalı, fark ücretlerini karşılar",
                        oss: "Geniş",
                        ossNote: "Bağımsız kapsam, daha yüksek limitler",
                        tssBadge: "neutral",
                        ossBadge: "success",
                      },
                      {
                        label: "Ömür Boyu Garanti",
                        icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
                        tss: "3-4 Yıl Sonra",
                        tssNote: "Kesintisiz yenilemede kazanılır",
                        oss: "3-4 Yıl Sonra",
                        ossNote: "Kesintisiz yenilemede kazanılır",
                        tssBadge: "success",
                        ossBadge: "success",
                      },
                      {
                        label: "Yurtdışı Tedavi",
                        icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064",
                        tss: "Kapsam Dışı",
                        tssNote: "KKTC dahil yurtdışı tedaviler kapsamaz",
                        oss: "Poliçeye Göre",
                        ossNote: "Bazı poliçelerde yurtdışı teminatı bulunabilir",
                        tssBadge: "danger",
                        ossBadge: "neutral",
                      },
                    ].map((row, ri) => {
                      const badgeColors = {
                        success: "bg-emerald-500/10 text-emerald-600",
                        warning: "bg-amber-500/10 text-amber-600",
                        danger: "bg-red-500/10 text-red-500",
                        neutral: "bg-black/[0.04] text-black/50",
                      };
                      return (
                        <div key={ri} className={`grid grid-cols-1 sm:grid-cols-[1.2fr_1fr_1fr] ${ri % 2 === 0 ? "bg-white" : "bg-surface-2/50"} border-b border-black/[0.04] last:border-0`}>
                          {/* Label — mobile: full width top row */}
                          <div className="flex items-center gap-3 px-6 py-3 sm:py-4 border-b sm:border-b-0 sm:border-r border-black/[0.04]">
                            <div className="w-8 h-8 rounded-lg bg-brand/[0.06] flex items-center justify-center flex-shrink-0">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4A012" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d={row.icon} />
                              </svg>
                            </div>
                            <span className="font-semibold text-sm text-black/75">{row.label}</span>
                          </div>
                          {/* TSS */}
                          <div className="px-4 sm:px-6 py-3 sm:py-4 border-r border-black/[0.04]">
                            <span className={`inline-block px-2.5 py-0.5 rounded-md text-xs font-bold mb-1.5 ${badgeColors[row.tssBadge as keyof typeof badgeColors]}`}>
                              {row.tss}
                            </span>
                            <p className="text-xs text-black/45 leading-relaxed">{row.tssNote}</p>
                          </div>
                          {/* ÖSS */}
                          <div className="px-4 sm:px-6 py-3 sm:py-4">
                            <span className={`inline-block px-2.5 py-0.5 rounded-md text-xs font-bold mb-1.5 ${badgeColors[row.ossBadge as keyof typeof badgeColors]}`}>
                              {row.oss}
                            </span>
                            <p className="text-xs text-black/45 leading-relaxed">{row.ossNote}</p>
                          </div>
                        </div>
                      );
                    })}

                    {/* Bottom CTA */}
                    <div className="px-6 sm:px-8 py-5 bg-gradient-to-r from-brand/[0.04] to-emerald-500/[0.04] border-t border-black/[0.06]">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <p className="text-sm text-black/55">
                          Hangisi size uygun? <span className="font-medium text-black/70">Uzman danışmanlarımız yardımcı olsun.</span>
                        </p>
                        <a href="tel:+905332516773" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand text-white text-sm font-semibold shadow-[0_2px_10px_rgba(212,160,18,0.25)] hover:bg-brand-light transition-all">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                          Hemen Arayın
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Kime Uygun Kartlar */}
                <div className="grid sm:grid-cols-2 gap-5 mb-10">
                  <motion.div variants={scaleIn} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.1}>
                    <div className="rounded-2xl bg-white border border-brand/15 shadow-[0_2px_12px_rgba(212,160,18,0.06)] p-6 h-full">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-brand/10 border border-brand/15 flex items-center justify-center">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4A012" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                        </div>
                        <div>
                          <h4 className="font-[family-name:var(--font-syne)] text-base font-bold text-black">TSS Kime Uygun?</h4>
                          <p className="text-xs text-brand font-medium">Tamamlayıcı Sağlık Sigortası</p>
                        </div>
                      </div>
                      <ul className="space-y-2.5">
                        {[
                          "SGK'lı çalışanlar ve emekliler",
                          "Bütçe dostu sağlık güvencesi arayanlar",
                          "SGK anlaşmalı özel hastaneleri tercih edenler",
                          "Temel sağlık teminatı yeterli olanlar",
                          "Ailesiyle birlikte ekonomik poliçe isteyenler",
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-sm text-black/60">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4A012" strokeWidth="2" className="flex-shrink-0 mt-0.5"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>

                  <motion.div variants={scaleIn} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.2}>
                    <div className="rounded-2xl bg-white border border-emerald-500/15 shadow-[0_2px_12px_rgba(16,185,129,0.06)] p-6 h-full">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/15 flex items-center justify-center">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                        </div>
                        <div>
                          <h4 className="font-[family-name:var(--font-syne)] text-base font-bold text-black">ÖSS Kime Uygun?</h4>
                          <p className="text-xs text-emerald-600 font-medium">Özel Sağlık Sigortası</p>
                        </div>
                      </div>
                      <ul className="space-y-2.5">
                        {[
                          "SGK'sı olmayan veya SGK'ya bağımlı olmak istemeyen kişiler",
                          "Daha geniş hastane ağı ve yüksek limit isteyenler",
                          "Premium sağlık hizmeti arayanlar",
                          "Kapsamlı ayakta tedavi teminatı isteyenler",
                          "Yurtdışı tedavi seçeneği arayanlar",
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-sm text-black/60">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" className="flex-shrink-0 mt-0.5"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </div>

                {/* Detailed Guide Cards */}
                <div className="space-y-5">
                  <GuideCard guide={tssGuide} index={0} />
                  <GuideCard guide={ossGuide} index={1} />
                </div>
              </motion.div>
            )}

            {activeTab === "kasko" && (
              <motion.div
                key="kasko"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <div className="mb-8">
                  <h2 className="font-[family-name:var(--font-syne)] text-2xl sm:text-3xl text-black font-bold mb-3">
                    Kasko & Trafik Sigortası Rehberi
                  </h2>
                  <p className="text-black/55 text-sm sm:text-base max-w-xl">
                    Kasko sigortası kapsamı, teminatlar ve hasar süreçleri hakkında detaylı bilgi.
                  </p>
                </div>

                <div className="space-y-5">
                  <GuideCard guide={kaskoGuide} index={0} />
                </div>

                {/* Hasar Anında Ne Yapmalısınız */}
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={0.2}
                  className="mt-8 rounded-2xl bg-white border border-black/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.04)] p-6 sm:p-8"
                >
                  <h3 className="font-[family-name:var(--font-syne)] text-xl font-bold text-black mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    </span>
                    Hasar Anında Ne Yapmalısınız?
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { step: "01", title: "Güvenliğinizi Sağlayın", desc: "Kaza sonrası önce kendinizin ve yolcuların güvenliğini kontrol edin." },
                      { step: "02", title: "Hasar İhbar Edin", desc: "Sigorta şirketinin hasar ihbar hattını veya bizi arayarak bildirin." },
                      { step: "03", title: "Belgeleri Hazırlayın", desc: "Kaza tutanağı, fotoğraflar ve gerekli belgeleri toplayın." },
                      { step: "04", title: "Servise Teslim Edin", desc: "Aracınızı anlaşmalı servise teslim edin, süreci takip edelim." },
                    ].map((item) => (
                      <div key={item.step} className="flex gap-4 p-4 rounded-xl bg-surface-2 border border-black/[0.04]">
                        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-brand/10 border border-brand/15 flex items-center justify-center">
                          <span className="font-[family-name:var(--font-syne)] text-sm font-bold text-brand">{item.step}</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-black/75 text-sm mb-1">{item.title}</h4>
                          <p className="text-xs text-black/55 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <div className="section-divider" />

      {/* CTA */}
      <section className="relative py-20 sm:py-32 overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-br from-brand/[0.04] via-brand/[0.08] to-brand/[0.04]" />
        <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full bg-brand/10 blur-[150px] pointer-events-none" />

        <div className="container mx-auto px-6 lg:px-8 max-w-7xl relative z-10 text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}>
            <h2 className="font-[family-name:var(--font-syne)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-black font-bold mb-6">
              Başka sorunuz mu <span className="gradient-text">var?</span>
            </h2>
            <p className="text-black/60 text-lg max-w-md mx-auto mb-10 leading-relaxed">
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
