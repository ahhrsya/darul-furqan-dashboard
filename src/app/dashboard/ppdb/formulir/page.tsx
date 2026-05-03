"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IconChevronRight, IconChevronLeft, IconUpload, IconCheck, IconAlertCircle, IconFileDescription, IconLoader2, IconInfoCircle, IconUser, IconUsers, IconFileCheck } from "@tabler/icons-react";
import { supabase } from "@/lib/supabase";
import { createRegistration, getRegistrations } from "@/lib/data";

export default function FormulirPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const totalSteps = 4;

  const [formData, setFormData] = useState({
    namaLengkap: "",
    jenisKelamin: "",
    tempatLahir: "",
    tanggalLahir: "",
    alamat: "",
    namaAyah: "",
    pekerjaanAyah: "",
    nikAyah: "",
    hpAyah: "",
    namaIbu: "",
    pekerjaanIbu: "",
    nikIbu: "",
    hpIbu: "",
  });

  useEffect(() => {
    async function checkStatus() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      
      const regs = await getRegistrations(user.id);
      if (regs && regs.length > 0) {
        setAlreadyRegistered(true);
      }
      setLoading(false);
    }
    checkStatus();
  }, []);

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async () => {
    if (submitLoading) return;
    setSubmitLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Sesi berakhir, silakan login kembali.");

      const regNumber = `DF-${Date.now().toString().slice(-6)}`;
      
      await createRegistration({
        user_id: user.id,
        registration_number: regNumber,
        jenjang: "SDIT Alam", 
        student_name: formData.namaLengkap,
        parent_name: formData.namaAyah,
        phone_number: formData.hpAyah,
        status: 'Sedang Diverifikasi'
      });

      // Direct redirect to status
      window.location.href = "/dashboard/status?success=true";
    } catch (err: any) {
      alert(err.message || "Gagal mengirim pendaftaran.");
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) return <div className="h-[60vh] flex items-center justify-center"><IconLoader2 className="animate-spin text-primary-800" size={40} /></div>;

  if (alreadyRegistered) {
    return (
      <div className="max-w-md mx-auto mt-20 text-center space-y-6">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto"><IconCheck size={40} /></div>
        <h2 className="text-2xl font-heading font-bold">Pendaftaran Terkirim</h2>
        <p className="text-neutral-500">Sistem mendeteksi Anda sudah melakukan pendaftaran.</p>
        <Button onClick={() => window.location.href = "/dashboard/status"} className="bg-emerald-600 text-white w-full">Cek Status Sekarang</Button>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-neutral-900">Formulir Pendaftaran</h1>
          <p className="text-neutral-500 mt-1">Lengkapi data pendaftaran calon siswa dengan benar.</p>
        </div>
      </div>

      {/* Stepper */}
      <div className="flex items-center justify-between px-2 bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm">
        {[
          { s: 1, l: "Siswa", i: IconUser },
          { s: 2, l: "Orang Tua", i: IconUsers },
          { s: 3, l: "Dokumen", i: IconFileDescription },
          { s: 4, l: "Review", i: IconFileCheck }
        ].map((item) => (
          <div key={item.s} className="flex flex-col items-center flex-1 relative group">
            {item.s < 4 && <div className={`absolute top-5 left-1/2 w-full h-0.5 ${currentStep > item.s ? 'bg-emerald-500' : 'bg-neutral-100'}`} />}
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold z-10 transition-all duration-500 ${
              currentStep === item.s ? "bg-primary-800 text-white shadow-xl ring-4 ring-primary-50 scale-110" :
              currentStep > item.s ? "bg-emerald-500 text-white" : "bg-neutral-50 border border-neutral-200 text-neutral-400"
            }`}>
              {currentStep > item.s ? <IconCheck size={20} /> : <item.i size={20} />}
            </div>
            <span className={`text-[10px] font-bold mt-2 uppercase tracking-tighter transition-colors ${currentStep >= item.s ? 'text-primary-900' : 'text-neutral-400'}`}>
              {item.l}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-8 transition-all duration-500">
        {currentStep === 1 && (
          <Card className="border-neutral-200 shadow-md">
            <CardHeader><CardTitle className="flex items-center gap-2"><IconUser className="text-primary-800" /> Data Calon Siswa</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Nama Lengkap <span className="text-red-500">*</span></Label><Input value={formData.namaLengkap} onChange={e => updateField('namaLengkap', e.target.value)} placeholder="Masukkan nama lengkap" /></div>
                <div className="space-y-2"><Label>Jenis Kelamin <span className="text-red-500">*</span></Label>
                  <select value={formData.jenisKelamin} onChange={e => updateField('jenisKelamin', e.target.value)} className="w-full h-10 border border-neutral-200 rounded-md px-3 text-sm focus:ring-2 focus:ring-primary-100">
                    <option value="">Pilih</option><option value="L">Laki-laki</option><option value="P">Perempuan</option>
                  </select>
                </div>
                <div className="space-y-2"><Label>Tempat Lahir <span className="text-red-500">*</span></Label><Input value={formData.tempatLahir} onChange={e => updateField('tempatLahir', e.target.value)} placeholder="Kota kelahiran" /></div>
                <div className="space-y-2"><Label>Tanggal Lahir <span className="text-red-500">*</span></Label><Input type="date" value={formData.tanggalLahir} onChange={e => updateField('tanggalLahir', e.target.value)} /></div>
              </div>
              <div className="space-y-2"><Label>Alamat Lengkap <span className="text-red-500">*</span></Label><Input value={formData.alamat} onChange={e => updateField('alamat', e.target.value)} placeholder="Jalan, No. Rumah, RT/RW, Kelurahan" /></div>
              <div className="flex justify-end pt-4"><Button onClick={nextStep} disabled={!formData.namaLengkap || !formData.tanggalLahir} className="bg-primary-800 hover:bg-primary-700 px-8">Selanjutnya <IconChevronRight size={18} className="ml-2" /></Button></div>
            </CardContent>
          </Card>
        )}

        {currentStep === 2 && (
          <Card className="border-neutral-200 shadow-md">
            <CardHeader><CardTitle className="flex items-center gap-2"><IconUsers className="text-primary-800" /> Data Orang Tua</CardTitle></CardHeader>
            <CardContent className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <div className="space-y-2"><Label>Nama Lengkap Ayah <span className="text-red-500">*</span></Label><Input value={formData.namaAyah} onChange={e => updateField('namaAyah', e.target.value)} /></div>
                <div className="space-y-2"><Label>NIK Ayah <span className="text-red-500">*</span></Label><Input value={formData.nikAyah} onChange={e => updateField('nikAyah', e.target.value)} /></div>
                <div className="space-y-2"><Label>Pekerjaan Ayah</Label><Input value={formData.pekerjaanAyah} onChange={e => updateField('pekerjaanAyah', e.target.value)} /></div>
                <div className="space-y-2"><Label>HP Ayah (WhatsApp) <span className="text-red-500">*</span></Label><Input value={formData.hpAyah} onChange={e => updateField('hpAyah', e.target.value)} /></div>
                <div className="col-span-full border-t border-neutral-100 my-2" />
                <div className="space-y-2"><Label>Nama Lengkap Ibu <span className="text-red-500">*</span></Label><Input value={formData.namaIbu} onChange={e => updateField('namaIbu', e.target.value)} /></div>
                <div className="space-y-2"><Label>NIK Ibu <span className="text-red-500">*</span></Label><Input value={formData.nikIbu} onChange={e => updateField('nikIbu', e.target.value)} /></div>
                <div className="space-y-2"><Label>Pekerjaan Ibu</Label><Input value={formData.pekerjaanIbu} onChange={e => updateField('pekerjaanIbu', e.target.value)} /></div>
                <div className="space-y-2"><Label>HP Ibu (WhatsApp) <span className="text-red-500">*</span></Label><Input value={formData.hpIbu} onChange={e => updateField('hpIbu', e.target.value)} /></div>
              </div>
              <div className="flex justify-between pt-4"><Button variant="outline" onClick={prevStep} className="px-8"><IconChevronLeft size={18} className="mr-2" /> Kembali</Button><Button onClick={nextStep} disabled={!formData.namaAyah || !formData.namaIbu || !formData.hpAyah} className="bg-primary-800 hover:bg-primary-700 px-8">Selanjutnya <IconChevronRight size={18} className="ml-2" /></Button></div>
            </CardContent>
          </Card>
        )}

        {currentStep === 3 && (
          <Card className="border-neutral-200 shadow-md">
            <CardHeader><CardTitle className="flex items-center gap-2"><IconFileDescription className="text-primary-800" /> Upload Dokumen</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {["Akta Kelahiran", "Kartu Keluarga", "KTP Ortu", "Pas Foto"].map(doc => (
                <div key={doc} className="flex items-center justify-between p-4 bg-neutral-50 rounded-2xl border border-neutral-100 group hover:border-primary-200 transition-all">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-neutral-400 group-hover:text-primary-800 shadow-sm"><IconFileDescription size={20} /></div>
                    <span className="font-bold text-sm text-neutral-700">{doc}</span>
                  </div>
                  <Button size="sm" variant="outline" className="bg-white hover:bg-primary-800 hover:text-white transition-all font-bold">Unggah File</Button>
                </div>
              ))}
              <div className="flex justify-between pt-8 border-t mt-6"><Button variant="outline" onClick={prevStep} className="px-8"><IconChevronLeft size={18} className="mr-2" /> Kembali</Button><Button onClick={nextStep} className="bg-primary-800 hover:bg-primary-700 px-8">Lanjut ke Review <IconChevronRight size={18} className="ml-2" /></Button></div>
            </CardContent>
          </Card>
        )}

        {currentStep === 4 && (
          <Card className="border-neutral-200 shadow-lg animate-in fade-in zoom-in-95 duration-500 overflow-hidden">
            <div className="bg-primary-800 p-6 text-white">
              <CardTitle className="text-2xl font-heading">Tinjau Data Pendaftaran</CardTitle>
              <CardDescription className="text-primary-100">Periksa seluruh informasi sebelum dikirim ke sistem.</CardDescription>
            </div>
            <CardContent className="p-8 space-y-10">
              {/* Section: Siswa */}
              <div className="space-y-4">
                <h4 className="flex items-center gap-2 font-bold text-primary-800 bg-primary-50 px-3 py-1.5 rounded-lg text-sm w-fit"><IconUser size={18} /> Data Siswa</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 border border-neutral-100 rounded-3xl bg-neutral-50/50">
                   <div><Label className="text-[10px] uppercase font-black text-neutral-400 tracking-widest">Nama Lengkap</Label><p className="font-bold text-neutral-900 text-lg">{formData.namaLengkap}</p></div>
                   <div><Label className="text-[10px] uppercase font-black text-neutral-400 tracking-widest">Jenis Kelamin</Label><p className="font-bold text-neutral-900 text-lg">{formData.jenisKelamin === 'L' ? 'Laki-laki' : 'Perempuan'}</p></div>
                   <div><Label className="text-[10px] uppercase font-black text-neutral-400 tracking-widest">Tempat, Tanggal Lahir</Label><p className="font-bold text-neutral-900">{formData.tempatLahir}, {formData.tanggalLahir}</p></div>
                   <div><Label className="text-[10px] uppercase font-black text-neutral-400 tracking-widest">Alamat Lengkap</Label><p className="font-bold text-neutral-900 leading-relaxed">{formData.alamat}</p></div>
                </div>
              </div>

              {/* Section: Ortu */}
              <div className="space-y-4">
                <h4 className="flex items-center gap-2 font-bold text-primary-800 bg-primary-50 px-3 py-1.5 rounded-lg text-sm w-fit"><IconUsers size={18} /> Data Orang Tua</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 border border-neutral-100 rounded-3xl">
                   <div className="space-y-4">
                     <p className="text-[10px] font-black text-primary-600 bg-primary-50 w-fit px-2 py-0.5 rounded">BIODATA AYAH</p>
                     <div className="space-y-1">
                       <p className="font-bold text-neutral-900">{formData.namaAyah}</p>
                       <p className="text-sm text-neutral-500">NIK: {formData.nikAyah}</p>
                       <p className="text-sm text-neutral-500">HP: {formData.hpAyah}</p>
                       <p className="text-sm text-neutral-500 italic">Pekerjaan: {formData.pekerjaanAyah || "-"}</p>
                     </div>
                   </div>
                   <div className="space-y-4">
                     <p className="text-[10px] font-black text-emerald-600 bg-emerald-50 w-fit px-2 py-0.5 rounded">BIODATA IBU</p>
                     <div className="space-y-1">
                       <p className="font-bold text-neutral-900">{formData.namaIbu}</p>
                       <p className="text-sm text-neutral-500">NIK: {formData.nikIbu}</p>
                       <p className="text-sm text-neutral-500">HP: {formData.hpIbu}</p>
                       <p className="text-sm text-neutral-500 italic">Pekerjaan: {formData.pekerjaanIbu || "-"}</p>
                     </div>
                   </div>
                </div>
              </div>

              {/* Warning */}
              <div className="p-5 bg-amber-50 border-l-4 border-amber-400 rounded-r-2xl flex items-start space-x-3 text-amber-900">
                <IconAlertCircle size={24} className="shrink-0" />
                <p className="text-sm font-medium leading-relaxed">Saya menyatakan bahwa seluruh data yang telah diisi adalah benar. Segala kesalahan data setelah pengiriman menjadi tanggung jawab pendaftar.</p>
              </div>

              <div className="flex justify-between pt-6 border-t">
                <Button variant="outline" onClick={prevStep} className="px-10 py-6 font-bold text-neutral-600 border-neutral-200">Kembali & Edit</Button>
                <Button onClick={handleSubmit} disabled={submitLoading} className="bg-primary-800 hover:bg-primary-700 px-12 py-7 text-xl font-bold shadow-2xl shadow-primary-900/20">
                  {submitLoading ? <><IconLoader2 className="animate-spin mr-2" /> Mengirim...</> : "Kirim Pendaftaran"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
