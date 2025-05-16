"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  MailIcon,
  MegaphoneIcon,
  CalendarIcon,
  Search,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { Calendar } from "@/components/ui/calendar";
import { isSameDay, parse, format } from "date-fns";
import Image from "next/image";

interface Links {
  [key: string]: string;
}

const Links: Links = {
  "my-announcement": "/dashboard/communication/announcement",
  general: "/dashboard/communication/general",
  classroom: "/dashboard/communication/classroom",
  events: "/dashboard/communication/events",
};

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

export default function Communications() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] =
    useState<keyof typeof dummyAnnouncements>("my-announcement");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const announcements = dummyAnnouncements[activeTab].filter((a) =>
    a.message.toLowerCase().includes(search.toLowerCase())
  );

    const handleEventClick = (event: unknown) => {
        setSelectedEvent(event);
        setShowModal(true);
    }; 

  // Parse event dates once for reuse
  const eventDates = dummyEvents.map(event => {
    return parse(event.date, "MMMM dd, yyyy", new Date());
  });
  
  // Function to check if a date has events
  const hasEvent = (date: Date) => {
    if (!date) return false;
    return eventDates.some(eventDate => isSameDay(eventDate, date));
  };

  const filteredEvents = dummyEvents.filter((event) => {
    if (!selectedDate) return true;
    const eventDate = parse(event.date, "MMMM dd, yyyy", new Date());
    return isSameDay(eventDate, selectedDate);
  });

  const announcementsLink = Links[activeTab];

  return (
    <div className="space-y-6 p-6">
      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="flex items-center gap-4 p-4">
          <div className="bg-[#BDFAFF] bg-opacity-30 p-2 rounded-full">
            <MegaphoneIcon className="text-teal-700" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">
              Announcements Created
            </p>
            <p className="text-xl font-semibold">30</p>
          </div>
        </Card>
        <Card className="flex items-center gap-4 p-4">
          <div className="bg-[#BDFAFF] bg-opacity-30 p-2 rounded-full">
            <MailIcon className="text-green-700" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Unread Messages</p>
            <p className="text-xl font-semibold">20</p>
          </div>
        </Card>
        <Card className="flex items-center gap-4 p-4">
          <div className="bg-[#FFBB54] bg-opacity-30 p-2 rounded-full">
            <CalendarIcon className="text-orange-600" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Upcoming Events</p>
            <p className="text-xl font-semibold">3</p>
          </div>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4">
        <Button variant="outline" className="border border-primary text-primary">
          Create Announcement
        </Button>
        <Button variant="outline" className="border border-green-600 text-green-600">
          View All Messages
        </Button>
        <Button variant="outline" className="border border-red-500 text-red-500">
          Set Reminder
        </Button>
      </div>

      {/* Announcements Section */}
      <Card>
        <CardContent className="pt-6">
          {/* Tabs and Search */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <Tabs
              value={activeTab}
              onValueChange={(val) =>
                setActiveTab(val as keyof typeof dummyAnnouncements)
              }
              className="w-full sm:w-auto"
            >
              <TabsList className="bg-muted">
                <TabsTrigger value="my-announcement">My Announcement</TabsTrigger>
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="classroom">Classroom</TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search"
                className="pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {activeTab === "events" ? (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                {filteredEvents.length > 0 ? (
                  filteredEvents.map((event) => (
                    <div key={event.id} className="flex gap-4 bg-white p-3 rounded-lg shadow-sm" onClick={() => handleEventClick(event)}>
                      {/* Replace img with Next.js Image component */}
                      <div className="relative rounded-md overflow-hidden">
                        <Image
                          src={event.image || "/api/placeholder/112/96"} 
                          alt={event.title}
                          className="w-full h-full object-cover"
                          width={112}
                            height={96}
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold">{event.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          Date: {event.date}
                        </p>
                        <p className="text-sm">{event.description}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center justify-center h-40 bg-slate-50 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      No events found for this date.
                    </p>
                  </div>
                )}
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="mb-3">
                  <h3 className="font-medium">Event Calendar</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedDate ? format(selectedDate, "MMMM dd, yyyy") : "Select a date to view events"}
                  </p>
                </div>
                {/* Calendar Component */}
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    console.log("Date selected:", date);
                    setSelectedDate(date);
                  }}
                  className="rounded-md border"
                  // Generate an array of dates that have events
                  modifiers={{
                    event: eventDates
                  }}
                  modifiersClassNames={{
                    selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                    today: "bg-accent text-accent-foreground",
                    event: "bg-orange-100 text-orange-600 font-medium relative"
                  }}
                  // Add custom styling for days with events
                  modifiersStyles={{
                    event: {
                      fontWeight: "bold"
                    }
                  }}
                />
                <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span>Events</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Selected date</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {announcements.map((a) => (
                <div
                  key={a.id}
                  className="flex justify-between items-start border rounded-md p-4 hover:bg-muted/40 transition"
                >
                  <div className="flex items-start gap-3">
                    <MailIcon
                      className="mt-1 text-muted-foreground"
                      size={16}
                    />
                    <div>
                      <p className="text-sm font-medium">{a.from}</p>
                      <p className="text-sm text-muted-foreground">
                        {a.message}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground whitespace-nowrap">
                    {a.date}
                  </p>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-end mt-6">
            {activeTab === "events" ? (
              <Button variant="outline">
                <Link href="/dashboard/admin?tab=events&action=create" className="flex items-center gap-2">
                  Create Event
                </Link>
              </Button>
            ) : (
              <Button variant="outline">
                <Link href={announcementsLink} className="flex items-center gap-2">
                  View More
                </Link>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>


      {showModal && selectedEvent && (
        <div className="fixed inset-0 bg-opacity-50 h-screen w-screen z-10 backdrop-blur-sm">
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-lg p-6 w-[600px]">
              <h3 className="font-bold text-lg mb-2">{selectedEvent.title}</h3>
              <div className="flex gap-4">
                <Image
                  src={selectedEvent.image}
                  alt={selectedEvent.title}
                  className="w-1/3 h-auto object-cover rounded"
                  width={200}
                  height={150}
                />
                <div className="w-2/3">
                  <p className="text-sm text-muted-foreground mb-2">
                    Date: {selectedEvent.date}
                  </p>
                  <p className="text-sm">{selectedEvent.description}</p>
                </div>
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowModal(false)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>

  );
}