"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const navLinks: ReadonlyArray<{ href: string; label: string }> = [
  { href: "/", label: "ANA SAYFA" },
  { href: "/hakkimda", label: "HAKKIMDA" },
  { href: "/projeler", label: "PROJELER" },
  { href: "/yazilar", label: "YAZILAR" },
  { href: "/iletisim", label: "İLETİŞİM" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isActive = (href: string): boolean => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
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
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled || mobileOpen
            ? "bg-[#0a0a0f]/90 backdrop-blur-lg border-b border-[#0ff]/20"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-8 sm:px-10 lg:px-12">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="font-orbitron text-lg sm:text-xl font-bold text-cyan-400 hover:text-cyan-300 transition-colors pl-1"
              aria-label="Ana sayfa"
            >
              <span className="neon-glow-cyan">erkanerdem</span>
              <span className="text-fuchsia-500">.online</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-2 lg:gap-5 xl:gap-7 pr-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link font-tech text-xs lg:text-sm whitespace-nowrap ${
                    isActive(link.href) ? "active" : ""
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile Toggle */}
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden p-3 -mr-2 text-cyan-400 hover:text-cyan-300 transition-colors"
              aria-label={mobileOpen ? "Menüyü kapat" : "Menüyü aç"}
              aria-expanded={mobileOpen}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu — full screen overlay */}
      <div
        id="mobile-menu"
        className={`md:hidden fixed inset-0 z-40 bg-[#0a0a0f]/95 backdrop-blur-lg transition-opacity duration-300 ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{ paddingTop: "4rem" }}
      >
        <div className="flex flex-col items-center justify-center min-h-full px-6 space-y-6">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`font-orbitron text-2xl sm:text-3xl font-bold tracking-wider transition-all duration-300 ${
                isActive(link.href)
                  ? "text-cyan-400 neon-glow-cyan"
                  : "text-gray-300 hover:text-cyan-400"
              }`}
              style={{
                animation: mobileOpen
                  ? `fadeIn 0.4s ease-out ${i * 0.05}s both`
                  : undefined,
              }}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-8 text-center">
            <p className="font-tech text-xs text-gray-500">
              <span className="text-cyan-400 pulse">[ SYSTEM ONLINE ]</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
