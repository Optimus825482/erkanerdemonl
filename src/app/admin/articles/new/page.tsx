import { requireAdmin } from "@/lib/actions";
import ArticleForm from "@/components/admin/ArticleForm";

export const dynamic = "force-dynamic";

export default async function NewArticle() {
  await requireAdmin();
  return <ArticleForm />;
}
