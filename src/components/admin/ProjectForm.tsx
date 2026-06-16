"use client";

import { useTransition } from "react";
import Link from "next/link";
import { saveProject } from "@/lib/admin-actions";
import toast from "react-hot-toast";

type ProjectFormProps = {
  project?: {
    id: number;
    title: string;
    slug: string;
    description: string;
    longDescription: string | null;
    category: string;
    technologies: unknown;
    thumbnailImage: string;
    githubUrl: string | null;
    liveUrl: string | null;
    status: string;
    displayOrder: number;
    isFeatured: boolean;
    isPublished: boolean;
  };
};

export default function ProjectForm({ project }: ProjectFormProps) {
  const [pending, start] = useTransition();

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="cyber-heading text-xl text-[#0ff]">
          {project ? "Projeyi Düzenle" : "Yeni Proje"}
        </h2>
        <Link href="/admin/projects" className="text-sm text-gray-400 hover:text-[#0ff]">
          ← Listeye Dön
        </Link>
      </div>
      <form
        action={(fd) =>
          start(async () => {
            try {
              await saveProject(fd);
              toast.success("Kaydedildi");
            } catch (e: unknown) {
              const msg = e instanceof Error ? e.message : "Bilinmeyen hata";
              toast.error("Hata: " + msg);
            }
          })
        }
        className="cyber-glass-light p-6 rounded-xl space-y-4"
      >
        {project && <input type="hidden" name="id" value={project.id} />}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-300 mb-1">Başlık</label>
            <input
              name="title"
              required
              defaultValue={project?.title}
              className="w-full px-3 py-2 bg-[#1a1a2e] border cyber-border-field text-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Slug</label>
            <input
              name="slug"
              defaultValue={project?.slug}
              placeholder="otomatik üretilir"
              className="w-full px-3 py-2 bg-[#1a1a2e] border cyber-border-field text-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Kategori</label>
            <input
              name="category"
              defaultValue={project?.category ?? "web"}
              className="w-full px-3 py-2 bg-[#1a1a2e] border cyber-border-field text-gray-300 rounded"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-300 mb-1">Kısa Açıklama</label>
            <textarea
              name="description"
              required
              rows={3}
              defaultValue={project?.description}
              className="w-full px-3 py-2 bg-[#1a1a2e] border cyber-border-field text-gray-300 rounded"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-300 mb-1">Uzun Açıklama</label>
            <textarea
              name="longDescription"
              rows={6}
              defaultValue={project?.longDescription ?? ""}
              className="w-full px-3 py-2 bg-[#1a1a2e] border cyber-border-field text-gray-300 rounded"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-300 mb-1">Teknolojiler (virgülle)</label>
            <input
              name="technologies"
              defaultValue={(project?.technologies as string[] | null)?.join(", ") ?? ""}
              className="w-full px-3 py-2 bg-[#1a1a2e] border cyber-border-field text-gray-300 rounded"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-300 mb-1">Kapak Görseli URL</label>
            <input
              name="thumbnailImage"
              required
              defaultValue={project?.thumbnailImage ?? ""}
              className="w-full px-3 py-2 bg-[#1a1a2e] border cyber-border-field text-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">GitHub URL</label>
            <input
              name="githubUrl"
              defaultValue={project?.githubUrl ?? ""}
              className="w-full px-3 py-2 bg-[#1a1a2e] border cyber-border-field text-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Canlı URL</label>
            <input
              name="liveUrl"
              defaultValue={project?.liveUrl ?? ""}
              className="w-full px-3 py-2 bg-[#1a1a2e] border cyber-border-field text-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Durum</label>
            <input
              name="status"
              defaultValue={project?.status ?? "active"}
              className="w-full px-3 py-2 bg-[#1a1a2e] border cyber-border-field text-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Sıra</label>
            <input
              name="displayOrder"
              type="number"
              defaultValue={project?.displayOrder ?? 0}
              className="w-full px-3 py-2 bg-[#1a1a2e] border cyber-border-field text-gray-300 rounded"
            />
          </div>
          <div className="flex items-center gap-4 md:col-span-2">
            <label className="text-sm text-gray-300 flex items-center gap-2">
              <input type="checkbox" name="isFeatured" defaultChecked={!!project?.isFeatured} /> Öne Çıkan
            </label>
            <label className="text-sm text-gray-300 flex items-center gap-2">
              <input type="checkbox" name="isPublished" defaultChecked={project?.isPublished ?? true} /> Yayında
            </label>
          </div>
        </div>
        <div className="flex justify-end gap-2 pt-4">
          <Link href="/admin/projects" className="px-4 py-2 border border-gray-500 text-gray-300 rounded">
            İptal
          </Link>
          <button
            type="submit"
            disabled={pending}
            className="px-4 py-2 bg-[#0ff] text-[#1a1a2e] font-bold rounded disabled:opacity-50"
          >
            {pending ? "..." : "Kaydet"}
          </button>
        </div>
      </form>
    </div>
  );
}
