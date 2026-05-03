import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IconCalendarEvent, IconPin, IconDownload } from "@tabler/icons-react";

export default function PengumumanPage() {
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
      category: "Persyaratan PPDB",
      isPinned: false,
      content: "Bagi calon siswa yang nantinya dinyatakan DITERIMA, wajib melakukan registrasi ulang dengan membawa berkas fisik berupa fotokopi Akta Kelahiran, fotokopi KK, dan pas foto 3x4 masing-masing sebanyak 2 lembar ke sekretariat pendaftaran PPDB di kampus Darul Furqan.",
      attachment: null
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-bold text-neutral-900">Informasi & Pengumuman</h1>
        <p className="text-neutral-500 mt-2">Daftar informasi terbaru seputar proses Penerimaan Peserta Didik Baru.</p>
      </div>

      <div className="flex gap-2 pb-4 overflow-x-auto no-scrollbar">
        <Badge variant="default" className="bg-primary-800 hover:bg-primary-700 cursor-pointer">Semua</Badge>
        <Badge variant="outline" className="text-neutral-500 hover:text-neutral-900 cursor-pointer">Pengumuman</Badge>
        <Badge variant="outline" className="text-neutral-500 hover:text-neutral-900 cursor-pointer">Jadwal PPDB</Badge>
        <Badge variant="outline" className="text-neutral-500 hover:text-neutral-900 cursor-pointer">Persyaratan</Badge>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {announcements.map((item) => (
          <Card key={item.id} className={`border-neutral-200 shadow-sm ${item.isPinned ? 'border-l-4 border-l-gold-500' : ''}`}>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4 justify-between md:items-start">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {item.isPinned && (
                      <Badge className="bg-gold-100 text-gold-700 hover:bg-gold-100 border-none px-2 rounded flex items-center gap-1">
                        <IconPin size={12} /> Penting
                      </Badge>
                    )}
                    <span className="text-xs font-semibold text-primary-800 bg-primary-50 px-2 py-1 rounded">{item.category}</span>
                    <span className="text-xs text-neutral-400 flex items-center gap-1">
                      <IconCalendarEvent size={14} /> {item.date}
                    </span>
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-neutral-900">{item.title}</h3>
                  <p className="text-neutral-600 text-sm leading-relaxed">{item.content}</p>
                  
                  {item.attachment && (
                    <div className="mt-4 pt-4 border-t border-neutral-100">
                      <a href="#" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-200 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors">
                        <IconDownload size={16} className="text-neutral-500" />
                        Unduh Lampiran: {item.attachment}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
