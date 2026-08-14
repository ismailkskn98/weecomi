/** Static fallback news when the API is offline. TR + EN localized content. */
const rawArticles = [
  {
    id: 1,
    slug: "weecomi-ecosystem-expanding",
    category: "company",
    isFeatured: true,
    author: "WeeComi",
    publishedAt: "2026-06-10",
    coverImageUrl: "/images/news/weecomi-ecosystem-expanding.png",
    authorImageUrl: null,
    locales: {
      tr: {
        title: "WeeComi International ekosistemi büyümeye devam ediyor",
        summary:
          "WeeComi International; işletme dijitalleşmesi, ticaret, yapay zekâ ve dijital varlık alanlarında bağımsız ürünlerle uluslararası erişimi genişletiyor.",
        highlight:
          "Bağımsız ürünlerle ticaret, yapay zekâ ve işletme yönetimi için ölçeklenebilir bir teknoloji portföyü sunuyoruz.",
        content: `WeeComi International, işletmelerin dijital dönüşümünü hızlandırmak için bağımsız ürünlerden oluşan bir ekosistem geliştiriyor. WeeNetwork, WeeMenu, WeeCard ve WeeKobi gibi işletme çözümleri; WeeSale ve Alışveriş Kapıda ile ticaret katmanı; WeeComi Bot ile algoritmik işlem altyapısı; WeeCoins, CriptoSwaps ve WeeZard ile dijital varlık deneyimleri aynı marka çatısı altında konumlanıyor.

Her ürün kendi alanında bağımsız çalışır; işletmeler ihtiyaçlarına göre tek bir çözümle başlayıp zaman içinde diğer katmanları değerlendirebilir. Çok dilli arayüzler, mobil uyumlu deneyimler ve merkezi yönetim panelleri operasyon ekiplerinin günlük işini sadeleştirmeyi hedefler.

WeeComi International'ın yaklaşımı, hızlı kurulum ve net sorumluluk alanları üzerine kuruludur. Restoran zincirleri dijital menüyü WeeMenu ile açarken, KOBİ'ler WeeKobi ile mağaza ve sipariş süreçlerini tek panelden izleyebilir. Satıcı odaklı ekipler WeeSale üzerinden ürün vitrinlerini yönetirken, tüketici tarafında Alışveriş Kapıda keşif ve kampanya akışları devreye girer.

Ekosistem büyüdükçe haber merkezimiz üzerinden ürün lansmanları, ortaklık duyuruları ve operasyon güncellemelerini paylaşmaya devam edeceğiz. Kurumsal ekipler, entegrasyon ihtiyaçları veya demo talepleri için iletişim formu üzerinden doğrudan bize ulaşabilir.`,
      },
      en: {
        title: "The WeeComi International ecosystem keeps expanding",
        summary:
          "WeeComi International is extending international reach with independent products across business digitization, commerce, AI and digital assets.",
        highlight:
          "We deliver a scalable technology portfolio for commerce, AI and business operations through independent products.",
        content: `WeeComi International builds an ecosystem of independent products to accelerate digital transformation for businesses. Business solutions such as WeeNetwork, WeeMenu, WeeCard and WeeKobi sit alongside commerce layers like WeeSale and Alışveriş Kapıda, algorithmic trading infrastructure with WeeComi Bot, and digital asset experiences through WeeCoins, CriptoSwaps and WeeZard.

Each product operates independently in its domain. Teams can start with one solution and evaluate additional layers over time. Multilingual interfaces, mobile-ready experiences and centralized admin panels aim to simplify daily operations.

WeeComi International focuses on fast onboarding and clear ownership areas. Restaurant groups can launch digital menus with WeeMenu, while SMEs track store and order flows from one panel with WeeKobi. Seller-focused teams manage storefronts on WeeSale, while shopper discovery and campaign flows run on Alışveriş Kapıda.

As the ecosystem grows, we will continue sharing product launches, partnerships and operational updates through our news hub. Corporate teams can reach us directly via the contact form for integration needs or demo requests.`,
      },
    },
  },
  {
    id: 2,
    slug: "weemenu-realtime-operations",
    category: "weemenu",
    isFeatured: false,
    author: "WeeComi",
    publishedAt: "2026-05-22",
    coverImageUrl: "/images/news/weemenu-realtime-operations.png",
    authorImageUrl: null,
    locales: {
      tr: {
        title: "WeeMenu ile anlık restoran operasyon yönetimi",
        summary:
          "WeeMenu, mutfak, garson ve kurye rollerini WebSocket tabanlı anlık takiple tek panelde birleştiriyor.",
        highlight: "QR menüden operasyona: fiyat güncellemesi, çoklu dil ve rol bazlı anlık görünürlük.",
        content: `WeeMenu, WeeComi International'ın restoran ve hizmet işletmeleri için geliştirdiği dijital menü platformudur. Basılı menü maliyetlerini azaltırken, fiyat ve ürün güncellemelerini anında yayınlamayı mümkün kılar. Misafirler uygulama indirmeden QR kod ile tarayıcı üzerinden menüye ulaşır.

Operasyon tarafında WeeMenu; mutfak, garson ve kurye rollerini WebSocket altyapısı ile anlık takip eder. Sipariş durumu değiştikçe ilgili ekranlar güncellenir; ekipler telefon araması veya kağıt fiş yerine panel üzerinden ilerler. Çoklu dil desteği turistik bölgelerde ve uluslararası zincirlerde misafir deneyimini güçlendirir.

Tema özelleştirme, PDF dışa aktarma ve kategori bazlı ürün yönetimi marka kimliğini korurken operasyonu standartlaştırır. WeeMenu, WeeNetwork dijital kimlik katmanının parçası olarak WeeCard ve WeeCatalog ile birlikte konumlanabilir; ancak bağımsız olarak da kullanılabilir.

Restoran yöneticileri yoğun saatlerde gecikmeleri erken fark edebilir, garson ekipleri masa bazlı talepleri net görür ve mutfak ekranları sipariş önceliğini daha tutarlı yönetir. WeeMenu demo ve kurulum süreci için WeeComi iletişim kanalları üzerinden talep oluşturulabilir.`,
      },
      en: {
        title: "Realtime restaurant operations with WeeMenu",
        summary:
          "WeeMenu combines kitchen, waiter and courier roles in one panel with WebSocket-based realtime tracking.",
        highlight: "From QR menu to operations: instant price updates, multilingual support and role-based visibility.",
        content: `WeeMenu is WeeComi International's digital menu platform for restaurants and service businesses. It reduces printed menu costs while publishing price and product updates instantly. Guests reach the menu in the browser via QR without installing an app.

On the operations side, WeeMenu tracks kitchen, waiter and courier roles in realtime through WebSocket infrastructure. As order status changes, relevant screens update and teams move through the panel instead of phone calls or paper tickets. Multilingual support strengthens guest experience in tourist areas and international chains.

Theme customization, PDF export and category-based product management standardize operations while preserving brand identity. WeeMenu can sit within the WeeNetwork digital identity layer alongside WeeCard and WeeCatalog, yet it also works independently.

Restaurant managers can spot delays early during peak hours, waiter teams see table-level requests clearly and kitchen screens manage order priority more consistently. Demo and onboarding requests can be submitted through WeeComi contact channels.`,
      },
    },
  },
  {
    id: 3,
    slug: "weecard-digital-identity",
    category: "weecard",
    isFeatured: false,
    author: "WeeComi",
    publishedAt: "2026-05-05",
    coverImageUrl: "/images/news/weecard-digital-identity.png",
    authorImageUrl: null,
    locales: {
      tr: {
        title: "WeeCard ile dijital kimlik ve NFC paylaşım",
        summary:
          "WeeCard, profesyonel iletişim bilgilerini QR ve NFC ile paylaşılabilir tek dijital kartta toplar.",
        highlight: "Satış ekipleri için tek dokunuşla paylaşım, tema seçenekleri ve görüntülenme analizi.",
        content: `WeeCard, WeeComi International ekosisteminde profesyonel iletişim bilgilerini dijitalleştiren bağımsız bir üründür. Telefon, e-posta, sosyal bağlantılar ve web adresleri tek kartta birleşir; QR kod veya NFC ile anında paylaşılır.

Satış ve iş geliştirme ekipleri kartvizit baskı maliyetlerini azaltırken bilgilerini panelden güncel tutabilir. Tema seçenekleri marka renklerine uyum sağlar; görüntülenme ve tıklama analizi hangi kanalların daha çok ilgi gördüğünü gösterir.

WeeCard, etkinlikler, fuarlar ve saha satış görüşmelerinde hızlı networking sağlar. Fiziksel NFC kart opsiyoneldir; QR ve link paylaşımı tek başına yeterlidir. WeeNetwork platform katmanı üzerinden WeeMenu veya WeeCatalog ile birlikte değerlendirilebilir.

Kurumsal markalar ekip bazlı kart şablonları oluşturabilir, ajanslar müşteri projelerinde marka tutarlılığını koruyabilir. WeeCard kurulumu birkaç dakika sürer; detaylı demo için WeeComi iletişim formunu kullanabilirsiniz.`,
      },
      en: {
        title: "Digital identity and NFC sharing with WeeCard",
        summary:
          "WeeCard unifies professional contact details in one shareable digital card via QR and NFC.",
        highlight: "One-tap sharing for sales teams with theme options and view analytics.",
        content: `WeeCard is an independent product in the WeeComi International ecosystem that digitizes professional contact details. Phone, email, social links and web addresses live in one card and can be shared instantly via QR or NFC.

Sales and business development teams reduce print costs while keeping details current from the admin panel. Theme options match brand colors; view and click analytics show which channels get the most attention.

WeeCard enables fast networking at events, trade shows and field meetings. Physical NFC cards are optional; QR and link sharing alone are sufficient. It can be evaluated alongside WeeMenu or WeeCatalog through the WeeNetwork platform layer.

Corporate brands can create team-based card templates; agencies keep brand consistency across client projects. WeeCard setup takes minutes; use the WeeComi contact form for a detailed demo.`,
      },
    },
  },
  {
    id: 4,
    slug: "innovation-ai-operations",
    category: "innovation",
    isFeatured: false,
    author: "WeeComi",
    publishedAt: "2026-04-18",
    coverImageUrl: "/images/news/innovation-ai-operations.png",
    authorImageUrl: null,
    locales: {
      tr: {
        title: "Yapay zekâ destekli operasyon: WeeComi ekosisteminde yeni ritim",
        summary:
          "WeeComi Bot ve ekosistem ürünlerinde veri odaklı karar alma, otomasyon ve panel görünürlüğü güçleniyor.",
        highlight: "Strateji, sinyal ve risk süreçlerini tek panelde daha kontrollü yönetmek mümkün.",
        content: `WeeComi International, yapay zekâ destekli operasyonları bağımsız ürünler üzerinden konumlandırıyor. WeeComi Bot; strateji oluşturma, yapay zekâ sinyalleri, backtest, paper trading ve risk yönetimini tek panelde birleştirir. Bu ürün yatırım tavsiyesi vermez ve kazanç garantisi sunmaz.

Operasyon ekipleri için hedef, manuel tekrarları azaltmak ve karar akışını daha görünür kılmaktır. Backtest ile stratejiler tarihsel veride test edilir; paper trading modunda canlı piyasa koşulları sanal ortamda denenebilir. Risk kontrolleri portföy ve sinyal seviyesinde izlenir.

WeeMenu, WeeKobi ve WeeSale tarafında ise veri odaklı raporlama ve anlık operasyon takibi günlük kararları hızlandırır. Ekosistem genelinde tutarlı panel dili, ekiplerin ürünler arası geçişini kolaylaştırır.

Finans ve algoritmik işlem alanında çalışan ekipler WeeComi Bot dokümantasyonunu inceleyebilir; işletme dijitalleşmesi tarafında WeeMenu ve WeeKobi demo talepleri iletişim formu üzerinden iletilebilir. Yatırım kararları kullanıcı sorumluluğundadır.`,
      },
      en: {
        title: "AI-powered operations: a new rhythm across WeeComi",
        summary:
          "Data-driven decisions, automation and panel visibility are strengthening across WeeComi Bot and ecosystem products.",
        highlight: "Strategy, signal and risk flows can be managed more clearly from one panel.",
        content: `WeeComi International positions AI-assisted operations through independent products. WeeComi Bot combines strategy building, AI signals, backtesting, paper trading and risk management in one panel. It does not provide investment advice or profit guarantees.

For operations teams, the goal is to reduce manual repetition and make decision flows more visible. Strategies can be tested on historical data through backtesting; paper trading mode lets users trial live market conditions virtually. Risk controls are monitored at portfolio and signal level.

On the WeeMenu, WeeKobi and WeeSale side, data-driven reporting and realtime operations tracking speed up daily decisions. A consistent panel language across the ecosystem makes it easier for teams to move between products.

Teams working in finance and algorithmic trading can review WeeComi Bot documentation; business digitization teams can submit WeeMenu and WeeKobi demo requests through the contact form. Investment decisions remain the user's responsibility.`,
      },
    },
  },
  {
    id: 5,
    slug: "weekobi-sme-digital-panel",
    category: "weekobi",
    isFeatured: false,
    author: "WeeComi",
    publishedAt: "2026-03-28",
    coverImageUrl: "/images/news/weekobi-sme-digital-panel.png",
    authorImageUrl: null,
    locales: {
      tr: {
        title: "WeeKobi: KOBİ'ler için merkezi mağaza ve operasyon paneli",
        summary:
          "WeeKobi, çok şubeli ve tek şubeli işletmelerin ürün, sipariş ve operasyon süreçlerini tek panelden yönetmesini sağlar.",
        highlight: "Mağaza yönetimi, raporlama ve operasyon görünürlüğü KOBİ ölçeğinde sadeleştirildi.",
        content: `WeeKobi, WeeComi International'ın KOBİ odaklı işletme yönetim platformudur. Mağaza, ürün, sipariş ve operasyon süreçlerini tek panelde toplayarak günlük iş akışını daha okunur hale getirir. Tek şube veya çok şubeli yapılarda merkezi yönetim mümkündür.

Perakende ekipleri stok ve ürün yapısını panele taşır; operasyon yöneticileri sipariş durumlarını anlık izler. Raporlama altyapısı satış ve operasyon kararları için temel görünürlük sağlar. WeeKobi, WeeSale ve Alışveriş Kapıda gibi ticaret katmanlarıyla birlikte konumlanabilir; bağımsız olarak da kullanılabilir.

Franchise ve bayi ağları şube bazlı yetkilendirme ile merkezi kontrolü koruyabilir. WeeMenu entegrasyon senaryolarında restoran operasyonu ile mağaza yönetimi farklı ekranlarda net ayrılır.

KOBİ sahipleri kurulum öncesi ihtiyaç analizi için WeeComi iletişim ekibiyle görüşebilir. Demo sürecinde mevcut ürün kataloğu, sipariş hacmi ve şube sayısı değerlendirilerek uygun panel yapılandırması önerilir.`,
      },
      en: {
        title: "WeeKobi: centralized store and operations panel for SMEs",
        summary:
          "WeeKobi helps single-branch and multi-branch businesses manage products, orders and operations from one panel.",
        highlight: "Store management, reporting and operational visibility simplified for SME scale.",
        content: `WeeKobi is WeeComi International's SME-focused business management platform. It brings store, product, order and operation flows into one panel to make daily work more readable. Central management works for single-branch and multi-branch setups.

Retail teams move stock and product structure into the panel; operations managers track order status in realtime. Reporting infrastructure provides baseline visibility for sales and operations decisions. WeeKobi can sit alongside commerce layers such as WeeSale and Alışveriş Kapıda, or be used independently.

Franchise and dealer networks can keep central control with branch-level permissions. In WeeMenu integration scenarios, restaurant operations and store management stay clearly separated across screens.

SME owners can speak with the WeeComi contact team for a needs assessment before onboarding. During demo, product catalog, order volume and branch count are reviewed to recommend the right panel configuration.`,
      },
    },
  },
  {
    id: 6,
    slug: "weesale-seller-commerce-layer",
    category: "weesale",
    isFeatured: false,
    author: "WeeComi",
    publishedAt: "2026-03-12",
    coverImageUrl: "/images/news/weesale-seller-commerce-layer.png",
    authorImageUrl: null,
    locales: {
      tr: {
        title: "WeeSale: satıcı odaklı çok dilli pazar yeri katmanı",
        summary:
          "WeeSale, sıfır ve ikinci el ürün listeleme, WCP destekli satış akışları ve satıcı görünürlüğünü bir araya getirir.",
        highlight: "WeeComi ticaret ekosisteminde satıcılar için keşif, kampanya ve güvenli alışveriş altyapısı.",
        content: `WeeSale, WeeComi International'ın satıcı odaklı e-ticaret katmanıdır. Online mağaza açma, ürün listeleme, kampanya yönetimi ve satıcı profili araçları dijital satış kanallarını genişletmeyi hedefler. Sıfır ve ikinci el ürün senaryoları aynı platformda değerlendirilebilir.

Çok dilli pazar yeri deneyimi, uluslararası satıcıların vitrinlerini farklı pazarlara uyarlamasına yardımcı olur. WCP ile satış akışları WeeCoins ekosistemiyle ilişkilendirilebilir; bu kullanım senaryoları gelir veya değer artışı vaadi içermez.

WeeSale, Alışveriş Kapıda'dan farklı olarak satıcı operasyonlarına odaklanır. Alışveriş Kapıda tüketici keşfi ve kampanya deneyimini öne çıkarır. İki ürün birlikte WeeComi ticaret stratejisinin tamamlayıcı parçalarıdır.

Marka mağazaları ve pazar yeri girişimleri onboarding sürecinde ürün kategorisi, lojistik modeli ve hedef pazar bilgisiyle ilerler. Detaylı bilgi için WeeComi iletişim formu kullanılabilir.`,
      },
      en: {
        title: "WeeSale: multilingual seller-focused marketplace layer",
        summary:
          "WeeSale combines new and second-hand listings, WCP-enabled sales flows and seller visibility.",
        highlight: "Discovery, campaigns and secure shopping infrastructure for sellers in the WeeComi commerce ecosystem.",
        content: `WeeSale is WeeComi International's seller-focused commerce layer. Online store setup, product listing, campaign management and seller profile tools aim to extend digital sales channels. New and second-hand product scenarios can be evaluated on the same platform.

A multilingual marketplace experience helps international sellers adapt storefronts to different markets. WCP-enabled sales flows can relate to the WeeCoins ecosystem; these usage scenarios do not promise income or price appreciation.

WeeSale focuses on seller operations, unlike Alışveriş Kapıda which highlights shopper discovery and campaigns. Both products are complementary parts of WeeComi's commerce strategy.

Brand stores and marketplace startups proceed through onboarding with product category, logistics model and target market information. Use the WeeComi contact form for detailed information.`,
      },
    },
  },
  {
    id: 7,
    slug: "weecomibot-risk-aware-automation",
    category: "weecomibot",
    isFeatured: false,
    author: "WeeComi",
    publishedAt: "2026-02-20",
    coverImageUrl: "/images/news/weecomibot-risk-aware-automation.png",
    authorImageUrl: null,
    locales: {
      tr: {
        title: "WeeComi Bot: risk bilinciyle algoritmik işlem otomasyonu",
        summary:
          "Strateji oluşturma, backtest, paper trading ve risk kontrolleri tek panelde; yatırım tavsiyesi değildir.",
        highlight: "No-code strateji kuralları ve yapay zekâ sinyalleri ile süreci test edin, sonra risk ile izleyin.",
        content: `WeeComi Bot, WeeComi International tarafından sunulan algoritmik işlem platformudur. Kullanıcılar no-code kurallar veya indikatör kombinasyonlarıyla strateji tanımlayabilir; yapay zekâ destekli sinyaller karar akışına ek görünürlük sağlar.

Backtest modülü stratejileri tarihsel veri üzerinde dener. Paper trading, canlı piyasa verisiyle sanal işlem yaparak stratejiyi gerçek sermaye riski olmadan test etmeyi mümkün kılar. Risk ve portföy yönetimi araçları sinyal seviyesinde kontrol sunar.

WeeComi Bot yatırım tavsiyesi vermez, kazanç garantisi sunmaz ve finansal piyasalardaki işlemlerin risk içerdiğini açıkça belirtir. Platform, süreci daha kontrollü yönetmek isteyen strateji geliştiriciler ve algoritmik işlem meraklıları için tasarlanmıştır.

Otomatik işlem altyapısı kurulum öncesi risk profili, varlık sınıfı ve test süresi netleştirilmelidir. Detaylı bilgi bot.weecomi.com üzerinden ve WeeComi iletişim kanallarından alınabilir.`,
      },
      en: {
        title: "WeeComi Bot: risk-aware algorithmic trading automation",
        summary:
          "Strategy building, backtesting, paper trading and risk controls in one panel; not investment advice.",
        highlight: "Test flows with no-code strategy rules and AI signals, then monitor with risk controls.",
        content: `WeeComi Bot is an algorithmic trading platform offered by WeeComi International. Users can define strategies with no-code rules or indicator combinations; AI-assisted signals add visibility to decision flows.

The backtesting module trials strategies on historical data. Paper trading enables virtual trades with live market data without real capital risk. Risk and portfolio tools provide signal-level controls.

WeeComi Bot does not provide investment advice, does not guarantee profits and clearly states that financial market activity involves risk. The platform is designed for strategy builders and algorithmic trading users who want clearer process control.

Before setting up automated trading infrastructure, risk profile, asset class and testing duration should be clarified. Learn more at bot.weecomi.com and through WeeComi contact channels.`,
      },
    },
  },
  {
    id: 8,
    slug: "weecoins-digital-asset-layer",
    category: "weecoins",
    isFeatured: false,
    author: "WeeComi",
    publishedAt: "2026-02-05",
    coverImageUrl: "/images/news/weecoins-digital-asset-layer.png",
    authorImageUrl: null,
    locales: {
      tr: {
        title: "WeeCoins: WeeComi ekosisteminde dijital varlık ve transfer katmanı",
        summary:
          "Transfer, ödeme altyapısı ve platform entegrasyonları; gelir veya değer artışı vaadi içermez.",
        highlight: "WeeComi ürünlerinde kullanım senaryoları için tasarlanmış bağımsız dijital varlık altyapısı.",
        content: `WeeCoins, WeeComi International ekosisteminde dijital transfer ve ödeme senaryoları için geliştirilen bağımsız bir dijital varlık katmanıdır. WeeSale, WeeZard ve diğer ürünlerdeki kullanım akışlarına entegrasyon imkânı sunar; fiyat artışı veya gelir garantisi vaadi içermez.

Platform entegrasyonu arayan ekipler cüzdan uyumluluğu, transfer altyapısı ve ekosistem içi kullanım senaryolarını birlikte değerlendirmelidir. WeeCoins Premium, genişletilmiş erişim ve ek kullanım katmanları sunar; yine yatırım getirisi vaat etmez.

WeeCoins ekosistemi eğitim ve topluluk odaklı içeriklerle desteklenir. WeeZard gibi oyun katmanları WCP birikim senaryolarını sunabilir; bu deneyimler eğlence odaklıdır ve yatırım tavsiyesi değildir.

İşletmeler entegrasyon planı oluştururken uyumluluk, kullanıcı bilgilendirme metinleri ve risk açıklamalarını net tutmalıdır. WeeComi iletişim ekibi teknik ön görüşme için form üzerinden ulaşılabilir.`,
      },
      en: {
        title: "WeeCoins: digital asset and transfer layer in the WeeComi ecosystem",
        summary:
          "Transfer, payment infrastructure and platform integrations; does not promise income or price appreciation.",
        highlight: "Independent digital asset infrastructure designed for usage scenarios across WeeComi products.",
        content: `WeeCoins is an independent digital asset layer in the WeeComi International ecosystem, built for digital transfer and payment scenarios. It can integrate with usage flows in WeeSale, WeeZard and other products; it does not promise price growth or income guarantees.

Teams evaluating platform integration should review wallet compatibility, transfer infrastructure and in-ecosystem usage scenarios together. WeeCoins Premium offers extended access and additional usage layers; it also does not promise investment returns.

The WeeCoins ecosystem is supported with education and community-focused content. Game layers such as WeeZard may offer WCP accumulation scenarios; these experiences are entertainment-focused and not investment advice.

Businesses planning integration should keep compliance, user disclosure and risk statements clear. The WeeComi contact team is available via the form for technical discovery calls.`,
      },
    },
  },
  {
    id: 9,
    slug: "criptoswaps-fan-token-guide",
    category: "criptoswaps",
    isFeatured: false,
    author: "WeeComi",
    publishedAt: "2026-01-18",
    coverImageUrl: "/images/news/criptoswaps-fan-token-guide.png",
    authorImageUrl: null,
    locales: {
      tr: {
        title: "CriptoSwaps: fan token ve dijital varlık işlemlerine giriş",
        summary:
          "Türkiye merkezli dijital varlık platformu; 7/24 işlem, mobil uygulama ve WeeGold Blockchain altyapısı.",
        highlight: "Fan token listelemeleri ve özel token projeleri için güvenlik odaklı işlem deneyimi.",
        content: `CriptoSwaps, WeeComi International ekosisteminde yer alan Türkiye merkezli dijital varlık ve kripto para platformudur. 7/24 işlem altyapısı, iOS ve Android mobil uygulamaları ve iki faktörlü kimlik doğrulama ile kullanıcı güvenliği önceliklendirilir.

Fan token'lar spor kulüpleri ve dernekler için ihraç edilen dijital varlıklardır; CriptoSwaps üzerinde alım-satım işlemleri gerçekleştirilebilir. Özel token projeleri WeeGold Blockchain altyapısı üzerinde barındırılabilir.

Platform eğitim ve destek hizmetleri sunar; telefon ve e-posta kanalları üzerinden 7/24 iletişim mümkündür. Kripto varlık işlemleri yüksek risk içerebilir; kullanıcılar kendi araştırmalarını yapmalı ve yatırım tavsiyesi olarak değerlendirilmemelidir.

CriptoSwaps hesap açma, varlık transferi ve işlem süreçleri web veya mobil uygulama üzerinden yürütülür. Kurumsal iş birlikleri için WeeComi iletişim formu kullanılabilir.`,
      },
      en: {
        title: "CriptoSwaps: introduction to fan tokens and digital asset trading",
        summary:
          "Turkey-based digital asset platform with 24/7 trading, mobile apps and WeeGold Blockchain infrastructure.",
        highlight: "Security-focused trading experience for fan token listings and exclusive token projects.",
        content: `CriptoSwaps is a Turkey-based digital asset and cryptocurrency platform within the WeeComi International ecosystem. User security is prioritized with 24/7 trading infrastructure, iOS and Android mobile apps and two-factor authentication.

Fan tokens are digital assets issued for sports clubs and associations; they can be traded on CriptoSwaps. Exclusive token projects can be hosted on WeeGold Blockchain infrastructure.

The platform provides training and support services with 24/7 contact via phone and email. Crypto asset trading can involve significant risk; users should do their own research and not treat content as investment advice.

Account opening, asset transfers and trading run through the web or mobile app. Use the WeeComi contact form for corporate partnerships.`,
      },
    },
  },
  {
    id: 10,
    slug: "alisveriskapida-consumer-experience",
    category: "weesale",
    isFeatured: false,
    author: "WeeComi",
    publishedAt: "2026-01-05",
    coverImageUrl: "/images/news/alisveriskapida-consumer-experience.png",
    authorImageUrl: null,
    locales: {
      tr: {
        title: "Alışveriş Kapıda: tüketici odaklı e-ticaret deneyimi",
        summary:
          "Kazan-kazan kampanyaları, mobil uyumlu alışveriş akışı ve hızlı ürün keşfi WeeComi ticaret katmanında.",
        highlight: "Satıcı vitrinlerini tüketici dostu keşif ve teslimat senaryolarıyla buluşturur.",
        content: `Alışveriş Kapıda, WeeComi International'ın tüketiciye dönük e-ticaret deneyimidir. Ürün keşfi, kampanya fırsatları ve mobil uyumlu sipariş akışı kullanıcıları satıcılara bağlar. WeeSale satıcı operasyon katmanıyla birlikte WeeComi ticaret stratejisinin iki yüzünü oluşturur.

Kullanıcılar kategori ve vitrinler üzerinden gezinir; kampanya ve kazan-kazan senaryoları alışveriş kararını destekler. Kapıda teslimat ve hızlı keşif odaklı arayüz günlük alışveriş rutinine uyum sağlamayı hedefler.

Markalar Alışveriş Kapıda üzerinden tüketici görünürlüğü kazanırken operasyonlarını WeeSale veya WeeKobi panellerinden yönetebilir. Çok kanallı perakende ekipleri için bu ayrım net sorumluluk alanları sunar.

Satıcı ve marka ortaklıkları için WeeComi iletişim formu üzerinden başvuru yapılabilir. Kampanya dönemlerinde stok, lojistik ve müşteri destek kapasitesi önceden planlanmalıdır.`,
      },
      en: {
        title: "Alışveriş Kapıda: consumer-focused ecommerce experience",
        summary:
          "Win-win campaigns, mobile-ready shopping flows and fast product discovery in the WeeComi commerce layer.",
        highlight: "Connects seller storefronts with consumer-friendly discovery and delivery scenarios.",
        content: `Alışveriş Kapıda is WeeComi International's consumer-facing ecommerce experience. Product discovery, campaign offers and mobile-ready order flows connect users with sellers. Together with the WeeSale seller operations layer, it forms both sides of WeeComi's commerce strategy.

Users browse categories and showcases; campaign and win-win scenarios support purchase decisions. A delivery-focused interface and fast discovery aim to fit everyday shopping routines.

Brands gain consumer visibility on Alışveriş Kapıda while managing operations from WeeSale or WeeKobi panels. For omnichannel retail teams, this split offers clear ownership areas.

Seller and brand partnerships can apply through the WeeComi contact form. During campaign periods, stock, logistics and support capacity should be planned in advance.`,
      },
    },
  },
];

export function getFallbackNews(locale = "tr") {
  const lang = locale === "en" ? "en" : "tr";
  return rawArticles.map(({ locales, ...rest }) => {
    const copy = locales[lang] || locales.tr;
    return {
      ...rest,
      title: copy.title,
      summary: copy.summary,
      highlight: copy.highlight,
      content: copy.content,
    };
  });
}

/** Default TR list for backward compatibility */
export const fallbackNews = getFallbackNews("tr");
