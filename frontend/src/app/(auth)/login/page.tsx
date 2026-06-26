"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import api from "@/lib/axios";
import { Loader2, Mail, Lock, AlertCircle } from "lucide-react";
import Link from "next/link";

import { isAxiosError } from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await api.post("/auth/login", { email, password });
      const { token, user } = response.data;
      
      login(token, user);
      
      // Redirect based on role
      if (user.role === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/agent/dashboard");
      }
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        setError(err.response?.data?.error || "Gagal melakukan login. Silakan periksa kembali kredensial Anda.");
      } else {
        setError("Gagal melakukan login. Silakan periksa kembali kredensial Anda.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0a0a0a] relative overflow-hidden">
      {/* Background Orbs (Glassmorphism effect) */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-600/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="z-10 w-full max-w-md p-8">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">Talita Umroh</h1>
          <p className="text-gray-400">Masuk ke dashboard keagenan Anda</p>
        </div>

        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl transition-all duration-300 hover:border-white/20 hover:shadow-emerald-500/10 hover:bg-white/10">
          <form onSubmit={handleLogin} className="space-y-6">
            
            {error && (
              <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl text-sm animate-in fade-in zoom-in duration-300">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p>{error}</p>
              </div>
            )}

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
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-medium text-gray-300">Password</label>
                <Link href="/forgot-password" className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors">
                  Lupa password?
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-500 group-focus-within:text-emerald-400 transition-colors">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 text-white rounded-2xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-300"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-4 rounded-2xl shadow-lg shadow-emerald-500/30 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-emerald-500/50 flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-emerald-500/30"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Memproses...
                </>
              ) : (
                "Masuk ke Dashboard"
              )}
            </button>
          </form>
        </div>
        
        <p className="text-center text-gray-500 mt-8 text-sm">
          Belum menjadi agen? <Link href="/register" className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors">Daftar sekarang</Link>
        </p>
      </div>
    </div>
  );
}
