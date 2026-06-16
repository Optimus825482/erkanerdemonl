import type { NextConfig } from "next";

const PROJECT_ROOT = process.cwd();

const nextConfig: NextConfig = {
  // Görsel optimizasyonu
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Standalone build — production image küçültme
  output: "standalone",
  // Performans optimizasyonları
  poweredByHeader: false,
  compress: true,
  // Çoklu lockfile uyarısı — proje root'unu açıkça belirt
  turbopack: {
    root: PROJECT_ROOT,
  },
};

export default nextConfig;
