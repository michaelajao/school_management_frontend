import { apiClient } from './client';
import type { ApiResponse, PaginatedResponse } from './client';

// Subject types
export interface Subject {
  id: string;
  name: string;
  code: string;
  description?: string;
  credits: number;
  department?: string;
  gradeLevel: string;
  isCore: boolean;
  isActive: boolean;
  prerequisites?: string[];
  teachers: Array<{
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  }>;
  classes: Array<{
    id: string;
    name: string;
    grade: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSubjectData {
  name: string;
  code: string;
  description?: string;
  credits: number;
  department?: string;
  gradeLevel: string;
  isCore?: boolean;
  prerequisites?: string[];
}

export interface UpdateSubjectData {
  name?: string;
  code?: string;
  description?: string;
  credits?: number;
  department?: string;
  gradeLevel?: string;
  isCore?: boolean;
  isActive?: boolean;
  prerequisites?: string[];
}

export interface SubjectFilters {
  gradeLevel?: string;
  department?: string;
  isCore?: boolean;
  isActive?: boolean;
  search?: string;
  page?: number;
  limit?: number;
}

export type PaginatedSubjects = PaginatedResponse<Subject>;

export interface SubjectStats {
  total: number;
  coreSubjects: number;
  electiveSubjects: number;
  byGradeLevel: Record<string, number>;
  byDepartment: Record<string, number>;
  activeSubjects: number;
  inactiveSubjects: number;
}

export interface SubjectTeacherAssignment {
  subjectId: string;
  teacherIds: string[];
}

export interface SubjectClassAssignment {
  subjectId: string;
  classIds: string[];
}

export class SubjectsApiService {
  private static baseUrl = '/api/proxy/subjects';

  static async getAll(filters?: SubjectFilters): Promise<ApiResponse<PaginatedSubjects>> {
    const params = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          params.append(key, value.toString());
        }
      });
    }

    const url = params.toString() ? `${this.baseUrl}?${params}` : this.baseUrl;
    return apiClient.get<PaginatedSubjects>(url);
  }

  static async getById(id: string): Promise<ApiResponse<Subject>> {
    return apiClient.get<Subject>(`${this.baseUrl}/${id}`);
  }

  static async create(data: CreateSubjectData): Promise<ApiResponse<Subject>> {
    return apiClient.post<Subject>(this.baseUrl, data);
  }

  static async update(id: string, data: UpdateSubjectData): Promise<ApiResponse<Subject>> {
    return apiClient.put<Subject>(`${this.baseUrl}/${id}`, data);
  }

  static async delete(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(`${this.baseUrl}/${id}`);
  }

  static async getStats(): Promise<ApiResponse<SubjectStats>> {
    return apiClient.get<SubjectStats>(`${this.baseUrl}/stats`);
  }

  static async getByGradeLevel(gradeLevel: string): Promise<ApiResponse<Subject[]>> {
    return apiClient.get<Subject[]>(`${this.baseUrl}/grade-level/${encodeURIComponent(gradeLevel)}`);
  }

  static async getByDepartment(department: string): Promise<ApiResponse<Subject[]>> {
    return apiClient.get<Subject[]>(`${this.baseUrl}/department/${encodeURIComponent(department)}`);
  }

  static async getCoreSubjects(gradeLevel?: string): Promise<ApiResponse<Subject[]>> {
    const url = gradeLevel 
      ? `${this.baseUrl}/core?gradeLevel=${encodeURIComponent(gradeLevel)}`
      : `${this.baseUrl}/core`;
    return apiClient.get<Subject[]>(url);
  }

  static async getElectiveSubjects(gradeLevel?: string): Promise<ApiResponse<Subject[]>> {
    const url = gradeLevel 
      ? `${this.baseUrl}/elective?gradeLevel=${encodeURIComponent(gradeLevel)}`
      : `${this.baseUrl}/elective`;
    return apiClient.get<Subject[]>(url);
  }

  static async assignTeachers(subjectId: string, teacherIds: string[]): Promise<ApiResponse<Subject>> {
    return apiClient.post<Subject>(`${this.baseUrl}/${subjectId}/teachers`, { teacherIds });
  }

  static async removeTeacher(subjectId: string, teacherId: string): Promise<ApiResponse<Subject>> {
    return apiClient.delete<Subject>(`${this.baseUrl}/${subjectId}/teachers/${teacherId}`);
  }

  static async assignClasses(subjectId: string, classIds: string[]): Promise<ApiResponse<Subject>> {
    return apiClient.post<Subject>(`${this.baseUrl}/${subjectId}/classes`, { classIds });
  }

  static async removeClass(subjectId: string, classId: string): Promise<ApiResponse<Subject>> {
    return apiClient.delete<Subject>(`${this.baseUrl}/${subjectId}/classes/${classId}`);
  }

  static async bulkAssignTeachers(assignments: SubjectTeacherAssignment[]): Promise<ApiResponse<Subject[]>> {
    return apiClient.put<Subject[]>(`${this.baseUrl}/bulk-assign-teachers`, { assignments });
  }

  static async bulkAssignClasses(assignments: SubjectClassAssignment[]): Promise<ApiResponse<Subject[]>> {
    return apiClient.put<Subject[]>(`${this.baseUrl}/bulk-assign-classes`, { assignments });
  }

  static async toggleActive(id: string): Promise<ApiResponse<Subject>> {
    return apiClient.patch<Subject>(`${this.baseUrl}/${id}/toggle-active`);
  }

  static async duplicate(id: string, newName: string, newCode: string): Promise<ApiResponse<Subject>> {
    return apiClient.post<Subject>(`${this.baseUrl}/${id}/duplicate`, { name: newName, code: newCode });
  }

  static async getPrerequisites(id: string): Promise<ApiResponse<Subject[]>> {
    return apiClient.get<Subject[]>(`${this.baseUrl}/${id}/prerequisites`);
  }

  static async getDependents(id: string): Promise<ApiResponse<Subject[]>> {
    return apiClient.get<Subject[]>(`${this.baseUrl}/${id}/dependents`);
  }

  static async exportSubjects(filters?: SubjectFilters): Promise<ApiResponse<Blob>> {
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