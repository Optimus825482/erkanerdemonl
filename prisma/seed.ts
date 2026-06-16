import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding erkanerdem_db...");

  // --- User (admin) ---
  const adminPassword = "518518Erkan";
  const passwordHash = await bcrypt.hash(adminPassword, 12);
  await prisma.user.upsert({
    where: { email: "admin@erkanerdem.online" },
    update: {
      username: "admin",
      passwordHash,
      isActive: true,
      mustChangePassword: false,
    },
    create: {
      username: "admin",
      email: "admin@erkanerdem.online",
      passwordHash,
      role: "ADMIN",
      isActive: true,
      mustChangePassword: false,
    },
  });
  console.log(`\n  ADMIN LOGIN:`);
  console.log(`    username: admin`);
  console.log(`    password: ${adminPassword}\n`);

  // --- About ---
  const heroTitles = [
    "Veteriner Hekim",
    "Music (Re)Mix",
    "Web Teknolojileri",
    "Yazılım Geliştirme",
    "Fullstack Developer",
    "Yapay Zeka",
    "Machine Learning",
    "Astrology",
  ];
  const heroImages = [
    "/images/H1.png",
    "/images/H2.png",
    "/images/H3.png",
    "/images/H4.png",
    "/images/H5.png",
    "/images/H6.png",
    "/images/H7.png",
    "/images/H8.png",
  ];

  await prisma.about.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      fullName: "Erkan Erdem",
      title: "Fullstack Developer & Veteriner Hekim",
      shortBio:
        "Veteriner hekimlik mesleğimi icra ederken, teknoloji ve yazılım dünyasında Full Stack Developer olarak projeler geliştiriyor, boş zamanlarımda ise müzik prodüksiyonu ve astroloji ile ilgileniyorum",
      approach:
        "Veteriner hekimlik mesleğimi teknoloji ile birleştirerek, hem gerek uzmanlık alanım olan Sürü yönetimi ve Hayvan besleme alanlarıında hemde bir çok farklı sektörler için modern teknolojik çözümler geliştiriyorum.",
      felsefe:
        "Veteriner hekimlik eğitimimden gelen analitik düşünce yapısını, teknoloji tutkumla birleştirerek özgün çözümler üretiyorum. Yapay zeka ve bilgisayarlı görü teknolojilerinin geleceğini şekillendirmeye katkıda bulunmayı hedefliyorum.",
      yaklasim:
        "Veteriner hekimlik mesleğimi teknoloji ile birleştirerek, hem gerek uzmanlık alanım olan Sürü yönetimi ve Hayvan besleme alanlarıında hemde bir çok farklı sektörler için modern teknolojik çözümler geliştiriyorum.",
      profileImage: "/images/erkanerdem.png",
      email: "info@erkanerdem.online",
      website: "https://erkanerdem.online",
      location: "Türkiye",
      socialGithub: "https://github.com/erkanerdem",
      socialLinkedin: "https://linkedin.com/in/erkanerdem",
      socialTwitter: "https://twitter.com/erkanerdem",
      socialInstagram: "https://instagram.com/erkanerdem",
      heroTitles,
      heroImages,
      tags: [
        "Veteriner Hekim 🔬",
        "Full Stack Developer 💻",
        "AI & ML Enthusiast 🤖",
        "Music Producer 🎵",
        "Astrology Explorer ⭐",
      ],
      technologies: [
        {
          category: "Full Stack Web",
          emoji: "⚡",
          color: "cyan",
          items: ["React", "Next.js", "Vue.js", "TypeScript", "Tailwind CSS", "Node.js"],
        },
        {
          category: "AI & ML",
          emoji: "🤖",
          color: "fuchsia",
          items: ["TensorFlow", "PyTorch", "Scikit-learn", "FastAPI"],
        },
        {
          category: "Computer Vision",
          emoji: "👁️",
          color: "green",
          items: ["OpenCV", "YOLO", "Image Processing"],
        },
        {
          category: "Digital Audio",
          emoji: "🎵",
          color: "yellow",
          items: ["Web Audio API", "Audio Processing", "Remix"],
        },
        {
          category: "Problem Solving",
          emoji: "🧠",
          color: "cyan",
          items: ["Analytical Thinking", "Creative Solutions", "Innovation"],
        },
        {
          category: "Data Science",
          emoji: "📊",
          color: "fuchsia",
          items: ["Pandas", "NumPy", "Data Visualization"],
        },
      ],
      interests: [
        { emoji: "🎓", title: "Sürekli Öğrenme", color: "cyan" },
        { emoji: "🎵", title: "Müzik Prodüksiyonu", color: "fuchsia" },
        { emoji: "🔬", title: "Veteriner Hekimlik", color: "green" },
        { emoji: "💻", title: "Modern Teknolojiler", color: "yellow" },
      ],
    },
  });

  // --- Projects ---
  const projects = [
    {
      slug: "veteriner-klinik-yonetim-sistemi",
      title: "Veteriner Klinik Yönetim Sistemi",
      description:
        "Veteriner klinikleri için hasta takibi, randevu yönetimi ve faturalandırma sistemi.",
      longDescription:
        "Bu proje, veteriner kliniklerinin günlük operasyonlarını kolaylaştırmak amacıyla Python ve Django framework'ü kullanılarak geliştirilmiş kapsamlı bir yönetim sistemidir. Sistem, hasta kaydı ve takibi, randevu planlama, teşhis ve tedavi geçmişi kaydı, ilaç ve stok yönetimi gibi temel fonksiyonları içerir. Kullanıcı dostu arayüzü sayesinde veteriner hekimlerin ve klinik personelinin iş akışını hızlandırmayı hedefler. PostgreSQL veritabanı ile güvenli ve ölçeklenebilir bir altyapı sunar.",
      category: "fullstack",
      technologies: ["Python", "Django", "PostgreSQL"],
      thumbnailImage: "/images/klnikrprogram.png",
      isFeatured: true,
      displayOrder: 1,
    },
    {
      slug: "muzik-analiz-gorsellestirme",
      title: "Müzik Analiz ve Görselleştirme Aracı",
      description:
        "Ses dosyalarını analiz ederek tempo, melodi gibi özelliklerini çıkaran ve görselleştiren bir araç.",
      longDescription:
        "Bu proje, ses dosyalarını derinlemesine analiz etmek ve elde edilen verileri anlamlı görsellere dönüştürmek için Python tabanlı Librosa kütüphanesi kullanılarak geliştirilmiştir. Araç, bir ses dosyasının tempo bilgisini, temel frekansını (pitch), harmonik yapısını ve melodi hatlarını çıkarabilir. Ayrıca, Matplotlib gibi kütüphanelerle bu verilerin spektrogram, mel spectrogram gibi görsel temsillerini oluşturur. Müzisyenler, ses mühendisleri veya müzik araştırmaları yapan kişiler için ses dosyaları üzerinde detaylı inceleme ve karşılaştırma imkanı sunar.",
      category: "data",
      technologies: ["Python", "Librosa", "Matplotlib"],
      thumbnailImage: "/images/muzikanaliz.png",
      isFeatured: true,
      displayOrder: 2,
    },
    {
      slug: "yapay-zeka-goruntu-isleme",
      title: "Yapay Zeka Destekli Görüntü İşleme Uygulaması",
      description:
        "Belirli nesneleri tanıyabilen ve görüntüler üzerinde çeşitli işlemler yapabilen yapay zeka uygulaması.",
      longDescription:
        "Bu uygulama, yapay zeka ve bilgisayarlı görü teknikleri kullanılarak görüntüler üzerinde çeşitli işlemler yapmayı sağlar. Python, TensorFlow ve OpenCV kütüphaneleri entegre edilerek geliştirilmiştir. Uygulama, temel nesne tanıma görevlerini yerine getirebilir, görüntülerdeki belirli desenleri algılayabilir ve görüntü segmentasyonu gibi daha karmaşık işlemleri gerçekleştirebilir. Eğitim verilerine bağlı olarak farklı senaryolara adapte edilebilir ve görüntü analizi gerektiren alanlarda (örneğin, güvenlik, sağlık veya endüstriyel kontrol) kullanılabilir.",
      category: "ai",
      technologies: ["Python", "TensorFlow", "OpenCV"],
      thumbnailImage: "/images/yapayvet.png",
      isFeatured: true,
      displayOrder: 3,
    },
    {
      slug: "web-tabanli-portfolio-sitesi",
      title: "Web Tabanlı Portfolio Sitesi",
      description:
        "Kişisel projeleri ve çalışmaları sergilemek için modern ve responsive web sitesi.",
      longDescription:
        "Bu proje, kişisel çalışmalarımı, projelerimi ve yeteneklerimi sergilemek amacıyla React, TailwindCSS ve Vite kullanılarak geliştirilmiş modern ve responsive bir web sitesidir. Sayfa geçişleri hızlıdır ve farklı cihazlarda sorunsuz bir kullanıcı deneyimi sunar. Bileşen tabanlı yapısı sayesinde kolayca yeni bölümler eklenebilir ve içerik güncellenebilir. Amacı, profesyonel bir çevrimiçi varlık oluşturmak ve potansiyel işverenler veya işbirlikçilerle projelerimi paylaşmaktır.",
      category: "web",
      technologies: ["React", "TailwindCSS", "Vite"],
      thumbnailImage: "/images/H4.png",
      isFeatured: false,
      displayOrder: 4,
    },
  ];

  for (const p of projects) {
    await prisma.project.upsert({
      where: { slug: p.slug },
      update: {},
      create: { ...p, status: "completed" },
    });
  }

  // --- Articles ---
  const articles = [
    {
      slug: "yapay-zeka-veteriner-hekimlik",
      title: "Yapay Zeka ve Veteriner Hekimlikte Kullanımı",
      excerpt:
        "Yapay zeka (YZ), veteriner hekimlik alanında teşhis, tedavi planlaması ve hasta takibi gibi birçok süreçte devrim yaratma potansiyeli taşıyor.",
      content:
        "Yapay zeka (YZ), veteriner hekimlik alanında teşhis, tedavi planlaması ve hasta takibi gibi birçok süreçte devrim yaratma potansiyeli taşıyor. Görüntü işleme teknikleri sayesinde röntgen, ultrason veya MR gibi medikal görüntülerdeki anormalliklerin tespit edilmesi kolaylaşıyor. YZ algoritmaları, belirli hastalıkların erken teşhisine yardımcı olabilir ve tedaviye yanıtı öngörebilir. Bu yazıda, veteriner hekimlikte YZ kullanımının mevcut durumu, karşılaşılan zorluklar ve gelecekteki potansiyel uygulamalar detaylı bir şekilde incelenmektedir.",
      category: "ai",
      tags: ["Yapay Zeka", "Veteriner Hekimlik", "Tıp"],
      thumbnailImage: "/images/blog/yapzekvh.png",
      publishedAt: new Date("2024-02-20"),
      readingTime: 8,
      displayOrder: 1,
      isFeatured: true,
    },
    {
      slug: "modern-web-gelistirme-teknikleri",
      title: "Modern Web Geliştirme Teknikleri",
      excerpt:
        "Günümüzde modern web uygulamaları geliştirirken hız, performans ve ölçeklenebilirlik büyük önem taşıyor.",
      content:
        "Günümüzde modern web uygulamaları geliştirirken hız, performans ve ölçeklenebilirlik büyük önem taşıyor. React gibi komponent tabanlı kütüphaneler, kullanıcı arayüzlerini dinamik ve interaktif hale getirmek için yaygın olarak kullanılıyor. TypeScript, büyük projelerde kod kalitesini artırmak ve hataları azaltmak için statik tipleme imkanı sunarken, TailwindCSS gibi utility-first CSS frameworkleri hızlı ve responsive tasarımlar oluşturmayı kolaylaştırıyor. Vite ise modern build araçlarıyla geliştirme sürecini ciddi şekilde hızlandırıyor. Bu yazıda, bu teknolojilerin modern web geliştirmedeki rolleri ve nasıl birlikte kullanılabilecekleri anlatılmaktadır.",
      category: "web",
      tags: ["React", "TypeScript", "TailwindCSS"],
      thumbnailImage: "/images/blog/modweb.png",
      publishedAt: new Date("2024-02-18"),
      readingTime: 10,
      displayOrder: 2,
    },
    {
      slug: "muzik-produksiyon-temelleri",
      title: "Müzik Prodüksiyon Temelleri",
      excerpt:
        "Elektronik müzik prodüksiyon dünyasına adım atmak isteyenler için temel kavramları anlamak önemlidir.",
      content:
        "Elektronik müzik prodüksiyon dünyasına adım atmak isteyenler için temel kavramları anlamak önemlidir. Bir Dijital Ses İşleme İstasyonu (DAW) seçimi (FL Studio, Ableton Live, Logic Pro gibi), ses kartı (audio interface), monitör hoparlörler ve MIDI klavye gibi temel ekipmanların neler olduğu ve ne işe yaradığı bu işin başlangıç noktalarıdır. Kayıt alma, MIDI programlama, temel miksaj ve mastering prensipleri gibi konular prodüksiyon sürecinin temel taşlarıdır. Bu yazı, elektronik müzik prodüksiyonuna başlarken bilmeniz gereken temel adımları ve kavramları basit bir dille açıklamaktadır.",
      category: "music",
      tags: ["Müzik", "FL Studio", "DAW"],
      thumbnailImage: "/images/blog/muz.png",
      publishedAt: new Date("2024-02-15"),
      readingTime: 7,
      displayOrder: 3,
    },
  ];

  for (const a of articles) {
    await prisma.article.upsert({
      where: { slug: a.slug },
      update: {},
      create: a,
    });
  }

  // --- Videos ---
  const videos = [
    {
      slug: "react-ile-modern-web-gelistirme",
      title: "React ile Modern Web Geliştirme",
      description:
        "Temel React kavramları ve modern web uygulamaları geliştirme.",
      longDescription:
        "Bu video serisi, modern web uygulamaları geliştirmek için popüler JavaScript kütüphanesi React'a başlangıç yapmak isteyenlere yönelik temel bir rehber niteliğindedir. Videoda, React'ın temel kavramları olan bileşenler (components), JSX kullanımı, state yönetimi ve props ile veri akışı gibi konular adım adım anlatılmaktadır. Ayrıca, functional components ve hooks kullanımı gibi güncel React pratiklerine de değinilmektedir. Web geliştirme kariyerine başlamak veya mevcut becerilerini React ile güçlendirmek isteyenler için ideal bir kaynaktır.",
      category: "Yazılım Eğitimi",
      thumbnailImage: "/images/videos/placeholder.png",
      duration: "15:34",
      publishedAt: new Date("2024-02-20"),
      displayOrder: 1,
    },
    {
      slug: "fl-studio-ile-beat-making",
      title: "FL Studio ile Beat Making",
      description: "Elektronik müzik prodüksiyonu temelleri.",
      longDescription:
        "Bu videoda, elektronik müzik prodüksiyonu için popüler bir Dijital Ses İşleme İstasyonu (DAW) olan FL Studio kullanarak nasıl beat yapılacağına dair temel adımlar gösterilmektedir. Başlangıç seviyesindekiler için uygun olan bu içerikte, davul düzenleme, melodi oluşturma, temel miksaj teknikleri ve parçayı bitirme süreci gibi konulara değinilir. FL Studio'nun arayüzü tanıtılır ve programın temel özellikleri kullanılarak basit bir beat baştan sona oluşturulur. Müzik yapmaya ilgi duyan ancak nereden başlayacağını bilmeyenler için pratik bir rehberdir.",
      category: "Müzik",
      thumbnailImage: "/images/videos/placeholder.png",
      duration: "22:15",
      publishedAt: new Date("2024-02-18"),
      displayOrder: 2,
    },
    {
      slug: "veteriner-klinigi-otomasyon-sistemi",
      title: "Veteriner Kliniği Otomasyon Sistemi",
      description: "Veteriner klinikleri için yazılım geliştirme süreci.",
      longDescription:
        "Bu videoda, veteriner klinikleri için özel olarak tasarlanmış bir otomasyon sisteminin temel özellikleri ve klinik işleyişine sağladığı faydalar anlatılmaktadır. Hasta kayıtlarının dijitalleştirilmesi, randevu yönetiminin kolaylaştırılması, aşı ve tedavi takibinin sistematik hale getirilmesi gibi konulara odaklanılır. Sistemin kullanıcı arayüzü tanıtılır ve günlük operasyonlarda zaman tasarrufu sağlayacak pratik özellikler vurgulanır. Veteriner hekimler ve klinik yöneticileri için klinik verimliliğini artırma potansiyeli olan bu tür sistemler hakkında bilgi edinmek için faydalı bir kaynaktır.",
      category: "Veteriner Hekimlik",
      thumbnailImage: "/images/videos/placeholder.png",
      duration: "18:45",
      publishedAt: new Date("2024-02-15"),
      displayOrder: 3,
    },
  ];

  for (const v of videos) {
    await prisma.video.upsert({
      where: { slug: v.slug },
      update: {},
      create: v,
    });
  }

  // --- FAQs ---
  const faqs = [
    {
      question: "Freelance çalışır mısınız?",
      answer:
        "Evet, freelance projeler için mevcutum. Web geliştirme, AI/ML projeleri ve danışmanlık hizmetleri sunuyorum.",
      colorTheme: "cyan",
      displayOrder: 1,
    },
    {
      question: "Hangi teknolojileri kullanıyorsunuz?",
      answer:
        "React, Next.js, Node.js, Python, TensorFlow, PyTorch ve daha birçok modern teknoloji ile çalışıyorum.",
      colorTheme: "fuchsia",
      displayOrder: 2,
    },
    {
      question: "Proje teslim süresi nedir?",
      answer:
        "Projenin karmaşıklığına ve kapsamına göre değişir. İletişime geçerek detaylı bilgi alabilirsiniz.",
      colorTheme: "green",
      displayOrder: 3,
    },
    {
      question: "Fiyatlandırma nasıl yapılır?",
      answer:
        "Projenin gereksinimlerine, süresine ve karmaşıklığına göre saatlik veya proje bazlı fiyatlandırma yapıyorum.",
      colorTheme: "yellow",
      displayOrder: 4,
    },
  ];

  for (const f of faqs) {
    await prisma.fAQ.upsert({
      where: { id: faqs.indexOf(f) + 1 },
      update: {},
      create: f,
    });
  }

  // --- Settings ---
  const settings = [
    { key: "site_name", value: "Erkan Erdem Portfolio", category: "general" },
    { key: "site_tagline", value: "Fullstack Developer & Veteriner Hekim", category: "general" },
    { key: "contact_email", value: "info@erkanerdem.online", category: "general" },
    { key: "social_github", value: "https://github.com/erkanerdem", category: "social" },
    { key: "social_linkedin", value: "https://linkedin.com/in/erkanerdem", category: "social" },
    { key: "social_twitter", value: "https://twitter.com/erkanerdem", category: "social" },
    { key: "social_instagram", value: "https://instagram.com/erkanerdem", category: "social" },
    { key: "maintenance_mode", value: "false", valueType: "bool", category: "general" },
  ];

  for (const s of settings) {
    await prisma.setting.upsert({
      where: { key: s.key },
      update: { value: s.value ?? null },
      create: { ...s, value: s.value ?? null },
    });
  }

  console.log("Seed complete.");
  console.log(`  Projects: ${projects.length}`);
  console.log(`  Articles: ${articles.length}`);
  console.log(`  Videos:   ${videos.length}`);
  console.log(`  FAQs:     ${faqs.length}`);
  console.log(`  Settings: ${settings.length}`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
