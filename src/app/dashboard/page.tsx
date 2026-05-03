"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { IconSchool, IconCalendarEvent, IconNews, IconCheck, IconFileText, IconArrowRight, IconAlertCircle, IconLoader2, IconX } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import { getRegistrations, getAnnouncements } from "@/lib/data";
import { supabase } from "@/lib/supabase";

export default function UserDashboard() {
  const [loading, setLoading] = useState(true);
  const [registrations, setRegistrations] = useState<Record<string, unknown>[]>([]);
  const [announcements, setAnnouncements] = useState<Record<string, unknown>[]>([]);
  const [userName, setUserName] = useState("Siswa");

  useEffect(() => {
    async function loadData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserName(user.user_metadata?.full_name || user.email?.split('@')[0] || "Siswa");
        const regs = await getRegistrations(user.id);
        const anns = await getAnnouncements();
        setRegistrations(regs || []);
        setAnnouncements(anns || []);
      }
      setLoading(false);
    }
    loadData();
  }, []);

  const hasRegistration = registrations.length > 0;
  const latestReg = hasRegistration ? registrations[0] : null;
  const status = latestReg?.status as string;

  const statusBadge = (s: string) => {
    switch (s) {
      case "Diterima": return "bg-emerald-100 text-emerald-800";
      case "Ditolak": return "bg-red-100 text-red-800";
      case "Sedang Diverifikasi": return "bg-blue-100 text-blue-800";
      default: return "bg-amber-100 text-amber-800";
    }
  };

  if (loading) {
    return <div className="h-[60vh] flex items-center justify-center"><IconLoader2 className="animate-spin text-primary-800" size={40} /></div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-bold text-neutral-900 capitalize">Halo, {userName}</h1>
        <p className="text-neutral-500 mt-2">Selamat datang di portal Penerimaan Peserta Didik Baru Darul Furqan.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-neutral-200 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none"><IconSchool size={200} /></div>
            <CardHeader>
              <CardTitle className="text-xl font-heading">Status Pendaftaran</CardTitle>
              <CardDescription>Ringkasan pendaftaran Anda</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              {!hasRegistration ? (
                <div className="bg-primary-50 border-2 border-dashed border-primary-200 rounded-2xl p-12 text-center space-y-4">
                  <div className="mx-auto w-16 h-16 bg-white rounded-full flex items-center justify-center text-primary-800 shadow-sm"><IconFileText size={32} /></div>
                  <div>
                    <h3 className="font-bold text-neutral-900">Belum Ada Pendaftaran</h3>
                    <p className="text-sm text-neutral-500 max-w-xs mx-auto mt-1">Anda belum memulai pendaftaran. Silakan pilih jenjang pendidikan untuk memulai.</p>
                  </div>
                  <Link href="/dashboard/ppdb/pilih-jenjang">
                    <Button className="bg-primary-800 hover:bg-primary-700 text-white px-8">Mulai Pendaftaran Sekarang</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Status Banner for Rejected */}
                  {status === "Ditolak" && (
                    <div className="bg-red-50 border border-red-200 p-4 rounded-xl flex items-start space-x-3">
                      <IconX size={20} className="text-red-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-red-900">Pendaftaran Ditolak</p>
                        <p className="text-sm text-red-700 mt-1">{(latestReg?.reject_reason as string) || "Silakan hubungi panitia PPDB untuk informasi lebih lanjut."}</p>
                      </div>
                    </div>
                  )}

                  <div className="bg-white border-2 border-primary-50 rounded-2xl p-6 space-y-6 shadow-sm ring-1 ring-primary-800/5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary-800 text-white rounded-xl flex items-center justify-center shadow-lg shadow-primary-800/20"><IconFileText size={24} /></div>
                        <div>
                          <h3 className="font-bold text-neutral-900">{latestReg?.jenjang as string}</h3>
                          <p className="text-xs text-neutral-500">No: {latestReg?.registration_number as string}</p>
                        </div>
                      </div>
                      <Badge className={`${statusBadge(status)} hover:opacity-90 border-none px-3 py-1`}>{status}</Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-y border-neutral-50">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Calon Siswa</span>
                        <p className="text-sm font-bold text-neutral-800">{latestReg?.student_name as string || "-"}</p>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Jenis Kelamin</span>
                        <p className="text-sm font-bold text-neutral-800">{latestReg?.gender as string || "-"}</p>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Tempat, Tgl Lahir</span>
                        <p className="text-sm font-bold text-neutral-800">{latestReg?.pob as string}, {latestReg?.dob as string}</p>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Tanggal Daftar</span>
                        <p className="text-sm font-bold text-neutral-800">{new Date(latestReg?.created_at as string).toLocaleDateString('id-ID')}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-xs text-neutral-600 flex items-center"><IconCheck size={14} className="text-green-500 mr-1" /> Data Tersimpan di Database</p>
                      <Link href="/dashboard/status">
                        <Button variant="ghost" className="text-primary-800 hover:bg-primary-50 text-xs font-bold p-0 px-2 h-8">
                          Detail Status <IconArrowRight size={14} className="ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

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
              <div className="flex items-center space-x-2 text-primary-800">
                <IconNews size={20} />
                <CardTitle className="text-lg font-heading">Pengumuman</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 pt-2">
                {announcements.length > 0 ? (
                  announcements.slice(0, 3).map((ann) => (
                    <div key={ann.id as string} className="space-y-1 border-b border-neutral-100 pb-3 last:border-0">
                      <p className="text-xs text-neutral-400">{new Date(ann.date as string).toLocaleDateString('id-ID')}</p>
                      <Link href="/dashboard/pengumuman" className="text-sm font-semibold text-neutral-800 hover:text-primary-800 transition-colors">
                        {ann.title as string}
                      </Link>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4">
                    <IconAlertCircle className="mx-auto text-neutral-300 mb-2" size={24} />
                    <p className="text-xs text-neutral-400">Belum ada pengumuman terbaru.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
