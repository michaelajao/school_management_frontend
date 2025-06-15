// AnnouncementList.jsx (Server Component)
import { AnnouncementListClient } from "@/components/admin/annoucement/annoucement";

// Define types
export type Announcement = {
  id: number;
  from: string;
  message: string;
  date: string;
};

// Viewer data that can be fetched on the server
const viewers = [
  {
    name: "Ms Annabel",
    date: "March 25, 2020 9:30AM",
    avatar: "/api/placeholder/32/32",
  },
  {
    name: "Mr Benita",
    date: "March 25, 2020 9:30AM",
    avatar: "/api/placeholder/32/32",
  },
  {
    name: "Mr Samuel",
    date: "March 25, 2020 9:30AM",
    avatar: "/api/placeholder/32/32",
  },
  {
    name: "Ms Benita",
    date: "March 25, 2020 9:30AM",
    avatar: "/api/placeholder/32/32",
  },
  {
    name: "Mr Samuel",
    date: "March 25, 2020 9:30AM",
    avatar: "/api/placeholder/32/32",
  },
  {
    name: "Mr Samuel",
    date: "March 25, 2020 9:30AM",
    avatar: "/api/placeholder/32/32",
  },
  {
    name: "Mr Benita",
    date: "March 25, 2020 9:30AM",
    avatar: "/api/placeholder/32/32",
  },
  {
    name: "Mr Samuel",
    date: "March 25, 2020 9:30AM",
    avatar: "/api/placeholder/32/32",
  },
  {
    name: "Mr Benita",
    date: "March 25, 2020 9:30AM",
    avatar: "/api/placeholder/32/32",
  },
];

// In a real application, you would fetch this data server-side
// using fetch, database queries, or other server-compatible data fetching
async function getAnnouncementData() {
  // This would be an async server operation in a real app
  return {
    viewers,
    modalContent: {
      title: "Important Classroom Change Announcement!",
      content: [
        "Dear Students,\nWe would like to inform you of an important update regarding your Biology classes.",
        "Beginning next week, all Biology classes will now take place in Room B-202 instead of the previous location.\nPlease make a note of this change to ensure a smooth transition and avoid any confusion.",
        "This update is being made to provide a more conducive learning environment and better accommodate the needs of our students.",
        "Room B-202 is equipped with the necessary facilities to enhance your learning experience, and we are confident that this change will be beneficial for everyone.",
        "To ensure a seamless adjustment, we kindly ask all students to check their schedules, familiarize themselves with the new classroom location, and arrive on time for lessons.\nIf you have any questions or need further clarification, please do not hesitate to reach out to your instructor or the school administration.",
        "Thank you for your cooperation and understanding.",
        "We appreciate your flexibility and look forward to an engaging and productive learning experience in Room B-202!"
      ]
    }
  };
}

export default async function AnnouncementList() {
  // Fetch data server-side
  const { viewers, modalContent } = await getAnnouncementData();

  return (
    <div className="space-y-4">
      

      {/* Pass data to client component */}
      <AnnouncementListClient viewers={viewers} modalContent={modalContent} />
    </div>
  );
}