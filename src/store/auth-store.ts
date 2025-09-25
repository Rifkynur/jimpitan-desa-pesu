"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type AuthState = {
  isLoggedIn: boolean;
  role?: string | null;
  logouts: () => void;
  login: (role: string) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      logouts: () => set({ isLoggedIn: false, role: null }),
      login: (role: string) => set({ isLoggedIn: true, role }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
