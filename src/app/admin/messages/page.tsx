import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/actions";
import { markMessageRead, markMessageReplied, deleteMessage } from "@/lib/admin-actions";
import { fmtDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminMessages() {
  await requireAdmin();
  const messages = await prisma.contactMessage.findMany({
    orderBy: [{ isRead: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div>
      <h2 className="cyber-heading text-xl text-[#ffff00] mb-6">Mesajlar ({messages.length})</h2>
      <div className="space-y-3">
        {messages.length === 0 && <p className="text-gray-400">Henüz mesaj yok.</p>}
        {messages.map((m) => (
          <div key={m.id} className="cyber-card">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="cyber-heading text-[#0ff]">{m.name}</span>
                  <span className="text-sm text-gray-400">{m.email}</span>
                  <span className="text-xs text-gray-500">{fmtDate(m.createdAt)}</span>
                  {!m.isRead && <span className="px-2 py-0.5 bg-[#ff2b9d] text-white text-xs rounded">YENİ</span>}
                  {m.isReplied && <span className="px-2 py-0.5 bg-[#00ff88] text-[#1a1a2e] text-xs rounded">Yanıtlandı</span>}
                </div>
                {m.subject && <div className="text-sm text-[#0ff] mb-1">Konu: {m.subject}</div>}
                <p className="text-gray-300 text-sm whitespace-pre-line">{m.message}</p>
              </div>
              <div className="flex flex-col gap-2 ml-4">
                <MarkReadForm id={m.id} isRead={m.isRead} />
                <MarkRepliedForm id={m.id} isReplied={m.isReplied} />
                <DeleteForm id={m.id} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MarkReadForm({ id, isRead }: { id: number; isRead: boolean }) {
  async function action(fd: FormData) {
    "use server";
    await markMessageRead(fd);
  }
  return (
    <form action={action}>
      <input type="hidden" name="id" value={id} />
      <button className="px-3 py-1 border border-[#0ff] text-[#0ff] rounded text-xs w-full">
        {isRead ? "Okunmadı" : "Okundu"}
      </button>
    </form>
  );
}

function MarkRepliedForm({ id, isReplied }: { id: number; isReplied: boolean }) {
  async function action(fd: FormData) {
    "use server";
    await markMessageReplied(fd);
  }
  return (
    <form action={action}>
      <input type="hidden" name="id" value={id} />
      <button
        disabled={isReplied}
        className="px-3 py-1 border border-[#00ff88] text-[#00ff88] rounded text-xs w-full disabled:opacity-30"
      >
        {isReplied ? "Yanıtlandı" : "Yanıtlandı"}
      </button>
    </form>
  );
}

function DeleteForm({ id }: { id: number }) {
  async function action(fd: FormData) {
    "use server";
    await deleteMessage(fd);
  }
  return (
    <form action={action}>
      <input type="hidden" name="id" value={id} />
      <button className="px-3 py-1 border border-[#ff2b9d] text-[#ff2b9d] rounded text-xs w-full">
        Sil
      </button>
    </form>
  );
}
