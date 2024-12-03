import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { ImageUploader } from "@/components/dashboard/image-uploader";

export default function DashboardPage() {
  return (
    <DashboardShell>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Upload Image</h2>
        </div>
        <div className="grid gap-4">
          <ImageUploader />
        </div>
      </div>
    </DashboardShell>
  );
}
