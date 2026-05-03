"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IconSearch, IconCheck, IconX, IconTrash, IconLoader2, IconEye } from "@tabler/icons-react";
import { getAllRegistrations, updateRegistrationStatus, deleteRegistration } from "@/lib/data";

export default function PendaftarPage() {
  const [registrations, setRegistrations] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterJenjang, setFilterJenjang] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [rejectingId, setRejectingId] = useState<string | null>(null);

  const loadData = async () => {
    const data = await getAllRegistrations();
    setRegistrations(data || []);
    setLoading(false);
  };

  useEffect(() => { loadData(); }, []);

  const handleApprove = async (id: string) => {
    if (!confirm("Yakin ingin menerima pendaftaran ini?")) return;
    await updateRegistrationStatus(id, "Diterima");
    loadData();
  };

  const handleReject = async (id: string) => {
    if (!rejectReason.trim()) { alert("Isi alasan penolakan."); return; }
    await updateRegistrationStatus(id, "Ditolak", rejectReason);
    setRejectingId(null);
    setRejectReason("");
    loadData();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus data ini? Tindakan ini tidak bisa dibatalkan.")) return;
    await deleteRegistration(id);
    loadData();
  };

  const statusBadge = (s: string) => {
    switch (s) {
      case "Diterima": return "bg-emerald-100 text-emerald-800";
      case "Ditolak": return "bg-red-100 text-red-800";
      case "Sedang Diverifikasi": return "bg-blue-100 text-blue-800";
      default: return "bg-amber-100 text-amber-800";
    }
  };

  const filtered = registrations.filter((r) => {
    const name = (r.student_name as string || "").toLowerCase();
    const regNum = (r.registration_number as string || "").toLowerCase();
    const matchSearch = !search || name.includes(search.toLowerCase()) || regNum.includes(search.toLowerCase());
    const matchJenjang = !filterJenjang || r.jenjang === filterJenjang;
    const matchStatus = !filterStatus || r.status === filterStatus;
    return matchSearch && matchJenjang && matchStatus;
  });

  if (loading) return <div className="h-[60vh] flex items-center justify-center"><IconLoader2 className="animate-spin text-primary-800" size={40} /></div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-bold text-neutral-900">Data Pendaftar</h1>
        <p className="text-neutral-500 mt-2">Kelola dan verifikasi data calon peserta didik baru. Total: <strong>{registrations.length}</strong></p>
      </div>

      <Card className="border-neutral-200 shadow-sm">
        <CardContent className="p-0">
          <div className="p-4 border-b border-neutral-200 flex flex-col sm:flex-row gap-4 bg-neutral-50 rounded-t-xl">
            <div className="relative flex-1">
              <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
              <Input placeholder="Cari nama atau nomor pendaftaran..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 bg-white" />
            </div>
            <div className="flex gap-2">
              <select value={filterJenjang} onChange={(e) => setFilterJenjang(e.target.value)} className="h-10 rounded-md border border-input bg-white px-3 py-2 text-sm">
                <option value="">Semua Jenjang</option>
                <option value="SMP">SMP</option>
                <option value="SMA">SMA</option>
                <option value="PONDOK">Pondok Pesantren</option>
              </select>
              <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="h-10 rounded-md border border-input bg-white px-3 py-2 text-sm">
                <option value="">Semua Status</option>
                <option value="Pending">Pending</option>
                <option value="Diterima">Diterima</option>
                <option value="Ditolak">Ditolak</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-neutral-50 border-b border-neutral-200">
                  <th className="py-3 px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">No. Pendaftaran</th>
                  <th className="py-3 px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Nama</th>
                  <th className="py-3 px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Jenjang</th>
                  <th className="py-3 px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Tanggal</th>
                  <th className="py-3 px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Status</th>
                  <th className="py-3 px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 bg-white">
                {filtered.length === 0 ? (
                  <tr><td colSpan={6} className="py-12 text-center text-neutral-400">Tidak ada data pendaftar.</td></tr>
                ) : (
                  filtered.map((reg) => (
                    <>
                      <tr key={reg.id as string} className="hover:bg-neutral-50 transition-colors">
                        <td className="py-4 px-4 text-sm font-mono text-neutral-700">{reg.registration_number as string}</td>
                        <td className="py-4 px-4 text-sm font-semibold text-neutral-900">{reg.student_name as string || "-"}</td>
                        <td className="py-4 px-4 text-sm text-neutral-600">{reg.jenjang as string}</td>
                        <td className="py-4 px-4 text-sm text-neutral-600">{new Date(reg.created_at as string).toLocaleDateString('id-ID')}</td>
                        <td className="py-4 px-4"><Badge className={`${statusBadge(reg.status as string)} hover:opacity-90 shadow-none`}>{reg.status as string}</Badge></td>
                        <td className="py-4 px-4 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:bg-blue-50" onClick={() => setExpandedId(expandedId === reg.id ? null : reg.id as string)} title="Detail">
                              <IconEye size={16} />
                            </Button>
                            {reg.status === "Pending" && (
                              <>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-emerald-600 hover:bg-emerald-50" onClick={() => handleApprove(reg.id as string)} title="Terima">
                                  <IconCheck size={16} />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:bg-red-50" onClick={() => setRejectingId(reg.id as string)} title="Tolak">
                                  <IconX size={16} />
                                </Button>
                              </>
                            )}
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:bg-red-50" onClick={() => handleDelete(reg.id as string)} title="Hapus">
                              <IconTrash size={16} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                      {/* Detail Row */}
                      {expandedId === reg.id && (
                        <tr key={`detail-${reg.id}`} className="bg-blue-50/50">
                          <td colSpan={6} className="px-6 py-4">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div><span className="text-neutral-400 text-xs block">Gender</span><strong>{reg.gender as string || "-"}</strong></div>
                              <div><span className="text-neutral-400 text-xs block">TTL</span><strong>{reg.pob as string}, {reg.dob as string}</strong></div>
                              <div><span className="text-neutral-400 text-xs block">Ayah</span><strong>{reg.father_name as string || "-"}</strong></div>
                              <div><span className="text-neutral-400 text-xs block">HP Ayah</span><strong>{reg.father_phone as string || "-"}</strong></div>
                              <div><span className="text-neutral-400 text-xs block">Ibu</span><strong>{reg.mother_name as string || "-"}</strong></div>
                              <div><span className="text-neutral-400 text-xs block">HP Ibu</span><strong>{reg.mother_phone as string || "-"}</strong></div>
                              <div><span className="text-neutral-400 text-xs block">Alamat</span><strong>{reg.address as string || "-"}</strong></div>
                              <div><span className="text-neutral-400 text-xs block">Kecamatan</span><strong>{reg.district as string || "-"}</strong></div>
                            </div>
                          </td>
                        </tr>
                      )}
                      {/* Reject Reason Input */}
                      {rejectingId === reg.id && (
                        <tr key={`reject-${reg.id}`} className="bg-red-50/50">
                          <td colSpan={6} className="px-6 py-4">
                            <div className="flex gap-3 items-center">
                              <Input value={rejectReason} onChange={(e) => setRejectReason(e.target.value)} placeholder="Alasan penolakan..." className="flex-1 bg-white" />
                              <Button onClick={() => handleReject(reg.id as string)} className="bg-red-600 text-white hover:bg-red-700">Tolak</Button>
                              <Button variant="ghost" onClick={() => { setRejectingId(null); setRejectReason(""); }}>Batal</Button>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-neutral-200 text-sm text-neutral-500">
            Menampilkan {filtered.length} dari {registrations.length} pendaftar
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
