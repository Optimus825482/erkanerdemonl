import { getPublishedArticles } from "@/lib/queries";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Yazılar - Erkan Erdem",
  description: "Blog yazılarım ve düşüncelerim",
};

function getTags(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  return raw.filter((t): t is string => typeof t === "string");
}

function colorForCategory(category: string): "cyan" | "magenta" | "green" {
  if (category === "vet" || category === "biyoloji") return "green";
  if (category === "ai" || category === "ml") return "magenta";
  return "cyan";
}

function formatDate(d: Date): string {
  return new Intl.DateTimeFormat("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(d));
}

export default async function YazilarPage() {
  const articles = await getPublishedArticles();

  const categories = Array.from(
    new Set(articles.map((a) => a.category)),
  ).sort();

  return (
    <div className="min-h-screen">
      <section className="section section-content">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal mb-10 sm:mb-14 text-center">
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 justify-center">
              <span className="font-tech text-xs text-cyan-400">02.</span>
              <h1 className="font-orbitron text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                YAZILAR
              </h1>
              <div className="flex-1 hud-line max-w-xs" />
            </div>
            <p className="font-tech text-gray-300 text-base sm:text-lg max-w-2xl mx-auto mb-6 sm:mb-8">
              Teknoloji, yazılım geliştirme, yapay zeka ve daha birçok konuda
              deneyimlerimi ve düşüncelerimi paylaşıyorum.
            </p>

            {categories.length > 0 && (
              <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
                {categories.map((c) => {
                  const color = colorForCategory(c);
                  const cClass =
                    color === "cyan"
                      ? "tag-cyan"
                      : color === "magenta"
                        ? "tag-magenta"
                        : "tag-green";
                  return (
                    <span
                      key={c}
                      className={`tag ${cClass} font-tech text-xs sm:text-sm cursor-default`}
                    >
                      {c.toUpperCase()}
                    </span>
                  );
                })}
              </div>
            )}
          </div>

          {articles.length === 0 ? (
            <div className="reveal glass p-8 sm:p-12 text-center hud-corner">
              <div className="font-orbitron text-4xl text-cyan-400 mb-4 float">
                ✎
              </div>
              <p className="font-tech text-gray-300">
                Henüz yayınlanmış yazı bulunmuyor.
              </p>
            </div>
          ) : (
            <div className="reveal-stagger space-y-5 sm:space-y-6">
              {articles.map((a) => {
                const color = colorForCategory(a.category);
                const dotClass =
                  color === "cyan"
                    ? "bg-cyan-400"
                    : color === "magenta"
                      ? "bg-fuchsia-400"
                      : "bg-green-400";
                const textClass =
                  color === "cyan"
                    ? "text-cyan-400"
                    : color === "magenta"
                      ? "text-fuchsia-400"
                      : "text-green-400";
                return (
                  <Link
                    key={a.id}
                    href={`/yazilar/${a.slug}`}
                    className="reveal glass p-6 card-hover hud-corner block"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-2 h-2 rounded-full pulse mt-2 ${dotClass}`}
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`font-tech text-xs ${textClass}`}>
                            {a.category.toUpperCase()}
                          </span>
                          <span className="font-tech text-xs text-gray-500">
                            {formatDate(a.publishedAt)}
                          </span>
                          {a.readingTime > 0 && (
                            <span className="font-tech text-xs text-gray-500">
                              · {a.readingTime} dk
                            </span>
                          )}
                        </div>
                        <h3
                          className={`font-orbitron text-xl mb-2 ${textClass}`}
                        >
                          {a.title}
                        </h3>
                        <p className="font-tech text-gray-300 text-sm line-clamp-2">
                          {a.excerpt}
                        </p>
                        {getTags(a.tags).length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-3">
                            {getTags(a.tags).slice(0, 4).map((t) => (
                              <span
                                key={t}
                                className={`tag ${
                                  color === "magenta" ? "tag-magenta" : "tag-cyan"
                                } text-xs`}
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
