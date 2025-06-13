import { apiClient } from './client';
import type { ApiResponse } from './client';
import type { PaginatedResponse } from './grades';

// Staff types
export interface Staff {
  id: string;
  userId: string;
  employeeId: string;
  department: string;
  position: string;
  hireDate: string;
  salary?: number;
  status: 'active' | 'inactive' | 'suspended';
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
    role: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateStaffData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  department: string;
  position: string;
  hireDate: string;
  salary?: number;
  employeeId?: string;
}

export interface UpdateStaffData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  department?: string;
  position?: string;
  hireDate?: string;
  salary?: number;
  status?: 'active' | 'inactive' | 'suspended';
}

export interface StaffFilters {
  department?: string;
  position?: string;
  status?: 'active' | 'inactive' | 'suspended';
  search?: string;
  page?: number;
  limit?: number;
}

export type PaginatedStaff = PaginatedResponse<Staff>;

export interface StaffStats {
  total: number;
  active: number;
  inactive: number;
  byDepartment: Record<string, number>;
  byPosition: Record<string, number>;
}

export class StaffApiService {
  private static baseUrl = '/api/proxy/staff';

  static async getAll(filters?: StaffFilters): Promise<PaginatedStaff> {
    const params = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          params.append(key, value.toString());
        }
      });
    }

    const url = params.toString() ? `${this.baseUrl}?${params}` : this.baseUrl;
    return apiClient.get<PaginatedStaff>(url);
  }

  static async getById(id: string): Promise<Staff> {
    return apiClient.get<Staff>(`${this.baseUrl}/${id}`);
  }

  static async create(data: CreateStaffData): Promise<Staff> {
    return apiClient.post<Staff>(this.baseUrl, data);
  }

  static async update(id: string, data: UpdateStaffData): Promise<Staff> {
    return apiClient.put<Staff>(`${this.baseUrl}/${id}`, data);
  }

  static async delete(id: string): Promise<void> {
    return apiClient.delete<void>(`${this.baseUrl}/${id}`);
  }

  static async getStats(): Promise<StaffStats> {
    return apiClient.get<StaffStats>(`${this.baseUrl}/stats`);
  }

  static async getByDepartment(department: string): Promise<Staff[]> {
    return apiClient.get<Staff[]>(`${this.baseUrl}/department/${encodeURIComponent(department)}`);
  }

  static async updateStatus(id: string, status: 'active' | 'inactive' | 'suspended'): Promise<Staff> {
    return apiClient.patch<Staff>(`${this.baseUrl}/${id}/status`, { status });
  }

  static async bulkUpdate(updates: Array<{ id: string; data: UpdateStaffData }>): Promise<Staff[]> {
    return apiClient.put<Staff[]>(`${this.baseUrl}/bulk`, { updates });
  }

  static async exportStaff(filters?: StaffFilters): Promise<Blob> {
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