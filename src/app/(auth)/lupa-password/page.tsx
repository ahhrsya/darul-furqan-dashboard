import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function ForgotPasswordPage() {
  return (
    <Card className="w-full rounded-xl border-neutral-200 shadow-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center font-heading">Lupa Password</CardTitle>
        <CardDescription className="text-center">
          Masukkan email Anda untuk menerima link reset password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="contoh@email.com" required />
          </div>
          <Button type="button" className="w-full bg-primary-800 hover:bg-primary-700 text-white font-semibold mt-6 h-10">
            <Link href="/reset-password" className="w-full h-full flex items-center justify-center">
              Kirim Link Reset
            </Link>
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4 text-center text-sm text-neutral-500">
        <div>
          Ingat password Anda?{" "}
          <Link href="/masuk" className="text-primary-800 font-semibold hover:text-primary-700">
            Masuk di sini
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
