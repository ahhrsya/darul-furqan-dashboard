import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { IconMail } from "@tabler/icons-react";

export default function VerificationPage() {
  return (
    <Card className="w-full rounded-xl border-neutral-200 shadow-sm">
      <CardHeader className="space-y-4">
        <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-primary-800">
          <IconMail size={32} />
        </div>
        <CardTitle className="text-2xl text-center font-heading">Cek Email Anda</CardTitle>
        <CardDescription className="text-center">
          Kami telah mengirimkan link verifikasi ke email yang Anda daftarkan. Silakan cek kotak masuk atau folder spam Anda.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button variant="outline" className="w-full text-primary-800 border-primary-800 hover:bg-primary-50 h-10">
          Kirim Ulang Email
        </Button>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4 text-center text-sm text-neutral-500">
        <div>
          <Link href="/masuk" className="text-primary-800 font-semibold hover:text-primary-700">
            Kembali ke Halaman Login
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
