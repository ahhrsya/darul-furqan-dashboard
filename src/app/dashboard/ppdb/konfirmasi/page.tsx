import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { IconCheck, IconAlertCircle } from "@tabler/icons-react";

export default function KonfirmasiPage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-heading font-bold text-neutral-900">Preview & Konfirmasi</h1>
        <p className="text-neutral-500 mt-2">
          Periksa kembali seluruh data dan dokumen yang telah Anda unggah. Pastikan semuanya sudah benar.
        </p>
      </div>

      <Card className="border-neutral-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-heading">Ringkasan Data Calon Siswa</CardTitle>
          <CardDescription>SDIT Alam Darul Furqan</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm">
            <div>
              <span className="block text-neutral-500 mb-1">Nama Lengkap</span>
              <span className="font-semibold text-neutral-900">Ahmad Dahlan</span>
            </div>
            <div>
              <span className="block text-neutral-500 mb-1">Jenis Kelamin</span>
              <span className="font-semibold text-neutral-900">Laki-laki</span>
            </div>
            <div>
              <span className="block text-neutral-500 mb-1">Tempat, Tanggal Lahir</span>
              <span className="font-semibold text-neutral-900">Padang Pariaman, 15 Agustus 2018</span>
            </div>
            <div>
              <span className="block text-neutral-500 mb-1">Alamat</span>
              <span className="font-semibold text-neutral-900">Jl. Imam Bonjol No. 12, Pariaman Tengah</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-neutral-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-heading">Dokumen Unggahan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {["Akta Kelahiran", "Kartu Keluarga", "Pas Foto 3x4"].map((doc) => (
            <div key={doc} className="flex items-center justify-between p-3 border border-neutral-100 rounded-lg bg-neutral-50">
              <span className="font-medium text-neutral-700">{doc}</span>
              <div className="flex items-center text-green-600 space-x-1">
                <IconCheck size={16} />
                <span className="text-sm font-semibold">Terunggah</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="bg-gold-100 border border-gold-500 rounded-xl p-4 flex items-start space-x-3">
        <IconAlertCircle className="text-gold-500 shrink-0 mt-0.5" />
        <div>
          <h4 className="font-semibold text-neutral-900">Pernyataan Kebenaran Data</h4>
          <p className="text-sm text-neutral-700 mt-1">
            Dengan menekan tombol Kirim Pendaftaran, saya menyatakan bahwa seluruh data yang diisikan adalah benar. Jika dikemudian hari ditemukan ketidaksesuaian, saya bersedia menerima sanksi berupa pembatalan pendaftaran.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4">
        <Link href="/dashboard/ppdb/formulir">
          <Button variant="outline" className="text-primary-800 border-primary-800">
            Kembali & Edit
          </Button>
        </Link>
        <Link href="/dashboard/status">
          <Button className="bg-primary-800 hover:bg-primary-700 text-white">
            Kirim Pendaftaran
          </Button>
        </Link>
      </div>
    </div>
  );
}
