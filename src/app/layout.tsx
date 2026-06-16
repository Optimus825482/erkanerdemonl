import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RevealOnScroll from "@/components/RevealOnScroll";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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
      className={`${inter.variable} ${jetbrains.variable}`}
    >
      <body className="bg-white text-black font-sans antialiased">
        <RevealOnScroll />
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#0a0a0a",
              color: "#fafafa",
              border: "1px solid #0a0a0a",
              borderRadius: 0,
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
            },
          }}
        />
        <Navbar />
        <main className="relative min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
