"use client";
import { useState, createContext, useContext, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface User {
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USER = {
  email: "demo@izipay.com",
  password: "Demo@12345",
  name: "Demo User"
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("izipay_user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (email === DEMO_USER.email && password === DEMO_USER.password) {
      const userData = { email: DEMO_USER.email, name: DEMO_USER.name };
      localStorage.setItem("izipay_user", JSON.stringify(userData));
      setUser(userData);
      setIsLoading(false);
      return true;
    }
    
    const users = JSON.parse(localStorage.getItem("izipay_users") || "[]");
    const foundUser = users.find((u: any) => u.email === email && u.password === password);
    
    if (foundUser) {
      const userData = { email: foundUser.email, name: foundUser.name };
      localStorage.setItem("izipay_user", JSON.stringify(userData));
      setUser(userData);
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const users = JSON.parse(localStorage.getItem("izipay_users") || "[]");
    if (users.find((u: any) => u.email === email)) {
      setIsLoading(false);
      return false;
    }
    
    const newUser = { email, password, name };
    users.push(newUser);
    localStorage.setItem("izipay_users", JSON.stringify(users));
    
    const userData = { email, name };
    localStorage.setItem("izipay_user", JSON.stringify(userData));
    setUser(userData);
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    localStorage.removeItem("izipay_user");
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}

export function requireAuth() {
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!user) router.push("/login");
  }, [user, router]);
}