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
    <div className="min-h-screen bg-[#0a0a0a] text-white flex">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-72 bg-[#111111] border-r border-white/5 h-screen sticky top-0">
        <div className="p-6 border-b border-white/5">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">
            Talita Umroh
          </h2>
          <p className="text-xs text-gray-500 mt-1">Agent Portal</p>
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
                  ? "bg-emerald-600/10 text-emerald-400 border border-emerald-500/20" 
                  : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button 
            onClick={logout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Keluar</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Topbar Mobile */}
        <header className="md:hidden flex items-center justify-between p-4 bg-[#111111] border-b border-white/5 sticky top-0 z-20">
          <h2 className="text-xl font-bold text-emerald-400">Talita Umroh</h2>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-gray-400">
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </header>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 top-[69px] z-10 bg-[#0a0a0a]/95 backdrop-blur-sm p-4">
            <nav className="flex flex-col space-y-2">
              {menuItems.map((item) => {
                const isActive = pathname === item.path || pathname.startsWith(item.path + "/");
                return (
                  <Link 
                    key={item.path} 
                    href={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-4 rounded-xl ${
                      isActive ? "bg-emerald-600/10 text-emerald-400" : "text-gray-400"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                )
              })}
              <button 
                onClick={logout}
                className="flex items-center gap-3 w-full px-4 py-4 mt-4 rounded-xl text-red-400 bg-red-500/10"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Keluar</span>
              </button>
            </nav>
          </div>
        )}

        {/* Page Content */}
        <div className="flex-1 p-6 md:p-8 overflow-y-auto relative">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
