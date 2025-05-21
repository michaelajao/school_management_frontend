"use client"
import { GeneraltList } from "@/components/admin/annoucement/general"
import { useAuth } from "@/contexts/auth-context"

const CommunicationView = () => {
  const { user } = useAuth()

  if (!user || user.role !== "superadmin") {
    return null // or show a fallback/403 component
  }

  return <GeneraltList />
}

export default CommunicationView