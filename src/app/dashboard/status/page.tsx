"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IconCheck, IconClock, IconAlertCircle, IconChevronLeft, IconLoader2, IconX } from "@tabler/icons-react";
import { supabase } from "@/lib/supabase";
import { getRegistrations } from "@/lib/data";

export default function StatusPage() {
  const searchParams = useSearchParams();
  const success = searchParams.get("success") === "true";
  const [loading, setLoading] = useState(true);
  const [registration, setRegistration] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    async function fetchStatus() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const regs = await getRegistrations(user.id);
        if (regs && regs.length > 0) {
          setRegistration(regs[0]);
        }
      }
      setLoading(false);
    }
    fetchStatus();
  }, []);

  if (loading) return <div className="h-[60vh] flex items-center justify-center"><IconLoader2 className="animate-spin text-primary-800" size={40} /></div>;

  if (!registration) {
    return (
      <div className="max-w-md mx-auto mt-20 text-center space-y-6">
        <div className="w-20 h-20 bg-neutral-100 text-neutral-400 rounded-full flex items-center justify-center mx-auto"><IconAlertCircle size={40} /></div>
        <h2 className="text-2xl font-heading font-bold">Belum Ada Pendaftaran</h2>
        <p className="text-neutral-500">Anda belum mengisi formulir pendaftaran. Silakan mulai proses pendaftaran terlebih dahulu.</p>
        <Button onClick={() => window.location.href = "/dashboard/ppdb/pilih-jenjang"} className="bg-primary-800 text-white font-bold px-8 py-6 h-auto">Mulai Daftar Sekarang</Button>
      </div>
    );
  }

  const status = registration.status as string;
  const isRejected = status === "Ditolak";
  const isAccepted = status === "Diterima";

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-20">
      {success && (
        <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl flex items-center space-x-4 animate-in fade-in slide-in-from-top-4 duration-500 shadow-sm">
          <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/20"><IconCheck size={28} /></div>
          <div>
            <h4 className="font-bold text-emerald-900 text-lg">Pendaftaran Berhasil Dikirim!</h4>
            <p className="text-sm text-emerald-700">Data Anda telah tersimpan dan sedang menunggu verifikasi panitia.</p>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-neutral-900">Status Pendaftaran</h1>
          <p className="text-neutral-500 mt-2">Nomor Pendaftaran: <span className="font-mono font-bold text-primary-800">{registration.registration_number as string}</span></p>
        </div>
        <Button onClick={() => window.location.href = "/dashboard"} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-xl shadow-emerald-900/10 px-8 py-6 h-auto">
          <IconChevronLeft size={20} className="mr-2" /> Kembali ke Dashboard
        </Button>
      </div>

      {/* Reject Banner */}
      {isRejected && (
        <div className="bg-red-50 border border-red-200 p-5 rounded-2xl flex items-start space-x-4">
          <div className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center shrink-0"><IconX size={28} /></div>
          <div>
            <h4 className="font-bold text-red-900 text-lg">Pendaftaran Ditolak</h4>
            <p className="text-sm text-red-700 mt-1">{(registration.reject_reason as string) || "Silakan hubungi panitia PPDB untuk informasi lebih lanjut."}</p>
          </div>
        </div>
      )}

      <Card className="border-neutral-200 shadow-md overflow-hidden">
        <div className={`p-6 flex flex-col md:flex-row items-center justify-between gap-4 border-b ${isRejected ? "bg-red-50 border-red-100" : isAccepted ? "bg-emerald-50 border-emerald-100" : "bg-primary-50 border-primary-100"}`}>
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 ${isRejected ? "bg-red-600" : isAccepted ? "bg-emerald-600" : "bg-primary-800"} text-white rounded-2xl flex items-center justify-center shadow-lg`}>
              {isRejected ? <IconX size={24} /> : isAccepted ? <IconCheck size={24} /> : <IconClock size={24} />}
            </div>
            <div>
              <p className="text-xs font-black text-primary-700 uppercase tracking-widest">Status Saat Ini</p>
              <p className="text-xl font-bold text-neutral-900 mt-0.5">{status}</p>
            </div>
          </div>
          <Badge className={`${isRejected ? "bg-red-100 text-red-800" : isAccepted ? "bg-emerald-100 text-emerald-800" : "bg-blue-100 text-blue-800"} border-none px-4 py-1.5 text-sm rounded-full`}>
            {isRejected ? "Ditolak" : isAccepted ? "Diterima" : "Aktif"}
          </Badge>
        </div>

        <CardContent className="p-10">
          {/* Biodata Summary */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-10 pb-8 border-b border-neutral-100">
            <div><span className="text-xs text-neutral-400 uppercase font-bold">Nama Siswa</span><p className="font-bold text-neutral-800 mt-1">{registration.student_name as string || "-"}</p></div>
            <div><span className="text-xs text-neutral-400 uppercase font-bold">Jenjang</span><p className="font-bold text-neutral-800 mt-1">{registration.jenjang as string}</p></div>
            <div><span className="text-xs text-neutral-400 uppercase font-bold">Gender</span><p className="font-bold text-neutral-800 mt-1">{registration.gender as string || "-"}</p></div>
            <div><span className="text-xs text-neutral-400 uppercase font-bold">TTL</span><p className="font-bold text-neutral-800 mt-1">{registration.pob as string}, {registration.dob as string}</p></div>
            <div><span className="text-xs text-neutral-400 uppercase font-bold">Ayah</span><p className="font-bold text-neutral-800 mt-1">{registration.father_name as string || "-"}</p></div>
            <div><span className="text-xs text-neutral-400 uppercase font-bold">Ibu</span><p className="font-bold text-neutral-800 mt-1">{registration.mother_name as string || "-"}</p></div>
          </div>

          {/* Timeline */}
          <div className="space-y-12">
            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center z-10 shadow-lg shadow-emerald-500/30"><IconCheck size={20} /></div>
                <div className="w-1 h-14 bg-emerald-500 -mt-1"></div>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-neutral-900 text-lg">Pendaftaran Diterima</h4>
                <p className="text-sm text-neutral-500 mt-1">Sistem berhasil menerima data pada {new Date(registration.created_at as string).toLocaleString('id-ID')}.</p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full ${isRejected ? "bg-red-500" : isAccepted ? "bg-emerald-500" : "bg-blue-500 animate-pulse"} text-white flex items-center justify-center z-10 shadow-lg`}>
                  {isRejected ? <IconX size={20} /> : isAccepted ? <IconCheck size={20} /> : <IconClock size={20} />}
                </div>
                <div className="w-1 h-14 bg-neutral-200 -mt-1"></div>
              </div>
              <div className="flex-1">
                <h4 className={`font-bold text-lg ${isRejected ? "text-red-900" : isAccepted ? "text-emerald-900" : "text-blue-900"}`}>
                  {isRejected ? "Pendaftaran Ditolak" : isAccepted ? "Berkas Diterima" : "Proses Verifikasi Berkas"}
                </h4>
                <p className="text-sm text-neutral-500 mt-1">
                  {isRejected ? (registration.reject_reason as string || "Hubungi panitia untuk info lebih lanjut.") : isAccepted ? "Berkas telah diverifikasi dan dinyatakan lengkap." : "Tim PPDB sedang melakukan pengecekan keaslian dokumen."}
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className={`w-10 h-10 rounded-full ${isAccepted ? "bg-emerald-500 text-white" : "bg-neutral-100 text-neutral-400 border border-neutral-200"} flex items-center justify-center z-10`}>
                {isAccepted ? <IconCheck size={20} /> : "3"}
              </div>
              <div className={`flex-1 ${!isAccepted ? "opacity-40" : ""}`}>
                <h4 className="font-bold text-neutral-500 text-lg">{isAccepted ? "Diterima ✓" : "Penjadwalan Tes & Wawancara"}</h4>
                <p className="text-sm text-neutral-400 mt-1">{isAccepted ? "Selamat! Anda diterima sebagai peserta didik baru." : "Akan muncul setelah berkas dinyatakan lengkap dan valid."}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
