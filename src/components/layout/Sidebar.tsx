"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconLayoutDashboard, IconSchool, IconClock, IconFileText, IconNews } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { getRegistrations } from "@/lib/data";

export function Sidebar() {
  const pathname = usePathname();
  const [hasRegistration, setHasRegistration] = useState(false);
  const [userName, setUserName] = useState("Siswa");

  useEffect(() => {
    async function checkStatus() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserName(user.email?.split("@")[0] || "Siswa");
        const regs = await getRegistrations(user.id);
        if (regs && regs.length > 0) {
          setHasRegistration(true);
        }
      }
    }
    checkStatus();
  }, []);

  // Base nav items always visible
  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: IconLayoutDashboard },
  ];

  // Only show registration menu if user hasn't registered yet
  if (!hasRegistration) {
    navItems.push(
      { name: "Pilih Jenjang", href: "/dashboard/ppdb/pilih-jenjang", icon: IconSchool },
      { name: "Formulir", href: "/dashboard/ppdb/formulir", icon: IconFileText },
    );
  }

  // Always show these
  navItems.push(
    { name: "Status Pendaftaran", href: "/dashboard/status", icon: IconClock },
    { name: "Pengumuman", href: "/dashboard/pengumuman", icon: IconNews },
  );

  return (
    <aside className="w-[240px] flex-shrink-0 bg-primary-800 h-screen flex flex-col text-white">
      {/* Logo Area */}
      <div className="h-[64px] bg-primary-900 flex items-center px-6">
        <span className="font-heading font-bold text-lg text-white tracking-wide">Darul Furqan</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-4 space-y-2">
        {navItems.map((item) => {
          const isActive = item.href === "/dashboard" 
            ? pathname === item.href 
            : pathname === item.href || pathname?.startsWith(item.href + "/");
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-white/10 text-white border-l-[3px] border-gold-500"
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

      {/* Bottom User Profile */}
      <div className="p-4 bg-primary-900 mt-auto space-y-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-900 flex items-center justify-center font-bold text-sm">
            {userName.substring(0, 2).toUpperCase()}
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-semibold text-white truncate capitalize">{userName}</span>
            <span className="text-xs text-white/70">{hasRegistration ? "Pendaftar" : "Calon Pendaftar"}</span>
          </div>
        </div>
        <Button 
          variant="ghost" 
          onClick={async () => {
            await supabase.auth.signOut();
            window.location.href = "/masuk";
          }}
          className="w-full justify-start text-white/70 hover:text-white hover:bg-white/10 text-xs px-2 h-8"
        >
          Keluar Sesi
        </Button>
      </div>
    </aside>
  );
}
