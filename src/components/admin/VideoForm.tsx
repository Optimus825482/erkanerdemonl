"use client";

import { useTransition } from "react";
import Link from "next/link";
import { saveVideo } from "@/lib/admin-actions";
import toast from "react-hot-toast";

type Props = {
  video?: {
    id: number;
    title: string;
    slug: string;
    description: string;
    longDescription: string | null;
    category: string;
    thumbnailImage: string;
    duration: string;
    videoEmbed: string | null;
    isPublished: boolean;
  };
};

export default function VideoForm({ video }: Props) {
  const [pending, start] = useTransition();
  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="cyber-heading text-xl text-[#0ff]">
          {video ? "Videoyu Düzenle" : "Yeni Video"}
        </h2>
        <Link href="/admin/videos" className="text-sm text-gray-400 hover:text-[#0ff]">← Listeye Dön</Link>
      </div>
      <form
        action={(fd) =>
          start(async () => {
            try {
              await saveVideo(fd);
              toast.success("Kaydedildi");
            } catch (e: unknown) {
              toast.error("Hata: " + (e instanceof Error ? e.message : "?"));
            }
          })
        }
        className="cyber-glass-light p-6 rounded-xl space-y-4"
      >
        {video && <input type="hidden" name="id" value={video.id} />}
        <div>
          <label className="block text-sm text-gray-300 mb-1">Başlık</label>
          <input name="title" required defaultValue={video?.title} className="w-full px-3 py-2 bg-[#1a1a2e] border cyber-border-field text-gray-300 rounded" />
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">Slug</label>
          <input name="slug" defaultValue={video?.slug} placeholder="otomatik" className="w-full px-3 py-2 bg-[#1a1a2e] border cyber-border-field text-gray-300 rounded" />
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">Açıklama</label>
          <textarea name="description" required rows={3} defaultValue={video?.description} className="w-full px-3 py-2 bg-[#1a1a2e] border cyber-border-field text-gray-300 rounded" />
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">Uzun Açıklama</label>
          <textarea name="longDescription" rows={6} defaultValue={video?.longDescription ?? ""} className="w-full px-3 py-2 bg-[#1a1a2e] border cyber-border-field text-gray-300 rounded" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Kategori</label>
            <input name="category" defaultValue={video?.category ?? "Yazılım Eğitimi"} className="w-full px-3 py-2 bg-[#1a1a2e] border cyber-border-field text-gray-300 rounded" />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Süre</label>
            <input name="duration" defaultValue={video?.duration ?? "15:00"} className="w-full px-3 py-2 bg-[#1a1a2e] border cyber-border-field text-gray-300 rounded" />
          </div>
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">Kapak Görseli URL</label>
          <input name="thumbnailImage" defaultValue={video?.thumbnailImage ?? ""} className="w-full px-3 py-2 bg-[#1a1a2e] border cyber-border-field text-gray-300 rounded" />
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">Video Embed (iframe kodu)</label>
          <textarea name="videoEmbed" rows={4} defaultValue={video?.videoEmbed ?? ""} className="w-full px-3 py-2 bg-[#1a1a2e] border cyber-border-field text-gray-300 rounded" />
        </div>
        <div className="flex items-center gap-4">
          <label className="text-sm text-gray-300 flex items-center gap-2">
            <input type="checkbox" name="isPublished" defaultChecked={video?.isPublished ?? true} /> Yayında
          </label>
        </div>
        <div className="flex justify-end gap-2 pt-4">
          <Link href="/admin/videos" className="px-4 py-2 border border-gray-500 text-gray-300 rounded">İptal</Link>
          <button type="submit" disabled={pending} className="px-4 py-2 bg-[#0ff] text-[#1a1a2e] font-bold rounded disabled:opacity-50">
            {pending ? "..." : "Kaydet"}
          </button>
        </div>
      </form>
    </div>
  );
}
