"use client";

import { useState, useTransition } from "react";
import { uploadImage } from "@/lib/admin-actions";

interface ImageUploaderProps {
  name: string;
  defaultValue: string;
  label?: string;
}

export default function ImageUploader({
  name,
  defaultValue,
  label = "Görsel yükle",
}: ImageUploaderProps) {
  const [preview, setPreview] = useState<string>(defaultValue);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Optimistik yerel önizleme
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (typeof ev.target?.result === "string") {
        setPreview(ev.target.result);
      }
    };
    reader.readAsDataURL(file);

    setUploading(true);
    setError(null);

    const fd = new FormData();
    fd.append("file", file);

    startTransition(async () => {
      const result = await uploadImage(fd);
      setUploading(false);
      if (result.ok) {
        setPreview(result.url);
      } else {
        setError(result.error);
        setPreview(defaultValue);
      }
    });
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-4">
        <div className="relative w-32 h-32 rounded-lg overflow-hidden border-2 border-[#0ff]/30 bg-[#0a0a0f] flex-shrink-0">
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={preview}
              alt="Profil önizleme"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-600 text-xs">
              Görsel yok
            </div>
          )}
          {uploading && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center text-[#0ff] text-xs">
              Yükleniyor...
            </div>
          )}
        </div>
        <div className="flex-1 space-y-2">
          <label className="block">
            <span className="sr-only">{label}</span>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
              onChange={handleFileChange}
              disabled={uploading}
              className="block w-full text-sm text-gray-300
                file:mr-3 file:py-2 file:px-4
                file:rounded file:border-0
                file:text-sm file:font-semibold
                file:bg-[#0ff] file:text-[#0a0a0f]
                hover:file:bg-[#00d4d8]
                file:cursor-pointer
                cursor-pointer
                disabled:opacity-50"
            />
          </label>
          <p className="font-tech text-xs text-gray-500">
            JPEG, PNG, WebP, GIF veya SVG. Maks 5MB.
          </p>
          {error && (
            <p className="font-tech text-xs text-[#ff2b9d]">{error}</p>
          )}
        </div>
      </div>

      {/* Hidden input — form submit'le birlikte gönderilir */}
      <input type="hidden" name={name} value={preview} />

      {/* Manuel URL girişi opsiyonu */}
      <details className="text-xs text-gray-500">
        <summary className="cursor-pointer hover:text-[#0ff] transition-colors">
          veya URL yapıştır
        </summary>
        <input
          type="text"
          value={preview}
          onChange={(e) => setPreview(e.target.value)}
          placeholder="/images/photo.jpg veya https://..."
          className="w-full mt-2 px-3 py-2 bg-[#1a1a2e] border border-[#0ff]/20 text-gray-300 rounded font-tech text-xs"
        />
      </details>
    </div>
  );
}
