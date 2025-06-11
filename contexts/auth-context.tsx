/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthApiService } from "@/lib/api/auth";

// Use the proper types from the API service
import type { LoginCredentials, RegisterData, User as ApiUser } from "@/lib/api/auth";

type User = {
  id: string;
  name: string;
  email: string;
  role: "super_admin" | "school_admin" | "assistant_admin" | "class_teacher" | "subject_teacher" | "student" | "parent";
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper function to map backend roles to frontend roles
function mapBackendRoleToFrontend(backendRole: string): User['role'] {
  switch (backendRole?.toUpperCase()) {
    case 'SUPER_ADMIN':
      return 'super_admin';
    case 'SCHOOL_ADMIN':
    case 'ADMIN':
      return 'school_admin';
    case 'ASSISTANT_ADMIN':
      return 'assistant_admin';
    case 'CLASS_TEACHER':
    case 'TEACHER':
      return 'class_teacher';
    case 'SUBJECT_TEACHER':
      return 'subject_teacher';
    case 'STUDENT':
      return 'student';
    case 'PARENT':
      return 'parent';
    case 'SCHOOL_MANAGEMENT':
      return 'super_admin'; // Map SCHOOL_MANAGEMENT to super_admin for frontend
    default:
      return 'student'; // Default fallback
  }
}

// Helper function to get dashboard path based on role  
function getDashboardPath(role: User['role']): string {
  switch (role) {
    case 'super_admin':
      return '/(users)/admin';
    case 'school_admin':
      return '/(users)/admin';
    case 'assistant_admin':
      return '/(users)/admin';
    case 'class_teacher':
      return '/(users)/teacher';
    case 'subject_teacher':
      return '/(users)/teacher';
    case 'student':
      return '/(users)/student';
    case 'parent':
      return '/(users)/parent';
    default:
      return '/(users)/student';
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    // Mark that we're now on the client side
    setIsClient(true);
    
    // Check if user data exists in localStorage and verify with backend
    const checkAuth = async () => {
      try {
        const storedToken = AuthApiService.getStoredToken();
        const storedUser = AuthApiService.getStoredUser();
        
        if (!storedToken || !storedUser) {
          setLoading(false);
          return;
        }

        // Verify token with backend
        try {
          const profile = await AuthApiService.getProfile();
          
          // Convert API user to local user format
          const localUser: User = {
            id: profile.id,
            name: `${profile.firstName} ${profile.lastName}`.trim(),
            email: profile.email,
            role: mapBackendRoleToFrontend(profile.role),
          };
          setUser(localUser);
        } catch (error) {
          // Token is invalid, clear storage
          console.error("Token verification failed:", error);
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user_data');
          setUser(null);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const credentials: LoginCredentials = { 
        email, 
        password
      };
      
      const response = await AuthApiService.login(credentials);
      
      // Convert API user to local user format
      const localUser: User = {
        id: response.user.id,
        name: `${response.user.firstName} ${response.user.lastName}`.trim(),
        email: response.user.email,
        role: mapBackendRoleToFrontend(response.user.role),
      };
      
      setUser(localUser);
      
      // Redirect based on returned role
      const dashboardPath = getDashboardPath(localUser.role);
      console.log('🔄 Login Success Redirect:', {
        backendRole: response.user.role,
        frontendRole: localUser.role,
        dashboardPath,
        schoolId: response.user.schoolId
      });
      router.push(dashboardPath);
      
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string) => {
    setLoading(true);
    try {
      const registerData: RegisterData = {
        email,
        password,
        firstName: email.split('@')[0],
        lastName: 'User',
        role: 'STUDENT',
      };

      const response = await AuthApiService.register(registerData);
      
      // Convert API user to local user format
      const localUser: User = {
        id: response.user.id,
        name: `${response.user.firstName} ${response.user.lastName}`.trim(),
        email: response.user.email,
        role: mapBackendRoleToFrontend(response.user.role),
      };
        setUser(localUser);

      // Redirect to dashboard using correct path
      const dashboardPath = getDashboardPath(localUser.role);
      router.push(dashboardPath);
      
    } catch (error) {
      console.error("Signup failed:", error);
      throw error; 
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await AuthApiService.logout();
    } catch (error) {
      console.error("Logout error:", error);
    }
    setUser(null);
    router.push("/auth/signin");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading: loading || !isClient, // Keep loading until client-side hydration is complete
        login,
        signup,
        logout,
        isAuthenticated: !!user && isClient,
      }}
    >
      {isClient ? children : <div>Loading...</div>}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Export helper functions for use in other components
export { getDashboardPath, mapBackendRoleToFrontend };
