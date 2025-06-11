"use client";
import { useState } from "react";
import { ChevronDown, Upload } from "lucide-react";
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
import { Checkbox } from "@/components/ui/checkbox";

export default function EventForm() {
  const [includeAddlInfo, setIncludeAddlInfo] = useState(false);

  return (
    <>
      <div className="flex items-center mb-6">
        <button className="flex items-center text-gray-500 mr-2">
          <ChevronDown className="w-4 h-4 rotate-90" />
        </button>
        <h1 className="text-sm font-medium">Create Event</h1>
      </div>
      <div className=" bg-white p-4 rounded-md border">
        <div className="space-y-6">
          <div>
            <p className="text-xs mb-2">New Event</p>
          </div>

          <div>
            <p className="text-xs mb-2">Class Room</p>
            <Select>
              <SelectTrigger className="md:w-1/2 border rounded">
                <SelectValue placeholder="All Classes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                <SelectItem value="class1">Class 1</SelectItem>
                <SelectItem value="class2">Class 2</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <p className="text-xs mb-2">Event Name</p>
            <Input className="md:w-1/2 border rounded" />
          </div>

          <div>
            <p className="text-xs mb-2">Description</p>
            <Textarea className="md:w-1/2 border rounded h-24" />
          </div>

          <div>
            <p className="text-xs mb-2">Upload Media</p>
            <div className="border md:w-1/2 border-dashed border-blue-300 rounded p-4 bg-blue-50 flex flex-col items-center justify-center">
              <div className="bg-white rounded-full p-2 shadow-sm">
                <Upload className="w-6 h-6 text-blue-500" />
              </div>
              <p className="text-xs text-center mt-2">
                Drag & drop files or{" "}
                <span className="text-blue-500">Browse</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Supported formats: PNG, Word, PDF, PPT, JPG
              </p>
            </div>
          </div>

          <div className="flex md:w-1/2 space-x-3">
            <div className="w-1/3">
              <p className="text-xs mb-2">Date</p>
              <div className="relative">
                <Input
                  type="date"
                  className=" border rounded pl-8"
                  placeholder="Select Date"
                />
                {/* <Calendar className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" /> */}
              </div>
            </div>
            <div className="w-1/3">
              <p className="text-xs mb-2">Time</p>
              <div className="relative">
                <Input
                  type="time"
                  className=" border rounded pl-8"
                  placeholder="Select Time"
                />
                {/* <Clock className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" /> */}
              </div>
            </div>
            <div className="w-1/3">
              <p className="text-xs mb-2">Duration</p>
              <Select>
                <SelectTrigger className=" border rounded">
                  <SelectValue placeholder="1 hour" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30min">30 min</SelectItem>
                  <SelectItem value="1hour">1 hour</SelectItem>
                  <SelectItem value="2hours">2 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <p className="text-xs mb-2">Location</p>
            <Input
              className="md:w-1/2 border rounded"
              placeholder="Enter Location"
            />
          </div>

          <div>
            <p className="text-xs mb-2">Notification Method</p>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Checkbox id="app" defaultChecked />
                <Label htmlFor="app" className="text-xs">
                  In-App
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="email" />
                <Label htmlFor="email" className="text-xs">
                  Email
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="pushnotif" defaultChecked />
                <Label htmlFor="pushnotif" className="text-xs">
                  Push Notif
                </Label>
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs mb-2">Set Reminder</p>
            <div className="flex items-center space-x-2">
              <Checkbox id="setreminder" />
              <Label htmlFor="setreminder" className="text-xs">
                Never
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="setreminder"
                onClick={() => setIncludeAddlInfo(!includeAddlInfo)}
              />
              <Label htmlFor="setreminder" className="text-xs"></Label>

              {includeAddlInfo && (
                <div className="mt-2">
                  <Select>
                    <SelectTrigger className="w-48 border rounded text-xs">
                      <SelectValue placeholder="10 minutes before event" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5min">
                        5 minutes before event
                      </SelectItem>
                      <SelectItem value="10min">
                        10 minutes before event
                      </SelectItem>
                      <SelectItem value="30min">
                        30 minutes before event
                      </SelectItem>
                      <SelectItem value="1hour">1 hour before event</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </div>

          <div className="flex w-1/2  space-x-2 pt-4">
            <Button className=" w-full md:w-1/2 bg-teal-600 hover:bg-teal-700 text-white rounded">
              Create
            </Button>
            <Button
              variant="outline"
              className="md:w-1/2 w-full text-red-500 border-red-100 hover:bg-red-50 rounded"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
