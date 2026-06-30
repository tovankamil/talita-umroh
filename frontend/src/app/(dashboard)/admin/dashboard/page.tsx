"use client";

import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";
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
  Award,
  RefreshCcw,
  CheckCircle2
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

import Cookies from 'js-cookie';

export default function AdminDashboard() {
  const { user } = useAuthStore();
  const [kpiData, setKpiData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchKPI = async () => {
      try {
        const token = Cookies.get('token');
        const res = await fetch("http://localhost:8080/api/v1/admin/kpi", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        if (res.ok) {
          const data = await res.json();
          setKpiData(data);
        } else {
          const errorText = await res.text();
          console.error("Failed to fetch KPI:", res.status, errorText);
        }
      } catch (error) {
        console.error("Error fetching KPI:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchKPI();
  }, []);

  const defaultChartData = [
    { name: "Jan", jamaah: 150 },
    { name: "Feb", jamaah: 200 },
    { name: "Mar", jamaah: 180 },
    { name: "Apr", jamaah: 250 },
    { name: "Mei", jamaah: 210 },
    { name: "Jun", jamaah: 260 },
  ];

  const chartDataToUse = kpiData?.chart_data || defaultChartData;

  const stats = [
    {
      title: "Total Jamaah",
      value: kpiData?.total_jamaah || "0",
      change: "+125 bulan ini",
      trend: "up",
      icon: Users,
      color: "from-sky-400 to-blue-500",
      textColor: "text-sky-400",
      bgSoft: "bg-sky-500/20",
    },
    {
      title: "Agen Aktif",
      value: kpiData?.active_agents || "0",
      change: "+5 agen baru",
      trend: "up",
      icon: User,
      color: "from-teal-400 to-emerald-500",
      textColor: "text-teal-400",
      bgSoft: "bg-teal-500/20",
    },
    {
      title: "Transaksi Pending",
      value: kpiData?.pending_transactions || "0",
      change: "Perlu verifikasi",
      trend: "neutral",
      icon: RefreshCcw,
      color: "from-amber-400 to-orange-500",
      textColor: "text-amber-400",
      bgSoft: "bg-amber-500/20",
    },
    {
      title: "Total Pendapatan",
      value: kpiData ? `Rp ${Number(kpiData.total_revenue).toLocaleString('id-ID')}` : "Rp 0",
      change: "Bulan ini",
      trend: "up",
      icon: Wallet,
      color: "from-violet-400 to-purple-500",
      textColor: "text-violet-400",
      bgSoft: "bg-violet-500/20",
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

  if (loading) {
    return <div className="flex items-center justify-center h-64 text-primary">Memuat dashboard...</div>;
  }

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
          <h1 className="text-3xl font-bold text-on-surface mb-2 flex items-center gap-3">
            Admin Panel, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-fixed">{user?.name}</span> 
            <motion.div
              animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
            >
              👑
            </motion.div>
          </h1>
          <p className="text-on-surface-variant font-medium">Ringkasan operasional dan statistik sistem Talita Umroh.</p>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            whileHover={{ y: -5, scale: 1.02 }}
            key={i} 
            className="dashboard-3d-metric bg-surface-container-high p-6 relative overflow-hidden group cursor-pointer border border-outline-variant/30 rounded-[28px]"
          >
            {/* Soft background glow */}
            <div className={`absolute -right-6 -top-6 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-all duration-500`} />
            
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl ${stat.bgSoft} ${stat.textColor} shadow-sm ring-1 ring-black/5`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className={`flex items-center gap-1 text-sm font-semibold ${stat.trend === 'up' ? 'text-teal-400' : stat.trend === 'down' ? 'text-rose-400' : 'text-slate-400'}`}>
                {stat.trend === "up" && <ArrowUpRight className="w-4 h-4" />}
                {stat.trend === "down" && <ArrowDownRight className="w-4 h-4" />}
                {stat.trend === "neutral" && <Activity className="w-4 h-4" />}
              </div>
            </div>
            
            <h3 className="text-on-surface-variant text-sm font-semibold mb-1">{stat.title}</h3>
            <p className="text-3xl font-bold text-on-surface tracking-tight mb-2">{stat.value}</p>
            <p className="text-xs text-on-surface-variant font-medium">{stat.change}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Charts & Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Section */}
        <motion.div variants={itemVariants} className="lg:col-span-2 dashboard-card-soft p-6">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-xl font-bold text-on-surface flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Tren Pertumbuhan Jamaah
              </h2>
              <p className="text-sm text-on-surface-variant mt-1">Data statistik pendaftaran jamaah 6 bulan terakhir</p>
            </div>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartDataToUse} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorJamaah" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f2ca50" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f2ca50" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#353535" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#b1b3b4', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#b1b3b4', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)', backgroundColor: '#2a2a2a' }}
                  labelStyle={{ color: '#e2e2e2', fontWeight: 'bold', marginBottom: '4px' }}
                />
                <Area type="monotone" dataKey="jamaah" name="Total Jamaah" stroke="#f2ca50" strokeWidth={3} fillOpacity={1} fill="url(#colorJamaah)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="dashboard-card-soft p-6">
            <h2 className="text-xl font-bold text-on-surface mb-6">Jalan Pintas</h2>
            <div className="space-y-3">
              <Link 
                href="/admin/transactions"
                className="flex items-center justify-between p-4 rounded-2xl bg-surface-container-high border border-outline-variant/30 hover:border-primary/50 hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-500/20 text-amber-400 rounded-lg group-hover:bg-amber-500 group-hover:text-white transition-colors">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <span className="font-semibold text-on-surface">Validasi Transaksi</span>
                </div>
                <ArrowUpRight className="w-5 h-5 text-on-surface-variant group-hover:text-primary transition-colors" />
              </Link>
              
              <Link 
                href="/admin/users"
                className="flex items-center justify-between p-4 rounded-2xl bg-surface-container-high border border-outline-variant/30 hover:border-primary/50 hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg group-hover:bg-blue-500 group-hover:text-white transition-colors">
                    <Users className="w-5 h-5" />
                  </div>
                  <span className="font-semibold text-on-surface">Kelola Pengguna</span>
                </div>
                <ArrowUpRight className="w-5 h-5 text-on-surface-variant group-hover:text-primary transition-colors" />
              </Link>
              
              <Link 
                href="/admin/packages"
                className="flex items-center justify-between p-4 rounded-2xl bg-surface-container-high border border-outline-variant/30 hover:border-primary/50 hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                    <Package className="w-5 h-5" />
                  </div>
                  <span className="font-semibold text-on-surface">Update Paket</span>
                </div>
                <ArrowUpRight className="w-5 h-5 text-on-surface-variant group-hover:text-primary transition-colors" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
