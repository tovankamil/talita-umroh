"use client";

import { useAuthStore } from "@/store/authStore";
import { User, Phone, Mail, Building2, Save, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ProfilePage() {
  const { user } = useAuthStore();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1000); // Simulate API call
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-3xl font-bold text-on-surface mb-2">Profil & Pengaturan Bank</h1>
        <p className="text-on-surface-variant font-medium">Kelola informasi pribadi dan data rekening pencairan komisi Anda.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="dashboard-card-soft p-6 flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center text-white shadow-lg mb-4 ring-4 ring-teal-50">
              <User className="w-10 h-10" />
            </div>
            <h2 className="text-xl font-bold text-on-surface">{user?.name || "Mitra Agen"}</h2>
            <p className="text-primary font-medium mb-4">{user?.role === 'agent' ? 'Mitra Agen Resmi' : 'Pengguna'}</p>
            
            <div className="w-full pt-4 border-t border-outline-variant/30 flex flex-col gap-3">
              <div className="flex items-center gap-3 text-on-surface-variant bg-surface-container-high p-3 rounded-xl">
                <Mail className="w-5 h-5 text-on-surface-variant" />
                <span className="text-sm font-medium">{user?.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSave} className="dashboard-card-soft p-6 md:p-8 space-y-8">
            
            {/* Personal Info */}
            <section>
              <h3 className="text-lg font-bold text-on-surface mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Informasi Pribadi
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-on-surface mb-2">Nama Lengkap</label>
                  <input 
                    type="text" 
                    defaultValue={user?.name}
                    className="w-full interactive-control px-4 py-3 rounded-xl"
                    placeholder="Nama Lengkap"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-on-surface mb-2">Nomor Telepon / WA</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-3.5 w-5 h-5 text-on-surface-variant" />
                    <input 
                      type="tel" 
                      className="w-full interactive-control pl-12 pr-4 py-3 rounded-xl"
                      placeholder="08123456789"
                    />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-on-surface mb-2">Alamat Lengkap</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-3.5 w-5 h-5 text-on-surface-variant" />
                    <input 
                      type="text" 
                      className="w-full interactive-control pl-12 pr-4 py-3 rounded-xl"
                      placeholder="Alamat rumah atau kantor"
                    />
                  </div>
                </div>
              </div>
            </section>

            <hr className="border-outline-variant/30" />

            {/* Bank Info */}
            <section>
              <h3 className="text-lg font-bold text-on-surface mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-500" />
                Pengaturan Rekening Bank
              </h3>
              <p className="text-sm text-on-surface-variant mb-6">Rekening ini akan digunakan untuk mencairkan komisi penjualan paket Umroh Anda.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-on-surface mb-2">Nama Bank</label>
                  <select className="w-full interactive-control px-4 py-3 rounded-xl appearance-none bg-surface-container">
                    <option value="">Pilih Bank</option>
                    <option value="BSI">BSI (Bank Syariah Indonesia)</option>
                    <option value="BCA">BCA</option>
                    <option value="MANDIRI">Mandiri</option>
                    <option value="BRI">BRI</option>
                    <option value="BNI">BNI</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-on-surface mb-2">Nomor Rekening</label>
                  <input 
                    type="text" 
                    className="w-full interactive-control px-4 py-3 rounded-xl"
                    placeholder="Contoh: 7123456789"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-on-surface mb-2">Nama Pemilik Rekening</label>
                  <input 
                    type="text" 
                    className="w-full interactive-control px-4 py-3 rounded-xl"
                    placeholder="Harus sesuai dengan buku tabungan"
                  />
                </div>
              </div>
            </section>

            <div className="flex justify-end pt-4">
              <button 
                type="submit"
                disabled={isSaving}
                className="soft-button bg-primary-container text-white hover:bg-primary-fixed-dim px-8 py-3 rounded-xl shadow-lg shadow-primary/5"
              >
                {isSaving ? "Menyimpan..." : (
                  <>
                    <Save className="w-5 h-5" />
                    Simpan Perubahan
                  </>
                )}
              </button>
            </div>

          </form>
        </div>
      </div>
    </motion.div>
  );
}
