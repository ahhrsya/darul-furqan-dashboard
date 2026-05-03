import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IconSearch, IconFilter, IconDownload, IconEye, IconEdit } from "@tabler/icons-react";

export default function PendaftarPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-neutral-900">Data Pendaftar</h1>
          <p className="text-neutral-500 mt-2">Kelola dan verifikasi data calon peserta didik baru.</p>
        </div>
        <Button variant="outline" className="text-primary-800 border-primary-800 shrink-0">
          <IconDownload size={18} className="mr-2" /> Ekspor CSV
        </Button>
      </div>

      <Card className="border-neutral-200 shadow-sm">
        <CardContent className="p-0">
          <div className="p-4 border-b border-neutral-200 flex flex-col sm:flex-row gap-4 bg-neutral-50 rounded-t-xl">
            <div className="relative flex-1">
              <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
              <Input placeholder="Cari nama atau nomor pendaftaran..." className="pl-10 bg-white" />
            </div>
            <div className="flex gap-2">
              <select className="h-10 rounded-md border border-input bg-white px-3 py-2 text-sm text-neutral-700">
                <option value="">Semua Jenjang</option>
                <option value="paud">PAUD Darul Furqan</option>
                <option value="sdit">SDIT Alam</option>
                <option value="ponpes">Pondok Pesantren</option>
              </select>
              <select className="h-10 rounded-md border border-input bg-white px-3 py-2 text-sm text-neutral-700">
                <option value="">Semua Status</option>
                <option value="pending">Menunggu Verifikasi</option>
                <option value="process">Sedang Diverifikasi</option>
                <option value="accepted">Diterima</option>
              </select>
              <Button variant="outline" className="px-3 shrink-0">
                <IconFilter size={18} />
              </Button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-neutral-50 border-b border-neutral-200">
                  <th className="py-3 px-6 text-xs font-semibold text-neutral-500 uppercase tracking-wider">No. Pendaftaran</th>
                  <th className="py-3 px-6 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Nama Calon Siswa</th>
                  <th className="py-3 px-6 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Jenjang</th>
                  <th className="py-3 px-6 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Tanggal Daftar</th>
                  <th className="py-3 px-6 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Status</th>
                  <th className="py-3 px-6 text-xs font-semibold text-neutral-500 uppercase tracking-wider text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 bg-white">
                <tr className="hover:bg-neutral-50 transition-colors">
                  <td className="py-4 px-6 text-sm font-mono text-neutral-700">DF-PPDB-2026-0415</td>
                  <td className="py-4 px-6 text-sm font-semibold text-neutral-900">Budi Santoso</td>
                  <td className="py-4 px-6 text-sm text-neutral-600">SDIT Alam</td>
                  <td className="py-4 px-6 text-sm text-neutral-600">12 Mei 2026</td>
                  <td className="py-4 px-6">
                    <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 shadow-none">Menunggu Verifikasi</Badge>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <Button variant="ghost" size="icon" className="text-primary-800 hover:bg-primary-50 h-8 w-8">
                        <IconEye size={18} />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-primary-800 hover:bg-primary-50 h-8 w-8">
                        <IconEdit size={18} />
                      </Button>
                    </div>
                  </td>
                </tr>
                <tr className="hover:bg-neutral-50 transition-colors">
                  <td className="py-4 px-6 text-sm font-mono text-neutral-700">DF-PPDB-2026-0414</td>
                  <td className="py-4 px-6 text-sm font-semibold text-neutral-900">Siti Aminah</td>
                  <td className="py-4 px-6 text-sm text-neutral-600">PAUD Darul Furqan</td>
                  <td className="py-4 px-6 text-sm text-neutral-600">11 Mei 2026</td>
                  <td className="py-4 px-6">
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 shadow-none">Sedang Diverifikasi</Badge>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <Button variant="ghost" size="icon" className="text-primary-800 hover:bg-primary-50 h-8 w-8">
                        <IconEye size={18} />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-primary-800 hover:bg-primary-50 h-8 w-8">
                        <IconEdit size={18} />
                      </Button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="p-4 border-t border-neutral-200 flex items-center justify-between text-sm text-neutral-500">
            <span>Menampilkan 1-2 dari 342 pendaftar</span>
            <div className="flex space-x-1">
              <Button variant="outline" size="sm" disabled>Sebelumnya</Button>
              <Button variant="outline" size="sm">Selanjutnya</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
