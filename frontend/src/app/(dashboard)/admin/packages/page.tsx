"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  Package,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Calendar,
  Clock,
  DollarSign,
  X,
  Loader2
} from "lucide-react";
import { motion } from "framer-motion";

interface UmrohPackage {
  id: number;
  name: string;
  category: string;
  price: number;
  duration_days: number;
  available_seats: number;
  status: string;
}

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState<UmrohPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  
  // Add Package State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newPackage, setNewPackage] = useState({
    name: "",
    category: "Reguler",
    price: "",
    duration_days: "",
    available_seats: "",
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<UmrohPackage | null>(null);

  const fetchPackages = async () => {
    try {
      const token = Cookies.get("token");
      const res = await fetch("http://localhost:8080/api/v1/admin/packages", {
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setPackages(data.data || []);
      } else {
        console.error("Failed to fetch packages");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleCreatePackage = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const token = Cookies.get("token");
      const res = await fetch("http://localhost:8080/api/v1/admin/packages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: newPackage.name,
          category: newPackage.category,
          price: Number(newPackage.price),
          duration_days: Number(newPackage.duration_days),
          available_seats: Number(newPackage.available_seats),
          status: "active"
        }),
      });

      if (res.ok) {
        setIsAddModalOpen(false);
        setNewPackage({ name: "", category: "Reguler", price: "", duration_days: "", available_seats: "" });
        fetchPackages(); // Refresh data
      }
    } catch (error) {
      console.error("Failed to create package", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditClick = (pkg: UmrohPackage) => {
    setEditingPackage(pkg);
    setIsEditModalOpen(true);
  };

  const handleUpdatePackage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPackage) return;
    setIsSubmitting(true);
    try {
      const token = Cookies.get("token");
      const res = await fetch(`http://localhost:8080/api/v1/admin/packages/${editingPackage.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: editingPackage.name,
          category: editingPackage.category,
          price: Number(editingPackage.price),
          duration_days: Number(editingPackage.duration_days),
          available_seats: Number(editingPackage.available_seats),
          status: editingPackage.status
        }),
      });

      if (res.ok) {
        setIsEditModalOpen(false);
        setEditingPackage(null);
        fetchPackages();
      }
    } catch (error) {
      console.error("Failed to update package", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeletePackage = async (id: number) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus paket ini?")) return;
    
    try {
      const token = Cookies.get("token");
      const res = await fetch(`http://localhost:8080/api/v1/admin/packages/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        fetchPackages();
      }
    } catch (error) {
      console.error("Failed to delete package", error);
    }
  };

  const filteredPackages = packages.filter(
    (pkg) =>
      pkg.name.toLowerCase().includes(search.toLowerCase()) ||
      pkg.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in zoom-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-on-surface mb-2 flex items-center gap-3">
            <Package className="w-8 h-8 text-primary" />
            Manajemen Paket
          </h1>
          <p className="text-on-surface-variant font-medium">
            Kelola dan perbarui produk paket perjalanan Umroh & Haji.
          </p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-on-surface-variant">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Cari paket..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-surface-container-high border border-outline-variant/30 text-on-surface rounded-xl py-2 pl-10 pr-4 outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all text-sm"
            />
          </div>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="p-2.5 bg-primary text-on-primary rounded-xl hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline font-semibold">Tambah Paket</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-12 text-center text-on-surface-variant">Memuat data paket...</div>
        ) : filteredPackages.length === 0 ? (
          <div className="col-span-full py-12 text-center text-on-surface-variant">Tidak ada paket ditemukan.</div>
        ) : (
          filteredPackages.map((pkg) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              key={pkg.id}
              className="dashboard-card-soft p-6 group hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/20 text-primary border border-primary/30">
                  {pkg.category}
                </span>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => handleEditClick(pkg)}
                    className="p-1.5 bg-surface-container-highest text-on-surface hover:text-primary rounded-lg transition-colors cursor-pointer" 
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDeletePackage(pkg.id)}
                    className="p-1.5 bg-surface-container-highest text-on-surface hover:text-rose-400 rounded-lg transition-colors cursor-pointer" 
                    title="Hapus"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-on-surface mb-2 leading-tight">{pkg.name}</h3>
              
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-on-surface-variant">
                  <Clock className="w-4 h-4" />
                  <span>Durasi: {pkg.duration_days} Hari</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-on-surface-variant">
                  <Calendar className="w-4 h-4" />
                  <span>Tersedia: {pkg.available_seats} Seat</span>
                </div>
              </div>

              <div className="pt-4 border-t border-outline-variant/30 flex justify-between items-center mt-auto">
                <div>
                  <p className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold">Harga mulai</p>
                  <p className="text-lg font-bold text-primary flex items-center gap-1">
                    Rp {Number(pkg.price).toLocaleString('id-ID')}
                  </p>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Modal Tambah Paket */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-surface-container border border-outline-variant/30 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
          >
            <div className="flex justify-between items-center p-6 border-b border-outline-variant/20">
              <h2 className="text-xl font-bold text-on-surface flex items-center gap-2">
                <Package className="w-5 h-5 text-primary" />
                Tambah Paket Umroh
              </h2>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleCreatePackage}>
              <div className="p-6 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-on-surface-variant">Nama Paket</label>
                  <input
                    type="text"
                    required
                    value={newPackage.name}
                    onChange={(e) => setNewPackage({ ...newPackage, name: e.target.value })}
                    className="w-full bg-surface-container-high border border-outline-variant/30 text-on-surface rounded-xl py-2 px-4 outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all text-sm"
                    placeholder="Contoh: Paket Umroh VIP Ramadhan"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-on-surface-variant">Kategori</label>
                    <select
                      value={newPackage.category}
                      onChange={(e) => setNewPackage({ ...newPackage, category: e.target.value })}
                      className="w-full bg-surface-container-high border border-outline-variant/30 text-on-surface rounded-xl py-2 px-4 outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all text-sm"
                    >
                      <option value="Reguler">Reguler</option>
                      <option value="Premium">Premium</option>
                      <option value="VIP">VIP</option>
                      <option value="Plus">Plus (Turkey/Aqsha)</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-on-surface-variant">Harga (Rp)</label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={newPackage.price}
                      onChange={(e) => setNewPackage({ ...newPackage, price: e.target.value })}
                      className="w-full bg-surface-container-high border border-outline-variant/30 text-on-surface rounded-xl py-2 px-4 outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all text-sm"
                      placeholder="Contoh: 35000000"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-on-surface-variant">Durasi (Hari)</label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={newPackage.duration_days}
                      onChange={(e) => setNewPackage({ ...newPackage, duration_days: e.target.value })}
                      className="w-full bg-surface-container-high border border-outline-variant/30 text-on-surface rounded-xl py-2 px-4 outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all text-sm"
                      placeholder="Contoh: 9"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-on-surface-variant">Ketersediaan Seat</label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={newPackage.available_seats}
                      onChange={(e) => setNewPackage({ ...newPackage, available_seats: e.target.value })}
                      className="w-full bg-surface-container-high border border-outline-variant/30 text-on-surface rounded-xl py-2 px-4 outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all text-sm"
                      placeholder="Contoh: 45"
                    />
                  </div>
                </div>
              </div>
              
              <div className="p-4 border-t border-outline-variant/20 bg-surface-container flex justify-end gap-3">
                <button 
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2 bg-surface-container-highest text-on-surface hover:text-white hover:bg-surface-container-highest/80 rounded-xl transition-colors font-medium text-sm"
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-primary text-on-primary hover:bg-primary/90 rounded-xl transition-colors font-medium text-sm flex items-center gap-2 disabled:opacity-70"
                >
                  {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Menyimpan...</> : "Simpan Paket"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Modal Edit Paket */}
      {isEditModalOpen && editingPackage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-surface-container border border-outline-variant/30 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
          >
            <div className="flex justify-between items-center p-6 border-b border-outline-variant/20">
              <h2 className="text-xl font-bold text-on-surface flex items-center gap-2">
                <Edit2 className="w-5 h-5 text-primary" />
                Edit Paket Umroh
              </h2>
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleUpdatePackage}>
              <div className="p-6 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-on-surface-variant">Nama Paket</label>
                  <input
                    type="text"
                    required
                    value={editingPackage.name}
                    onChange={(e) => setEditingPackage({ ...editingPackage, name: e.target.value })}
                    className="w-full bg-surface-container-high border border-outline-variant/30 text-on-surface rounded-xl py-2 px-4 outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all text-sm"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-on-surface-variant">Kategori</label>
                    <select
                      value={editingPackage.category}
                      onChange={(e) => setEditingPackage({ ...editingPackage, category: e.target.value })}
                      className="w-full bg-surface-container-high border border-outline-variant/30 text-on-surface rounded-xl py-2 px-4 outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all text-sm"
                    >
                      <option value="Reguler">Reguler</option>
                      <option value="Premium">Premium</option>
                      <option value="VIP">VIP</option>
                      <option value="Plus">Plus (Turkey/Aqsha)</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-on-surface-variant">Harga (Rp)</label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={editingPackage.price}
                      onChange={(e) => setEditingPackage({ ...editingPackage, price: Number(e.target.value) })}
                      className="w-full bg-surface-container-high border border-outline-variant/30 text-on-surface rounded-xl py-2 px-4 outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-on-surface-variant">Durasi (Hari)</label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={editingPackage.duration_days}
                      onChange={(e) => setEditingPackage({ ...editingPackage, duration_days: Number(e.target.value) })}
                      className="w-full bg-surface-container-high border border-outline-variant/30 text-on-surface rounded-xl py-2 px-4 outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all text-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-on-surface-variant">Ketersediaan Seat</label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={editingPackage.available_seats}
                      onChange={(e) => setEditingPackage({ ...editingPackage, available_seats: Number(e.target.value) })}
                      className="w-full bg-surface-container-high border border-outline-variant/30 text-on-surface rounded-xl py-2 px-4 outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all text-sm"
                    />
                  </div>
                </div>
              </div>
              
              <div className="p-4 border-t border-outline-variant/20 bg-surface-container flex justify-end gap-3">
                <button 
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-5 py-2 bg-surface-container-highest text-on-surface hover:text-white hover:bg-surface-container-highest/80 rounded-xl transition-colors font-medium text-sm"
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-primary text-on-primary hover:bg-primary/90 rounded-xl transition-colors font-medium text-sm flex items-center gap-2 disabled:opacity-70"
                >
                  {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Menyimpan...</> : "Simpan Perubahan"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
