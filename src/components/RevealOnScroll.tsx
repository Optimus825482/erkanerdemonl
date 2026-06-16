"use client";

import { useEffect } from "react";

/**
 * `.reveal` ve `.reveal-stagger` elementlerini viewport'ta aktif eder.
 * Reduced motion durumunda zaten CSS tarafında bypass edilir.
 */
export default function RevealOnScroll() {
  useEffect(() => {
    const all = document.querySelectorAll<HTMLElement>(
      ".reveal, .reveal-stagger",
    );

    const isInViewport = (el: HTMLElement): boolean => {
      const rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    };

    // İlk görünür olanları hemen aktifle
    all.forEach((el) => {
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
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" },
    );

    all.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
