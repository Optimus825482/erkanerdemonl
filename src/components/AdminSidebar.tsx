"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "Gösterge Paneli" },
  { href: "/admin/about", label: "Hakkımda" },
  { href: "/admin/projects", label: "Projeler" },
  { href: "/admin/articles", label: "Yazılar" },
  { href: "/admin/faq", label: "SSS" },
  { href: "/admin/messages", label: "Mesajlar" },
  { href: "/admin/newsletter", label: "Bülten" },
  { href: "/admin/settings", label: "Ayarlar" },
];

export default function AdminSidebar({
  username,
}: {
  username: string;
}) {
  const path = usePathname();
  return (
    <aside className="w-64 bg-[#1a1a2e] border-r border-[#0ff]/20 p-6 min-h-screen">
      <h2 className="cyber-heading text-xl font-bold text-[#0ff] mb-2">Admin</h2>
      <p className="text-xs text-gray-500 mb-6">{username}</p>
      <nav className="space-y-1">
        {links.map((l) => {
          const active = path === l.href || (l.href !== "/admin" && path.startsWith(l.href));
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`block px-3 py-2 rounded text-sm transition-colors ${
                active ? "bg-[#0ff]/10 text-[#0ff]" : "text-gray-300 hover:bg-[#0ff]/5"
              }`}
            >
              {l.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
