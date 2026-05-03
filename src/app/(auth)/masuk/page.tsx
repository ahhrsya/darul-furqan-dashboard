"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IconArrowRight, IconLoader2, IconAlertCircle } from "@tabler/icons-react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      // Check if user is actually a student/parent
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single();

      if (profile?.role === 'admin') {
        await supabase.auth.signOut();
        throw new Error("Akun ini terdaftar sebagai Admin. Silakan login melalui portal Admin.");
      }

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Gagal masuk. Periksa kembali email dan password Anda.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-heading font-bold tracking-tight text-neutral-900">Masuk Akun</h1>
        <p className="text-sm text-neutral-500">
          Silakan masuk untuk melanjutkan pendaftaran.
        </p>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-2 text-red-800 text-sm animate-in fade-in zoom-in-95">
          <IconAlertCircle size={18} className="shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="nama@email.com" 
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link 
              href="/lupa-password" 
              className="text-xs font-semibold text-primary-800 hover:text-primary-700 transition-colors"
            >
              Lupa password?
            </Link>
          </div>
          <Input 
            id="password" 
            type="password" 
            required 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button 
          type="submit" 
          disabled={loading}
          className="w-full bg-primary-800 hover:bg-primary-700 text-white font-bold py-6 transition-all shadow-lg shadow-primary-900/10"
        >
          {loading ? (
            <IconLoader2 className="animate-spin" size={20} />
          ) : (
            <>Masuk Sekarang <IconArrowRight className="ml-2" size={18} /></>
          )}
        </Button>
      </form>

      <div className="text-center text-sm">
        <span className="text-neutral-500">Belum punya akun? </span>
        <Link 
          href="/daftar" 
          className="font-bold text-primary-800 hover:text-primary-700 transition-colors"
        >
          Daftar Baru
        </Link>
      </div>
    </div>
  );
}
