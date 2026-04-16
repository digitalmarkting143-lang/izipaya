"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface Card {
  id: string;
  type: "virtual" | "physical";
  last4: string;
  status: "active" | "ordered";
  issueDate: string;
  expiryDate: string;
  name: string;
}

interface Transaction {
  id: string;
  type: string;
  amount: number;
  status: "completed" | "pending";
  date: string;
  cardType: string;
}

interface User {
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  cards: Card[];
  transactions: Transaction[];
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  addCard: (type: "virtual" | "physical") => void;
  addTransaction: (type: string, amount: number, cardType: string) => void;
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
  const [cards, setCards] = useState<Card[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("izipay_user");
    const storedCards = localStorage.getItem("izipay_cards");
    const storedTransactions = localStorage.getItem("izipay_transactions");
    
    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedCards) setCards(JSON.parse(storedCards));
    if (storedTransactions) setTransactions(JSON.parse(storedTransactions));
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

  const addCard = (type: "virtual" | "physical") => {
    const cardNum = type === "virtual" ? "8831" : "9927";
    const newCard: Card = {
      id: Date.now().toString(),
      type,
      last4: cardNum,
      status: type === "virtual" ? "active" : "ordered",
      issueDate: new Date().toLocaleDateString(),
      expiryDate: "12/28",
      name: "IZIPAY USER"
    };
    const updatedCards = [...cards, newCard];
    setCards(updatedCards);
    localStorage.setItem("izipay_cards", JSON.stringify(updatedCards));
  };

  const addTransaction = (type: string, amount: number, cardType: string) => {
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type,
      amount,
      status: "completed",
      date: new Date().toLocaleString(),
      cardType
    };
    const updatedTransactions = [newTransaction, ...transactions];
    setTransactions(updatedTransactions);
    localStorage.setItem("izipay_transactions", JSON.stringify(updatedTransactions));
  };

  return (
    <AuthContext.Provider value={{ user, cards, transactions, login, logout, register, addCard, addTransaction, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}