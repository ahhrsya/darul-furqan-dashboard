import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IconMoodKid, IconBook, IconBuildingMosque } from "@tabler/icons-react";

export default function PilihJenjangPage() {
  const jenjangList = [
    {
      id: "paud",
      name: "PAUD Darul Furqan",
      desc: "Rentang Usia: 3 - 6 Tahun",
      icon: IconMoodKid,
      kuotaTotal: 50,
      sisaKuota: 12,
      periode: "1 Mei - 30 Juni 2026",
      disabled: false,
    },
    {
      id: "sdit",
      name: "SDIT Alam",
      desc: "Kelas 1 - 6",
      icon: IconBook,
      kuotaTotal: 120,
      sisaKuota: 45,
      periode: "1 Mei - 30 Juni 2026",
      disabled: false,
    },
    {
      id: "ponpes",
      name: "Pondok Pesantren",
      desc: "SMP & SMA",
      icon: IconBuildingMosque,
      kuotaTotal: 100,
      sisaKuota: 0,
      periode: "1 April - 31 Mei 2026",
      disabled: true,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-bold text-neutral-900">Pilih Jenjang Pendidikan</h1>
        <p className="text-neutral-500 mt-2">
          Pilih jenjang pendidikan yang sesuai untuk pendaftaran. Pastikan pilihan Anda benar karena tidak dapat diubah setelah formulir dikirim.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {jenjangList.map((item) => (
          <Card key={item.id} className={`border-neutral-200 shadow-sm relative overflow-hidden transition-all ${item.disabled ? 'opacity-70 bg-neutral-50' : 'hover:border-primary-800 hover:shadow-md'}`}>
            <CardHeader className="text-center pb-2">
              <div className={`mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${item.disabled ? 'bg-neutral-200 text-neutral-500' : 'bg-primary-100 text-primary-800'}`}>
                <item.icon size={32} />
              </div>
              <CardTitle className="text-xl font-heading">{item.name}</CardTitle>
              <CardDescription>{item.desc}</CardDescription>
            </CardHeader>
            <CardContent className="text-center pb-4">
              <div className="flex flex-col space-y-2 mt-4 bg-white border border-neutral-100 rounded-lg p-3">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">Periode</span>
                  <span className="font-semibold text-neutral-900">{item.periode}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">Kuota Total</span>
                  <span className="font-semibold text-neutral-900">{item.kuotaTotal} Siswa</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">Sisa Kuota</span>
                  <span className={`font-bold ${item.sisaKuota > 0 ? 'text-primary-700' : 'text-red-500'}`}>
                    {item.sisaKuota} Siswa
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              {item.disabled ? (
                <Button disabled className="w-full bg-neutral-200 text-neutral-500 cursor-not-allowed">
                  Kuota Penuh
                </Button>
              ) : (
                <Link href={`/dashboard/ppdb/formulir?jenjang=${item.id}`}>
                  <Button className="w-full bg-primary-800 hover:bg-primary-700 text-white">
                    Pilih {item.name}
                  </Button>
                </Link>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
