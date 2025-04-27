"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Megaphone, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type Event = {
  id: string;
  title: string;
  date: string;
  type?: "sports" | "academic" | "cultural" | "other";
};

type Announcement = {
  id: string;
  title: string;
  date: string;
  urgent?: boolean;
};

export function EventsAndAnnouncements() {
  // Mock data for upcoming events
  const upcomingEvents: Event[] = [
    {
      id: "event-1",
      title: "Inter-House Sports",
      date: "April 28, 2025",
      type: "sports"
    },
    {
      id: "event-2",
      title: "Mid-Term Test Week",
      date: "May 6–10, 2025",
      type: "academic"
    },
    {
      id: "event-3",
      title: "Science Fair",
      date: "May 15, 2025",
      type: "academic"
    }
  ];

  // Mock data for announcements
  const announcements: Announcement[] = [
    {
      id: "ann-1",
      title: "Cultural Day this Friday – Dress accordingly!",
      date: "April 26, 2025",
      urgent: true
    },
    {
      id: "ann-2",
      title: "School closes early tomorrow – Check timetable updates.",
      date: "April 26, 2025",
      urgent: true
    },
    {
      id: "ann-3",
      title: "Parent-Teacher meeting scheduled for May 2nd",
      date: "April 25, 2025"
    }
  ];

  // Helper to get appropriate icon color based on event type
  const getEventColor = (type?: Event["type"]) => {
    switch (type) {
      case "sports": return "#ef4444"; // Red
      case "academic": return "#3b82f6"; // Blue
      case "cultural": return "#8b5cf6"; // Purple
      default: return "#6b7280"; // Gray
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Upcoming Events Card */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium flex items-center">
              <CalendarDays className="h-5 w-5 mr-2 text-muted-foreground" />
              Upcoming Events
            </CardTitle>
            <Button variant="ghost" size="sm" className="h-8 text-xs">
              View All
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="px-6">
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-start">
                <div 
                  className="mt-1 w-3 h-3 rounded-full mr-3"
                  style={{ backgroundColor: getEventColor(event.type) }}
                ></div>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">{event.title}</p>
                  <p className="text-xs text-muted-foreground">{event.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Announcements Card */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium flex items-center">
              <Megaphone className="h-5 w-5 mr-2 text-muted-foreground" />
              Announcements
            </CardTitle>
            <Button variant="ghost" size="sm" className="h-8 text-xs">
              View All
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="px-6">
          <div className="space-y-4">
            {announcements.map((announcement) => (
              <div key={announcement.id} className="space-y-1">
                <div className="flex items-center">
                  {announcement.urgent && (
                    <div className="bg-red-500 text-white text-[10px] font-bold rounded-full px-2 py-0.5 mr-2">
                      URGENT
                    </div>
                  )}
                  <p className="text-sm font-medium">{announcement.title}</p>
                </div>
                <p className="text-xs text-muted-foreground">{announcement.date}</p>
                <Separator className="mt-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}