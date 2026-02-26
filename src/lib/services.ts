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
    image: "https://images.unsplash.com/photo-1449965408869-ebd13bc9e5a8?w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80",
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

export const partners = [
  { name: "Allianz", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Allianz_logo.svg/200px-Allianz_logo.svg.png" },
  { name: "Axa Sigorta", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/AXA_Logo.svg/200px-AXA_Logo.svg.png" },
  { name: "HDI Sigorta", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/HDI_logo.svg/200px-HDI_logo.svg.png" },
  { name: "Sompo Sigorta", logo: "https://logowik.com/content/uploads/images/sompo-japan-sigorta3288.logowik.com.webp" },
  { name: "Zurich Sigorta", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Zurich_Insurance_Group_logo.svg/200px-Zurich_Insurance_Group_logo.svg.png" },
  { name: "Mapfre Sigorta", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Mapfre_logo.svg/200px-Mapfre_logo.svg.png" },
  { name: "Anadolu Sigorta", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Anadolu_Sigorta_logo.svg/200px-Anadolu_Sigorta_logo.svg.png" },
  { name: "Groupama", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Groupama_logo.svg/200px-Groupama_logo.svg.png" },
];

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}
