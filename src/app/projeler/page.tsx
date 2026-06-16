import { getPublishedProjects } from "@/lib/queries";
import type { Metadata } from "next";
import ContentCard from "@/components/ContentCard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Projeler — Erkan Erdem",
  description: "Geliştirdiğim projeler ve teknoloji ile hayata geçirdiğim çözümler.",
};

function formatDate(d: Date | string): string {
  return new Intl.DateTimeFormat("tr-TR", {
    year: "numeric",
    month: "short",
  }).format(new Date(d));
}

function getTechs(tech: unknown): string[] {
  if (!Array.isArray(tech)) return [];
  return tech
    .map((t) => {
      if (typeof t === "string") return t;
      if (t && typeof t === "object" && "name" in t && typeof t.name === "string")
        return t.name;
      return null;
    })
    .filter((s): s is string => s !== null);
}

export default async function ProjelerPage() {
  const projects = await getPublishedProjects();

  return (
    <div className="min-h-screen">
      <section className="section">
        <div className="container">
          {/* Başlık */}
          <div className="reveal mb-12 sm:mb-20">
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                01
              </span>
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                /
              </span>
              <span className="font-mono text-xs uppercase tracking-widest">
                Projects
              </span>
            </div>
            <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter mb-8 max-w-4xl">
              Projeler.
            </h1>
            <p className="font-display text-xl sm:text-2xl text-muted-foreground leading-relaxed max-w-3xl">
              Geliştirdiğim projeler ve teknoloji ile hayata geçirdiğim çözümler.
            </p>
          </div>

          {/* Grid */}
          {projects.length === 0 ? (
            <div className="reveal border border-foreground/15 p-12 text-center">
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
                Empty
              </div>
              <p className="text-muted-foreground">
                Henüz yayınlanmış proje bulunmuyor.
              </p>
            </div>
          ) : (
            <div className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {projects.map((p, i) => (
                <ContentCard
                  key={p.id}
                  index={`${String(i + 1).padStart(2, "0")}`}
                  category={p.category}
                  title={p.title}
                  description={p.description}
                  date={formatDate(p.publishedAt)}
                  thumbnail={p.thumbnailImage}
                  tags={getTechs(p.technologies)}
                  href={`/projeler/${p.slug}`}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
