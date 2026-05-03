import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function RegisterPage() {
  return (
    <Card className="w-full rounded-xl border-neutral-200 shadow-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center font-heading">Daftar Akun Baru</CardTitle>
        <CardDescription className="text-center">
          Buat akun untuk memulai pendaftaran peserta didik baru
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nama Lengkap Orang Tua/Wali</Label>
            <Input id="name" placeholder="Masukkan nama lengkap" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Aktif</Label>
            <Input id="email" type="email" placeholder="contoh@email.com" required />
            <p className="text-xs text-neutral-500">Gunakan email aktif untuk menerima informasi kelulusan.</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Nomor HP (WhatsApp)</Label>
            <Input id="phone" type="tel" placeholder="08xxxxxxxx" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Konfirmasi Password</Label>
            <Input id="confirm-password" type="password" required />
          </div>
          <Button type="button" className="w-full bg-primary-800 hover:bg-primary-700 text-white font-semibold mt-6 h-10">
            <Link href="/verifikasi" className="w-full h-full flex items-center justify-center">
              Daftar Sekarang
            </Link>
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
