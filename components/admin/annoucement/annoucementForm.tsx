"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { ChevronDown, Calendar, Clock, Upload } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";

// Types
type NotificationChannels = {
  app: boolean;
  email: boolean;
  whatsapp: boolean;
};

type Schedule = {
  date: string;
  time: string;
};

type AnnouncementFormData = {
  audience: string;
  title: string;
  description: string;
  media: File | null;
  notifications: NotificationChannels;
  repeat: string;
  schedule: Schedule;
};

export function ClientAnnouncementForm() {
  const [repeatOption, setRepeatOption] = useState<"Never" | "Recurring">(
    "Never"
  );

  const [formData, setFormData] = useState<AnnouncementFormData>({
    audience: "",
    title: "",
    description: "",
    media: null,
    notifications: {
      app: true,
      email: false,
      whatsapp: true,
    },
    repeat: "Never",
    schedule: {
      date: "",
      time: "",
    },
  });

  const handleFormChange = <K extends keyof AnnouncementFormData>(
    field: K,
    value: AnnouncementFormData[K]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNestedChange = <
    K extends keyof AnnouncementFormData,
    S extends keyof AnnouncementFormData[K]
  >(
    parent: K,
    field: S,
    value: AnnouncementFormData[K][S]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/announcements", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Announcement created successfully!");
      } else {
        alert("Failed to create announcement");
      }
    } catch (error) {
      console.error("Error creating announcement:", error);
      alert("An error occurred while creating the announcement");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center mb-6">
        <button  onClick={() => {window.history.back()}} type="button" className="flex items-center text-gray-500 mr-2 pointer-events-auto">
          <ChevronDown className="w-4 h-4 rotate-90" />Create Announcement
        </button>
      </div>
      <div className="bg-white p-4 rounded-md">
        <div className="space-y-6">
          {/* Audience */}
          <div>
            <p className="text-xs mb-2">Send Announcement to:</p>
            <Select
              onValueChange={(value: string) =>
                handleFormChange("audience", value)
              }
              value={formData.audience}
            >
              <SelectTrigger className="md:w-1/2 border rounded">
                <SelectValue placeholder="All/Specific" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="specific">Specific</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Title */}
          <div>
            <p className="text-xs mb-2">Announcement Title</p>
            <Input
              className="md:w-1/2 border rounded"
              value={formData.title}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleFormChange("title", e.target.value)
              }
            />
          </div>

          {/* Description */}
          <div>
            <p className="text-xs mb-2">Description</p>
            <Textarea
              className="md:w-1/2 border rounded h-24"
              value={formData.description}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                handleFormChange("description", e.target.value)
              }
            />
          </div>

          {/* Media */}
          <div>
            <p className="text-xs mb-2">Upload Media</p>
            <div className="border md:w-1/2 border-dashed border-blue-300 rounded p-4 bg-blue-50 flex flex-col items-center justify-center">
              <div className="bg-white rounded-full p-2 shadow-sm">
                <Upload className="w-6 h-6 text-blue-500" />
              </div>
              <p className="text-xs text-center mt-2">
                Drag & drop files or{" "}
                <label className="text-blue-500 cursor-pointer">
                  Browse
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleFormChange("media", e.target.files?.[0] || null)
                    }
                  />
                </label>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Supported formats: JPG, PNG, GIF, Word, PPT
              </p>
            </div>
          </div>

          {/* Notification Channels */}
          <div>
            <p className="text-xs mb-2">Notification Method</p>
            <div className="flex items-center space-x-6">
              {["app", "email", "whatsapp"].map((channel) => (
                <div className="flex items-center space-x-2" key={channel}>
                  <Checkbox
                    id={channel}
                    checked={
                      formData.notifications[
                        channel as keyof NotificationChannels
                      ]
                    }
                    onCheckedChange={(checked: boolean) =>
                      handleNestedChange(
                        "notifications",
                        channel as keyof NotificationChannels,
                        checked
                      )
                    }
                  />
                  <Label htmlFor={channel} className="text-xs capitalize">
                    {channel}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Repeat Option */}
          <div>
            <p className="text-xs mb-2">Repeat Announcement</p>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="never"
                  checked={repeatOption === "Never"}
                  onCheckedChange={(checked: boolean) => {
                    if (checked) {
                      setRepeatOption("Never");
                      handleFormChange("repeat", "Never");
                    }
                  }}
                />
                <Label htmlFor="never" className="text-xs">
                  Never
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="recurring"
                  checked={repeatOption === "Recurring"}
                  onCheckedChange={(checked: boolean) => {
                    if (checked) {
                      setRepeatOption("Recurring");
                      handleFormChange("repeat", "weekly");
                    }
                  }}
                />
                <Label htmlFor="recurring" className="text-xs">
                  Recurring
                </Label>

                {repeatOption === "Recurring" && (
                  <Select
                    value={formData.repeat}
                    onValueChange={(value: string) =>
                      handleFormChange("repeat", value)
                    }
                  >
                    <SelectTrigger className="w-24 h-8 border rounded text-xs">
                      <SelectValue placeholder="Weekly" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>
          </div>

          {/* Schedule */}
          <div>
            <p className="text-xs mb-2">Schedule Announcement (Optional)</p>
            <div className="flex space-x-2">
              <div className="relative">
                <Input
                  type="date"
                  className="border rounded pl-8"
                  placeholder="Select Date"
                  value={formData.schedule.date}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleNestedChange("schedule", "date", e.target.value)
                  }
                />
                <Calendar className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              </div>
              <div className="relative">
                <Input
                  type="time"
                  className="border rounded pl-8"
                  placeholder="Select Time"
                  value={formData.schedule.time}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleNestedChange("schedule", "time", e.target.value)
                  }
                />
                <Clock className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              </div>
            </div>
          </div>

          {/* Submit / Cancel */}
          <div className="flex md:w-1/2 space-x-2 pt-4">
            <Button
              type="submit"
              className="md:w-1/2 bg-teal-600 hover:bg-teal-700 text-white rounded"
            >
              Create
            </Button>
            <Button
              type="button"
              variant="outline"
              className="md:w-1/2 text-red-500 border-red-100 hover:bg-red-50 rounded"
              onClick={() => {
                setFormData({
                  audience: "",
                  title: "",
                  description: "",
                  media: null,
                  notifications: {
                    app: true,
                    email: false,
                    whatsapp: true,
                  },
                  repeat: "Never",
                  schedule: {
                    date: "",
                    time: "",
                  },
                });
                setRepeatOption("Never");
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
