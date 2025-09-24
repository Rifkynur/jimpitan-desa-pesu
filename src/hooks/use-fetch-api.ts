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
        headers: config.headers,
        params: config.params,
        withCredentials: true,
      });

      setData(response.data);
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ msg: string }>;
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };
  return { data, loading, error, sendRequest };
};
