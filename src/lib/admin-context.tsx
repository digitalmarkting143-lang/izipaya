"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
  status: "active" | "suspended" | "restricted";
  createdAt: string;
  lastLogin: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
}

export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  order: number;
  visible: boolean;
  createdAt: string;
}

export interface Ticket {
  id: string;
  subject: string;
  user: string;
  userEmail: string;
  status: "open" | "pending" | "resolved";
  priority: "low" | "medium" | "high";
  assignedTo: string | null;
  createdAt: string;
  updatedAt: string;
  messages: TicketMessage[];
}

export interface TicketMessage {
  id: string;
  from: "user" | "admin";
  message: string;
  timestamp: string;
  isInternal: boolean;
}

export interface LogEntry {
  id: string;
  adminId: string;
  adminName: string;
  action: string;
  target: string;
  targetType: string;
  timestamp: string;
  details: string;
}

export interface Order {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  type: "virtual" | "physical";
  amount: number;
  currency: string;
  status: "pending" | "completed" | "failed" | "refunded";
  createdAt: string;
  notes: string;
}

export interface Integration {
  googleClientId: string;
  googleClientSecret: string;
  metaPixelId: string;
  analyticsId: string;
  supportEmail: string;
  telegramLink: string;
  webhookUrl: string;
  webhookSecret: string;
}

interface AdminContextType {
  admin: AdminUser | null;
  roles: Role[];
  menuItems: MenuItem[];
  tickets: Ticket[];
  logs: LogEntry[];
  orders: Order[];
  users: AdminUser[];
  integrations: Integration;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  addLog: (action: string, target: string, targetType: string, details: string) => void;
  updateUser: (id: string, updates: Partial<AdminUser>) => void;
  deleteUser: (id: string) => void;
  addUser: (user: Omit<AdminUser, "id" | "createdAt" | "lastLogin">) => void;
  updateRole: (id: string, updates: Partial<Role>) => void;
  addMenuItem: (item: Omit<MenuItem, "id" | "createdAt" | "order">) => void;
  updateMenuItem: (id: string, updates: Partial<MenuItem>) => void;
  deleteMenuItem: (id: string) => void;
  reorderMenuItems: (items: MenuItem[]) => void;
  updateTicket: (id: string, updates: Partial<Ticket>) => void;
  addTicketMessage: (ticketId: string, message: string, isInternal: boolean) => void;
  updateIntegrations: (updates: Partial<Integration>) => void;
  hasPermission: (permission: string) => boolean;
  isLoading: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const DEMO_ADMIN = {
  email: "admin@izipay.com",
  password: "Admin@12345",
  name: "Super Admin",
  role: "super_admin"
};

const DEFAULT_ROLES: Role[] = [
  { id: "1", name: "Super Admin", description: "Full system access", permissions: ["view_users", "edit_users", "restrict_users", "delete_users", "edit_menus", "manage_settings", "view_logs", "manage_orders", "manage_tickets", "manage_roles", "manage_integrations"] },
  { id: "2", name: "Admin", description: "Standard admin access", permissions: ["view_users", "edit_users", "restrict_users", "view_logs", "manage_tickets"] },
  { id: "3", name: "Support Manager", description: "Support team lead", permissions: ["view_users", "manage_tickets", "view_logs"] },
  { id: "4", name: "Content Manager", description: "Content and menu management", permissions: ["edit_menus", "view_users", "view_logs"] },
  { id: "5", name: "Analyst", description: "Read-only access", permissions: ["view_users", "view_logs", "manage_orders"] },
];

const DEFAULT_MENU_ITEMS: MenuItem[] = [
  { id: "1", label: "Dashboard", icon: "dashboard", path: "/admin", order: 1, visible: true, createdAt: new Date().toISOString() },
  { id: "2", label: "Users", icon: "people", path: "/admin/users", order: 2, visible: true, createdAt: new Date().toISOString() },
  { id: "3", label: "Roles", icon: "security", path: "/admin/roles", order: 3, visible: true, createdAt: new Date().toISOString() },
  { id: "4", label: "Menu", icon: "menu", path: "/admin/menu", order: 4, visible: true, createdAt: new Date().toISOString() },
  { id: "5", label: "Orders", icon: "shopping_cart", path: "/admin/orders", order: 5, visible: true, createdAt: new Date().toISOString() },
  { id: "6", label: "Support", icon: "support_agent", path: "/admin/support", order: 6, visible: true, createdAt: new Date().toISOString() },
  { id: "7", label: "Integrations", icon: "integration_instructions", path: "/admin/integrations", order: 7, visible: true, createdAt: new Date().toISOString() },
  { id: "8", label: "Logs", icon: "description", path: "/admin/logs", order: 8, visible: true, createdAt: new Date().toISOString() },
  { id: "9", label: "Settings", icon: "settings", path: "/admin/settings", order: 9, visible: true, createdAt: new Date().toISOString() },
];

const DEFAULT_USERS: AdminUser[] = [
  { id: "1", email: "demo@izipay.com", name: "Demo User", role: "user", status: "active", createdAt: "2024-01-15", lastLogin: "2024-03-20" },
  { id: "2", email: "john@example.com", name: "John Smith", role: "user", status: "active", createdAt: "2024-02-01", lastLogin: "2024-03-19" },
  { id: "3", email: "alice@example.com", name: "Alice Johnson", role: "user", status: "active", createdAt: "2024-02-10", lastLogin: "2024-03-18" },
  { id: "4", email: "bob@example.com", name: "Bob Wilson", role: "user", status: "suspended", createdAt: "2024-02-15", lastLogin: "2024-03-10" },
  { id: "5", email: "carol@example.com", name: "Carol Davis", role: "user", status: "active", createdAt: "2024-02-20", lastLogin: "2024-03-21" },
  { id: "6", email: "david@example.com", name: "David Brown", role: "user", status: "active", createdAt: "2024-03-01", lastLogin: "2024-03-21" },
  { id: "7", email: "eve@example.com", name: "Eve Martinez", role: "user", status: "restricted", createdAt: "2024-03-05", lastLogin: "2024-03-15" },
];

const DEFAULT_TICKETS: Ticket[] = [
  { id: "1", subject: "Cannot access dashboard", user: "John Smith", userEmail: "john@example.com", status: "open", priority: "high", assignedTo: null, createdAt: "2024-03-20T10:30:00", updatedAt: "2024-03-20T10:30:00", messages: [{ id: "1", from: "user", message: "I cannot access my dashboard after login", timestamp: "2024-03-20T10:30:00", isInternal: false }] },
  { id: "2", subject: "Card not working", user: "Alice Johnson", userEmail: "alice@example.com", status: "pending", priority: "medium", assignedTo: "Super Admin", createdAt: "2024-03-19T14:20:00", updatedAt: "2024-03-20T09:00:00", messages: [{ id: "1", from: "user", message: "My virtual card is showing as invalid", timestamp: "2024-03-19T14:20:00", isInternal: false }, { id: "2", from: "admin", message: "Checking card status", timestamp: "2024-03-20T09:00:00", isInternal: true }] },
  { id: "3", subject: "Payment issue", user: "Bob Wilson", userEmail: "bob@example.com", status: "resolved", priority: "low", assignedTo: "Super Admin", createdAt: "2024-03-18T09:15:00", updatedAt: "2024-03-19T11:30:00", messages: [{ id: "1", from: "user", message: "Payment failed", timestamp: "2024-03-18T09:15:00", isInternal: false }, { id: "2", from: "admin", message: "Issue resolved - was a temporary gateway issue", timestamp: "2024-03-19T11:30:00", isInternal: false }] },
  { id: "4", subject: "How to activate card?", user: "Carol Davis", userEmail: "carol@example.com", status: "open", priority: "low", assignedTo: null, createdAt: "2024-03-21T08:45:00", updatedAt: "2024-03-21T08:45:00", messages: [{ id: "1", from: "user", message: "Need help activating my physical card", timestamp: "2024-03-21T08:45:00", isInternal: false }] },
];

const DEFAULT_LOGS: LogEntry[] = [
  { id: "1", adminId: "admin1", adminName: "Super Admin", action: "user_update", target: "Bob Wilson", targetType: "user", timestamp: "2024-03-21T10:30:00", details: "Restricted user account" },
  { id: "2", adminId: "admin1", adminName: "Super Admin", action: "user_delete", target: "Test User", targetType: "user", timestamp: "2024-03-20T15:45:00", details: "Deleted inactive test account" },
  { id: "3", adminId: "admin1", adminName: "Super Admin", action: "role_update", target: "Support Manager", targetType: "role", timestamp: "2024-03-20T12:00:00", details: "Added view_logs permission" },
  { id: "4", adminId: "admin1", adminName: "Super Admin", action: "menu_update", target: "Dashboard", targetType: "menu", timestamp: "2024-03-19T14:30:00", details: "Reordered menu items" },
  { id: "5", adminId: "admin1", adminName: "Super Admin", action: "settings_update", target: "Integrations", targetType: "settings", timestamp: "2024-03-19T10:00:00", details: "Updated Meta Pixel ID" },
];

const DEFAULT_ORDERS: Order[] = [
  { id: "ORD-001", userId: "1", userName: "Demo User", userEmail: "demo@izipay.com", type: "virtual", amount: 49.99, currency: "USD", status: "completed", createdAt: "2024-03-15T10:00:00", notes: "Demo virtual card order" },
  { id: "ORD-002", userId: "2", userName: "John Smith", userEmail: "john@example.com", type: "physical", amount: 459.99, currency: "USD", status: "completed", createdAt: "2024-03-18T14:30:00", notes: "Physical metal card - shipped" },
  { id: "ORD-003", userId: "3", userName: "Alice Johnson", userEmail: "alice@example.com", type: "virtual", amount: 49.99, currency: "USD", status: "pending", createdAt: "2024-03-20T09:15:00", notes: "Payment processing" },
  { id: "ORD-004", userId: "5", userName: "Carol Davis", userEmail: "carol@example.com", type: "physical", amount: 459.99, currency: "USD", status: "failed", createdAt: "2024-03-19T16:45:00", notes: "Payment failed - retry requested" },
  { id: "ORD-005", userId: "6", userName: "David Brown", userEmail: "david@example.com", type: "virtual", amount: 49.99, currency: "USD", status: "completed", createdAt: "2024-03-21T11:00:00", notes: "Demo virtual card order" },
  { id: "ORD-006", userId: "4", userName: "Bob Wilson", userEmail: "bob@example.com", type: "physical", amount: 459.99, currency: "USD", status: "refunded", createdAt: "2024-03-10T13:20:00", notes: "Order cancelled and refunded" },
];

const DEFAULT_INTEGRATIONS: Integration = {
  googleClientId: "",
  googleClientSecret: "",
  metaPixelId: "",
  analyticsId: "",
  supportEmail: "support@izipay.me",
  telegramLink: "https://t.me/izipay",
  webhookUrl: "",
  webhookSecret: ""
};

export function AdminProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [roles, setRoles] = useState<Role[]>(DEFAULT_ROLES);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(DEFAULT_MENU_ITEMS);
  const [tickets, setTickets] = useState<Ticket[]>(DEFAULT_TICKETS);
  const [logs, setLogs] = useState<LogEntry[]>(DEFAULT_LOGS);
  const [orders, setOrders] = useState<Order[]>(DEFAULT_ORDERS);
  const [users, setUsers] = useState<AdminUser[]>(DEFAULT_USERS);
  const [integrations, setIntegrations] = useState<Integration>(DEFAULT_INTEGRATIONS);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedAdmin = localStorage.getItem("izipay_admin");
    const storedRoles = localStorage.getItem("izipay_admin_roles");
    const storedMenu = localStorage.getItem("izipay_admin_menu");
    const storedTickets = localStorage.getItem("izipay_admin_tickets");
    const storedLogs = localStorage.getItem("izipay_admin_logs");
    const storedOrders = localStorage.getItem("izipay_admin_orders");
    const storedUsers = localStorage.getItem("izipay_admin_users");
    const storedIntegrations = localStorage.getItem("izipay_admin_integrations");
    
    if (storedAdmin) setAdmin(JSON.parse(storedAdmin));
    if (storedRoles) setRoles(JSON.parse(storedRoles));
    if (storedMenu) setMenuItems(JSON.parse(storedMenu));
    if (storedTickets) setTickets(JSON.parse(storedTickets));
    if (storedLogs) setLogs(JSON.parse(storedLogs));
    if (storedOrders) setOrders(JSON.parse(storedOrders));
    if (storedUsers) setUsers(JSON.parse(storedUsers));
    if (storedIntegrations) setIntegrations(JSON.parse(storedIntegrations));
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const admins = JSON.parse(localStorage.getItem("izipay_admins") || "[]");
    const foundAdmin = admins.find((a: any) => a.email === email && a.password === password);
    
    if (email === DEMO_ADMIN.email && password === DEMO_ADMIN.password) {
      const adminData: AdminUser = {
        id: "admin1",
        email: DEMO_ADMIN.email,
        name: DEMO_ADMIN.name,
        role: DEMO_ADMIN.role,
        status: "active",
        createdAt: "2024-01-01",
        lastLogin: new Date().toISOString()
      };
      localStorage.setItem("izipay_admin", JSON.stringify(adminData));
      setAdmin(adminData);
      addLog("login", adminData.email, "admin", "Admin logged in");
      setIsLoading(false);
      return true;
    }
    
    if (foundAdmin) {
      const adminData: AdminUser = {
        ...foundAdmin,
        lastLogin: new Date().toISOString()
      };
      localStorage.setItem("izipay_admin", JSON.stringify(adminData));
      setAdmin(adminData);
      addLog("login", adminData.email, "admin", "Admin logged in");
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    if (admin) addLog("logout", admin.email, "admin", "Admin logged out");
    localStorage.removeItem("izipay_admin");
    setAdmin(null);
    router.push("/admin/login");
  };

  const addLog = (action: string, target: string, targetType: string, details: string) => {
    if (!admin) return;
    const newLog: LogEntry = {
      id: Date.now().toString(),
      adminId: admin.id,
      adminName: admin.name,
      action,
      target,
      targetType,
      timestamp: new Date().toISOString(),
      details
    };
    const updatedLogs = [newLog, ...logs];
    setLogs(updatedLogs);
    localStorage.setItem("izipay_admin_logs", JSON.stringify(updatedLogs));
  };

  const hasPermission = (permission: string): boolean => {
    if (!admin) return false;
    if (admin.role === "super_admin") return true;
    const role = roles.find(r => r.id === admin.role || r.name.toLowerCase().replace(" ", "_") === admin.role);
    return role?.permissions.includes(permission) || false;
  };

  const updateUser = (id: string, updates: Partial<AdminUser>) => {
    const updatedUsers = users.map(u => u.id === id ? { ...u, ...updates } : u);
    setUsers(updatedUsers);
    localStorage.setItem("izipay_admin_users", JSON.stringify(updatedUsers));
    const user = users.find(u => u.id === id);
    if (user) addLog("user_update", user.name, "user", `Updated user: ${Object.keys(updates).join(", ")}`);
  };

  const deleteUser = (id: string) => {
    const user = users.find(u => u.id === id);
    const updatedUsers = users.filter(u => u.id !== id);
    setUsers(updatedUsers);
    localStorage.setItem("izipay_admin_users", JSON.stringify(updatedUsers));
    if (user) addLog("user_delete", user.name, "user", "Deleted user account");
  };

  const addUser = (userData: Omit<AdminUser, "id" | "createdAt" | "lastLogin">) => {
    const newUser: AdminUser = {
      ...userData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      lastLogin: "-"
    };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem("izipay_admin_users", JSON.stringify(updatedUsers));
    addLog("user_create", newUser.name, "user", "Created new user account");
  };

  const updateRole = (id: string, updates: Partial<Role>) => {
    const updatedRoles = roles.map(r => r.id === id ? { ...r, ...updates } : r);
    setRoles(updatedRoles);
    localStorage.setItem("izipay_admin_roles", JSON.stringify(updatedRoles));
    const role = roles.find(r => r.id === id);
    if (role) addLog("role_update", role.name, "role", "Updated role permissions");
  };

  const addMenuItem = (item: Omit<MenuItem, "id" | "createdAt" | "order">) => {
    const newItem: MenuItem = {
      ...item,
      id: Date.now().toString(),
      order: menuItems.length + 1,
      createdAt: new Date().toISOString()
    };
    const updatedMenu = [...menuItems, newItem];
    setMenuItems(updatedMenu);
    localStorage.setItem("izipay_admin_menu", JSON.stringify(updatedMenu));
    addLog("menu_create", item.label, "menu", "Created new menu item");
  };

  const updateMenuItem = (id: string, updates: Partial<MenuItem>) => {
    const updatedMenu = menuItems.map(m => m.id === id ? { ...m, ...updates } : m);
    setMenuItems(updatedMenu);
    localStorage.setItem("izipay_admin_menu", JSON.stringify(updatedMenu));
    const item = menuItems.find(m => m.id === id);
    if (item) addLog("menu_update", item.label, "menu", "Updated menu item");
  };

  const deleteMenuItem = (id: string) => {
    const item = menuItems.find(m => m.id === id);
    const updatedMenu = menuItems.filter(m => m.id !== id);
    setMenuItems(updatedMenu);
    localStorage.setItem("izipay_admin_menu", JSON.stringify(updatedMenu));
    if (item) addLog("menu_delete", item.label, "menu", "Deleted menu item");
  };

  const reorderMenuItems = (items: MenuItem[]) => {
    setMenuItems(items);
    localStorage.setItem("izipay_admin_menu", JSON.stringify(items));
    addLog("menu_reorder", "Menu", "menu", "Reordered menu items");
  };

  const updateTicket = (id: string, updates: Partial<Ticket>) => {
    const updatedTickets = tickets.map(t => t.id === id ? { ...t, ...updates, updatedAt: new Date().toISOString() } : t);
    setTickets(updatedTickets);
    localStorage.setItem("izipay_admin_tickets", JSON.stringify(updatedTickets));
    const ticket = tickets.find(t => t.id === id);
    if (ticket) addLog("ticket_update", ticket.subject, "ticket", "Updated ticket status");
  };

  const addTicketMessage = (ticketId: string, message: string, isInternal: boolean) => {
    const updatedTickets = tickets.map(t => {
      if (t.id === ticketId) {
        const newMessage = {
          id: Date.now().toString(),
          from: "admin" as const,
          message,
          timestamp: new Date().toISOString(),
          isInternal
        };
        return { ...t, messages: [...t.messages, newMessage], updatedAt: new Date().toISOString() };
      }
      return t;
    });
    setTickets(updatedTickets);
    localStorage.setItem("izipay_admin_tickets", JSON.stringify(updatedTickets));
  };

  const updateIntegrations = (updates: Partial<Integration>) => {
    const newIntegrations = { ...integrations, ...updates };
    setIntegrations(newIntegrations);
    localStorage.setItem("izipay_admin_integrations", JSON.stringify(newIntegrations));
    addLog("settings_update", "Integrations", "settings", "Updated integration settings");
  };

  return (
    <AdminContext.Provider value={{
      admin, roles, menuItems, tickets, logs, orders, users, integrations,
      login, logout, addLog, updateUser, deleteUser, addUser, updateRole,
      addMenuItem, updateMenuItem, deleteMenuItem, reorderMenuItems,
      updateTicket, addTicketMessage, updateIntegrations, hasPermission, isLoading
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) throw new Error("useAdmin must be used within AdminProvider");
  return context;
}