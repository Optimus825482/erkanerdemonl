import { getPublishedArticles } from "@/lib/queries";
import type { Metadata } from "next";
import ContentCard from "@/components/ContentCard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Yazılar — Erkan Erdem",
  description: "Teknoloji, yazılım, yapay zeka ve daha birçok konuda yazılarım.",
};

function formatDate(d: Date | string): string {
  return new Intl.DateTimeFormat("tr-TR", {
    year: "numeric",
    month: "short",
  }).format(new Date(d));
}

function getTags(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  return raw.filter((t): t is string => typeof t === "string");
}

interface BentoItem {
  id: number;
  className: string;
}

function getBentoLayout(count: number): BentoItem[] {
  const items: BentoItem[] = [];
  for (let i = 0; i < count; i++) {
    if (i === 0) {
      items.push({ id: i, className: "sm:col-span-2 sm:row-span-2" });
    } else if (i === 1 || i === 2) {
      items.push({ id: i, className: "sm:col-span-2 lg:col-span-1" });
    } else {
      items.push({ id: i, className: "" });
    }
  }
  return items;
}

export default async function YazilarPage() {
  const articles = await getPublishedArticles();
  const layout = getBentoLayout(articles.length);

  return (
    <div className="min-h-screen">
      <section className="section">
        <div className="container">
          {/* Başlık */}
          <div className="reveal mb-12 sm:mb-20">
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                02
              </span>
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                /
              </span>
              <span className="font-mono text-xs uppercase tracking-widest">
                Articles
              </span>
            </div>
            <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter mb-8 max-w-4xl">
              Yazılar.
            </h1>
            <p className="font-display text-xl sm:text-2xl text-muted-foreground leading-relaxed max-w-3xl">
              Teknoloji, yazılım geliştirme, yapay zeka ve daha birçok konuda
              deneyimlerim ve düşüncelerim.
            </p>
          </div>

          {/* Bento Grid */}
          {articles.length === 0 ? (
            <div className="reveal border border-foreground/15 p-12 text-center">
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
                Empty
              </div>
              <p className="text-muted-foreground">
                Henüz yayınlanmış yazı bulunmuyor.
              </p>
            </div>
          ) : (
            <div
              className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
              style={{ gridAutoRows: "minmax(220px, auto)" }}
            >
              {articles.map((a, i) => {
                const item = layout[i];
                if (!item) return null;
                const isFeatured = i === 0;
                return (
                  <div key={a.id} className={item.className}>
                    <ContentCard
                      index={`${String(i + 1).padStart(2, "0")}`}
                      category={a.category}
                      title={a.title}
                      description={isFeatured ? a.content.slice(0, 240) + "..." : a.excerpt}
                      date={formatDate(a.publishedAt)}
                      tags={getTags(a.tags)}
                      thumbnail={a.thumbnailImage}
                      href={`/yazilar/${a.slug}`}
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
