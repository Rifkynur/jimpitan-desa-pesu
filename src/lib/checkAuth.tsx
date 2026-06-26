"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuthStore } from "@/store/auth-store";

const CheckAuth = () => {
  const { login, logouts } = useAuthStore();

  const { data, error, isLoading } = useQuery({
    queryKey: ["check-auth"],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/checkAuth`,
        { withCredentials: true, timeout: 10000 }
      );
      return response.data;
    },

    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
  });

  useEffect(() => {
    // Hanya handle setelah loading selesai
    if (!isLoading) {
      if (data) {
        login(data.role?.name);
      } else if (error) {
        // Hanya logout jika ada error, bukan saat loading
        logouts();
      }
    }
  }, [data, error, isLoading, login, logouts]);

  return null;
};

export default CheckAuth;
