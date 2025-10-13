"use client";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { log } from "console";
import { useState } from "react";
import { toast } from "sonner";

export const useFetchApi = <T = unknown>() => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>("");

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
      });

      setData(response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // sekarang TypeScript tahu ini AxiosError
        const message = error.response?.data?.msg ?? error.message;
        console.log(message);
        setError(message);
      } else {
        // error bukan AxiosError
        console.log("Unexpected error:", error);
        setError("Ada Kesalahan");
      }

      return null;
    } finally {
      setLoading(false);
    }
  };
  return { data, loading, error, sendRequest };
};
