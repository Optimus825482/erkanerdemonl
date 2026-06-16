import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/actions";
import { saveFAQ, deleteFAQ } from "@/lib/admin-actions";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export default async function AdminFAQ() {
  await requireAdmin();
  const faqs = await prisma.fAQ.findMany({ orderBy: { displayOrder: "asc" } });

  async function del(fd: FormData) {
    "use server";
    await deleteFAQ(fd);
  }

  return (
    <div>
      <h2 className="cyber-heading text-xl text-[#00ff88] mb-6">SSS ({faqs.length})</h2>

      <form
        action={async (fd) => {
          "use server";
          await saveFAQ(fd);
        }}
        className="cyber-glass-light p-4 rounded-xl mb-6 space-y-3"
      >
        <h3 className="cyber-heading text-[#00ff88]">Yeni Ekle</h3>
        <input name="question" required placeholder="Soru" className="w-full px-3 py-2 bg-[#1a1a2e] border cyber-border-field text-gray-300 rounded" />
        <textarea name="answer" required placeholder="Cevap" rows={3} className="w-full px-3 py-2 bg-[#1a1a2e] border cyber-border-field text-gray-300 rounded" />
        <div className="flex gap-3">
          <select name="colorTheme" className="px-3 py-2 bg-[#1a1a2e] border cyber-border-field text-gray-300 rounded">
            <option value="cyan">Cyan</option>
            <option value="fuchsia">Fuchsia</option>
            <option value="green">Green</option>
            <option value="yellow">Yellow</option>
          </select>
          <input name="displayOrder" type="number" defaultValue={faqs.length} placeholder="Sıra" className="w-24 px-3 py-2 bg-[#1a1a2e] border cyber-border-field text-gray-300 rounded" />
          <label className="text-sm text-gray-300 flex items-center gap-2">
            <input type="checkbox" name="isPublished" defaultChecked /> Yayında
          </label>
        </div>
        <button className="px-4 py-2 bg-[#00ff88] text-[#1a1a2e] font-bold rounded">Ekle</button>
      </form>

      <div className="space-y-3">
        {faqs.map((f) => (
          <div key={f.id} className="cyber-card">
            <div className="flex justify-between items-start">
              <div>
                <div className="cyber-heading text-[#00ff88]">{f.question}</div>
                <p className="text-gray-300 text-sm mt-1">{f.answer}</p>
                <p className="text-xs text-gray-500 mt-1">Sıra: {f.displayOrder} • {f.colorTheme} {f.isPublished ? "✓" : "✗"}</p>
              </div>
              <form action={del}>
                <input type="hidden" name="id" value={f.id} />
                <button className="px-3 py-1 border border-[#ff2b9d] text-[#ff2b9d] rounded text-sm">Sil</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
