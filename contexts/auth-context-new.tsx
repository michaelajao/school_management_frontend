/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Temporary interfaces - we'll use API types once imports are fixed
interface ApiUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'TEACHER' | 'STUDENT' | 'PARENT';
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'ADMIN' | 'TEACHER' | 'STUDENT' | 'PARENT';
  phoneNumber?: string;
}

type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "teacher" | "student" | "parent" | "superadmin";
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

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    // Mark that we're now on the client side
    setIsClient(true);
    
    // Check if user data exists in localStorage
    const checkAuth = async () => {
      try {
        // Mock authentication check
        const storedToken = localStorage.getItem('auth_token');
        const storedUserData = localStorage.getItem('user_data');
        
        if (!storedToken || !storedUserData) {
          setLoading(false);
          return;
        }

        const storedUser = JSON.parse(storedUserData);
        if (storedUser) {
          // Convert API user to local user format
          const localUser: User = {
            id: storedUser.id || 'temp-id',
            name: `${storedUser.firstName || storedUser.first_name || ''} ${storedUser.lastName || storedUser.last_name || ''}`.trim() || storedUser.name || 'User',
            email: storedUser.email,
            role: storedUser.role?.toLowerCase() === 'super_admin' ? 'superadmin' : 
                  storedUser.role?.toLowerCase() as User['role'] || 'student',
          };
          setUser(localUser);
        }

        // For now, we'll skip token verification as we don't have backend
        // TODO: Add token verification once backend is connected
      } catch (error) {
        console.error("Auth check failed:", error);
        // Clear local storage on error
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Mock login - in real app this would call API
      const credentials: LoginCredentials = { email, password };
      
      // Simulate API response
      const mockUser = {
        id: 'temp-' + Date.now(),
        firstName: 'Test',
        lastName: 'User',
        email: email,
        role: 'ADMIN' as const
      };
      
      // Store mock token and user data
      localStorage.setItem('auth_token', 'mock-token-' + Date.now());
      localStorage.setItem('user_data', JSON.stringify(mockUser));
      
      // Convert to local user format
      const localUser: User = {
        id: mockUser.id,
        name: `${mockUser.firstName} ${mockUser.lastName}`,
        email: mockUser.email,
        role: mockUser.role.toLowerCase() as User['role'],
      };
      
      setUser(localUser);
      
      // Redirect based on role
      router.push(`/dashboard/${localUser.role}`);
      
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
      // Mock signup - in real app this would call API
      const registerData: RegisterData = {
        email,
        password,
        firstName: email.split('@')[0],
        lastName: 'User',
        role: 'STUDENT',
      };

      // Simulate API response
      const mockUser = {
        id: 'temp-' + Date.now(),
        firstName: registerData.firstName,
        lastName: registerData.lastName,
        email: registerData.email,
        role: registerData.role
      };
      
      // Store mock token and user data
      localStorage.setItem('auth_token', 'mock-token-' + Date.now());
      localStorage.setItem('user_data', JSON.stringify(mockUser));
      
      // Convert to local user format
      const localUser: User = {
        id: mockUser.id,
        name: `${mockUser.firstName} ${mockUser.lastName}`,
        email: mockUser.email,
        role: mockUser.role.toLowerCase() as User['role'],
      };
      
      setUser(localUser);

      // Redirect to dashboard instead of payment gateway
      router.push(`/dashboard/${localUser.role}`);
      
    } catch (error) {
      console.error("Signup failed:", error);
      throw error; 
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Clear local storage
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
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
