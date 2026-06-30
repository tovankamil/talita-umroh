"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  ReceiptText,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Eye,
  User,
  Package
} from "lucide-react";
import { motion } from "framer-motion";
import api from "@/lib/axios";

interface Transaction {
  id: number;
  invoice_number: string;
  agent_name: string;
  package_name: string;
  pax_count: number;
  total_amount: number;
  status: string;
  created_at: string;
}

export default function AdminTransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchTransactions = async () => {
    try {
      const token = Cookies.get("token");
      const res = await fetch("http://localhost:8080/api/v1/admin/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setTransactions(data.data || []);
      } else {
        console.error("Failed to fetch transactions");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleVerify = async (id: number) => {
    try {
      const token = Cookies.get("token");
      const res = await fetch(`http://localhost:8080/api/v1/admin/orders/${id}/verify`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        // Refresh data
        fetchTransactions();
      }
    } catch (error) {
      console.error("Failed to verify", error);
    }
  };

  const handleReject = async (id: number) => {
    try {
      const token = Cookies.get("token");
      const res = await fetch(`http://localhost:8080/api/v1/admin/orders/${id}/reject`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        // Refresh data
        fetchTransactions();
      }
    } catch (error) {
      console.error("Failed to reject", error);
    }
  };

  const filteredTransactions = transactions.filter(
    (tx) =>
      tx.invoice_number.toLowerCase().includes(search.toLowerCase()) ||
      tx.agent_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in zoom-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-on-surface mb-2 flex items-center gap-3">
            <ReceiptText className="w-8 h-8 text-primary" />
            Manajemen Transaksi
          </h1>
          <p className="text-on-surface-variant font-medium">
            Verifikasi dan pantau transaksi pemesanan dari para agen.
          </p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-on-surface-variant">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Cari invoice/agen..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-surface-container-high border border-outline-variant/30 text-on-surface rounded-xl py-2 pl-10 pr-4 outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all text-sm"
            />
          </div>
          <button className="p-2.5 bg-surface-container-high border border-outline-variant/30 text-on-surface rounded-xl hover:border-primary/50 hover:text-primary transition-colors">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="dashboard-card-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs text-on-surface-variant uppercase bg-surface-container-high/50 border-b border-outline-variant/30">
              <tr>
                <th className="px-6 py-4 font-semibold">Invoice</th>
                <th className="px-6 py-4 font-semibold">Agen & Paket</th>
                <th className="px-6 py-4 font-semibold">Total (Pax)</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-on-surface-variant">
                    Memuat transaksi...
                  </td>
                </tr>
              ) : filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-on-surface-variant">
                    Tidak ada transaksi ditemukan.
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((tx) => (
                  <motion.tr
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    key={tx.id}
                    className="border-b border-outline-variant/10 hover:bg-surface-container-highest/20 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="font-semibold text-primary">{tx.invoice_number}</div>
                      <div className="text-xs text-on-surface-variant mt-1">
                        {new Date(tx.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1 text-xs">
                        <span className="flex items-center gap-1 font-medium text-on-surface"><User className="w-3 h-3 text-on-surface-variant"/> {tx.agent_name}</span>
                        <span className="flex items-center gap-1 text-on-surface-variant"><Package className="w-3 h-3"/> {tx.package_name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-on-surface">Rp {Number(tx.total_amount).toLocaleString('id-ID')}</div>
                      <div className="text-xs text-on-surface-variant">{tx.pax_count} Pax</div>
                    </td>
                    <td className="px-6 py-4">
                      {tx.status.toLowerCase() === "paid" || tx.status.toLowerCase() === "verified" ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          <CheckCircle className="w-3 h-3" /> Lunas
                        </span>
                      ) : tx.status.toLowerCase() === "rejected" ? (
                         <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20">
                         <XCircle className="w-3 h-3" /> Ditolak
                       </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span> Menunggu
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors" title="Lihat Bukti">
                          <Eye className="w-4 h-4" />
                        </button>
                        {tx.status.toLowerCase() !== "paid" && tx.status.toLowerCase() !== "verified" && (
                          <button onClick={() => handleVerify(tx.id)} className="p-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg hover:bg-emerald-500/20 transition-colors" title="Verifikasi">
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                        {tx.status.toLowerCase() !== "rejected" && (
                           <button onClick={() => handleReject(tx.id)} className="p-1.5 bg-rose-500/10 text-rose-400 rounded-lg hover:bg-rose-500/20 transition-colors" title="Tolak">
                           <XCircle className="w-4 h-4" />
                         </button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
