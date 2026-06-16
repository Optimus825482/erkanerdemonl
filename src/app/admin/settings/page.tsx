import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/actions";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export default async function AdminSettings() {
  await requireAdmin();
  const settings = await prisma.setting.findMany({ orderBy: { key: "asc" } });

  async function save(fd: FormData) {
    "use server";
    const key = String(fd.get("key"));
    const value = String(fd.get("value") ?? "");
    const valueType = String(fd.get("valueType") ?? "string");
    if (!key) return;
    await prisma.setting.upsert({
      where: { key },
      update: { value, valueType },
      create: { key, value, valueType },
    });
    revalidatePath("/admin/settings");
  }

  async function del(fd: FormData) {
    "use server";
    const key = String(fd.get("key"));
    await prisma.setting.deleteMany({ where: { key } });
    revalidatePath("/admin/settings");
  }

  return (
    <div>
      <h2 className="cyber-heading text-xl text-[#0ff] mb-6">Ayarlar</h2>

      <form action={save} className="cyber-glass-light p-4 rounded-xl mb-6 space-y-3">
        <h3 className="cyber-heading text-[#0ff]">Yeni Ayar</h3>
        <input name="key" required placeholder="Anahtar (örn: site_title)" className="w-full px-3 py-2 bg-[#1a1a2e] border cyber-border-field text-gray-300 rounded" />
        <input name="value" placeholder="Değer" className="w-full px-3 py-2 bg-[#1a1a2e] border cyber-border-field text-gray-300 rounded" />
        <select name="valueType" className="px-3 py-2 bg-[#1a1a2e] border cyber-border-field text-gray-300 rounded">
          <option value="string">string</option>
          <option value="int">int</option>
          <option value="bool">bool</option>
          <option value="json">json</option>
        </select>
        <button className="px-4 py-2 bg-[#0ff] text-[#1a1a2e] font-bold rounded">Ekle</button>
      </form>

      <div className="space-y-2">
        {settings.map((s) => (
          <form key={s.key} action={save} className="cyber-card flex gap-2 items-center">
            <input type="hidden" name="key" value={s.key} />
            <input type="hidden" name="valueType" value={s.valueType} />
            <span className="font-mono text-sm text-[#0ff] w-48 truncate">{s.key}</span>
            <input
              name="value"
              defaultValue={s.value ?? ""}
              className="flex-1 px-3 py-1 bg-[#1a1a2e] border cyber-border-field text-gray-300 rounded text-sm"
            />
            <span className="text-xs text-gray-500 w-16">{s.valueType}</span>
            <button className="px-3 py-1 border border-[#0ff] text-[#0ff] rounded text-xs">Kaydet</button>
            <button
              formAction={del}
              className="px-3 py-1 border border-[#ff2b9d] text-[#ff2b9d] rounded text-xs"
            >
              Sil
            </button>
          </form>
        ))}
      </div>
    </div>
  );
}
