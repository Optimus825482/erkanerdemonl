import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  slug: string;
  title: string;
  description: string;
  image: string;
  date: string;
  category: string;
  color: "cyan" | "pink";
}

export default function BlogCard({
  slug,
  title,
  description,
  image,
  date,
  category,
  color,
}: BlogCardProps) {
  const colorClass = color === "cyan" ? "text-[#0ff]" : "text-[#ff2b9d]";
  const categoryColorClass =
    color === "cyan" ? "text-[#0ff]" : "text-[#ff2b9d]";

  return (
    <Link
      href={`/yazilar/${slug}`}
      className="cyber-card block transition-transform"
    >
      <div className="flex gap-6 flex-col md:flex-row">
        {/* Görsel */}
        <div className="relative w-full md:w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 192px"
          />
        </div>

        {/* İçerik */}
        <div className="flex-1">
          <div className="flex justify-between items-start mb-2 flex-col md:flex-row gap-2">
            <h2
              className={`cyber-heading text-2xl font-semibold ${colorClass}`}
            >
              {title}
            </h2>
            <span className="text-sm text-gray-400 whitespace-nowrap">
              {date}
            </span>
          </div>
          <p className="text-gray-300 mb-4">{description}</p>
          <span
            className={`inline-block px-3 py-1 bg-[#1a1a2e] ${categoryColorClass} text-sm rounded`}
          >
            {category}
          </span>
        </div>
      </div>
    </Link>
  );
}
