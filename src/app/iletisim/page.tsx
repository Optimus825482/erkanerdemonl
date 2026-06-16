import { getAbout, getPublishedFAQs } from "@/lib/queries";
import type { Metadata } from "next";
import ContactSection from "@/components/ContactSection";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact — Erkan Erdem",
  description: "Bana ulaşın. Projeler, iş birliği veya sadece merhaba.",
};

const COLORS = ["text-[#e63946]", "text-black"];

export default async function IletisimPage() {
  const [faqs, about] = await Promise.all([
    getPublishedFAQs(),
    getAbout(),
  ]);

  return (
    <section className="section">
      <div className="container">
        {/* Top meta */}
        <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-black/50 mb-12">
          <span>
            <span className="inline-block w-2 h-2 bg-[#e63946] mr-2 align-middle" />
            04 — Contact
          </span>
          <span>Reply within 24h</span>
        </div>

        {/* Title */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-6 gap-y-8 mb-16">
          <div className="lg:col-span-2">
            <div className="label">İletişim</div>
          </div>
          <div className="lg:col-span-10">
            <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[8rem] xl:text-[9rem] font-extrabold tracking-[-0.04em] leading-[0.9]">
              Contact.
            </h1>
            <p className="font-display text-xl sm:text-2xl text-black/70 leading-[1.15] max-w-3xl mt-6">
              Projeler, iş birliği veya sadece merhaba — aşağıdaki formu
              kullanabilirsiniz.
            </p>
          </div>
        </div>

        <div className="hairline" />

        {/* Form */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-6 gap-y-8">
            <div className="lg:col-span-2">
              <div className="label">[A] Form</div>
            </div>
            <div className="lg:col-span-7">
              <ContactSection />
            </div>
            <div className="lg:col-span-3">
              <div className="space-y-8">
                <div>
                  <div className="label">Email</div>
                  <a
                    href="mailto:info@erkanerdem.online"
                    className="block mt-2 text-lg font-medium hover:text-[#e63946] transition-colors break-all"
                  >
                    {about?.email ?? "info@erkanerdem.online"}
                  </a>
                </div>
                <div>
                  <div className="label">Location</div>
                  <p className="mt-2 text-lg font-medium">
                    {about?.location ?? "Türkiye"}
                  </p>
                </div>
                <div>
                  <div className="label">Social</div>
                  <ul className="mt-2 space-y-1 font-mono text-sm">
                    {about?.socialGithub && (
                      <li>
                        <a
                          href={about.socialGithub}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-[#e63946] transition-colors"
                        >
                          GitHub ↗
                        </a>
                      </li>
                    )}
                    {about?.socialLinkedin && (
                      <li>
                        <a
                          href={about.socialLinkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-[#e63946] transition-colors"
                        >
                          LinkedIn ↗
                        </a>
                      </li>
                    )}
                    {about?.socialTwitter && (
                      <li>
                        <a
                          href={about.socialTwitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-[#e63946] transition-colors"
                        >
                          Twitter ↗
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {faqs.length > 0 && (
          <>
            <div className="hairline" />
            <div className="py-12 lg:py-16">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-6 gap-y-8">
                <div className="lg:col-span-2">
                  <div className="label">[B] FAQ</div>
                </div>
                <div className="lg:col-span-10 divide-y divide-black/10">
                  {faqs.map((f: { id: number; question: string; answer: string }, i: number) => {
                    const color = COLORS[i % 2] ?? COLORS[0]!;
                    return (
                      <div
                        key={f.id}
                        className="grid grid-cols-12 gap-4 py-6 first:pt-0 last:pb-0"
                      >
                        <div className="col-span-1 font-mono text-xs text-black/40 self-start pt-2">
                          {String(f.id).padStart(2, "0")}
                        </div>
                        <h3
                          className={`col-span-11 sm:col-span-5 font-display text-xl sm:text-2xl font-semibold tracking-[-0.02em] ${color}`}
                        >
                          {f.question}
                        </h3>
                        <p className="col-span-12 sm:col-span-6 sm:col-start-7 text-base text-black/70 leading-[1.6]">
                          {f.answer}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
