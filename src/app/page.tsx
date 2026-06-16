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

  const featured = projects[0];

  return (
    <>
      {/* HERO + BENTO GRID */}
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

          {/* BENTO GRID — 6 cell, asymmetric */}
          <div className="reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-5">
            {/* 01: HERO CELL — col-span-2 row-span-2 */}
            <div className="lg:col-span-4 lg:row-span-2 border border-foreground/15 p-8 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
                  [01] — Hakkımda
                </div>
                <h1 className="font-display text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold tracking-tighter mb-6 leading-[0.95]">
                  {about?.fullName ?? "Erkan Erdem"}
                </h1>
                <div className="h-px w-20 bg-foreground my-6" />
                <p className="font-display text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl">
                  {about?.shortBio ??
                    "Veteriner hekimlik mesleğimi icra ederken, teknoloji ve yazılım dünyasında Full Stack Developer olarak projeler geliştiriyorum."}
                </p>
              </div>

              <div className="space-y-2 mt-8">
                {heroTitles.slice(0, 3).map((title, i) => (
                  <p
                    key={i}
                    className="font-mono text-sm sm:text-base text-muted-foreground"
                  >
                    <span className="text-[var(--accent)] mr-3">→</span>
                    {title}
                  </p>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-8">
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

            {/* 02: METRICS — col-span-2 */}
            <div className="lg:col-span-2 border border-foreground/15 p-6 flex flex-col">
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-4">
                [02] — Metrics
              </div>
              <div className="grid grid-cols-2 gap-3 flex-1">
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

            {/* 03: FEATURED PROJECT — col-span-2 */}
            {featured && (
              <Link
                href={`/projeler/${featured.slug}`}
                className="lg:col-span-2 group border border-foreground/15 hover:border-foreground p-6 transition-colors flex flex-col"
              >
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-foreground/10">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    [03] — Featured
                  </span>
                  <span className="font-mono text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                    ↗
                  </span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-semibold tracking-tight mb-3 group-hover:text-[var(--accent)] transition-colors">
                  {featured.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4 flex-1">
                  {featured.description}
                </p>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-foreground/10">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--accent)]">
                    {featured.category}
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground">
                    Featured →
                  </span>
                </div>
              </Link>
            )}

            {/* 04: SYSTEM STATUS — col-span-3 */}
            <div className="lg:col-span-3 border border-foreground/15 p-6">
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-4">
                [04] — System
              </div>
              <SystemStatus />
            </div>

            {/* 05: CONTACT CTA — col-span-3 */}
            <div className="lg:col-span-3 border border-foreground/15 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
                  [05] — Get in touch
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-semibold tracking-tight">
                  Birlikte çalışalım.
                </h3>
                <p className="text-sm text-muted-foreground mt-2 max-w-md">
                  Projeler, iş birliği veya sadece merhaba — bana ulaşın.
                </p>
              </div>
              <Link
                href="/iletisim"
                className="font-mono text-xs uppercase tracking-widest px-6 py-3 bg-foreground text-background hover:bg-[var(--accent)] transition-colors whitespace-nowrap"
              >
                İletişim →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS PREVIEW */}
      {projects.length > 1 && (
        <section className="section border-t border-foreground/10">
          <div className="container">
            <div className="reveal mb-12 sm:mb-16 flex items-baseline gap-3">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                [06]
              </span>
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                /
              </span>
              <span className="font-mono text-xs uppercase tracking-widest">
                Recent
              </span>
            </div>

            <div className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {projects.slice(1, 7).map((p) => (
                <Link
                  key={p.id}
                  href={`/projeler/${p.slug}`}
                  className="group border border-foreground/15 hover:border-foreground p-5 sm:p-6 transition-colors flex flex-col"
                >
                  <div className="flex items-center justify-between mb-3 pb-3 border-b border-foreground/10">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      {p.category}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                      ↗
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-semibold tracking-tight mb-2 group-hover:text-[var(--accent)] transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                    {p.description}
                  </p>
                </Link>
              ))}
            </div>

            <div className="reveal text-center mt-12">
              <Link
                href="/projeler"
                className="font-mono text-xs uppercase tracking-widest px-6 py-3 border border-foreground hover:bg-foreground hover:text-background transition-colors inline-block"
              >
                Tüm Projeler →
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
