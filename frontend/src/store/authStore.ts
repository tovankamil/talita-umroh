import { create } from 'zustand';
import Cookies from 'js-cookie';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  phone?: string;
  referral_code?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  
  login: (token, user) => {
    Cookies.set('token', token, { expires: 1 }); // expires in 1 day
    Cookies.set('user', JSON.stringify(user), { expires: 1 });
    set({ user, isAuthenticated: true });
  },
  
  logout: () => {
    Cookies.remove('token');
    Cookies.remove('user');
    set({ user: null, isAuthenticated: false });
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  },
  
  checkAuth: () => {
    const token = Cookies.get('token');
    const userStr = Cookies.get('user');
    
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        set({ user, isAuthenticated: true });
      } catch (e) {
        console.error("Failed to parse user from cookie", e);
        Cookies.remove('token');
        Cookies.remove('user');
        set({ user: null, isAuthenticated: false });
      }
    } else {
      set({ user: null, isAuthenticated: false });
    }
  },
}));
