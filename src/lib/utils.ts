/** Turkish-aware slug generator. */
export function slugify(text: string): string {
  const trMap: Record<string, string> = {
    "ç": "c", "Ç": "C",
    "ğ": "g", "Ğ": "G",
    "ı": "i", "İ": "I",
    "ö": "o", "Ö": "O",
    "ş": "s", "Ş": "S",
    "ü": "u", "Ü": "U",
  };
  let s = text;
  for (const [tr, en] of Object.entries(trMap)) {
    s = s.split(tr).join(en);
  }
  return s
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[-\s]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Truncate a string to N words. */
export function truncateWords(text: string, n: number): string {
  if (!text) return "";
  const words = text.split(/\s+/);
  return words.length <= n ? text : words.slice(0, n).join(" ") + "…";
}

/** Format a Date as YYYY-MM-DD. */
export function fmtDate(d: Date | string | null | undefined): string {
  if (!d) return "";
  const date = typeof d === "string" ? new Date(d) : d;
  return date.toISOString().slice(0, 10);
}
