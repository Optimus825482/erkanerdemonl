import { requireAdmin } from "@/lib/actions";
import { getAbout } from "@/lib/queries";
import { saveAbout } from "@/lib/admin-actions";
import ImageUploader from "@/components/admin/ImageUploader";

export const dynamic = "force-dynamic";

export default async function AdminAboutPage() {
  await requireAdmin();
  const about = await getAbout();

  return (
    <div>
      <h2 className="cyber-heading text-xl text-[#0ff] mb-6">Hakkımda</h2>
      <form action={saveAbout} className="cyber-glass-light p-6 rounded-xl space-y-4 max-w-3xl">
        <div>
          <label className="block text-sm text-gray-300 mb-1">Ad Soyad</label>
          <input
            name="fullName"
            required
            defaultValue={about?.fullName}
            className="w-full px-3 py-2 bg-[#1a1a2e] border cyber-border-field text-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">Ünvan</label>
          <input
            name="title"
            required
            defaultValue={about?.title}
            className="w-full px-3 py-2 bg-[#1a1a2e] border cyber-border-field text-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">Kısa Biyografi</label>
          <textarea
            name="shortBio"
            required
            rows={3}
            defaultValue={about?.shortBio ?? ""}
            className="w-full px-3 py-2 bg-[#1a1a2e] border cyber-border-field text-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">Yaklaşım</label>
          <textarea
            name="yaklasim"
            required
            rows={4}
            defaultValue={about?.yaklasim ?? ""}
            className="w-full px-3 py-2 bg-[#1a1a2e] border cyber-border-field text-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">Felsefe</label>
          <textarea
            name="felsefe"
            required
            rows={4}
            defaultValue={about?.felsefe ?? ""}
            className="w-full px-3 py-2 bg-[#1a1a2e] border cyber-border-field text-gray-300 rounded"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">E-posta</label>
            <input
              name="email"
              type="email"
              required
              defaultValue={about?.email}
              className="w-full px-3 py-2 bg-[#1a1a2e] border cyber-border-field text-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Web Sitesi</label>
            <input
              name="website"
              defaultValue={about?.website ?? ""}
              className="w-full px-3 py-2 bg-[#1a1a2e] border cyber-border-field text-gray-300 rounded"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">Konum</label>
          <input
            name="location"
            defaultValue={about?.location ?? ""}
            className="w-full px-3 py-2 bg-[#1a1a2e] border cyber-border-field text-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-2">
            Profil Görseli
          </label>
          <ImageUploader
            name="profileImage"
            defaultValue={about?.profileImage ?? "/images/erkanerdem.png"}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">GitHub</label>
            <input
              name="socialGithub"
              defaultValue={about?.socialGithub ?? ""}
              className="w-full px-3 py-2 bg-[#1a1a2e] border cyber-border-field text-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">LinkedIn</label>
            <input
              name="socialLinkedin"
              defaultValue={about?.socialLinkedin ?? ""}
              className="w-full px-3 py-2 bg-[#1a1a2e] border cyber-border-field text-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Twitter</label>
            <input
              name="socialTwitter"
              defaultValue={about?.socialTwitter ?? ""}
              className="w-full px-3 py-2 bg-[#1a1a2e] border cyber-border-field text-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Instagram</label>
            <input
              name="socialInstagram"
              defaultValue={about?.socialInstagram ?? ""}
              className="w-full px-3 py-2 bg-[#1a1a2e] border cyber-border-field text-gray-300 rounded"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">
            Hero Başlıkları (her satır bir başlık)
          </label>
          <textarea
            name="heroTitles"
            rows={4}
            defaultValue={((about?.heroTitles as string[] | null) ?? []).join("\n")}
            className="w-full px-3 py-2 bg-[#1a1a2e] border cyber-border-field text-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">
            Hero Görselleri (her satır bir URL)
          </label>
          <textarea
            name="heroImages"
            rows={4}
            defaultValue={((about?.heroImages as string[] | null) ?? []).join("\n")}
            className="w-full px-3 py-2 bg-[#1a1a2e] border cyber-border-field text-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">
            Etiketler (her satır bir etiket)
          </label>
          <textarea
            name="tags"
            rows={3}
            defaultValue={((about?.tags as string[] | null) ?? []).join("\n")}
            className="w-full px-3 py-2 bg-[#1a1a2e] border cyber-border-field text-gray-300 rounded"
          />
        </div>
        <button className="px-4 py-2 bg-[#0ff] text-[#1a1a2e] font-bold rounded">
          Kaydet
        </button>
      </form>
    </div>
  );
}
