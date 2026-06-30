"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings,
  LogOut,
  Menu,
  X,
  FileText
} from "lucide-react";

export default function AdminLayout({
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
    } else if (!isChecking && user?.role !== "admin") {
      // Redirect if not admin
      router.push("/login");
    }
  }, [isAuthenticated, isChecking, user, router]);

  if (isChecking || !isAuthenticated) {
    return <div className="min-h-screen bg-surface flex items-center justify-center text-primary">Memuat...</div>;
  }

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
    { name: "Pengguna & Agen", icon: Users, path: "/admin/users" },
    { name: "Manajemen Paket", icon: Package, path: "/admin/packages" },
    { name: "Transaksi", icon: ShoppingCart, path: "/admin/transactions" },
    { name: "CMS Konten", icon: FileText, path: "/admin/cms" },
    { name: "Pengaturan", icon: Settings, path: "/admin/settings" },
  ];

  return (
    <div className="min-h-screen bg-surface flex relative overflow-hidden w-full">
      <div className="absolute inset-0 ambient-shell-layer opacity-60 pointer-events-none z-0"></div>
      <div className="absolute inset-0 ambient-shell-grid opacity-30 pointer-events-none z-0"></div>

      {/* Sidebar Desktop */}
      <div className="hidden md:flex my-6 ml-6 sticky top-6 z-10 rounded-3xl p-[1px] bg-gradient-to-b from-primary/60 via-primary/10 to-primary/40 h-[calc(100vh-3rem)] shadow-xl shadow-black/20">
        <aside className="flex flex-col flex-shrink-0 w-[280px] bg-surface-container rounded-3xl h-full w-full">
          <div className="p-6 border-b border-outline-variant/30">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-fixed">
            Talita Umroh
          </h2>
          <p className="text-xs text-on-surface-variant mt-1">Admin Portal</p>
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
                  ? "bg-primary-container text-on-primary border border-primary/30 shadow-sm" 
                  : "text-on-surface hover:text-primary hover:bg-surface-container-high"
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? "text-on-primary" : "text-on-surface-variant"}`} />
                <span className="font-medium">{item.name}</span>
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-outline-variant/30">
          <button 
            onClick={logout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-error hover:bg-error-container hover:text-on-error-container transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Keluar</span>
          </button>
        </div>
      </aside>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen z-10 min-w-0 w-full">
        {/* Topbar Mobile */}
        <header className="md:hidden flex items-center justify-between p-4 surface-panel m-4 sticky top-4 z-20">
          <h2 className="text-xl font-bold text-primary">Talita Umroh</h2>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-on-surface">
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
                      isActive ? "bg-primary-container text-on-primary border border-primary/30 shadow-sm" : "text-on-surface"
                    }`}
                  >
                    <item.icon className={`w-5 h-5 ${isActive ? "text-on-primary" : "text-on-surface-variant"}`} />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                )
              })}
              <button 
                onClick={logout}
                className="flex items-center gap-3 w-full px-4 py-4 mt-4 rounded-xl text-error bg-error-container/20 border border-error/30"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Keluar</span>
              </button>
            </nav>
          </div>
        )}

        {/* Page Content */}
        <div className="flex-1 p-6 md:p-6 overflow-y-auto overflow-x-hidden relative h-screen">
          <div className="w-full max-w-screen-2xl mx-auto dashboard-3d-stage p-8 rounded-[32px] dashboard-card-soft border border-outline-variant/30 min-h-[calc(100vh-3rem)] shadow-lg shadow-black/20">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
