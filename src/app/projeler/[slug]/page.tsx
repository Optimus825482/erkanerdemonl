import Image from "next/image";
import { notFound } from "next/navigation";
import { getProjectBySlug, getPublishedProjects } from "@/lib/queries";
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
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} - Erkan Erdem`,
    description: project.description,
  };
}

function getTechs(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  return raw.filter((t): t is string => typeof t === "string");
}

function getImages(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  return raw.filter((t): t is string => typeof t === "string");
}

export default async function ProjeDetay({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const techs = getTechs(project.technologies);
  const images = getImages(project.contentImages);
  const all = await getPublishedProjects();
  const related = all
    .filter((p) => p.id !== project.id && p.category === project.category)
    .slice(0, 3);

  return (
    <div className="min-h-screen">
      <section className="section section-content">
        <div className="max-w-4xl mx-auto px-6">
          <div className="reveal">
            <Link
              href="/projeler"
              className="font-tech text-xs text-cyan-400 hover:text-fuchsia-400 transition-colors"
            >
              ← PROJELER
            </Link>
            <h1 className="font-orbitron text-4xl md:text-5xl font-bold mt-4 mb-4 text-white">
              {project.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 mb-8 font-tech text-xs">
              <span className="text-gray-400">{fmtDate(project.publishedAt)}</span>
              <span className="text-cyan-400">{project.category.toUpperCase()}</span>
              <span className="text-green-400">{project.status.toUpperCase()}</span>
            </div>
          </div>

          <div className="reveal glass p-6 md:p-8 mb-8 hud-corner overflow-hidden">
            {project.thumbnailImage && (
              <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-6 border border-cyan-400/20">
                <Image
                  src={project.thumbnailImage}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <p className="font-tech text-gray-200 text-lg leading-relaxed mb-6">
              {project.description}
            </p>

            {project.longDescription && (
              <p className="font-tech text-gray-300 leading-relaxed whitespace-pre-line">
                {project.longDescription}
              </p>
            )}

            {techs.length > 0 && (
              <div className="mt-6">
                <h3 className="font-tech text-xs text-cyan-400 mb-3">
                  TEKNOLOJİLER
                </h3>
                <div className="flex flex-wrap gap-2">
                  {techs.map((t) => (
                    <span key={t} className="tag tag-cyan font-tech">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {(project.githubUrl || project.liveUrl) && (
              <div className="flex flex-wrap gap-3 mt-8">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cyber-btn text-sm py-2 px-4"
                  >
                    GITHUB
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cyber-btn cyber-btn-magenta text-sm py-2 px-4"
                  >
                    CANLI
                  </a>
                )}
              </div>
            )}
          </div>

          {images.length > 0 && (
            <div className="reveal grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {images.map((src) => (
                <div
                  key={src}
                  className="relative w-full aspect-video rounded-lg overflow-hidden border border-cyan-400/20"
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          {related.length > 0 && (
            <div className="reveal">
              <div className="flex items-center gap-4 mb-6">
                <span className="font-tech text-xs text-fuchsia-400">06.</span>
                <h2 className="font-orbitron text-2xl text-white">
                  İLGİLİ PROJELER
                </h2>
                <div className="flex-1 hud-line" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {related.map((r) => (
                  <Link
                    key={r.id}
                    href={`/projeler/${r.slug}`}
                    className="glass p-4 card-hover hud-corner block"
                  >
                    <h3 className="font-orbitron text-sm text-cyan-400 mb-2">
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
