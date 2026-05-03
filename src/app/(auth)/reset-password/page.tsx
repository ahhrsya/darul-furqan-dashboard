import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function ResetPasswordPage() {
  return (
    <Card className="w-full rounded-xl border-neutral-200 shadow-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center font-heading">Reset Password</CardTitle>
        <CardDescription className="text-center">
          Masukkan password baru Anda
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">Password Baru</Label>
            <Input id="password" type="password" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Konfirmasi Password Baru</Label>
            <Input id="confirm-password" type="password" required />
          </div>
          <Button type="button" className="w-full bg-primary-800 hover:bg-primary-700 text-white font-semibold mt-6 h-10">
            <Link href="/masuk" className="w-full h-full flex items-center justify-center">
              Simpan Password Baru
            </Link>
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4 text-center text-sm text-neutral-500">
        <div>
          <Link href="/masuk" className="text-primary-800 font-semibold hover:text-primary-700">
            Batal dan kembali ke Login
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
