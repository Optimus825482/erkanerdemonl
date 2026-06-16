import type { Metadata } from "next";
import { JetBrains_Mono, Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParticlesBackground from "@/components/ParticlesBackground";
import RevealOnScroll from "@/components/RevealOnScroll";
import CustomCursor from "@/components/CustomCursor";
import { Toaster } from "react-hot-toast";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://erkanerdem.online"),
  title: "Erkan Erdem — Fullstack Developer & Veteriner Hekim",
  description:
    "Erkan Erdem — Fullstack Developer & Veteriner Hekim. Web geliştirme, yapay zeka, müzik prodüksiyonu.",
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
    title: "Erkan Erdem — Fullstack Developer & Veteriner Hekim",
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
      className={`${geist.variable} ${jetbrains.variable}`}
    >
      <body className="antialiased font-display bg-background text-foreground">
        {/* Subtle particles */}
        <ParticlesBackground />

        {/* Scanlines — very subtle */}
        <div className="scanlines" aria-hidden="true" />

        {/* Reveal observer */}
        <RevealOnScroll />

        {/* Custom cursor */}
        <CustomCursor />

        {/* Toast */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#0a0a0a",
              color: "#fafaf9",
              border: "1px solid #0a0a0a",
            },
          }}
        />

        <Navbar />

        <main className="min-h-screen relative z-10">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
