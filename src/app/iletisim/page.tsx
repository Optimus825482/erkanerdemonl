import { getAbout, getPublishedFAQs } from "@/lib/queries";
import type { Metadata } from "next";
import ContactSection from "@/components/ContactSection";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "İletişim - Erkan Erdem",
  description: "Bana ulaşın",
};

const COLOR_MAP: Record<string, string> = {
  cyan: "text-cyan-400",
  fuchsia: "text-fuchsia-400",
  magenta: "text-fuchsia-400",
  green: "text-green-400",
  yellow: "text-yellow-400",
};

const DOT_MAP: Record<string, string> = {
  cyan: "bg-cyan-400",
  fuchsia: "bg-fuchsia-400",
  magenta: "bg-fuchsia-400",
  green: "bg-green-400",
  yellow: "bg-yellow-400",
};

export default async function IletisimPage() {
  const [faqs, about] = await Promise.all([
    getPublishedFAQs(),
    getAbout(),
  ]);

  return (
    <div className="min-h-screen">
      <section className="section section-content">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal mb-10 sm:mb-14 text-center">
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 justify-center">
              <span className="font-tech text-xs text-cyan-400">04.</span>
              <h1 className="font-orbitron text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                İLETİŞİM
              </h1>
              <div className="flex-1 hud-line max-w-xs" />
            </div>
            <p className="font-tech text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
              Projeler hakkında konuşmak, iş birliği yapmak veya sadece merhaba
              demek için bana ulaşabilirsiniz.
            </p>
            {about?.email && (
              <p className="font-tech text-sm text-cyan-400 mt-3">
                {about.email}
              </p>
            )}
          </div>

          {/* İletişim Formu */}
          <div className="reveal mb-10 sm:mb-14">
            <ContactSection />
          </div>

          {/* SSS */}
          {faqs.length > 0 && (
            <div>
              <div className="reveal flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                <span className="font-tech text-xs text-fuchsia-400">05.</span>
                <h2 className="font-orbitron text-2xl sm:text-3xl font-bold text-white">
                  SIKÇA SORULAN SORULAR
                </h2>
                <div className="flex-1 hud-line" />
              </div>
              <div className="reveal-stagger grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {faqs.map((f) => {
                  const textClass =
                    COLOR_MAP[f.colorTheme] ?? "text-cyan-400";
                  const dotClass = DOT_MAP[f.colorTheme] ?? "bg-cyan-400";
                  return (
                    <div key={f.id} className="glass p-6 card-hover hud-corner">
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-2 h-2 rounded-full pulse mt-2 ${dotClass}`}
                        />
                        <div>
                          <h3
                            className={`font-orbitron text-lg mb-2 ${textClass}`}
                          >
                            {f.question}
                          </h3>
                          <p className="font-tech text-gray-300 text-sm leading-relaxed">
                            {f.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
