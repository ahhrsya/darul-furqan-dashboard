"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IconCalendarEvent, IconPin, IconDownload } from "@tabler/icons-react";

export default function PengumumanPage() {
  const [activeTab, setActiveTab] = useState("Semua");

  const announcements = [
    {
      id: 1,
      title: "Jadwal Tes Penempatan dan Wawancara Gelombang 1",
      date: "15 Mei 2026",
      category: "Jadwal PPDB",
      isPinned: true,
      content: "Assalamualaikum Wr. Wb. Kami informasikan bahwa tes penempatan dan wawancara untuk pendaftar Gelombang 1 akan dilaksanakan secara bertahap mulai tanggal 20 Mei hingga 25 Mei 2026. Jadwal spesifik per siswa dapat dilihat melalui dashboard masing-masing setelah status dokumen diverifikasi.",
      attachment: "Jadwal_Tes_Gel_1.pdf"
    },
    {
      id: 2,
      title: "Syarat Berkas Fisik untuk Registrasi Ulang",
      date: "10 Mei 2026",
      category: "Persyaratan",
      isPinned: false,
      content: "Bagi calon siswa yang nantinya dinyatakan DITERIMA, wajib melakukan registrasi ulang dengan membawa berkas fisik berupa fotokopi Akta Kelahiran, fotokopi KK, dan pas foto 3x4 masing-masing sebanyak 2 lembar ke sekretariat pendaftaran PPDB di kampus Darul Furqan.",
      attachment: null
    },
    {
      id: 3,
      title: "Hasil Seleksi PPDB Gelombang 1 Diundur",
      date: "05 Mei 2026",
      category: "Pengumuman",
      isPinned: false,
      content: "Sehubungan dengan adanya pemeliharaan sistem server pusat, pengumuman hasil seleksi yang semula dijadwalkan tanggal 28 Mei akan diundur menjadi tanggal 30 Mei 2026.",
      attachment: null
    }
  ];

  const filteredAnnouncements = activeTab === "Semua" 
    ? announcements 
    : announcements.filter(a => a.category === activeTab);

  const tabs = ["Semua", "Pengumuman", "Jadwal PPDB", "Persyaratan"];

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-20">
      <div>
        <h1 className="text-3xl font-heading font-bold text-neutral-900">Informasi & Pengumuman</h1>
        <p className="text-neutral-500 mt-2">Daftar informasi terbaru seputar proses Penerimaan Peserta Didik Baru.</p>
      </div>

      <div className="flex gap-2 pb-4 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <Badge 
            key={tab}
            onClick={() => setActiveTab(tab)}
            variant={activeTab === tab ? "default" : "outline"} 
            className={`cursor-pointer px-4 py-2 text-sm transition-all ${activeTab === tab ? 'bg-primary-800 hover:bg-primary-700 shadow-md' : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50'}`}
          >
            {tab}
          </Badge>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredAnnouncements.length > 0 ? (
          filteredAnnouncements.map((item) => (
            <Card key={item.id} className={`border-neutral-200 shadow-sm transition-all hover:shadow-md ${item.isPinned ? 'border-l-4 border-l-gold-500' : ''}`}>
              <CardContent className="p-6 md:p-8">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    {item.isPinned && (
                      <Badge className="bg-gold-100 text-gold-700 hover:bg-gold-100 border-none px-3 py-1 rounded flex items-center gap-1">
                        <IconPin size={14} /> Penting
                      </Badge>
                    )}
                    <span className="text-xs font-bold text-primary-800 bg-primary-50 px-3 py-1.5 rounded-md uppercase tracking-wider">{item.category}</span>
                    <span className="text-xs font-medium text-neutral-500 flex items-center gap-1 ml-auto">
                      <IconCalendarEvent size={14} /> {item.date}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-heading font-bold text-neutral-900">{item.title}</h3>
                  <p className="text-neutral-600 leading-relaxed">{item.content}</p>
                  
                  {item.attachment && (
                    <div className="mt-4 pt-4 border-t border-neutral-100">
                      <a href="#" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-neutral-200 text-sm font-semibold text-neutral-700 hover:bg-primary-50 hover:text-primary-800 hover:border-primary-200 transition-colors">
                        <IconDownload size={18} />
                        Unduh Lampiran ({item.attachment})
                      </a>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-20 bg-neutral-50 rounded-3xl border border-neutral-100">
            <p className="text-neutral-500 font-medium">Belum ada informasi untuk kategori {activeTab}.</p>
          </div>
        )}
      </div>
    </div>
  );
}
