import Image from "next/image";
import { notFound } from "next/navigation";
import { getVideoBySlug, getPublishedVideos } from "@/lib/queries";
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
  const video = await getVideoBySlug(slug);
  if (!video) return {};
  return {
    title: `${video.title} - Erkan Erdem`,
    description: video.description,
  };
}

export default async function VideoDetay({ params }: PageProps) {
  const { slug } = await params;
  const video = await getVideoBySlug(slug);
  if (!video) notFound();

  const all = await getPublishedVideos();
  const related = all
    .filter((v) => v.id !== video.id && v.category === video.category)
    .slice(0, 3);

  return (
    <div className="min-h-screen">
      <section className="section section-content">
        <div className="max-w-4xl mx-auto px-6">
          <div className="reveal">
            <Link
              href="/videolar"
              className="font-tech text-xs text-cyan-400 hover:text-fuchsia-400 transition-colors"
            >
              ← VİDEOLAR
            </Link>
            <h1 className="font-orbitron text-4xl md:text-5xl font-bold mt-4 mb-4 text-white">
              {video.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 mb-8 font-tech text-xs">
              <span className="text-gray-400">{fmtDate(video.publishedAt)}</span>
              <span className="text-fuchsia-400">{video.category.toUpperCase()}</span>
              {video.duration && (
                <span className="text-cyan-400 font-tech">⏱ {video.duration}</span>
              )}
            </div>
          </div>

          <div className="reveal glass p-6 md:p-8 mb-8 hud-corner overflow-hidden">
            {video.thumbnailImage && (
              <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-6 border border-fuchsia-400/20">
                <Image
                  src={video.thumbnailImage}
                  alt={video.title}
                  fill
                  className="object-cover"
                />
                {video.duration && (
                  <span className="absolute bottom-3 right-3 font-tech text-sm px-3 py-1 bg-black/80 text-cyan-400 border border-cyan-400/30">
                    ⏱ {video.duration}
                  </span>
                )}
              </div>
            )}

            {video.videoEmbed && (
              <div
                className="aspect-video w-full mb-6 rounded-lg overflow-hidden border border-fuchsia-400/20"
                dangerouslySetInnerHTML={{ __html: video.videoEmbed }}
              />
            )}

            {video.description && (
              <p className="font-tech text-gray-200 text-lg leading-relaxed mb-6">
                {video.description}
              </p>
            )}

            {video.longDescription && (
              <p className="font-tech text-gray-300 leading-relaxed whitespace-pre-line">
                {video.longDescription}
              </p>
            )}
          </div>

          {related.length > 0 && (
            <div className="reveal">
              <div className="flex items-center gap-4 mb-6">
                <span className="font-tech text-xs text-fuchsia-400">08.</span>
                <h2 className="font-orbitron text-2xl text-white">
                  İLGİLİ VİDEOLAR
                </h2>
                <div className="flex-1 hud-line" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {related.map((r) => (
                  <Link
                    key={r.id}
                    href={`/videolar/${r.slug}`}
                    className="glass p-4 card-hover hud-corner block"
                  >
                    <h3 className="font-orbitron text-sm text-fuchsia-400 mb-2">
                      {r.title}
                    </h3>
                    <p className="font-tech text-gray-400 text-xs line-clamp-2">
                      {r.description}
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
