import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/actions";
import { notFound } from "next/navigation";
import VideoForm from "@/components/admin/VideoForm";

export const dynamic = "force-dynamic";

export default async function EditVideo({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const video = await prisma.video.findUnique({ where: { id: Number(id) } });
  if (!video) notFound();
  return <VideoForm video={video} />;
}
