import type { Metadata } from "next";
import { Orbitron, Rajdhani, Share_Tech_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParticlesBackground from "@/components/ParticlesBackground";
import RevealOnScroll from "@/components/RevealOnScroll";
import CustomCursor from "@/components/CustomCursor";
import { Toaster } from "react-hot-toast";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-orbitron",
  display: "swap",
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-rajdhani",
  display: "swap",
});

const shareTechMono = Share_Tech_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-share-tech-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://erkanerdem.online"),
  title: "Erkan Erdem | Fullstack Developer & Veteriner Hekim",
  description:
    "Erkan Erdem - Fullstack Developer & Veteriner Hekim. Web geliştirme, yapay zeka ve makine öğrenimi projeleri.",
  keywords: [
    "Erkan Erdem",
    "Fullstack Developer",
    "Veteriner Hekim",
    "Web Development",
    "AI",
    "Machine Learning",
  ],
  authors: [{ name: "Erkan Erdem" }],
  openGraph: {
    title: "Erkan Erdem | Fullstack Developer & Veteriner Hekim",
    description: "Fullstack Developer & Veteriner Hekim",
    type: "website",
    locale: "tr_TR",
    url: "https://erkanerdem.online",
    siteName: "erkanerdem.online",
  },
  alternates: {
    canonical: "https://erkanerdem.online",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      suppressHydrationWarning
      className={`${orbitron.variable} ${rajdhani.variable} ${shareTechMono.variable}`}
    >
      <body className="antialiased">
        {/* Three.js + Matrix Arka Plan */}
        <ParticlesBackground />

        {/* Scanlines Efekti */}
        <div className="scanlines" aria-hidden="true" />

        {/* Reveal observer */}
        <RevealOnScroll />

        {/* Custom cursor (desktop only) */}
        <CustomCursor />

        {/* Toast Bildirimleri */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#12121a",
              color: "#e5e5e5",
              border: "1px solid rgba(0, 255, 255, 0.2)",
            },
          }}
        />

        {/* Navbar */}
        <Navbar />

        {/* Ana İçerik */}
        <main className="min-h-screen relative z-10">{children}</main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
