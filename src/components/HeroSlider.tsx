"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import TiltCard from "./TiltCard";

// Sıralı slider verileri - yazı ve görsel eşleşmeli
const slides = [
  { title: "Veteriner Hekim", image: "/images/H1.png" },
  { title: "Full Stack Developer", image: "/images/H2.png" },
  { title: "Yazılım Geliştirme", image: "/images/H3.png" },
  { title: "Machine Learning", image: "/images/H4.png" },
  { title: "Yapay Zeka", image: "/images/H5.png" },
  { title: "Music (Re)Mix", image: "/images/H6.png" },
  { title: "Astrology", image: "/images/H7.png" },
];

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const currentSlide = slides[currentIndex];
  const typingSpeed = 80;
  const deletingSpeed = 40;
  const pauseDuration = 2000;

  // TypeWriter efekti - yazı ve görsel senkronize
  useEffect(() => {
    const currentWord = currentSlide.title;

    if (isPaused) {
      const pauseTimeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseDuration);
      return () => clearTimeout(pauseTimeout);
    }

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          // Yazma modu
          if (displayText.length < currentWord.length) {
            setDisplayText(currentWord.slice(0, displayText.length + 1));
          } else {
            // Kelime tamamlandı, bekle
            setIsPaused(true);
          }
        } else {
          // Silme modu
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1));
          } else {
            // Silme tamamlandı, sonraki slide'a geç
            setIsDeleting(false);
            setCurrentIndex((prev) => (prev + 1) % slides.length);
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, isPaused, currentSlide.title]);

  return (
    <div className="flex flex-col lg:flex-row gap-12 justify-center items-center min-h-[80vh]">
      {/* Sol - Animasyonlu Görsel */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full lg:w-1/2"
      >
        <TiltCard className="perspective-1000">
          <div className="cyber-frame relative w-full h-[450px] lg:h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotateY: 15 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Image
                  src={currentSlide.image}
                  alt={currentSlide.title}
                  width={400}
                  height={400}
                  className="max-w-[calc(100%-3rem)] max-h-[calc(100%-3rem)] object-contain drop-shadow-[0_0_30px_rgba(0,255,255,0.3)]"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {/* Slider Göstergeleri */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDisplayText("");
                    setIsDeleting(false);
                    setIsPaused(false);
                    setCurrentIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "w-8 bg-[#0ff]" : "bg-gray-600"
                  }`}
                  aria-label={`Slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </TiltCard>
      </motion.div>

      {/* Sağ - İçerik */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full lg:w-1/2 space-y-8"
      >
        {/* Başlık */}
        <div className="text-center lg:text-left">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-[#ff2b9d] text-lg mb-2"
          >
            Merhaba, Ben
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="cyber-heading text-5xl lg:text-6xl font-bold neon-text mb-4"
          >
            Erkan ERDEM
          </motion.h1>

          {/* TypeWriter - Senkronize */}
          <div className="h-12">
            <span className="cyber-heading text-2xl lg:text-3xl bg-gradient-to-r from-[#0ff] to-[#ff2b9d] bg-clip-text text-transparent">
              {displayText}
            </span>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="inline-block w-[3px] h-[1em] bg-[#0ff] ml-1 align-middle"
            />
          </div>
        </div>

        {/* Açıklama */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-gray-400 text-lg leading-relaxed"
        >
          Veteriner hekimlik, yazılım geliştirme ve yapay zeka alanlarında
          tutkuyla çalışan, müzik prodüksiyonu ile yaratıcılığını besleyen çok
          yönlü bir profesyonel.
        </motion.p>

        {/* Navigasyon Kartları */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          <NavCard href="/projeler" title="Projeler" icon="🚀" color="cyan" />
          <NavCard href="/yazilar" title="Yazılar" icon="✍️" color="pink" />
          <NavCard href="/videolar" title="Videolar" icon="🎬" color="cyan" />
        </motion.div>

        {/* CTA Butonları */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="flex flex-wrap gap-4 justify-center lg:justify-start"
        >
          <Link
            href="/hakkimda"
            className="px-8 py-3 bg-gradient-to-r from-[#0ff] to-[#00cccc] text-black font-semibold rounded-lg shadow-[0_0_20px_rgba(0,255,255,0.3)] transition-all"
          >
            Hakkımda
          </Link>
          <Link
            href="/hakkimda#iletisim"
            className="px-8 py-3 border border-[#ff2b9d] text-[#ff2b9d] font-semibold rounded-lg transition-all"
          >
            İletişim
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

// Navigasyon Kartı
interface NavCardProps {
  href: string;
  title: string;
  icon: string;
  color: "cyan" | "pink";
}

function NavCard({ href, title, icon, color }: NavCardProps) {
  const borderColor =
    color === "cyan" ? "border-[#0ff]/30" : "border-[#ff2b9d]/30";
  const textColor = color === "cyan" ? "text-[#0ff]" : "text-[#ff2b9d]";

  return (
    <Link href={href}>
      <motion.div
        className={`cyber-glass-light p-4 rounded-xl border ${borderColor} text-center cursor-pointer`}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-2xl mb-2 block">{icon}</span>
        <span className={`cyber-heading font-semibold ${textColor}`}>
          {title}
        </span>
      </motion.div>
    </Link>
  );
}
