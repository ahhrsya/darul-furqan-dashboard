import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IconPlus, IconEdit, IconTrash } from "@tabler/icons-react";

export default function KontenPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-neutral-900">Berita & Pengumuman</h1>
          <p className="text-neutral-500 mt-2">Kelola konten informasi, jadwal, dan persyaratan PPDB.</p>
        </div>
        <Button className="bg-primary-800 hover:bg-primary-700 text-white shrink-0">
          <IconPlus size={18} className="mr-2" /> Tambah Artikel
        </Button>
      </div>

      <Card className="border-neutral-200 shadow-sm">
        <CardContent className="p-0">
          <div className="flex gap-2 p-4 border-b border-neutral-200 overflow-x-auto no-scrollbar bg-neutral-50 rounded-t-xl">
            <Badge variant="default" className="bg-primary-800 hover:bg-primary-700 cursor-pointer shadow-none">Semua</Badge>
            <Badge variant="outline" className="text-neutral-500 hover:text-neutral-900 cursor-pointer bg-white">Pengumuman PPDB</Badge>
            <Badge variant="outline" className="text-neutral-500 hover:text-neutral-900 cursor-pointer bg-white">Jadwal PPDB</Badge>
            <Badge variant="outline" className="text-neutral-500 hover:text-neutral-900 cursor-pointer bg-white">Berita Umum</Badge>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white border-b border-neutral-200">
                  <th className="py-3 px-6 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Judul</th>
                  <th className="py-3 px-6 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Kategori</th>
                  <th className="py-3 px-6 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Tanggal</th>
                  <th className="py-3 px-6 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Status</th>
                  <th className="py-3 px-6 text-xs font-semibold text-neutral-500 uppercase tracking-wider text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 bg-white">
                <tr className="hover:bg-neutral-50 transition-colors">
                  <td className="py-4 px-6 text-sm font-semibold text-neutral-900">Jadwal Tes Penempatan dan Wawancara Gelombang 1</td>
                  <td className="py-4 px-6"><span className="text-xs text-primary-800 bg-primary-50 px-2 py-1 rounded">Jadwal PPDB</span></td>
                  <td className="py-4 px-6 text-sm text-neutral-600">15 Mei 2026</td>
                  <td className="py-4 px-6">
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100 shadow-none">Published</Badge>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end space-x-1">
                      <Button variant="ghost" size="icon" className="text-primary-800 hover:bg-primary-50 h-8 w-8">
                        <IconEdit size={16} />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-red-600 hover:bg-red-50 h-8 w-8">
                        <IconTrash size={16} />
                      </Button>
                    </div>
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
