"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Upload, CheckCircle2, Clock, XCircle } from "lucide-react";

export default function OrdersPage() {
  const orders = [
    {
      id: "INV-2026-001",
      jamaah: "Bpk. H. Ahmad",
      package: "Umroh Plus Turki 12 Hari",
      date: "12 Ags 2026",
      status: "pending_payment", // pending_payment, verification, success, failed
      amount: "Rp 32.500.000",
    },
    {
      id: "INV-2026-002",
      jamaah: "Ibu Siti Fatimah",
      package: "Umroh Reguler 9 Hari",
      date: "10 Ags 2026",
      status: "success",
      amount: "Rp 27.500.000",
    }
  ];

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'pending_payment':
        return <span className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-600 border border-amber-200 rounded-full text-xs font-bold"><Clock className="w-3.5 h-3.5"/> Menunggu Pembayaran</span>;
      case 'verification':
        return <span className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-600 border border-blue-200 rounded-full text-xs font-bold"><Clock className="w-3.5 h-3.5"/> Menunggu Verifikasi</span>;
      case 'success':
        return <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-full text-xs font-bold"><CheckCircle2 className="w-3.5 h-3.5"/> Berhasil</span>;
      case 'failed':
        return <span className="flex items-center gap-1.5 px-3 py-1 bg-rose-50 text-rose-600 border border-rose-200 rounded-full text-xs font-bold"><XCircle className="w-3.5 h-3.5"/> Gagal</span>;
      default:
        return null;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Riwayat Transaksi</h1>
        <p className="text-slate-500 font-medium">Pantau status pendaftaran jamaah dan unggah bukti pembayaran di sini.</p>
      </div>

      <div className="dashboard-card-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 border-b border-slate-100">
              <tr>
                <th className="p-5 font-semibold text-slate-500 text-sm">ID Invoice</th>
                <th className="p-5 font-semibold text-slate-500 text-sm">Nama Jamaah</th>
                <th className="p-5 font-semibold text-slate-500 text-sm">Paket</th>
                <th className="p-5 font-semibold text-slate-500 text-sm">Total Harga</th>
                <th className="p-5 font-semibold text-slate-500 text-sm">Status</th>
                <th className="p-5 font-semibold text-slate-500 text-sm">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.length > 0 ? orders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-5 font-mono text-sm font-semibold text-slate-700">{order.id}</td>
                  <td className="p-5">
                    <p className="font-bold text-slate-800">{order.jamaah}</p>
                    <p className="text-xs text-slate-400 mt-1">{order.date}</p>
                  </td>
                  <td className="p-5 text-sm text-slate-600 font-medium">{order.package}</td>
                  <td className="p-5 font-bold text-teal-600">{order.amount}</td>
                  <td className="p-5">{getStatusBadge(order.status)}</td>
                  <td className="p-5">
                    {order.status === 'pending_payment' ? (
                      <button className="flex items-center gap-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 px-4 py-2 rounded-lg transition shadow-sm">
                        <Upload className="w-4 h-4" />
                        Unggah Bukti
                      </button>
                    ) : (
                      <button className="text-xs font-bold text-teal-600 hover:text-teal-700 px-4 py-2 bg-teal-50 hover:bg-teal-100 rounded-lg transition">
                        Detail
                      </button>
                    )}
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} className="p-12 text-center">
                    <ShoppingCart className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500 font-medium text-lg">Belum ada transaksi</p>
                    <p className="text-slate-400 text-sm mt-1">Daftarkan jamaah Anda untuk melihat riwayat di sini.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
