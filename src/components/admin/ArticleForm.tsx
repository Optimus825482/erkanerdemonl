"use client";

import { useTransition } from "react";
import Link from "next/link";
import { saveArticle } from "@/lib/admin-actions";
import toast from "react-hot-toast";

type Props = {
  article?: {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    category: string;
    tags: unknown;
    thumbnailImage: string;
    readingTime: number;
    authorName: string;
    isPublished: boolean;
    isFeatured: boolean;
  };
};

export default function ArticleForm({ article }: Props) {
  const [pending, start] = useTransition();
  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="cyber-heading text-xl text-[#ff2b9d]">
          {article ? "Yazıyı Düzenle" : "Yeni Yazı"}
        </h2>
        <Link href="/admin/articles" className="text-sm text-gray-400 hover:text-[#ff2b9d]">
          ← Listeye Dön
        </Link>
      </div>
      <form
        action={(fd) =>
          start(async () => {
            try {
              await saveArticle(fd);
              toast.success("Kaydedildi");
            } catch (e: unknown) {
              toast.error("Hata: " + (e instanceof Error ? e.message : "?"));
            }
          })
        }
        className="cyber-glass-light p-6 rounded-xl space-y-4"
      >
        {article && <input type="hidden" name="id" value={article.id} />}
        <div>
          <label className="block text-sm text-gray-300 mb-1">Başlık</label>
          <input
            name="title"
            required
            defaultValue={article?.title}
            className="w-full px-3 py-2 bg-[#1a1a2e] border cyber-border-field text-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">Slug</label>
          <input
            name="slug"
            defaultValue={article?.slug}
            placeholder="otomatik üretilir"
            className="w-full px-3 py-2 bg-[#1a1a2e] border cyber-border-field text-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">Özet</label>
          <textarea
            name="excerpt"
            required
            rows={2}
            defaultValue={article?.excerpt}
            className="w-full px-3 py-2 bg-[#1a1a2e] border cyber-border-field text-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">İçerik</label>
          <textarea
            name="content"
            required
            rows={10}
            defaultValue={article?.content}
            className="w-full px-3 py-2 bg-[#1a1a2e] border cyber-border-field text-gray-300 rounded"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Kategori</label>
            <input
              name="category"
              defaultValue={article?.category ?? "ai"}
              className="w-full px-3 py-2 bg-[#1a1a2e] border cyber-border-field text-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Okuma Süresi (dk)</label>
            <input
              name="readingTime"
              type="number"
              defaultValue={article?.readingTime ?? 5}
              className="w-full px-3 py-2 bg-[#1a1a2e] border cyber-border-field text-gray-300 rounded"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">Etiketler (virgülle)</label>
          <input
            name="tags"
            defaultValue={(article?.tags as string[] | null)?.join(", ") ?? ""}
            className="w-full px-3 py-2 bg-[#1a1a2e] border cyber-border-field text-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">Kapak Görseli URL</label>
          <input
            name="thumbnailImage"
            required
            defaultValue={article?.thumbnailImage ?? ""}
            className="w-full px-3 py-2 bg-[#1a1a2e] border cyber-border-field text-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">Yazar</label>
          <input
            name="authorName"
            defaultValue={article?.authorName ?? "Erkan Erdem"}
            className="w-full px-3 py-2 bg-[#1a1a2e] border cyber-border-field text-gray-300 rounded"
          />
        </div>
        <div className="flex items-center gap-4">
          <label className="text-sm text-gray-300 flex items-center gap-2">
            <input type="checkbox" name="isFeatured" defaultChecked={!!article?.isFeatured} /> Öne Çıkan
          </label>
          <label className="text-sm text-gray-300 flex items-center gap-2">
            <input type="checkbox" name="isPublished" defaultChecked={article?.isPublished ?? true} /> Yayında
          </label>
        </div>
        <div className="flex justify-end gap-2 pt-4">
          <Link href="/admin/articles" className="px-4 py-2 border border-gray-500 text-gray-300 rounded">
            İptal
          </Link>
          <button
            type="submit"
            disabled={pending}
            className="px-4 py-2 bg-[#ff2b9d] text-[#1a1a2e] font-bold rounded disabled:opacity-50"
          >
            {pending ? "..." : "Kaydet"}
          </button>
        </div>
      </form>
    </div>
  );
}
