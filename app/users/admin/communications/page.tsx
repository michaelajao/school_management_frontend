
// Communications.jsx (Server Component)
import { CommunicationsClient } from "@/components/admin/annoucement/Communication";
import { SummaryCard } from "@/components/admin/parents/SummaryCard";
import { DashboardMetrics } from '@/components/shared/DashboardMetrics'

// Mock data - in a real app this would come from your database
const dummyAnnouncements = {
  "my-announcement": [
    {
      id: 1,
      from: "You",
      message: "Remember to finalize the class event poster by Thursday.",
      date: "04 May 2025",
    },
    {
      id: 2,
      from: "You",
      message: "Weekly progress report needs to be submitted before 5 PM.",
      date: "03 May 2025",
    },
  ],
  general: [
    {
      id: 1,
      from: "School Admin",
      message: "School maintenance is scheduled for the upcoming weekend.",
      date: "01 May 2025",
    },
    {
      id: 2,
      from: "Principal's Office",
      message: "All staff must attend the Thursday emergency meeting.",
      date: "02 May 2025",
    },
  ],
  classroom: [
    {
      id: 1,
      from: "Mrs. Jackson",
      message: "Science project materials will be distributed tomorrow.",
      date: "29 April 2025",
    },
    {
      id: 2,
      from: "Mr. Cole",
      message: "Classroom 4B will merge with 4C for next week's math class.",
      date: "28 April 2025",
    },
  ],
  events: [
    {
      id: 1,
      from: "Events Team",
      message: "Cultural Day has been rescheduled to 10th May.",
      date: "05 May 2025",
    },
    {
      id: 2,
      from: "Events Coordinator",
      message: "Football finals kick off at 2 PM on Friday.",
      date: "03 May 2025",
    },
  ],
};

const dummyEvents = [
  {
    id: 1,
    title: "Cultural Day Celebration",
    date: "May 10, 2025",
    description:
      "Get ready for a vibrant celebration of culture, diversity, and tradition at our annual Cultural Day! 🎉",
    image: "/cultural-day.svg",
  },
  {
    id: 2,
    title: "World Book Day",
    date: "May 15, 2025",
    description:
      "Celebrate the power of books and reading with interactive sessions and book fairs! 📚",
    image: "/cultural-day.svg",
  },
  {
    id: 3,
    title: "Entrepreneurship Day",
    date: "May 20, 2025",
    description:
      "Young innovators pitch their business ideas and compete for startup prizes. 🚀",
    image: "/cultural-day.svg",
  },
];

const links = {
  "my-announcement": "/dashboard/communication/announcement",
  general: "/dashboard/communication/general",
  classroom: "/dashboard/communication/classroom",
  events: "/dashboard/communication/events",
};

export default function Communications() {

  const communicationsMetrics = [
    {
      icon: "/icons/megaphone-line.svg",
      label: "Announcements Created",
      value: 10,
      primaryColor: "#008080",
      secondaryColor: "#BDFAFF4D"
    },
    {
      icon: "/icons/mail-line.svg",
      label: "Unread Messages",
      value: 20,
      primaryColor: "#28C76F",
      secondaryColor: "#28C76F33"
    },
    {
      icon: "/icons/color-filter-line.svg",
      label: "Upcoming Events",
      value: 40,
      primaryColor: "#FF9F43",
      secondaryColor: "#FFAB5A33"
    }
  ]



  return (
    <div className="space-y-6 p-6">
      {/* Top Stats */}
      <DashboardMetrics metrics={communicationsMetrics} />

      {/* Pass data to client component */}
      <CommunicationsClient
        dummyAnnouncements={dummyAnnouncements} 
        dummyEvents={dummyEvents} 
        links={links} 
      />
    </div>
  );
}