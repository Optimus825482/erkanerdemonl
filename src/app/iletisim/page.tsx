import { getAbout, getPublishedFAQs } from "@/lib/queries";
import type { Metadata } from "next";
import ContactSection from "@/components/ContactSection";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "İletişim — Erkan Erdem",
  description: "Bana ulaşın. Projeler, iş birliği veya sadece merhaba.",
};

const FAQ_CARDS = [
  {
    color: "cyan",
    text: "text-cyan-400",
    dot: "bg-cyan-400",
  },
  {
    color: "magenta",
    text: "text-[var(--accent)]",
    dot: "bg-[var(--accent)]",
  },
  {
    color: "green",
    text: "text-emerald-400",
    dot: "bg-emerald-400",
  },
  {
    color: "yellow",
    text: "text-yellow-400",
    dot: "bg-yellow-400",
  },
];

export default async function IletisimPage() {
  const [faqs] = await Promise.all([
    getPublishedFAQs(),
    getAbout(),
  ]);

  return (
    <div className="min-h-screen">
      <section className="section">
        <div className="container">
          {/* Başlık */}
          <div className="reveal mb-12 sm:mb-20">
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                04
              </span>
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                /
              </span>
              <span className="font-mono text-xs uppercase tracking-widest">
                Contact
              </span>
            </div>
            <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter mb-8 max-w-4xl">
              İletişim.
            </h1>
            <p className="font-display text-xl sm:text-2xl text-muted-foreground leading-relaxed max-w-3xl">
              Projeler hakkında konuşmak, iş birliği yapmak veya sadece merhaba
              demek için aşağıdaki formu kullanabilirsiniz.
            </p>
          </div>

          {/* İletişim formu */}
          <div className="reveal mb-20 sm:mb-24 max-w-3xl">
            <ContactSection />
          </div>

          {/* SSS */}
          {faqs.length > 0 && (
            <div className="reveal">
              <div className="flex items-baseline gap-3 mb-10 pb-4 border-b border-foreground/10">
                <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  05
                </span>
                <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  /
                </span>
                <span className="font-mono text-xs uppercase tracking-widest">
                  FAQ
                </span>
              </div>

              <div className="reveal-stagger grid grid-cols-1 md:grid-cols-2 gap-6">
                {faqs.map((f: { id: number; question: string; answer: string; colorTheme: string }) => {
                  const idx = Math.abs(f.id) % FAQ_CARDS.length;
                  const card = FAQ_CARDS[idx] ?? FAQ_CARDS[0]!;
                  return (
                    <div
                      key={f.id}
                      className="border border-foreground/15 p-6 hover:border-foreground transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className={`mt-1.5 inline-block w-2 h-2 rounded-full ${card.dot} pulse`}
                        />
                        <div>
                          <h3
                            className={`font-display text-lg font-semibold tracking-tight mb-2 ${card.text}`}
                          >
                            {f.question}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">
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
