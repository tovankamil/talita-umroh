"use client";

import { useAuthStore } from "@/store/authStore";
import { 
  Users, 
  CreditCard, 
  Wallet, 
  ArrowUpRight, 
  ArrowDownRight, 
  Package, 
  ShoppingCart, 
  User,
  Activity,
  TrendingUp,
  Award
} from "lucide-react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const chartData = [
  { name: "Jan", jamaah: 4, komisi: 4000000 },
  { name: "Feb", jamaah: 7, komisi: 7000000 },
  { name: "Mar", jamaah: 5, komisi: 5000000 },
  { name: "Apr", jamaah: 12, komisi: 12000000 },
  { name: "Mei", jamaah: 9, komisi: 9000000 },
  { name: "Jun", jamaah: 15, komisi: 15000000 },
];

export default function AgentDashboard() {
  const { user } = useAuthStore();

  const stats = [
    {
      title: "Total Jamaah",
      value: "12",
      change: "+2 bulan ini",
      trend: "up",
      icon: Users,
      color: "from-sky-400 to-blue-500",
      textColor: "text-blue-600",
      bgSoft: "bg-blue-50",
    },
    {
      title: "Total Komisi",
      value: "Rp 15 Juta",
      change: "+Rp 3 Juta bulan ini",
      trend: "up",
      icon: Wallet,
      color: "from-teal-400 to-emerald-500",
      textColor: "text-teal-600",
      bgSoft: "bg-teal-50",
    },
    {
      title: "Komisi Tersedia",
      value: "Rp 3.000.000",
      change: "Siap dicairkan",
      trend: "neutral",
      icon: CreditCard,
      color: "from-violet-400 to-purple-500",
      textColor: "text-violet-600",
      bgSoft: "bg-violet-50",
    },
    {
      title: "Paket Terjual",
      value: "5",
      change: "Total paket yang dipesan",
      trend: "up",
      icon: Package,
      color: "from-amber-400 to-orange-500",
      textColor: "text-orange-600",
      bgSoft: "bg-orange-50",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 }
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Header Section */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2 flex items-center gap-3">
            Selamat datang, <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-500">{user?.name}</span> 
            <motion.div
              animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
            >
              👋
            </motion.div>
          </h1>
          <p className="text-slate-500 font-medium">Ringkasan kinerja Anda sebagai mitra kebanggaan Talita Umroh.</p>
        </div>
        
        <div className="flex items-center gap-3 surface-panel px-5 py-3 rounded-2xl shadow-sm">
          <Award className="w-5 h-5 text-amber-500" />
          <div className="flex flex-col">
            <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Kode Referral</span>
            <code className="text-teal-700 font-mono font-bold tracking-wider">{user?.referral_code || "BELUMADA"}</code>
          </div>
          <div className="flex gap-2 ml-2">
            <button 
              onClick={() => {
                navigator.clipboard.writeText(user?.referral_code || "");
                alert("Kode referral berhasil disalin!");
              }}
              className="text-xs bg-teal-50 text-teal-700 px-3 py-1.5 rounded-lg hover:bg-teal-100 transition font-medium border border-teal-100"
              title="Salin Kode"
            >
              Salin
            </button>
            <button 
              onClick={async () => {
                const url = `${window.location.origin}/register?ref=${user?.referral_code}`;
                const text = `Daftar Umroh bersama Talita Umroh dan dapatkan promo menarik menggunakan kode referral: ${user?.referral_code}`;
                
                if (navigator.share) {
                  try {
                    await navigator.share({ title: 'Talita Umroh Referral', text, url });
                  } catch (e) {
                    console.log('Share canceled');
                  }
                } else {
                  // Fallback to whatsapp link if Web Share API is not supported
                  window.open(`https://wa.me/?text=${encodeURIComponent(text + " " + url)}`, '_blank');
                }
              }}
              className="text-xs bg-slate-50 text-slate-600 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition font-medium border border-slate-200 flex items-center gap-1"
              title="Bagikan ke Sosial Media"
            >
              Share
            </button>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            whileHover={{ y: -5, scale: 1.02 }}
            key={i} 
            className="dashboard-3d-metric bg-white p-6 relative overflow-hidden group cursor-pointer"
          >
            {/* Soft background glow */}
            <div className={`absolute -right-6 -top-6 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-all duration-500`} />
            
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl ${stat.bgSoft} ${stat.textColor} shadow-sm ring-1 ring-black/5`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className={`flex items-center gap-1 text-sm font-semibold ${stat.trend === 'up' ? 'text-teal-600' : stat.trend === 'down' ? 'text-rose-500' : 'text-slate-400'}`}>
                {stat.trend === "up" && <ArrowUpRight className="w-4 h-4" />}
                {stat.trend === "down" && <ArrowDownRight className="w-4 h-4" />}
                {stat.trend === "neutral" && <Activity className="w-4 h-4" />}
              </div>
            </div>
            
            <h3 className="text-slate-500 text-sm font-semibold mb-1">{stat.title}</h3>
            <p className="text-3xl font-bold text-slate-800 tracking-tight mb-2">{stat.value}</p>
            <p className="text-xs text-slate-400 font-medium">{stat.change}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Charts & Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Section */}
        <motion.div variants={itemVariants} className="lg:col-span-2 dashboard-card-soft p-6">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-teal-500" />
                Tren Pertumbuhan Jamaah
              </h2>
              <p className="text-sm text-slate-500 mt-1">Data statistik 6 bulan terakhir</p>
            </div>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorJamaah" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                  labelStyle={{ color: '#0f172a', fontWeight: 'bold', marginBottom: '4px' }}
                />
                <Area type="monotone" dataKey="jamaah" name="Total Jamaah" stroke="#0ea5e9" strokeWidth={3} fillOpacity={1} fill="url(#colorJamaah)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Quick Actions & Recent Activity */}
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="dashboard-card-soft p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-6">Aksi Cepat</h2>
            <div className="space-y-3">
              <Link 
                href="/agent/packages"
                className="flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-100 hover:border-teal-200 hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-500 group-hover:text-white transition-colors">
                    <Package className="w-5 h-5" />
                  </div>
                  <span className="font-semibold text-slate-700">Jelajahi Paket</span>
                </div>
                <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-teal-500 transition-colors" />
              </Link>
              
              <Link 
                href="/agent/commissions"
                className="flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-100 hover:border-teal-200 hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                    <Wallet className="w-5 h-5" />
                  </div>
                  <span className="font-semibold text-slate-700">Cairkan Komisi</span>
                </div>
                <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-teal-500 transition-colors" />
              </Link>
              
              <Link 
                href="/agent/profile"
                className="flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-100 hover:border-teal-200 hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-violet-50 text-violet-600 rounded-lg group-hover:bg-violet-500 group-hover:text-white transition-colors">
                    <User className="w-5 h-5" />
                  </div>
                  <span className="font-semibold text-slate-700">Lengkapi Profil</span>
                </div>
                <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-teal-500 transition-colors" />
              </Link>
            </div>
          </div>

          {/* Empty State Mini */}
          <div className="dashboard-card-soft p-6 bg-gradient-to-br from-white to-slate-50/50">
            <div className="flex items-center gap-3 mb-4">
              <ShoppingCart className="w-5 h-5 text-slate-400" />
              <h3 className="font-bold text-slate-700">Transaksi Terbaru</h3>
            </div>
            <div className="text-center py-6">
              <p className="text-slate-500 font-medium text-sm">Belum ada transaksi</p>
              <Link href="/agent/packages" className="text-teal-600 font-semibold text-sm hover:underline mt-1 inline-block">
                Mulai bagikan paket →
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
