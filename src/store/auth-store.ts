import { create } from "zustand";
import Cookies from "js-cookie";

// cookie tidak bisa terbaca oleh fe karena http only dan untuk auth belum selesai
type AuthState = {
  isLoggedIn: boolean;
  checkAuth: () => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  checkAuth: () => {
    const token = Cookies.get("jwt");
    console.log("checkAuth dijalankan, token:", token);
    set({ isLoggedIn: !!token });
  },
  logout: () => {
    Cookies.remove("jwt");
    set({ isLoggedIn: false });
  },
}));
