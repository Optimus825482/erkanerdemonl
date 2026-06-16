"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Props = {
  titles: string[];
  images: string[];
  intervalMs?: number;
};

export default function HeroCarousel({ titles, images, intervalMs = 2500 }: Props) {
  const [idx, setIdx] = useState(0);
  const n = Math.min(titles.length, images.length);
  if (n === 0) return null;

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % n), intervalMs);
    return () => clearInterval(t);
  }, [n, intervalMs]);

  return (
    <div className="cyber-panel relative overflow-hidden h-[80px] md:h-[100px] flex items-center justify-center">
      {titles.map((title, i) => (
        <h1
          key={i}
          className={`cyber-heading absolute inset-0 flex items-center justify-center text-2xl md:text-4xl font-bold transition-all duration-1000 px-4 text-center ${
            i === idx
              ? "opacity-100 translate-y-0 blur-none"
              : "opacity-0 translate-y-8 blur-md"
          }`}
          style={{
            background: "linear-gradient(45deg, var(--neon-blue), var(--neon-pink))",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {title}
        </h1>
      ))}
    </div>
  );
}

export function HeroImageStack({ images, intervalMs = 2500 }: { images: string[]; intervalMs?: number }) {
  const [idx, setIdx] = useState(0);
  const n = images.length;
  if (n === 0) return null;

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % n), intervalMs);
    return () => clearInterval(t);
  }, [n, intervalMs]);

  return (
    <div className="cyber-frame relative w-full" style={{ height: 450 }}>
      {images.map((src, i) => (
        <Image
          key={i}
          src={src}
          alt={`Slide ${i + 1}`}
          width={500}
          height={450}
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ${
            i === idx ? "opacity-100 scale-100 blur-none" : "opacity-0 scale-95 blur-md"
          }`}
          style={{ objectFit: "contain", maxWidth: "calc(100% - 3rem)", maxHeight: "calc(100% - 3rem)" }}
        />
      ))}
    </div>
  );
}
