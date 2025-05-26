/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { CalendarIcon, ChevronLeft, ChevronDown } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from 'next/navigation';

interface StudentData {
  name: string;
  studentId: string;
  class: string;
  gender: string;
  dateOfBirth: Date | null;
  email: string;
  address: string;
  parent: string;
  parentPhoneNumber: string;
  stateOfOrigin: string;
  weight: string;
  height: { feet: string; inches: string };
  medicalCondition: string;
}

interface StudentEditFormProps {
  studentData: StudentData;
  studentId: string;
}

export default function StudentEditFormClient({
  studentData,
  studentId
}: StudentEditFormProps) {
  const router = useRouter();
  const [date, setDate] = useState<Date | null>(studentData.dateOfBirth);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<StudentData>({
    defaultValues: studentData,
  });

  const handleSave = async (data: StudentData) => {
    try {
      setIsSubmitting(true);
      const updatedData = {
        ...data,
        dateOfBirth: date,
      };
      
      // Call server action to update student
    //   await updateStudent(studentId, updatedData);
      
      // Redirect back to student profile
      router.push(`/users/admin/manage/students/${studentId}`);
    } catch (error) {
      console.error("Error saving student data:", error);
      // Handle error (could set error state and display to user)
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  const handleBack = () => {
    router.push(`/users/admin/manage/students/${studentId}`);
  };

  const inputStyles =
    "h-14 w-1/2 px-4 py-3 text-base rounded-2xl border-gray-300";
  const selectStyles =
    "h-14 w-1/2 py-3 px-4 text-base rounded-2xl border-gray-300";
  const labelStyles = "text-base font-medium text-gray-800 mb-2";

  return (
    <div className="p-4">
      <button
        onClick={handleBack}
        className="flex items-center text-sm text-gray-500 hover:text-gray-700"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Edit Info
      </button>
      <Card className="max-w-full mx-auto">
        <CardContent className="pt-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSave)}
              className="space-y-6"
            >
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelStyles}>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter name"
                        className={inputStyles}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Student ID */}
              <FormField
                control={form.control}
                name="studentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelStyles}>Student ID</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter student ID"
                        className={inputStyles}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Class */}
              <FormField
                control={form.control}
                name="class"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelStyles}>Class</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className={selectStyles}>
                          <SelectValue placeholder="Select class" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Year 7A">Year 7A</SelectItem>
                        <SelectItem value="Year 7B">Year 7B</SelectItem>
                        <SelectItem value="Year 8A">Year 8A</SelectItem>
                        <SelectItem value="Year 8B">Year 8B</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              {/* Gender */}
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelStyles}>Gender</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className={selectStyles}>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              {/* Date of Birth */}
              <div className="space-y-2 flex flex-col">
                <label className={labelStyles}>Date of Birth</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={`w-full justify-start text-left font-normal ${inputStyles}`}
                    >
                      {date ? (
                        format(date, "PPP")
                      ) : (
                        <span className="text-gray-500">Select date</span>
                      )}
                      <CalendarIcon className="ml-auto h-5 w-5 opacity-70" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date || undefined}
                      onSelect={setDate}

                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelStyles}>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter email"
                        className={inputStyles}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Address */}
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelStyles}>Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter address"
                        className={inputStyles}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Link to Parent */}
              <FormField
                control={form.control}
                name="parent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelStyles}>
                      Link to Parent
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className={selectStyles}>
                          <SelectValue placeholder="Select parent" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Donald Essang">
                          Donald Essang
                        </SelectItem>
                        <SelectItem value="Other Parent">
                          Other Parent
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              {/* Parent/Guardian Phone */}
              <FormField
                control={form.control}
                name="parentPhoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelStyles}>
                      Parent/Guardian Phone
                    </FormLabel>
                    <div className="flex w-1/2">
                      <div
                        className={`bg-gray-100 border border-r-0 rounded-l-2xl px-3 flex items-center h-14`}
                      >
                        <span className="flex items-center text-base">
                          <span>+234</span>
                          <ChevronDown className="h-4 w-4 ml-1" />
                        </span>
                      </div>
                      <Input
                        className={`rounded-l-none rounded-r-2xl h-14`}
                        placeholder="Enter phone number"
                        {...field}
                      />
                    </div>
                  </FormItem>
                )}
              />

              {/* State Of Origin */}
              <FormField
                control={form.control}
                name="stateOfOrigin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelStyles}>
                      State Of Origin
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className={selectStyles}>
                          <SelectValue placeholder="Select state of origin" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Akwa-Ibom">Akwa-Ibom</SelectItem>
                        <SelectItem value="Lagos">Lagos</SelectItem>
                        <SelectItem value="Abuja">Abuja</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              {/* Weight */}
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelStyles}>Weight</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className={selectStyles}>
                          <SelectValue placeholder="Select weight" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="48kg">48kg</SelectItem>
                        <SelectItem value="50kg">50kg</SelectItem>
                        <SelectItem value="52kg">52kg</SelectItem>
                        <SelectItem value="54kg">54kg</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              {/* Height */}
              <div className="space-y-2 w-1/2">
                <label className={labelStyles}>Height</label>
                <div className="flex gap-2">
                  <Select
                    defaultValue={studentData.height.feet}
                    onValueChange={(value) => {
                      form.setValue("height", {
                        ...form.getValues("height"),
                        feet: value,
                      });
                    }}
                  >
                    <SelectTrigger className={`w-1/2 ${selectStyles}`}>
                      <SelectValue placeholder="ft" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 8 }, (_, i) => i + 1).map(
                        (feet) => (
                          <SelectItem key={feet} value={feet.toString()}>
                            {feet}&apos;
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>

                  <Select
                    defaultValue={studentData.height.inches}
                    onValueChange={(value) => {
                      form.setValue("height", {
                        ...form.getValues("height"),
                        inches: value,
                      });
                    }}
                  >
                    <SelectTrigger className={`w-1/2 ${selectStyles}`}>
                      <SelectValue placeholder="in" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 12 }, (_, i) => i).map((inch) => (
                        <SelectItem key={inch} value={inch.toString()}>
                          {inch}&quot;
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Medical Condition */}
              <FormField
                control={form.control}
                name="medicalCondition"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelStyles}>
                      Medical Condition
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className={selectStyles}>
                          <SelectValue placeholder="Select medical condition" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Asthmatic">Asthmatic</SelectItem>
                        <SelectItem value="None">None</SelectItem>
                        <SelectItem value="Diabetes">Diabetes</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              {/* Form Actions */}
              <div className="pt-4 flex gap-2 w-1/2">
                <Button
                  type="submit"
                  className="flex-1 bg-teal-600 hover:bg-teal-700 text-white h-12 rounded-xl"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Save"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 border-red-500 text-red-500 hover:bg-red-50 h-12 rounded-xl"
                  onClick={handleCancel}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}