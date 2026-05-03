import React from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-50 px-4">
      <div className="w-full max-w-md">
        {/* Auth Header Logo */}
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="w-16 h-16 bg-primary-800 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-primary-800/20">
            <span className="text-white font-heading font-bold text-2xl">DF</span>
          </div>
          <h1 className="text-2xl font-heading font-bold text-neutral-900 text-center">
            PPDB Darul Furqan
          </h1>
          <p className="text-sm text-neutral-500 mt-2 text-center">
            Portal Pendaftaran Peserta Didik Baru
          </p>
        </div>

        {/* Form Container */}
        {children}
      </div>
    </div>
  );
}
