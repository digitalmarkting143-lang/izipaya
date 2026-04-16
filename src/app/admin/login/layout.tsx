"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const storedAdmin = localStorage.getItem("izipay_admin");
    if (storedAdmin) {
      router.push("/admin");
    }
  }, [router]);

  return <>{children}</>;
}