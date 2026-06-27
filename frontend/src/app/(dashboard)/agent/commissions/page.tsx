"use client";

import { motion } from "framer-motion";
import { Wallet, ArrowDownToLine, FileText, CheckCircle2, AlertCircle } from "lucide-react";

export default function CommissionsPage() {
  const ledger = [
    {
      id: "COM-001",
      date: "12 Ags 2026",
      desc: "Komisi Paket Umroh Plus Turki (Bpk H. Ahmad)",
      amount: "+Rp 2.000.000",
      type: "credit",
      status: "available"
    },
    {
      id: "COM-002",
      date: "10 Ags 2026",
      desc: "Pencairan Komisi ke Bank BSI",
      amount: "-Rp 1.500.000",
      type: "debit",
      status: "success"
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Pusat Komisi & Withdraw</h1>
        <p className="text-slate-500 font-medium">Lacak saldo komisi Anda dan lakukan penarikan dana ke rekening Anda.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 dashboard-card-soft p-8 bg-gradient-to-br from-teal-500 to-emerald-600 text-white relative overflow-hidden shadow-xl shadow-teal-600/20">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Wallet className="w-32 h-32" />
          </div>
          <div className="relative z-10">
            <p className="text-teal-100 font-medium mb-2">Saldo Komisi Tersedia</p>
            <h2 className="text-4xl font-bold mb-8">Rp 3.000.000</h2>
            
            <button className="w-full bg-white text-teal-600 font-bold py-3 px-4 rounded-xl hover:bg-teal-50 transition shadow-lg flex items-center justify-center gap-2">
              <ArrowDownToLine className="w-5 h-5" />
              Tarik Saldo Sekarang
            </button>
            <p className="text-xs text-teal-100 text-center mt-4">Penarikan diproses dalam 1x24 jam kerja</p>
          </div>
        </div>

        <div className="md:col-span-2 dashboard-card-soft p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-500" />
              Buku Besar (Ledger)
            </h3>
            <button className="text-sm font-semibold text-teal-600 hover:text-teal-700 bg-teal-50 px-4 py-2 rounded-lg">
              Download Laporan
            </button>
          </div>

          <div className="space-y-4">
            {ledger.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-xl hover:bg-white hover:shadow-sm transition-all">
                <div className="flex items-center gap-4">
                  <div className={`p-2.5 rounded-xl ${item.type === 'credit' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                    {item.type === 'credit' ? <ArrowDownToLine className="w-5 h-5 rotate-180" /> : <ArrowDownToLine className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">{item.desc}</p>
                    <p className="text-xs text-slate-400 font-medium mt-1">{item.date} • {item.id}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold text-lg ${item.type === 'credit' ? 'text-emerald-600' : 'text-slate-800'}`}>
                    {item.amount}
                  </p>
                  <p className="text-xs mt-1">
                    {item.status === 'success' ? (
                      <span className="text-blue-500 flex items-center justify-end gap-1"><CheckCircle2 className="w-3.5 h-3.5"/> Berhasil</span>
                    ) : (
                      <span className="text-emerald-500 flex items-center justify-end gap-1"><CheckCircle2 className="w-3.5 h-3.5"/> Tersedia</span>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
