"use client";

import { useState } from "react";
import { Download, FileText, File, Table, Calendar, Users, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  generateStudentReport,
  generateAttendanceReport,
  generateGradeReport,
  ExportOptions
} from "@/lib/utils/export";

export type ReportType = 'students' | 'attendance' | 'grades' | 'custom';
export type ExportFormat = 'pdf' | 'excel' | 'csv';

interface ExportDialogProps {
  reportType: ReportType;
  data: any[];
  title?: string;
  trigger?: React.ReactNode;
  onExport?: (format: ExportFormat, options: ExportOptions) => void;
}

export default function ExportDialog({
  reportType,
  data,
  title,
  trigger,
  onExport
}: ExportDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [format, setFormat] = useState<ExportFormat>('pdf');
  const [filename, setFilename] = useState('');
  const [includeMetadata, setIncludeMetadata] = useState(true);
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [isExporting, setIsExporting] = useState(false);

  const getReportIcon = () => {
    switch (reportType) {
      case 'students': return <Users className="w-5 h-5" />;
      case 'attendance': return <Calendar className="w-5 h-5" />;
      case 'grades': return <BookOpen className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  const getReportTitle = () => {
    if (title) return title;
    switch (reportType) {
      case 'students': return 'Student Report';
      case 'attendance': return 'Attendance Report';
      case 'grades': return 'Grade Report';
      default: return 'Report';
    }
  };

  const getFormatIcon = (fmt: ExportFormat) => {
    switch (fmt) {
      case 'pdf': return <FileText className="w-4 h-4" />;
      case 'excel': return <Table className="w-4 h-4" />;
      case 'csv': return <File className="w-4 h-4" />;
    }
  };

  const getFormatDescription = (fmt: ExportFormat) => {
    switch (fmt) {
      case 'pdf': 
        return 'Best for sharing and printing. Preserves formatting and layout.';
      case 'excel': 
        return 'Best for data analysis. Can be opened in Excel or Google Sheets.';
      case 'csv': 
        return 'Universal format. Can be imported into any spreadsheet application.';
    }
  };

  const getDefaultFilename = () => {
    const date = new Date().toISOString().split('T')[0];
    const type = reportType === 'custom' ? 'report' : reportType;
    return `${type}-report-${date}`;
  };

  const handleExport = async () => {
    if (data.length === 0) {
      toast.error('No data available to export');
      return;
    }

    setIsExporting(true);

    try {
      const options: ExportOptions = {
        filename: filename || getDefaultFilename(),
        orientation,
        includeMetadata
      };

      if (onExport) {
        onExport(format, options);
      } else {
        // Use built-in export functions
        const reportTitle = getReportTitle();
        
        switch (reportType) {
          case 'students':
            await generateStudentReport(data, reportTitle, format);
            break;
          case 'attendance':
            await generateAttendanceReport(data, reportTitle, format);
            break;
          case 'grades':
            await generateGradeReport(data, reportTitle, format);
            break;
          default:
            toast.error('Export not supported for this report type');
            return;
        }
      }

      toast.success(`${getReportTitle()} exported successfully as ${format.toUpperCase()}`);
      setIsOpen(false);
    } catch (error) {
      console.error('Export failed:', error);
      toast.error('Failed to export report. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        )}
      </DialogTrigger>
      
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getReportIcon()}
            Export {getReportTitle()}
          </DialogTitle>
          <DialogDescription>
            Choose your export format and customize the output options.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Report Summary */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Records to export</p>
                  <p className="text-2xl font-bold text-[#1B5B5E]">{data.length}</p>
                </div>
                <Badge variant="outline" className="flex items-center gap-1">
                  {getReportIcon()}
                  {reportType.charAt(0).toUpperCase() + reportType.slice(1)}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Format Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Export Format</Label>
            <RadioGroup value={format} onValueChange={(value: ExportFormat) => setFormat(value)}>
              {(['pdf', 'excel', 'csv'] as ExportFormat[]).map((fmt) => (
                <div key={fmt} className="flex items-center space-x-2">
                  <RadioGroupItem value={fmt} id={fmt} />
                  <Label
                    htmlFor={fmt}
                    className="flex-1 cursor-pointer"
                  >
                    <div className="flex items-center gap-3 p-3 rounded-lg border hover:bg-gray-50">
                      {getFormatIcon(fmt)}
                      <div className="flex-1">
                        <p className="font-medium text-sm">
                          {fmt.toUpperCase()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {getFormatDescription(fmt)}
                        </p>
                      </div>
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <Separator />

          {/* Options */}
          <div className="space-y-4">
            <Label className="text-sm font-medium">Export Options</Label>
            
            {/* Filename */}
            <div className="space-y-2">
              <Label htmlFor="filename" className="text-xs text-muted-foreground">
                Filename (optional)
              </Label>
              <Input
                id="filename"
                placeholder={getDefaultFilename()}
                value={filename}
                onChange={(e) => setFilename(e.target.value)}
                className="text-sm"
              />
            </div>

            {/* PDF Orientation */}
            {format === 'pdf' && (
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Page Orientation</Label>
                <Select value={orientation} onValueChange={(value: 'portrait' | 'landscape') => setOrientation(value)}>
                  <SelectTrigger className="text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="portrait">Portrait</SelectItem>
                    <SelectItem value="landscape">Landscape</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Include Metadata */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="metadata"
                checked={includeMetadata}
                onCheckedChange={(checked) => setIncludeMetadata(checked as boolean)}
              />
              <Label htmlFor="metadata" className="text-xs text-muted-foreground cursor-pointer">
                Include report metadata and summary information
              </Label>
            </div>
          </div>
        </div>

        {/* Export Button */}
        <div className="flex gap-2 pt-4">
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleExport}
            disabled={isExporting || data.length === 0}
            className="flex-1 bg-[#1B5B5E] hover:bg-[#134345]"
          >
            {isExporting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Exporting...
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Export {format.toUpperCase()}
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}