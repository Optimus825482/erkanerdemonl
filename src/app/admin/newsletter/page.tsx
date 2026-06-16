import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/actions";
import { fmtDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminNewsletter() {
  await requireAdmin();
  const subs = await prisma.newsletterSubscriber.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h2 className="cyber-heading text-xl text-[#00ff88] mb-6">Bülten Aboneleri ({subs.length})</h2>
      <div className="space-y-2">
        {subs.length === 0 && <p className="text-gray-400">Henüz abone yok.</p>}
        {subs.map((s) => (
          <div key={s.id} className="cyber-card flex justify-between items-center">
            <div>
              <div className="cyber-heading text-[#00ff88]">{s.email}</div>
              <div className="text-xs text-gray-500">
                {fmtDate(s.createdAt)} • {s.isActive ? "Aktif" : "Pasif"}
              </div>
            </div>
            <span className="text-xs text-gray-500 font-mono">{s.unsubscribeToken.slice(0, 8)}…</span>
          </div>
        ))}
      </div>
    </div>
  );
}
