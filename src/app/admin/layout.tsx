import { getCurrentUser, logoutAction } from "@/lib/actions";
import AdminSidebar from "@/components/AdminSidebar";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();

  if (!user) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex" style={{ paddingTop: 0 }}>
      <AdminSidebar username={user.username} />
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="cyber-heading text-2xl text-[#0ff]">Admin Paneli</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">{user.email}</span>
            <form action={logoutAction}>
              <button className="px-3 py-1 border border-[#ff2b9d] text-[#ff2b9d] rounded text-sm hover:bg-[#ff2b9d] hover:text-[#1a1a2e]">
                Çıkış
              </button>
            </form>
          </div>
        </div>
        {children}
      </main>
    </div>
  );
}
