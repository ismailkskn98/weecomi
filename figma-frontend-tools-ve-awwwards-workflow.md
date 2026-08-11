# Frontend İçin Figma Araçları ve Modern Web Tasarım Workflow'u

Bu doküman, özellikle **hazır UI/asset kullanarak hızlı tasarım üretmek**, ardından tasarımı **frontend'e taşımak** ve gerektiğinde **Awwwards tarzı daha özgün/modern arayüzlere dönüştürmek** için kullanılabilecek araçları ve çalışma yöntemlerini özetler.

---

## 1. Frontend İçin Kullanışlı 10 Figma Aracı

### 1. UIHUT — UI Kit, Illustrations, 3D Assets, Icons ⭐⭐⭐

Hazır kaynak kullanmayı seviyorsan en değerli araçlardan biri.

İçerik türleri:

- Landing page bölümleri
- Dashboard tasarımları
- Kartlar
- Navbar'lar
- Mobil UI'lar
- Illustration'lar
- Icon setleri
- Web template'leri

UIHUT, **26.000+ tasarım kaynağı** ve **6.000+ Figma web template** sunduğunu belirtiyor.

**Örnek kullanım:**  
Admin panel yapacaksan hazır dashboard parçalarını al → projene göre düzenle → frontend'e geçir.

---

### 2. html.to.design ⭐⭐⭐

Bir web sitesinin URL'sini vererek sayfayı **editable Figma layer'larına** dönüştürür.

Özellikle referans aldığın bir tasarım varsa çok kullanışlıdır.

**Örnek:**  
Beğendiğin bir pricing section → Figma'ya aktar → layout'u ve component yapısını incele → kendi tasarım diline göre yeniden tasarla.

---

### 3. Iconify ⭐⭐⭐

Frontend için en kullanışlı icon araçlarından biri.

Tek plugin üzerinden **300.000+ açık kaynak vektör ikon** kullanılabilir.

Örneğin:

- Material Icons
- Font Awesome
- Lucide benzeri setler
- Çok sayıda farklı icon library

Iconları SVG olarak Figma'ya aktarabilirsin.

---

### 4. Content Reel ⭐⭐⭐

Tasarım sırasında gerçekçi placeholder içerik üretmek için kullanılır.

Şunları otomatik doldurabilir:

- İsim
- Metin
- Avatar
- Icon
- Kullanıcı bilgileri

Özellikle şu tasarımlarda faydalıdır:

- Dashboard
- Table
- User list
- Profile card
- CRM ekranları

`John Doe` ve sürekli lorem ipsum kullanma ihtiyacını azaltır.

---

### 5. Figma Make ⭐⭐⭐

Figma'nın kendi AI tabanlı üretim aracıdır.

Örnek promptlar:

- `SaaS analytics dashboard oluştur`
- `E-commerce checkout ekranı oluştur`

Şunları üretebilir:

- Wireframe
- UI başlangıcı
- İnteraktif arayüz

Mevcut Figma frame'lerini de başlangıç noktası olarak kullanabilir.

**En iyi kullanım şekli:**  
Final tasarım olarak değil, hızlı başlangıç / fikir üretme aracı olarak kullanmak.

---

### 6. Locofy ⭐⭐

Figma tasarımını frontend koduna çevirmeye yardımcı olur.

Desteklediği çıktılar arasında:

- React
- React Native
- HTML / CSS
- Flutter
- Vue
- Angular

bulunur.

**Öneri:**  
Ürettiği kodu doğrudan production'a koymak yerine **component başlangıcı veya iskelet kodu** olarak kullan.

---

### 7. Anima ⭐⭐

Locofy ile benzer amaçta kullanılabilir.

Figma'dan şu yapılara çıktı verebilir:

- React
- Vue
- HTML / CSS
- Tailwind
- shadcn
- Next.js

Özellikle **React + Tailwind** kullanan projelerde denemeye değerdir.

---

### 8. Tokens Studio for Figma ⭐⭐

Design system ile frontend arasındaki değerleri senkron tutmak için kullanılır.

Örneğin:

```txt
color-primary
spacing-md
radius-lg
```

gibi design token'ları JSON olarak yönetebilir.

GitHub gibi sistemlerle de senkronizasyon yapılabilir.

Amaç, Figma'daki değerlerle CSS / Tailwind tarafındaki değerlerin zaman içinde birbirinden kopmasını azaltmaktır.

---

### 9. Stark ⭐⭐

Accessibility kontrolü için kullanılır.

Kontrol edebileceği alanlar arasında:

- Kontrast
- Erişilebilirlik
- Görsel okunabilirlik problemleri

bulunur.

UI tamamlandıktan sonra frontend'e geçmeden önce accessibility sorunlarını yakalamak için faydalıdır.

---

### 10. Autoflow ⭐

Ekranlar ve componentler arasındaki kullanıcı akışını göstermek için kullanılır.

Örneğin:

```txt
Login → Dashboard → Detail → Checkout
```

İki objeyi seçerek otomatik flow / bağlantı çizgileri oluşturabilir.

Frontend koduna doğrudan katkısı azdır; fakat uygulamanın ekran akışını tasarım aşamasında netleştirir.

---

## İlk Kurulması Önerilen 5 Araç

Hazır kaynak kullanımına ağırlık verilecekse öncelik:

1. **UIHUT**
2. **html.to.design**
3. **Iconify**
4. **Content Reel**
5. **Figma Make**

Bu araçlar özellikle:

> boş frame → hızlı ve kaliteli UI başlangıcı

süresini ciddi şekilde azaltır.

Frontend'e geçiş aşamasında ise:

- **Locofy / Anima**
- **Tokens Studio**

devreye alınabilir.

---

# 2. Awwwards Tarzı Modern Siteler İçin Araçlar

Tek bir plugin doğrudan “Awwwards sitesi” üretmez.

Daha iyi yöntem:

> **Hazır component + ilham kaynağı + görsel asset + texture + motion araçlarını birlikte kullanmak.**

Hazır tasarımı final olarak kullanmak yerine **ham madde** gibi düşünmek gerekir.

---

## 1. Relume Figma Kit

Modern web sitesi üretirken ilk bakılabilecek kaynaklardan biri.

İçerisinde **1.400+ responsive component** bulunur.

Örnek componentler:

- Hero
- Navbar
- Feature
- Testimonial
- Pricing
- CTA
- Footer

Ayrıca:

- Mobil varyantlar
- Color variables
- Responsive component yapıları

bulunur.

Relume Site Builder ile:

```txt
Sitemap
↓
Wireframe
↓
Figma
```

workflow'u da kurulabilir.

### Nasıl daha özgün hale getirilir?

Örneğin düz bir hero al:

- Typography'yi 64–96px seviyesine çıkar
- Görseli grid dışına taşır
- Asimetrik layout kullan
- Gradient ekle
- Hafif grain / noise ekle

Böylece klasik template görünümünden uzaklaşır.

---

## 2. Untitled UI

Özellikle şu tasarım tiplerinde güçlüdür:

- SaaS
- Startup
- Agency
- Corporate-modern web

Yaklaşık olarak:

- **1.500+ website section**
- **420+ page example**

sunuyor.

İçerik örnekleri:

- Feature sections
- Cards
- CTA
- Testimonials
- Pricing
- Hero varyasyonları

Awwwards kadar deneysel değildir; ancak **sağlam bir temel layout bulup yeniden tasarlamak** için çok kullanışlıdır.

---

## 3. Bento Grid Maker + BentoGrids

Özellikle yaratıcı kart / section tasarımlarında faydalıdır.

### Bento Grid Maker

Figma içerisinde Apple tarzı veya asimetrik **bento layout** üretmek için kullanılabilir.

### BentoGrids

Hazır bento tasarımlarını inceleyebileceğin bir referans / ilham arşividir.

Şu bölümler klasik 3 eşit kart yerine bento yapısına çevrilebilir:

- About Us
- Features
- Why Us
- Services
- Metrics
- Product highlights

Örnek:

```txt
┌──────────────────────┬───────────┐
│                      │ 12 Years  │
│   Büyük ekip görseli │ Experience│
│                      ├───────────┤
│                      │  280+     │
├──────────┬───────────┴───────────┤
│ Our      │ “We design things     │
│ Story ↗  │  people remember.”    │
└──────────┴───────────────────────┘
```

Bu yaklaşım klasik:

```txt
Fotoğraf | Hakkımızda metni
```

yerleşiminden daha modern bir sonuç verir.

---

## 4. UIHUT

UIHUT yalnızca UI kit için değil, **tasarım fikri toplamak** için de güçlüdür.

İçerisinde:

- Web template
- Cards
- Illustration
- 3D asset
- Icons
- Landing page örnekleri

bulunur.

Özellikle şu sorularda işe yarar:

> “Feature card'ı farklı nasıl tasarlayabilirim?”

Bir tasarımı birebir kullanmak yerine 10–20 farklı örneği inceleyip yeni bir kombinasyon üretmek daha iyi sonuç verir.

---

## 5. Noise & Texture

Awwwards tarzı sitelerde sık görülen görsel “polish” katmanlarından biridir.

Figma içerisinde:

- Seamless noise
- Texture
- Pattern
- Gradient

üretebilir.

Özellikle:

```txt
gradient + blur + hafif grain
```

kombinasyonu steril “Figma template” görünümünü kırmak için etkilidir.

---

## 6. Mesh Gradient / Noisy Gradients

Hero ve büyük arka planlarda kullanılabilir.

### Mesh Gradient

Özelleştirilebilir mesh gradient ve renk geçişleri üretir.

### Noisy Gradients

Gradient ve noise dokusunu birleştirir.

İyi çalışan kombinasyonlardan biri:

```txt
Dark background
+
Color glow
+
Soft blur
+
Grain
```

Özellikle teknoloji, creative agency ve modern SaaS sitelerinde kullanılabilir.

---

## 7. Lummi

Hero veya section görselleri için kullanılabilecek bir görsel kaynağıdır.

Figma plugin'i üzerinden görselleri şu kriterlere göre filtreleyebilirsin:

- Renk
- Orientation
- Size

Standart stock photo yerine daha **editorial / artistik** görüntüler seçmek tasarımın karakterini ciddi şekilde değiştirebilir.

---

## 8. Jitter

Figma'da hazırlanan tasarımlara motion katmanı eklemek için kullanılabilir.

Figma frame ve layer'ları Jitter'a aktarılabilir ve editable şekilde animasyon tasarlanabilir.

Örnek kullanım alanları:

- Text reveal
- Staggered cards
- Image mask reveal
- Logo marquee
- Section transition
- Hover hissi
- Kinetic typography

Awwwards hissinin önemli bir kısmı yalnızca statik UI'dan değil, **motion davranışından** gelir.

---

# 3. İlham ve Referans Siteleri

Tasarım üretirken sadece plugin değil, section bazlı referans siteleri de açık tutulmalı.

## Awwwards

Güncel, ödüllü ve deneysel web tasarımlarını incelemek için.

Özellikle:

- Typography
- Layout
- Interaction
- Motion
- Art direction

konularında referans alınabilir.

---

## Godly

Daha deneysel ve sıra dışı web tasarımlarını keşfetmek için.

Özellikle:

- Creative agency
- Portfolio
- Experimental landing
- Interactive website

tarafında güçlüdür.

---

## Landbook

Komple site yerine **section bazlı fikir araştırmak** için özellikle faydalıdır.

Kategoriler arasında:

- Websites
- Sections
- Motion

bulunur.

Örneğin direkt:

```txt
Hero
About
Pricing
Feature
Footer
```

gibi belirli bir alan için referans toplanabilir.

---

# 4. Önerilen Modern Web Tasarım Workflow'u

Örnek olarak modern bir AI şirketi sitesi düşünelim.

---

## Hero

Başlangıç:

**Relume** üzerinden sağlam bir layout iskeleti.

Ardından:

1. 64–96px oversized grotesk typography
2. Mesh Gradient arka plan
3. Lummi'den editorial görsel
4. Hafif Noise / Grain
5. Jitter ile text reveal veya image reveal

Sonuç:

```txt
Relume layout
+ typography
+ editorial image
+ gradient
+ texture
+ motion
```

---

## Hakkımızda

Klasik şu yapıdan kaçınılabilir:

```txt
[ Fotoğraf ] [ Hakkımızda paragrafı ]
```

Bunun yerine büyük bir section title kullanılabilir:

```txt
ABOUT / 01
```

Altına asimetrik bento grid:

```txt
┌──────────────────────┬───────────┐
│                      │ 12 Years  │
│   Büyük ekip görseli │ Experience│
│                      ├───────────┤
│                      │  280+     │
├──────────┬───────────┴───────────┤
│ Our      │ “We design things     │
│ Story ↗  │  people remember.”    │
└──────────┴───────────────────────┘
```

---

## Features / Services

Klasik üç eşit kart:

```txt
[ Card ] [ Card ] [ Card ]
```

yerine asimetrik yapı kullanılabilir:

```txt
┌─────────────────────┐ ┌─────────┐
│                     │ │ 02      │
│  01                 │ │         │
│  DIGITAL PRODUCTS   │ │ BRAND   │
│                     │ └─────────┘
│         ↗           │
└─────────────────────┘ ┌─────────┐
                        │ 03      │
┌──────────┬──────────┐ │ MOTION  │
│ metric   │ image    │ │    ↗    │
│ +147%    │          │ └─────────┘
└──────────┴──────────┘
```

Bu yaklaşım özellikle:

- Services
- Features
- Capabilities
- Case studies
- Metrics

alanlarında daha karakterli sonuç verir.

---

# 5. Temel Tasarım Prensibi

Hazır componenti **final tasarım olarak kullanma**.

Daha iyi yöntem:

- **Relume** → layout / section yapısı
- **Untitled UI** → card / UI fikirleri
- **Awwwards / Godly / Landbook** → art direction ve layout referansı
- **BentoGrids** → kart kompozisyonu
- **Lummi** → görsel
- **Mesh Gradient / Noise** → görsel polish
- **Jitter** → motion
- **Locofy / Anima** → başlangıç frontend kodu
- **Tokens Studio** → design system senkronizasyonu
- **Stark** → accessibility kontrolü

Amaç şu olmalı:

> Bir kaynaktan template alıp yalnızca renk değiştirmek yerine, birkaç farklı kaynaktan güçlü parçaları birleştirip projeye özel yeni bir tasarım dili oluşturmak.

Bu sayede hem hızlı çalışılır hem de ortaya **“hazır template aldım”** görüntüsü çıkmaz.

---

# 6. Kısa Önerilen Stack

## Hızlı UI üretimi

```txt
UIHUT
+ Relume
+ Untitled UI
+ Iconify
+ Content Reel
```

## Daha yaratıcı / Awwwards hissi

```txt
Awwwards
+ Godly
+ Landbook
+ BentoGrids
+ Mesh Gradient
+ Noise & Texture
+ Lummi
+ Jitter
```

## Frontend'e geçiş

```txt
Locofy / Anima
+ Tokens Studio
+ Stark
```

---

## Arama Yaparken Kullanılabilecek Örnek Terimler

Modern örnekler bulmak için şu terimler kullanılabilir:

```txt
editorial hero
bento feature
oversized typography
brutalist card
glass card
kinetic type
agency landing
```

Bu tür aramalar özellikle Figma Community, Awwwards, Godly, Landbook ve benzeri kaynaklarda kaliteli referans bulmayı hızlandırır.
