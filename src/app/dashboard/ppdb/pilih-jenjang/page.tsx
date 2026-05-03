"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IconChevronRight, IconSchool, IconBuildingSkyscraper, IconBuildingMosque, IconLoader2, IconCheck } from "@tabler/icons-react";
import { supabase } from "@/lib/supabase";
import { getRegistrations } from "@/lib/data";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function PilihJenjangPage() {
  const [loading, setLoading] = useState(true);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const [counts, setCounts] = useState({ SMP: 0, SMA: 0, PONDOK: 0 });

  useEffect(() => {
    async function checkRegistrationAndQuotas() {
      // Check user registration
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const regs = await getRegistrations(user.id);
        if (regs && regs.length > 0) {
          setAlreadyRegistered(true);
        }
      }

      // Calculate real-time quotas
      const { data: allRegs } = await supabase.from('registrations').select('jenjang');
      if (allRegs) {
        const smpCount = allRegs.filter(r => r.jenjang === 'SMP').length;
        const smaCount = allRegs.filter(r => r.jenjang === 'SMA').length;
        const pondokCount = allRegs.filter(r => r.jenjang === 'PONDOK').length;
        setCounts({ SMP: smpCount, SMA: smaCount, PONDOK: pondokCount });
      }
      
      setLoading(false);
    }
    checkRegistrationAndQuotas();
  }, []);

  if (loading) return <div className="h-[60vh] flex items-center justify-center"><IconLoader2 className="animate-spin text-primary-800" size={40} /></div>;

  if (alreadyRegistered) {
    return (
      <div className="max-w-2xl mx-auto mt-10 text-center space-y-6 p-10 bg-white rounded-3xl shadow-xl border border-neutral-100">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto"><IconCheck size={40} /></div>
        <h2 className="text-3xl font-heading font-bold text-neutral-900">Anda Sudah Terdaftar</h2>
        <p className="text-neutral-500 text-lg">Pendaftaran Anda sedang dalam proses verifikasi. Anda tidak perlu melakukan pendaftaran ulang.</p>
        <Button onClick={() => window.location.href = "/dashboard/status"} className="bg-emerald-600 text-white font-bold px-10 py-6 h-auto rounded-2xl shadow-lg hover:bg-emerald-700">Pantau Status Sekarang</Button>
      </div>
    );
  }

  const jenjangs = [
    {
      id: "SMP",
      title: "SMP IT Darul Furqon",
      description: "Pendidikan tingkat menengah pertama dengan fokus tahfidz dan kurikulum nasional.",
      icon: IconSchool,
      color: "bg-blue-600",
      quota: 45,
      count: counts.SMP
    },
    {
      id: "SMA",
      title: "SMA IT Darul Furqon",
      description: "Pendidikan tingkat menengah atas dengan persiapan masuk PTN dan penguatan adab.",
      icon: IconBuildingSkyscraper,
      color: "bg-emerald-600",
      quota: 30,
      count: counts.SMA
    },
    {
      id: "PONDOK",
      title: "Pondok Pesantren",
      description: "Pendidikan diniyah intensif khusus asrama untuk mencetak kader ulama dan hafidz quran.",
      icon: IconBuildingMosque,
      color: "bg-gold-600",
      quota: 20,
      count: counts.PONDOK
    }
  ];

  return (
    <div className="space-y-10 max-w-5xl mx-auto pb-20">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-heading font-bold text-neutral-900">Pilih Jenjang Pendidikan</h1>
        <p className="text-neutral-500 text-lg max-w-2xl mx-auto">Silakan pilih jenjang pendidikan yang ingin Anda tuju. Pastikan Anda memenuhi syarat usia untuk jenjang tersebut.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jenjangs.map((j) => {
          const remainingQuota = Math.max(0, j.quota - j.count);
          const isFull = remainingQuota === 0;

          return (
            <Card key={j.id} className={`group relative border-none shadow-xl hover:shadow-2xl transition-all duration-500 rounded-3xl overflow-hidden bg-white flex flex-col ${isFull ? 'opacity-70 grayscale' : ''}`}>
              <div className={`h-3 w-full ${j.color}`}></div>
              <CardContent className="p-8 flex-1 flex flex-col justify-between space-y-8">
                <div>
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-16 h-16 ${j.color} text-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                      <j.icon size={32} />
                    </div>
                    <Badge variant={isFull ? "destructive" : "outline"} className={`px-3 py-1 rounded-full ${isFull ? 'bg-rose-500 text-white' : 'text-neutral-600 border-neutral-200'}`}>
                      {isFull ? "Kuota Penuh" : `Sisa Kuota: ${remainingQuota}`}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-neutral-900">{j.title}</h3>
                    <p className="text-neutral-500 text-sm leading-relaxed">{j.description}</p>
                  </div>
                </div>

                {isFull ? (
                  <Button disabled className="w-full py-6 rounded-xl font-bold text-base flex items-center justify-center bg-neutral-200 text-neutral-500">
                    Kuota Telah Penuh
                  </Button>
                ) : (
                  <Link href={`/dashboard/ppdb/formulir?jenjang=${j.id}`} className="block">
                    <Button className={`w-full py-6 rounded-xl font-bold text-base flex items-center justify-center space-x-2 transition-all duration-300 ${j.color} text-white shadow-lg hover:brightness-110`}>
                      <span>Pilih {j.id}</span>
                      <IconChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
