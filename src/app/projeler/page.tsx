import { getPublishedProjects } from "@/lib/queries";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Projeler - Erkan Erdem",
  description: "Geliştirdiğim projeler ve çalışmalarım",
};

function getTechnologies(tech: unknown): string[] {
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

function colorForCategory(category: string): "cyan" | "magenta" | "green" {
  if (category === "ai" || category === "ml") return "magenta";
  if (category === "vet" || category === "biyoloji") return "green";
  return "cyan";
}

export default async function ProjelerPage() {
  const projects = await getPublishedProjects();

  return (
    <div className="min-h-screen">
      <section className="section section-content">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal mb-10 sm:mb-14">
            <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <span className="font-tech text-xs text-fuchsia-400">01.</span>
              <h1 className="font-orbitron text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                PROJELER
              </h1>
              <div className="flex-1 hud-line" />
            </div>
            <p className="font-tech text-gray-300 text-base sm:text-lg max-w-3xl">
              Geliştirdiğim projeler ve teknoloji ile hayata geçirdiğim çözümler.
            </p>
          </div>

          {projects.length === 0 ? (
            <div className="reveal glass p-8 sm:p-12 text-center hud-corner">
              <div className="font-orbitron text-4xl text-cyan-400 mb-4 float">
                ⚙
              </div>
              <p className="font-tech text-gray-300">
                Henüz yayınlanmış proje bulunmuyor.
              </p>
            </div>
          ) : (
            <div className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {projects.map((p) => {
                const techs = getTechnologies(p.technologies);
                const color = colorForCategory(p.category);
                const colorClass =
                  color === "cyan"
                    ? "text-cyan-400"
                    : color === "magenta"
                      ? "text-fuchsia-400"
                      : "text-green-400";
                return (
                  <Link
                    key={p.id}
                    href={`/projeler/${p.slug}`}
                    className="glass p-6 card-hover hud-corner block"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div
                        className={`w-2 h-2 rounded-full pulse ${
                          color === "cyan"
                            ? "bg-cyan-400"
                            : color === "magenta"
                              ? "bg-fuchsia-400"
                              : "bg-green-400"
                        }`}
                      />
                      <span
                        className={`font-tech text-xs ${colorClass}`}
                      >
                        {p.category.toUpperCase()}
                      </span>
                    </div>
                    <h3 className={`font-orbitron text-xl mb-3 ${colorClass}`}>
                      {p.title}
                    </h3>
                    <p className="font-tech text-gray-300 text-sm line-clamp-3 mb-4">
                      {p.description}
                    </p>
                    {techs.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {techs.slice(0, 3).map((t) => (
                          <span key={t} className="tag tag-cyan text-xs">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
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
