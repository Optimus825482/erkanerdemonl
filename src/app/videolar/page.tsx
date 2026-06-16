import { getPublishedVideos } from "@/lib/queries";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Videolar - Erkan Erdem",
  description: "Video içeriklerim ve sunumlarım",
};

function formatDate(d: Date): string {
  return new Intl.DateTimeFormat("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(d));
}

export default async function VideolarPage() {
  const videos = await getPublishedVideos();

  return (
    <div className="min-h-screen">
      <section className="section section-content">
        <div className="max-w-6xl mx-auto px-6">
          <div className="reveal mb-12 text-center">
            <div className="flex items-center gap-4 mb-6 justify-center">
              <span className="font-tech text-xs text-fuchsia-400">03.</span>
              <h1 className="font-orbitron text-4xl md:text-5xl font-bold text-white">
                VİDEOLAR
              </h1>
              <div className="flex-1 hud-line max-w-xs" />
            </div>
            <p className="font-tech text-gray-300 text-lg max-w-2xl mx-auto">
              Çeşitli konularda hazırladığım eğitim videoları, teknoloji
              incelemeleri ve yazılım geliştirme süreçlerine dair içerikler.
            </p>
          </div>

          {videos.length === 0 ? (
            <div className="reveal glass p-12 text-center hud-corner">
              <div className="font-orbitron text-4xl text-fuchsia-400 mb-4 float">
                ▶
              </div>
              <p className="font-tech text-gray-300">
                Henüz yayınlanmış video bulunmuyor.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((v) => (
                <Link
                  key={v.id}
                  href={`/videolar/${v.slug}`}
                  className="reveal glass card-hover hud-corner block overflow-hidden"
                >
                  {v.thumbnailImage && (
                    <div className="relative w-full aspect-video overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={v.thumbnailImage}
                        alt={v.title}
                        className="w-full h-full object-cover opacity-80"
                      />
                      {v.duration && (
                        <span className="absolute bottom-2 right-2 font-tech text-xs px-2 py-1 bg-black/80 text-cyan-400 border border-cyan-400/30">
                          {v.duration}
                        </span>
                      )}
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-fuchsia-400 pulse" />
                      <span className="font-tech text-xs text-fuchsia-400">
                        {v.category.toUpperCase()}
                      </span>
                    </div>
                    <h3 className="font-orbitron text-lg text-white mb-2">
                      {v.title}
                    </h3>
                    <p className="font-tech text-gray-300 text-sm line-clamp-2 mb-3">
                      {v.description}
                    </p>
                    <span className="font-tech text-xs text-gray-500">
                      {formatDate(v.publishedAt)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
