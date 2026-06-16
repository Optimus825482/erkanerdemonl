import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/actions";
import { deleteProject } from "@/lib/admin-actions";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminProjects() {
  await requireAdmin();
  const projects = await prisma.project.findMany({
    orderBy: { displayOrder: "asc" },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="cyber-heading text-xl text-[#0ff]">Projeler ({projects.length})</h2>
        <Link
          href="/admin/projects/new"
          className="px-4 py-2 bg-[#0ff] text-[#1a1a2e] font-bold rounded"
        >
          Yeni Proje
        </Link>
      </div>

      <div className="space-y-3">
        {projects.map((p) => (
          <div key={p.id} className="cyber-card flex justify-between items-center">
            <div>
              <div className="cyber-heading text-[#0ff]">{p.title}</div>
              <div className="text-xs text-gray-400">
                {p.category} • /{p.slug} {p.isPublished ? "✓" : "✗"}
              </div>
            </div>
            <div className="flex gap-2">
              <Link
                href={`/admin/projects/${p.id}/edit`}
                className="px-3 py-1 border border-[#0ff] text-[#0ff] rounded text-sm"
              >
                Düzenle
              </Link>
              <form
                action={async (fd) => {
                  "use server";
                  await deleteProject(fd);
                }}
              >
                <input type="hidden" name="id" value={p.id} />
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
