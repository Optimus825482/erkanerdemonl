"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { projeler } from "@/lib/data";
import TiltCard from "./TiltCard";
import { StaggerContainer, StaggerItem } from "./MotionWrapper";

export default function FeaturedProjects() {
  // İlk 3 projeyi göster
  const featuredProjects = projeler.slice(0, 3);

  return (
    <section className="py-20 bg-gradient-to-b from-transparent to-[#0c0c14]/50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Başlık */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="cyber-heading text-4xl font-bold neon-text mb-4">
            Öne Çıkan Projeler
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Geliştirdiğim en güncel ve dikkat çekici projelerden bazıları
          </p>
        </motion.div>

        {/* Proje Kartları */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((proje, index) => (
            <StaggerItem key={proje.id}>
              <TiltCard>
                <Link href={`/projeler/${proje.slug}`}>
                  <div className="cyber-glass rounded-xl overflow-hidden group">
                    {/* Görsel */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={proje.image}
                        alt={proje.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#12121a] to-transparent opacity-60" />

                      {/* Proje Numarası */}
                      <div className="absolute top-4 left-4">
                        <span className="cyber-heading text-6xl font-bold text-[#0ff]/20">
                          0{index + 1}
                        </span>
                      </div>
                    </div>

                    {/* İçerik */}
                    <div className="p-6">
                      <h3
                        className={`cyber-heading text-xl font-semibold mb-2 ${
                          proje.color === "cyan"
                            ? "text-[#0ff]"
                            : "text-[#ff2b9d]"
                        }`}
                      >
                        {proje.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                        {proje.description}
                      </p>

                      {/* Teknolojiler */}
                      <div className="flex flex-wrap gap-2">
                        {proje.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`px-2 py-1 text-xs rounded bg-[#1a1a2e] ${
                              proje.color === "cyan"
                                ? "text-[#0ff]"
                                : "text-[#ff2b9d]"
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Tümünü Gör Butonu */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/projeler"
            className="inline-flex items-center gap-2 px-8 py-3 border border-[#0ff] text-[#0ff] rounded-lg transition-all"
          >
            Tüm Projeleri Gör
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
