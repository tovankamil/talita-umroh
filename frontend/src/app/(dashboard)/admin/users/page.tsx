"use client";

import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  Users,
  Search,
  Filter,
  MoreVertical,
  CheckCircle2,
  XCircle,
  Eye,
  Mail,
  Phone,
  X,
  CreditCard
} from "lucide-react";
import { motion } from "framer-motion";

interface Agent {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: string;
  created_at: string;
}

export default function AdminUsersPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  
  const [selectedAgent, setSelectedAgent] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);

  const handleViewAgent = async (id: number) => {
    setIsModalOpen(true);
    setLoadingDetail(true);
    try {
      const token = Cookies.get("token");
      const res = await fetch(`http://localhost:8080/api/v1/admin/agents/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setSelectedAgent(data.data);
      } else {
        console.error("Failed to fetch agent details");
      }
    } catch (error) {
      console.error("Error fetching agent details:", error);
    } finally {
      setLoadingDetail(false);
    }
  };

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const token = Cookies.get("token");
        const res = await fetch("http://localhost:8080/api/v1/admin/agents", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setAgents(data.data || []);
        } else {
          console.error("Failed to fetch agents");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  const filteredAgents = agents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(search.toLowerCase()) ||
      agent.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in zoom-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-on-surface mb-2 flex items-center gap-3">
            <Users className="w-8 h-8 text-primary" />
            Pengguna & Agen
          </h1>
          <p className="text-on-surface-variant font-medium">
            Kelola daftar agen yang terdaftar di Talita Umroh.
          </p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-on-surface-variant">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Cari agen..."
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
                <th className="px-6 py-4 font-semibold">Nama Agen</th>
                <th className="px-6 py-4 font-semibold">Kontak</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Tanggal Daftar</th>
                <th className="px-6 py-4 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-on-surface-variant">
                    Memuat data...
                  </td>
                </tr>
              ) : filteredAgents.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-on-surface-variant">
                    Tidak ada agen ditemukan.
                  </td>
                </tr>
              ) : (
                filteredAgents.map((agent) => (
                  <motion.tr
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    key={agent.id}
                    className="border-b border-outline-variant/10 hover:bg-surface-container-highest/20 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="font-semibold text-on-surface">{agent.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1 text-on-surface-variant text-xs">
                        <span className="flex items-center gap-1"><Mail className="w-3 h-3"/> {agent.email}</span>
                        <span className="flex items-center gap-1"><Phone className="w-3 h-3"/> {agent.phone}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {agent.status.toLowerCase() === "active" || agent.status === "Aktif" ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                          Aktif
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-on-surface-variant">
                      {new Date(agent.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleViewAgent(agent.id)}
                          className="p-1.5 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors cursor-pointer" 
                          title="Lihat Detail"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Detail Agen */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-surface-container border border-outline-variant/30 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
          >
            <div className="flex justify-between items-center p-6 border-b border-outline-variant/20">
              <h2 className="text-xl font-bold text-on-surface flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Detail Agen
              </h2>
              <button 
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedAgent(null);
                }}
                className="text-on-surface-variant hover:text-on-surface transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              {loadingDetail ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
                </div>
              ) : selectedAgent ? (
                <div className="space-y-6">
                  {/* Info Utama */}
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary text-2xl font-bold flex-shrink-0">
                      {selectedAgent.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-on-surface">{selectedAgent.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {selectedAgent.role.toUpperCase()}
                        </span>
                        <span className="text-xs text-on-surface-variant">
                          Bergabung: {new Date(selectedAgent.created_at).toLocaleDateString('id-ID')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Info Kontak */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-surface-container-high p-4 rounded-xl border border-outline-variant/10">
                      <p className="text-xs text-on-surface-variant mb-1 font-semibold uppercase">Email</p>
                      <p className="text-sm font-medium flex items-center gap-2 text-on-surface">
                        <Mail className="w-4 h-4 text-primary" /> {selectedAgent.email}
                      </p>
                    </div>
                    <div className="bg-surface-container-high p-4 rounded-xl border border-outline-variant/10">
                      <p className="text-xs text-on-surface-variant mb-1 font-semibold uppercase">Telepon/WhatsApp</p>
                      <p className="text-sm font-medium flex items-center gap-2 text-on-surface">
                        <Phone className="w-4 h-4 text-primary" /> {selectedAgent.phone}
                      </p>
                    </div>
                  </div>

                  {/* Profil Rekening/Bank (Agent Profile) */}
                  {selectedAgent.agent_profile && (
                    <div className="bg-surface-container-high p-4 rounded-xl border border-outline-variant/10">
                      <p className="text-xs text-on-surface-variant mb-3 font-semibold uppercase flex items-center gap-2">
                        <CreditCard className="w-4 h-4" /> Informasi Rekening Bank
                      </p>
                      
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between border-b border-outline-variant/10 pb-2">
                          <span className="text-on-surface-variant">Total Komisi</span>
                          <span className="font-bold text-emerald-400">Rp {Number(selectedAgent.agent_profile.total_commission).toLocaleString('id-ID')}</span>
                        </div>
                        {selectedAgent.agent_profile.bank_account_no ? (
                          <>
                            <div className="flex justify-between">
                              <span className="text-on-surface-variant">Atas Nama</span>
                              <span className="font-medium text-on-surface">{selectedAgent.agent_profile.account_holder || '-'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-on-surface-variant">No. Rekening</span>
                              <span className="font-medium text-on-surface">{selectedAgent.agent_profile.bank_account_no}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-on-surface-variant">Cabang Bank</span>
                              <span className="font-medium text-on-surface">{selectedAgent.agent_profile.bank_branch || '-'}</span>
                            </div>
                          </>
                        ) : (
                          <div className="text-center py-2 text-on-surface-variant text-xs italic">
                            Belum mendaftarkan informasi rekening bank.
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                </div>
              ) : (
                <div className="text-center py-12 text-on-surface-variant">Data tidak ditemukan.</div>
              )}
            </div>
            
            <div className="p-4 border-t border-outline-variant/20 bg-surface-container flex justify-end">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2 bg-surface-container-highest text-on-surface hover:text-white hover:bg-surface-container-highest/80 rounded-xl transition-colors font-medium text-sm"
              >
                Tutup
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
