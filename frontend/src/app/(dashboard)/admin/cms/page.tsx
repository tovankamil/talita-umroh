"use client";

import { useState } from "react";
import { 
  FileText, 
  Image as ImageIcon, 
  MessageSquare, 
  Plus, 
  Edit2, 
  Trash2, 
  CheckCircle2, 
  XCircle 
} from "lucide-react";
import { motion } from "framer-motion";

export default function CMSPage() {
  const [activeTab, setActiveTab] = useState("banners");

  const tabs = [
    { id: "banners", label: "Banner & Promo", icon: ImageIcon },
    { id: "articles", label: "Artikel & Berita", icon: FileText },
    { id: "testimonials", label: "Testimoni", icon: MessageSquare },
  ];

  return (
    <div className="space-y-8 animate-in fade-in zoom-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-on-surface mb-2 flex items-center gap-3">
            <FileText className="w-8 h-8 text-primary" />
            CMS Konten
          </h1>
          <p className="text-on-surface-variant font-medium">
            Kelola konten website, banner promosi, dan testimoni jamaah.
          </p>
        </div>
        <button className="p-2.5 bg-primary text-on-primary rounded-xl hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center gap-2 cursor-pointer">
          <Plus className="w-4 h-4" />
          <span className="font-semibold">Tambah Konten</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-surface-container p-1 rounded-2xl w-fit">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                isActive 
                  ? "bg-primary text-on-primary shadow-md" 
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content Area */}
      <motion.div 
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="dashboard-card-soft p-8"
      >
        {activeTab === "banners" && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
              <ImageIcon className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-on-surface mb-2">Belum ada Banner Promosi</h3>
            <p className="text-on-surface-variant mb-6 max-w-md mx-auto">
              Tambahkan gambar banner untuk ditampilkan pada halaman utama website agen dan pelanggan.
            </p>
            <button className="px-6 py-2.5 bg-surface-container-highest text-on-surface hover:text-primary rounded-xl font-semibold transition-colors">
              Mulai Unggah Banner
            </button>
          </div>
        )}
        
        {activeTab === "articles" && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
              <FileText className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-on-surface mb-2">Belum ada Artikel</h3>
            <p className="text-on-surface-variant mb-6 max-w-md mx-auto">
              Bagikan cerita inspiratif, panduan umroh, atau berita terbaru seputar travel Anda.
            </p>
            <button className="px-6 py-2.5 bg-surface-container-highest text-on-surface hover:text-primary rounded-xl font-semibold transition-colors">
              Tulis Artikel Pertama
            </button>
          </div>
        )}

        {activeTab === "testimonials" && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
              <MessageSquare className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-on-surface mb-2">Belum ada Testimoni</h3>
            <p className="text-on-surface-variant mb-6 max-w-md mx-auto">
              Tampilkan ulasan dan pengalaman jamaah yang telah berangkat bersama Talita Umroh.
            </p>
            <button className="px-6 py-2.5 bg-surface-container-highest text-on-surface hover:text-primary rounded-xl font-semibold transition-colors">
              Tambah Testimoni Jamaah
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
