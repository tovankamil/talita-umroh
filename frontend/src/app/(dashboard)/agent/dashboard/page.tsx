"use client";

import { useAuthStore } from "@/store/authStore";
import { Users, CreditCard, Wallet, ArrowUpRight, ArrowDownRight, Package, ShoppingCart, User } from "lucide-react";
import Link from "next/link";

export default function AgentDashboard() {
  const { user } = useAuthStore();

  const stats = [
    {
      title: "Total Jamaah",
      value: "12",
      change: "+2 bulan ini",
      trend: "up",
      icon: Users,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Total Komisi",
      value: "Rp 15.000.000",
      change: "+Rp 3.000.000",
      trend: "up",
      icon: Wallet,
      color: "from-emerald-500 to-emerald-600",
    },
    {
      title: "Komisi Tersedia",
      value: "Rp 3.000.000",
      change: "Siap dicairkan",
      trend: "neutral",
      icon: CreditCard,
      color: "from-violet-500 to-violet-600",
    },
    {
      title: "Paket Terjual",
      value: "5",
      change: "Total paket yang dipesan",
      trend: "neutral",
      icon: Package,
      color: "from-orange-500 to-orange-600",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">
            Selamat datang, <span className="text-emerald-400">{user?.name}</span> 👋
          </h1>
          <p className="text-gray-400">Ini adalah ringkasan kinerja Anda sebagai mitra agen.</p>
        </div>
        
        <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-xl backdrop-blur-md">
          <span className="text-sm text-gray-400">Kode Referral:</span>
          <code className="text-emerald-400 font-mono font-bold tracking-wider">{user?.referral_code || "BELUMADA"}</code>
          <button 
            onClick={() => navigator.clipboard.writeText(user?.referral_code || "")}
            className="ml-2 text-xs bg-emerald-600/20 text-emerald-400 px-2 py-1 rounded hover:bg-emerald-600/40 transition"
          >
            Salin
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div 
            key={i} 
            className="bg-[#111111] border border-white/5 rounded-3xl p-6 relative overflow-hidden group hover:border-white/10 transition-colors"
          >
            {/* Glow effect */}
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition-opacity`} />
            
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl bg-gradient-to-br ${stat.color} bg-opacity-10 text-white shadow-lg`}>
                <stat.icon className="w-6 h-6" />
              </div>
              {stat.trend === "up" && <ArrowUpRight className="w-5 h-5 text-emerald-400" />}
              {stat.trend === "down" && <ArrowDownRight className="w-5 h-5 text-red-400" />}
            </div>
            
            <h3 className="text-gray-400 text-sm font-medium mb-1">{stat.title}</h3>
            <p className="text-2xl font-bold text-white mb-2">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* Recent Transactions */}
        <div className="lg:col-span-2 bg-[#111111] border border-white/5 rounded-3xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Transaksi Terbaru</h2>
            <Link href="/agent/orders" className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors">
              Lihat Semua
            </Link>
          </div>
          
          <div className="text-center py-12 border border-dashed border-white/10 rounded-2xl">
            <ShoppingCart className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400 font-medium">Belum ada transaksi</p>
            <p className="text-sm text-gray-500 mt-1">Mulai bagikan paket ke calon jamaah Anda.</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-[#111111] border border-white/5 rounded-3xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Aksi Cepat</h2>
          <div className="space-y-3">
            <Link 
              href="/agent/packages"
              className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all group"
            >
              <div className="flex items-center gap-3">
                <Package className="w-5 h-5 text-blue-400" />
                <span className="font-medium text-gray-200 group-hover:text-white">Jelajahi Paket</span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-emerald-400 transition-colors" />
            </Link>
            
            <Link 
              href="/agent/commissions"
              className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all group"
            >
              <div className="flex items-center gap-3">
                <Wallet className="w-5 h-5 text-emerald-400" />
                <span className="font-medium text-gray-200 group-hover:text-white">Cairkan Komisi</span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-emerald-400 transition-colors" />
            </Link>
            
            <Link 
              href="/agent/profile"
              className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all group"
            >
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-violet-400" />
                <span className="font-medium text-gray-200 group-hover:text-white">Lengkapi Profil</span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-emerald-400 transition-colors" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
