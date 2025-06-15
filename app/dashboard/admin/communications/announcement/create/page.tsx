import { ClientAnnouncementForm } from "@/components/admin/annoucement/annoucementForm";

export default function AnnouncementPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-xl font-bold mb-6">Announcements</h1>
      <ClientAnnouncementForm/>
    </div>
  );
}