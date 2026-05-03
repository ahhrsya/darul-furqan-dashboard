import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { IconMoodKid, IconBook, IconBuildingMosque } from "@tabler/icons-react";
import { getJenjangSettings } from "@/lib/data";

// Fallback data if Supabase is not connected
const MOCK_JENJANG = [
  { id: "paud", name: "PAUD Darul Furqan", desc: "Rentang Usia: 3 - 6 Tahun", icon: IconMoodKid, kuota_total: 50, kuota_remaining: 12, periode_start: "2026-05-01", periode_end: "2026-06-30", is_open: true },
  { id: "sdit", name: "SDIT Alam", desc: "Kelas 1 - 6", icon: IconBook, kuota_total: 120, kuota_remaining: 45, periode_start: "2026-05-01", periode_end: "2026-06-30", is_open: true },
  { id: "ponpes", name: "Pondok Pesantren", desc: "SMP & SMA", icon: IconBuildingMosque, kuota_total: 100, kuota_remaining: 0, periode_start: "2026-04-01", periode_end: "2026-05-31", is_open: false },
];

const ICON_MAP: { [key: string]: any } = {
  paud: IconMoodKid,
  sdit: IconBook,
  ponpes: IconBuildingMosque,
};

export default async function PilihJenjangPage() {
  const settings = await getJenjangSettings();
  const displayData = settings && settings.length > 0 ? settings : MOCK_JENJANG;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-bold text-neutral-900">Pilih Jenjang Pendidikan</h1>
        <p className="text-neutral-500 mt-2">
          Pilih jenjang pendidikan yang sesuai untuk pendaftaran. Pastikan pilihan Anda benar karena tidak dapat diubah setelah formulir dikirim.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {displayData.map((item: any) => {
          const IconComp = ICON_MAP[item.jenjang_id || item.id] || IconBook;
          const isDisabled = !item.is_open || item.kuota_remaining <= 0;
          
          return (
            <Card key={item.id} className={`border-neutral-200 shadow-sm relative overflow-hidden transition-all ${isDisabled ? 'opacity-70 bg-neutral-50' : 'hover:border-primary-800 hover:shadow-md'}`}>
              <CardHeader className="text-center pb-2">
                <div className={`mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${isDisabled ? 'bg-neutral-200 text-neutral-500' : 'bg-primary-100 text-primary-800'}`}>
                  <IconComp size={32} />
                </div>
                <CardTitle className="text-xl font-heading">{item.name}</CardTitle>
                <CardDescription>{item.desc || (item.jenjang_id === 'ponpes' ? 'SMP & SMA' : 'Pendidikan Dasar')}</CardDescription>
              </CardHeader>
              <CardContent className="text-center pb-4">
                <div className="flex flex-col space-y-2 mt-4 bg-white border border-neutral-100 rounded-lg p-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-500">Periode</span>
                    <span className="font-semibold text-neutral-900 text-[10px]">
                      {item.periode_start && item.periode_end ? `${new Date(item.periode_start).toLocaleDateString('id-ID')} - ${new Date(item.periode_end).toLocaleDateString('id-ID')}` : 'Belum Dibuka'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-500">Kuota Total</span>
                    <span className="font-semibold text-neutral-900">{item.kuota_total} Siswa</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-500">Sisa Kuota</span>
                    <span className={`font-bold ${item.kuota_remaining > 0 ? 'text-primary-700' : 'text-red-500'}`}>
                      {item.kuota_remaining} Siswa
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                {isDisabled ? (
                  <Button disabled className="w-full bg-neutral-200 text-neutral-500 cursor-not-allowed">
                    {item.kuota_remaining <= 0 ? 'Kuota Penuh' : 'Pendaftaran Tutup'}
                  </Button>
                ) : (
                  <Link href={`/dashboard/ppdb/formulir?jenjang=${item.jenjang_id || item.id}`} className="w-full">
                    <Button className="w-full bg-primary-800 hover:bg-primary-700 text-white">
                      Pilih {item.name}
                    </Button>
                  </Link>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
