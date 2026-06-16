import Link from "next/link";
import { getAbout, getPublishedProjects } from "@/lib/queries";

export const dynamic = "force-dynamic";

const FALLBACK_TITLES = [
  "Veteriner Hekim",
  "Fullstack Developer",
  "AI & Machine Learning",
];

export default async function Home() {
  const [about, projects] = await Promise.all([
    getAbout(),
    getPublishedProjects(),
  ]);

  const heroTitles =
    (about?.heroTitles as string[] | null)?.filter(
      (t): t is string => typeof t === "string" && t.length > 0,
    ) ?? FALLBACK_TITLES;

  return (
    <>
      {/* HERO — Swiss editorial */}
      <section className="section">
        <div className="container">
          {/* Top meta */}
          <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-black/50 mb-12">
            <span>
              <span className="inline-block w-2 h-2 bg-[#e63946] mr-2 align-middle" />
              Online — Istanbul, TR
            </span>
            <span className="hidden sm:inline">
              Portfolio · 2026
            </span>
            <span>v1.0</span>
          </div>

          {/* Hero — asymmetric 12-col grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-6 gap-y-12 mb-24">
            {/* Index label — col 1 */}
            <div className="lg:col-span-2">
              <div className="label">[00] Index</div>
            </div>

            {/* Main hero — col 7-12 */}
            <div className="lg:col-span-10">
              <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[8rem] xl:text-[9rem] font-extrabold tracking-[-0.04em] leading-[0.9] mb-8">
                {about?.fullName ?? "Erkan Erdem"}
              </h1>
              <p className="font-display text-xl sm:text-2xl md:text-3xl text-black/70 leading-[1.15] max-w-3xl text-balance">
                {about?.shortBio ??
                  "Veteriner hekimlik mesleğimi icra ederken, teknoloji ve yazılım dünyasında Full Stack Developer olarak projeler geliştiriyorum."}
              </p>
            </div>
          </div>

          {/* Hero titles + CTAs */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-6 gap-y-12 mb-16">
            <div className="lg:col-span-2">
              <div className="label">[01] Roles</div>
            </div>
            <div className="lg:col-span-7">
              <ul className="space-y-3">
                {heroTitles.map((title, i) => (
                  <li
                    key={i}
                    className="font-mono text-sm sm:text-base text-black flex items-baseline gap-3"
                  >
                    <span className="text-black/30 w-8 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{title}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-3 flex flex-col gap-3">
              <Link
                href="/hakkimda"
                className="btn btn-primary justify-center w-full"
              >
                About me →
              </Link>
              <Link
                href="/projeler"
                className="btn justify-center w-full"
              >
                View work →
              </Link>
            </div>
          </div>

          <div className="hairline" />

          {/* Metrics bar — 4-col */}
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-black/10">
            <div className="py-6 px-4 first:pl-0">
              <div className="label">Projects</div>
              <div className="font-display text-3xl sm:text-4xl font-bold mt-2">
                {String(projects.length).padStart(2, "0")}
              </div>
            </div>
            <div className="py-6 px-4">
              <div className="label">Stack</div>
              <div className="font-display text-3xl sm:text-4xl font-bold mt-2">
                12+
              </div>
            </div>
            <div className="py-6 px-4">
              <div className="label">Years</div>
              <div className="font-display text-3xl sm:text-4xl font-bold mt-2">
                7+
              </div>
            </div>
            <div className="py-6 px-4 last:pr-0">
              <div className="label">Status</div>
              <div className="font-display text-3xl sm:text-4xl font-bold mt-2 flex items-baseline gap-2">
                <span className="inline-block w-2 h-2 bg-[#e63946] rounded-full" />
                Open
              </div>
            </div>
          </div>

          <div className="hairline" />
        </div>
      </section>

      {/* RECENT WORK */}
      {projects.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-6 mb-12">
              <div className="lg:col-span-2">
                <div className="label">[02] Work</div>
              </div>
              <div className="lg:col-span-10 flex justify-between items-end">
                <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-[-0.04em] leading-[1]">
                  Recent projects.
                </h2>
                <Link
                  href="/projeler"
                  className="label hover:text-[#e63946] transition-colors hidden sm:inline"
                >
                  All →
                </Link>
              </div>
            </div>

            <div className="reveal-stagger divide-y divide-black/10 border-y border-black">
              {projects.slice(0, 5).map((p) => (
                <Link
                  key={p.id}
                  href={`/projeler/${p.slug}`}
                  className="grid grid-cols-12 gap-4 sm:gap-6 px-4 sm:px-6 lg:px-8 py-8 lg:py-10 group hover:bg-black hover:text-white transition-colors"
                >
                  <div className="col-span-2 sm:col-span-1 font-mono text-xs text-black/40 group-hover:text-white/40 self-center">
                    {String(p.id).padStart(2, "0")}
                  </div>
                  <div className="col-span-10 sm:col-span-2 self-center">
                    <span className="tag tag-muted group-hover:border-white group-hover:text-white/60">
                      {p.category}
                    </span>
                  </div>
                  <div className="col-span-12 sm:col-span-6 order-3 sm:order-none">
                    <h3 className="font-display text-lg sm:text-xl lg:text-2xl font-semibold tracking-tight">
                      {p.title}
                    </h3>
                    <p className="text-sm text-black/60 group-hover:text-white/60 mt-2 line-clamp-2">
                      {p.description}
                    </p>
                  </div>
                  <div className="hidden sm:block col-span-2 font-mono text-xs text-black/40 group-hover:text-white/40 self-center">
                    {new Date(p.publishedAt).getFullYear()}
                  </div>
                  <div className="col-span-12 sm:col-span-1 font-mono text-xs text-black/40 group-hover:text-white/40 self-center text-right">
                    →
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CONTACT CTA */}
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-6 items-end">
            <div className="lg:col-span-8">
              <div className="label mb-6">[03] Contact</div>
              <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-[-0.04em] leading-[0.95]">
                Birlikte{" "}
                <span className="text-[#e63946]">çalışalım.</span>
              </h2>
            </div>
            <div className="lg:col-span-4 lg:text-right mt-6 lg:mt-0">
              <Link
                href="/iletisim"
                className="btn btn-accent justify-center w-full lg:w-auto"
              >
                Get in touch →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
