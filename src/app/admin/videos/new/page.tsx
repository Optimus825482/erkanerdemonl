import { requireAdmin } from "@/lib/actions";
import VideoForm from "@/components/admin/VideoForm";

export const dynamic = "force-dynamic";

export default async function NewVideo() {
  await requireAdmin();
  return <VideoForm />;
}
