import { apiClient } from './client';
import type { ApiResponse } from './client';

// Settings types
export interface StudentIdConfig {
  format: 'auto' | 'custom';
  pattern: string;
  prefix: string;
  includeYear: boolean;
  yearFormat: 'full' | 'short';
  sequenceLength: number;
  separator?: string;
  caseFormat: 'upper' | 'lower' | 'mixed';
  startingNumber: number;
  examples: string[];
}

export interface SchoolInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  logo?: string;
  principalName?: string;
  establishedYear?: number;
  schoolCode?: string;
}

export interface AcademicSettings {
  gradeLevels: string[];
  subjects: string[];
  defaultClassCapacity: number;
  academicYearStart: string;
  academicYearEnd: string;
  termSystem: 'semester' | 'trimester' | 'quarterly';
  gradingScale: 'percentage' | 'gpa' | 'letter';
}

export interface NotificationSettings {
  emailEnabled: boolean;
  smsEnabled: boolean;
  pushEnabled: boolean;
  parentNotifications: {
    attendance: boolean;
    grades: boolean;
    assignments: boolean;
    events: boolean;
  };
  teacherNotifications: {
    newStudents: boolean;
    parentMessages: boolean;
    systemUpdates: boolean;
  };
}

export interface SecuritySettings {
  passwordMinLength: number;
  passwordRequireSpecialChars: boolean;
  passwordRequireNumbers: boolean;
  passwordRequireUppercase: boolean;
  sessionTimeout: number;
  twoFactorEnabled: boolean;
  loginAttemptLimit: number;
  lockoutDuration: number;
}

export interface SchoolSettings {
  id?: string;
  schoolId: string;
  schoolInfo: SchoolInfo;
  studentIdConfig: StudentIdConfig;
  academicSettings: AcademicSettings;
  notificationSettings: NotificationSettings;
  securitySettings: SecuritySettings;
  createdAt?: string;
  updatedAt?: string;
}

export interface StudentIdPreview {
  examples: string[];
  nextId: string;
  pattern: string;
  isValid: boolean;
  errors?: string[];
}

export interface GenerateStudentIdRequest {
  config?: Partial<StudentIdConfig>;
  preview?: boolean;
}

export interface GenerateStudentIdResponse {
  studentId: string;
  sequence: number;
  year: number;
}

// Settings API service
export class SettingsApiService {
  // Get school settings
  static async getSettings(): Promise<ApiResponse<SchoolSettings>> {
    return apiClient.get<SchoolSettings>('/api/settings');
  }

  // Update school settings
  static async updateSettings(
    data: Partial<SchoolSettings>
  ): Promise<ApiResponse<SchoolSettings>> {
    return apiClient.put<SchoolSettings>('/api/settings', data);
  }

  // Generate student ID preview
  static async previewStudentId(
    config: Partial<StudentIdConfig>
  ): Promise<ApiResponse<StudentIdPreview>> {
    return apiClient.get<StudentIdPreview>('/api/settings/student-id', {
      params: { config: JSON.stringify(config) }
    });
  }

  // Generate new student ID
  static async generateStudentId(
    request?: GenerateStudentIdRequest
  ): Promise<ApiResponse<GenerateStudentIdResponse>> {
    return apiClient.post<GenerateStudentIdResponse>('/api/settings/student-id', request);
  }

  // Validate student ID format
  static async validateStudentId(studentId: string): Promise<ApiResponse<{ isValid: boolean; errors?: string[] }>> {
    return apiClient.get<{ isValid: boolean; errors?: string[] }>('/api/settings/student-id/validate', {
      params: { studentId }
    });
  }

  // Get default settings template
  static getDefaultSettings(): Partial<SchoolSettings> {
    return {
      schoolInfo: {
        name: '',
        address: '',
        phone: '',
        email: '',
        website: '',
        principalName: '',
        establishedYear: new Date().getFullYear(),
        schoolCode: ''
      },
      studentIdConfig: {
        format: 'auto',
        pattern: '{PREFIX}{YEAR}{SEQUENCE}',
        prefix: 'SMS',
        includeYear: true,
        yearFormat: 'full',
        sequenceLength: 3,
        separator: '',
        caseFormat: 'upper',
        startingNumber: 1,
        examples: []
      },
      academicSettings: {
        gradeLevels: ['K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        subjects: ['Mathematics', 'English', 'Science', 'Social Studies', 'Physical Education'],
        defaultClassCapacity: 30,
        academicYearStart: new Date().getFullYear() + '-09-01',
        academicYearEnd: (new Date().getFullYear() + 1) + '-06-30',
        termSystem: 'semester',
        gradingScale: 'percentage'
      },
      notificationSettings: {
        emailEnabled: true,
        smsEnabled: false,
        pushEnabled: true,
        parentNotifications: {
          attendance: true,
          grades: true,
          assignments: true,
          events: true
        },
        teacherNotifications: {
          newStudents: true,
          parentMessages: true,
          systemUpdates: true
        }
      },
      securitySettings: {
        passwordMinLength: 8,
        passwordRequireSpecialChars: true,
        passwordRequireNumbers: true,
        passwordRequireUppercase: true,
        sessionTimeout: 30,
        twoFactorEnabled: false,
        loginAttemptLimit: 5,
        lockoutDuration: 15
      }
    };
  }

  // Student ID pattern helpers
  static getPatternTemplates(): Array<{ name: string; pattern: string; example: string; description: string }> {
    return [
      {
        name: 'Standard with Year',
        pattern: '{PREFIX}{YEAR}{SEQUENCE}',
        example: 'SMS2024001',
        description: 'School prefix + full year + sequence number'
      },
      {
        name: 'Short Year with Dash',
        pattern: '{PREFIX}{YEAR_SHORT}-{SEQUENCE}',
        example: 'SMS24-001',
        description: 'School prefix + short year + dash + sequence'
      },
      {
        name: 'Underscore Separated',
        pattern: '{PREFIX}_{YEAR}_{SEQUENCE}',
        example: 'SMS_2024_001',
        description: 'All components separated by underscores'
      },
      {
        name: 'No Year',
        pattern: '{PREFIX}{SEQUENCE}',
        example: 'SMS001',
        description: 'Simple format without year'
      },
      {
        name: 'Year First',
        pattern: '{YEAR}{PREFIX}{SEQUENCE}',
        example: '2024SMS001',
        description: 'Year first followed by prefix and sequence'
      },
      {
        name: 'Dot Separated',
        pattern: '{PREFIX}.{YEAR}.{SEQUENCE}',
        example: 'SMS.2024.001',
        description: 'Components separated by dots'
      }
    ];
  }

  // Generate preview examples
  static generatePreviewExamples(config: StudentIdConfig, count: number = 5): string[] {
    const examples: string[] = [];
    const currentYear = new Date().getFullYear();
    const year = config.yearFormat === 'full' ? currentYear.toString() : currentYear.toString().slice(-2);
    
    for (let i = 0; i < count; i++) {
      const sequence = (config.startingNumber + i).toString().padStart(config.sequenceLength, '0');
      let id = config.pattern
        .replace('{PREFIX}', config.prefix)
        .replace('{YEAR}', config.includeYear ? year : '')
        .replace('{YEAR_SHORT}', config.includeYear ? year.slice(-2) : '')
        .replace('{SEQUENCE}', sequence);
      
      // Apply case formatting
      switch (config.caseFormat) {
        case 'upper':
          id = id.toUpperCase();
          break;
        case 'lower':
          id = id.toLowerCase();
          break;
        // 'mixed' keeps original case
      }
      
      examples.push(id);
    }
    
    return examples;
  }
}