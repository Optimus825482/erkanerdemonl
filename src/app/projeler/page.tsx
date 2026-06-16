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

interface BentoItem {
  id: number;
  className: string;
}

/**
 * Bento grid pattern (asymmetric):
 *  - İlk item: featured 2x2 (sm+)
 *  - Sonraki ikili: wide 2x1 (md+)
 *  - Diğerleri: normal 1x1
 *  - Son item 7+ ise: full-width 4x1
 *  - Mobil: tek kolon
 */
function getBentoLayout(count: number): BentoItem[] {
  const items: BentoItem[] = [];
  for (let i = 0; i < count; i++) {
    if (i === 0) {
      items.push({ id: i, className: "sm:col-span-2 sm:row-span-2" });
    } else if (i === 1 || i === 2) {
      items.push({ id: i, className: "sm:col-span-2 lg:col-span-1" });
    } else if (i === count - 1 && count >= 7) {
      items.push({ id: i, className: "sm:col-span-2 lg:col-span-4" });
    } else {
      items.push({ id: i, className: "" });
    }
  }
  return items;
}

export default async function ProjelerPage() {
  const projects = await getPublishedProjects();
  const layout = getBentoLayout(projects.length);

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

          {/* Bento Grid */}
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
            <div
              className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
              style={{ gridAutoRows: "minmax(220px, auto)" }}
            >
              {projects.map((p, i) => {
                const item = layout[i];
                if (!item) return null;
                const isFeatured = i === 0;
                return (
                  <div key={p.id} className={item.className}>
                    <ContentCard
                      index={`${String(i + 1).padStart(2, "0")}`}
                      category={p.category}
                      title={p.title}
                      description={
                        isFeatured && p.longDescription
                          ? p.longDescription
                          : p.description
                      }
                      date={formatDate(p.publishedAt)}
                      thumbnail={p.thumbnailImage}
                      tags={getTechs(p.technologies)}
                      href={`/projeler/${p.slug}`}
                      featured={isFeatured}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
