"use client";

import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IconSearch, IconCheck, IconX, IconTrash, IconLoader2, IconEye, IconAlertCircle, IconAlertTriangle } from "@tabler/icons-react";
import { getAllRegistrations, updateRegistrationStatus, deleteRegistration } from "@/lib/data";

// Custom Confirmation Modal
function ConfirmModal({ open, title, message, onConfirm, onCancel, variant = "danger" }: {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: "danger" | "success";
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onCancel}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6 space-y-5 animate-in fade-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start space-x-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${variant === "danger" ? "bg-red-100 text-red-600" : "bg-emerald-100 text-emerald-600"}`}>
            <IconAlertTriangle size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-neutral-900">{title}</h3>
            <p className="text-sm text-neutral-500 mt-1">{message}</p>
          </div>
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <Button variant="ghost" onClick={onCancel} className="px-6">Batal</Button>
          <Button
            onClick={onConfirm}
            className={`px-6 text-white ${variant === "danger" ? "bg-red-600 hover:bg-red-700" : "bg-emerald-600 hover:bg-emerald-700"}`}
          >
            Ya, Lanjutkan
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function PendaftarPage() {
  const [registrations, setRegistrations] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterJenjang, setFilterJenjang] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [actionError, setActionError] = useState("");

  // Confirmation modal state
  const [confirmModal, setConfirmModal] = useState<{
    open: boolean;
    title: string;
    message: string;
    variant: "danger" | "success";
    action: (() => Promise<void>) | null;
  }>({ open: false, title: "", message: "", variant: "danger", action: null });

  const loadData = useCallback(async () => {
    const data = await getAllRegistrations();
    setRegistrations(data || []);
    setLoading(false);
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const showConfirm = (title: string, message: string, action: () => Promise<void>, variant: "danger" | "success" = "danger") => {
    setConfirmModal({ open: true, title, message, variant, action });
  };

  const executeConfirm = async () => {
    if (confirmModal.action) {
      await confirmModal.action();
    }
    setConfirmModal({ open: false, title: "", message: "", variant: "danger", action: null });
  };

  const cancelConfirm = () => {
    setConfirmModal({ open: false, title: "", message: "", variant: "danger", action: null });
  };

  const handleApprove = (id: string) => {
    showConfirm(
      "Terima Pendaftaran",
      "Yakin ingin menerima pendaftaran ini? Status akan diubah menjadi 'Diterima'.",
      async () => {
        setActionLoading(id);
        setActionError("");
        try {
          await updateRegistrationStatus(id, "Diterima");
          await loadData();
        } catch (err: unknown) {
          setActionError(err instanceof Error ? err.message : "Gagal mengubah status.");
        } finally {
          setActionLoading(null);
        }
      },
      "success"
    );
  };

  const handleReject = async (id: string) => {
    if (!rejectReason.trim()) { alert("Isi alasan penolakan terlebih dahulu."); return; }
    setActionLoading(id);
    setActionError("");
    try {
      await updateRegistrationStatus(id, "Ditolak", rejectReason);
      setRejectingId(null);
      setRejectReason("");
      await loadData();
    } catch (err: unknown) {
      setActionError(err instanceof Error ? err.message : "Gagal menolak pendaftaran.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = (id: string) => {
    showConfirm(
      "Hapus Data Pendaftar",
      "Yakin ingin menghapus data ini? Tindakan ini tidak bisa dibatalkan dan data akan hilang permanen.",
      async () => {
        setActionLoading(id);
        setActionError("");
        try {
          await deleteRegistration(id);
          await loadData();
        } catch (err: unknown) {
          setActionError(err instanceof Error ? err.message : "Gagal menghapus data.");
        } finally {
          setActionLoading(null);
        }
      }
    );
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
      {/* Custom Confirm Modal */}
      <ConfirmModal
        open={confirmModal.open}
        title={confirmModal.title}
        message={confirmModal.message}
        variant={confirmModal.variant}
        onConfirm={executeConfirm}
        onCancel={cancelConfirm}
      />

      <div>
        <h1 className="text-3xl font-heading font-bold text-neutral-900">Data Pendaftar</h1>
        <p className="text-neutral-500 mt-2">Kelola dan verifikasi data calon peserta didik baru. Total: <strong>{registrations.length}</strong></p>
      </div>

      {actionError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-3 text-red-800">
          <IconAlertCircle size={20} className="shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-sm">Terjadi Kesalahan</p>
            <p className="text-sm mt-1">{actionError}</p>
          </div>
          <button onClick={() => setActionError("")} className="ml-auto"><IconX size={16} /></button>
        </div>
      )}

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
                  filtered.map((reg) => {
                    const id = reg.id as string;
                    const isLoading = actionLoading === id;
                    return (
                      <tr key={id} className={`hover:bg-neutral-50 transition-colors ${isLoading ? "opacity-50 pointer-events-none" : ""}`}>
                        <td className="py-4 px-4 text-sm font-mono text-neutral-700">{reg.registration_number as string}</td>
                        <td className="py-4 px-4">
                          <div>
                            <p className="text-sm font-semibold text-neutral-900">{reg.student_name as string || "-"}</p>
                            {expandedId === id && (
                              <div className="mt-3 p-3 bg-blue-50 rounded-lg grid grid-cols-2 gap-2 text-xs">
                                <div><span className="text-neutral-400">Gender:</span> <strong>{reg.gender as string || "-"}</strong></div>
                                <div><span className="text-neutral-400">TTL:</span> <strong>{reg.pob as string || "-"}, {reg.dob as string || "-"}</strong></div>
                                <div><span className="text-neutral-400">Ayah:</span> <strong>{reg.father_name as string || "-"}</strong></div>
                                <div><span className="text-neutral-400">HP Ayah:</span> <strong>{reg.father_phone as string || "-"}</strong></div>
                                <div><span className="text-neutral-400">Ibu:</span> <strong>{reg.mother_name as string || "-"}</strong></div>
                                <div><span className="text-neutral-400">HP Ibu:</span> <strong>{reg.mother_phone as string || "-"}</strong></div>
                                <div className="col-span-2"><span className="text-neutral-400">Alamat:</span> <strong>{reg.address as string || "-"}, {reg.district as string || "-"}</strong></div>
                              </div>
                            )}
                            {rejectingId === id && (
                              <div className="mt-3 p-3 bg-red-50 rounded-lg flex gap-2 items-center">
                                <Input value={rejectReason} onChange={(e) => setRejectReason(e.target.value)} placeholder="Tulis alasan penolakan..." className="flex-1 bg-white text-sm h-9" />
                                <Button onClick={() => handleReject(id)} size="sm" className="bg-red-600 text-white hover:bg-red-700 h-9 px-4">Tolak</Button>
                                <Button variant="ghost" size="sm" onClick={() => { setRejectingId(null); setRejectReason(""); }} className="h-9">Batal</Button>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-4 text-sm text-neutral-600">{reg.jenjang as string}</td>
                        <td className="py-4 px-4 text-sm text-neutral-600">{new Date(reg.created_at as string).toLocaleDateString('id-ID')}</td>
                        <td className="py-4 px-4"><Badge className={`${statusBadge(reg.status as string)} hover:opacity-90 shadow-none`}>{reg.status as string}</Badge></td>
                        <td className="py-4 px-4 text-center">
                          <div className="flex items-center justify-center gap-1">
                            {isLoading ? (
                              <IconLoader2 className="animate-spin text-neutral-400" size={16} />
                            ) : (
                              <>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:bg-blue-50" onClick={() => setExpandedId(expandedId === id ? null : id)} title="Detail">
                                  <IconEye size={16} />
                                </Button>
                                {(reg.status === "Pending" || reg.status === "Sedang Diverifikasi") && (
                                  <>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-emerald-600 hover:bg-emerald-50" onClick={() => handleApprove(id)} title="Terima">
                                      <IconCheck size={16} />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-orange-600 hover:bg-orange-50" onClick={() => setRejectingId(rejectingId === id ? null : id)} title="Tolak">
                                      <IconX size={16} />
                                    </Button>
                                  </>
                                )}
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:bg-red-50" onClick={() => handleDelete(id)} title="Hapus">
                                  <IconTrash size={16} />
                                </Button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
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
