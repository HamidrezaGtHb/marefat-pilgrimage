"use client";

import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/admin/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  return (
    <SessionProvider>
      {isLoginPage ? (
        // Login page without sidebar
        children
      ) : (
        // Admin pages with sidebar
        <div className="flex min-h-screen bg-ivory">
          <Sidebar />
          <main className="ml-64 flex-1">{children}</main>
        </div>
      )}
    </SessionProvider>
  );
}
