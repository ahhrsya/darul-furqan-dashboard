"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { IconArrowRight, IconLoader2, IconAlertCircle, IconCheck, IconMail } from "@tabler/icons-react";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {
  const [step, setStep] = useState<"form" | "otp" | "success">("form");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Password dan konfirmasi password tidak cocok.");
      return;
    }
    if (password.length < 6) {
      setError("Password minimal 6 karakter.");
      return;
    }

    setLoading(true);
    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name, phone },
        },
      });

      if (signUpError) throw signUpError;
      setStep("otp");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Gagal mendaftar. Coba lagi.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { error: verifyError } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: "signup",
      });

      if (verifyError) throw verifyError;
      setStep("success");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Kode OTP salah atau sudah kedaluwarsa.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  if (step === "success") {
    return (
      <Card className="w-full rounded-xl border-neutral-200 shadow-sm">
        <CardContent className="p-10 text-center space-y-6">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <IconCheck size={40} />
          </div>
          <h2 className="text-2xl font-heading font-bold text-neutral-900">Akun Berhasil Dibuat!</h2>
          <p className="text-neutral-500">Email Anda telah terverifikasi. Silakan masuk untuk melanjutkan pendaftaran.</p>
          <Link href="/masuk">
            <Button className="bg-primary-800 text-white font-bold px-8 py-6 h-auto">
              Masuk Sekarang <IconArrowRight className="ml-2" size={18} />
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  if (step === "otp") {
    return (
      <Card className="w-full rounded-xl border-neutral-200 shadow-sm">
        <CardHeader className="space-y-1 text-center">
          <div className="w-16 h-16 bg-primary-50 text-primary-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <IconMail size={32} />
          </div>
          <CardTitle className="text-2xl font-heading">Verifikasi Email</CardTitle>
          <CardDescription>
            Kami telah mengirimkan kode verifikasi ke <strong className="text-neutral-900">{email}</strong>. Silakan cek inbox atau folder spam Anda.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="p-3 mb-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-2 text-red-800 text-sm">
              <IconAlertCircle size={18} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="otp">Kode Verifikasi (6 digit)</Label>
              <Input
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Masukkan 6 digit kode"
                maxLength={6}
                className="text-center text-2xl tracking-[0.5em] font-mono py-6"
                required
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full bg-primary-800 hover:bg-primary-700 text-white font-bold py-6">
              {loading ? <IconLoader2 className="animate-spin" size={20} /> : "Verifikasi"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center text-sm text-neutral-500">
          <button onClick={() => setStep("form")} className="text-primary-800 font-semibold hover:underline">
            ← Kembali ke form pendaftaran
          </button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full rounded-xl border-neutral-200 shadow-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center font-heading">Daftar Akun Baru</CardTitle>
        <CardDescription className="text-center">
          Buat akun untuk memulai pendaftaran peserta didik baru
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="p-3 mb-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-2 text-red-800 text-sm">
            <IconAlertCircle size={18} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nama Lengkap Orang Tua/Wali</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Masukkan nama lengkap" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Aktif</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="contoh@email.com" required />
            <p className="text-xs text-neutral-500">Kode verifikasi akan dikirim ke email ini.</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Nomor HP (WhatsApp)</Label>
            <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="08xxxxxxxx" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Konfirmasi Password</Label>
            <Input id="confirm-password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </div>
          <Button type="submit" disabled={loading} className="w-full bg-primary-800 hover:bg-primary-700 text-white font-semibold mt-6 py-6">
            {loading ? <IconLoader2 className="animate-spin" size={20} /> : <>Daftar Sekarang <IconArrowRight className="ml-2" size={18} /></>}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4 text-center text-sm text-neutral-500">
        <div>
          Sudah memiliki akun?{" "}
          <Link href="/masuk" className="text-primary-800 font-semibold hover:text-primary-700">
            Masuk di sini
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
