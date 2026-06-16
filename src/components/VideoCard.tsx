import Image from "next/image";
import Link from "next/link";

interface VideoCardProps {
  slug: string;
  title: string;
  description: string;
  image: string;
  duration: string;
  date: string;
  category: string;
  color: "cyan" | "pink";
}

export default function VideoCard({
  slug,
  title,
  description,
  image,
  duration,
  date,
  category,
  color,
}: VideoCardProps) {
  const colorClass = color === "cyan" ? "text-[#0ff]" : "text-[#ff2b9d]";

  return (
    <Link
      href={`/videolar/${slug}`}
      className="cyber-card block transition-transform"
    >
      {/* Video Thumbnail */}
      <div className="relative mb-4 rounded-lg overflow-hidden">
        <div className="relative w-full h-48">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        {/* Overlay Bilgileri */}
        <div className="absolute bottom-2 right-2 flex gap-2">
          <span className="px-2 py-1 bg-black/70 text-white text-sm rounded">
            {duration}
          </span>
          <span className="px-2 py-1 bg-[#0ff]/20 text-[#0ff] text-sm rounded">
            {category}
          </span>
        </div>
      </div>

      {/* Video Bilgileri */}
      <h2 className={`cyber-heading text-xl font-semibold mb-2 ${colorClass}`}>
        {title}
      </h2>
      <p className="text-gray-300 mb-2">{description}</p>
      <span className="text-sm text-gray-400">{date}</span>
    </Link>
  );
}
