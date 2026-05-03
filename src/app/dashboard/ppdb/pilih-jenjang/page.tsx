"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IconChevronRight, IconSchool, IconBuildingSkyscraper, IconLoader2, IconCheck } from "@tabler/icons-react";
import { supabase } from "@/lib/supabase";
import { getRegistrations } from "@/lib/data";

export default function PilihJenjangPage() {
  const [loading, setLoading] = useState(true);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);

  useEffect(() => {
    async function checkRegistration() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const regs = await getRegistrations(user.id);
        if (regs && regs.length > 0) {
          setAlreadyRegistered(true);
        }
      }
      setLoading(false);
    }
    checkRegistration();
  }, []);

  if (loading) return <div className="h-[60vh] flex items-center justify-center"><IconLoader2 className="animate-spin text-primary-800" size={40} /></div>;

  if (alreadyRegistered) {
    return (
      <div className="max-w-2xl mx-auto mt-10 text-center space-y-6 p-10 bg-white rounded-3xl shadow-xl border border-neutral-100">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto"><IconCheck size={40} /></div>
        <h2 className="text-3xl font-heading font-bold text-neutral-900">Anda Sudah Terdaftar</h2>
        <p className="text-neutral-500 text-lg">Pendaftaran Anda sedang dalam proses verifikasi. Anda tidak perlu melakukan pendaftaran ulang.</p>
        <Button onClick={() => window.location.href = "/dashboard/status"} className="bg-emerald-600 text-white font-bold px-10 py-6 h-auto rounded-2xl shadow-lg">Pantau Status Sekarang</Button>
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
      stats: "Sisa Kuota: 45 Kursi"
    },
    {
      id: "SMA",
      title: "SMA IT Darul Furqon",
      description: "Pendidikan tingkat menengah atas dengan persiapan masuk PTN dan penguatan adab.",
      icon: IconBuildingSkyscraper,
      color: "bg-emerald-600",
      stats: "Sisa Kuota: 30 Kursi"
    }
  ];

  return (
    <div className="space-y-10 max-w-5xl mx-auto pb-20">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-heading font-bold text-neutral-900">Pilih Jenjang Pendidikan</h1>
        <p className="text-neutral-500 text-lg max-w-2xl mx-auto">Silakan pilih jenjang pendidikan yang ingin Anda tuju. Pastikan Anda memenuhi syarat usia untuk jenjang tersebut.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {jenjangs.map((j) => (
          <Card key={j.id} className="group relative border-none shadow-xl hover:shadow-2xl transition-all duration-500 rounded-3xl overflow-hidden bg-white">
            <div className={`h-3 w-full ${j.color}`}></div>
            <CardContent className="p-10 space-y-8">
              <div className="flex items-start justify-between">
                <div className={`w-20 h-20 ${j.color} text-white rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-900/20 group-hover:scale-110 transition-transform duration-500`}>
                  <j.icon size={40} />
                </div>
                <Badge variant="outline" className="text-neutral-500 border-neutral-200 px-4 py-1 rounded-full">{j.stats}</Badge>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-neutral-900">{j.title}</h3>
                <p className="text-neutral-500 leading-relaxed">{j.description}</p>
              </div>

              <Link href={`/dashboard/ppdb/formulir?jenjang=${j.id}`} className="block">
                <Button className={`w-full py-8 rounded-2xl font-bold text-lg flex items-center justify-center space-x-3 transition-all duration-300 ${j.color} text-white shadow-lg`}>
                  <span>Pilih Jenjang Ini</span>
                  <IconChevronRight size={22} className="group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
