import { apiClient } from './client';

export interface Class {
  id: string;
  name: string;
  section: string;
  grade: string;
  academicYear: string;
  teacherId: string;
  teacher?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  maxStudents: number;
  currentStudents: number;
  room?: string;
  schedule?: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateClassData {
  name: string;
  section: string;
  grade: string;
  academicYear: string;
  teacherId: string;
  maxStudents: number;
  room?: string;
  schedule?: string;
  description?: string;
}

export interface UpdateClassData {
  name?: string;
  section?: string;
  grade?: string;
  teacherId?: string;
  maxStudents?: number;
  room?: string;
  schedule?: string;
  description?: string;
  isActive?: boolean;
}

export interface ClassFilters {
  grade?: string;
  academicYear?: string;
  teacherId?: string;
  isActive?: boolean;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export interface PaginatedClasses {
  data: Class[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ClassStudent {
  id: string;
  studentId: string;
  classId: string;
  enrolledAt: string;
  student: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    rollNumber?: string;
  };
}

export class ClassesApiService {
  private static readonly BASE_PATH = '/classes';

  /**
   * Get all classes with optional filtering and pagination
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
  static async getClassById(id: string): Promise<Class> {
    try {
      return await apiClient.get<Class>(`${this.BASE_PATH}/${id}`);
    } catch (error) {
      console.error('Get class by ID error:', error);
      throw error;
    }
  }

  /**
   * Create new class
   */
  static async createClass(classData: CreateClassData): Promise<Class> {
    try {
      return await apiClient.post<Class>(this.BASE_PATH, classData);
    } catch (error) {
      console.error('Create class error:', error);
      throw error;
    }
  }

  /**
   * Update class
   */
  static async updateClass(id: string, classData: UpdateClassData): Promise<Class> {
    try {
      return await apiClient.patch<Class>(`${this.BASE_PATH}/${id}`, classData);
    } catch (error) {
      console.error('Update class error:', error);
      throw error;
    }
  }

  /**
   * Delete class
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
   * Get students in a class
   */
  static async getClassStudents(classId: string): Promise<ClassStudent[]> {
    try {
      return await apiClient.get<ClassStudent[]>(`${this.BASE_PATH}/${classId}/students`);
    } catch (error) {
      console.error('Get class students error:', error);
      throw error;
    }
  }

  /**
   * Add student to class
   */
  static async addStudentToClass(classId: string, studentId: string): Promise<ClassStudent> {
    try {
      return await apiClient.post<ClassStudent>(`${this.BASE_PATH}/${classId}/students`, {
        studentId,
      });
    } catch (error) {
      console.error('Add student to class error:', error);
      throw error;
    }
  }

  /**
   * Remove student from class
   */
  static async removeStudentFromClass(classId: string, studentId: string): Promise<void> {
    try {
      await apiClient.delete(`${this.BASE_PATH}/${classId}/students/${studentId}`);
    } catch (error) {
      console.error('Remove student from class error:', error);
      throw error;
    }
  }

  /**
   * Bulk add students to class
   */
  static async bulkAddStudentsToClass(classId: string, studentIds: string[]): Promise<ClassStudent[]> {
    try {
      return await apiClient.post<ClassStudent[]>(`${this.BASE_PATH}/${classId}/students/bulk`, {
        studentIds,
      });
    } catch (error) {
      console.error('Bulk add students to class error:', error);
      throw error;
    }
  }

  /**
   * Get classes by teacher ID
   */
  static async getClassesByTeacher(teacherId: string): Promise<Class[]> {
    try {
      return await apiClient.get<Class[]>(`${this.BASE_PATH}/teacher/${teacherId}`);
    } catch (error) {
      console.error('Get classes by teacher error:', error);
      throw error;
    }
  }

  /**
   * Get classes by grade
   */
  static async getClassesByGrade(grade: string): Promise<Class[]> {
    try {
      return await apiClient.get<Class[]>(`${this.BASE_PATH}/grade/${grade}`);
    } catch (error) {
      console.error('Get classes by grade error:', error);
      throw error;
    }
  }

  /**
   * Get class statistics
   */
  static async getClassStatistics(classId: string): Promise<{
    totalStudents: number;
    attendanceRate: number;
    averageGrade: number;
    subjectsCount: number;
  }> {
    try {
      return await apiClient.get(`${this.BASE_PATH}/${classId}/statistics`);
    } catch (error) {
      console.error('Get class statistics error:', error);
      throw error;
    }
  }

  /**
   * Search classes
   */
  static async searchClasses(query: string): Promise<Class[]> {
    try {
      return await apiClient.get<Class[]>(`${this.BASE_PATH}/search?q=${encodeURIComponent(query)}`);
    } catch (error) {
      console.error('Search classes error:', error);
      throw error;
    }
  }

  /**
   * Export class list to CSV
   */
  static async exportClasses(filters?: ClassFilters): Promise<Blob> {
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
      const url = queryString ? `${this.BASE_PATH}/export?${queryString}` : `${this.BASE_PATH}/export`;
      
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Export failed');
      }

      return await response.blob();
    } catch (error) {
      console.error('Export classes error:', error);
      throw error;
    }
  }
}
