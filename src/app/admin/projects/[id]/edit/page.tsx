import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/actions";
import { notFound } from "next/navigation";
import ProjectForm from "@/components/admin/ProjectForm";

export const dynamic = "force-dynamic";

export default async function EditProject({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id: Number(id) } });
  if (!project) notFound();
  return <ProjectForm project={project} />;
}
