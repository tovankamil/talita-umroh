"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import api from "@/lib/axios";
import { Loader2, Mail, Lock, User, Phone, Tag, AlertCircle } from "lucide-react";
import Link from "next/link";
import { isAxiosError } from "axios";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [referralCode, setReferralCode] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await api.post("/auth/register", {
        name,
        email,
        phone,
        password,
        referral_code: referralCode || undefined
      });
      
      const { token, user } = response.data;
      
      // Auto login after successful registration
      login(token, user);
      
      // Redirect to agent dashboard
      router.push("/agent/dashboard");
      
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        setError(err.response?.data?.error || "Gagal melakukan pendaftaran. Silakan periksa kembali data Anda.");
      } else {
        setError("Terjadi kesalahan sistem. Silakan coba beberapa saat lagi.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0a0a0a] relative overflow-hidden py-12">
      {/* Background Orbs (Glassmorphism effect) */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-600/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="z-10 w-full max-w-md p-8">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">Talita Umroh</h1>
          <p className="text-gray-400">Bergabung menjadi Mitra Agen</p>
        </div>

        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl transition-all duration-300 hover:border-white/20 hover:shadow-emerald-500/10">
          <form onSubmit={handleRegister} className="space-y-5">
            
            {error && (
              <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl text-sm animate-in fade-in zoom-in duration-300">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p>{error}</p>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Nama Lengkap</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-500 group-focus-within:text-emerald-400 transition-colors">
                  <User className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 text-white rounded-2xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-300"
                  placeholder="Nama Lengkap Anda"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-500 group-focus-within:text-emerald-400 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 text-white rounded-2xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-300"
                  placeholder="email@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Nomor WhatsApp</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-500 group-focus-within:text-emerald-400 transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 text-white rounded-2xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-300"
                  placeholder="08123456789"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-500 group-focus-within:text-emerald-400 transition-colors">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 text-white rounded-2xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-300"
                  placeholder="Minimal 6 karakter"
                  required
                  minLength={6}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-medium text-gray-300">Kode Referral (Opsional)</label>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-500 group-focus-within:text-emerald-400 transition-colors">
                  <Tag className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 text-white rounded-2xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-300 uppercase"
                  placeholder="Masukkan jika ada"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-4 mt-2 rounded-2xl shadow-lg shadow-emerald-500/30 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-emerald-500/50 flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-emerald-500/30"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Memproses...
                </>
              ) : (
                "Daftar Jadi Mitra"
              )}
            </button>
          </form>
        </div>
        
        <p className="text-center text-gray-500 mt-8 text-sm">
          Sudah memiliki akun? <Link href="/login" className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors">Masuk di sini</Link>
        </p>
      </div>
    </div>
  );
}
