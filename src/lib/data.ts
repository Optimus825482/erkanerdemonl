// Projeler verisi
export const projeler = [
  {
    id: "veteriner-klinik",
    slug: "proje1-veteriner",
    title: "Veteriner Klinik Yönetim Sistemi",
    description:
      "Veteriner klinikleri için hasta takibi, randevu yönetimi ve faturalandırma sistemi.",
    image: "/images/klnikrprogram.png",
    tags: ["Python", "Django", "PostgreSQL"],
    color: "cyan" as const,
  },
  {
    id: "muzik-analiz",
    slug: "proje2-muzik",
    title: "Müzik Analiz ve Görselleştirme Aracı",
    description:
      "Ses dosyalarını analiz ederek tempo, melodi gibi özelliklerini çıkaran ve görselleştiren bir araç.",
    image: "/images/müzikanaliz.png",
    tags: ["Python", "Librosa", "Matplotlib"],
    color: "pink" as const,
  },
  {
    id: "yapay-zeka-goruntu",
    slug: "proje3-yapayzeka",
    title: "Yapay Zeka Destekli Görüntü İşleme Uygulaması",
    description:
      "Belirli nesneleri tanıyabilen ve görüntüler üzerinde çeşitli işlemler yapabilen yapay zeka uygulaması.",
    image: "/images/yapayvet.png",
    tags: ["Python", "TensorFlow", "OpenCV"],
    color: "cyan" as const,
  },
  {
    id: "portfolio-sitesi",
    slug: "proje4-portfolio",
    title: "Web Tabanlı Portfolio Sitesi",
    description:
      "Kişisel projeleri ve çalışmaları sergilemek için modern ve responsive web sitesi.",
    image: "/images/H4.png",
    tags: ["React", "TailwindCSS", "Vite"],
    color: "pink" as const,
  },
];

// Yazılar verisi
export const yazilar = [
  {
    id: "yapay-zeka-veteriner",
    slug: "yazi1-yapayzeka-veteriner",
    title: "Yapay Zeka ve Veteriner Hekimlikte Kullanımı",
    description:
      "Veteriner hekimlikte yapay zeka uygulamaları ve gelecek perspektifi...",
    image: "/images/blog/yapzekvh.png",
    date: "2024-02-20",
    category: "Yapay Zeka",
    color: "pink" as const,
  },
  {
    id: "modern-web-gelistirme",
    slug: "yazi2-web-gelistirme",
    title: "Modern Web Geliştirme Teknikleri",
    description:
      "React, TypeScript ve TailwindCSS ile modern web uygulamaları geliştirme...",
    image: "/images/blog/modweb.png",
    date: "2024-02-18",
    category: "Yazılım Geliştirme",
    color: "cyan" as const,
  },
  {
    id: "muzik-produksiyon",
    slug: "yazi3-muzik-produksiyon",
    title: "Müzik Prodüksiyon Temelleri",
    description:
      "Elektronik müzik prodüksiyonuna başlangıç için temel kavramlar, ekipmanlar ve yazılımlar hakkında bilgiler...",
    image: "/images/blog/muz.png",
    date: "2024-02-15",
    category: "Müzik",
    color: "pink" as const,
  },
];

// Videolar verisi
export const videolar = [
  {
    id: "react-web-gelistirme",
    slug: "video1-react",
    title: "React ile Modern Web Geliştirme",
    description: "Temel React kavramları ve modern web uygulamaları geliştirme",
    image: "/images/H1.png",
    duration: "15:34",
    date: "2024-02-20",
    category: "Yazılım Eğitimi",
    color: "cyan" as const,
  },
  {
    id: "fl-studio-beat",
    slug: "video2-flstudio",
    title: "FL Studio ile Beat Making",
    description: "Elektronik müzik prodüksiyonu temelleri",
    image: "/images/H2.png",
    duration: "22:15",
    date: "2024-02-18",
    category: "Müzik",
    color: "pink" as const,
  },
  {
    id: "veteriner-otomasyon",
    slug: "video3-vetsys",
    title: "Veteriner Kliniği Otomasyon Sistemi",
    description: "Veteriner klinikleri için yazılım geliştirme süreci",
    image: "/images/H3.png",
    duration: "18:45",
    date: "2024-02-15",
    category: "Veteriner Hekimlik",
    color: "cyan" as const,
  },
];

// Kategoriler
export const yaziKategorileri = [
  "Tümü",
  "Yazılım Geliştirme",
  "Yapay Zeka",
  "Veteriner Hekimlik",
  "Müzik",
  "Teknoloji",
];

export const videoKategorileri = [
  "Tümü",
  "Yazılım Eğitimi",
  "Müzik",
  "Yapay Zeka",
  "Veteriner Hekimlik",
];

// Yetenekler
export const yetenekler = [
  "Veteriner Hekim 🔬",
  "Full Stack Developer 💻",
  "AI & ML Enthusiast 🤖",
  "Music Producer 🎵",
  "Astrology Explorer ⭐",
];

// Teknolojiler
export const teknolojiler = [
  "⚡ Full Stack Web Development",
  "🤖 AI & Machine Learning",
  "👁️ Computer Vision",
  "🎵 Digital Audio & Music Production",
  "🔧 Problem Solving & Innovation",
];

// İlgi Alanları
export const ilgiAlanlari = [
  "🎓 Sürekli Öğrenme",
  "🎶 Müzik Prodüksiyonu",
  "🔬 Veteriner Hekimlik",
  "💻 Modern Teknolojiler",
  "🌟 Yenilikçi Projeler",
];
