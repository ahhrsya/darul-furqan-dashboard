"use client";

import { IconBell, IconChevronDown } from "@tabler/icons-react";

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
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

        <div className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="w-9 h-9 rounded-full bg-primary-100 text-primary-800 flex items-center justify-center font-bold text-sm">
            AD
          </div>
          <div className="hidden md:flex items-center space-x-2">
            <span className="text-sm font-semibold text-neutral-700">Ahmad Dahlan</span>
            <IconChevronDown size={16} className="text-neutral-500" />
          </div>
        </div>
      </div>
    </header>
  );
}
