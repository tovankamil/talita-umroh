"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Wallet, 
  User, 
  LogOut,
  Menu,
  X
} from "lucide-react";

export default function AgentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, checkAuth, logout } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    checkAuth();
    setIsChecking(false);
  }, [checkAuth]);

  useEffect(() => {
    if (!isChecking && !isAuthenticated) {
      router.push("/login");
    } else if (!isChecking && user?.role !== "agent") {
      // Redirect if not agent
      router.push("/login");
    }
  }, [isAuthenticated, isChecking, user, router]);

  if (isChecking || !isAuthenticated) {
    return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-emerald-500">Memuat...</div>;
  }

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/agent/dashboard" },
    { name: "Paket Umroh", icon: Package, path: "/agent/packages" },
    { name: "Transaksi", icon: ShoppingCart, path: "/agent/orders" },
    { name: "Komisi", icon: Wallet, path: "/agent/commissions" },
    { name: "Profil Saya", icon: User, path: "/agent/profile" },
  ];

  return (
    <div className="min-h-screen app-shell-bg flex relative overflow-hidden w-full">
      <div className="absolute inset-0 ambient-shell-layer opacity-60 pointer-events-none z-0"></div>
      <div className="absolute inset-0 ambient-shell-grid opacity-30 pointer-events-none z-0"></div>

      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col flex-shrink-0 w-[280px] surface-panel my-6 ml-6 rounded-3xl h-[calc(100vh-3rem)] sticky top-6 z-10 shadow-xl border border-white/60">
        <div className="p-6 border-b border-zinc-200/60">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-600">
            Talita Umroh
          </h2>
          <p className="text-xs text-zinc-500 mt-1">Agent Portal</p>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.path || pathname.startsWith(item.path + "/");
            return (
              <Link 
                key={item.path} 
                href={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                  ? "bg-teal-50 text-teal-700 border border-teal-200 shadow-sm" 
                  : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50"
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? "text-teal-600" : "text-zinc-400"}`} />
                <span className="font-medium">{item.name}</span>
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-zinc-200/60">
          <button 
            onClick={logout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Keluar</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen z-10 min-w-0 w-full">
        {/* Topbar Mobile */}
        <header className="md:hidden flex items-center justify-between p-4 surface-panel m-4 sticky top-4 z-20">
          <h2 className="text-xl font-bold text-teal-600">Talita Umroh</h2>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-zinc-600">
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </header>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 top-[80px] z-30 p-4">
            <nav className="flex flex-col space-y-2 surface-panel p-4 shadow-xl">
              {menuItems.map((item) => {
                const isActive = pathname === item.path || pathname.startsWith(item.path + "/");
                return (
                  <Link 
                    key={item.path} 
                    href={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-4 rounded-xl ${
                      isActive ? "bg-teal-50 text-teal-700 border border-teal-200 shadow-sm" : "text-zinc-600"
                    }`}
                  >
                    <item.icon className={`w-5 h-5 ${isActive ? "text-teal-600" : "text-zinc-400"}`} />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                )
              })}
              <button 
                onClick={logout}
                className="flex items-center gap-3 w-full px-4 py-4 mt-4 rounded-xl text-red-500 bg-red-50 border border-red-100"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Keluar</span>
              </button>
            </nav>
          </div>
        )}

        {/* Page Content */}
        <div className="flex-1 p-6 md:p-6 overflow-y-auto overflow-x-hidden relative h-screen">
          <div className="w-full max-w-screen-2xl mx-auto dashboard-3d-stage p-8 rounded-[32px] dashboard-card-soft border border-white/60 min-h-[calc(100vh-3rem)] shadow-lg shadow-teal-900/5">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
