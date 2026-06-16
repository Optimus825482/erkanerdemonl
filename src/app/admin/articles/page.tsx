import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/actions";
import { deleteArticle } from "@/lib/admin-actions";
import Link from "next/link";
import { fmtDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminArticles() {
  await requireAdmin();
  const articles = await prisma.article.findMany({ orderBy: { displayOrder: "asc" } });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="cyber-heading text-xl text-[#ff2b9d]">Yazılar ({articles.length})</h2>
        <Link
          href="/admin/articles/new"
          className="px-4 py-2 bg-[#ff2b9d] text-[#1a1a2e] font-bold rounded"
        >
          Yeni Yazı
        </Link>
      </div>

      <div className="space-y-3">
        {articles.map((a) => (
          <div key={a.id} className="cyber-card flex justify-between items-center">
            <div>
              <div className="cyber-heading text-[#ff2b9d]">{a.title}</div>
              <div className="text-xs text-gray-400">
                {a.category} • {fmtDate(a.publishedAt)} {a.isPublished ? "✓" : "✗"}
              </div>
            </div>
            <div className="flex gap-2">
              <Link
                href={`/admin/articles/${a.id}/edit`}
                className="px-3 py-1 border border-[#0ff] text-[#0ff] rounded text-sm"
              >
                Düzenle
              </Link>
              <form
                action={async (fd) => {
                  "use server";
                  await deleteArticle(fd);
                }}
              >
                <input type="hidden" name="id" value={a.id} />
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
