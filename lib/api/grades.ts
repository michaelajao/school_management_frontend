import { apiClient } from './client';
import type { ApiResponse, PaginatedResponse } from './client';

// Grade types
export interface Grade {
  id: string;
  studentId: string;
  subjectId: string;
  classId: string;
  term: string;
  academicYear: string;
  assessmentType: 'assignment' | 'quiz' | 'exam' | 'project' | 'participation';
  score: number;
  maxScore: number;
  percentage: number;
  grade: string;
  comments?: string;
  teacherId: string;
  student: {
    id: string;
    firstName: string;
    lastName: string;
    studentId: string;
  };
  subject: {
    id: string;
    name: string;
    code: string;
  };
  teacher: {
    id: string;
    firstName: string;
    lastName: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateGradeData {
  studentId: string;
  subjectId: string;
  classId: string;
  term: string;
  academicYear: string;
  assessmentType: 'assignment' | 'quiz' | 'exam' | 'project' | 'participation';
  score: number;
  maxScore: number;
  comments?: string;
}

export interface UpdateGradeData {
  score?: number;
  maxScore?: number;
  comments?: string;
  assessmentType?: 'assignment' | 'quiz' | 'exam' | 'project' | 'participation';
}

export interface GradeFilters {
  studentId?: string;
  subjectId?: string;
  classId?: string;
  term?: string;
  academicYear?: string;
  assessmentType?: 'assignment' | 'quiz' | 'exam' | 'project' | 'participation';
  teacherId?: string;
  minScore?: number;
  maxScore?: number;
  page?: number;
  limit?: number;
}

export type PaginatedGrades = PaginatedResponse<Grade>;

export interface GradeStats {
  totalGrades: number;
  averageScore: number;
  passRate: number;
  byAssessmentType: Record<string, {
    count: number;
    averageScore: number;
  }>;
  bySubject: Record<string, {
    count: number;
    averageScore: number;
  }>;
  gradeDistribution: Record<string, number>;
}

export interface StudentGradeSummary {
  studentId: string;
  student: {
    firstName: string;
    lastName: string;
    studentId: string;
  };
  term: string;
  academicYear: string;
  overallAverage: number;
  overallGrade: string;
  subjectGrades: Array<{
    subject: {
      id: string;
      name: string;
      code: string;
    };
    average: number;
    grade: string;
    assessments: Grade[];
  }>;
  rank?: number;
  totalStudents?: number;
}

export interface BulkGradeData {
  grades: CreateGradeData[];
}

export class GradesApiService {
  private static baseUrl = '/api/proxy/grades';

  static async getAll(filters?: GradeFilters): Promise<ApiResponse<PaginatedGrades>> {
    const params = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          params.append(key, value.toString());
        }
      });
    }

    const url = params.toString() ? `${this.baseUrl}?${params}` : this.baseUrl;
    return apiClient.get<PaginatedGrades>(url);
  }

  static async getById(id: string): Promise<ApiResponse<Grade>> {
    return apiClient.get<Grade>(`${this.baseUrl}/${id}`);
  }

  static async create(data: CreateGradeData): Promise<ApiResponse<Grade>> {
    return apiClient.post<Grade>(this.baseUrl, data);
  }

  static async update(id: string, data: UpdateGradeData): Promise<ApiResponse<Grade>> {
    return apiClient.put<Grade>(`${this.baseUrl}/${id}`, data);
  }

  static async delete(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(`${this.baseUrl}/${id}`);
  }

  static async getStats(filters?: Omit<GradeFilters, 'page' | 'limit'>): Promise<ApiResponse<GradeStats>> {
    const params = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          params.append(key, value.toString());
        }
      });
    }

    const url = params.toString() ? `${this.baseUrl}/stats?${params}` : `${this.baseUrl}/stats`;
    return apiClient.get<GradeStats>(url);
  }

  static async getByStudent(studentId: string, term?: string, academicYear?: string): Promise<ApiResponse<Grade[]>> {
    const params = new URLSearchParams();
    if (term) params.append('term', term);
    if (academicYear) params.append('academicYear', academicYear);
    
    const url = params.toString() ? `${this.baseUrl}/student/${studentId}?${params}` : `${this.baseUrl}/student/${studentId}`;
    return apiClient.get<Grade[]>(url);
  }

  static async getByClass(classId: string, subjectId?: string, term?: string, academicYear?: string): Promise<ApiResponse<Grade[]>> {
    const params = new URLSearchParams();
    if (subjectId) params.append('subjectId', subjectId);
    if (term) params.append('term', term);
    if (academicYear) params.append('academicYear', academicYear);
    
    const url = params.toString() ? `${this.baseUrl}/class/${classId}?${params}` : `${this.baseUrl}/class/${classId}`;
    return apiClient.get<Grade[]>(url);
  }

  static async getStudentSummary(studentId: string, term: string, academicYear: string): Promise<ApiResponse<StudentGradeSummary>> {
    return apiClient.get<StudentGradeSummary>(`${this.baseUrl}/student/${studentId}/summary?term=${term}&academicYear=${academicYear}`);
  }

  static async getClassSummary(classId: string, term: string, academicYear: string): Promise<ApiResponse<StudentGradeSummary[]>> {
    return apiClient.get<StudentGradeSummary[]>(`${this.baseUrl}/class/${classId}/summary?term=${term}&academicYear=${academicYear}`);
  }

  static async bulkCreate(data: BulkGradeData): Promise<ApiResponse<Grade[]>> {
    return apiClient.post<Grade[]>(`${this.baseUrl}/bulk`, data);
  }

  static async bulkUpdate(updates: Array<{ id: string; data: UpdateGradeData }>): Promise<ApiResponse<Grade[]>> {
    return apiClient.put<Grade[]>(`${this.baseUrl}/bulk`, { updates });
  }

  static async generateReportCard(studentId: string, term: string, academicYear: string): Promise<ApiResponse<Blob>> {
    return apiClient.get<Blob>(`${this.baseUrl}/student/${studentId}/report-card?term=${term}&academicYear=${academicYear}`, { responseType: 'blob' });
  }

  static async exportGrades(filters?: GradeFilters): Promise<ApiResponse<Blob>> {
    const params = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          params.append(key, value.toString());
        }
      });
    }

    const url = params.toString() ? `${this.baseUrl}/export?${params}` : `${this.baseUrl}/export`;
    return apiClient.get<Blob>(url, { responseType: 'blob' });
  }
}