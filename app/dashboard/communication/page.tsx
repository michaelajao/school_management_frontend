"use client"
import Communications from "@/components/admin/Communication"
import { useAuth } from "@/contexts/auth-context"

const CommunicationView = () => {
  const { user } = useAuth()

  if (!user || user.role !== "superadmin") {
    return null // or show a fallback/403 component
  }

  return <Communications />
}

export default CommunicationView
