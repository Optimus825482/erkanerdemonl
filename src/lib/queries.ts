import { prisma } from "./prisma";
import { cache } from "react";
import { unstable_noStore as noStore } from "next/cache";

export const getAbout = cache(async () => {
  noStore();
  return prisma.about.findUnique({ where: { id: 1 } });
});

export const getPublishedProjects = cache(async () => {
  noStore();
  return prisma.project.findMany({
    where: { isPublished: true },
    orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
  });
});

export const getProjectBySlug = cache(async (slug: string) => {
  noStore();
  return prisma.project.findUnique({ where: { slug } });
});

export const getPublishedArticles = cache(async () => {
  noStore();
  return prisma.article.findMany({
    where: { isPublished: true },
    orderBy: [{ displayOrder: "asc" }, { publishedAt: "desc" }],
  });
});

export const getArticleBySlug = cache(async (slug: string) => {
  noStore();
  return prisma.article.findUnique({ where: { slug } });
});

export const getPublishedVideos = cache(async () => {
  noStore();
  return prisma.video.findMany({
    where: { isPublished: true },
    orderBy: [{ displayOrder: "asc" }, { publishedAt: "desc" }],
  });
});

export const getVideoBySlug = cache(async (slug: string) => {
  noStore();
  return prisma.video.findUnique({ where: { slug } });
});

export const getPublishedFAQs = cache(async () => {
  noStore();
  return prisma.fAQ.findMany({
    where: { isPublished: true },
    orderBy: { displayOrder: "asc" },
  });
});

export const getSettingsMap = cache(async () => {
  noStore();
  const rows = await prisma.setting.findMany();
  return Object.fromEntries(rows.map((r) => [r.key, r.value]));
});
