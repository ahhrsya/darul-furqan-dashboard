"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IconPlus, IconTrash, IconLoader2, IconX } from "@tabler/icons-react";
import { getAnnouncements, createAnnouncement, deleteAnnouncement } from "@/lib/data";

export default function KontenPage() {
  const [announcements, setAnnouncements] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: "", content: "", category: "Pengumuman", date: new Date().toISOString().split("T")[0] });
  const [submitting, setSubmitting] = useState(false);

  const loadData = async () => {
    const data = await getAnnouncements();
    setAnnouncements(data || []);
    setLoading(false);
  };

  useEffect(() => { loadData(); }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createAnnouncement(formData);
      setFormData({ title: "", content: "", category: "Pengumuman", date: new Date().toISOString().split("T")[0] });
      setShowForm(false);
      loadData();
    } catch {
      alert("Gagal menambahkan pengumuman.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus pengumuman ini?")) return;
    await deleteAnnouncement(id);
    loadData();
  };

  const categoryColor = (cat: string) => {
    switch (cat) {
      case "Jadwal PPDB": return "bg-blue-50 text-blue-700";
      case "Persyaratan": return "bg-purple-50 text-purple-700";
      default: return "bg-primary-50 text-primary-800";
    }
  };

  if (loading) return <div className="h-[60vh] flex items-center justify-center"><IconLoader2 className="animate-spin text-primary-800" size={40} /></div>;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-neutral-900">Berita & Pengumuman</h1>
          <p className="text-neutral-500 mt-2">Kelola konten informasi, jadwal, dan persyaratan PPDB. Total: <strong>{announcements.length}</strong></p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="bg-primary-800 hover:bg-primary-700 text-white shrink-0">
          {showForm ? <><IconX size={18} className="mr-2" /> Tutup</> : <><IconPlus size={18} className="mr-2" /> Tambah Pengumuman</>}
        </Button>
      </div>

      {/* Add Form */}
      {showForm && (
        <Card className="border-primary-200 shadow-md animate-in fade-in slide-in-from-top-2 duration-300">
          <CardContent className="p-6">
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Judul</Label>
                  <Input value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} placeholder="Judul pengumuman" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Kategori</Label>
                    <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full h-10 rounded-md border border-input bg-white px-3 text-sm">
                      <option value="Pengumuman">Pengumuman</option>
                      <option value="Jadwal PPDB">Jadwal PPDB</option>
                      <option value="Persyaratan">Persyaratan</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Tanggal</Label>
                    <Input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} required />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Konten</Label>
                <textarea value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} rows={4} className="w-full p-3 rounded-md border border-input bg-white text-sm" placeholder="Isi pengumuman..." required />
              </div>
              <Button type="submit" disabled={submitting} className="bg-primary-800 text-white hover:bg-primary-700">
                {submitting ? <IconLoader2 className="animate-spin mr-2" size={16} /> : <IconPlus size={16} className="mr-2" />}
                {submitting ? "Menyimpan..." : "Simpan Pengumuman"}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      <Card className="border-neutral-200 shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-neutral-50 border-b border-neutral-200">
                  <th className="py-3 px-6 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Judul</th>
                  <th className="py-3 px-6 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Kategori</th>
                  <th className="py-3 px-6 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Tanggal</th>
                  <th className="py-3 px-6 text-xs font-semibold text-neutral-500 uppercase tracking-wider text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 bg-white">
                {announcements.length === 0 ? (
                  <tr><td colSpan={4} className="py-12 text-center text-neutral-400">Belum ada pengumuman.</td></tr>
                ) : (
                  announcements.map((ann) => (
                    <tr key={ann.id as string} className="hover:bg-neutral-50 transition-colors">
                      <td className="py-4 px-6 text-sm font-semibold text-neutral-900 max-w-xs truncate">{ann.title as string}</td>
                      <td className="py-4 px-6"><span className={`text-xs px-2 py-1 rounded ${categoryColor(ann.category as string)}`}>{ann.category as string}</span></td>
                      <td className="py-4 px-6 text-sm text-neutral-600">{new Date(ann.date as string).toLocaleDateString('id-ID')}</td>
                      <td className="py-4 px-6 text-right">
                        <Button variant="ghost" size="icon" className="text-red-600 hover:bg-red-50 h-8 w-8" onClick={() => handleDelete(ann.id as string)}>
                          <IconTrash size={16} />
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
