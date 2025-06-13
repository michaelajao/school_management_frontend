import { apiClient } from './client';
import type { ApiResponse } from './client';
import type { PaginatedResponse } from './grades';

// Parent types
export interface Parent {
  id: string;
  userId: string;
  occupation?: string;
  emergencyContact?: string;
  relationship: 'father' | 'mother' | 'guardian' | 'other';
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
    role: string;
  };
  children: Array<{
    id: string;
    firstName: string;
    lastName: string;
    studentId: string;
    class: {
      id: string;
      name: string;
      grade: string;
    };
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface CreateParentData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  occupation?: string;
  emergencyContact?: string;
  relationship: 'father' | 'mother' | 'guardian' | 'other';
  children?: string[]; // Student IDs
}

export interface UpdateParentData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  occupation?: string;
  emergencyContact?: string;
  relationship?: 'father' | 'mother' | 'guardian' | 'other';
}

export interface ParentFilters {
  relationship?: 'father' | 'mother' | 'guardian' | 'other';
  search?: string;
  hasChildren?: boolean;
  page?: number;
  limit?: number;
}

export type PaginatedParents = PaginatedResponse<Parent>;

export interface ParentStats {
  total: number;
  byRelationship: Record<string, number>;
  withMultipleChildren: number;
  activelyEngaged: number;
}

export interface ParentChildAssociation {
  parentId: string;
  studentIds: string[];
}

export class ParentsApiService {
  private static baseUrl = '/api/proxy/parents';

  static async getAll(filters?: ParentFilters): Promise<PaginatedParents> {
    const params = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          params.append(key, value.toString());
        }
      });
    }

    const url = params.toString() ? `${this.baseUrl}?${params}` : this.baseUrl;
    return apiClient.get<PaginatedParents>(url);
  }

  static async getById(id: string): Promise<Parent> {
    return apiClient.get<Parent>(`${this.baseUrl}/${id}`);
  }

  static async create(data: CreateParentData): Promise<Parent> {
    return apiClient.post<Parent>(this.baseUrl, data);
  }

  static async update(id: string, data: UpdateParentData): Promise<Parent> {
    return apiClient.put<Parent>(`${this.baseUrl}/${id}`, data);
  }

  static async delete(id: string): Promise<void> {
    return apiClient.delete<void>(`${this.baseUrl}/${id}`);
  }

  static async getStats(): Promise<ParentStats> {
    return apiClient.get<ParentStats>(`${this.baseUrl}/stats`);
  }

  static async getByStudent(studentId: string): Promise<Parent[]> {
    return apiClient.get<Parent[]>(`${this.baseUrl}/student/${studentId}`);
  }

  static async addChild(parentId: string, studentId: string): Promise<Parent> {
    return apiClient.post<Parent>(`${this.baseUrl}/${parentId}/children`, { studentId });
  }

  static async removeChild(parentId: string, studentId: string): Promise<Parent> {
    return apiClient.delete<Parent>(`${this.baseUrl}/${parentId}/children/${studentId}`);
  }

  static async updateChildren(parentId: string, studentIds: string[]): Promise<Parent> {
    return apiClient.put<Parent>(`${this.baseUrl}/${parentId}/children`, { studentIds });
  }

  static async bulkAssociate(associations: ParentChildAssociation[]): Promise<Parent[]> {
    return apiClient.put<Parent[]>(`${this.baseUrl}/bulk-associate`, { associations });
  }

  static async sendMessage(parentIds: string[], message: { subject: string; body: string; priority?: 'low' | 'medium' | 'high' }): Promise<{ sent: number; failed: number }> {
    return apiClient.post<{ sent: number; failed: number }>(`${this.baseUrl}/send-message`, {
      parentIds,
      message
    });
  }

  static async exportParents(filters?: ParentFilters): Promise<Blob> {
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