import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <Card className="w-full rounded-xl border-neutral-200 shadow-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center font-heading">Masuk Akun</CardTitle>
        <CardDescription className="text-center">
          Masukkan email dan password yang telah didaftarkan
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="contoh@email.com" required />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link href="/lupa-password" className="text-xs font-semibold text-primary-800 hover:text-primary-700">
                Lupa Password?
              </Link>
            </div>
            <Input id="password" type="password" required />
          </div>
          <Button type="button" className="w-full bg-primary-800 hover:bg-primary-700 text-white font-semibold mt-6 h-10">
            <Link href="/dashboard" className="w-full h-full flex items-center justify-center">
              Masuk
            </Link>
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4 text-center text-sm text-neutral-500">
        <div>
          Belum memiliki akun?{" "}
          <Link href="/daftar" className="text-primary-800 font-semibold hover:text-primary-700">
            Daftar Sekarang
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
