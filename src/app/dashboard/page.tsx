import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { IconSchool, IconCalendarEvent, IconNews } from "@tabler/icons-react";

export default function UserDashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-heading font-bold text-neutral-900">Halo, Ahmad Dahlan</h1>
        <p className="text-neutral-500 mt-2">Selamat datang di portal Penerimaan Peserta Didik Baru Darul Furqan.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main CTA: Registration Status (Empty State) */}
        <Card className="lg:col-span-2 border-neutral-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <IconSchool size={200} />
          </div>
          <CardHeader>
            <CardTitle className="text-xl font-heading">Status Pendaftaran</CardTitle>
            <CardDescription>Anda belum memulai proses pendaftaran</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="bg-primary-50 border border-primary-100 rounded-xl p-6 text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-white rounded-full flex items-center justify-center text-primary-800 shadow-sm">
                <IconSchool size={32} />
              </div>
              <h3 className="font-heading font-semibold text-lg text-primary-900">Mulai Pendaftaran Anda</h3>
              <p className="text-neutral-600 text-sm max-w-md mx-auto">
                Silakan pilih jenjang pendidikan dan lengkapi formulir pendaftaran untuk memulai proses penerimaan peserta didik baru.
              </p>
              <Button asChild className="bg-primary-800 hover:bg-primary-700 text-white mt-4">
                <Link href="/dashboard/ppdb/pilih-jenjang">Mulai Pendaftaran</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Side Info */}
        <div className="space-y-6">
          {/* Period Info Box */}
          <Card className="border-gold-500 shadow-sm bg-gold-100">
            <CardHeader className="pb-2">
              <div className="flex items-center space-x-2 text-gold-500">
                <IconCalendarEvent size={20} />
                <CardTitle className="text-lg font-heading">Periode PPDB</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-neutral-900">Gelombang 1</p>
                <p className="text-xs text-neutral-700">1 Mei 2026 - 30 Juni 2026</p>
              </div>
            </CardContent>
          </Card>

          {/* Announcements Snippet */}
          <Card className="border-neutral-200 shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-primary-800">
                  <IconNews size={20} />
                  <CardTitle className="text-lg font-heading">Pengumuman</CardTitle>
                </div>
                <Link href="/dashboard/pengumuman" className="text-xs text-primary-800 font-semibold hover:underline">
                  Lihat Semua
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 pt-2">
                <div className="space-y-1 border-b border-neutral-100 pb-3">
                  <p className="text-xs text-neutral-400">10 Mei 2026</p>
                  <Link href="/dashboard/pengumuman/1" className="text-sm font-semibold text-neutral-800 hover:text-primary-800 transition-colors">
                    Syarat Berkas Fisik untuk Registrasi Ulang
                  </Link>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-neutral-400">5 Mei 2026</p>
                  <Link href="/dashboard/pengumuman/2" className="text-sm font-semibold text-neutral-800 hover:text-primary-800 transition-colors">
                    Jadwal Tes Penempatan dan Wawancara Gelombang 1
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
