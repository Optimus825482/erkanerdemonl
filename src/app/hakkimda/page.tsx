import Image from "next/image";
import { getAbout, getPublishedProjects } from "@/lib/queries";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hakkımda — Erkan Erdem",
  description: "Veteriner Hekim, Full Stack Developer, AI Enthusiast",
};

interface InfoCardProps {
  index: string;
  title: string;
  description: string;
}

function InfoCard({ index, title, description }: InfoCardProps) {
  return (
    <div className="border border-foreground/10 p-6 sm:p-8 bg-background hover:border-foreground transition-colors duration-300">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-foreground/10">
        <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          {index}
        </span>
        <span className="font-mono text-xs text-muted-foreground">/info</span>
      </div>
      <h3 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight mb-4">
        {title}
      </h3>
      <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
        {description}
      </p>
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
    <div className="min-h-screen bg-background">
      {/* HERO — Editorial style */}
      <section className="section">
        <div className="container">
          <div className="reveal mb-12 sm:mb-20">
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                01
              </span>
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                /
              </span>
              <span className="font-mono text-xs uppercase tracking-widest">
                About
              </span>
            </div>
            <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter mb-8 max-w-5xl">
              {about?.fullName ?? "Erkan Erdem"}
            </h1>
            <p className="font-display text-xl sm:text-2xl md:text-3xl text-muted-foreground leading-relaxed max-w-3xl text-balance">
              {about?.shortBio ??
                "Veteriner hekimlik mesleğimi icra ederken, teknoloji ve yazılım dünyasında Full Stack Developer olarak projeler geliştiriyorum."}
            </p>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-8">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-xs px-3 py-1.5 border border-foreground/20 hover:border-foreground hover:bg-foreground hover:text-background transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* PROFILE — Two column */}
      <section className="section-tight">
        <div className="container">
          <div className="reveal grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
            <div className="md:col-span-5">
              <div className="relative aspect-square w-full border border-foreground overflow-hidden">
                <Image
                  src={about?.profileImage ?? "/images/erkanerdem.png"}
                  alt="Erkan Erdem"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {about?.location && (
                <div className="mt-4 flex items-center gap-2 font-mono text-xs text-muted-foreground">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                  {about.location}
                </div>
              )}
            </div>
            <div className="md:col-span-7 space-y-8">
              <div>
                <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3">
                  Ünvan / Title
                </h2>
                <p className="font-display text-2xl sm:text-3xl font-medium">
                  {about?.title ?? "Fullstack Developer & Veteriner Hekim"}
                </p>
              </div>
              {about?.yaklasim && (
                <div>
                  <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3">
                    Yaklaşım / Approach
                  </h2>
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    {about.yaklasim}
                  </p>
                </div>
              )}
              {about?.felsefe && (
                <div>
                  <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3">
                    Felsefe / Philosophy
                  </h2>
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    {about.felsefe}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* THREE CARDS — editorial grid */}
      <section className="section">
        <div className="container">
          <div className="reveal mb-12">
            <div className="flex items-baseline gap-3 mb-4">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                02
              </span>
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                /
              </span>
              <span className="font-mono text-xs uppercase tracking-widest">
                Pillars
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tighter max-w-2xl">
              Üç temel uzmanlık.
            </h2>
          </div>

          <div className="reveal-stagger grid grid-cols-1 md:grid-cols-3 gap-6">
            <InfoCard
              index="02.1"
              title="Meslek & Teknoloji"
              description="Veteriner hekimlik mesleğimi teknoloji ile birleştirerek, hem klasik tedavi yöntemlerini uygularken hem de modern teknolojik çözümler geliştiriyorum."
            />
            <InfoCard
              index="02.2"
              title="Yazılım & Yapay Zeka"
              description="Full Stack Developer olarak modern web teknolojilerini kullanırken, yapay zeka ve makine öğrenmesi alanlarındaki gelişmeleri yakından takip ediyorum."
            />
            <InfoCard
              index="02.3"
              title="Hobiler & Tutkular"
              description="Elektronik müzik prodüksiyonu ve astroloji, hayatıma farklı perspektifler katarken yaratıcılığımı besliyor."
            />
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      {(technologies.length > 0 || interests.length > 0) && (
        <section className="section-tight">
          <div className="container">
            <div className="reveal grid grid-cols-1 md:grid-cols-2 gap-12">
              {technologies.length > 0 && (
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-6">
                    Teknolojiler / Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {technologies.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-sm px-3 py-1.5 border border-foreground/15 hover:border-foreground hover:bg-foreground hover:text-background transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {interests.length > 0 && (
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-6">
                    İlgi Alanları / Interests
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {interests.map((i) => (
                      <span
                        key={i}
                        className="font-mono text-sm px-3 py-1.5 border border-foreground/15 hover:border-foreground hover:bg-foreground hover:text-background transition-colors"
                      >
                        {i}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      {projects.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="reveal border border-foreground p-8 sm:p-12 md:p-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground block mb-2">
                  {projects.length} proje / {projects.length} projects
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight">
                  Çalışmalarımı görmek ister misin?
                </h3>
              </div>
              <Link
                href="/projeler"
                className="font-mono text-sm px-6 py-3 bg-foreground text-background hover:bg-[var(--accent)] hover:text-white transition-colors"
              >
                Projeleri Gör →
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
