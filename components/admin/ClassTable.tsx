"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

// Define ClassData type
export type ClassData = {
  id: string;
  name: string;
  teacher?: string; // Optional teacher name/ID
  studentCount: number;
};

type ClassTableProps = {
  classes: ClassData[];
  onEdit: (classData: ClassData) => void;
  onDelete: (classId: string) => void; // Add delete handler prop
};

export function ClassTable({ classes, onEdit, onDelete }: ClassTableProps) {
  if (!classes || classes.length === 0) {
    return <p className="text-sm text-muted-foreground">No classes found.</p>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Class Name</TableHead>
          <TableHead>Teacher</TableHead>
          <TableHead>Students</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {classes.map((cls) => (
          <TableRow key={cls.id}>
            <TableCell className="font-medium">{cls.name}</TableCell>
            <TableCell>{cls.teacher || "Not Assigned"}</TableCell>
            <TableCell>{cls.studentCount}</TableCell>
            <TableCell className="text-right space-x-2">
              <Button variant="outline" size="sm" onClick={() => onEdit(cls)}>
                Edit
              </Button>
              <Button variant="destructive" size="sm" onClick={() => onDelete(cls.id)}>
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
