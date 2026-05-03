import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IconUsers, IconUserCheck, IconUserX, IconClock } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";

export default function AdminDashboardPage() {
  const stats = [
    { title: "Total Pendaftar", value: "342", icon: IconUsers, trend: "+12%", trendUp: true, color: "text-blue-600", bg: "bg-blue-100" },
    { title: "Diterima", value: "128", icon: IconUserCheck, trend: "+4%", trendUp: true, color: "text-green-600", bg: "bg-green-100" },
    { title: "Tidak Diterima", value: "24", icon: IconUserX, trend: "-2%", trendUp: false, color: "text-red-600", bg: "bg-red-100" },
    { title: "Menunggu Verifikasi", value: "85", icon: IconClock, trend: "+24%", trendUp: true, color: "text-amber-600", bg: "bg-amber-100" },
  ];

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
                <Badge variant="outline" className={`${stat.trendUp ? 'text-green-600 border-green-200 bg-green-50' : 'text-red-600 border-red-200 bg-red-50'}`}>
                  {stat.trend}
                </Badge>
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
        <CardHeader>
          <CardTitle className="text-xl font-heading">Pendaftar Terbaru</CardTitle>
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
                <tr className="hover:bg-neutral-50 transition-colors">
                  <td className="py-3 px-4 text-sm font-mono text-neutral-700">DF-PPDB-2026-0415</td>
                  <td className="py-3 px-4 text-sm font-semibold text-neutral-900">Budi Santoso</td>
                  <td className="py-3 px-4 text-sm text-neutral-600">SDIT Alam</td>
                  <td className="py-3 px-4">
                    <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 shadow-none">Menunggu Verifikasi</Badge>
                  </td>
                </tr>
                <tr className="hover:bg-neutral-50 transition-colors">
                  <td className="py-3 px-4 text-sm font-mono text-neutral-700">DF-PPDB-2026-0414</td>
                  <td className="py-3 px-4 text-sm font-semibold text-neutral-900">Siti Aminah</td>
                  <td className="py-3 px-4 text-sm text-neutral-600">PAUD Darul Furqan</td>
                  <td className="py-3 px-4">
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 shadow-none">Sedang Diverifikasi</Badge>
                  </td>
                </tr>
                <tr className="hover:bg-neutral-50 transition-colors">
                  <td className="py-3 px-4 text-sm font-mono text-neutral-700">DF-PPDB-2026-0413</td>
                  <td className="py-3 px-4 text-sm font-semibold text-neutral-900">Ahmad Dahlan</td>
                  <td className="py-3 px-4 text-sm text-neutral-600">Pondok Pesantren</td>
                  <td className="py-3 px-4">
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100 shadow-none">Diterima</Badge>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
