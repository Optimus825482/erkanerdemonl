import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/actions";
import { deleteVideo } from "@/lib/admin-actions";
import Link from "next/link";
import { fmtDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminVideos() {
  await requireAdmin();
  const videos = await prisma.video.findMany({ orderBy: { displayOrder: "asc" } });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="cyber-heading text-xl text-[#0ff]">Videolar ({videos.length})</h2>
        <Link
          href="/admin/videos/new"
          className="px-4 py-2 bg-[#0ff] text-[#1a1a2e] font-bold rounded"
        >
          Yeni Video
        </Link>
      </div>
      <div className="space-y-3">
        {videos.map((v) => (
          <div key={v.id} className="cyber-card flex justify-between items-center">
            <div>
              <div className="cyber-heading text-[#0ff]">{v.title}</div>
              <div className="text-xs text-gray-400">
                {v.category} • {v.duration} • {fmtDate(v.publishedAt)}
              </div>
            </div>
            <div className="flex gap-2">
              <Link href={`/admin/videos/${v.id}/edit`} className="px-3 py-1 border border-[#0ff] text-[#0ff] rounded text-sm">
                Düzenle
              </Link>
              <form
                action={async (fd) => {
                  "use server";
                  await deleteVideo(fd);
                }}
              >
                <input type="hidden" name="id" value={v.id} />
                <button className="px-3 py-1 border border-[#ff2b9d] text-[#ff2b9d] rounded text-sm">
                  Sil
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
