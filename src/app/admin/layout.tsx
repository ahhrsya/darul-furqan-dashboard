"use client";

import React from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Header } from "@/components/layout/Header";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen bg-neutral-50 overflow-hidden">
      <AdminSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header title="Admin Portal Darul Furqan" />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-[1280px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
