import { apiClient } from './client';
import type { User } from './auth';

export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'TEACHER' | 'STUDENT' | 'PARENT' | 'SCHOOL_MANAGEMENT';

export interface CreateUserData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  phoneNumber?: string;
  address?: string;
  dateOfBirth?: string;
  gender?: 'MALE' | 'FEMALE' | 'OTHER';
}

export interface UpdateUserData {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  address?: string;
  dateOfBirth?: string;
  gender?: 'MALE' | 'FEMALE' | 'OTHER';
  profilePicture?: string;
}

export interface UserFilters {
  role?: string;
  isActive?: boolean;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export interface PaginatedUsers {
  data: User[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export class UsersApiService {
  private static readonly BASE_PATH = '/users';

  /**
   * Get all users with optional filtering and pagination
   */
  static async getUsers(filters?: UserFilters): Promise<PaginatedUsers> {
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
      
      return await apiClient.get<PaginatedUsers>(url);
    } catch (error) {
      console.error('Get users error:', error);
      throw error;
    }
  }

  /**
   * Get all student users
   */
  static async getStudents(page: number = 1, limit: number = 10): Promise<PaginatedUsers> {
    try {
      return await apiClient.get<PaginatedUsers>(`${this.BASE_PATH}/students?page=${page}&limit=${limit}`);
    } catch (error) {
      console.error('Get students error:', error);
      throw error;
    }
  }

  /**
   * Get all parent users
   */
  static async getParents(page: number = 1, limit: number = 10): Promise<PaginatedUsers> {
    try {
      return await apiClient.get<PaginatedUsers>(`${this.BASE_PATH}/parents?page=${page}&limit=${limit}`);
    } catch (error) {
      console.error('Get parents error:', error);
      throw error;
    }
  }

  /**
   * Create a new student user
   */
  static async createStudentUser(userData: CreateUserData & { studentId: string; class?: string; parentIds?: string[] }): Promise<{ user: User; student: any }> {
    try {
      return await apiClient.post<{ user: User; student: any }>(`${this.BASE_PATH}/students`, userData);
    } catch (error) {
      console.error('Create student user error:', error);
      throw error;
    }
  }

  /**
   * Create a new parent user
   */
  static async createParentUser(userData: CreateUserData & { relationshipToStudent: string; studentId?: string }): Promise<{ user: User; parent: any }> {
    try {
      return await apiClient.post<{ user: User; parent: any }>(`${this.BASE_PATH}/parents`, userData);
    } catch (error) {
      console.error('Create parent user error:', error);
      throw error;
    }
  }

  /**
   * Get user by ID
   */
  static async getUserById(id: string): Promise<User> {
    try {
      return await apiClient.get<User>(`${this.BASE_PATH}/${id}`);
    } catch (error) {
      console.error('Get user by ID error:', error);
      throw error;
    }
  }

  /**
   * Create new user
   */
  static async createUser(userData: CreateUserData): Promise<User> {
    try {
      return await apiClient.post<User>(this.BASE_PATH, userData);
    } catch (error) {
      console.error('Create user error:', error);
      throw error;
    }
  }

  /**
   * Update user
   */
  static async updateUser(id: string, userData: UpdateUserData): Promise<User> {
    try {
      return await apiClient.patch<User>(`${this.BASE_PATH}/${id}`, userData);
    } catch (error) {
      console.error('Update user error:', error);
      throw error;
    }
  }

  /**
   * Delete user
   */
  static async deleteUser(id: string): Promise<void> {
    try {
      await apiClient.delete(`${this.BASE_PATH}/${id}`);
    } catch (error) {
      console.error('Delete user error:', error);
      throw error;
    }
  }

  /**
   * Activate/Deactivate user
   */
  static async toggleUserStatus(id: string, isActive: boolean): Promise<User> {
    try {
      return await apiClient.patch<User>(`${this.BASE_PATH}/${id}/status`, { isActive });
    } catch (error) {
      console.error('Toggle user status error:', error);
      throw error;
    }
  }

  /**
   * Get users by role
   */
  static async getUsersByRole(role: string): Promise<User[]> {
    try {
      return await apiClient.get<User[]>(`${this.BASE_PATH}/role/${role}`);
    } catch (error) {
      console.error('Get users by role error:', error);
      throw error;
    }
  }

  /**
   * Search users
   */
  static async searchUsers(query: string): Promise<User[]> {
    try {
      return await apiClient.get<User[]>(`${this.BASE_PATH}/search?q=${encodeURIComponent(query)}`);
    } catch (error) {
      console.error('Search users error:', error);
      throw error;
    }
  }

  /**
   * Upload user profile picture
   */
  static async uploadProfilePicture(id: string, file: File): Promise<{ profilePicture: string }> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      return await apiClient.post<{ profilePicture: string }>(
        `${this.BASE_PATH}/${id}/profile-picture`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
    } catch (error) {
      console.error('Upload profile picture error:', error);
      throw error;
    }
  }

  /**
   * Bulk create users (for admin)
   */
  static async bulkCreateUsers(usersData: CreateUserData[]): Promise<User[]> {
    try {
      return await apiClient.post<User[]>(`${this.BASE_PATH}/bulk`, { users: usersData });
    } catch (error) {
      console.error('Bulk create users error:', error);
      throw error;
    }
  }

  /**
   * Export users to CSV
   */
  static async exportUsers(filters?: UserFilters): Promise<Blob> {
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
      console.error('Export users error:', error);
      throw error;
    }
  }
}
