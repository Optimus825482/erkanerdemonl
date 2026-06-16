import Link from "next/link";

interface BaseCardProps {
  index: string;
  category: string;
  title: string;
  description: string;
  date?: string;
  href?: string;
  tags?: string[];
  thumbnail?: string;
  featured?: boolean;
}

const COLOR_MAP: Record<string, { text: string; dot: string }> = {
  cyan: { text: "text-cyan-400", dot: "bg-cyan-400" },
  fuchsia: { text: "text-[var(--accent)]", dot: "bg-[var(--accent)]" },
  magenta: { text: "text-[var(--accent)]", dot: "bg-[var(--accent)]" },
  green: { text: "text-emerald-400", dot: "bg-emerald-400" },
  yellow: { text: "text-yellow-400", dot: "bg-yellow-400" },
  default: { text: "text-foreground", dot: "bg-foreground" },
};

function colorForCategory(category: string): {
  text: string;
  dot: string;
} {
  const c = category.toLowerCase();
  if (c === "vet" || c === "biyoloji") return COLOR_MAP.green!;
  if (c === "ai" || c === "ml") return COLOR_MAP.fuchsia!;
  if (c === "music" || c === "müzik") return COLOR_MAP.cyan!;
  if (c === "web") return COLOR_MAP.cyan!;
  if (c === "fullstack") return COLOR_MAP.cyan!;
  if (c === "data") return COLOR_MAP.yellow!;
  return COLOR_MAP.default!;
}

export default function ContentCard({
  index,
  category,
  title,
  description,
  date,
  href,
  tags,
  thumbnail,
  featured = false,
}: BaseCardProps) {
  const c = colorForCategory(category);
  const content = (
    <article className="group h-full border border-foreground/15 hover:border-foreground bg-background transition-colors flex flex-col">
      {/* Thumbnail */}
      {thumbnail && (
        <div className="relative w-full aspect-video overflow-hidden border-b border-foreground/15">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
          />
        </div>
      )}

      <div className="flex flex-col flex-1 p-5 sm:p-6">
        {/* Header: index + category */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-foreground/10">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            {index}
          </span>
          <span
            className={`font-mono text-[10px] uppercase tracking-widest ${c.text}`}
          >
            {category}
          </span>
        </div>

        {/* Title */}
        <h3
          className={`font-display font-semibold tracking-tight mb-3 group-hover:text-[var(--accent)] transition-colors ${
            featured
              ? "text-2xl sm:text-3xl lg:text-4xl"
              : "text-lg sm:text-xl"
          }`}
        >
          {title}
        </h3>

        {/* Description */}
        <p
          className={`text-muted-foreground leading-relaxed mb-4 flex-1 ${
            featured
              ? "text-sm sm:text-base line-clamp-4 lg:line-clamp-6"
              : "text-sm line-clamp-3"
          }`}
        >
          {description}
        </p>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 border border-foreground/15 text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer: date + arrow */}
        <div className="flex items-center justify-between pt-3 border-t border-foreground/10">
          {date ? (
            <span className="font-mono text-[10px] text-muted-foreground">
              {date}
            </span>
          ) : (
            <span />
          )}
          {href && (
            <span className="font-mono text-xs text-muted-foreground group-hover:text-foreground transition-colors">
              {`[ok]`} →
            </span>
          )}
        </div>
      </div>
    </article>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full">
        {content}
      </Link>
    );
  }
  return content;
}
