import Image from "next/image";
import { getAbout, getPublishedProjects } from "@/lib/queries";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hakkımda - Erkan Erdem",
  description: "Veteriner Hekim, Full Stack Developer, AI Enthusiast",
};

interface InfoCardProps {
  title: string;
  description: string;
  color: "cyan" | "pink" | "green";
}

function InfoCard({ title, description, color }: InfoCardProps) {
  const colorClass =
    color === "cyan"
      ? "text-cyan-400"
      : color === "pink"
        ? "text-fuchsia-400"
        : "text-green-400";

  return (
    <div className="glass p-6 card-hover hud-corner">
      <h3 className={`font-orbitron text-xl mb-3 ${colorClass}`}>{title}</h3>
      <p className="font-tech text-gray-300 leading-relaxed">{description}</p>
    </div>
  );
}

export default async function HakkimdaPage() {
  const [about, projects] = await Promise.all([
    getAbout(),
    getPublishedProjects(),
  ]);

  const technologies = Array.isArray(about?.technologies)
    ? (about!.technologies as unknown[]).filter(
        (t): t is string => typeof t === "string",
      )
    : [];

  const interests = Array.isArray(about?.interests)
    ? (about!.interests as unknown[]).filter(
        (t): t is string => typeof t === "string",
      )
    : [];

  const tags = Array.isArray(about?.tags)
    ? (about!.tags as unknown[]).filter(
        (t): t is string => typeof t === "string",
      )
    : [];

  return (
    <div className="min-h-screen">
      <section className="section section-content">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Sayfa Başlığı */}
          <div className="reveal mb-8 sm:mb-12">
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <span className="font-tech text-xs text-cyan-400 shrink-0">00.</span>
              <h1 className="font-orbitron text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-wider">
                HAKKIMDA
              </h1>
              <div className="flex-1 hud-line" />
              <span className="font-tech text-xs text-gray-500 hidden sm:inline">
                ABOUT/
              </span>
            </div>
            <p className="font-tech text-gray-200 text-base sm:text-lg md:text-xl leading-relaxed">
              {about?.shortBio ??
                "Veteriner hekimlik mesleğimi icra ederken, teknoloji ve yazılım dünyasında Full Stack Developer olarak projeler geliştiriyorum."}
            </p>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 sm:gap-3 mt-4 sm:mt-6">
                {tags.map((tag) => (
                  <span key={tag} className="tag tag-cyan font-tech text-xs sm:text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Profil Bölümü */}
          <div className="reveal glass p-5 sm:p-6 md:p-8 mb-10 sm:mb-12 hud-corner">
            <div className="flex gap-4 sm:gap-6 md:gap-8 items-start flex-col md:flex-row">
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-lg overflow-hidden flex-shrink-0 border-2 border-cyan-400/50 shadow-[0_0_20px_rgba(0,245,255,0.3)]">
                <Image
                  src={about?.profileImage ?? "/images/erkanerdem.png"}
                  alt="Erkan Erdem"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="space-y-3 sm:space-y-4 flex-1">
                <h2 className="font-orbitron text-xl sm:text-2xl text-cyan-400 tracking-wider">
                  {about?.title ?? "Fullstack Developer & Veteriner Hekim"}
                </h2>
                <p className="font-tech text-gray-200 leading-relaxed text-sm sm:text-base">
                  {about?.shortBio ??
                    "Veteriner hekimlik mesleğimi teknoloji ile birleştirerek özgün çözümler üretiyorum."}
                </p>
                {about?.location && (
                  <p className="font-tech text-sm text-gray-400">
                    📍 {about.location}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Üç Kart */}
          <div className="reveal-stagger grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 mb-10 sm:mb-12">
            <InfoCard
              title="Meslek & Teknoloji"
              description="Veteriner hekimlik mesleğimi teknoloji ile birleştirerek, hem klasik tedavi yöntemlerini uygularken hem de modern teknolojik çözümler geliştiriyorum."
              color="pink"
            />
            <InfoCard
              title="Yazılım & Yapay Zeka"
              description="Full Stack Developer olarak modern web teknolojilerini kullanırken, yapay zeka ve makine öğrenmesi alanlarındaki gelişmeleri yakından takip ediyorum."
              color="cyan"
            />
            <InfoCard
              title="Hobiler & Tutkular"
              description="Elektronik müzik prodüksiyonu ve astroloji, hayatıma farklı perspektifler katarken yaratıcılığımı besliyor."
              color="green"
            />
          </div>

          {/* Yaklaşım + Felsefe */}
          {(about?.yaklasim || about?.felsefe) && (
            <div className="reveal-stagger grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-10 sm:mb-12">
              {about?.yaklasim && (
                <div className="glass p-6 sm:p-8 hud-corner">
                  <h3 className="font-orbitron text-lg sm:text-xl mb-3 text-cyan-400">
                    Yaklaşımım
                  </h3>
                  <p className="font-tech text-gray-200 leading-relaxed text-sm sm:text-base">
                    {about.yaklasim}
                  </p>
                </div>
              )}
              {about?.felsefe && (
                <div className="glass p-6 sm:p-8 hud-corner">
                  <h3 className="font-orbitron text-lg sm:text-xl mb-3 text-fuchsia-400">
                    Felsefem
                  </h3>
                  <p className="font-tech text-gray-200 leading-relaxed text-sm sm:text-base">
                    {about.felsefe}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Teknolojiler & İlgi Alanları */}
          {(technologies.length > 0 || interests.length > 0) && (
            <div className="reveal-stagger grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {technologies.length > 0 && (
                <div className="glass p-6 sm:p-8 hud-corner">
                  <h3 className="font-orbitron text-lg sm:text-xl mb-4 text-cyan-400">
                    Teknolojiler
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {technologies.map((tech) => (
                      <span key={tech} className="tag tag-cyan text-xs sm:text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {interests.length > 0 && (
                <div className="glass p-6 sm:p-8 hud-corner">
                  <h3 className="font-orbitron text-lg sm:text-xl mb-4 text-fuchsia-400">
                    İlgi Alanları
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {interests.map((i) => (
                      <span key={i} className="tag tag-magenta text-xs sm:text-sm">
                        {i}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Projeler Sayfasına CTA */}
          {projects.length > 0 && (
            <div className="reveal mt-10 sm:mt-12 text-center">
              <Link href="/projeler" className="cyber-btn cyber-btn-magenta">
                PROJELERİ GÖR ({projects.length})
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
