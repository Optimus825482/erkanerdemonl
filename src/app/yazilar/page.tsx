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

export default async function YazilarPage() {
  const articles = await getPublishedArticles();

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

          {/* Grid */}
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
            <div className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {articles.map((a, i) => (
                <ContentCard
                  key={a.id}
                  index={`${String(i + 1).padStart(2, "0")}`}
                  category={a.category}
                  title={a.title}
                  description={a.excerpt}
                  date={formatDate(a.publishedAt)}
                  tags={getTags(a.tags)}
                  thumbnail={a.thumbnailImage}
                  href={`/yazilar/${a.slug}`}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
