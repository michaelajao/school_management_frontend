"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "teacher" | "student" | "parent";
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
  const router = useRouter();

  useEffect(() => {
    // Check if user data exists in localStorage
    const checkAuth = async () => {
      try {
        const userData = localStorage.getItem("user");
        if (!userData) {
          setLoading(false);
          return;
        }
        
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Auth check failed:", error);
        localStorage.removeItem("user");
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // This is a mock implementation
      // Replace with actual API call when backend is ready
      
      // Mock successful login for now
      const mockUser = {
        id: "user-1",
        name: email.split('@')[0],
        email,
        role: email.includes('admin') ? 'admin' : 
              email.includes('teacher') ? 'teacher' : 
              email.includes('parent') ? 'parent' : 'student',
      } as User;
      
      // Store in localStorage
      localStorage.setItem("user", JSON.stringify(mockUser));
      setUser(mockUser);
      
      // Redirect based on role
      router.push(`/dashboard/${mockUser.role}`);
      
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
      // Mock signup - will be replaced with actual API implementation
      console.log("Signup with:", email, password);
      
      // After signup, redirect to onboarding page
      router.push("/onboarding");
      
    } catch (error) {
      console.error("Signup failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
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