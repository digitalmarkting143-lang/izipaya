"use client";
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "@/lib/auth-context";
import { AdminProvider } from "@/lib/admin-context";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <AdminProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
      </AdminProvider>
    </SessionProvider>
  );
}