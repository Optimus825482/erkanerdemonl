"use client";

import { useEffect } from "react";

/**
 * Sayfa yüklendiğinde ve scroll sırasında `.reveal` ve `.reveal-stagger`
 * elementlerini görünür yapar. Server componentlerde kullanılabilmesi için
 * client-side observer.
 */
export default function RevealOnScroll() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(
      ".reveal, .reveal-stagger",
    );

    const isInViewport = (el: HTMLElement): boolean => {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      return rect.top < windowHeight && rect.bottom > 0;
    };

    // İlk görünür elementleri hemen aktifle
    elements.forEach((el) => {
      if (isInViewport(el)) el.classList.add("active");
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}
