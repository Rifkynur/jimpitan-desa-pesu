"use client";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { log } from "console";
import { useState } from "react";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth-store";

export const useFetchApi = <T = unknown>() => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>("");
  const { logouts } = useAuthStore();

  const sendRequest = async (config: AxiosRequestConfig) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios({
        method: config.method ?? "get",
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/${config.url}`,
        data: config.data,
        headers: { "Content-Type": "application/json", ...config.headers },
        params: config.params,
        withCredentials: true,
        timeout: 10000, // 10 detik timeout
      });

      setData(response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;

        // Auto-logout jika 401 (Unauthorized)
        if (status === 401) {
          logouts();
          toast.error("Sesi habis, silakan login kembali");
          // Redirect ke login page (client-side only)
          if (typeof window !== "undefined") {
            window.location.href = "/login";
          }
          throw error;
        }

        // sekarang TypeScript tahu ini AxiosError
        const message = error.response?.data?.msg ?? error.message;
        console.log(message);
        setError(message);
      } else {
        // error bukan AxiosError
        console.log("Unexpected error:", error);
        setError("Ada Kesalahan");
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };
  return { data, loading, error, sendRequest };
};
