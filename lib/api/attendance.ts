import { apiClient } from './client';
import type { PaginatedResponse } from './grades';

export interface AttendanceRecord {
  id: string;
  studentId: string;
  classId: string;
  subjectId?: string;
  date: string;
  status: 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED';
  notes?: string;
  markedBy: string;
  markedAt: string;
  student?: {
    id: string;
    firstName: string;
    lastName: string;
    rollNumber?: string;
  };
  class?: {
    id: string;
    name: string;
    section: string;
  };
  subject?: {
    id: string;
    name: string;
  };
}

export interface CreateAttendanceData {
  studentId: string;
  classId: string;
  subjectId?: string;
  date: string;
  status: 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED';
  notes?: string;
}

export interface UpdateAttendanceData {
  status?: 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED';
  notes?: string;
}

export interface BulkAttendanceData {
  classId: string;
  subjectId?: string;
  date: string;
  attendanceRecords: {
    studentId: string;
    status: 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED';
    notes?: string;
  }[];
}

export interface AttendanceFilters {
  studentId?: string;
  classId?: string;
  subjectId?: string;
  startDate?: string;
  endDate?: string;
  status?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export type PaginatedAttendance = PaginatedResponse<AttendanceRecord>;

export interface AttendanceStats {
  totalClasses: number;
  presentDays: number;
  absentDays: number;
  lateDays: number;
  excusedDays: number;
  attendanceRate: number;
}

export interface ClassAttendanceStats {
  classId: string;
  className: string;
  date: string;
  totalStudents: number;
  presentStudents: number;
  absentStudents: number;
  lateStudents: number;
  attendanceRate: number;
}

export class AttendanceApiService {
  private static readonly BASE_PATH = '/attendance';

  /**
   * Get attendance records with optional filtering and pagination
   */
  static async getAttendance(filters?: AttendanceFilters): Promise<PaginatedAttendance> {
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
      
      return await apiClient.get<PaginatedAttendance>(url);
    } catch (error) {
      console.error('Get attendance error:', error);
      throw error;
    }
  }

  /**
   * Get attendance record by ID
   */
  static async getAttendanceById(id: string): Promise<AttendanceRecord> {
    try {
      return await apiClient.get<AttendanceRecord>(`${this.BASE_PATH}/${id}`);
    } catch (error) {
      console.error('Get attendance by ID error:', error);
      throw error;
    }
  }

  /**
   * Create attendance record
   */
  static async createAttendance(attendanceData: CreateAttendanceData): Promise<AttendanceRecord> {
    try {
      return await apiClient.post<AttendanceRecord>(this.BASE_PATH, attendanceData);
    } catch (error) {
      console.error('Create attendance error:', error);
      throw error;
    }
  }

  /**
   * Update attendance record
   */
  static async updateAttendance(id: string, attendanceData: UpdateAttendanceData): Promise<AttendanceRecord> {
    try {
      return await apiClient.patch<AttendanceRecord>(`${this.BASE_PATH}/${id}`, attendanceData);
    } catch (error) {
      console.error('Update attendance error:', error);
      throw error;
    }
  }

  /**
   * Delete attendance record
   */
  static async deleteAttendance(id: string): Promise<void> {
    try {
      await apiClient.delete(`${this.BASE_PATH}/${id}`);
    } catch (error) {
      console.error('Delete attendance error:', error);
      throw error;
    }
  }

  /**
   * Mark bulk attendance for a class
   */
  static async markBulkAttendance(bulkData: BulkAttendanceData): Promise<AttendanceRecord[]> {
    try {
      return await apiClient.post<AttendanceRecord[]>(`${this.BASE_PATH}/bulk`, bulkData);
    } catch (error) {
      console.error('Mark bulk attendance error:', error);
      throw error;
    }
  }

  /**
   * Get attendance by student ID
   */
  static async getStudentAttendance(
    studentId: string,
    startDate?: string,
    endDate?: string
  ): Promise<AttendanceRecord[]> {
    try {
      const params = new URLSearchParams();
      if (startDate) params.append('startDate', startDate);
      if (endDate) params.append('endDate', endDate);
      
      const queryString = params.toString();
      const url = queryString 
        ? `${this.BASE_PATH}/student/${studentId}?${queryString}`
        : `${this.BASE_PATH}/student/${studentId}`;
      
      return await apiClient.get<AttendanceRecord[]>(url);
    } catch (error) {
      console.error('Get student attendance error:', error);
      throw error;
    }
  }

  /**
   * Get attendance by class ID
   */
  static async getClassAttendance(
    classId: string,
    startDate?: string,
    endDate?: string
  ): Promise<AttendanceRecord[]> {
    try {
      const params = new URLSearchParams();
      if (startDate) params.append('startDate', startDate);
      if (endDate) params.append('endDate', endDate);
      
      const queryString = params.toString();
      const url = queryString 
        ? `${this.BASE_PATH}/class/${classId}?${queryString}`
        : `${this.BASE_PATH}/class/${classId}`;
      
      return await apiClient.get<AttendanceRecord[]>(url);
    } catch (error) {
      console.error('Get class attendance error:', error);
      throw error;
    }
  }

  /**
   * Get attendance statistics for a student
   */
  static async getStudentAttendanceStats(
    studentId: string,
    startDate?: string,
    endDate?: string
  ): Promise<AttendanceStats> {
    try {
      const params = new URLSearchParams();
      if (startDate) params.append('startDate', startDate);
      if (endDate) params.append('endDate', endDate);
      
      const queryString = params.toString();
      const url = queryString 
        ? `${this.BASE_PATH}/student/${studentId}/stats?${queryString}`
        : `${this.BASE_PATH}/student/${studentId}/stats`;
      
      return await apiClient.get<AttendanceStats>(url);
    } catch (error) {
      console.error('Get student attendance stats error:', error);
      throw error;
    }
  }

  /**
   * Get attendance statistics for a class
   */
  static async getClassAttendanceStats(
    classId: string,
    startDate?: string,
    endDate?: string
  ): Promise<ClassAttendanceStats[]> {
    try {
      const params = new URLSearchParams();
      if (startDate) params.append('startDate', startDate);
      if (endDate) params.append('endDate', endDate);
      
      const queryString = params.toString();
      const url = queryString 
        ? `${this.BASE_PATH}/class/${classId}/stats?${queryString}`
        : `${this.BASE_PATH}/class/${classId}/stats`;
      
      return await apiClient.get<ClassAttendanceStats[]>(url);
    } catch (error) {
      console.error('Get class attendance stats error:', error);
      throw error;
    }
  }

  /**
   * Get today's attendance for a class
   */
  static async getTodayClassAttendance(classId: string): Promise<AttendanceRecord[]> {
    try {
      const today = new Date().toISOString().split('T')[0];
      return await this.getClassAttendance(classId, today, today);
    } catch (error) {
      console.error('Get today class attendance error:', error);
      throw error;
    }
  }

  /**
   * Get attendance summary by date range
   */
  static async getAttendanceSummary(
    startDate: string,
    endDate: string,
    classId?: string
  ): Promise<{
    totalStudents: number;
    totalClassDays: number;
    overallAttendanceRate: number;
    dailyStats: {
      date: string;
      present: number;
      absent: number;
      late: number;
      excused: number;
      rate: number;
    }[];
  }> {
    try {
      const params = new URLSearchParams();
      params.append('startDate', startDate);
      params.append('endDate', endDate);
      if (classId) params.append('classId', classId);
      
      return await apiClient.get(`${this.BASE_PATH}/summary?${params.toString()}`);
    } catch (error) {
      console.error('Get attendance summary error:', error);
      throw error;
    }
  }

  /**
   * Export attendance to CSV
   */
  static async exportAttendance(filters?: AttendanceFilters): Promise<Blob> {
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
      console.error('Export attendance error:', error);
      throw error;
    }
  }
}
