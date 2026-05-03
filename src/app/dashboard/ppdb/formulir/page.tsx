"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IconChevronRight, IconChevronLeft, IconUpload, IconCheck, IconAlertCircle, IconFileDescription } from "@tabler/icons-react";

export default function FormulirPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = () => {
    // Simulate submission
    router.push("/dashboard/status?submitted=true");
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-heading font-bold text-neutral-900">Formulir Pendaftaran</h1>
        <p className="text-neutral-500 mt-2">
          Lengkapi seluruh data calon siswa, data orang tua/wali, dan unggah dokumen pendukung.
        </p>
      </div>

      {/* Stepper Progress Bar */}
      <div className="flex items-center justify-between relative mb-12">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-neutral-200 -z-10 rounded-full"></div>
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary-800 -z-10 transition-all duration-500 rounded-full"
          style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
        ></div>
        
        {[
          { step: 1, label: "Data Siswa" },
          { step: 2, label: "Data Ortu" },
          { step: 3, label: "Dokumen" },
          { step: 4, label: "Review" }
        ].map((item) => (
          <div key={item.step} className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 border-4 ${
              currentStep >= item.step 
                ? "bg-primary-800 text-white border-primary-100" 
                : "bg-white border-neutral-200 text-neutral-400"
            }`}>
              {currentStep > item.step ? <IconCheck size={18} /> : item.step}
            </div>
            <span className={`text-xs font-bold mt-2 whitespace-nowrap transition-colors ${
              currentStep >= item.step ? "text-primary-900" : "text-neutral-400"
            }`}>
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Step 1: Data Siswa */}
      {currentStep === 1 && (
        <Card className="border-neutral-200 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
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
                <select id="jenisKelamin" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
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
              <Input id="alamat" placeholder="Jalan, RT/RW, Kelurahan..." />
            </div>
            <div className="flex justify-end pt-4 border-t">
              <Button onClick={nextStep} className="bg-primary-800 hover:bg-primary-700 text-white">
                Selanjutnya <IconChevronRight size={18} className="ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Data Orang Tua / Wali */}
      {currentStep === 2 && (
        <Card className="border-neutral-200 shadow-sm animate-in fade-in slide-in-from-right-4 duration-500">
          <CardHeader>
            <CardTitle className="text-xl font-heading">Data Orang Tua / Wali</CardTitle>
            <CardDescription>Lengkapi biodata ayah, ibu, atau wali murid.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-4">
              <h4 className="font-bold text-primary-800 border-b pb-2">Biodata Ayah</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nama Lengkap Ayah</Label>
                  <Input placeholder="Nama Ayah" />
                </div>
                <div className="space-y-2">
                  <Label>Pekerjaan Ayah</Label>
                  <Input placeholder="Pekerjaan" />
                </div>
                <div className="space-y-2">
                  <Label>NIK Ayah</Label>
                  <Input placeholder="16 digit NIK" />
                </div>
                <div className="space-y-2">
                  <Label>No. HP Ayah</Label>
                  <Input placeholder="08xxxxxxxxxx" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-primary-800 border-b pb-2">Biodata Ibu</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nama Lengkap Ibu</Label>
                  <Input placeholder="Nama Ibu" />
                </div>
                <div className="space-y-2">
                  <Label>Pekerjaan Ibu</Label>
                  <Input placeholder="Pekerjaan" />
                </div>
                <div className="space-y-2">
                  <Label>NIK Ibu</Label>
                  <Input placeholder="16 digit NIK" />
                </div>
                <div className="space-y-2">
                  <Label>No. HP Ibu</Label>
                  <Input placeholder="08xxxxxxxxxx" />
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t">
              <Button onClick={prevStep} variant="outline" className="border-neutral-200">
                <IconChevronLeft size={18} className="mr-2" /> Kembali
              </Button>
              <Button onClick={nextStep} className="bg-primary-800 hover:bg-primary-700 text-white">
                Selanjutnya <IconChevronRight size={18} className="ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Upload Dokumen */}
      {currentStep === 3 && (
        <Card className="border-neutral-200 shadow-sm animate-in fade-in slide-in-from-right-4 duration-500">
          <CardHeader>
            <CardTitle className="text-xl font-heading">Unggah Dokumen</CardTitle>
            <CardDescription>Unggah dokumen pendukung dalam format PDF atau JPG (Maks. 2MB).</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {[
              "Akta Kelahiran Calon Siswa",
              "Kartu Keluarga (KK)",
              "KTP Orang Tua",
              "Pas Foto 3x4"
            ].map((doc) => (
              <div key={doc} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border border-neutral-100 rounded-xl bg-neutral-50 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white rounded-lg border border-neutral-200">
                    <IconFileDescription className="text-neutral-400" size={24} />
                  </div>
                  <div>
                    <span className="font-bold text-neutral-800 text-sm block">{doc}</span>
                    <span className="text-xs text-neutral-500">Format: .pdf, .jpg, .png</span>
                  </div>
                </div>
                <Button variant="outline" className="bg-white border-neutral-200 text-xs font-bold hover:bg-primary-50 hover:text-primary-800 hover:border-primary-200 transition-all shrink-0">
                  <IconUpload size={16} className="mr-2" /> Pilih File
                </Button>
              </div>
            ))}

            <div className="flex justify-between pt-4 border-t">
              <Button onClick={prevStep} variant="outline" className="border-neutral-200">
                <IconChevronLeft size={18} className="mr-2" /> Kembali
              </Button>
              <Button onClick={nextStep} className="bg-primary-800 hover:bg-primary-700 text-white">
                Selanjutnya <IconChevronRight size={18} className="ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Review & Konfirmasi */}
      {currentStep === 4 && (
        <Card className="border-neutral-200 shadow-sm animate-in fade-in zoom-in-95 duration-500">
          <CardHeader>
            <CardTitle className="text-xl font-heading">Review & Konfirmasi</CardTitle>
            <CardDescription>Pastikan seluruh data yang Anda isi sudah benar sebelum dikirim.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-6 bg-neutral-50 p-6 rounded-2xl border border-neutral-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h5 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">Nama Calon Siswa</h5>
                  <p className="font-bold text-neutral-900">Ahmad Dahlan</p>
                </div>
                <div>
                  <h5 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">Jenjang Pendidikan</h5>
                  <p className="font-bold text-neutral-900">SDIT Alam Darul Furqan</p>
                </div>
                <div>
                  <h5 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">Nama Ayah</h5>
                  <p className="font-bold text-neutral-900">Santoso Budi</p>
                </div>
                <div>
                  <h5 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">No. HP Orang Tua</h5>
                  <p className="font-bold text-neutral-900">081234567890</p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-neutral-200">
                <h5 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">Dokumen Terlampir</h5>
                <div className="flex flex-wrap gap-2">
                  <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-[10px] font-bold flex items-center">
                    <IconCheck size={12} className="mr-1" /> Akta_Lahir.pdf
                  </div>
                  <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-[10px] font-bold flex items-center">
                    <IconCheck size={12} className="mr-1" /> KK_Keluarga.jpg
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gold-50 border border-gold-200 rounded-xl p-4 flex items-start space-x-3 shadow-sm">
              <IconAlertCircle className="text-gold-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-neutral-900 text-sm">Pernyataan Kebenaran Data</h4>
                <p className="text-xs text-neutral-700 mt-1 leading-relaxed">
                  Saya menyatakan bahwa seluruh data yang diisikan adalah benar. Jika dikemudian hari ditemukan ketidaksesuaian, saya bersedia menerima sanksi berupa pembatalan pendaftaran.
                </p>
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t">
              <Button onClick={prevStep} variant="outline" className="border-neutral-200">
                <IconChevronLeft size={18} className="mr-2" /> Kembali
              </Button>
              <Button onClick={handleSubmit} className="bg-primary-800 hover:bg-primary-700 text-white font-bold px-8 shadow-lg shadow-primary-900/20">
                Kirim Pendaftaran <IconCheck size={18} className="ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
