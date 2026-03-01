export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  longDescription: string;
  icon: string;
  image: string;
  category: "kurumsal" | "bireysel";
  features: string[];
  coverages: string[];
}

export const services: Service[] = [
  {
    slug: "trafik-sigortasi",
    title: "Trafik Sigortası",
    shortTitle: "Trafik",
    description: "Zorunlu trafik sigortası ile aracınızı ve üçüncü şahısları koruma altına alın.",
    longDescription: "Zorunlu Trafik Sigortası, motorlu araç sahiplerinin üçüncü şahıslara verebilecekleri maddi ve bedeni zararları güvence altına alan yasal bir sigorta türüdür. Nexus Sigorta olarak 36 çözüm ortağımız arasından size en uygun trafik sigortası teklifini sunuyoruz.",
    icon: "car",
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&q=80",
    category: "kurumsal",
    features: ["Uygun Fiyat Garantisi", "Hızlı Poliçe Düzenleme", "7/24 Hasar Desteği", "Online Teklif"],
    coverages: ["Maddi Hasar Teminatı", "Bedeni Hasar Teminatı", "Ölüm Teminatı", "Sağlık Giderleri"]
  },
  {
    slug: "grup-saglik-sigortasi",
    title: "Grup Sağlık Sigortası",
    shortTitle: "Grup Sağlık",
    description: "Çalışanlarınız için kapsamlı sağlık sigortası paketleri sunuyoruz.",
    longDescription: "Grup Sağlık Sigortası, şirketlerin çalışanlarına sunduğu kapsamlı sağlık güvencesidir. Nexus Sigorta olarak, şirketinizin büyüklüğüne ve ihtiyaçlarına uygun özel paketler hazırlıyoruz.",
    icon: "users",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
    category: "kurumsal",
    features: ["Özel Hastane Anlaşmaları", "Geniş Doktor Ağı", "Check-up Hizmeti", "Eczane İndirimleri"],
    coverages: ["Yatarak Tedavi", "Ayakta Tedavi", "Doğum Teminatı", "Diş Tedavisi"]
  },
  {
    slug: "yangin-sigortasi",
    title: "Yangın Sigortası",
    shortTitle: "Yangın",
    description: "İşyerinizi ve varlıklarınızı yangın riskine karşı güvence altına alın.",
    longDescription: "Yangın Sigortası, işyerinizi, evinizi ve değerli varlıklarınızı yangın, yıldırım, infilak gibi risklere karşı koruma altına alan önemli bir sigorta türüdür.",
    icon: "flame",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80",
    category: "kurumsal",
    features: ["Kapsamlı Teminat", "Hızlı Hasar Ödemesi", "Ek Teminat Seçenekleri", "Uygun Primler"],
    coverages: ["Yangın Teminatı", "Yıldırım Teminatı", "İnfilak Teminatı", "Dahili Su Hasarı"]
  },
  {
    slug: "muhendislik-sigortasi",
    title: "Mühendislik Sigortası",
    shortTitle: "Mühendislik",
    description: "İnşaat ve montaj projelerinizi beklenmedik risklere karşı koruyun.",
    longDescription: "Mühendislik Sigortası, inşaat ve montaj projelerinizi tüm risklere karşı güvence altına alır. Proje süresince oluşabilecek her türlü hasar için kapsamlı koruma sağlar.",
    icon: "settings",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
    category: "kurumsal",
    features: ["İnşaat All Risks", "Montaj All Risks", "Makine Kırılması", "Elektronik Cihaz"],
    coverages: ["İnşaat Teminatı", "Montaj Teminatı", "Üçüncü Şahıs Sorumluluk", "Bakım Dönemi"]
  },
  {
    slug: "isyeri-sigortasi",
    title: "İş Yeri Sigortası",
    shortTitle: "İş Yeri",
    description: "İş yerinizi her türlü riske karşı kapsamlı şekilde sigortalayın.",
    longDescription: "İş Yeri Sigortası, işletmenizi yangın, hırsızlık, doğal afet ve diğer risklere karşı kapsamlı şekilde koruma altına alır.",
    icon: "building",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    category: "kurumsal",
    features: ["Tam Kapsamlı Koruma", "Cam Kırılması", "Hırsızlık Teminatı", "İşveren Sorumluluk"],
    coverages: ["Yangın & Doğal Afet", "Hırsızlık", "Cam Kırılması", "Elektronik Cihaz"]
  },
  {
    slug: "enerji-projeleri",
    title: "Enerji Projeleri Sigortası",
    shortTitle: "Enerji",
    description: "Enerji yatırımlarınızı özel poliçelerle güvence altına alın.",
    longDescription: "Enerji Projeleri Sigortası, güneş enerjisi, rüzgar enerjisi ve diğer enerji yatırımlarınızı özel poliçelerle koruma altına alır.",
    icon: "zap",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80",
    category: "kurumsal",
    features: ["GES Sigortası", "RES Sigortası", "İnşaat Dönemi", "İşletme Dönemi"],
    coverages: ["Fiziksel Hasar", "İş Durması", "Makine Kırılması", "Sorumluluk"]
  },
  {
    slug: "kasko",
    title: "Kasko Sigortası",
    shortTitle: "Kasko",
    description: "Aracınızı kaza, hırsızlık ve doğal afetlere karşı tam koruma altına alın.",
    longDescription: "Kasko Sigortası, aracınızı trafik kazaları, hırsızlık, doğal afetler ve diğer risklere karşı kapsamlı şekilde koruma altına alır.",
    icon: "car",
    image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80",
    category: "bireysel",
    features: ["Kapsamlı Teminat", "Anlaşmalı Servisler", "Yol Yardım", "İkame Araç"],
    coverages: ["Kaza Hasarı", "Hırsızlık", "Doğal Afet", "Cam Hasarı"]
  },
  {
    slug: "konut-sigortasi",
    title: "Konut Sigortası",
    shortTitle: "Konut",
    description: "Evinizi ve eşyalarınızı her türlü riske karşı güvence altına alın.",
    longDescription: "Konut Sigortası, evinizi ve içindeki eşyalarınızı yangın, su baskını, hırsızlık gibi risklere karşı kapsamlı koruma sağlar.",
    icon: "home",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
    category: "bireysel",
    features: ["Bina Teminatı", "Eşya Teminatı", "Deprem Teminatı", "Kombi Dahil"],
    coverages: ["Yangın", "Hırsızlık", "Su Baskını", "Cam Kırılması"]
  },
  {
    slug: "saglik-sigortasi",
    title: "Sağlık Sigortası",
    shortTitle: "Sağlık",
    description: "Siz ve aileniz için özel sağlık sigortası paketleri.",
    longDescription: "Bireysel Sağlık Sigortası, siz ve aileniz için kapsamlı sağlık güvencesi sağlar. Özel hastanelerde ücretsiz tedavi imkanı sunar.",
    icon: "heart",
    image: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=800&q=80",
    category: "bireysel",
    features: ["Özel Hastane Ağı", "Acil Sağlık", "Check-up", "Online Doktor"],
    coverages: ["Yatarak Tedavi", "Ayakta Tedavi", "İlaç", "Fizik Tedavi"]
  },
  {
    slug: "hayat-sigortasi",
    title: "Hayat Sigortası",
    shortTitle: "Hayat",
    description: "Sevdiklerinizin geleceğini hayat sigortası ile garanti altına alın.",
    longDescription: "Hayat Sigortası, siz ve sevdiklerinizin geleceğini güvence altına alır. Beklenmedik durumlarda ailenizin finansal güvenliğini sağlar.",
    icon: "shield",
    image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=80",
    category: "bireysel",
    features: ["Birikim İmkanı", "Vefat Teminatı", "Maluliyet", "Kritik Hastalık"],
    coverages: ["Vefat Teminatı", "Maluliyet Teminatı", "Kritik Hastalık", "Birikim"]
  },
  {
    slug: "seyahat-sigortasi",
    title: "Seyahat Sigortası",
    shortTitle: "Seyahat",
    description: "Yurt içi ve yurt dışı seyahatlerinizde güvende olun.",
    longDescription: "Seyahat Sigortası, yurt içi ve yurt dışı seyahatlerinizde sağlık, bagaj kaybı ve diğer risklere karşı güvence altında olmanızı sağlar.",
    icon: "globe",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80",
    category: "bireysel",
    features: ["Dünya Çapında Geçerli", "Sağlık Giderleri", "Bagaj Teminatı", "Uçuş Gecikmesi"],
    coverages: ["Acil Sağlık", "Bagaj Kaybı", "Seyahat İptali", "Hukuki Yardım"]
  },
  {
    slug: "ferdi-kaza-sigortasi",
    title: "Ferdi Kaza Sigortası",
    shortTitle: "Ferdi Kaza",
    description: "Beklenmedik kazalara karşı kendinizi ve ailenizi koruyun.",
    longDescription: "Ferdi Kaza Sigortası, günlük hayatta karşılaşabileceğiniz kazalara karşı sizi ve ailenizi güvence altına alır.",
    icon: "activity",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
    category: "bireysel",
    features: ["7/24 Koruma", "Dünya Genelinde Geçerli", "Uygun Primler", "Hızlı Ödeme"],
    coverages: ["Vefat Teminatı", "Sürekli Sakatlık", "Tedavi Masrafları", "Gündelik Tazminat"]
  },
];

export interface Partner {
  name: string;
  logo: string;
  desc: string;
  work: string;
  tags: string[];
}

export const partners: Partner[] = [
  {
    name: "Allianz",
    logo: "/cozumortaklari/Allianz_SDG-Kurum-Logo21312.png",
    desc: "Yetkili Acente",
    work: "Allianz ile trafik, kasko, konut, işyeri ve sağlık sigortası alanlarında yetkili acentelik hizmeti veriyoruz. Geniş teminat seçenekleri ve hızlı hasar süreçleriyle müşterilerimize güvence sağlıyoruz.",
    tags: ["Trafik", "Kasko", "Sağlık", "Konut"],
  },
  {
    name: "Anadolu Sigorta",
    logo: "/cozumortaklari/Anadolu_Sigorta_logo.svg-1-1024x283.png",
    desc: "Yetkili Acente",
    work: "Türkiye'nin köklü sigorta markası Anadolu Sigorta ile kurumsal ve bireysel tüm branşlarda poliçe düzenliyoruz. Yangın, mühendislik ve sorumluluk sigortalarında güçlü çözümler sunuyoruz.",
    tags: ["Kurumsal", "Yangın", "Mühendislik", "Sorumluluk"],
  },
  {
    name: "Gulf Sigorta",
    logo: "/cozumortaklari/Gulf-Sigorta.png",
    desc: "Yetkili Acente",
    work: "Gulf Sigorta ile özellikle araç sigortaları ve bireysel ürünlerde rekabetçi fiyatlarla poliçe sunuyoruz. Hızlı teklif ve kolay poliçe süreçleriyle müşteri memnuniyetini ön planda tutuyoruz.",
    tags: ["Trafik", "Kasko", "Bireysel"],
  },
  {
    name: "Quick Sigorta",
    logo: "/cozumortaklari/logo_quicksigorta_1x.webp",
    desc: "Yetkili Acente",
    work: "Quick Sigorta ile dijital odaklı, hızlı ve pratik sigorta çözümleri sunuyoruz. Özellikle online poliçe düzenleme ve anlık teklif alma süreçlerinde güçlü bir iş birliği yürütüyoruz.",
    tags: ["Dijital", "Hızlı Poliçe", "Online"],
  },
  {
    name: "Sompo Sigorta",
    logo: "/cozumortaklari/sompo_sigorta_logo_sm-1435e4bc-d (1).png",
    desc: "Yetkili Acente",
    work: "Japon kökenli Sompo Sigorta ile kasko, trafik ve işyeri sigortalarında kapsamlı teminatlar sunuyoruz. Uluslararası standartlarda hizmet kalitesiyle müşterilerimizin yanındayız.",
    tags: ["Kasko", "Trafik", "İşyeri"],
  },
  {
    name: "Türkiye Sigorta",
    logo: "/cozumortaklari/ts-slogansiz-1-e1728740452484.png",
    desc: "Yetkili Acente",
    work: "Türkiye Sigorta ile tüm branşlarda geniş kapsamlı poliçeler düzenliyoruz. Devlet güvencesindeki bu marka ile özellikle DASK, konut ve tarım sigortalarında güçlü çözümler sunuyoruz.",
    tags: ["DASK", "Konut", "Tarım", "Tüm Branşlar"],
  },
  {
    name: "PTT AVM",
    logo: "/cozumortaklari/pttavm-logo.72e4a21.svg",
    desc: "E-Ticaret Ortağı",
    work: "PTT AVM üzerinden satılan elektronik ürünler için uzatılmış garanti ve kazaen zarar sigortaları düzenliyoruz. Müşterilerin ürünlerini satın alma anında kolayca sigortalamalarını sağlıyoruz.",
    tags: ["Uzatılmış Garanti", "Elektronik", "E-Ticaret"],
  },
  {
    name: "A101",
    logo: "/cozumortaklari/a101--1024x701.jpg",
    desc: "Perakende Ortağı",
    work: "A101 mağazalarında satılan elektronik ürünler için uzatılmış garanti ve kazaen zarar sigorta poliçeleri sunuyoruz. Uygun fiyatlı koruma paketleriyle tüketicilerin cihazlarını güvence altına alıyoruz.",
    tags: ["Uzatılmış Garanti", "Cihaz Sigortası", "Perakende"],
  },
  {
    name: "Itopya",
    logo: "/cozumortaklari/Itopya_bilgisayar_logo.png",
    desc: "Teknoloji Ortağı",
    work: "Itopya ile İtopik Garanti kapsamında bilgisayar ve teknoloji ürünleri için 1 yıllık ek garanti paketleri sunuyoruz. Yüksek değerli teknolojik cihazlar için kapsamlı koruma sağlıyoruz.",
    tags: ["İtopik Garanti", "Bilgisayar", "Teknoloji"],
  },
  {
    name: "Diğer",
    logo: "/cozumortaklari/WhatsApp-Image-2024-11-14-at-21.10.27-1024x665.jpeg",
    desc: "Yetkili Acente",
    work: "30'dan fazla sigorta şirketi ile çalışarak müşterilerimize en geniş ürün yelpazesini ve en rekabetçi fiyatları sunuyoruz. Her ihtiyaca özel çözüm üretiyoruz.",
    tags: ["30+ Şirket", "Geniş Yelpazer", "Özel Çözüm"],
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}
