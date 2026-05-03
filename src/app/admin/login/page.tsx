"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { IconLock, IconLoader2, IconAlertCircle } from "@tabler/icons-react";
import { supabase } from "@/lib/supabase";

export default function AdminLoginPage() {
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

      // Check if user is actually an admin
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single();

      if (profile?.role !== 'admin') {
        await supabase.auth.signOut();
        throw new Error("Anda tidak memiliki akses ke portal Admin.");
      }

      router.push("/admin/dashboard");
    } catch (err: any) {
      setError(err.message || "Login Admin gagal. Periksa kembali kredensial Anda.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-neutral-200 shadow-xl">
        <CardHeader className="space-y-2 text-center pb-8 border-b border-neutral-50 mb-6">
          <div className="mx-auto w-12 h-12 bg-primary-800 text-white rounded-xl flex items-center justify-center mb-2">
            <IconLock size={24} />
          </div>
          <CardTitle className="text-2xl font-heading font-bold">Admin Portal</CardTitle>
          <CardDescription>Masuk untuk mengelola sistem PPDB Darul Furqan</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-2 text-red-800 text-sm">
              <IconAlertCircle size={18} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Administrator</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="admin@email.com" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
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
              className="w-full bg-neutral-900 hover:bg-neutral-800 text-white font-bold py-6 transition-all"
            >
              {loading ? (
                <IconLoader2 className="animate-spin" size={20} />
              ) : (
                "Masuk Panel Admin"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
