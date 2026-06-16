export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-black mt-24">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Logo + tagline */}
          <div className="md:col-span-5">
            <Link
              href="/"
              className="font-mono text-lg font-semibold flex items-center gap-2"
            >
              <span className="inline-block w-3 h-3 bg-[#e63946]" />
              <span>Erkan Erdem</span>
            </Link>
            <p className="text-sm text-black/60 mt-3 max-w-sm leading-relaxed">
              Fullstack Developer & Veteriner Hekim. Web, yapay zeka ve
              teknoloji üzerine çalışıyorum.
            </p>
          </div>

          {/* Spacer */}
          <div className="md:col-span-2" />

          {/* Navigation */}
          <div className="md:col-span-2">
            <h4 className="label mb-3">Sitemap</h4>
            <ul className="space-y-2 font-mono text-sm">
              <li>
                <Link
                  href="/hakkimda"
                  className="hover:text-[#e63946] transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/projeler"
                  className="hover:text-[#e63946] transition-colors"
                >
                  Work
                </Link>
              </li>
              <li>
                <Link
                  href="/yazilar"
                  className="hover:text-[#e63946] transition-colors"
                >
                  Writing
                </Link>
              </li>
              <li>
                <Link
                  href="/iletisim"
                  className="hover:text-[#e63946] transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h4 className="label mb-3">Contact</h4>
            <ul className="space-y-2 font-mono text-sm">
              <li>
                <a
                  href="mailto:info@erkanerdem.online"
                  className="hover:text-[#e63946] transition-colors"
                >
                  info@erkanerdem.online
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Optimus825482"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#e63946] transition-colors"
                >
                  GitHub ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-black/10 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 font-mono text-xs text-black/50">
          <span>
            © {year} Erkan Erdem. All rights reserved.
          </span>
          <span>Built with Next.js + Tailwind. Designed in Swiss style.</span>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
