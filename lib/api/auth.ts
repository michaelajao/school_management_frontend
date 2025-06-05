import { apiClient } from './client';

export interface LoginCredentials {
  // Frontend uses identifier for convenience
  identifier: string;
  password: string;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'TEACHER' | 'STUDENT' | 'PARENT' | 'SCHOOL_MANAGEMENT';
  // Backend-specific fields, populated by the login method
  email?: string;
  studentId?: string;
  staffID?: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'ADMIN' | 'TEACHER' | 'STUDENT' | 'PARENT';
  phoneNumber?: string;
  address?: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'TEACHER' | 'STUDENT' | 'PARENT' | 'SCHOOL_MANAGEMENT';
  phoneNumber?: string;
  address?: string;
  profilePicture?: string;
  schoolId?: string;
  isActive?: boolean;
  emailVerified?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken?: string;
}

export class AuthApiService {
  private static readonly BASE_PATH = '/auth';  /**
   * Login user with identifier (email/student ID/staff ID) and password
   */  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      // Transform credentials to match backend expectations
      // Backend expects one of: email, studentId, or staffID
      // Convert role from UPPER_CASE to lower_case format expected by backend
      const backendRole = credentials.role.toLowerCase();
      
      const loginPayload = {
        password: credentials.password,
        role: backendRole,
        // Route the identifier to the appropriate field based on role
        email: credentials.role === 'STUDENT' || credentials.role === 'PARENT' || 
               credentials.role === 'SUPER_ADMIN' || credentials.identifier.includes('@') 
               ? credentials.identifier : undefined,
        studentId: credentials.role === 'STUDENT' && !credentials.identifier.includes('@') 
                  ? credentials.identifier : undefined,
        staffID: (credentials.role === 'TEACHER' || credentials.role === 'ADMIN') && 
                !credentials.identifier.includes('@') ? credentials.identifier : undefined
      };
      
      const response = await apiClient.post<AuthResponse>(
        `${this.BASE_PATH}/login`,
        loginPayload
      );
      
      // Store token for future requests
      if (response.accessToken) {
        apiClient.setAuthToken(response.accessToken);
        
        // Store user data and tokens
        if (typeof window !== 'undefined') {
          localStorage.setItem('user_data', JSON.stringify(response.user));
          localStorage.setItem('auth_token', response.accessToken);
          localStorage.setItem('refresh_token', response.refreshToken);
        }
      }
      
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }/**
   * Register new user (public registration)
   */
  static async register(userData: RegisterData): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>(
        `${this.BASE_PATH}/public-register`,
        userData
      );
      
      // Store token for future requests
      if (response.accessToken) {
        apiClient.setAuthToken(response.accessToken);
          // Store user data and tokens
        if (typeof window !== 'undefined') {
          localStorage.setItem('user_data', JSON.stringify(response.user));
          localStorage.setItem('auth_token', response.accessToken);
          localStorage.setItem('refresh_token', response.refreshToken);
        }
      }
      
      return response;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  /**
   * Logout user
   */
  static async logout(): Promise<void> {
    try {
      await apiClient.post(`${this.BASE_PATH}/logout`);
    } catch (error) {
      console.error('Logout error:', error);
      // Continue with local logout even if API call fails
    } finally {
      // Clear local storage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
      }
    }
  }

  /**
   * Get current user profile
   */
  static async getProfile(): Promise<User> {
    try {
      return await apiClient.get<User>(`${this.BASE_PATH}/profile`);
    } catch (error) {
      console.error('Get profile error:', error);
      throw error;
    }
  }

  /**
   * Update user profile
   */
  static async updateProfile(userData: Partial<User>): Promise<User> {
    try {
      const response = await apiClient.patch<User>(`${this.BASE_PATH}/profile`, userData);
      
      // Update stored user data
      if (typeof window !== 'undefined') {
        localStorage.setItem('user_data', JSON.stringify(response));
      }
      
      return response;
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  }

  /**
   * Change password
   */
  static async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    try {
      await apiClient.patch(`${this.BASE_PATH}/change-password`, {
        currentPassword,
        newPassword,
      });
    } catch (error) {
      console.error('Change password error:', error);
      throw error;
    }
  }
  /**
   * Request password reset
   */
  static async requestPasswordReset(email: string): Promise<void> {
    try {
      await apiClient.post(`${this.BASE_PATH}/reset-password`, { email });
    } catch (error) {
      console.error('Request password reset error:', error);
      throw error;
    }
  }
  /**
   * Reset password with token
   */
  static async resetPassword(token: string, newPassword: string): Promise<void> {
    try {
      await apiClient.post(`${this.BASE_PATH}/update-password`, {
        token,
        newPassword,
      });
    } catch (error) {
      console.error('Reset password error:', error);
      throw error;
    }
  }
  /**
   * Refresh access token
   */
  static async refreshToken(): Promise<RefreshTokenResponse> {
    try {
      const response = await apiClient.post<RefreshTokenResponse>(`${this.BASE_PATH}/refresh`, {
        refreshToken: localStorage.getItem('refresh_token')
      });
      
      // Store new token
      if (response.accessToken) {
        apiClient.setAuthToken(response.accessToken);
        
        // Store refresh token if it exists
        if (response.refreshToken && typeof window !== 'undefined') {
          localStorage.setItem('refresh_token', response.refreshToken);
        }
      }
      
      return response;
    } catch (error) {
      console.error('Refresh token error:', error);
      throw error;
    }
  }

  /**
   * Verify email with token
   */
  static async verifyEmail(token: string): Promise<void> {
    try {
      await apiClient.post(`${this.BASE_PATH}/verify-email`, { token });
    } catch (error) {
      console.error('Verify email error:', error);
      throw error;
    }
  }

  /**
   * Resend email verification
   */
  static async resendEmailVerification(): Promise<void> {
    try {
      await apiClient.post(`${this.BASE_PATH}/resend-verification`);
    } catch (error) {
      console.error('Resend email verification error:', error);
      throw error;
    }
  }
  /**
   * Complete teacher invite registration
   */  static async completeInviteRegistration(registrationData: {
    firstName: string;
    lastName: string;
    email: string;
    staffId: string;
    password: string;
    phone?: string;
    address?: string;
    inviteToken: string;
    subRole?: string;
    firstLogin?: boolean;
  }): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>(
        `${this.BASE_PATH}/complete-invite-registration`,
        registrationData
      );
      
      // Store token for future requests
      if (response.accessToken) {
        apiClient.setAuthToken(response.accessToken);
        
        // Store user data and tokens
        if (typeof window !== 'undefined') {
          localStorage.setItem('user_data', JSON.stringify(response.user));
          localStorage.setItem('auth_token', response.accessToken);
          localStorage.setItem('refresh_token', response.refreshToken);
        }
      }
      
      return response;
    } catch (error) {
      console.error('Complete invite registration error:', error);
      throw error;
    }
  }
  
  /**
   * Complete student invite registration
   */
  static async completeStudentInviteRegistration(registrationData: {
    firstName: string;
    lastName: string;
    email: string;
    studentId: string;
    password: string;
    inviteToken: string;
    phone?: string;
    class?: string;
    gender?: string;
    address?: string;
    birthdate?: string;
    firstLogin?: boolean;
  }): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>(
        `${this.BASE_PATH}/complete-student-invite-registration`,
        registrationData
      );
      
      // Store token for future requests
      if (response.accessToken) {
        apiClient.setAuthToken(response.accessToken);
        
        // Store user data and tokens
        if (typeof window !== 'undefined') {
          localStorage.setItem('user_data', JSON.stringify(response.user));
          localStorage.setItem('auth_token', response.accessToken);
          localStorage.setItem('refresh_token', response.refreshToken);
        }
      }
      
      return response;    } catch (error) {
      console.error('Complete student invite registration error:', error);
      throw error;
    }
  }
  
  /**
   * Complete parent invite registration
   */
  static async completeParentInviteRegistration(registrationData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    inviteToken: string;
    phone?: string;
    address?: string;
    gender?: string;
    occupation?: string;
    relationshipToStudent?: string;
    studentId?: string;
    firstLogin?: boolean;
  }): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>(
        `${this.BASE_PATH}/complete-parent-invite-registration`,
        registrationData
      );
      
      // Store token for future requests
      if (response.accessToken) {
        apiClient.setAuthToken(response.accessToken);
        
        // Store user data and tokens
        if (typeof window !== 'undefined') {
          localStorage.setItem('user_data', JSON.stringify(response.user));
          localStorage.setItem('auth_token', response.accessToken);
          localStorage.setItem('refresh_token', response.refreshToken);
        }
      }
      
      return response;
    } catch (error) {
      console.error('Complete parent invite registration error:', error);
      throw error;
    }
  }

  /**
   * Validate invite token
   */
  static async validateInviteToken(token: string): Promise<{
    valid: boolean;
    invite?: {
      email: string;
      role: string;
      schoolId: string;
      token: string;
    };
  }> {
    try {
      const response = await apiClient.get(`/invites/validate/${token}`);
      return {
        valid: true,
        invite: response
      };
    } catch (error) {
      console.error('Validate invite token error:', error);
      return { valid: false };
    }
  }

  /**
   * Get stored user data from localStorage
   */
  static getStoredUser(): User | null {
    if (typeof window === 'undefined') return null;
    
    const userData = localStorage.getItem('user_data');
    if (!userData) return null;
    
    try {
      return JSON.parse(userData);
    } catch (error) {
      console.error('Error parsing stored user data:', error);
      return null;
    }
  }

  /**
   * Get stored auth token from localStorage
   */
  static getStoredToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('auth_token');
  }

  /**
   * Check if user is authenticated
   */  static isAuthenticated(): boolean {
    return !!this.getStoredToken() && !!this.getStoredUser();
  }

  /**
   * Create a new school and admin account
   */
  static async createSchoolAndAdmin(data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    schoolName: string;
    schoolAlias: string;
    country: string;
    website?: string;
    phone?: string;
    adminRole?: string;
  }): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>(
        `${this.BASE_PATH}/create-school-admin`,
        data
      );
      
      // Store token for future requests
      if (response.accessToken) {
        apiClient.setAuthToken(response.accessToken);
        
        // Store user data and tokens
        if (typeof window !== 'undefined') {
          localStorage.setItem('user_data', JSON.stringify(response.user));
          localStorage.setItem('auth_token', response.accessToken);
          localStorage.setItem('refresh_token', response.refreshToken);
        }
      }
      
      return response;
    } catch (error) {
      console.error('School admin creation error:', error);
      throw error;
    }
  }
}
