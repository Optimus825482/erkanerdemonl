import { prisma } from "./prisma";
import { cache } from "react";

export const getAbout = cache(async () => {
  return prisma.about.findUnique({ where: { id: 1 } });
});

export const getPublishedProjects = cache(async () => {
  return prisma.project.findMany({
    where: { isPublished: true },
    orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
  });
});

export const getProjectBySlug = cache(async (slug: string) => {
  return prisma.project.findUnique({ where: { slug } });
});

export const getPublishedArticles = cache(async () => {
  return prisma.article.findMany({
    where: { isPublished: true },
    orderBy: [{ displayOrder: "asc" }, { publishedAt: "desc" }],
  });
});

export const getArticleBySlug = cache(async (slug: string) => {
  return prisma.article.findUnique({ where: { slug } });
});

export const getPublishedVideos = cache(async () => {
  return prisma.video.findMany({
    where: { isPublished: true },
    orderBy: [{ displayOrder: "asc" }, { publishedAt: "desc" }],
  });
});

export const getVideoBySlug = cache(async (slug: string) => {
  return prisma.video.findUnique({ where: { slug } });
});

export const getPublishedFAQs = cache(async () => {
  return prisma.fAQ.findMany({
    where: { isPublished: true },
    orderBy: { displayOrder: "asc" },
  });
});

export const getSettingsMap = cache(async () => {
  const rows = await prisma.setting.findMany();
  return Object.fromEntries(rows.map((r) => [r.key, r.value]));
});
