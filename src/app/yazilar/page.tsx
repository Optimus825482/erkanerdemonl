import { getPublishedArticles } from "@/lib/queries";
import type { Metadata } from "next";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Writing — Erkan Erdem",
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
    <section className="section">
      <div className="container">
        {/* Top meta */}
        <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-black/50 mb-12">
          <span>
            <span className="inline-block w-2 h-2 bg-[#e63946] mr-2 align-middle" />
            03 — Writing
          </span>
          <span>{articles.length} articles</span>
        </div>

        {/* Title */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-6 gap-y-8 mb-12">
          <div className="lg:col-span-2">
            <div className="label">Yazılar</div>
          </div>
          <div className="lg:col-span-10">
            <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[8rem] xl:text-[9rem] font-extrabold tracking-[-0.04em] leading-[0.9]">
              Writing.
            </h1>
            <p className="font-display text-xl sm:text-2xl text-black/70 leading-[1.15] max-w-3xl mt-6">
              Teknoloji, yazılım geliştirme, yapay zeka ve daha birçok konuda
              deneyimlerim ve düşüncelerim.
            </p>
          </div>
        </div>

        <div className="hairline" />

        {/* List — Swiss editorial table */}
        {articles.length === 0 ? (
          <div className="py-24 text-center">
            <p className="label">Empty</p>
            <p className="text-black/60 mt-2">
              Henüz yayınlanmış yazı bulunmuyor.
            </p>
          </div>
        ) : (
          <div className="border-y border-black">
            {articles.map((a) => (
              <Link
                key={a.id}
                href={`/yazilar/${a.slug}`}
                className="grid grid-cols-12 gap-3 sm:gap-4 px-4 sm:px-6 py-6 group hover:bg-black hover:text-white transition-colors border-b border-black/10 last:border-b-0"
              >
                <div className="col-span-2 sm:col-span-1 font-mono text-xs text-black/40 group-hover:text-white/40 self-start pt-1">
                  {String(a.id).padStart(2, "0")}
                </div>
                <div className="col-span-10 sm:col-span-2 self-start pt-1">
                  <span className="tag tag-muted group-hover:border-white group-hover:text-white/60">
                    {a.category}
                  </span>
                </div>
                <div className="col-span-12 sm:col-span-6 order-3 sm:order-none">
                  <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-[-0.03em] leading-[1.05]">
                    {a.title}
                  </h2>
                  <p className="text-sm text-black/60 group-hover:text-white/60 mt-2 line-clamp-2 max-w-2xl">
                    {a.excerpt}
                  </p>
                  {getTags(a.tags).length > 0 && (
                    <div className="hidden sm:flex flex-wrap gap-1.5 mt-3">
                      {getTags(a.tags).slice(0, 4).map((t) => (
                        <span
                          key={t}
                          className="font-mono text-[10px] uppercase tracking-wider text-black/50 group-hover:text-white/40"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="col-span-6 sm:col-span-2 font-mono text-xs text-black/40 group-hover:text-white/40 self-start pt-1">
                  {formatDate(a.publishedAt)}
                </div>
                <div className="col-span-6 sm:col-span-1 font-mono text-xs text-black group-hover:text-white self-start pt-1 text-right">
                  →
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
