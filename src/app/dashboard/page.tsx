import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { IconSchool, IconCalendarEvent, IconNews, IconCheck, IconFileText, IconArrowRight } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";

export default function UserDashboard({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  // Simple check for simulation. In real app this would be from DB.
  // We use Promise for searchParams as per Next.js 15+ patterns
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-heading font-bold text-neutral-900">Halo, Ahmad Dahlan</h1>
        <p className="text-neutral-500 mt-2">Selamat datang di portal Penerimaan Peserta Didik Baru Darul Furqan.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Section */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-neutral-200 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <IconSchool size={200} />
            </div>
            <CardHeader>
              <CardTitle className="text-xl font-heading">Status Pendaftaran</CardTitle>
              <CardDescription>Ringkasan pendaftaran Anda</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              {/* This is a simplified "toggle" based on the request logic. 
                  In a real app, this would check if the user has a record in the DB. */}
              
              <div className="bg-white border-2 border-primary-50 rounded-2xl p-6 space-y-6 shadow-sm ring-1 ring-primary-800/5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary-800 text-white rounded-xl flex items-center justify-center shadow-lg shadow-primary-800/20">
                      <IconFileText size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-neutral-900">Pendaftaran SDIT Alam</h3>
                      <p className="text-xs text-neutral-500">No: DF-PPDB-2026-0412</p>
                    </div>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-none px-3 py-1">
                    Sedang Diverifikasi
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 py-4 border-y border-neutral-50">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Tanggal Daftar</span>
                    <p className="text-sm font-bold text-neutral-800">12 Mei 2026</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Metode</span>
                    <p className="text-sm font-bold text-neutral-800">Online</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-xs text-neutral-600 flex items-center">
                    <IconCheck size={14} className="text-green-500 mr-1" /> Dokumen Lengkap
                  </p>
                  <Link href="/dashboard/status">
                    <Button variant="ghost" className="text-primary-800 hover:bg-primary-50 text-xs font-bold p-0 px-2 h-8">
                      Detail Status <IconArrowRight size={14} className="ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* New CTA: Registration Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-neutral-100 bg-neutral-50/50">
              <CardContent className="p-4 flex items-center space-x-4">
                <div className="w-10 h-10 bg-white border border-neutral-100 rounded-lg flex items-center justify-center text-primary-800">
                  <IconFileText size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-neutral-800">Unduh Kartu Pendaftaran</p>
                  <p className="text-[10px] text-neutral-500">Tersedia dalam format PDF</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-neutral-100 bg-neutral-50/50">
              <CardContent className="p-4 flex items-center space-x-4">
                <div className="w-10 h-10 bg-white border border-neutral-100 rounded-lg flex items-center justify-center text-primary-800">
                  <IconNews size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-neutral-800">Informasi Tes & Wawancara</p>
                  <p className="text-[10px] text-neutral-500">Cek jadwal pelaksanaan</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Side Info */}
        <div className="space-y-6">
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

          <Card className="border-neutral-200 shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-primary-800">
                  <IconNews size={20} />
                  <CardTitle className="text-lg font-heading">Pengumuman</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 pt-2">
                <div className="space-y-1 border-b border-neutral-100 pb-3">
                  <p className="text-xs text-neutral-400">10 Mei 2026</p>
                  <Link href="/dashboard/pengumuman" className="text-sm font-semibold text-neutral-800 hover:text-primary-800 transition-colors">
                    Syarat Berkas Fisik untuk Registrasi Ulang
                  </Link>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-neutral-400">5 Mei 2026</p>
                  <Link href="/dashboard/pengumuman" className="text-sm font-semibold text-neutral-800 hover:text-primary-800 transition-colors">
                    Jadwal Tes Penempatan dan Wawancara
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
