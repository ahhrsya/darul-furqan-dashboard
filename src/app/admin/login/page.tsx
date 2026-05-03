import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminLogin() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100 px-4">
      <div className="w-full max-w-md">
        <Card className="w-full rounded-xl border-neutral-200 shadow-xl overflow-hidden">
          <div className="h-2 bg-primary-800 w-full"></div>
          <CardHeader className="space-y-1 pb-8 pt-8">
            <div className="mx-auto w-16 h-16 bg-primary-800 rounded-2xl flex items-center justify-center mb-4">
              <span className="text-white font-heading font-bold text-2xl">DF</span>
            </div>
            <CardTitle className="text-2xl text-center font-heading">Admin Login</CardTitle>
            <CardDescription className="text-center">
              Portal Manajemen PPDB Darul Furqan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" type="text" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required />
              </div>
              <Button type="button" className="w-full bg-primary-800 hover:bg-primary-700 text-white font-semibold mt-6 h-10">
                <Link href="/admin/dashboard" className="w-full h-full flex items-center justify-center">
                  Masuk ke Dashboard
                </Link>
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
