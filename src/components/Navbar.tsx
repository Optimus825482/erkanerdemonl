"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const navLinks: ReadonlyArray<{ href: string; label: string; index: string }> = [
  { href: "/", label: "Index", index: "00" },
  { href: "/hakkimda", label: "About", index: "01" },
  { href: "/projeler", label: "Work", index: "02" },
  { href: "/yazilar", label: "Writing", index: "03" },
  { href: "/iletisim", label: "Contact", index: "04" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string): boolean => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 bg-white border-b border-black transition-shadow ${
          scrolled ? "shadow-[0_1px_0_0_rgba(0,0,0,1)]" : ""
        }`}
      >
        <div className="container">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/"
              className="font-mono text-sm font-semibold tracking-tight flex items-center gap-2"
              aria-label="Ana sayfa"
            >
              <span className="inline-block w-3 h-3 bg-[#e63946]" />
              <span>Erkan Erdem</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center">
              {navLinks.map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-mono text-xs uppercase tracking-wider px-4 py-5 border-l border-black/10 last:border-r ${
                    isActive(link.href)
                      ? "text-[#e63946] font-semibold"
                      : "text-black hover:text-[#e63946] transition-colors"
                  }`}
                >
                  <span className="text-black/40 mr-2">{link.index}</span>
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Mobile toggle */}
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden p-2 -mr-2"
              aria-label={mobileOpen ? "Menüyü kapat" : "Menüyü aç"}
              aria-expanded={mobileOpen}
            >
              <div className="w-6 h-4 flex flex-col justify-between">
                <span
                  className={`block w-full h-px bg-black transition-transform ${
                    mobileOpen ? "rotate-45 translate-y-1.5" : ""
                  }`}
                />
                <span
                  className={`block w-full h-px bg-black transition-opacity ${
                    mobileOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block w-full h-px bg-black transition-transform ${
                    mobileOpen ? "-rotate-45 -translate-y-1.5" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`md:hidden fixed inset-0 z-40 bg-white transition-opacity duration-200 ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{ paddingTop: "4rem" }}
      >
        <nav className="flex flex-col">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`font-mono text-sm uppercase tracking-wider px-6 py-5 border-b border-black/10 flex justify-between ${
                isActive(link.href) ? "text-[#e63946]" : "text-black"
              }`}
            >
              <span className="text-black/40 text-xs">{link.index}</span>
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
