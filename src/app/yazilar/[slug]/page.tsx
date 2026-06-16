import Image from "next/image";
import { notFound } from "next/navigation";
import { getArticleBySlug, getPublishedArticles } from "@/lib/queries";
import { fmtDate } from "@/lib/utils";
import Link from "next/link";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: `${article.title} - Erkan Erdem`,
    description: article.excerpt,
  };
}

function getTags(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  return raw.filter((t): t is string => typeof t === "string");
}

function colorForCategory(category: string): "cyan" | "fuchsia" | "green" {
  if (category === "vet" || category === "biyoloji") return "green";
  if (category === "ai" || category === "ml") return "fuchsia";
  return "cyan";
}

export default async function YaziDetay({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const tags = getTags(article.tags);
  const all = await getPublishedArticles();
  const related = all
    .filter((a) => a.id !== article.id && a.category === article.category)
    .slice(0, 3);
  const color = colorForCategory(article.category);
  const textClass =
    color === "cyan" ? "text-cyan-400" : color === "fuchsia" ? "text-fuchsia-400" : "text-green-400";
  const tagClass =
    color === "fuchsia" ? "tag-magenta" : "tag-cyan";

  return (
    <div className="min-h-screen">
      <section className="section section-content">
        <div className="max-w-4xl mx-auto px-6">
          <div className="reveal">
            <Link
              href="/yazilar"
              className="font-tech text-xs text-cyan-400 hover:text-fuchsia-400 transition-colors"
            >
              ← YAZILAR
            </Link>
            <h1 className="font-orbitron text-4xl md:text-5xl font-bold mt-4 mb-4 text-white">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 mb-8 font-tech text-xs">
              <span className="text-gray-400">{fmtDate(article.publishedAt)}</span>
              <span className={textClass}>{article.category.toUpperCase()}</span>
              {article.readingTime > 0 && (
                <span className="text-gray-500">{article.readingTime} dk okuma</span>
              )}
            </div>
          </div>

          <div className="reveal glass p-6 md:p-8 mb-8 hud-corner overflow-hidden">
            {article.thumbnailImage && (
              <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-6 border border-cyan-400/20">
                <Image
                  src={article.thumbnailImage}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {article.excerpt && (
              <p className="font-tech text-gray-200 text-lg leading-relaxed mb-6 italic border-l-2 border-cyan-400 pl-4">
                {article.excerpt}
              </p>
            )}

            <div className="font-tech text-gray-300 leading-relaxed whitespace-pre-line text-base">
              {article.content}
            </div>

            {tags.length > 0 && (
              <div className="mt-8 pt-6 border-t border-cyan-400/20">
                <h3 className="font-tech text-xs text-cyan-400 mb-3">ETİKETLER</h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((t) => (
                    <span key={t} className={`tag ${tagClass} font-tech`}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {related.length > 0 && (
            <div className="reveal">
              <div className="flex items-center gap-4 mb-6">
                <span className="font-tech text-xs text-fuchsia-400">07.</span>
                <h2 className="font-orbitron text-2xl text-white">
                  İLGİLİ YAZILAR
                </h2>
                <div className="flex-1 hud-line" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {related.map((r) => (
                  <Link
                    key={r.id}
                    href={`/yazilar/${r.slug}`}
                    className="glass p-4 card-hover hud-corner block"
                  >
                    <h3 className="font-orbitron text-sm text-fuchsia-400 mb-2">
                      {r.title}
                    </h3>
                    <p className="font-tech text-gray-400 text-xs line-clamp-2">
                      {r.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
