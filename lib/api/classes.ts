import { apiClient } from './client';
import type { PaginatedResponse } from './grades';

export interface ClassSection {
  id: string;
  name: string;
  section?: string;
  displayName: string;
  academicYear: string;
  description?: string;
  stream?: string;
  track?: string;
  capacity?: number;
  currentEnrollment: number;
  gradeLevelId?: string;
  academicYearId?: string;
  isActive?: boolean;
  teacher?: {
    firstName: string;
    lastName: string;
    id?: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateClassData {
  name: string;
  section?: string;
  academicYear: string;
  description?: string;
  stream?: string;
  track?: string;
  capacity?: number;
  gradeLevelId?: string;
  academicYearId?: string;
  teacherId?: string;
}

export interface UpdateClassData {
  name?: string;
  section?: string;
  description?: string;
  stream?: string;
  track?: string;
  capacity?: number;
  teacherId?: string;
  isActive?: boolean;
}

export interface ClassFilters {
  page?: number;
  limit?: number;
  search?: string;
  gradeLevelId?: string;
  academicYearId?: string;
  isActive?: boolean;
}

export type PaginatedClasses = PaginatedResponse<ClassSection>;

export interface EnrollStudentData {
  studentId: string;
  enrollmentDate?: string;
  status?: string;
}

export class ClassesApiService {
  private static readonly BASE_PATH = '/classes';

  /**
   * Get all classes with filtering and pagination
   */
  static async getClasses(filters?: ClassFilters): Promise<PaginatedClasses> {
    try {
      const params = new URLSearchParams();
      
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            params.append(key, value.toString());
          }
        });
      }

      const queryString = params.toString();
      const url = queryString ? `${this.BASE_PATH}?${queryString}` : this.BASE_PATH;
      
      return await apiClient.get<PaginatedClasses>(url);
    } catch (error) {
      console.error('Get classes error:', error);
      throw error;
    }
  }

  /**
   * Get class by ID
   */
  static async getClassById(id: string, includeStudents?: boolean): Promise<ClassSection> {
    try {
      const params = includeStudents ? '?includeStudents=true' : '';
      return await apiClient.get<ClassSection>(`${this.BASE_PATH}/${id}${params}`);
    } catch (error) {
      console.error('Get class by ID error:', error);
      throw error;
    }
  }

  /**
   * Create a new class
   */
  static async createClass(classData: CreateClassData): Promise<ClassSection> {
    try {
      return await apiClient.post<ClassSection>(this.BASE_PATH, classData);
    } catch (error) {
      console.error('Create class error:', error);
      throw error;
    }
  }

  /**
   * Update a class
   */
  static async updateClass(id: string, classData: UpdateClassData): Promise<ClassSection> {
    try {
      return await apiClient.patch<ClassSection>(`${this.BASE_PATH}/${id}`, classData);
    } catch (error) {
      console.error('Update class error:', error);
      throw error;
    }
  }

  /**
   * Delete a class
   */
  static async deleteClass(id: string): Promise<void> {
    try {
      await apiClient.delete(`${this.BASE_PATH}/${id}`);
    } catch (error) {
      console.error('Delete class error:', error);
      throw error;
    }
  }

  /**
   * Get classes by grade level
   */
  static async getClassesByGradeLevel(gradeLevelId: string): Promise<ClassSection[]> {
    try {
      return await apiClient.get<ClassSection[]>(`${this.BASE_PATH}/grade-level/${gradeLevelId}`);
    } catch (error) {
      console.error('Get classes by grade level error:', error);
      throw error;
    }
  }

  /**
   * Enroll a student in a class
   */
  static async enrollStudent(classId: string, studentData: EnrollStudentData): Promise<any> {
    try {
      return await apiClient.post(`${this.BASE_PATH}/${classId}/enroll-student`, studentData);
    } catch (error) {
      console.error('Enroll student error:', error);
      throw error;
    }
  }

  /**
   * Enroll multiple students in a class
   */
  static async enrollMultipleStudents(classId: string, students: EnrollStudentData[]): Promise<any> {
    try {
      return await apiClient.post(`${this.BASE_PATH}/${classId}/enroll-multiple`, { students });
    } catch (error) {
      console.error('Enroll multiple students error:', error);
      throw error;
    }
  }

  /**
   * Remove a student from a class
   */
  static async removeStudent(classId: string, studentId: string): Promise<void> {
    try {
      await apiClient.delete(`${this.BASE_PATH}/${classId}/students/${studentId}`);
    } catch (error) {
      console.error('Remove student error:', error);
      throw error;
    }
  }

  /**
   * Update student enrollment in a class
   */
  static async updateEnrollment(classId: string, studentId: string, enrollmentData: any): Promise<any> {
    try {
      return await apiClient.patch(`${this.BASE_PATH}/${classId}/students/${studentId}`, enrollmentData);
    } catch (error) {
      console.error('Update enrollment error:', error);
      throw error;
    }
  }
}