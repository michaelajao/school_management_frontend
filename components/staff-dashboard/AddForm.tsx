import React from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { toast } from 'sonner';

const formSchema = z.object({
  role: z.string(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  gender: z.string(),
  assigned: z.string(),
  address: z.string(),
  dob: z.string(),
  maritalStatus: z.string(),
  state: z.string(),
  medical: z.string(),
});

const AddForm = () => {
  const { register, handleSubmit, setValue } = useForm({
    resolver: zodResolver(formSchema),
  });

  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(prev => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'application/pdf': [],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [],
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': [],
    },
  });
  const onSubmit = () => {
    toast.success("User has been Created!"); 
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto p-4 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label>Switch Role</Label>
            <Select onValueChange={(val) => setValue("role", val)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="staff">Staff</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Name</Label>
            <Input {...register("name")} placeholder="Enter Name" />
          </div>
          <div>
            <Label>Email</Label>
            <Input {...register("email")} placeholder="Enter Email" />
          </div>
          <div className="grid grid-cols-3 gap-2 items-end">
            <div>
              <Label>Code</Label>
              <Select onValueChange={() => { }} >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="+234" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="+234">+234</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2">
              <Label>Phone</Label>
              <Input {...register("phone")} placeholder="Enter Phone" />
            </div>
          </div>
          <div>
            <Label>Gender</Label>
            <Select onValueChange={(val) => setValue("gender", val)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent  >
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Assigned</Label>
            <Select onValueChange={(val) => setValue("assigned", val)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select office" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Record Office">Record Office</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Address</Label>
            <Input {...register("address")} placeholder="Enter Address" />
          </div>
          <div>
            <Label>Date Of Birth</Label>
            <Input {...register("dob")} type="date" />
          </div>
          <div>
            <Label>Marital Status</Label>
            <Select onValueChange={(val) => setValue("maritalStatus", val)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single">Single</SelectItem>
                <SelectItem value="married">Married</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>State Of Origin</Label>
            <Select onValueChange={(val) => setValue("state", val)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Anambra State" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="anambra">Anambra</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Medical Condition</Label>
            <Select onValueChange={(val) => setValue("medical", val)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Nil" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nil">Nil</SelectItem>
                <SelectItem value="asthma">Asthma</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div>
          <Label>Upload documents</Label>
          <div {...getRootProps()} className="border-2 border-dashed border-teal-500 p-6 rounded-md text-center cursor-pointer mt-2">
            <input {...getInputProps()} />
            <p className="text-sm text-gray-600">
              Drag & drop files or <span className="text-teal-600 font-semibold">Browse</span>
            </p>
            <p className="text-xs text-gray-400">Supported: JPEG, PNG, PDF, Word, PPT</p>
            {files.length > 0 && (
              <ul className="mt-2 text-sm text-left">
                {files.map((file, index) => (
                  <li key={index}>📄 {file.name}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="flex justify-center gap-4 pt-4">
          <Button type="submit" onClick={() => toast("User has been Created!") } className="bg-[#008080] text-white hover:bg-[#008080] px-6 cursor-pointer">Save</Button>
          <Button type="button" variant="outline" className="text-[#EF1A36] border !border-[#EF1A36] hover:bg-red-50 px-6 cursor-pointer">Cancel</Button>
        </div>
      </form>
    </div>
  )
}

export default AddForm