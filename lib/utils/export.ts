import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

export interface ExportData {
  headers: string[];
  rows: (string | number)[][];
  title?: string;
  subtitle?: string;
  metadata?: Record<string, string>;
}

export interface ExportOptions {
  filename?: string;
  orientation?: 'portrait' | 'landscape';
  format?: 'a4' | 'letter';
  includeMetadata?: boolean;
  customStyles?: {
    headerColor?: string;
    textColor?: string;
    fontSize?: number;
  };
}

// PDF Export Functions
export const exportToPDF = (data: ExportData, options: ExportOptions = {}) => {
  const {
    filename = 'export',
    orientation = 'portrait',
    format = 'a4',
    includeMetadata = true,
    customStyles = {}
  } = options;

  const doc = new jsPDF({
    orientation,
    unit: 'mm',
    format
  });

  const {
    headerColor = '#1B5B5E',
    textColor = '#333333',
    fontSize = 10
  } = customStyles;

  let yPosition = 20;

  // Add title
  if (data.title) {
    doc.setFontSize(16);
    doc.setTextColor(headerColor);
    doc.text(data.title, 20, yPosition);
    yPosition += 10;
  }

  // Add subtitle
  if (data.subtitle) {
    doc.setFontSize(12);
    doc.setTextColor(textColor);
    doc.text(data.subtitle, 20, yPosition);
    yPosition += 8;
  }

  // Add metadata
  if (includeMetadata && data.metadata) {
    doc.setFontSize(8);
    doc.setTextColor('#666666');
    Object.entries(data.metadata).forEach(([key, value]) => {
      doc.text(`${key}: ${value}`, 20, yPosition);
      yPosition += 4;
    });
    yPosition += 5;
  }

  // Add table
  autoTable(doc, {
    head: [data.headers],
    body: data.rows,
    startY: yPosition,
    styles: {
      fontSize: fontSize,
      textColor: textColor,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: headerColor,
      textColor: '#ffffff',
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: '#f8f9fa',
    },
    tableLineColor: '#e0e0e0',
    tableLineWidth: 0.1,
    theme: 'grid',
  });

  // Add footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor('#666666');
    doc.text(
      `Page ${i} of ${pageCount}`,
      doc.internal.pageSize.width - 30,
      doc.internal.pageSize.height - 10
    );
    doc.text(
      `Generated on ${new Date().toLocaleDateString()}`,
      20,
      doc.internal.pageSize.height - 10
    );
  }

  doc.save(`${filename}.pdf`);
};

// Excel Export Functions
export const exportToExcel = (data: ExportData, options: ExportOptions = {}) => {
  const { filename = 'export', includeMetadata = true } = options;

  // Create workbook and worksheet
  const wb = XLSX.utils.book_new();
  
  // Prepare data with headers
  const wsData = [data.headers, ...data.rows];
  
  // Add metadata rows at the top if enabled
  if (includeMetadata) {
    const metadataRows: (string | number)[][] = [];
    
    if (data.title) {
      metadataRows.push([data.title]);
      metadataRows.push([]);
    }
    
    if (data.subtitle) {
      metadataRows.push([data.subtitle]);
      metadataRows.push([]);
    }
    
    if (data.metadata) {
      Object.entries(data.metadata).forEach(([key, value]) => {
        metadataRows.push([`${key}:`, value]);
      });
      metadataRows.push([]);
    }
    
    wsData.unshift(...metadataRows);
  }

  // Create worksheet
  const ws = XLSX.utils.aoa_to_sheet(wsData);

  // Auto-size columns
  const colWidths = data.headers.map((header, index) => {
    const maxLength = Math.max(
      header.length,
      ...data.rows.map(row => String(row[index] || '').length)
    );
    return { wch: Math.min(maxLength + 2, 50) };
  });
  ws['!cols'] = colWidths;

  // Style the header row
  const headerRowIndex = includeMetadata ? 
    (data.title ? 1 : 0) + (data.subtitle ? 1 : 0) + 
    (data.metadata ? Object.keys(data.metadata).length + 1 : 0) + 1 : 0;

  for (let i = 0; i < data.headers.length; i++) {
    const cellRef = XLSX.utils.encode_cell({ r: headerRowIndex, c: i });
    if (!ws[cellRef]) continue;
    
    ws[cellRef].s = {
      font: { bold: true, color: { rgb: 'FFFFFF' } },
      fill: { fgColor: { rgb: '1B5B5E' } },
      alignment: { horizontal: 'center' }
    };
  }

  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(wb, ws, 'Data');

  // Save file
  XLSX.writeFile(wb, `${filename}.xlsx`);
};

// CSV Export Function
export const exportToCSV = (data: ExportData, options: ExportOptions = {}) => {
  const { filename = 'export', includeMetadata = true } = options;

  let csvContent = '';

  // Add metadata
  if (includeMetadata) {
    if (data.title) {
      csvContent += `"${data.title}"\n\n`;
    }
    if (data.subtitle) {
      csvContent += `"${data.subtitle}"\n\n`;
    }
    if (data.metadata) {
      Object.entries(data.metadata).forEach(([key, value]) => {
        csvContent += `"${key}","${value}"\n`;
      });
      csvContent += '\n';
    }
  }

  // Add headers
  csvContent += data.headers.map(header => `"${header}"`).join(',') + '\n';

  // Add rows
  data.rows.forEach(row => {
    csvContent += row.map(cell => `"${cell || ''}"`).join(',') + '\n';
  });

  // Create and download file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

// Utility function to format data for export
export const formatDataForExport = (
  rawData: any[],
  columnConfig: {
    key: string;
    header: string;
    formatter?: (value: any, row: any) => string | number;
  }[]
): ExportData => {
  const headers = columnConfig.map(config => config.header);
  
  const rows = rawData.map(item => 
    columnConfig.map(config => {
      const value = item[config.key];
      return config.formatter ? config.formatter(value, item) : value;
    })
  );

  return { headers, rows };
};

// Predefined export configurations for common data types
export const studentReportConfig = [
  { key: 'studentId', header: 'Student ID' },
  { key: 'name', header: 'Name' },
  { key: 'class', header: 'Class' },
  { key: 'grade', header: 'Grade' },
  { key: 'attendanceRate', header: 'Attendance %', formatter: (value: number) => `${value.toFixed(1)}%` },
  { key: 'averageGrade', header: 'Average Grade', formatter: (value: number) => value.toFixed(1) },
  { key: 'status', header: 'Status' }
];

export const attendanceReportConfig = [
  { key: 'date', header: 'Date', formatter: (value: string) => new Date(value).toLocaleDateString() },
  { key: 'studentName', header: 'Student Name' },
  { key: 'class', header: 'Class' },
  { key: 'status', header: 'Status' },
  { key: 'subject', header: 'Subject' },
  { key: 'notes', header: 'Notes' }
];

export const gradeReportConfig = [
  { key: 'studentName', header: 'Student Name' },
  { key: 'subject', header: 'Subject' },
  { key: 'assignment', header: 'Assignment' },
  { key: 'grade', header: 'Grade' },
  { key: 'maxGrade', header: 'Max Grade' },
  { key: 'percentage', header: 'Percentage', formatter: (value: number) => `${value.toFixed(1)}%` },
  { key: 'type', header: 'Type' },
  { key: 'date', header: 'Date', formatter: (value: string) => new Date(value).toLocaleDateString() }
];

// Report generation functions
export const generateStudentReport = async (
  students: any[],
  title = 'Student Report',
  format: 'pdf' | 'excel' | 'csv' = 'pdf'
) => {
  const data = formatDataForExport(students, studentReportConfig);
  
  data.title = title;
  data.subtitle = `Generated on ${new Date().toLocaleDateString()}`;
  data.metadata = {
    'Total Students': students.length.toString(),
    'Report Type': 'Student Summary',
    'Export Format': format.toUpperCase()
  };

  const filename = `student-report-${new Date().toISOString().split('T')[0]}`;

  switch (format) {
    case 'pdf':
      exportToPDF(data, { filename });
      break;
    case 'excel':
      exportToExcel(data, { filename });
      break;
    case 'csv':
      exportToCSV(data, { filename });
      break;
  }
};

export const generateAttendanceReport = async (
  attendance: any[],
  title = 'Attendance Report',
  format: 'pdf' | 'excel' | 'csv' = 'pdf'
) => {
  const data = formatDataForExport(attendance, attendanceReportConfig);
  
  data.title = title;
  data.subtitle = `Generated on ${new Date().toLocaleDateString()}`;
  data.metadata = {
    'Total Records': attendance.length.toString(),
    'Report Type': 'Attendance Summary',
    'Export Format': format.toUpperCase()
  };

  const filename = `attendance-report-${new Date().toISOString().split('T')[0]}`;

  switch (format) {
    case 'pdf':
      exportToPDF(data, { filename });
      break;
    case 'excel':
      exportToExcel(data, { filename });
      break;
    case 'csv':
      exportToCSV(data, { filename });
      break;
  }
};

export const generateGradeReport = async (
  grades: any[],
  title = 'Grade Report',
  format: 'pdf' | 'excel' | 'csv' = 'pdf'
) => {
  const data = formatDataForExport(grades, gradeReportConfig);
  
  data.title = title;
  data.subtitle = `Generated on ${new Date().toLocaleDateString()}`;
  data.metadata = {
    'Total Grades': grades.length.toString(),
    'Report Type': 'Grade Summary',
    'Export Format': format.toUpperCase()
  };

  const filename = `grade-report-${new Date().toISOString().split('T')[0]}`;

  switch (format) {
    case 'pdf':
      exportToPDF(data, { filename });
      break;
    case 'excel':
      exportToExcel(data, { filename });
      break;
    case 'csv':
      exportToCSV(data, { filename });
      break;
  }
};