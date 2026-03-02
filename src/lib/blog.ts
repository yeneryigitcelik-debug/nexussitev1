export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  image: string;
  readTime: string;
  tags: string[];
}

export const categories = [
  "Araç Sigortası",
  "Sağlık",
  "Konut & Yangın",
  "Hayat & Ferdi",
  "Genel Bilgi",
];

export const blogPosts: BlogPost[] = [
  {
    slug: "kasko-ve-trafik-sigortasi-farklari",
    title: "Kasko ve Trafik Sigortası Arasındaki Farklar: 2025 Güncel Rehber",
    excerpt: "Kasko ile zorunlu trafik sigortası arasındaki farkları, teminat kapsamlarını, fiyat farklılıklarını ve hangisini yaptırmanız gerektiğini detaylı karşılaştırmalı rehberimizle öğrenin.",
    content: `
      <p>Türkiye'de trafiğe çıkan her motorlu araç sahibinin en çok sorduğu sorulardan biri "Kasko mu yaptırayım, trafik sigortası yeterli mi?" sorusudur. Her iki sigorta türü de araç sahipleri için kritik önem taşımakla birlikte, <strong>kapsam, zorunluluk, fiyatlandırma ve hasar süreçleri</strong> açısından birbirinden oldukça farklıdır. Bu rehberde tüm farkları detaylı olarak inceliyoruz.</p>

      <h2>Zorunlu Trafik Sigortası Nedir?</h2>
      <p>Zorunlu Trafik Sigortası, 2918 sayılı Karayolları Trafik Kanunu gereğince trafiğe çıkan her motorlu araç sahibinin yaptırmak zorunda olduğu bir sigorta türüdür. Temel amacı, aracınızın üçüncü şahıslara (karşı tarafa) verebileceği <strong>maddi ve bedeni zararları</strong> karşılamaktır.</p>
      <p>Trafik sigortasının en önemli özelliği, <strong>yalnızca karşı tarafın zararlarını</strong> karşılamasıdır. Kendi aracınızdaki hasar, trafik sigortası kapsamında değildir. Teminat limitleri her yıl Hazine ve Maliye Bakanlığı tarafından belirlenir ve tüm sigorta şirketleri için asgari limitler sabittir.</p>

      <h2>Kasko Sigortası Nedir?</h2>
      <p>Kasko sigortası, isteğe bağlı (ihtiyari) bir sigorta türüdür ve <strong>kendi aracınızı</strong> çeşitli risklere karşı koruma altına alır. Çarpma, çarpışma, devrilme, yanma, çalınma, doğal afetler (dolu, sel, fırtına), üçüncü kişilerin kötü niyetli hareketleri gibi geniş bir risk yelpazesine karşı teminat sağlar.</p>
      <p>Kasko poliçeleri, ana teminatların yanı sıra <strong>İhtiyari Mali Mesuliyet (IMM), ferdi kaza, hukuksal koruma, ikame araç, mini onarım ve cam hasarı</strong> gibi ek teminatlarla da zenginleştirilebilir.</p>

      <h2>Kasko ve Trafik Sigortası Karşılaştırma Tablosu</h2>
      <ul>
        <li><strong>Zorunluluk:</strong> Trafik sigortası yasal olarak zorunludur. Kasko ise tamamen isteğe bağlıdır, ancak özellikle yeni ve değerli araçlar için şiddetle tavsiye edilir.</li>
        <li><strong>Teminat Kapsamı:</strong> Trafik sigortası yalnızca karşı tarafın zararlarını karşılar. Kasko ise kendi aracınızdaki hasarları da teminat altına alır.</li>
        <li><strong>Teminat Limitleri:</strong> Trafik sigortasında asgari limitler devlet tarafından belirlenir. Kaskoda ise limitler aracın kasko değerine ve seçilen teminatlara göre poliçeyle belirlenir.</li>
        <li><strong>Fiyatlandırma:</strong> Trafik sigortası primleri genellikle daha düşüktür. Kasko primleri aracın markası, modeli, yaşı, hasarsızlık kademesi ve seçilen ek teminatlara göre belirlenir.</li>
        <li><strong>Doğal Afet Teminatı:</strong> Trafik sigortasında doğal afet teminatı bulunmaz. Kasko ise dolu, sel, fırtına, deprem gibi doğal afet hasarlarını karşılar.</li>
        <li><strong>Hırsızlık Teminatı:</strong> Trafik sigortası hırsızlığı kapsamaz. Kasko, aracın çalınması veya çalınmaya teşebbüs durumunu teminat altına alır.</li>
        <li><strong>Hasarsızlık İndirimi:</strong> Her iki sigorta türünde de hasarsız geçirilen yıllar için indirim uygulanır. Trafik sigortasında yıllık %5, toplamda %50'ye kadar indirim sağlanır.</li>
      </ul>

      <h2>Hangi Durumlarda Kasko Yaptırmalısınız?</h2>
      <p>Kasko sigortası özellikle şu durumlarda büyük önem taşır:</p>
      <ul>
        <li>Aracınız sıfır veya 5 yaş altı ise</li>
        <li>Aracınızın güncel piyasa değeri yüksekse</li>
        <li>Aracınızı açık otoparkta bırakıyorsanız</li>
        <li>Yoğun trafikli şehirlerde kullanıyorsanız</li>
        <li>Dolu, sel gibi doğal afet riski yüksek bölgelerde yaşıyorsanız</li>
        <li>Aracınız krediyle alınmışsa (çoğu banka kasko şartı arar)</li>
      </ul>

      <h2>Hasarsızlık İndirimi Nedir ve Nasıl Korunur?</h2>
      <p>Hasarsızlık indirimi, her hasarsız geçen yıl için priminizde %5 oranında indirim sağlayan bir sistemdir. Trafik sigortasında 10 yılda toplamda <strong>%50'ye kadar</strong> indirim kazanabilirsiniz. Bu indirimi korumak için küçük çaplı hasarlarda onarım masrafını kendiniz karşılamayı değerlendirebilirsiniz.</p>

      <h2>En Uygun Teklifi Nasıl Alırsınız?</h2>
      <p>Nexus Sigorta olarak, <strong>36 çözüm ortağımız</strong> arasından karşılaştırmalı kasko ve trafik sigortası teklifi sunuyoruz. Aracınızın değeri, kullanım sıklığı, park koşulları ve hasarsızlık kademesini değerlendirerek sizin için en uygun ve kapsamlı poliçeyi bulmak için buradayız.</p>
      <p>Ücretsiz teklif almak ve uzman danışmanlarımızla görüşmek için hemen <strong>0533 251 67 73</strong> numarasından bize ulaşın.</p>
    `,
    category: "Araç Sigortası",
    author: "Nexus Sigorta",
    date: "2025-01-15",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80",
    readTime: "8 dk",
    tags: ["kasko", "trafik sigortası", "araç sigortası", "zorunlu sigorta", "kasko trafik farkı", "hasarsızlık indirimi"],
  },
  {
    slug: "saglik-sigortasi-secerken-dikkat-edilmesi-gerekenler",
    title: "Sağlık Sigortası Seçerken Dikkat Edilmesi Gerekenler",
    excerpt: "Sağlık sigortası alırken nelere dikkat etmelisiniz? Teminat kapsamı, hastane ağı ve prim hesaplama gibi kritik konuları açıklıyoruz.",
    content: `
      <p>Sağlık sigortası, siz ve aileniz için alacağınız en önemli kararlardan biridir. Doğru poliçeyi seçmek, beklenmedik sağlık harcamalarına karşı sizi koruyacaktır. İşte sağlık sigortası seçerken dikkat etmeniz gereken kritik noktalar.</p>

      <h2>1. Teminat Kapsamını İnceleyin</h2>
      <p>Sağlık sigortası poliçeleri arasında teminat kapsamı büyük farklılıklar gösterebilir. Yatarak tedavi, ayakta tedavi, diş tedavisi, doğum teminatı gibi kalemler poliçeden poliçeye değişir. İhtiyaçlarınızı belirleyerek en uygun teminat paketini seçmelisiniz.</p>

      <h2>2. Anlaşmalı Hastane Ağını Kontrol Edin</h2>
      <p>Sigorta şirketinin anlaşmalı olduğu hastaneler, sizin için büyük önem taşır. Yaşadığınız bölgedeki hastanelerin anlaşmalı olup olmadığını mutlaka kontrol edin. Geniş bir hastane ağı, tedaviye erişiminizi kolaylaştıracaktır.</p>

      <h2>3. Bekleme Sürelerini Öğrenin</h2>
      <p>Çoğu sağlık sigortası poliçesinde belirli teminatlar için bekleme süreleri uygulanır. Özellikle doğum, ortodonti ve bazı ameliyatlar için bekleme süreleri 6 ay ile 2 yıl arasında değişebilir.</p>

      <h2>4. Muafiyet ve Katılım Payını Değerlendirin</h2>
      <p>Düşük primli poliçeler genellikle yüksek muafiyet ve katılım payı içerir. Yıllık sağlık harcamalarınızı göz önünde bulundurarak bu dengeyi iyi kurmalısınız.</p>

      <h2>5. Prim Artış Politikasını Sorun</h2>
      <p>Yıllık prim artışları, uzun vadede bütçenizi etkileyecektir. Sigorta şirketinin geçmiş yıllardaki prim artış oranlarını incelemek, geleceğe yönelik planlama yapmanıza yardımcı olacaktır.</p>

      <p>Nexus Sigorta olarak, ihtiyaçlarınıza en uygun sağlık sigortası paketini bulmak için size özel danışmanlık hizmeti sunuyoruz. Karşılaştırmalı tekliflerimiz için bize ulaşın.</p>
    `,
    category: "Sağlık",
    author: "Nexus Sigorta",
    date: "2025-01-10",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
    readTime: "6 dk",
    tags: ["sağlık sigortası", "özel sağlık", "teminat", "hastane"],
  },
  {
    slug: "konut-sigortasi-neden-onemli",
    title: "Konut Sigortası Neden Önemli?",
    excerpt: "Evinizi yangın, hırsızlık, su baskını ve doğal afetlere karşı korumanın önemi ve konut sigortasının sağladığı güvenceler.",
    content: `
      <p>Ev, çoğu insanın hayatı boyunca yaptığı en büyük yatırımdır. Ancak birçok kişi bu değerli varlığını sigortalamayı ihmal eder. Konut sigortası, evinizi ve içindeki eşyalarınızı çeşitli risklere karşı koruma altına alır.</p>

      <h2>Konut Sigortası Neleri Kapsar?</h2>
      <p>Kapsamlı bir konut sigortası poliçesi şu riskleri karşılar:</p>
      <ul>
        <li><strong>Yangın ve Patlama:</strong> Evinizdeki yangın hasarlarını karşılar.</li>
        <li><strong>Hırsızlık:</strong> Hırsızlık sonucu oluşan maddi kayıpları teminat altına alır.</li>
        <li><strong>Su Baskını:</strong> Boru patlaması veya yağmur suyu kaynaklı hasarları kapsar.</li>
        <li><strong>Doğal Afetler:</strong> Fırtına, dolu, sel gibi doğal olayların zararlarını karşılar.</li>
        <li><strong>Cam Kırılması:</strong> Evinizin camlarında oluşabilecek hasarları karşılar.</li>
      </ul>

      <h2>Bina ve Eşya Teminatı</h2>
      <p>Konut sigortasında iki ana teminat bulunur: bina teminatı ve eşya teminatı. Bina teminatı yapının kendisini korurken, eşya teminatı içindeki mobilya, elektronik eşya ve kişisel eşyalarınızı kapsar. Her ikisini de yaptırmanız önerilir.</p>

      <h2>DASK ile Konut Sigortası Farkı</h2>
      <p>DASK (Doğal Afet Sigortaları Kurumu) zorunlu deprem sigortasıdır ve sadece deprem hasarını karşılar. Konut sigortası ise çok daha geniş bir kapsam sunar. İkisini birlikte yaptırmak en doğru yaklaşımdır.</p>

      <p>Konut sigortası primleri, evinizin büyüklüğü, konumu ve yapı malzemesine göre değişiklik gösterir. Nexus Sigorta olarak size en uygun konut sigortası teklifini sunmak için hazırız.</p>
    `,
    category: "Konut & Yangın",
    author: "Nexus Sigorta",
    date: "2025-01-05",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
    readTime: "5 dk",
    tags: ["konut sigortası", "ev sigortası", "yangın", "hırsızlık"],
  },
  {
    slug: "dask-nedir-neden-zorunludur",
    title: "DASK Nedir, Neden Zorunludur? 2025 Güncel Bilgiler ve Teminat Kapsamı",
    excerpt: "Zorunlu Deprem Sigortası DASK hakkında kapsamlı rehber: Nedir, neden zorunludur, neleri karşılar, prim hesaplama, teminat limitleri, başvuru süreci ve konut sigortasından farkları.",
    content: `
      <p>Türkiye, Kuzey Anadolu Fay Hattı ve Doğu Anadolu Fay Hattı başta olmak üzere aktif deprem kuşakları üzerinde yer alan bir ülkedir. Ülke topraklarının <strong>%96'sı deprem bölgesinde</strong>, nüfusun yaklaşık %98'i deprem riski altında yaşamaktadır. 17 Ağustos 1999 Marmara depremi sonrasında kurulan <strong>DASK (Doğal Afet Sigortaları Kurumu)</strong>, zorunlu deprem sigortası sistemiyle vatandaşların konutlarını deprem riskine karşı güvence altına almaktadır.</p>

      <h2>DASK (Zorunlu Deprem Sigortası) Nedir?</h2>
      <p>DASK, devlet güvencesiyle faaliyet gösteren ve belediye sınırları içindeki tüm konutlar için <strong>zorunlu olan deprem sigortası</strong> sistemidir. 27 Eylül 2000 tarihinde faaliyetlerine başlayan DASK, deprem ve depremin doğrudan neden olduğu <strong>yangın, patlama, devrilme, yer kayması ve tsunami</strong> gibi ikincil afet hasarlarını karşılar.</p>
      <p>DASK, bir kamu kurumu niteliğindedir ve poliçeler yetkili sigorta şirketleri ve acenteleri aracılığıyla düzenlenir. Toplanan primler DASK havuzunda biriktirilir ve olası büyük deprem hasarlarının karşılanmasında kullanılır.</p>

      <h2>DASK Neden Zorunludur?</h2>
      <p>6305 sayılı Afet Sigortaları Kanunu gereğince, tapuya kayıtlı ve mesken olarak kullanılan bağımsız bölümler için DASK yaptırılması <strong>yasal zorunluluktur</strong>. DASK yaptırmamak ciddi sonuçlar doğurabilir:</p>
      <ul>
        <li><strong>Konut sigortası yaptıramazsınız:</strong> Hiçbir sigorta şirketi, DASK olmadan konut sigortası poliçesi düzenlemez.</li>
        <li><strong>Tapu işlemleri yapılamaz:</strong> Konut alım-satım ve devir işlemlerinde geçerli DASK poliçesi aranır.</li>
        <li><strong>Devlet yardımı alamazsınız:</strong> Deprem sonrası devlet tarafından sağlanan yardımlardan yararlanma hakkınız ortadan kalkar.</li>
        <li><strong>Abonelik sorunları:</strong> Elektrik, su, doğalgaz gibi abonelik işlemlerinde DASK poliçesi talep edilebilir.</li>
        <li><strong>Banka kredisi:</strong> Konut kredisi kullanırken bankalar geçerli DASK poliçesi ister.</li>
      </ul>

      <h2>DASK Teminat Kapsamı: Neleri Karşılar, Neleri Karşılamaz?</h2>
      <p>DASK'ın teminat kapsamını doğru anlamak, beklentilerinizi yönetmeniz açısından önemlidir:</p>
      <h3>DASK'ın Karşıladığı Hasarlar</h3>
      <ul>
        <li>Deprem sonucu binanın tamamen veya kısmen hasar görmesi</li>
        <li>Depremin neden olduğu yangın hasarları</li>
        <li>Deprem kaynaklı patlama hasarları</li>
        <li>Depremden sonra meydana gelen yer kayması hasarları</li>
        <li>Deprem kaynaklı tsunami hasarları</li>
      </ul>
      <h3>DASK Kapsamı Dışında Kalan Durumlar</h3>
      <ul>
        <li><strong>Eşya ve mobilya hasarları:</strong> Ev içindeki eşyalar DASK kapsamında değildir</li>
        <li><strong>Alternatif barınma giderleri:</strong> Deprem sonrası otel, kira gibi masraflar karşılanmaz</li>
        <li><strong>İş ve gelir kaybı:</strong> Çalışamama durumunda oluşan kayıplar kapsam dışıdır</li>
        <li><strong>Manevi tazminat:</strong> Manevi kayıplar teminat altında değildir</li>
        <li><strong>Enkaz kaldırma masrafları:</strong> Yıkılan binanın enkaz kaldırma giderleri karşılanmaz</li>
      </ul>
      <p>Bu nedenle <strong>DASK tek başına yeterli değildir</strong>. Kapsamlı bir konut sigortasıyla desteklenmesi şiddetle tavsiye edilir.</p>

      <h2>DASK Primi Nasıl Hesaplanır?</h2>
      <p>DASK primleri oldukça uygun tutarlardadır ve şu faktörlere göre hesaplanır:</p>
      <ul>
        <li><strong>Deprem Bölgesi:</strong> Konutun bulunduğu bölgenin deprem riski (1. derece, 2. derece vb.)</li>
        <li><strong>Yapı Tarzı:</strong> Çelik/betonarme, yığma kagir, diğer yapı türleri</li>
        <li><strong>Brüt Yüzölçümü (m²):</strong> Konutun toplam brüt alanı</li>
        <li><strong>İnşa Yılı:</strong> Binanın yapım yılı ve deprem yönetmeliğine uygunluğu</li>
        <li><strong>Kat Sayısı:</strong> Binanın toplam kat adedi</li>
      </ul>
      <p>DASK teminat limiti, her yıl güncellenen metrekare birim fiyatı ile konutun brüt alanı çarpılarak belirlenir. Azami teminat tutarı da yıldan yıla güncellenir.</p>

      <h2>DASK ile Konut Sigortası Arasındaki Farklar</h2>
      <ul>
        <li><strong>Zorunluluk:</strong> DASK zorunlu, konut sigortası isteğe bağlıdır.</li>
        <li><strong>Kapsam:</strong> DASK sadece deprem hasarını karşılar. Konut sigortası yangın, hırsızlık, su baskını, fırtına, cam kırılması gibi geniş bir risk yelpazesini kapsar.</li>
        <li><strong>Eşya Teminatı:</strong> DASK eşyaları kapsamaz. Konut sigortası eşya teminatı sunar.</li>
        <li><strong>Ek Teminatlar:</strong> Konut sigortası ferdi kaza, sorumluluk sigortası, kira kaybı gibi ek teminatlar sunabilir.</li>
      </ul>
      <p><strong>En doğru yaklaşım:</strong> DASK + kapsamlı konut sigortasını birlikte yaptırarak hem deprem hem de diğer risklere karşı tam güvence sağlamaktır.</p>

      <h2>DASK Nasıl Yaptırılır?</h2>
      <p>DASK poliçesi yaptırmak oldukça kolay ve hızlıdır. Gerekli bilgiler:</p>
      <ul>
        <li>UAVT adres kodu veya tapu bilgileri (ada-parsel)</li>
        <li>Bina yapı tipi ve kat sayısı</li>
        <li>Konutun brüt m² alanı</li>
        <li>Sigortalının T.C. kimlik numarası</li>
      </ul>
      <p>Nexus Sigorta olarak DASK poliçenizi <strong>dakikalar içinde</strong> düzenleyebilir, konut sigortası ile birlikte kapsamlı bir güvence paketi oluşturabiliriz. Detaylı bilgi ve ücretsiz teklif için <strong>0533 251 67 73</strong> numarasından bize ulaşın.</p>
    `,
    category: "Konut & Yangın",
    author: "Nexus Sigorta",
    date: "2024-12-28",
    image: "https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=800&q=80",
    readTime: "10 dk",
    tags: ["DASK", "deprem sigortası", "zorunlu sigorta", "konut", "deprem", "konut sigortası farkı", "teminat kapsamı"],
  },
  {
    slug: "isyeri-sigortasi-isletmenizi-koruyun",
    title: "İş Yeri Sigortası ile İşletmenizi Koruyun",
    excerpt: "İş yeri sigortasının kapsamı, avantajları ve işletmenizi beklenmedik risklere karşı nasıl koruyabileceğinizi anlatıyoruz.",
    content: `
      <p>İşletme sahipleri için en büyük risklerden biri, iş yerinde meydana gelebilecek beklenmedik olaylardır. Yangın, hırsızlık, doğal afet veya bir iş kazası, işletmenizin devamlılığını tehdit edebilir. İş yeri sigortası bu risklere karşı güçlü bir güvence sağlar.</p>

      <h2>İş Yeri Sigortası Neleri Kapsar?</h2>
      <ul>
        <li><strong>Yangın ve Doğal Afet:</strong> İş yerinizin yangın, yıldırım, sel ve fırtına gibi olaylara karşı korunması.</li>
        <li><strong>Hırsızlık:</strong> Kasa hırsızlığı, stok kaybı ve değerli eşyaların çalınması.</li>
        <li><strong>Elektronik Cihaz:</strong> Bilgisayar, sunucu ve diğer elektronik ekipmanların korunması.</li>
        <li><strong>İşveren Sorumluluk:</strong> Çalışanlarınızın iş kazası geçirmesi durumunda teminat.</li>
        <li><strong>Üçüncü Şahıs Sorumluluk:</strong> Müşterilerinize veya ziyaretçilere verilebilecek zararlar.</li>
      </ul>

      <h2>Neden İş Yeri Sigortası Yaptırmalısınız?</h2>
      <p>Bir iş yerinin faaliyetlerine ara vermesi, ciddi mali kayıplara yol açabilir. İş yeri sigortası, olası bir hasar durumunda işinizin hızla toparlanmasını sağlar. Ayrıca müşterilerinize ve iş ortaklarınıza profesyonel bir güvence sunar.</p>

      <h2>İş Durması Teminatı</h2>
      <p>İş yeri sigortanıza ekleyebileceğiniz en önemli teminatlardan biri iş durması teminatıdır. Bir hasar sonucunda iş yeriniz kullanılamaz hale geldiğinde, kaybedilen geliri ve devam eden sabit giderleri karşılar.</p>

      <p>İşletmenizin büyüklüğü ve sektörü ne olursa olsun, size özel iş yeri sigortası çözümleri sunuyoruz. Detaylı bilgi almak için Nexus Sigorta'yı arayın.</p>
    `,
    category: "Genel Bilgi",
    author: "Nexus Sigorta",
    date: "2024-12-20",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    readTime: "5 dk",
    tags: ["iş yeri sigortası", "işletme", "yangın", "sorumluluk sigortası"],
  },
  {
    slug: "hayat-sigortasi-geleceginizi-guvence-altina-alin",
    title: "Hayat Sigortası: Geleceğinizi Güvence Altına Alın",
    excerpt: "Hayat sigortasının türleri, avantajları ve neden herkesin hayat sigortası yaptırması gerektiğini detaylı olarak ele alıyoruz.",
    content: `
      <p>Hayat sigortası, sevdiklerinizin geleceğini güvence altına almanın en etkili yollarından biridir. Beklenmedik bir durumda ailenizin finansal güvenliğini sağlarken, aynı zamanda birikim yapma imkanı da sunar.</p>

      <h2>Hayat Sigortası Türleri</h2>
      <ul>
        <li><strong>Vadeli Hayat Sigortası:</strong> Belirli bir süre için teminat sağlar. Süre sonunda birikim iadesi yapılmaz, ancak primleri daha uygun olur.</li>
        <li><strong>Birikimli Hayat Sigortası:</strong> Hem güvence hem de birikim imkanı sunar. Poliçe süresinin sonunda biriken tutar size ödenir.</li>
        <li><strong>Yatırım Fonlu Hayat Sigortası:</strong> Primlerinizin bir kısmı yatırım fonlarında değerlendirilir, potansiyel olarak daha yüksek getiri elde edilir.</li>
      </ul>

      <h2>Hayat Sigortasının Avantajları</h2>
      <p>Hayat sigortası yalnızca ölüm teminatından ibaret değildir. Kapsamlı bir hayat sigortası poliçesi şunları sunabilir:</p>
      <ul>
        <li>Vefat durumunda ailenize mali güvence</li>
        <li>Maluliyet teminatı ile çalışamaz duruma düştüğünüzde gelir desteği</li>
        <li>Kritik hastalık teşhisinde toplu ödeme</li>
        <li>Vergi avantajı ile birikim imkanı</li>
        <li>Kredi borçlarınızın güvence altına alınması</li>
      </ul>

      <h2>Kimler Hayat Sigortası Yaptırmalı?</h2>
      <p>Özellikle aile geçindiren, kredi borcu olan veya geleceğe yönelik birikim yapmak isteyen herkes hayat sigortası yaptırmalıdır. Hayat sigortası primleri genç yaşta çok daha uygun olduğu için erken başlamak önemlidir.</p>

      <p>Nexus Sigorta olarak, yaşam tarzınıza ve hedeflerinize uygun hayat sigortası planları sunuyoruz. Ücretsiz danışmanlık için bize ulaşın.</p>
    `,
    category: "Hayat & Ferdi",
    author: "Nexus Sigorta",
    date: "2024-12-15",
    image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=80",
    readTime: "6 dk",
    tags: ["hayat sigortası", "birikim", "yatırım", "güvence"],
  },
  {
    slug: "trafik-sigortasi-2025-guncel-fiyatlari",
    title: "Trafik Sigortası 2025 Güncel Fiyatları ve Bilmeniz Gerekenler",
    excerpt: "2025 yılı trafik sigortası fiyatları, teminat limitleri ve yeni düzenlemeler hakkında güncel bilgiler.",
    content: `
      <p>2025 yılında trafik sigortası fiyatları ve teminat limitleri güncellendi. Araç sahiplerinin bu değişikliklerden haberdar olması, doğru poliçeyi seçmeleri açısından büyük önem taşımaktadır.</p>

      <h2>2025 Trafik Sigortası Teminat Limitleri</h2>
      <p>Hazine ve Maliye Bakanlığı tarafından belirlenen 2025 yılı zorunlu trafik sigortası asgari teminat limitleri önemli ölçüde artırılmıştır. Bu artış, enflasyon oranları ve artan tamir maliyetleri göz önünde bulundurularak yapılmıştır.</p>

      <h2>Fiyatları Etkileyen Faktörler</h2>
      <ul>
        <li><strong>Araç Tipi:</strong> Otomobil, kamyonet, motosiklet gibi araç türüne göre primler değişir.</li>
        <li><strong>İl ve İlçe:</strong> Trafik yoğunluğu ve kaza istatistiklerine göre bölgesel fark uygulanır.</li>
        <li><strong>Hasarsızlık İndirimi:</strong> Geçmiş yıllarda hasar yapmayanlar için %50'ye varan indirimler uygulanır.</li>
        <li><strong>Araç Yaşı ve Motor Gücü:</strong> Yeni ve güçlü araçlar daha yüksek prim öder.</li>
        <li><strong>Sürücü Profili:</strong> Yaş, cinsiyet ve ehliyet süresi primi etkiler.</li>
      </ul>

      <h2>Hasarsızlık İndirimini Koruyun</h2>
      <p>Hasarsızlık indirimi, trafik sigortası primlerinizde ciddi tasarruf sağlar. Her hasarsız yıl için %5 indirim kazanırsınız ve bu indirim %50'ye kadar çıkabilir. Bu indirimi korumak için küçük hasarları kendi bütçenizden karşılamayı değerlendirebilirsiniz.</p>

      <h2>En Uygun Teklifi Nasıl Alırsınız?</h2>
      <p>Nexus Sigorta olarak 36 çözüm ortağımız arasından karşılaştırmalı trafik sigortası teklifi sunuyoruz. Tek başvuru ile en uygun fiyatı bulmanızı sağlıyoruz. Online teklif almak için bizimle iletişime geçin.</p>
    `,
    category: "Araç Sigortası",
    author: "Nexus Sigorta",
    date: "2024-12-10",
    image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80",
    readTime: "5 dk",
    tags: ["trafik sigortası", "2025", "fiyat", "hasarsızlık indirimi"],
  },
  {
    slug: "seyahat-sigortasi-yurt-disi",
    title: "Seyahat Sigortası: Yurt Dışı Seyahatlerinizde Güvende Olun",
    excerpt: "Yurt dışı seyahat sigortasının kapsamı, Schengen vizesi gereksinimleri ve seyahat ederken nelere dikkat etmeniz gerektiği.",
    content: `
      <p>Yurt dışı seyahatler heyecan verici olduğu kadar beklenmedik riskler de barındırır. Sağlık sorunları, bagaj kaybı, uçuş iptalleri gibi durumlar seyahat planlarınızı alt üst edebilir. Seyahat sigortası, bu risklere karşı güvence sağlayarak huzurlu bir yolculuk yapmanızı sağlar.</p>

      <h2>Seyahat Sigortası Neden Gerekli?</h2>
      <p>Birçok ülkede, özellikle Schengen bölgesinde, seyahat sigortası vize başvurusu için zorunludur. Minimum 30.000 Euro teminat limiti olan bir sağlık sigortası şartı aranır. Ancak zorunluluk olmasa bile seyahat sigortası yaptırmak akıllıca bir karardır.</p>

      <h2>Seyahat Sigortası Neleri Kapsar?</h2>
      <ul>
        <li><strong>Acil Sağlık Giderleri:</strong> Yurt dışında hastane ve tedavi masrafları.</li>
        <li><strong>Tıbbi Tahliye:</strong> Gerekli durumlarda ambulans uçakla ülkenize nakil.</li>
        <li><strong>Bagaj Kaybı/Gecikmesi:</strong> Bagajınızın kaybolması veya gecikmesi durumunda tazminat.</li>
        <li><strong>Uçuş İptali/Gecikmesi:</strong> Uçuşların iptal edilmesi veya gecikmesi halinde ek masrafların karşılanması.</li>
        <li><strong>Hukuki Yardım:</strong> Yurt dışında hukuki sorunlarla karşılaştığınızda destek.</li>
        <li><strong>Kişisel Sorumluluk:</strong> Üçüncü şahıslara verdiğiniz zararların karşılanması.</li>
      </ul>

      <h2>Doğru Seyahat Sigortasını Seçin</h2>
      <p>Seyahat sürenize, gideceğiniz ülkeye ve aktivitelerinize göre teminat kapsamı değişebilir. Kayak, dalış gibi ekstrem sporlar yapacaksanız, ek teminat eklemeniz gerekebilir.</p>

      <p>Nexus Sigorta olarak yurt dışı seyahat sigortanızı dakikalar içinde düzenleyebiliyoruz. Gideceğiniz ülkeye uygun poliçeler için bize ulaşın.</p>
    `,
    category: "Genel Bilgi",
    author: "Nexus Sigorta",
    date: "2024-12-05",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80",
    readTime: "5 dk",
    tags: ["seyahat sigortası", "yurt dışı", "Schengen", "vize"],
  },
  {
    slug: "ferdi-kaza-sigortasi-nedir-neleri-kapsar",
    title: "Ferdi Kaza Sigortası Nedir, Neleri Kapsar?",
    excerpt: "Ferdi kaza sigortasının tanımı, teminat kapsamı, kimlerin yaptırması gerektiği ve avantajları hakkında bilmeniz gerekenler.",
    content: `
      <p>Günlük hayatımızda karşılaşabileceğimiz kazalar, ciddi maddi ve bedeni sonuçlar doğurabilir. Ferdi kaza sigortası, bu tür beklenmedik olaylara karşı sizi ve ailenizi finansal olarak koruma altına alır.</p>

      <h2>Ferdi Kaza Sigortası Nedir?</h2>
      <p>Ferdi kaza sigortası, sigortalının bir kaza sonucu vefat etmesi, sürekli sakat kalması veya tedavi masraflarının oluşması durumunda teminat sağlayan bir sigorta türüdür. 7/24 ve dünya genelinde geçerlidir.</p>

      <h2>Teminat Kapsamı</h2>
      <ul>
        <li><strong>Vefat Teminatı:</strong> Kaza sonucu vefat durumunda belirlenen teminat tutarı hak sahiplerine ödenir.</li>
        <li><strong>Sürekli Sakatlık:</strong> Kaza sonucu oluşan sürekli sakatlık oranına göre teminat tutarı ödenir.</li>
        <li><strong>Tedavi Masrafları:</strong> Kaza sonucu oluşan hastane, ameliyat ve ilaç giderleri karşılanır.</li>
        <li><strong>Gündelik Tazminat:</strong> Kaza nedeniyle çalışamadığınız günler için günlük tazminat ödenir.</li>
      </ul>

      <h2>Kimler Ferdi Kaza Sigortası Yaptırmalı?</h2>
      <p>Ferdi kaza sigortası herkes için uygun olmakla birlikte, özellikle şu kişilere önerilir:</p>
      <ul>
        <li>Ailesinin tek gelir kaynağı olanlar</li>
        <li>Tehlikeli işlerde çalışanlar</li>
        <li>Aktif spor yapanlar</li>
        <li>Sık seyahat edenler</li>
        <li>SGK kapsamı dışında kalanlar</li>
      </ul>

      <h2>Avantajları</h2>
      <p>Ferdi kaza sigortası primleri oldukça uygun olmasına rağmen, ciddi kazalarda büyük mali güvence sağlar. Ayrıca sağlık beyanı gerektirmediği için kolayca yaptırılabilir.</p>

      <p>Nexus Sigorta olarak, bütçenize ve ihtiyaçlarınıza uygun ferdi kaza sigortası poliçeleri sunuyoruz. Hemen teklif alın!</p>
    `,
    category: "Hayat & Ferdi",
    author: "Nexus Sigorta",
    date: "2024-11-28",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
    readTime: "5 dk",
    tags: ["ferdi kaza", "kaza sigortası", "teminat", "güvence"],
  },
  {
    slug: "sigorta-yaptirirken-en-cok-yapilan-5-hata",
    title: "Sigorta Yaptırırken En Çok Yapılan 5 Hata",
    excerpt: "Sigorta poliçesi alırken sıkça yapılan hataları ve bunlardan nasıl kaçınabileceğinizi öğrenin. Doğru sigorta seçimi için ipuçları.",
    content: `
      <p>Sigorta yaptırmak, finansal güvenliğiniz için atılacak en önemli adımlardan biridir. Ancak birçok kişi sigorta sürecinde kritik hatalar yaparak yetersiz teminata sahip olabilmektedir. İşte en çok yapılan 5 hata ve bunlardan kaçınma yolları.</p>

      <h2>1. Sadece Fiyata Bakarak Karar Vermek</h2>
      <p>En ucuz poliçeyi seçmek kısa vadede tasarruf gibi görünse de, hasar anında yetersiz teminatla karşılaşabilirsiniz. Fiyat kadar teminat kapsamı, muafiyet tutarları ve hizmet kalitesini de değerlendirmelisiniz.</p>

      <h2>2. Poliçe Şartlarını Okumamak</h2>
      <p>Poliçenizi imzalamadan önce genel şartları, özel şartları ve istisnaları mutlaka okuyun. Nelerin kapsam dışı olduğunu bilmek, hasar anında sürpriz yaşamamanızı sağlar. Özellikle muafiyet tutarlarını ve bekleme sürelerini kontrol edin.</p>

      <h2>3. Eksik veya Yanlış Beyan Vermek</h2>
      <p>Sigorta başvurusunda verdiğiniz bilgilerin doğru ve eksiksiz olması çok önemlidir. Yanlış beyan, hasar anında poliçenizin geçersiz sayılmasına neden olabilir. Örneğin, evinizin metrekaresini veya aracınızın kullanım amacını yanlış belirtmek sorun yaratabilir.</p>

      <h2>4. Teminat Tutarını Düşük Belirlemek</h2>
      <p>Düşük prim ödemek amacıyla teminat tutarını gerçek değerin altında belirlemek, "eksik sigorta" olarak adlandırılır. Bu durumda hasar anında, hasar tutarının tamamını karşılayamazsınız. Sigorta bedelini varlığınızın güncel değerine uygun belirlemelisiniz.</p>

      <h2>5. Poliçeyi Yenilemeyi Unutmak</h2>
      <p>Sigorta poliçenizin süresi dolduğunda yenilemeyi ihmal etmek, sizi tamamen korumasız bırakır. Birçok kişi trafik sigortası dışındaki poliçeleri yenilemeyi unutur. Otomatik yenileme ayarı veya hatırlatıcılar kullanarak bu hatadan kaçınabilirsiniz.</p>

      <h2>Doğru Sigorta Nasıl Seçilir?</h2>
      <p>Bu hatalardan kaçınmanın en iyi yolu, uzman bir sigorta danışmanıyla çalışmaktır. Nexus Sigorta olarak, ihtiyaçlarınızı analiz ediyor ve size en uygun poliçeyi öneriyoruz. 36 çözüm ortağımız arasından karşılaştırmalı teklifler sunarak doğru kararı vermenize yardımcı oluyoruz.</p>
    `,
    category: "Genel Bilgi",
    author: "Nexus Sigorta",
    date: "2024-11-20",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
    readTime: "7 dk",
    tags: ["sigorta ipuçları", "hata", "poliçe", "teminat"],
  },
];

export function getAllPosts(): BlogPost[] {
  return [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getPostsByCategory(category: string): BlogPost[] {
  return getAllPosts().filter((p) => p.category === category);
}

export function getCategories(): string[] {
  return categories;
}
