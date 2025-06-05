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
  role: "admin" | "teacher" | "student" | "parent" | "superadmin";
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (identifier: string, password: string, role: User['role']) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper function to get correct dashboard path
const getDashboardPath = (role: User['role']): string => {
  switch (role) {
    case 'admin':
      return '/(users)/admin';
    case 'teacher':
      return '/(users)/teacher';
    case 'student':
      return '/(users)/student';
    case 'parent':
      return '/(users)/parent';
    case 'superadmin':
      return '/(users)/superadmin';
    default:
      return '/(users)/admin'; // Default fallback
  }
};

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
            role: profile.role?.toLowerCase() === 'super_admin' ? 'superadmin' : 
                  profile.role?.toLowerCase() as User['role'] || 'student',
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
  }, []);  const login = async (email: string, password: string, role: User['role']) => {
    setLoading(true);
    try {
      // Map frontend role to backend role format
      let backendRole: LoginCredentials['role'];
      
      switch (role) {
        case 'superadmin':
          backendRole = 'SUPER_ADMIN';
          break;
        case 'admin':
          backendRole = 'ADMIN';
          break;
        case 'teacher':
          backendRole = 'TEACHER';
          break;
        case 'student':
          backendRole = 'STUDENT';
          break;
        case 'parent':
          backendRole = 'PARENT';
          break;
        default:
          backendRole = 'SCHOOL_MANAGEMENT'; // Default fallback for school management
      }
      
      // Using identifier field that the AuthApiService will map to the appropriate backend field
      const credentials: LoginCredentials = { 
        identifier: email, 
        password, 
        role: backendRole 
      };
      
      const response = await AuthApiService.login(credentials);
      
      // Convert API user to local user format
      const localUser: User = {
        id: response.user.id,
        name: `${response.user.firstName} ${response.user.lastName}`.trim(),
        email: response.user.email,
        role: response.user.role?.toLowerCase() === 'super_admin' ? 'superadmin' : 
              response.user.role?.toLowerCase() === 'school_management' ? 'admin' :
              response.user.role?.toLowerCase() as User['role'] || 'student',
      };
      
      setUser(localUser);
        // Redirect based on returned role (not the requested role)
      // This ensures proper redirection if server assigns a different role
      const dashboardPath = getDashboardPath(localUser.role);
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
        role: response.user.role?.toLowerCase() === 'super_admin' ? 'superadmin' : 
              response.user.role?.toLowerCase() as User['role'] || 'student',
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
