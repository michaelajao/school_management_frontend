import { apiClient } from './client';
import type { ApiResponse, PaginatedResponse } from './client';

// Student types
export interface Student {
  id: string;
  userId: string;
  studentId: string;
  admissionNumber: string;
  admissionDate: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  bloodGroup?: string;
  address?: string;
  emergencyContact?: string;
  medicalConditions?: string;
  status: 'active' | 'inactive' | 'graduated' | 'transferred';
  classId?: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
  };
  class?: {
    id: string;
    name: string;
    grade: string;
    section: string;
  };
  parents: Array<{
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
    relationship: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface CreateStudentData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  studentId?: string;
  admissionNumber?: string;
  admissionDate: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  bloodGroup?: string;
  address?: string;
  emergencyContact?: string;
  medicalConditions?: string;
  classId?: string;
  parentIds?: string[];
}

export interface UpdateStudentData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  bloodGroup?: string;
  address?: string;
  emergencyContact?: string;
  medicalConditions?: string;
  status?: 'active' | 'inactive' | 'graduated' | 'transferred';
  classId?: string;
}

export interface StudentFilters {
  classId?: string;
  grade?: string;
  gender?: 'male' | 'female' | 'other';
  status?: 'active' | 'inactive' | 'graduated' | 'transferred';
  search?: string;
  admissionYear?: string;
  age?: { min?: number; max?: number };
  page?: number;
  limit?: number;
}

export type PaginatedStudents = PaginatedResponse<Student>;

export interface StudentStats {
  total: number;
  active: number;
  inactive: number;
  graduated: number;
  transferred: number;
  byGrade: Record<string, number>;
  byGender: Record<string, number>;
  byClass: Record<string, number>;
  newAdmissions: number;
  averageAge: number;
}

export interface StudentTransfer {
  studentId: string;
  fromClassId: string;
  toClassId: string;
  reason?: string;
  effectiveDate: string;
}

export interface StudentPromotion {
  studentIds: string[];
  fromGrade: string;
  toGrade: string;
  academicYear: string;
}

export class StudentsApiService {
  private static baseUrl = '/api/proxy/students';

  static async getAll(filters?: StudentFilters): Promise<ApiResponse<PaginatedStudents>> {
    const params = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          if (key === 'age' && typeof value === 'object') {
            if (value.min !== undefined) params.append('minAge', value.min.toString());
            if (value.max !== undefined) params.append('maxAge', value.max.toString());
          } else {
            params.append(key, value.toString());
          }
        }
      });
    }

    const url = params.toString() ? `${this.baseUrl}?${params}` : this.baseUrl;
    return apiClient.get<PaginatedStudents>(url);
  }

  static async getById(id: string): Promise<ApiResponse<Student>> {
    return apiClient.get<Student>(`${this.baseUrl}/${id}`);
  }

  static async create(data: CreateStudentData): Promise<ApiResponse<Student>> {
    return apiClient.post<Student>(this.baseUrl, data);
  }

  static async update(id: string, data: UpdateStudentData): Promise<ApiResponse<Student>> {
    return apiClient.put<Student>(`${this.baseUrl}/${id}`, data);
  }

  static async delete(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(`${this.baseUrl}/${id}`);
  }

  static async getStats(): Promise<ApiResponse<StudentStats>> {
    return apiClient.get<StudentStats>(`${this.baseUrl}/stats`);
  }

  static async getByClass(classId: string): Promise<ApiResponse<Student[]>> {
    return apiClient.get<Student[]>(`${this.baseUrl}/class/${classId}`);
  }

  static async getByGrade(grade: string): Promise<ApiResponse<Student[]>> {
    return apiClient.get<Student[]>(`${this.baseUrl}/grade/${encodeURIComponent(grade)}`);
  }

  static async getByParent(parentId: string): Promise<ApiResponse<Student[]>> {
    return apiClient.get<Student[]>(`${this.baseUrl}/parent/${parentId}`);
  }

  static async assignToClass(studentId: string, classId: string): Promise<ApiResponse<Student>> {
    return apiClient.patch<Student>(`${this.baseUrl}/${studentId}/assign-class`, { classId });
  }

  static async removeFromClass(studentId: string): Promise<ApiResponse<Student>> {
    return apiClient.patch<Student>(`${this.baseUrl}/${studentId}/remove-class`);
  }

  static async transfer(data: StudentTransfer): Promise<ApiResponse<Student>> {
    return apiClient.post<Student>(`${this.baseUrl}/${data.studentId}/transfer`, data);
  }

  static async bulkTransfer(transfers: StudentTransfer[]): Promise<ApiResponse<Student[]>> {
    return apiClient.post<Student[]>(`${this.baseUrl}/bulk-transfer`, { transfers });
  }

  static async promote(data: StudentPromotion): Promise<ApiResponse<Student[]>> {
    return apiClient.post<Student[]>(`${this.baseUrl}/promote`, data);
  }

  static async graduate(studentIds: string[], graduationDate: string): Promise<ApiResponse<Student[]>> {
    return apiClient.post<Student[]>(`${this.baseUrl}/graduate`, { studentIds, graduationDate });
  }

  static async updateStatus(studentId: string, status: 'active' | 'inactive' | 'graduated' | 'transferred', reason?: string): Promise<ApiResponse<Student>> {
    return apiClient.patch<Student>(`${this.baseUrl}/${studentId}/status`, { status, reason });
  }

  static async addParent(studentId: string, parentId: string): Promise<ApiResponse<Student>> {
    return apiClient.post<Student>(`${this.baseUrl}/${studentId}/parents`, { parentId });
  }

  static async removeParent(studentId: string, parentId: string): Promise<ApiResponse<Student>> {
    return apiClient.delete<Student>(`${this.baseUrl}/${studentId}/parents/${parentId}`);
  }

  static async getAcademicRecord(studentId: string): Promise<ApiResponse<{
    student: Student;
    grades: Array<{
      subject: string;
      term: string;
      grade: string;
      score: number;
    }>;
    attendance: Array<{
      date: string;
      status: string;
    }>;
  }>> {
    return apiClient.get(`${this.baseUrl}/${studentId}/academic-record`);
  }

  static async generateStudentCard(studentId: string): Promise<ApiResponse<Blob>> {
    return apiClient.get<Blob>(`${this.baseUrl}/${studentId}/student-card`, { responseType: 'blob' });
  }

  static async bulkImport(file: File): Promise<ApiResponse<{ successful: number; failed: number; errors: string[] }>> {
    const formData = new FormData();
    formData.append('file', file);
    
    return apiClient.post(`${this.baseUrl}/bulk-import`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  }

  static async exportStudents(filters?: StudentFilters): Promise<ApiResponse<Blob>> {
    const params = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          if (key === 'age' && typeof value === 'object') {
            if (value.min !== undefined) params.append('minAge', value.min.toString());
            if (value.max !== undefined) params.append('maxAge', value.max.toString());
          } else {
            params.append(key, value.toString());
          }
        }
      });
    }

    const url = params.toString() ? `${this.baseUrl}/export?${params}` : `${this.baseUrl}/export`;
    return apiClient.get<Blob>(url, { responseType: 'blob' });
  }
}