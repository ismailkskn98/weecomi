/** Extended product page content. Falls back to `tr` then `en`. */
const details = {
  weenetwork: {
    tr: {
      longDescription:
        "WeeNetwork, WeeComi ekosisteminin dijital iş kimliği katmanıdır. Menü, kartvizit ve katalog çözümlerini aynı çatı altında sunarak işletmelerin müşteriyle buluşma noktalarını modernleştirir.",
      audience: ["Restoran ve cafe zincirleri", "Kurumsal satış ekipleri", "Perakende markaları", "Ajanslar ve franchise yapılar"],
      howItWorks: [
        { title: "Hesap oluşturun", text: "WeeNetwork üzerinden işletme profilinizi tanımlayın." },
        { title: "Ürünü seçin", text: "WeeMenu, WeeCard veya WeeCatalog ile ihtiyacınıza uygun deneyimi açın." },
        { title: "Paylaşın ve yönetin", text: "QR, link veya NFC ile paylaşın; içerikleri tek panelden güncelleyin." },
      ],
      faqs: [
        { q: "WeeNetwork tek başına bir ürün mü?", a: "WeeNetwork, WeeComi ekosistemindeki dijital kimlik ürünlerini bir araya getiren platform katmanıdır." },
        { q: "Ayrı ayrı ürün kullanabilir miyim?", a: "Evet. WeeMenu, WeeCard ve WeeCatalog ihtiyaçlarınıza göre bağımsız kullanılabilir." },
      ],
    },
    en: {
      longDescription:
        "WeeNetwork is the digital business identity layer of the WeeComi ecosystem. It brings menu, card and catalog experiences under one roof.",
      audience: ["Restaurant groups", "Corporate sales teams", "Retail brands", "Agencies and franchises"],
      howItWorks: [
        { title: "Create an account", text: "Define your business profile on WeeNetwork." },
        { title: "Choose a product", text: "Open WeeMenu, WeeCard or WeeCatalog for your use case." },
        { title: "Share and manage", text: "Share via QR, link or NFC and update content from one panel." },
      ],
      faqs: [
        { q: "Is WeeNetwork a standalone product?", a: "It is the platform layer that connects WeeComi’s digital identity products." },
        { q: "Can I use products separately?", a: "Yes. WeeMenu, WeeCard and WeeCatalog can be used independently." },
      ],
    },
  },
  weemenu: {
    tr: {
      longDescription:
        "WeeMenu, restoran ve hizmet işletmelerinin basılı menüye bağlı kalmadan ürün, fiyat ve operasyonu yönetmesini sağlar. QR erişim, çoklu dil, tema özelleştirme ve anlık güncelleme aynı panelde birleşir. Masa siparişi, garson çağırma, mutfak ve kurye rolleri WebSocket ile anlık takip edilir; ödeme modülü ayrıdır.",
      audience: ["Restoranlar ve cafeler", "Oteller ve restoran zincirleri", "Cafe & quick service markaları", "Catering işletmeleri"],
      howItWorks: [
        { title: "Menüyü oluşturun", text: "Kategoriler, ürünler, fiyatlar ve görselleri panelden ekleyin." },
        { title: "QR ile yayınlayın", text: "Masa veya giriş QR kodlarıyla misafirlerinize açın." },
        { title: "Operasyonu yönetin", text: "Mutfak, garson ve kurye rollerini anlık olarak takip edin." },
      ],
      faqs: [
        { q: "Uygulama indirmem gerekir mi?", a: "Hayır. Misafirler QR ile tarayıcı üzerinden menüye ulaşır." },
        { q: "Fiyatları anında güncelleyebilir miyim?", a: "Evet. Panelden yapılan değişiklikler yeniden baskıya gerek kalmadan yansır." },
        { q: "Ödeme alınabiliyor mu?", a: "Operasyon ve sipariş takibi vardır; ödeme entegrasyonu ürün kapsamına göre ayrıca değerlendirilir." },
      ],
    },
    en: {
      longDescription:
        "WeeMenu helps restaurants manage products, prices and operations without reprinting menus. QR access, multilingual support, themes and realtime kitchen/waiter/courier roles live in one panel.",
      audience: ["Restaurants and cafes", "Hotels and restaurant chains", "QSR brands", "Catering businesses"],
      howItWorks: [
        { title: "Build the menu", text: "Add categories, products, prices and images." },
        { title: "Publish with QR", text: "Share table or entrance QR codes with guests." },
        { title: "Run operations", text: "Track kitchen, waiter and courier roles in realtime." },
      ],
      faqs: [
        { q: "Do guests need an app?", a: "No. Guests open the menu in the browser via QR." },
        { q: "Can I update prices instantly?", a: "Yes. Panel updates appear without reprinting." },
        { q: "Does it include payments?", a: "Order and operations tracking are included; payments depend on the selected setup." },
      ],
    },
  },
  weecard: {
    tr: {
      longDescription:
        "WeeCard, profesyonel iletişim bilgilerini QR ve NFC ile paylaşılabilir tek bir dijital kartta toplar. Sosyal bağlantılar, iletişim alanları, tema seçenekleri ve görüntülenme analizi ile marka kimliğini güncel tutar.",
      audience: ["Satış ve iş geliştirme ekipleri", "Girişimciler", "Ajanslar", "Kurumsal markalar"],
      howItWorks: [
        { title: "Kartınızı oluşturun", text: "Profil, iletişim ve bağlantı alanlarını doldurun." },
        { title: "Temayı seçin", text: "Markanıza uygun görünümü belirleyin." },
        { title: "QR veya NFC ile paylaşın", text: "Kartı anında paylaşın ve etkileşimi takip edin." },
      ],
      faqs: [
        { q: "NFC zorunlu mu?", a: "Hayır. QR ve link paylaşımı da yeterlidir; NFC opsiyonel bir katmandır." },
        { q: "Bilgileri sonradan değiştirebilir miyim?", a: "Evet. Paylaşılan kart içeriği panelden güncellenebilir." },
      ],
    },
    en: {
      longDescription:
        "WeeCard unifies professional contact details into one QR and NFC ready digital card with themes, social links and view analytics.",
      audience: ["Sales teams", "Founders", "Agencies", "Corporate brands"],
      howItWorks: [
        { title: "Create your card", text: "Fill profile, contact and link fields." },
        { title: "Pick a theme", text: "Match the look to your brand." },
        { title: "Share via QR or NFC", text: "Share instantly and track engagement." },
      ],
      faqs: [
        { q: "Is NFC required?", a: "No. QR and link sharing work without NFC." },
        { q: "Can I update details later?", a: "Yes. Shared card content can be updated from the panel." },
      ],
    },
  },
  weecatalog: {
    tr: {
      longDescription:
        "WeeCatalog, ürünlerinizi modern ve paylaşılabilir bir dijital katalog deneyimiyle sunmak için geliştirilmektedir. WeeComi ekosisteminin ürün vitrin katmanı olarak konumlanır.",
      audience: ["Üreticiler", "Toptancılar", "Perakende markaları", "Showroom işletmeleri"],
      howItWorks: [
        { title: "Katalog yapısını kurun", text: "Ürün gruplarını ve vitrin düzenini tanımlayın." },
        { title: "Ürünleri ekleyin", text: "Görseller, açıklamalar ve bağlantıları yükleyin." },
        { title: "Bağlantıyla paylaşın", text: "Katalog linkini müşterilerinizle paylaşın." },
      ],
      faqs: [
        { q: "Ne zaman kullanılabilir olacak?", a: "WeeCatalog şu anda geliştirme aşamasındadır. Duyurular WeeComi haberleri üzerinden paylaşılır." },
      ],
    },
    en: {
      longDescription:
        "WeeCatalog is being built to present products through a modern shareable digital catalog experience within the WeeComi ecosystem.",
      audience: ["Manufacturers", "Wholesalers", "Retail brands", "Showrooms"],
      howItWorks: [
        { title: "Set catalog structure", text: "Define product groups and layout." },
        { title: "Add products", text: "Upload images, descriptions and links." },
        { title: "Share the link", text: "Send the catalog URL to customers." },
      ],
      faqs: [
        { q: "When will it launch?", a: "WeeCatalog is currently in development. Updates will be shared in WeeComi news." },
      ],
    },
  },
  weekobi: {
    tr: {
      longDescription:
        "WeeKobi, KOBİ’lerin mağaza, ürün, sipariş ve operasyon süreçlerini tek panelden daha düzenli yönetmesine yardımcı olur. Merkezi yönetim ve raporlama altyapısı ile günlük operasyonu sadeleştirir.",
      audience: ["KOBİ sahipleri", "Çok şubeli işletmeler", "Operasyon yöneticileri", "Perakende ekipleri"],
      howItWorks: [
        { title: "Mağazayı tanımlayın", text: "Şube ve ürün yapınızı panele taşıyın." },
        { title: "Operasyonu izleyin", text: "Sipariş ve süreçleri merkezi olarak takip edin." },
        { title: "Raporlarla karar verin", text: "Raporlama altyapısıyla görünürlük kazanın." },
      ],
      faqs: [
        { q: "Tek mağaza için uygun mu?", a: "Evet. Tek şube veya çok şubeli yapılar için kullanılabilir." },
        { q: "Diğer WeeComi ürünleriyle ilişkisi nedir?", a: "WeeKobi, WeeComi ekosisteminin işletme yönetim katmanıdır ve diğer ürünlerle birlikte konumlanır." },
      ],
    },
    en: {
      longDescription:
        "WeeKobi helps SMEs manage stores, products, orders and operations from one panel with clearer reporting and daily oversight.",
      audience: ["SME owners", "Multi-branch businesses", "Operations managers", "Retail teams"],
      howItWorks: [
        { title: "Define your store", text: "Move branch and product structure into the panel." },
        { title: "Track operations", text: "Follow orders and processes centrally." },
        { title: "Decide with reports", text: "Gain visibility through reporting." },
      ],
      faqs: [
        { q: "Does it work for one store?", a: "Yes. It supports single and multi-branch setups." },
        { q: "How does it fit WeeComi?", a: "WeeKobi is the business operations layer of the WeeComi ecosystem." },
      ],
    },
  },
  weesale: {
    tr: {
      longDescription:
        "WeeSale, satıcılarla müşterileri buluşturan ve ürün keşfini kolaylaştıran WeeComi e-ticaret katmanıdır. Online mağaza, kampanya ve satıcı çözümleriyle dijital satış deneyimini destekler.",
      audience: ["Online satıcılar", "Marka mağazaları", "Pazar yeri girişimleri", "Dijital ticaret ekipleri"],
      howItWorks: [
        { title: "Mağazanızı açın", text: "Satıcı profili ve ürün vitrininizi oluşturun." },
        { title: "Ürünleri keşfettirin", text: "Keşif ve kampanya araçlarıyla görünürlüğü artırın." },
        { title: "Satışı yönetin", text: "Sipariş ve satış süreçlerini dijital olarak takip edin." },
      ],
      faqs: [
        { q: "Alışveriş Kapıda ile farkı nedir?", a: "WeeSale satıcı odaklı ticaret platformu katmanıyken Alışveriş Kapıda tüketici alışveriş deneyimine odaklanır. İkisi de WeeComi ekosistemindedir." },
      ],
    },
    en: {
      longDescription:
        "WeeSale is WeeComi’s commerce layer that connects sellers and buyers with discovery, campaigns and seller tools.",
      audience: ["Online sellers", "Brand stores", "Marketplace startups", "Digital commerce teams"],
      howItWorks: [
        { title: "Open your store", text: "Create seller profile and product showcase." },
        { title: "Improve discovery", text: "Use discovery and campaign tools." },
        { title: "Manage sales", text: "Track order and sales flows digitally." },
      ],
      faqs: [
        { q: "How is it different from Alışveriş Kapıda?", a: "WeeSale focuses on seller commerce tools; Alışveriş Kapıda focuses on the shopper experience. Both belong to WeeComi." },
      ],
    },
  },
  alisveriskapida: {
    tr: {
      longDescription:
        "Alışveriş Kapıda, WeeComi ekosisteminin tüketiciye dönük e-ticaret deneyimidir. Ürün keşfi, kampanya fırsatları ve mobil uyumlu alışveriş akışıyla kullanıcıları satıcılara bağlar.",
      audience: ["Online alışveriş yapan kullanıcılar", "Kampanya odaklı markalar", "Yerel ve ulusal satıcılar"],
      howItWorks: [
        { title: "Ürünleri keşfedin", text: "Kategoriler ve vitrinler üzerinden gezinin." },
        { title: "Fırsatları değerlendirin", text: "Kampanya ve kazan-kazan senaryolarını inceleyin." },
        { title: "Alışverişi tamamlayın", text: "Mobil uyumlu akışla sipariş sürecini sürdürün." },
      ],
      faqs: [
        { q: "WeeSale ile birlikte mi çalışır?", a: "Evet. İkisi de WeeComi ticaret katmanının parçasıdır ve farklı kullanıcı dokunuşlarına hizmet eder." },
      ],
    },
    en: {
      longDescription:
        "Alışveriş Kapıda is WeeComi’s consumer-facing commerce experience with discovery, campaigns and mobile shopping flows.",
      audience: ["Online shoppers", "Campaign-driven brands", "Local and national sellers"],
      howItWorks: [
        { title: "Discover products", text: "Browse categories and showcases." },
        { title: "Explore offers", text: "Review campaigns and win-win scenarios." },
        { title: "Complete shopping", text: "Continue the order flow on mobile." },
      ],
      faqs: [
        { q: "Does it work with WeeSale?", a: "Yes. Both are commerce layers of the WeeComi ecosystem with different touchpoints." },
      ],
    },
  },
  weecomibot: {
    tr: {
      longDescription:
        "WeeComi Bot; strateji oluşturma, yapay zekâ sinyalleri, backtest, paper trading ve risk yönetimini tek panelde birleştiren algoritmik işlem platformudur. Amaç, süreçleri daha kontrollü yönetmektir. Yatırım tavsiyesi vermez ve kazanç garantisi sunmaz.",
      audience: ["Algoritmik işlem meraklıları", "Strateji geliştiriciler", "Risk süreçlerini panelden izlemek isteyen kullanıcılar"],
      howItWorks: [
        { title: "Strateji tanımlayın", text: "No-code kurallar veya indikatör kombinasyonlarıyla strateji oluşturun." },
        { title: "Backtest ve paper trading", text: "Tarihsel ve sanal ortamda süreci test edin." },
        { title: "Risk ile izleyin", text: "Sinyal, risk ve portföy kontrollerini panelden takip edin." },
      ],
      faqs: [
        { q: "Kazanç garantisi var mı?", a: "Hayır. Sunulan bilgiler yatırım tavsiyesi değildir. Finansal piyasalardaki işlemler risk içerir." },
        { q: "Paper trading nedir?", a: "Canlı piyasa verisiyle sanal işlem yaparak stratejiyi riske girmeden test etme modudur." },
      ],
    },
    en: {
      longDescription:
        "WeeComi Bot combines strategy building, AI signals, backtesting, paper trading and risk controls in one panel. It does not provide investment advice or profit guarantees.",
      audience: ["Algorithmic trading users", "Strategy builders", "Users who want clearer risk oversight"],
      howItWorks: [
        { title: "Define a strategy", text: "Build rules with no-code or indicator combinations." },
        { title: "Backtest and paper trade", text: "Test in historical and virtual environments." },
        { title: "Monitor with risk controls", text: "Follow signals, risk and portfolio checks in one panel." },
      ],
      faqs: [
        { q: "Is profit guaranteed?", a: "No. Information is not investment advice. Trading involves risk." },
        { q: "What is paper trading?", a: "A virtual mode to test strategies with live market data without real capital risk." },
      ],
    },
  },
  weecoins: {
    tr: {
      longDescription:
        "WeeCoins, WeeComi ürün ve hizmetlerinde kullanım senaryoları için geliştirilen dijital varlık katmanıdır. Transfer, ödeme altyapısı ve platform entegrasyonlarına odaklanır. Fiyat artışı veya gelir garantisi vaadi içermez.",
      audience: ["WeeComi ekosistemi kullanıcıları", "Platform entegrasyonu arayan ekipler", "Dijital varlık altyapısı inceleyen işletmeler"],
      howItWorks: [
        { title: "Ekosistem kullanımını anlayın", text: "WeeComi ürünlerindeki kullanım senaryolarını inceleyin." },
        { title: "Transfer ve ödeme akışları", text: "Dijital transfer ve ödeme altyapısı senaryolarını değerlendirin." },
        { title: "Entegrasyonu planlayın", text: "Platform ve cüzdan uyumluluğunu ihtiyaca göre ele alın." },
      ],
      faqs: [
        { q: "Yatırım getirisi vaat ediyor mu?", a: "Hayır. WeeCoins bir değer artışı veya gelir garantisi ürünü olarak sunulmaz." },
        { q: "WeeCoins Premium ile farkı nedir?", a: "Premium katman, ekosistem içinde genişletilmiş kullanım senaryolarına odaklanır." },
      ],
    },
    en: {
      longDescription:
        "WeeCoins is the digital asset layer designed for transfer, payment and in-ecosystem usage across WeeComi products. It does not promise price appreciation or income.",
      audience: ["WeeComi ecosystem users", "Teams evaluating integrations", "Businesses reviewing digital asset rails"],
      howItWorks: [
        { title: "Understand ecosystem usage", text: "Review usage scenarios across WeeComi products." },
        { title: "Transfer and payment flows", text: "Evaluate digital transfer and payment infrastructure." },
        { title: "Plan integration", text: "Assess platform and wallet compatibility." },
      ],
      faqs: [
        { q: "Does it promise returns?", a: "No. WeeCoins is not presented with price growth or income guarantees." },
        { q: "How does Premium differ?", a: "Premium focuses on extended usage scenarios within the ecosystem." },
      ],
    },
  },
  weecoinspremium: {
    tr: {
      longDescription:
        "WeeCoins Premium, WeeCoins ekosisteminde genişletilmiş kullanım senaryoları sunan premium katmandır. WeeComi ürün ailesinin parçasıdır; yatırım getirisi veya değer artışı vaadi içermez.",
      audience: ["Genişletilmiş ekosistem kullanımı isteyen kullanıcılar", "Premium erişim ihtiyacı olan ekipler"],
      howItWorks: [
        { title: "Premium erişimi inceleyin", text: "Kapsamı ve kullanım senaryolarını değerlendirin." },
        { title: "Ekosistem bağlantısını kurun", text: "WeeComi ürünleriyle olan ilişkiyi netleştirin." },
        { title: "Yönetim araçlarını kullanın", text: "Dijital varlık yönetimine dair süreçleri takip edin." },
      ],
      faqs: [
        { q: "Gelir garantisi var mı?", a: "Hayır. Premium katman gelir veya değer artışı garantisi sunmaz." },
      ],
    },
    en: {
      longDescription:
        "WeeCoins Premium is an extended-usage layer within the WeeCoins ecosystem. It does not promise investment returns or price growth.",
      audience: ["Users needing extended ecosystem access", "Teams evaluating premium usage"],
      howItWorks: [
        { title: "Review premium access", text: "Evaluate scope and usage scenarios." },
        { title: "Connect to the ecosystem", text: "Clarify relationships with WeeComi products." },
        { title: "Use management tools", text: "Follow digital asset management processes." },
      ],
      faqs: [
        { q: "Is income guaranteed?", a: "No. The premium layer does not guarantee income or appreciation." },
      ],
    },
  },
  weezard: {
    tr: {
      longDescription:
        "WeeZard, WeeCoins ekosistemine dahil eğlence ve kazanç odaklı bir oyun platformudur. Kazı Kazan, Mayın Tarlası, Jackpot, Miner, Çarkıfelek ve WeeCandy gibi oyunlarla kullanıcılar eğlenirken WCP biriktirebilir; referans sistemiyle topluluk büyümesine katkı sağlar.",
      audience: ["Oyun ve eğlence odaklı kullanıcılar", "WeeCoins ekosistemine katılmak isteyenler", "Pasif birikim senaryoları arayan kullanıcılar", "Referans ile büyüyen topluluklar"],
      howItWorks: [
        { title: "Uygulamayı açın", text: "WeeZard hub üzerinden hesabınıza giriş yapın." },
        { title: "Oyunu seçin", text: "Kazı Kazan, Jackpot, Miner veya WeeCandy gibi oyunlardan birini başlatın." },
        { title: "Ekosistemde kullanın", text: "Kazandığınız WCP’yi WeeCoins ekosistemindeki diğer ürünlerde değerlendirin." },
      ],
      faqs: [
        { q: "WeeZard nedir?", a: "WeeZard, WeeCoins ekosisteminin bir parçası olan oyun ve eğlence platformudur." },
        { q: "Hangi oyunlar var?", a: "Kazı Kazan, Mayın Tarlası, Jackpot, Miner, Çarkıfelek, Cryptonaut, WeeCandy, doğum haritası ve burç yorumu gibi deneyimler sunulur." },
        { q: "Kazanç garantisi var mı?", a: "Hayır. WeeZard yatırım tavsiyesi vermez ve kazanç garantisi sunmaz." },
        { q: "Mobil uygulaması var mı?", a: "Evet. WeeZard Google Play üzerinden indirilebilir." },
      ],
    },
    en: {
      longDescription:
        "WeeZard is a play-and-earn game platform inside the WeeCoins ecosystem. Scratch, Mines, Jackpot, Miner, Wheel and WeeCandy let users play while collecting WCP, with referrals helping the community grow.",
      audience: ["Play-and-earn users", "People joining the WeeCoins ecosystem", "Users exploring passive accumulation scenarios", "Communities growing via referrals"],
      howItWorks: [
        { title: "Open the app", text: "Sign in through the WeeZard hub." },
        { title: "Pick a game", text: "Start Scratch, Jackpot, Miner, WeeCandy or another hub experience." },
        { title: "Use in the ecosystem", text: "Put earned WCP to work across other WeeCoins products." },
      ],
      faqs: [
        { q: "What is WeeZard?", a: "WeeZard is a game and entertainment platform that is part of the WeeCoins ecosystem." },
        { q: "Which games are available?", a: "Scratch, Mines, Jackpot, Miner, Wheel, Cryptonaut, WeeCandy, birth chart and horoscope experiences are offered." },
        { q: "Is income guaranteed?", a: "No. WeeZard does not provide investment advice or profit guarantees." },
        { q: "Is there a mobile app?", a: "Yes. WeeZard is available on Google Play." },
      ],
    },
  },
  criptoswaps: {
    tr: {
      longDescription:
        "CriptoSwaps, Türkiye merkezli dijital varlık ve kripto para borsasıdır. 7/24 işlem altyapısı, mobil uygulama desteği, fan token listelemeleri ve WeeGold Blockchain tabanlı özel proje yapısıyla dijital varlık ekosisteminde yenilikçi bir işlem deneyimi sunar.",
      audience: ["Kripto varlık yatırımcıları", "Fan token işlemleriyle ilgilenen kullanıcılar", "Mobil işlem deneyimi arayan kullanıcılar", "7/24 destek bekleyen dijital varlık toplulukları"],
      howItWorks: [
        { title: "Hesabınızı oluşturun", text: "Web veya mobil uygulama üzerinden kayıt olarak hesabınızı aktive edin." },
        { title: "Varlık aktarın veya bakiye ekleyin", text: "İşlem yapmak için hesabınızı fonlayın ve güvenlik adımlarını tamamlayın." },
        { title: "7/24 işlem yapın", text: "Kripto varlıklar, özel token projeleri ve fan token işlemlerini gün boyu yönetin." },
      ],
      faqs: [
        { q: "CriptoSwaps nedir?", a: "CriptoSwaps, yenilikçi çözümler sunan Türkiye merkezli bir dijital varlık ve kripto para borsasıdır." },
        { q: "CriptoSwaps platformu güvenli mi?", a: "Evet. Platform iki faktörlü kimlik doğrulama ve gelişmiş güvenlik sistemleri ile korunur." },
        { q: "CriptoSwaps üzerinde 7/24 işlem yapabilir miyim?", a: "Evet. Yatırım ve alım-satım işlemleri 7/24 gerçekleştirilebilir." },
        { q: "Mobil uygulaması var mı?", a: "Evet. CriptoSwaps’ın hem iOS hem de Android cihazlar için mobil uygulaması bulunur." },
        { q: "Hangi destek kanalları mevcut?", a: "Telefon ve e-posta üzerinden 7/24 destek sunulur. Teknik destek için de e-posta ile iletişime geçilebilir." },
        { q: "Hangi teknolojiyi kullanıyor?", a: "Platform, özel token projelerini barındırmak için WeeGold Blockchain altyapısını kullanır." },
        { q: "Eğitim ve destek sağlanıyor mu?", a: "Evet. Platformda 7/24 eğitim ve destek hizmeti sunulur." },
        { q: "Fan token nedir ve CriptoSwaps’ta nasıl yer alır?", a: "Fan token’lar, spor kulüpleri ve dernekler için özel olarak ihraç edilen dijital varlıklardır ve CriptoSwaps üzerinde alınıp satılabilir." },
      ],
    },
    en: {
      longDescription:
        "CriptoSwaps is a Turkey-based digital asset and cryptocurrency exchange. It offers 24/7 trading, mobile apps, fan token listings and an innovative trading experience powered by WeeGold Blockchain infrastructure for exclusive token projects.",
      audience: ["Digital asset investors", "Users interested in fan token trading", "Mobile-first traders", "Communities expecting 24/7 support"],
      howItWorks: [
        { title: "Create your account", text: "Sign up on the web or mobile app and activate your account." },
        { title: "Fund your balance", text: "Add funds and complete the security steps before trading." },
        { title: "Trade around the clock", text: "Manage crypto assets, exclusive token projects and fan tokens 24/7." },
      ],
      faqs: [
        { q: "What is CriptoSwaps?", a: "CriptoSwaps is a Turkey-based digital asset and cryptocurrency exchange offering innovative solutions." },
        { q: "Is the CriptoSwaps platform secure?", a: "Yes. The platform is protected by two-factor authentication and advanced security systems." },
        { q: "Can I trade 24/7 on CriptoSwaps?", a: "Yes. You can perform investment and trading operations 24/7 on CriptoSwaps." },
        { q: "Do you have a mobile app?", a: "Yes. CriptoSwaps has a mobile application available for both iOS and Android devices." },
        { q: "What support channels are available on CriptoSwaps?", a: "24/7 support is available via phone and email. You can also contact technical support by email." },
        { q: "What technology does CriptoSwaps use?", a: "The platform uses the WeeGold Blockchain infrastructure to host exclusive token projects." },
        { q: "Is training and support provided on the platform?", a: "Yes. Training and support services are available 24/7." },
        { q: "What are fan tokens and how are they featured on CriptoSwaps?", a: "Fan tokens are digital assets specially issued for sports clubs and associations, and they can be traded on CriptoSwaps." },
      ],
    },
  },
};

export function getProductDetails(productId, locale = "tr") {
  const entry = details[productId];
  if (!entry) return null;
  return entry[locale] || entry.tr || entry.en || null;
}
