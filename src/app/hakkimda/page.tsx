import Image from "next/image";
import { getAbout, getPublishedProjects } from "@/lib/queries";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — Erkan Erdem",
  description: "Veteriner Hekim, Full Stack Developer, AI Enthusiast",
};

interface QAPair {
  index: string;
  question: string;
  answer: string;
}

function getTags(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  return raw.filter((t): t is string => typeof t === "string");
}

export default async function HakkimdaPage() {
  const [about, projects] = await Promise.all([
    getAbout(),
    getPublishedProjects(),
  ]);

  const tags = getTags(about?.tags);

  const qa: QAPair[] = [
    {
      index: "01",
      question: "Ne yapıyorsun?",
      answer:
        about?.yaklasim ??
        "Veteriner hekimlik mesleğimi teknoloji ile birleştirerek, hem klasik tedavi yöntemlerini uygularken hem de modern teknolojik çözümler geliştiriyorum.",
    },
    {
      index: "02",
      question: "Nasıl düşünüyorsun?",
      answer:
        about?.felsefe ??
        "Analitik düşünce yapısını teknoloji tutkumla birleştirerek özgün çözümler üretiyorum. Yapay zeka ve bilgisayarlı görü teknolojilerinin geleceğini şekillendirmeye katkıda bulunmayı hedefliyorum.",
    },
    {
      index: "03",
      question: "Hobilerin?",
      answer:
        "Elektronik müzik prodüksiyonu ve astroloji, hayatıma farklı perspektifler katarken yaratıcılığımı besliyor.",
    },
  ];

  return (
    <>
      <section className="section">
        <div className="container">
          {/* Top meta */}
          <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-black/50 mb-12">
            <span>
              <span className="inline-block w-2 h-2 bg-[#e63946] mr-2 align-middle" />
              01 — About
            </span>
            <span>Hakkımda</span>
          </div>

          {/* Title — asymmetric */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-6 gap-y-12 mb-16">
            <div className="lg:col-span-2">
              <div className="label">Hakkımda</div>
            </div>
            <div className="lg:col-span-10">
              <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[8rem] xl:text-[9rem] font-extrabold tracking-[-0.04em] leading-[0.9] mb-8">
                {about?.fullName ?? "Erkan Erdem"}
              </h1>
              <p className="font-display text-xl sm:text-2xl text-black/70 leading-[1.15] max-w-3xl text-balance">
                {about?.title ?? "Fullstack Developer & Veteriner Hekim"}
              </p>
            </div>
          </div>

          <div className="hairline" />

          {/* Bio + Image — asymmetric */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-6 gap-y-12 py-16">
            <div className="lg:col-span-2">
              <div className="label">[A] Bio</div>
            </div>
            <div className="lg:col-span-6">
              <p className="font-display text-lg sm:text-xl text-black/80 leading-[1.5] max-w-2xl text-balance mb-6">
                {about?.shortBio ??
                  "Veteriner hekimlik mesleğimi icra ederken, teknoloji ve yazılım dünyasında Full Stack Developer olarak projeler geliştiriyorum."}
              </p>
              {about?.location && (
                <p className="font-mono text-xs uppercase tracking-widest text-black/50">
                  Based in — {about.location}
                </p>
              )}
            </div>
            <div className="lg:col-span-4">
              <div className="relative aspect-[4/5] w-full border border-black overflow-hidden">
                <Image
                  src={about?.profileImage ?? "/images/erkanerdem.png"}
                  alt="Erkan Erdem"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          <div className="hairline" />

          {/* Q&A — interview style */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-6 gap-y-12 py-16">
            <div className="lg:col-span-2">
              <div className="label">[B] Q&A</div>
            </div>
            <div className="lg:col-span-10 divide-y divide-black/10">
              {qa.map((item) => (
                <div
                  key={item.index}
                  className="grid grid-cols-12 gap-4 py-8 first:pt-0 last:pb-0"
                >
                  <div className="col-span-2 sm:col-span-1 font-mono text-xs text-black/40">
                    {item.index}
                  </div>
                  <h3 className="col-span-10 sm:col-span-5 font-display text-2xl sm:text-3xl font-bold tracking-[-0.02em]">
                    {item.question}
                  </h3>
                  <p className="col-span-12 sm:col-span-6 sm:col-start-7 text-base sm:text-lg text-black/70 leading-[1.6] max-w-xl">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {tags.length > 0 && (
            <>
              <div className="hairline" />
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-6 gap-y-6 py-12">
                <div className="lg:col-span-2">
                  <div className="label">[C] Tags</div>
                </div>
                <div className="lg:col-span-10 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      {projects.length > 0 && (
        <section className="section border-t border-black">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-6 items-end">
              <div className="lg:col-span-8">
                <div className="label mb-6">[02] Work</div>
                <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-[-0.04em] leading-[1]">
                  Çalışmalarımı gör.
                </h2>
              </div>
              <div className="lg:col-span-4 lg:text-right mt-6 lg:mt-0">
                <Link
                  href="/projeler"
                  className="btn btn-primary justify-center w-full lg:w-auto"
                >
                  View projects →
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
