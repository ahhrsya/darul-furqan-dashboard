"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconLayoutDashboard, IconUsers, IconNews, IconPhoto, IconMessage, IconSettings } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

export function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: IconLayoutDashboard },
    { name: "Data Pendaftar", href: "/admin/pendaftar", icon: IconUsers },
    { name: "Berita & Pengumuman", href: "/admin/konten", icon: IconNews },
    { name: "Manajemen Galeri", href: "/admin/galeri", icon: IconPhoto },
    { name: "Pesan Kontak", href: "/admin/pesan", icon: IconMessage },
    { name: "Pengaturan PPDB", href: "/admin/pengaturan/ppdb", icon: IconSettings },
  ];

  return (
    <aside className="w-[240px] flex-shrink-0 bg-neutral-900 h-screen flex flex-col text-white">
      {/* Logo Area */}
      <div className="h-[64px] bg-neutral-950 flex items-center px-6">
        <span className="font-heading font-bold text-lg text-white tracking-wide">Admin PPDB</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-4 space-y-2">
        {navItems.map((item) => {
          const isActive = item.href === "/admin/dashboard" 
            ? pathname === item.href 
            : pathname === item.href || pathname?.startsWith(item.href + "/");
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-white/10 text-white border-l-[3px] border-primary-700"
                  : "text-white/80 hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon size={20} stroke={isActive ? 2.5 : 2} className={isActive ? "text-white" : "text-white/80"} />
              <span className="text-sm font-semibold">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Divider */}
      <div className="border-t border-white/10 mx-4" />

      {/* Bottom Admin Profile */}
      <div className="p-4 bg-neutral-950 mt-auto space-y-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-primary-800 text-white flex items-center justify-center font-bold">
            SA
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-semibold text-white truncate">Super Admin</span>
            <span className="text-xs text-white/50">Administrator</span>
          </div>
        </div>
        <Button 
          variant="ghost" 
          onClick={async () => {
            const { supabase } = await import("@/lib/supabase");
            await supabase.auth.signOut();
            window.location.href = "/admin/login";
          }}
          className="w-full justify-start text-white/40 hover:text-white hover:bg-white/10 text-xs px-2 h-8"
        >
          Logout Admin
        </Button>
      </div>
    </aside>
  );
}
