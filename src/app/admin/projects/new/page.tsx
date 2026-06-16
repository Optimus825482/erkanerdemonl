import { requireAdmin } from "@/lib/actions";
import ProjectForm from "@/components/admin/ProjectForm";

export const dynamic = "force-dynamic";

export default async function NewProject() {
  await requireAdmin();
  return <ProjectForm />;
}
