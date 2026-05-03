"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IconUsers, IconUserCheck, IconUserX, IconClock, IconLoader2, IconArrowRight } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import { getAllRegistrations } from "@/lib/data";

export default function AdminDashboardPage() {
  const [registrations, setRegistrations] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const data = await getAllRegistrations();
      setRegistrations(data || []);
      setLoading(false);
    }
    loadData();
  }, []);

  const total = registrations.length;
  const diterima = registrations.filter(r => r.status === "Diterima").length;
  const ditolak = registrations.filter(r => r.status === "Ditolak").length;
  const pending = registrations.filter(r => r.status === "Pending").length;

  const stats = [
    { title: "Total Pendaftar", value: total, icon: IconUsers, color: "text-blue-600", bg: "bg-blue-100" },
    { title: "Diterima", value: diterima, icon: IconUserCheck, color: "text-green-600", bg: "bg-green-100" },
    { title: "Ditolak", value: ditolak, icon: IconUserX, color: "text-red-600", bg: "bg-red-100" },
    { title: "Menunggu Verifikasi", value: pending, icon: IconClock, color: "text-amber-600", bg: "bg-amber-100" },
  ];

  const statusBadge = (s: string) => {
    switch (s) {
      case "Diterima": return "bg-emerald-100 text-emerald-800";
      case "Ditolak": return "bg-red-100 text-red-800";
      default: return "bg-amber-100 text-amber-800";
    }
  };

  if (loading) return <div className="h-[60vh] flex items-center justify-center"><IconLoader2 className="animate-spin text-primary-800" size={40} /></div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-bold text-neutral-900">Dashboard Admin</h1>
        <p className="text-neutral-500 mt-2">Ringkasan statistik pendaftaran PPDB Darul Furqan.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-neutral-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                  <stat.icon size={24} />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-3xl font-heading font-bold text-neutral-900">{stat.value}</p>
                <p className="text-sm text-neutral-500 font-medium mt-1">{stat.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-neutral-200 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-heading">Pendaftar Terbaru</CardTitle>
          <Link href="/admin/pendaftar" className="text-sm text-primary-800 font-semibold flex items-center hover:underline">
            Lihat Semua <IconArrowRight size={14} className="ml-1" />
          </Link>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-neutral-50 border-b border-neutral-200">
                  <th className="py-3 px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">No. Pendaftaran</th>
                  <th className="py-3 px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Nama</th>
                  <th className="py-3 px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Jenjang</th>
                  <th className="py-3 px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {registrations.length === 0 ? (
                  <tr><td colSpan={4} className="py-12 text-center text-neutral-400">Belum ada pendaftar.</td></tr>
                ) : (
                  registrations.slice(0, 5).map((reg) => (
                    <tr key={reg.id as string} className="hover:bg-neutral-50 transition-colors">
                      <td className="py-3 px-4 text-sm font-mono text-neutral-700">{reg.registration_number as string}</td>
                      <td className="py-3 px-4 text-sm font-semibold text-neutral-900">{reg.student_name as string || "-"}</td>
                      <td className="py-3 px-4 text-sm text-neutral-600">{reg.jenjang as string}</td>
                      <td className="py-3 px-4"><Badge className={`${statusBadge(reg.status as string)} hover:opacity-90 shadow-none`}>{reg.status as string}</Badge></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
