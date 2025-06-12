"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { 
  Clipboard, CheckCircle, Calendar, Filter, Search, FileText
} from "lucide-react";

interface Assignment {
  class: string;
  subject: string;
  title: string;
  dueDate: string;
  submitted: string;
  pendingReview: number;
  status: string;
}

interface AssignmentManagerProps {
  assignmentsData?: Assignment[];
}

export const AssignmentManager = ({ 
  assignmentsData = [] 
}: AssignmentManagerProps) => {
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const defaultAssignmentsData: Assignment[] = [
    { 
      class: "Year 7B", 
      subject: "Mathematics", 
      title: "Algebra Homework", 
      dueDate: "28 March 2025", 
      submitted: "28 / 30", 
      pendingReview: 4, 
      status: "Graded" 
    },
    { 
      class: "Year 8C", 
      subject: "Physics", 
      title: "Newton's Laws Worksheet", 
      dueDate: "30 March 2025", 
      submitted: "25 / 25", 
      pendingReview: 0, 
      status: "Graded" 
    },
    { 
      class: "Year 9A", 
      subject: "Chemistry", 
      title: "Periodic Table Quiz", 
      dueDate: "02 April 2025", 
      submitted: "20 / 22", 
      pendingReview: 22, 
      status: "Pending Grade" 
    },
  ];

  const assignments = assignmentsData.length > 0 ? assignmentsData : defaultAssignmentsData;

  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.subject.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === "all" || 
                         (filterStatus === "pending" && assignment.pendingReview > 0) ||
                         (filterStatus === "graded" && assignment.status === "Graded") ||
                         (filterStatus === "overdue" && assignment.status === "Overdue");
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Clipboard className="w-5 h-5 mr-2" />
              Assignment Management
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4" />
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Filter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="pending">Pending Review</SelectItem>
                    <SelectItem value="graded">Graded</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Search className="w-4 h-4" />
                <Input 
                  placeholder="Search assignments..." 
                  className="w-48"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button>
                <FileText className="w-4 h-4 mr-2" />
                Create Assignment
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Class</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Submissions</TableHead>
                <TableHead>Pending Review</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAssignments.map((assignment, index) => (
                <TableRow key={index} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{assignment.class}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{assignment.subject}</Badge>
                  </TableCell>
                  <TableCell>{assignment.title}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span>{assignment.dueDate}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Progress 
                        value={parseInt(assignment.submitted.split(' / ')[0]) / parseInt(assignment.submitted.split(' / ')[1]) * 100} 
                        className="w-16 h-2" 
                      />
                      <span className="text-sm">{assignment.submitted}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={assignment.pendingReview > 0 ? "destructive" : "secondary"}>
                      {assignment.pendingReview}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={assignment.status === "Graded" ? "secondary" : "outline"}
                      className={assignment.status === "Graded" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}
                    >
                      {assignment.status === "Graded" && <CheckCircle className="h-3 w-3 mr-1"/>}
                      {assignment.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="sm">View</Button>
                      {assignment.pendingReview > 0 && (
                        <Button variant="ghost" size="sm" className="text-blue-600">
                          Grade ({assignment.pendingReview})
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Assignment Analytics Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Assignment Submission Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {assignments.map((assignment, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium">{assignment.title}</p>
                    <p className="text-sm text-gray-600">{assignment.class}</p>
                  </div>
                  <Badge variant={assignment.status === "Graded" ? "secondary" : "outline"}>
                    {assignment.status}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Submitted:</span>
                    <span className="font-medium">{assignment.submitted}</span>
                  </div>
                  <Progress 
                    value={parseInt(assignment.submitted.split(' / ')[0]) / parseInt(assignment.submitted.split(' / ')[1]) * 100} 
                    className="h-2" 
                  />
                  {assignment.pendingReview > 0 && (
                    <p className="text-sm text-orange-600">
                      {assignment.pendingReview} pending review
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};