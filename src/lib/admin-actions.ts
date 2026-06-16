"use server";

import { prisma } from "./prisma";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "./actions";
import { slugify } from "./utils";
import { z } from "zod";
import { promises as fs } from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const ProjectSchema = z.object({
  id: z.coerce.number().int().optional(),
  title: z.string().min(2).max(200),
  slug: z.string().max(200).optional(),
  description: z.string().min(10),
  longDescription: z.string().optional(),
  category: z.string().default("web"),
  technologies: z.string().optional(),
  thumbnailImage: z.string().min(1),
  githubUrl: z.string().optional(),
  liveUrl: z.string().optional(),
  status: z.string().default("active"),
  displayOrder: z.coerce.number().int().default(0),
  isFeatured: z.string().optional(),
  isPublished: z.string().optional(),
});

export async function saveProject(fd: FormData) {
  await requireAdmin();
  const data = ProjectSchema.parse(Object.fromEntries(fd));
  const techs = (data.technologies ?? "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const slug = data.slug && data.slug.length > 0 ? data.slug : slugify(data.title);
  const payload = {
    title: data.title,
    slug,
    description: data.description,
    longDescription: data.longDescription || null,
    category: data.category,
    technologies: techs,
    thumbnailImage: data.thumbnailImage,
    githubUrl: data.githubUrl || null,
    liveUrl: data.liveUrl || null,
    status: data.status,
    displayOrder: data.displayOrder,
    isFeatured: data.isFeatured === "on",
    isPublished: data.isPublished === "on" || data.isPublished === undefined,
  };

  if (data.id) {
    await prisma.project.update({ where: { id: data.id }, data: payload });
  } else {
    await prisma.project.create({ data: payload });
  }
  revalidatePath("/projeler");
  revalidatePath("/");
}

export async function deleteProject(fd: FormData) {
  await requireAdmin();
  const id = Number(fd.get("id"));
  if (!Number.isFinite(id)) return;
  await prisma.project.delete({ where: { id } });
  revalidatePath("/projeler");
  revalidatePath("/");
}

const ArticleSchema = z.object({
  id: z.coerce.number().int().optional(),
  title: z.string().min(2).max(200),
  slug: z.string().max(200).optional(),
  excerpt: z.string().min(10),
  content: z.string().min(10),
  category: z.string().default("ai"),
  tags: z.string().optional(),
  thumbnailImage: z.string().min(1),
  readingTime: z.coerce.number().int().default(5),
  authorName: z.string().default("Erkan Erdem"),
  isPublished: z.string().optional(),
  isFeatured: z.string().optional(),
});

export async function saveArticle(fd: FormData) {
  await requireAdmin();
  const data = ArticleSchema.parse(Object.fromEntries(fd));
  const tags = (data.tags ?? "").split(",").map((t) => t.trim()).filter(Boolean);
  const slug = data.slug && data.slug.length > 0 ? data.slug : slugify(data.title);

  const payload = {
    title: data.title,
    slug,
    excerpt: data.excerpt,
    content: data.content,
    category: data.category,
    tags,
    thumbnailImage: data.thumbnailImage,
    readingTime: data.readingTime,
    authorName: data.authorName,
    isPublished: data.isPublished === "on" || data.isPublished === undefined,
    isFeatured: data.isFeatured === "on",
  };

  if (data.id) {
    await prisma.article.update({ where: { id: data.id }, data: payload });
  } else {
    await prisma.article.create({ data: payload });
  }
  revalidatePath("/yazilar");
  revalidatePath("/");
}

export async function deleteArticle(fd: FormData) {
  await requireAdmin();
  const id = Number(fd.get("id"));
  if (!Number.isFinite(id)) return;
  await prisma.article.delete({ where: { id } });
  revalidatePath("/yazilar");
}

const VideoSchema = z.object({
  id: z.coerce.number().int().optional(),
  title: z.string().min(2).max(200),
  slug: z.string().max(200).optional(),
  description: z.string().min(10),
  longDescription: z.string().optional(),
  category: z.string().default("Yazılım Eğitimi"),
  thumbnailImage: z.string().optional(),
  duration: z.string().default("15:00"),
  videoEmbed: z.string().optional(),
  isPublished: z.string().optional(),
});

export async function saveVideo(fd: FormData) {
  await requireAdmin();
  const data = VideoSchema.parse(Object.fromEntries(fd));
  const slug = data.slug && data.slug.length > 0 ? data.slug : slugify(data.title);
  const payload = {
    title: data.title,
    slug,
    description: data.description,
    longDescription: data.longDescription || null,
    category: data.category,
    thumbnailImage: data.thumbnailImage || "/images/videos/placeholder.png",
    duration: data.duration,
    videoEmbed: data.videoEmbed || null,
    isPublished: data.isPublished === "on" || data.isPublished === undefined,
  };
  if (data.id) {
    await prisma.video.update({ where: { id: data.id }, data: payload });
  } else {
    await prisma.video.create({ data: payload });
  }
  revalidatePath("/videolar");
}

export async function deleteVideo(fd: FormData) {
  await requireAdmin();
  const id = Number(fd.get("id"));
  if (!Number.isFinite(id)) return;
  await prisma.video.delete({ where: { id } });
  revalidatePath("/videolar");
}

const FAQSchema = z.object({
  id: z.coerce.number().int().optional(),
  question: z.string().min(2),
  answer: z.string().min(2),
  colorTheme: z.string().default("cyan"),
  displayOrder: z.coerce.number().int().default(0),
  isPublished: z.string().optional(),
});

export async function saveFAQ(fd: FormData) {
  await requireAdmin();
  const data = FAQSchema.parse(Object.fromEntries(fd));
  const payload = {
    question: data.question,
    answer: data.answer,
    colorTheme: data.colorTheme,
    displayOrder: data.displayOrder,
    isPublished: data.isPublished === "on" || data.isPublished === undefined,
  };
  if (data.id) {
    await prisma.fAQ.update({ where: { id: data.id }, data: payload });
  } else {
    await prisma.fAQ.create({ data: payload });
  }
  revalidatePath("/iletisim");
}

export async function deleteFAQ(fd: FormData) {
  await requireAdmin();
  const id = Number(fd.get("id"));
  if (!Number.isFinite(id)) return;
  await prisma.fAQ.delete({ where: { id } });
  revalidatePath("/iletisim");
}

const AboutSchema = z.object({
  fullName: z.string().min(2),
  title: z.string().min(2),
  shortBio: z.string().min(10),
  yaklasim: z.string().min(10),
  felsefe: z.string().min(10),
  profileImage: z.string().default("/images/erkanerdem.png"),
  email: z.email(),
  website: z.string().default("https://erkanerdem.online"),
  location: z.string().default("Türkiye"),
  socialGithub: z.string().optional(),
  socialLinkedin: z.string().optional(),
  socialTwitter: z.string().optional(),
  socialInstagram: z.string().optional(),
  heroTitles: z.string().optional(),
  heroImages: z.string().optional(),
  tags: z.string().optional(),
});

const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
]);
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

export async function uploadImage(fd: FormData): Promise<
  | { ok: true; url: string }
  | { ok: false; error: string }
> {
  await requireAdmin();
  const file = fd.get("file");
  if (!(file instanceof File)) {
    return { ok: false, error: "Dosya bulunamadı." };
  }
  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    return {
      ok: false,
      error: "Sadece JPEG, PNG, WebP, GIF ve SVG desteklenir.",
    };
  }
  if (file.size > MAX_IMAGE_SIZE) {
    return { ok: false, error: "Dosya boyutu 5MB'dan büyük olamaz." };
  }

  const ext = (() => {
    const fromName = path.extname(file.name).toLowerCase();
    if (fromName && /^\.[a-z0-9]{1,5}$/.test(fromName)) return fromName;
    if (file.type === "image/jpeg") return ".jpg";
    if (file.type === "image/png") return ".png";
    if (file.type === "image/webp") return ".webp";
    if (file.type === "image/gif") return ".gif";
    if (file.type === "image/svg+xml") return ".svg";
    return "";
  })();

  const filename = `${Date.now()}-${crypto.randomBytes(6).toString("hex")}${ext}`;
  const uploadDir = path.join(process.cwd(), "public", "images", "uploads");
  const filePath = path.join(uploadDir, filename);

  await fs.mkdir(uploadDir, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(filePath, buffer);

  return { ok: true, url: `/images/uploads/${filename}` };
}

export async function saveAbout(fd: FormData) {
  await requireAdmin();
  const data = AboutSchema.parse(Object.fromEntries(fd));
  const splitLines = (s: string | undefined) =>
    (s ?? "")
      .split("\n")
      .map((x) => x.trim())
      .filter(Boolean);

  await prisma.about.upsert({
    where: { id: 1 },
    update: {
      fullName: data.fullName,
      title: data.title,
      shortBio: data.shortBio,
      yaklasim: data.yaklasim,
      felsefe: data.felsefe,
      profileImage: data.profileImage,
      email: data.email,
      website: data.website,
      location: data.location,
      socialGithub: data.socialGithub || null,
      socialLinkedin: data.socialLinkedin || null,
      socialTwitter: data.socialTwitter || null,
      socialInstagram: data.socialInstagram || null,
      heroTitles: splitLines(data.heroTitles),
      heroImages: splitLines(data.heroImages),
      tags: splitLines(data.tags),
    },
    create: {
      id: 1,
      fullName: data.fullName,
      title: data.title,
      shortBio: data.shortBio,
      yaklasim: data.yaklasim,
      felsefe: data.felsefe,
      profileImage: data.profileImage,
      email: data.email,
      website: data.website,
      location: data.location,
      socialGithub: data.socialGithub || null,
      socialLinkedin: data.socialLinkedin || null,
      socialTwitter: data.socialTwitter || null,
      socialInstagram: data.socialInstagram || null,
      heroTitles: splitLines(data.heroTitles),
      heroImages: splitLines(data.heroImages),
      tags: splitLines(data.tags),
      technologies: [],
      interests: [],
    },
  });
  revalidatePath("/");
  revalidatePath("/hakkimda");
}

const MessageReplySchema = z.object({
  id: z.coerce.number().int(),
  notes: z.string().optional(),
});

export async function markMessageRead(fd: FormData) {
  await requireAdmin();
  const data = MessageReplySchema.parse(Object.fromEntries(fd));
  const msg = await prisma.contactMessage.findUnique({ where: { id: data.id } });
  if (!msg) return;
  await prisma.contactMessage.update({ where: { id: data.id }, data: { isRead: !msg.isRead } });
  revalidatePath("/admin/messages");
}

export async function markMessageReplied(fd: FormData) {
  await requireAdmin();
  const data = MessageReplySchema.parse(Object.fromEntries(fd));
  await prisma.contactMessage.update({
    where: { id: data.id },
    data: { isReplied: true, repliedAt: new Date() },
  });
  revalidatePath("/admin/messages");
}

export async function updateMessageNotes(fd: FormData) {
  await requireAdmin();
  const data = MessageReplySchema.parse(Object.fromEntries(fd));
  await prisma.contactMessage.update({
    where: { id: data.id },
    data: { adminNotes: data.notes ?? "" },
  });
  revalidatePath("/admin/messages");
}

export async function deleteMessage(fd: FormData) {
  await requireAdmin();
  const id = Number(fd.get("id"));
  if (!Number.isFinite(id)) return;
  await prisma.contactMessage.delete({ where: { id } });
  revalidatePath("/admin/messages");
}
