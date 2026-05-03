"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IconCheck, IconClock, IconAlertCircle, IconChevronLeft, IconLoader2, IconCircleCheckFilled } from "@tabler/icons-react";
import { supabase } from "@/lib/supabase";
import { getRegistrations } from "@/lib/data";

export default function StatusPage() {
  const searchParams = useSearchParams();
  const success = searchParams.get("success") === "true";
  const [loading, setLoading] = useState(true);
  const [registration, setRegistration] = useState<any>(null);

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
        <Button onClick={() => window.location.href = "/dashboard/ppdb/pilih-jenjang"} className="bg-primary-800 text-white font-bold">Daftar Sekarang</Button>
      </div>
    );
  }

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
          <p className="text-neutral-500 mt-2">Nomor Pendaftaran: <span className="font-mono font-bold text-primary-800">{registration.registration_number}</span></p>
        </div>
        {/* HARD REFRESH BUTTON */}
        <Button 
          onClick={() => window.location.href = "/dashboard"} 
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-xl shadow-emerald-900/10 px-8 py-6 h-auto"
        >
          <IconChevronLeft size={20} className="mr-2" /> Kembali ke Dashboard
        </Button>
      </div>

      <Card className="border-neutral-200 shadow-md overflow-hidden">
        <div className="bg-primary-50 p-6 flex flex-col md:flex-row items-center justify-between gap-4 border-b border-primary-100">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary-800 text-white rounded-2xl flex items-center justify-center shadow-lg"><IconClock size={24} /></div>
            <div>
              <p className="text-xs font-black text-primary-700 uppercase tracking-widest">Status Saat Ini</p>
              <p className="text-xl font-bold text-neutral-900 mt-0.5">{registration.status}</p>
            </div>
          </div>
          <Badge className="bg-emerald-100 text-emerald-800 border-none px-4 py-1.5 text-sm rounded-full">Aktif</Badge>
        </div>
        
        <CardContent className="p-10">
          <div className="space-y-12">
             <div className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center z-10 shadow-lg shadow-emerald-500/30"><IconCheck size={20} /></div>
                  <div className="w-1 h-14 bg-emerald-500 -mt-1"></div>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-neutral-900 text-lg">Pendaftaran Diterima</h4>
                  <p className="text-sm text-neutral-500 mt-1">Sistem berhasil menerima data pada {new Date(registration.created_at).toLocaleString('id-ID')}.</p>
                </div>
             </div>

             <div className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center z-10 animate-pulse shadow-lg shadow-blue-500/30"><IconClock size={20} /></div>
                  <div className="w-1 h-14 bg-neutral-200 -mt-1"></div>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-blue-900 text-lg">Proses Verifikasi Berkas</h4>
                  <p className="text-sm text-neutral-500 mt-1">Tim PPDB sedang melakukan pengecekan keaslian dokumen yang Anda unggah.</p>
                  <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-2xl text-blue-800 text-sm italic">
                    Mohon menunggu informasi selanjutnya melalui WhatsApp atau dashboard ini.
                  </div>
                </div>
             </div>

             <div className="flex gap-6">
                <div className="w-10 h-10 rounded-full bg-neutral-100 text-neutral-400 flex items-center justify-center z-10 border border-neutral-200">3</div>
                <div className="flex-1 opacity-40">
                  <h4 className="font-bold text-neutral-500 text-lg">Penjadwalan Tes & Wawancara</h4>
                  <p className="text-sm text-neutral-400 mt-1">Akan muncul setelah berkas dinyatakan lengkap dan valid.</p>
                </div>
             </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
