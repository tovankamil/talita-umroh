"use client";

import { motion } from "framer-motion";
import { PackageSearch, Calendar, Users, ArrowRight, Share2 } from "lucide-react";

export default function PackagesPage() {
  const packages = [
    {
      id: 1,
      title: "Paket Umroh Plus Turki 12 Hari",
      date: "15 Agustus 2026",
      quota: 45,
      remaining: 12,
      price: "Rp 32.500.000",
      commission: "Rp 2.000.000",
      image: "bg-gradient-to-br from-teal-400 to-emerald-500",
    },
    {
      id: 2,
      title: "Paket Umroh Reguler 9 Hari",
      date: "10 September 2026",
      quota: 90,
      remaining: 40,
      price: "Rp 27.500.000",
      commission: "Rp 1.500.000",
      image: "bg-gradient-to-br from-blue-400 to-cyan-500",
    },
    {
      id: 3,
      title: "Paket Umroh VIP Ramadhan",
      date: "05 Maret 2027",
      quota: 30,
      remaining: 5,
      price: "Rp 45.000.000",
      commission: "Rp 3.500.000",
      image: "bg-gradient-to-br from-violet-400 to-purple-500",
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Katalog Paket Umroh</h1>
          <p className="text-slate-500 font-medium">Jelajahi paket umroh terbaru dan bagikan brosurnya ke calon jamaah.</p>
        </div>
        
        <div className="relative">
          <PackageSearch className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Cari paket..." 
            className="interactive-control pl-12 pr-4 py-3 rounded-xl w-full md:w-64"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <motion.div 
            whileHover={{ y: -5 }}
            key={pkg.id} 
            className="dashboard-card-soft flex flex-col group"
          >
            {/* Header Image Fake */}
            <div className={`h-40 ${pkg.image} p-6 relative overflow-hidden`}>
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-teal-700 text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm">
                Komisi {pkg.commission}
              </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-bold text-slate-800 mb-4 leading-tight group-hover:text-teal-600 transition-colors">
                {pkg.title}
              </h3>
              
              <div className="space-y-3 mb-6 flex-1">
                <div className="flex items-center gap-3 text-sm text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span className="font-medium">{pkg.date}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <Users className="w-4 h-4 text-slate-400" />
                  <span className="font-medium">Sisa {pkg.remaining} dari {pkg.quota} seat</span>
                </div>
              </div>

              <div className="flex items-end justify-between mb-6">
                <div>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Harga Mulai</p>
                  <p className="text-xl font-bold text-teal-600">{pkg.price}</p>
                </div>
              </div>

              <div className="flex gap-3 mt-auto">
                <button className="flex-1 bg-teal-600 text-white font-medium py-3 rounded-xl hover:bg-teal-700 transition shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2">
                  Daftarkan Jamaah
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button className="p-3 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition" title="Bagikan Brosur">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
