import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/actions";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  await requireAdmin();

  const [projects, articles, faqs, messages, subscribers, unread] = await Promise.all([
    prisma.project.count(),
    prisma.article.count(),
    prisma.fAQ.count(),
    prisma.contactMessage.count(),
    prisma.newsletterSubscriber.count({ where: { isActive: true } }),
    prisma.contactMessage.count({ where: { isRead: false } }),
  ]);

  const stats = [
    { label: "Projeler", value: projects, color: "cyan" },
    { label: "Yazılar", value: articles, color: "pink" },
    { label: "SSS", value: faqs, color: "green" },
    { label: "Mesajlar", value: messages, color: "yellow" },
    { label: "Okunmamış", value: unread, color: "pink" },
    { label: "Aboneler", value: subscribers, color: "green" },
  ];

  const colorMap: Record<string, string> = {
    cyan: "#0ff",
    pink: "#ff2b9d",
    green: "#00ff88",
    yellow: "#ffff00",
  };

  return (
    <div>
      <h2 className="cyber-heading text-xl text-white mb-6">Gösterge Paneli</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="cyber-card text-center">
            <div className="cyber-heading text-3xl" style={{ color: colorMap[s.color] }}>
              {s.value}
            </div>
            <div className="text-sm text-gray-400 mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
