/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthApiService, type User as ApiUser, type LoginCredentials, type RegisterData } from "@/lib/api";

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
        // Check if user is authenticated using the API service
        if (!AuthApiService.isAuthenticated()) {
          setLoading(false);
          return;
        }

        const storedUser = AuthApiService.getStoredUser();
        if (storedUser) {
          // Convert API user to local user format
          const localUser: User = {
            id: storedUser.id,
            name: `${storedUser.firstName} ${storedUser.lastName}`,
            email: storedUser.email,
            role: storedUser.role.toLowerCase() === 'super_admin' ? 'superadmin' : 
                  storedUser.role.toLowerCase() as User['role'],
          };
          setUser(localUser);
        }

        // Optionally verify token with backend
        try {
          await AuthApiService.getProfile();
        } catch (error) {
          console.error("Token verification failed:", error);
          // Token is invalid, clear auth data
          await AuthApiService.logout();
          setUser(null);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        await AuthApiService.logout();
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
      // Use real API for login
      const credentials: LoginCredentials = { email, password };
      const response = await AuthApiService.login(credentials);
      
      // Convert API user to local user format
      const localUser: User = {
        id: response.user.id,
        name: `${response.user.firstName} ${response.user.lastName}`,
        email: response.user.email,
        role: response.user.role.toLowerCase() === 'super_admin' ? 'superadmin' : 
              response.user.role.toLowerCase() as User['role'],
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
      // For now, we'll create a basic registration with default role
      // In a real app, you might want to collect more information during signup
      const registerData: RegisterData = {
        email,
        password,
        firstName: email.split('@')[0], // Temporary: extract name from email
        lastName: 'User', // Default last name
        role: 'STUDENT', // Default role, could be determined by signup flow
      };

      const response = await AuthApiService.register(registerData);
      
      // Convert API user to local user format
      const localUser: User = {
        id: response.user.id,
        name: `${response.user.firstName} ${response.user.lastName}`,
        email: response.user.email,
        role: response.user.role.toLowerCase() === 'super_admin' ? 'superadmin' : 
              response.user.role.toLowerCase() as User['role'],
      };

      setUser(localUser);

      // Redirect to payment gateway or onboarding
      const redirectPath = `/paymentGateway`;
      console.log(`Redirecting to: ${redirectPath}`);
      router.push(redirectPath);
      
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