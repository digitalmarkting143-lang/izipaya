"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";

export interface User {
  email: string;
  name: string;
  provider?: "email" | "google";
  image?: string;
}

interface AuthContextType {
  user: User | null;
  cards: Card[];
  transactions: Transaction[];
  login: (email: string, password: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  addCard: (type: "virtual" | "physical", cardholderName: string) => void;
  addTransaction: (type: string, amount: number, cardType: string) => void;
  toggleCardNumberVisibility: (cardId: string) => void;
  toggleCardCvvVisibility: (cardId: string) => void;
  freezeCard: (cardId: string) => void;
  unfreezeCard: (cardId: string) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USER = {
  email: "demo@izipay.com",
  password: "Demo@12345",
  name: "Demo User"
};

function generateDemoCardNumber(): string {
  const prefixes = ["4532", "5425", "3714", "6011"];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const middle = Math.floor(1000 + Math.random() * 9000).toString();
  const suffix = Math.floor(1000 + Math.random() * 9000).toString();
  return prefix + middle + suffix;
}

function generateDemoCvv(): string {
  return Math.floor(100 + Math.random() * 900).toString();
}

function generateExpiryDate(): string {
  const year = 2027 + Math.floor(Math.random() * 3);
  const month = Math.floor(1 + Math.random() * 12).toString().padStart(2, "0");
  return `${month}/${year.toString().slice(-2)}`;
}

function sanitizeCardholderName(name: string): string {
  const trimmed = name.trim().replace(/\s+/g, " ");
  if (!trimmed) return "IZIPAY USER";
  if (trimmed.length > 24) return trimmed.slice(0, 24);
  return trimmed.toUpperCase();
}

interface Card {
  id: string;
  type: "virtual" | "physical";
  last4: string;
  fullNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
  status: "active" | "ordered" | "frozen";
  issueDate: string;
  name: string;
  isNumberVisible: boolean;
  isCvvVisible: boolean;
}

interface Transaction {
  id: string;
  type: string;
  amount: number;
  status: "completed" | "pending";
  date: string;
  cardType: string;
}

function migrateCard(card: any): Card {
  return {
    id: card?.id || Date.now().toString(),
    type: card?.type || "virtual",
    last4: card?.last4 || "0000",
    fullNumber: card?.fullNumber || "",
    expiryDate: card?.expiryDate || "12/28",
    cvv: card?.cvv || "000",
    cardholderName: card?.cardholderName || "IZIPAY USER",
    status: card?.status || (card?.type === "physical" ? "ordered" : "active"),
    issueDate: card?.issueDate || new Date().toLocaleDateString(),
    name: card?.name || (card?.type === "physical" ? "Physical Metal Card" : "Virtual Card"),
    isNumberVisible: card?.isNumberVisible || false,
    isCvvVisible: card?.isCvvVisible || false,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    const storedUser = localStorage.getItem("izipay_user");
    const storedCards = localStorage.getItem("izipay_cards");
    const storedTransactions = localStorage.getItem("izipay_transactions");
    
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("izipay_user");
      }
    }
    if (storedCards) {
      try {
        const parsedCards = JSON.parse(storedCards);
        const migratedCards = Array.isArray(parsedCards) ? parsedCards.map(migrateCard) : [];
        setCards(migratedCards);
      } catch {
        localStorage.removeItem("izipay_cards");
      }
    }
    if (storedTransactions) {
      try {
        setTransactions(JSON.parse(storedTransactions));
      } catch {
        localStorage.removeItem("izipay_transactions");
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (status === "loading") return;
    
    if (session?.user) {
      const sessionUser = session.user as any;
      const googleUser: User = {
        email: sessionUser.email || "",
        name: sessionUser.name || "Google User",
        provider: "google",
        image: sessionUser.image || undefined,
      };
      setUser(googleUser);
      localStorage.setItem("izipay_user", JSON.stringify(googleUser));
    }
  }, [session, status]);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (email === DEMO_USER.email && password === DEMO_USER.password) {
      const userData = { email: DEMO_USER.email, name: DEMO_USER.name, provider: "email" as const };
      localStorage.setItem("izipay_user", JSON.stringify(userData));
      setUser(userData);
      setIsLoading(false);
      return true;
    }
    
    const users = JSON.parse(localStorage.getItem("izipay_users") || "[]");
    const foundUser = users.find((u: any) => u.email === email && u.password === password);
    
    if (foundUser) {
      const userData = { email: foundUser.email, name: foundUser.name, provider: "email" as const };
      localStorage.setItem("izipay_user", JSON.stringify(userData));
      setUser(userData);
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const loginWithGoogle = async () => {
    const hasGoogleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    if (!hasGoogleClientId) {
      alert("Google sign-in is not configured. Please contact the administrator.");
      return;
    }
    await signIn("google", { callbackUrl: "/dashboard" });
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const users = JSON.parse(localStorage.getItem("izipay_users") || "[]");
    if (users.find((u: any) => u.email === email)) {
      setIsLoading(false);
      return false;
    }
    
    const newUser = { email, password, name, provider: "email", createdAt: new Date().toISOString() };
    users.push(newUser);
    localStorage.setItem("izipay_users", JSON.stringify(users));
    
    const userData = { email, name, provider: "email" as const };
    localStorage.setItem("izipay_user", JSON.stringify(userData));
    setUser(userData);
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    localStorage.removeItem("izipay_user");
    setUser(null);
    signOut({ callbackUrl: "/login" });
  };

  const addCard = (type: "virtual" | "physical", cardholderName: string) => {
    const fullNumber = generateDemoCardNumber();
    const last4 = fullNumber.slice(-4);
    const sanitizedName = sanitizeCardholderName(cardholderName);
    
    const newCard: Card = {
      id: Date.now().toString(),
      type,
      last4,
      fullNumber,
      expiryDate: generateExpiryDate(),
      cvv: generateDemoCvv(),
      cardholderName: sanitizedName,
      status: type === "virtual" ? "active" : "ordered",
      issueDate: new Date().toLocaleDateString(),
      name: type === "virtual" ? "Virtual Card" : "Physical Metal Card",
      isNumberVisible: false,
      isCvvVisible: false
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

  const toggleCardNumberVisibility = (cardId: string) => {
    const updatedCards = cards.map(card => 
      card.id === cardId ? { ...card, isNumberVisible: !card.isNumberVisible } : card
    );
    setCards(updatedCards);
    localStorage.setItem("izipay_cards", JSON.stringify(updatedCards));
  };

  const toggleCardCvvVisibility = (cardId: string) => {
    const updatedCards = cards.map(card => 
      card.id === cardId ? { ...card, isCvvVisible: !card.isCvvVisible } : card
    );
    setCards(updatedCards);
    localStorage.setItem("izipay_cards", JSON.stringify(updatedCards));
  };

  const freezeCard = (cardId: string) => {
    const updatedCards = cards.map(card => 
      card.id === cardId ? { ...card, status: "frozen" as const } : card
    );
    setCards(updatedCards);
    localStorage.setItem("izipay_cards", JSON.stringify(updatedCards));
  };

  const unfreezeCard = (cardId: string) => {
    const updatedCards = cards.map(card => 
      card.id === cardId ? { ...card, status: "active" as const } : card
    );
    setCards(updatedCards);
    localStorage.setItem("izipay_cards", JSON.stringify(updatedCards));
  };

  return (
    <AuthContext.Provider value={{ 
      user, cards, transactions, login, loginWithGoogle, register, logout, 
      addCard, addTransaction, toggleCardNumberVisibility, 
      toggleCardCvvVisibility, freezeCard, unfreezeCard, isLoading 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}