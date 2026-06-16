import Link from "next/link";
import { getAbout, getPublishedProjects } from "@/lib/queries";
import SystemStatus from "@/components/SystemStatus";
import MetricsWidget from "@/components/MetricsWidget";
import TerminalBoot from "@/components/TerminalBoot";

export const dynamic = "force-dynamic";

const FALLBACK_TITLES = [
  "Veteriner Hekim",
  "Fullstack Developer",
  "AI & Machine Learning",
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

  const techCount = Array.isArray(about?.technologies)
    ? (about!.technologies as unknown[]).filter(
        (t): t is string => typeof t === "string",
      ).length
    : 0;
  const tags = Array.isArray(about?.tags)
    ? (about!.tags as unknown[]).filter(
        (t): t is string => typeof t === "string",
      )
    : [];

  return (
    <>
      {/* HERO */}
      <section className="section">
        <div className="container">
          {/* Top bar */}
          <div className="reveal mb-12 sm:mb-16 flex items-center justify-between font-mono text-xs uppercase tracking-widest">
            <span className="flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 pulse" />
              <span>Online</span>
            </span>
            <span className="hidden md:inline text-muted-foreground">
              Build · {new Date().toISOString().slice(0, 10)}
            </span>
            <span className="text-muted-foreground">v1.0.0</span>
          </div>

          {/* Terminal boot */}
          <div className="reveal mb-12 sm:mb-16 max-w-2xl">
            <div className="border border-foreground/15 bg-background/50 backdrop-blur-sm p-5">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-foreground/10">
                <span className="w-2.5 h-2.5 rounded-full bg-foreground/20" />
                <span className="w-2.5 h-2.5 rounded-full bg-foreground/20" />
                <span className="w-2.5 h-2.5 rounded-full bg-foreground/20" />
                <span className="ml-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
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
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr,auto] gap-12 lg:gap-16 items-start">
            <div>
              <div className="reveal mb-8">
                <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  [01] — Hakkımda
                </span>
              </div>

              <h1 className="reveal font-display text-5xl sm:text-7xl md:text-8xl xl:text-9xl font-bold tracking-tighter mb-8 leading-[0.95]">
                {about?.fullName ?? "Erkan Erdem"}
              </h1>

              <div className="reveal h-px w-24 bg-foreground my-8" />

              <div
                className="reveal-stagger space-y-3 mb-10"
                style={{ animationDelay: "0.2s" }}
              >
                {heroTitles.slice(0, 3).map((title, i) => (
                  <p
                    key={i}
                    className="font-mono text-base sm:text-lg md:text-xl text-muted-foreground"
                  >
                    <span className="text-[var(--accent)] mr-3">→</span>
                    {title}
                  </p>
                ))}
              </div>

              <div className="reveal flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mt-8">
                <Link
                  href="/hakkimda"
                  className="font-mono text-xs uppercase tracking-widest px-6 py-3 bg-foreground text-background hover:bg-[var(--accent)] transition-colors text-center"
                >
                  Hakkımda →
                </Link>
                <Link
                  href="/projeler"
                  className="font-mono text-xs uppercase tracking-widest px-6 py-3 border border-foreground hover:bg-foreground hover:text-background transition-colors text-center"
                >
                  Projeler →
                </Link>
              </div>
            </div>

            <div className="hidden lg:block">
              <SystemStatus />
            </div>
          </div>
        </div>
      </section>

      {/* METRICS */}
      <section className="section-tight border-t border-foreground/10">
        <div className="container">
          <div className="reveal mb-10 flex items-baseline gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              [02]
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              /
            </span>
            <span className="font-mono text-xs uppercase tracking-widest">
              Metrics
            </span>
          </div>

          <div className="reveal-stagger grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <MetricsWidget
              label="Projeler"
              value={projects.length}
              hint="yayında"
            />
            <MetricsWidget
              label="Stack"
              value={techCount}
              hint="teknoloji"
            />
            <MetricsWidget
              label="Etiket"
              value={tags.length}
              hint="alan"
            />
            <MetricsWidget
              label="Deneyim"
              value="7+"
              hint="yıl"
            />
          </div>
        </div>
      </section>

      {/* BENTO */}
      <section className="section border-t border-foreground/10">
        <div className="container">
          <div className="reveal mb-12 flex items-baseline gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              [03]
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              /
            </span>
            <span className="font-mono text-xs uppercase tracking-widest">
              Areas
            </span>
          </div>

          <div className="reveal-stagger grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/hakkimda"
              className="group border border-foreground/15 hover:border-foreground p-6 sm:p-8 transition-colors"
            >
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-foreground/10">
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  03.1
                </span>
                <span className="font-mono text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                  →
                </span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight mb-3">
                Kimim?
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {about?.shortBio ??
                  "Veteriner hekimlik mesleğimi icra ederken, teknoloji ve yazılım dünyasında Full Stack Developer olarak projeler geliştiriyorum."}
              </p>
            </Link>

            <Link
              href="/projeler"
              className="group border border-foreground/15 hover:border-foreground p-6 sm:p-8 transition-colors"
            >
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-foreground/10">
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  03.2
                </span>
                <span className="font-mono text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                  →
                </span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight mb-3">
                Ne Yapıyorum?
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {about?.yaklasim ??
                  "Veteriner hekimlik mesleğimi teknoloji ile birleştirerek modern çözümler geliştiriyorum."}
              </p>
            </Link>

            <Link
              href="/yazilar"
              className="group border border-foreground/15 hover:border-foreground p-6 sm:p-8 transition-colors md:col-span-2 lg:col-span-1"
            >
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-foreground/10">
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  03.3
                </span>
                <span className="font-mono text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                  →
                </span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight mb-3">
                Nasıl Düşünüyorum?
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {about?.felsefe ??
                  "Analitik düşünce yapısını teknoloji tutkumla birleştirerek özgün çözümler üretiyorum."}
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="section">
        <div className="container">
          <div className="reveal border border-foreground p-10 sm:p-16 text-center">
            <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-6">
              [04] — Get in touch
            </div>
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tighter mb-6 leading-tight">
              Birlikte çalışalım.
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed">
              Projeler, iş birliği veya sadece merhaba — bana ulaşın.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
              <Link
                href="/iletisim"
                className="font-mono text-xs uppercase tracking-widest px-6 py-3 bg-foreground text-background hover:bg-[var(--accent)] transition-colors"
              >
                İletişim →
              </Link>
              <a
                href={`mailto:${about?.email ?? "info@erkanerdem.online"}`}
                className="font-mono text-xs uppercase tracking-widest px-6 py-3 border border-foreground hover:bg-foreground hover:text-background transition-colors"
              >
                {about?.email ?? "info@erkanerdem.online"}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      {projects.length > 0 && (
        <section className="section border-t border-foreground/10">
          <div className="container">
            <div className="reveal mb-12 flex items-baseline gap-3">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                [05]
              </span>
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                /
              </span>
              <span className="font-mono text-xs uppercase tracking-widest">
                Featured
              </span>
            </div>
            <div className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.slice(0, 6).map((p) => (
                <Link
                  key={p.id}
                  href={`/projeler/${p.slug}`}
                  className="group border border-foreground/15 hover:border-foreground p-5 sm:p-6 transition-colors block"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      {p.category}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                      ↗
                    </span>
                  </div>
                  <h3 className="font-display text-lg sm:text-xl font-semibold tracking-tight mb-2">
                    {p.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
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
