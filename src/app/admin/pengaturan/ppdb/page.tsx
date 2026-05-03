import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function PengaturanPPDBPage() {
  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-heading font-bold text-neutral-900">Pengaturan PPDB</h1>
        <p className="text-neutral-500 mt-2">Konfigurasi jadwal, kuota, dan status penerimaan peserta didik baru.</p>
      </div>

      <Card className="border-neutral-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-heading">Status Gelombang Pendaftaran</CardTitle>
          <CardDescription>Atur status pembukaan pendaftaran untuk website publik.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg bg-neutral-50">
            <div>
              <h4 className="font-semibold text-neutral-900">Status Pendaftaran Dibuka</h4>
              <p className="text-sm text-neutral-500 mt-1">Saat ini pendaftaran sedang aktif untuk Gelombang 1.</p>
            </div>
            {/* Toggle switch placeholder */}
            <div className="w-12 h-6 bg-primary-800 rounded-full relative cursor-pointer">
              <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Tanggal Buka</Label>
              <Input type="date" defaultValue="2026-05-01" />
            </div>
            <div className="space-y-2">
              <Label>Tanggal Tutup</Label>
              <Input type="date" defaultValue="2026-06-30" />
            </div>
          </div>
          <Button className="bg-primary-800 hover:bg-primary-700 text-white">Simpan Perubahan</Button>
        </CardContent>
      </Card>

      <Card className="border-neutral-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-heading">Pengaturan Kuota per Jenjang</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>PAUD Darul Furqan</Label>
              <Input type="number" defaultValue="50" />
            </div>
            <div className="space-y-2">
              <Label>SDIT Alam</Label>
              <Input type="number" defaultValue="120" />
            </div>
            <div className="space-y-2">
              <Label>Pondok Pesantren</Label>
              <Input type="number" defaultValue="100" />
            </div>
          </div>
          <Button className="bg-primary-800 hover:bg-primary-700 text-white">Update Kuota</Button>
        </CardContent>
      </Card>
    </div>
  );
}
