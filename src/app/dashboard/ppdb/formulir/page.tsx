import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function FormulirPage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-heading font-bold text-neutral-900">Formulir Pendaftaran</h1>
        <p className="text-neutral-500 mt-2">
          Lengkapi data diri calon siswa, data orang tua/wali, dan unggah dokumen pendukung.
        </p>
      </div>

      {/* Stepper Placeholder */}
      <div className="flex items-center justify-between relative mb-8">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-neutral-200 -z-10"></div>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/3 h-0.5 bg-primary-800 -z-10"></div>
        
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-primary-800 text-white flex items-center justify-center font-bold text-sm">1</div>
          <span className="text-xs font-semibold mt-2 text-primary-900">Data Siswa</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-white border-2 border-neutral-200 text-neutral-500 flex items-center justify-center font-bold text-sm">2</div>
          <span className="text-xs font-semibold mt-2 text-neutral-500">Data Ortu/Wali</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-white border-2 border-neutral-200 text-neutral-500 flex items-center justify-center font-bold text-sm">3</div>
          <span className="text-xs font-semibold mt-2 text-neutral-500">Dokumen</span>
        </div>
      </div>

      <Card className="border-neutral-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-heading">Data Calon Siswa</CardTitle>
          <CardDescription>Masukkan data diri sesuai dengan akta kelahiran atau kartu keluarga.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="namaLengkap">Nama Lengkap</Label>
              <Input id="namaLengkap" placeholder="Contoh: Ahmad Dahlan" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="jenisKelamin">Jenis Kelamin</Label>
              <select id="jenisKelamin" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                <option value="">Pilih Jenis Kelamin</option>
                <option value="l">Laki-laki</option>
                <option value="p">Perempuan</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tempatLahir">Tempat Lahir</Label>
              <Input id="tempatLahir" placeholder="Contoh: Jakarta" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tanggalLahir">Tanggal Lahir</Label>
              <Input id="tanggalLahir" type="date" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="alamat">Alamat Lengkap</Label>
            <textarea 
              id="alamat" 
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Jalan, RT/RW, Kelurahan..."
            />
          </div>

          <div className="flex justify-end pt-4 border-t border-neutral-100">
            <Link href="/dashboard/ppdb/konfirmasi">
              <Button className="bg-primary-800 hover:bg-primary-700 text-white">Selanjutnya</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
