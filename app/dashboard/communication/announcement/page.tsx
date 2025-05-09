"use client"
import { AnnouncementList } from "@/components/admin/annoucement"
import { useAuth } from "@/contexts/auth-context"

const CommunicationView = () => {
  const { user } = useAuth()

  if (!user || user.role !== "superadmin") {
    return null // or show a fallback/403 component
  }

  return <AnnouncementList />
}

export default CommunicationView