"use client";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useFetchApi } from "@/hooks/use-fetch-api";
import { useAuthStore } from "@/store/auth-store";
import { useLogout } from "@/hooks/use-logout";

const CheckAuth = () => {
  const { sendRequest } = useFetchApi();
  const { isLoggedIn, login } = useAuthStore();
  const logout = useLogout();
  const { data, isError } = useQuery({
    queryKey: ["check-auth"],
    queryFn: async () => {
      const res = await sendRequest({
        method: "GET",
        url: "auth/checkAuth",
      });
      return res;
    },
  });
  useEffect(() => {
    if (data) {
      login(data?.role?.name);
      console.log(data);
    }
    if (isError) {
      logout();
    }
  }, [data]);
  return null;
};

export default CheckAuth;
