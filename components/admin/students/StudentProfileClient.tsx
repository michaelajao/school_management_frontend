/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React from 'react';
import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Printer, Mail } from "lucide-react";
import { useRouter } from 'next/navigation';

interface StudentData {
  name: string;
  role: string;
  studentId: string;
  gender: string;
  dateOfBirth: string;
  class: string;
  email: string;
  address: string;
  phoneNumber: string;
  parent: string;
  parentPhoneNumber: string;
  stateOfOrigin: string;
  weight: string;
  height: string;
  medicalCondition: string;
  feeStatus: string;
  outstandingAmount: string;
  lastLogin: string;
}

interface StudentProfileClientProps {
  studentData: StudentData;
  studentId: string;
}

export default function StudentProfileClient({ studentData, studentId }: StudentProfileClientProps) {
  const router = useRouter();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  return (
    <div className="p-6 w-full">
      <Card className="w-full max-w-full border border-gray-200 rounded-md shadow-sm">
        <CardContent className="p-0">
          <div className="flex flex-col items-start p-5 pt-6 pb-4 bg-white">
            <div className='flex items-center'>
              <Avatar className="w-20 h-20 border-4 mr-4 border-white shadow">
                <AvatarFallback className="bg-gray-200 text-gray-700">
                  {getInitials(studentData.name)}
                </AvatarFallback>
              </Avatar>
              <h2 className="mt-2 text-lg font-medium text-gray-900">{studentData.name}</h2>
            </div>
            
            <div className="flex gap-2 mt-3 w-1/2">
              <Button variant="destructive" className="flex-1 bg-red-500 hover:bg-red-600 text-white gap-1" size="sm">
                <Printer size={16} />
                <span>Delete user</span>
              </Button>
              <Button 
                className="flex-1 bg-teal-600 hover:bg-teal-700 text-white gap-1" 
                size="sm" 
                onClick={() => router.push(`/dashboard/users/students/${studentId}/edit`)}
              >
                <Mail size={16} />
                <span>Edit Form</span>
              </Button>
            </div>
          </div>
          
          <div className="px-0">
            {[
              { label: "Role", value: studentData.role },
              { label: "Student ID", value: studentData.studentId },
              { label: "Gender", value: studentData.gender },
              { label: "Date of Birth", value: studentData.dateOfBirth },
              { label: "Class", value: studentData.class },
              { label: "Email", value: studentData.email },
              { label: "Address", value: studentData.address },
              { label: "Phone Number", value: studentData.phoneNumber },
              { label: "Parent / Guardian", value: studentData.parent },
              { label: "Parent / Guardian Phone Number", value: studentData.parentPhoneNumber },
              { label: "State Of Origin", value: studentData.stateOfOrigin },
              { label: "Weight", value: studentData.weight },
              { label: "Height", value: studentData.height },
              { label: "Medical Condition", value: studentData.medicalCondition },
              { label: "Fee Status", value: studentData.feeStatus, isHighlighted: true, amount: studentData.outstandingAmount },
              { label: "Last Login", value: studentData.lastLogin },
            ].map((item, index) => (
              <div key={index} className={`flex py-2 px-6 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                <div className="w-1/2 text-sm text-gray-500">{item.label}</div>
                <div className="w-1/2 text-sm">
                  {item.isHighlighted ? (
                    <div className="flex justify-between">
                      <span className="text-red-500 font-medium">{item.value}</span>
                      <span className="text-red-500 font-medium">{item.amount}</span>
                    </div>
                  ) : (
                    <span className="text-gray-900">{item.value}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}