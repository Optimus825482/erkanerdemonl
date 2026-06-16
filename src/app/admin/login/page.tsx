import { loginAction } from "@/lib/actions";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function AdminLoginPage({ searchParams }: PageProps) {
  const { error } = await searchParams;
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="cyber-glass-light p-8 rounded-xl w-full max-w-md">
        <h1 className="cyber-heading text-3xl font-bold text-center text-[#0ff] mb-6">Admin Girişi</h1>
        {error && (
          <div className="mb-4 p-3 border border-[#ff2b9d] text-[#ff2b9d] text-sm rounded font-tech text-center">
            Kullanıcı adı veya şifre hatalı.
          </div>
        )}
        <form action={loginAction} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Kullanıcı Adı / E-posta</label>
            <input
              name="username"
              type="text"
              required
              className="w-full px-4 py-3 bg-[#1a1a2e] border cyber-border-field text-gray-300 rounded focus:outline-none focus:ring-[#0ff] focus:border-[#0ff]"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Şifre</label>
            <input
              name="password"
              type="password"
              required
              className="w-full px-4 py-3 bg-[#1a1a2e] border cyber-border-field text-gray-300 rounded focus:outline-none focus:ring-[#0ff] focus:border-[#0ff]"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-[#0ff] text-[#1a1a2e] font-bold rounded hover:bg-[#ff2b9d] transition-colors"
          >
            Giriş Yap
          </button>
        </form>
        <p className="text-xs text-gray-500 text-center mt-4">İlk giriş sonrası şifre değişimi zorunludur.</p>
      </div>
    </div>
  );
}
