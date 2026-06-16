import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/actions";
import { notFound } from "next/navigation";
import ArticleForm from "@/components/admin/ArticleForm";

export const dynamic = "force-dynamic";

export default async function EditArticle({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const article = await prisma.article.findUnique({ where: { id: Number(id) } });
  if (!article) notFound();
  return <ArticleForm article={article} />;
}
