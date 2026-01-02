"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useFetchApi } from "@/hooks/use-fetch-api";
import { useAuthStore } from "@/store/auth-store";

const CheckAuth = () => {
  const { sendRequest } = useFetchApi();
  const { login, logouts } = useAuthStore();

  const { data } = useQuery({
    queryKey: ["check-auth"],
    queryFn: () =>
      sendRequest({
        method: "GET",
        url: "auth/checkAuth",
      }),

    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (data) {
      login(data.role?.name);
    } else {
      logouts();
    }
  }, [data]);

  return null;
};

export default CheckAuth;
