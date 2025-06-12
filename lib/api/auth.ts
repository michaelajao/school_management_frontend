import { apiClient } from './client';

export interface LoginCredentials {
  email: string;
  password: string;
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

// School registration for first-time school owners
export interface SchoolRegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  schoolName: string;
  schoolAlias: string;
  country: string;
  website?: string;
  phone?: string;
}

// Invitation-based registration data
export interface InviteRegistrationData {
  inviteToken: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  staffId?: string;
  studentId?: string;
  phone?: string;
  gender?: string;
}

export class AuthApiService {
  private static readonly BASE_PATH = '/auth';

  /**
   * Universal login for all users - just email and password
   */
  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>(
        `${this.BASE_PATH}/login`,
        {
          email: credentials.email,
          password: credentials.password
        }
      );
      
      console.log('🔄 Auth API Login Response:', {
        userRole: response.user.role,
        userId: response.user.id,
        schoolId: response.user.schoolId,
        hasToken: !!response.accessToken
      });
      
      // Store token for future requests
      if (response.accessToken) {
        apiClient.setAuthToken(response.accessToken);
        
        // Store tokens securely via API routes
        if (typeof window !== 'undefined') {
          // Store tokens in httpOnly cookies
          await fetch('/api/auth/set-cookie', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: 'auth_token',
              value: response.accessToken,
              options: { maxAge: 60 * 60 * 2 } // 2 hours
            })
          });
          
          await fetch('/api/auth/set-cookie', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: 'refresh_token',
              value: response.refreshToken,
              options: { maxAge: 60 * 60 * 24 * 7 } // 7 days
            })
          });
          
          // Store non-sensitive user data in localStorage
          localStorage.setItem('user_data', JSON.stringify(response.user));
        }
      }
      
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  /**
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
      // Clear secure storage
      if (typeof window !== 'undefined') {
        // Clear httpOnly cookies
        await fetch('/api/auth/clear-cookie', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: 'auth_token' })
        });
        
        await fetch('/api/auth/clear-cookie', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: 'refresh_token' })
        });
        
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
  static async resendEmailVerification(email: string): Promise<void> {
    try {
      await apiClient.post(`${this.BASE_PATH}/resend-verification`, { email });
    } catch (error) {
      console.error('Resend email verification error:', error);
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
   * Get stored auth token from secure storage
   */
  static async getStoredToken(): Promise<string | null> {
    if (typeof window === 'undefined') return null;
    
    try {
      const response = await fetch('/api/auth/get-token', {
        method: 'GET',
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        return data.token || null;
      }
      
      return null;
    } catch (error) {
      console.error('Failed to get stored token:', error);
      return null;
    }
  }

  /**
   * Check if user is authenticated
   */
  static async isAuthenticated(): Promise<boolean> {
    const token = await this.getStoredToken();
    const user = this.getStoredUser();
    return !!(token && user);
  }

  /**
   * School owner creates school + admin account (first-time registration)
   */
  static async createSchoolAndAdmin(data: SchoolRegistrationData): Promise<AuthResponse> {
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
      console.error('School creation error:', error);
      throw error;
    }
  }

  /**
   * Complete registration from invite link
   */
  static async completeInviteRegistration(data: InviteRegistrationData): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>(
        `${this.BASE_PATH}/complete-invite-registration`,
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
      console.error('Invite registration error:', error);
      throw error;
    }
  }

  /**
   * Complete teacher registration from invitation
   */
  static async completeTeacherRegistration(registrationData: {
    firstName: string;
    lastName: string;
    email: string;
    staffId: string;
    password: string;
    inviteToken: string;
    phoneNumber?: string;
    address?: string;
    subRole?: string;
  }): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>(
        `${this.BASE_PATH}/complete-teacher-registration`,
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
      console.error('Complete teacher registration error:', error);
      throw error;
    }
  }

  /**
   * Complete staff registration from invitation
   */
  static async completeStaffRegistration(registrationData: {
    firstName: string;
    lastName: string;
    email: string;
    staffId: string;
    password: string;
    inviteToken: string;
    phoneNumber?: string;
    address?: string;
    subRole: string;
  }): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>(
        `${this.BASE_PATH}/complete-staff-registration`,
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
      console.error('Complete staff registration error:', error);
      throw error;
    }
  }
}
