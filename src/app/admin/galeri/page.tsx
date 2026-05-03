"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { IconPlus, IconTrash, IconLoader2, IconX, IconPhoto } from "@tabler/icons-react";
import { getGallery, createGalleryItem, deleteGalleryItem } from "@/lib/data";

export default function GaleriPage() {
  const [gallery, setGallery] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: "", description: "", image_url: "", category: "Umum" });
  const [submitting, setSubmitting] = useState(false);

  const loadData = async () => {
    const data = await getGallery();
    setGallery(data || []);
    setLoading(false);
  };

  useEffect(() => { loadData(); }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image_url.trim()) { alert("URL gambar wajib diisi."); return; }
    setSubmitting(true);
    try {
      await createGalleryItem(formData);
      setFormData({ title: "", description: "", image_url: "", category: "Umum" });
      setShowForm(false);
      loadData();
    } catch {
      alert("Gagal menambahkan foto.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus foto ini?")) return;
    await deleteGalleryItem(id);
    loadData();
  };

  const categoryColor = (cat: string) => {
    switch (cat) {
      case "Kegiatan": return "bg-blue-50 text-blue-700";
      case "Fasilitas": return "bg-emerald-50 text-emerald-700";
      case "Prestasi": return "bg-amber-50 text-amber-700";
      default: return "bg-neutral-100 text-neutral-600";
    }
  };

  if (loading) return <div className="h-[60vh] flex items-center justify-center"><IconLoader2 className="animate-spin text-primary-800" size={40} /></div>;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-neutral-900">Manajemen Galeri</h1>
          <p className="text-neutral-500 mt-2">Kelola foto dan dokumentasi kegiatan sekolah. Total: <strong>{gallery.length}</strong></p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="bg-primary-800 hover:bg-primary-700 text-white shrink-0">
          {showForm ? <><IconX size={18} className="mr-2" /> Tutup</> : <><IconPlus size={18} className="mr-2" /> Tambah Foto</>}
        </Button>
      </div>

      {/* Add Form */}
      {showForm && (
        <Card className="border-primary-200 shadow-md animate-in fade-in slide-in-from-top-2 duration-300">
          <CardContent className="p-6">
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Judul Foto</Label>
                  <Input value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} placeholder="Judul foto/album" required />
                </div>
                <div className="space-y-2">
                  <Label>Kategori</Label>
                  <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full h-10 rounded-md border border-input bg-white px-3 text-sm">
                    <option value="Umum">Umum</option>
                    <option value="Kegiatan">Kegiatan</option>
                    <option value="Fasilitas">Fasilitas</option>
                    <option value="Prestasi">Prestasi</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>URL Gambar</Label>
                <Input value={formData.image_url} onChange={(e) => setFormData({...formData, image_url: e.target.value})} placeholder="https://contoh.com/foto.jpg" required />
                <p className="text-xs text-neutral-400">Masukkan URL gambar yang sudah diupload (misal via Imgur, Google Drive public, dsb.)</p>
              </div>
              <div className="space-y-2">
                <Label>Deskripsi (Opsional)</Label>
                <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} rows={3} className="w-full p-3 rounded-md border border-input bg-white text-sm" placeholder="Keterangan foto..." />
              </div>
              <Button type="submit" disabled={submitting} className="bg-primary-800 text-white hover:bg-primary-700">
                {submitting ? <IconLoader2 className="animate-spin mr-2" size={16} /> : <IconPlus size={16} className="mr-2" />}
                {submitting ? "Menyimpan..." : "Simpan Foto"}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Gallery Grid */}
      {gallery.length === 0 ? (
        <Card className="border-neutral-200 shadow-sm">
          <CardContent className="py-20 text-center">
            <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <IconPhoto size={40} className="text-neutral-300" />
            </div>
            <h3 className="font-bold text-neutral-700 text-lg">Belum Ada Foto</h3>
            <p className="text-sm text-neutral-400 mt-2 max-w-sm mx-auto">Klik tombol &quot;Tambah Foto&quot; untuk menambahkan dokumentasi kegiatan sekolah.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {gallery.map((item) => (
            <Card key={item.id as string} className="border-neutral-200 shadow-sm overflow-hidden group hover:shadow-lg transition-shadow">
              <div className="aspect-[4/3] bg-neutral-100 relative overflow-hidden">
                <img
                  src={item.image_url as string}
                  alt={item.title as string}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => { (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' fill='%23e5e7eb'%3E%3Crect width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' fill='%239ca3af' font-size='16' text-anchor='middle' dy='.3em'%3ENo Image%3C/text%3E%3C/svg%3E"; }}
                />
                {/* Delete Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 hover:bg-red-100 text-red-600 rounded-full h-10 w-10 shadow-lg"
                    onClick={() => handleDelete(item.id as string)}
                    title="Hapus Foto"
                  >
                    <IconTrash size={18} />
                  </Button>
                </div>
              </div>
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-neutral-900 text-sm truncate flex-1">{item.title as string}</h3>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ml-2 shrink-0 ${categoryColor(item.category as string)}`}>{item.category as string}</span>
                </div>
                {item.description && <p className="text-xs text-neutral-500 line-clamp-2">{item.description as string}</p>}
                <p className="text-[10px] text-neutral-400">{new Date(item.created_at as string).toLocaleDateString('id-ID')}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
