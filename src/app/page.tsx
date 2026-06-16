import Link from "next/link";
import { getAbout, getPublishedProjects } from "@/lib/queries";
import SystemStatus from "@/components/SystemStatus";
import MetricsWidget from "@/components/MetricsWidget";
import TerminalBoot from "@/components/TerminalBoot";

export const dynamic = "force-dynamic";

const FALLBACK_TITLES = [
  "🔬 Veteriner Hekim",
  "💻 Fullstack Developer",
  "🤖 AI & Machine Learning Enthusiast",
];

export default async function Home() {
  const [about, projects] = await Promise.all([
    getAbout(),
    getPublishedProjects(),
  ]);

  const heroTitles =
    (about?.heroTitles as string[] | null)?.filter(
      (t): t is string => typeof t === "string" && t.length > 0,
    ) ?? FALLBACK_TITLES;

  const techStack = (about?.technologies as unknown[] | null) ?? [];
  const tags = (about?.tags as unknown[] | null) ?? [];

  return (
    <>
      {/* HERO SECTION */}
      <section className="section section-hero">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Top status bar */}
          <div className="reveal mb-6 sm:mb-8 flex items-center justify-between font-tech text-[10px] sm:text-xs text-gray-500 tracking-widest">
            <span className="hidden sm:inline">
              <span className="text-cyan-400">●</span> ONLINE
            </span>
            <span className="text-gray-600 hidden md:inline">
              // build: {new Date().toISOString().slice(0, 10)}
            </span>
            <span className="text-fuchsia-400">v1.0.0</span>
          </div>

          {/* Terminal boot — high-impact reveal */}
          <div className="reveal mb-6 sm:mb-8 glass p-4 sm:p-5 max-w-2xl mx-auto lg:mx-0">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-cyan-400/20">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
              <span className="ml-2 font-tech text-[10px] text-gray-500">
                ~/erkanerdem — boot
              </span>
            </div>
            <TerminalBoot
              lines={[
                "init identity.core",
                "loading experience.dev",
                "mounting skills.fullstack",
                "activating ai.engine",
                "ready",
              ]}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr,auto] gap-8 lg:gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="mb-6 sm:mb-8 fade-in">
                <span className="font-tech text-[10px] sm:text-xs text-cyan-400 tracking-[0.3em] pulse">
                  [ SYSTEM ONLINE ]
                </span>
              </div>

              <h1
                className="font-orbitron text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black mb-6 sm:mb-8 glitch break-words tracking-wider"
                data-text="ERKAN ERDEM"
              >
                ERKAN ERDEM
              </h1>

              <div className="hud-line max-w-xs sm:max-w-md mx-auto lg:mx-0 my-6 sm:my-8" />

              <div
                className="space-y-2 sm:space-y-3 mb-8 sm:mb-10 fade-in"
                style={{ animationDelay: "1s" }}
              >
                {heroTitles.map((title, i) => {
                  const color =
                    i === 0
                      ? "text-cyan-400"
                      : i === 1
                        ? "text-fuchsia-400"
                        : "text-emerald-400";
                  return (
                    <p
                      key={i}
                      className={`font-tech text-base sm:text-lg md:text-xl ${color}`}
                    >
                      {`> ${title}`}
                    </p>
                  );
                })}
              </div>

              <div
                className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 mt-6 sm:mt-10 fade-in"
                style={{ animationDelay: "0.4s" }}
              >
                <Link href="/hakkimda" className="cyber-btn w-full sm:w-auto">
                  HAKKIMDA
                </Link>
                <Link
                  href="/projeler"
                  className="cyber-btn cyber-btn-magenta w-full sm:w-auto"
                >
                  PROJELER
                </Link>
              </div>
            </div>

            {/* Side widget: System Status */}
            <div className="hidden lg:block">
              <SystemStatus />
            </div>
          </div>

          <div
            className="mt-14 sm:mt-20 text-center fade-in"
            style={{ animationDelay: "0.6s" }}
          >
            <span className="font-tech text-[10px] sm:text-xs text-gray-500 tracking-wider pulse">
              ↓ SCROLL TO EXPLORE
            </span>
          </div>
        </div>
      </section>

      {/* BENTO METRICS + QUICK STATS */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="reveal mb-8 sm:mb-12">
            <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <span className="font-tech text-xs text-cyan-400 shrink-0">00.</span>
              <h2 className="font-orbitron text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-wider">
                DURUM
              </h2>
              <div className="flex-1 hud-line" />
              <span className="font-tech text-xs text-gray-500 hidden sm:inline">
                SYS/STATUS
              </span>
            </div>
          </div>

          <div className="reveal-stagger grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
            <MetricsWidget
              label="PROJELER"
              value={projects.length}
              color="cyan"
              hint="yayında"
            />
            <MetricsWidget
              label="DENEYSİM"
              value={techStack.length}
              color="fuchsia"
              hint="teknoloji"
            />
            <MetricsWidget
              label="ETİKET"
              value={tags.length}
              color="green"
              hint="alan"
            />
            <MetricsWidget
              label="ÇALIŞMA"
              value="7+"
              color="yellow"
              hint="yıl deneyim"
            />
          </div>
        </div>
      </section>

      {/* BENTO GRID: 3 KART */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="reveal mb-8 sm:mb-12">
            <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <span className="font-tech text-xs text-cyan-400 shrink-0">01.</span>
              <h2 className="font-orbitron text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-wider">
                ERKAN ERDEM
              </h2>
              <div className="flex-1 hud-line" />
              <span className="font-tech text-xs text-gray-500 hidden sm:inline">
                ABOUT/
              </span>
            </div>
          </div>

          <div className="reveal-stagger grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <article className="glass p-6 sm:p-8 card-hover hud-corner">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 pulse" />
                  <span className="font-tech text-[10px] sm:text-xs text-cyan-400 tracking-widest">
                    HAKKIMDA
                  </span>
                </div>
                <span className="font-tech text-[10px] text-gray-600">01</span>
              </div>
              <h3 className="font-orbitron text-xl sm:text-2xl text-white mb-4 tracking-wider">
                KİMİM?
              </h3>
              <p className="font-tech text-gray-300 mb-6 text-sm sm:text-base leading-relaxed">
                {about?.shortBio ??
                  "Veteriner hekimlik mesleğimi icra ederken, teknoloji ve yazılım dünyasında Full Stack Developer olarak projeler geliştiriyorum."}
              </p>
              <Link href="/hakkimda" className="cyber-btn py-2.5 px-5 text-xs">
                DAHA FAZLA →
              </Link>
            </article>

            <article className="glass p-6 sm:p-8 card-hover hud-corner">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-fuchsia-400 pulse" />
                  <span className="font-tech text-[10px] sm:text-xs text-fuchsia-400 tracking-widest">
                    PROJELER
                  </span>
                </div>
                <span className="font-tech text-[10px] text-gray-600">02</span>
              </div>
              <h3 className="font-orbitron text-xl sm:text-2xl text-white mb-4 tracking-wider">
                NE YAPIYORUM?
              </h3>
              <p className="font-tech text-gray-300 mb-6 text-sm sm:text-base leading-relaxed">
                {about?.yaklasim ??
                  "Veteriner hekimlik mesleğimi teknoloji ile birleştirerek modern çözümler geliştiriyorum."}
              </p>
              <Link
                href="/projeler"
                className="cyber-btn cyber-btn-magenta py-2.5 px-5 text-xs"
              >
                PROJELERİ GÖR →
              </Link>
            </article>

            <article className="glass p-6 sm:p-8 card-hover hud-corner md:col-span-2 lg:col-span-1">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 pulse" />
                  <span className="font-tech text-[10px] sm:text-xs text-emerald-400 tracking-widest">
                    YAKLAŞIM
                  </span>
                </div>
                <span className="font-tech text-[10px] text-gray-600">03</span>
              </div>
              <h3 className="font-orbitron text-xl sm:text-2xl text-white mb-4 tracking-wider">
                YAKLAŞIM TARZIM
              </h3>
              <p className="font-tech text-gray-300 mb-6 text-sm sm:text-base leading-relaxed">
                {about?.felsefe ??
                  "Analitik düşünce yapısını teknoloji tutkumla birleştirerek özgün çözümler üretiyorum."}
              </p>
              <Link
                href="/yazilar"
                className="cyber-btn cyber-btn-green py-2.5 px-5 text-xs"
              >
                YAZILARI OKU →
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="section">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="reveal">
            <div className="glass-strong p-8 sm:p-12 md:p-16 text-center hud-corner relative overflow-hidden">
              <div className="absolute top-4 right-4 font-tech text-[10px] text-gray-600 hidden sm:block">
                ./connect.sh
              </div>
              <div className="font-orbitron text-5xl sm:text-6xl text-cyan-400 mb-4 sm:mb-6 float">
                ✦
              </div>
              <h2 className="font-orbitron text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mb-4 sm:mb-6 tracking-wider">
                İLETİŞİME GEÇİN
              </h2>
              <p className="font-tech text-gray-400 mb-8 sm:mb-10 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
                Projeler hakkında konuşmak, iş birliği yapmak veya sadece merhaba
                demek için bana ulaşabilirsiniz.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
                <Link href="/iletisim" className="cyber-btn w-full sm:w-auto">
                  İLETİŞİM →
                </Link>
                <a
                  href={`mailto:${about?.email ?? "info@erkanerdem.net"}`}
                  className="cyber-btn cyber-btn-magenta w-full sm:w-auto"
                >
                  EMAİL GÖNDER
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ÖNE ÇIKAN PROJELER */}
      {projects.length > 0 && (
        <section className="section">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="reveal mb-8 sm:mb-12">
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <span className="font-tech text-xs text-fuchsia-400 shrink-0">02.</span>
                <h2 className="font-orbitron text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-wider">
                  ÖNE ÇIKAN PROJELER
                </h2>
                <div className="flex-1 hud-line" />
                <span className="font-tech text-xs text-gray-500 hidden sm:inline">
                  PROJECTS/
                </span>
              </div>
            </div>
            <div className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {projects.slice(0, 6).map((p) => (
                <Link
                  key={p.id}
                  href={`/projeler/${p.slug}`}
                  className="glass p-5 sm:p-6 card-hover hud-corner block group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-tech text-[10px] text-cyan-400 tracking-widest">
                      {p.category.toUpperCase()}
                    </span>
                    <span className="font-tech text-[10px] text-gray-600 group-hover:text-cyan-400 transition-colors">
                      ↗
                    </span>
                  </div>
                  <h3 className="font-orbitron text-base sm:text-lg text-white mb-2 tracking-wider">
                    {p.title}
                  </h3>
                  <p className="font-tech text-gray-400 text-sm line-clamp-3 leading-relaxed">
                    {p.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
