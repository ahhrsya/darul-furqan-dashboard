"use client";

import { useEffect, useState } from "react";
import { IconBell } from "@tabler/icons-react";
import { supabase } from "@/lib/supabase";

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  const [userName, setUserName] = useState("");
  const [initials, setInitials] = useState("");

  useEffect(() => {
    async function loadUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const name = user.user_metadata?.full_name || user.email?.split("@")[0] || "User";
        setUserName(name);
        const parts = name.split(" ");
        setInitials(parts.length >= 2 ? (parts[0][0] + parts[1][0]).toUpperCase() : name.substring(0, 2).toUpperCase());
      }
    }
    loadUser();
  }, []);

  return (
    <header className="h-[64px] bg-white border-b border-neutral-200 shadow-[0_1px_3px_rgba(0,0,0,0.08)] flex items-center justify-between px-8 shrink-0">
      <h2 className="text-2xl font-heading font-semibold text-neutral-900">
        {title}
      </h2>

      <div className="flex items-center space-x-6">
        <button className="relative text-neutral-500 hover:text-primary-800 transition-colors">
          <IconBell size={24} />
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        {/* Removed duplicate user info - user info is in Sidebar only */}
      </div>
    </header>
  );
}
