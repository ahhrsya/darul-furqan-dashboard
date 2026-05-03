"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { IconChevronRight, IconChevronLeft, IconCheck, IconLoader2, IconAlertCircle, IconUser, IconUsers, IconFileText, IconMapPin } from "@tabler/icons-react";
import { supabase } from "@/lib/supabase";
import { createRegistration, getRegistrations } from "@/lib/data";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function FormulirPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const jenjang = searchParams.get("jenjang") || "SMA";
  
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  
  const [formData, setFormData] = useState({
    full_name: "",
    gender: "Laki-laki",
    pob: "",
    dob: "",
    nik_father: "",
    father_name: "",
    father_phone: "",
    father_job: "",
    nik_mother: "",
    mother_name: "",
    mother_phone: "",
    mother_job: "",
    address: "",
    province: "Jawa Barat",
    city: "Bandung",
    district: "",
    postal_code: "",
  });

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

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User tidak ditemukan");

      const registrationData = {
        user_id: user.id,
        jenjang: jenjang,
        status: "Pending",
        registration_number: `PPDB-${Date.now()}`,
        ...formData
      };

      await createRegistration(registrationData);
      window.location.href = "/dashboard/status?success=true";
    } catch (error: any) {
      alert(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="h-[60vh] flex items-center justify-center"><IconLoader2 className="animate-spin text-primary-800" size={40} /></div>;

  if (alreadyRegistered) {
    return (
      <div className="max-w-2xl mx-auto mt-10 text-center space-y-6 p-10 bg-white rounded-3xl shadow-xl border border-neutral-100">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner"><IconCheck size={40} /></div>
        <h2 className="text-3xl font-heading font-bold text-neutral-900">Pendaftaran Sudah Diterima</h2>
        <p className="text-neutral-500 text-lg">Anda sudah mengirimkan formulir pendaftaran sebelumnya. Silakan pantau status pendaftaran Anda di halaman dashboard.</p>
        <Button onClick={() => window.location.href = "/dashboard/status"} className="bg-emerald-600 text-white font-bold px-10 py-6 h-auto rounded-2xl shadow-lg shadow-emerald-200">Lihat Status Pendaftaran</Button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-heading font-bold text-neutral-900">Formulir Pendaftaran</h1>
          <p className="text-neutral-500">Lengkapi data calon santri untuk jenjang <span className="font-bold text-primary-800">{jenjang}</span></p>
        </div>
        <div className="flex items-center bg-primary-50 px-4 py-2 rounded-full text-primary-800 font-bold text-sm shadow-sm">
          Step {step} dari 4
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {[
          { label: "Data Siswa", icon: IconUser },
          { label: "Data Ortu", icon: IconUsers },
          { label: "Alamat", icon: IconMapPin },
          { label: "Review", icon: IconFileText }
        ].map((s, i) => (
          <div key={i} className={`flex items-center space-x-3 p-3 md:p-4 rounded-2xl border transition-all ${step === i + 1 ? "bg-primary-800 text-white border-primary-800 shadow-lg shadow-primary-900/20" : step > i + 1 ? "bg-emerald-50 border-emerald-100 text-emerald-700" : "bg-white border-neutral-100 text-neutral-400"}`}>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${step === i + 1 ? "bg-white/20" : "bg-neutral-50"}`}><s.icon size={18} /></div>
            <span className="font-bold text-xs md:text-sm">{s.label}</span>
          </div>
        ))}
      </div>

      <Card className="border-none shadow-2xl shadow-neutral-200/50 rounded-3xl overflow-hidden">
        <CardContent className="p-6 md:p-12">
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2"><Label>Nama Lengkap Santri</Label><Input name="full_name" value={formData.full_name} onChange={handleChange} placeholder="Sesuai Akta Kelahiran" className="py-6 rounded-xl" /></div>
                <div className="space-y-2"><Label>Jenis Kelamin</Label>
                  <select name="gender" value={formData.gender} onChange={handleChange} className="w-full h-12 px-4 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary-800 outline-none">
                    <option>Laki-laki</option><option>Perempuan</option>
                  </select>
                </div>
                <div className="space-y-2"><Label>Tempat Lahir</Label><Input name="pob" value={formData.pob} onChange={handleChange} placeholder="Kota/Kabupaten" className="py-6 rounded-xl" /></div>
                <div className="space-y-2"><Label>Tanggal Lahir</Label><Input type="date" name="dob" value={formData.dob} onChange={handleChange} className="py-6 rounded-xl" /></div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="space-y-6">
                <h3 className="font-bold text-lg text-primary-800 flex items-center"><span className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mr-3 text-sm">A</span> Data Ayah</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2"><Label>NIK Ayah</Label><Input name="nik_father" value={formData.nik_father} onChange={handleChange} placeholder="16 Digit NIK" className="py-6 rounded-xl" /></div>
                  <div className="space-y-2"><Label>Nama Ayah</Label><Input name="father_name" value={formData.father_name} onChange={handleChange} placeholder="Nama Lengkap" className="py-6 rounded-xl" /></div>
                  <div className="space-y-2"><Label>Pekerjaan Ayah</Label><Input name="father_job" value={formData.father_job} onChange={handleChange} className="py-6 rounded-xl" /></div>
                  <div className="space-y-2"><Label>No. HP Ayah</Label><Input name="father_phone" value={formData.father_phone} onChange={handleChange} placeholder="Contoh: 0812..." className="py-6 rounded-xl" /></div>
                </div>
              </div>
              <div className="space-y-6">
                <h3 className="font-bold text-lg text-rose-800 flex items-center"><span className="w-8 h-8 bg-rose-100 rounded-lg flex items-center justify-center mr-3 text-sm">B</span> Data Ibu</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2"><Label>NIK Ibu</Label><Input name="nik_mother" value={formData.nik_mother} onChange={handleChange} placeholder="16 Digit NIK" className="py-6 rounded-xl" /></div>
                  <div className="space-y-2"><Label>Nama Ibu</Label><Input name="mother_name" value={formData.mother_name} onChange={handleChange} placeholder="Nama Lengkap" className="py-6 rounded-xl" /></div>
                  <div className="space-y-2"><Label>Pekerjaan Ibu</Label><Input name="mother_job" value={formData.mother_job} onChange={handleChange} className="py-6 rounded-xl" /></div>
                  <div className="space-y-2"><Label>No. HP Ibu</Label><Input name="mother_phone" value={formData.mother_phone} onChange={handleChange} className="py-6 rounded-xl" /></div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="space-y-2">
                <Label>Alamat Lengkap</Label>
                <textarea name="address" value={formData.address} onChange={handleChange} rows={4} className="w-full p-4 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary-800 outline-none" placeholder="Jalan, No Rumah, RT/RW"></textarea>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2"><Label>Kecamatan</Label><Input name="district" value={formData.district} onChange={handleChange} className="py-6 rounded-xl" /></div>
                <div className="space-y-2"><Label>Kode Pos</Label><Input name="postal_code" value={formData.postal_code} onChange={handleChange} className="py-6 rounded-xl" /></div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl text-amber-800 text-sm flex items-start space-x-3">
                <IconAlertCircle size={20} className="shrink-0 mt-0.5" />
                <p>Silakan periksa kembali seluruh data yang telah Anda isi. Pastikan tidak ada kesalahan pengetikan sebelum menekan tombol kirim.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="font-bold text-primary-800 border-b pb-2 flex items-center"><IconUser size={18} className="mr-2" /> Data Calon Santri</h4>
                  <div className="grid grid-cols-2 gap-y-3 text-sm">
                    <span className="text-neutral-500">Nama Lengkap</span><span className="font-bold">: {formData.full_name || "-"}</span>
                    <span className="text-neutral-500">Jenis Kelamin</span><span className="font-bold">: {formData.gender}</span>
                    <span className="text-neutral-500">Tempat, Tgl Lahir</span><span className="font-bold">: {formData.pob}, {formData.dob}</span>
                    <span className="text-neutral-500">Jenjang</span><span className="font-bold">: {jenjang}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-bold text-primary-800 border-b pb-2 flex items-center"><IconMapPin size={18} className="mr-2" /> Alamat Lengkap</h4>
                  <div className="grid grid-cols-2 gap-y-3 text-sm">
                    <span className="text-neutral-500">Alamat</span><span className="font-bold">: {formData.address || "-"}</span>
                    <span className="text-neutral-500">Kecamatan</span><span className="font-bold">: {formData.district || "-"}</span>
                    <span className="text-neutral-500">Kode Pos</span><span className="font-bold">: {formData.postal_code || "-"}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-bold text-primary-800 border-b pb-2 flex items-center"><IconUsers size={18} className="mr-2" /> Data Ayah</h4>
                  <div className="grid grid-cols-2 gap-y-3 text-sm">
                    <span className="text-neutral-500">Nama Ayah</span><span className="font-bold">: {formData.father_name || "-"}</span>
                    <span className="text-neutral-500">NIK Ayah</span><span className="font-bold">: {formData.nik_father || "-"}</span>
                    <span className="text-neutral-500">Pekerjaan</span><span className="font-bold">: {formData.father_job || "-"}</span>
                    <span className="text-neutral-500">No. HP</span><span className="font-bold">: {formData.father_phone || "-"}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-bold text-rose-800 border-b pb-2 flex items-center"><IconUsers size={18} className="mr-2" /> Data Ibu</h4>
                  <div className="grid grid-cols-2 gap-y-3 text-sm">
                    <span className="text-neutral-500">Nama Ibu</span><span className="font-bold">: {formData.mother_name || "-"}</span>
                    <span className="text-neutral-500">NIK Ibu</span><span className="font-bold">: {formData.nik_mother || "-"}</span>
                    <span className="text-neutral-500">Pekerjaan</span><span className="font-bold">: {formData.mother_job || "-"}</span>
                    <span className="text-neutral-500">No. HP</span><span className="font-bold">: {formData.mother_phone || "-"}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-12 flex flex-col-reverse md:flex-row md:items-center justify-between pt-8 border-t border-neutral-100 gap-4">
            <Button variant="outline" onClick={() => step > 1 ? setStep(step - 1) : window.location.href = "/dashboard/ppdb/pilih-jenjang"} className="rounded-xl px-6 py-6 h-auto w-full md:w-auto">
              <IconChevronLeft size={20} className="mr-2" /> Kembali
            </Button>
            
            {step < 4 ? (
              <Button onClick={() => setStep(step + 1)} className="bg-primary-800 text-white rounded-xl px-8 py-6 h-auto shadow-lg shadow-primary-900/20 font-bold w-full md:w-auto">
                Lanjut <IconChevronRight size={20} className="ml-2" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={submitting} className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-12 py-6 h-auto shadow-lg shadow-emerald-900/20 font-bold w-full md:w-auto">
                {submitting ? <IconLoader2 className="animate-spin mr-2" /> : <IconCheck className="mr-2" />} 
                {submitting ? "Memproses..." : "Kirim Pendaftaran"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
