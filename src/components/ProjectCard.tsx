import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  slug: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  color: "cyan" | "pink";
}

export default function ProjectCard({
  slug,
  title,
  description,
  image,
  tags,
  color,
}: ProjectCardProps) {
  const colorClass = color === "cyan" ? "text-[#0ff]" : "text-[#ff2b9d]";
  const tagColorClass = color === "cyan" ? "text-[#0ff]" : "text-[#ff2b9d]";

  return (
    <Link
      href={`/projeler/${slug}`}
      className="cyber-card block transition-transform"
    >
      <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <h2 className={`cyber-heading text-xl font-semibold mb-2 ${colorClass}`}>
        {title}
      </h2>
      <p className="text-gray-300 mb-4">{description}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className={`px-2 py-1 bg-[#1a1a2e] ${tagColorClass} text-sm rounded`}
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
