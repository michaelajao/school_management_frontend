"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState } from "react";

export default function StudentModal() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    studentId: "",
    studentClass: "",
    gender: "",
    dob: "",
    email: "",
    address: "",
    parentLink: "",
    parentPhone: "",
    stateOfOrigin: "",
    weight: "",
    heightFt: "",
    heightIn: "",
    medicalCondition: "",
  });

  const handleChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      studentId: "",
      studentClass: "",
      gender: "",
      dob: "",
      email: "",
      address: "",
      parentLink: "",
      parentPhone: "",
      stateOfOrigin: "",
      weight: "",
      heightFt: "",
      heightIn: "",
      medicalCondition: "",
    });
    setStep(1);
  };

  const handleSubmit = () => {
    console.log("Submitted:", formData);
    resetForm();
  };

  return (
    <Dialog  >
      <DialogTrigger asChild>
        <Button>Add Student</Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl w-full p-10">
        <DialogHeader>
          <DialogTitle>Register Student</DialogTitle>
        </DialogHeader>

        {step === 1 && (
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <div className="col-span-1">
              <Input
                className="w-full"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>

            <div className="col-span-1">
              <Input
                className="w-full"
                placeholder="Student ID"
                value={formData.studentId}
                onChange={(e) => handleChange("studentId", e.target.value)}
              />
            </div>

            <div className="col-span-1">
              <Select
                onValueChange={(val) => handleChange("studentClass", val)}
                value={formData.studentClass}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="JSS1">JSS1</SelectItem>
                  <SelectItem value="JSS2">JSS2</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="col-span-1">
              <Select
                onValueChange={(val) => handleChange("gender", val)}
                value={formData.gender}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="col-span-1">
              <Input
                className="w-full"
                placeholder="Date of Birth"
                value={formData.dob}
                onChange={(e) => handleChange("dob", e.target.value)}
                type="date"
              />
            </div>

            <div className="col-span-1">
              <Input
                className="w-full"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>

            <div className="col-span-1">
              <Input
                className="w-full"
                placeholder="Address"
                value={formData.address}
                onChange={(e) => handleChange("address", e.target.value)}
              />
            </div>

            <div className="flex justify-end col-span-2">
              <Button onClick={() => setStep(2)}>Next</Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <div className="col-span-1">
              <Select
                onValueChange={(val) => handleChange("parentLink", val)}
                value={formData.parentLink}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Link to Parent" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Father">Father</SelectItem>
                  <SelectItem value="Mother">Mother</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="col-span-1">
              <Input
                className="w-full"
                placeholder="Parent/Guardian Phone"
                value={formData.parentPhone}
                onChange={(e) => handleChange("parentPhone", e.target.value)}
              />
            </div>

            <div className="col-span-1">
              <Select
                onValueChange={(val) => handleChange("stateOfOrigin", val)}
                value={formData.stateOfOrigin}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="State of Origin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Lagos">Lagos</SelectItem>
                  <SelectItem value="Abuja">Abuja</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="col-span-1">
              <Select
                onValueChange={(val) => handleChange("weight", val)}
                value={formData.weight}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Weight (kg)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="40">40kg</SelectItem>
                  <SelectItem value="50">50kg</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="col-span-2 flex gap-4">
              <Input
                className="w-full"
                placeholder="Height (ft)"
                value={formData.heightFt}
                onChange={(e) => handleChange("heightFt", e.target.value)}
              />
              <Input
                className="w-full"
                placeholder="Height (in)"
                value={formData.heightIn}
                onChange={(e) => handleChange("heightIn", e.target.value)}
              />
            </div>

            <div className="col-span-2">
              <Select
                onValueChange={(val) => handleChange("medicalCondition", val)}
                value={formData.medicalCondition}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Medical Condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="None">None</SelectItem>
                  <SelectItem value="Asthma">Asthma</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="col-span-2 flex justify-between mt-4">
              <Button variant="outline" onClick={() => setStep(1)}>
                Previous
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
                <Button onClick={handleSubmit}>Save</Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
