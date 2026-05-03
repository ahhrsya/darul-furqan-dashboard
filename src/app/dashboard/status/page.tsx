import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IconCheck, IconClock, IconAlertCircle } from "@tabler/icons-react";

export default function StatusPage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-neutral-900">Status Pendaftaran</h1>
          <p className="text-neutral-500 mt-2">Pantau progres pendaftaran putra-putri Anda secara real-time.</p>
        </div>
        <Link href="/dashboard">
          <Button variant="outline" className="border-neutral-200 text-neutral-600 hover:text-primary-800 hover:bg-primary-50">
            <IconChevronLeft size={18} className="mr-1" /> Kembali ke Beranda
          </Button>
        </Link>
      </div>

      <Card className="border-neutral-200 shadow-sm overflow-hidden">
        <div className="bg-blue-50 border-b border-blue-100 p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-blue-800 uppercase tracking-wider">Nomor Pendaftaran</p>
            <p className="text-2xl font-mono font-bold text-neutral-900 mt-1">DF-PPDB-2026-0412</p>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-sm text-neutral-500 mb-2">Status Saat Ini</span>
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 px-3 py-1 text-sm rounded-full">
              Sedang Diverifikasi
            </Badge>
          </div>
        </div>
        
        <CardContent className="p-8">
          {/* Timeline */}
          <div className="relative pl-8 space-y-8 before:absolute before:inset-0 before:ml-10 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-neutral-200 before:to-transparent">
            
            {/* Step 1: Done */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-white bg-primary-800 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 absolute left-[-27px] md:relative md:left-auto">
                <IconCheck size={12} className="text-white" />
              </div>
              <div className="w-[calc(100%-2rem)] md:w-[calc(50%-2rem)] bg-white p-4 rounded-xl border border-neutral-100 shadow-sm">
                <div className="flex items-center justify-between space-x-2 mb-1">
                  <h4 className="font-semibold text-neutral-900">Pendaftaran Diterima</h4>
                  <span className="text-xs text-neutral-400">12 Mei 2026</span>
                </div>
                <p className="text-sm text-neutral-600">Formulir pendaftaran dan dokumen berhasil dikirim.</p>
              </div>
            </div>

            {/* Step 2: Active */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-white bg-blue-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 absolute left-[-27px] md:relative md:left-auto">
                <IconClock size={12} className="text-white" />
              </div>
              <div className="w-[calc(100%-2rem)] md:w-[calc(50%-2rem)] bg-white p-4 rounded-xl border border-blue-100 shadow-sm ring-1 ring-blue-500/20">
                <div className="flex items-center justify-between space-x-2 mb-1">
                  <h4 className="font-semibold text-blue-900">Sedang Diverifikasi</h4>
                </div>
                <p className="text-sm text-neutral-600">Tim kami sedang memeriksa kelengkapan dokumen pendaftaran Anda.</p>
                {/* Admin Note Box */}
                <div className="mt-3 bg-blue-50 border-l-4 border-blue-500 rounded-r-md p-3 text-sm text-blue-800">
                  <strong>Catatan Panitia:</strong> Dokumen sedang dalam antrean pengecekan. Mohon tunggu maksimal 2x24 jam.
                </div>
              </div>
            </div>

            {/* Step 3: Pending */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-white bg-neutral-200 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 absolute left-[-27px] md:relative md:left-auto">
              </div>
              <div className="w-[calc(100%-2rem)] md:w-[calc(50%-2rem)] p-4 rounded-xl opacity-60">
                <h4 className="font-semibold text-neutral-500">Menunggu Tes / Wawancara</h4>
                <p className="text-sm text-neutral-400 mt-1">Jadwal akan muncul setelah dokumen diverifikasi.</p>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>
    </div>
  );
}
