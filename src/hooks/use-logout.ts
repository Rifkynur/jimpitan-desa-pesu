import { useFetchApi } from "./use-fetch-api";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth-store";

export const useLogout = () => {
  const { logouts } = useAuthStore();
  const { sendRequest } = useFetchApi();
  const logout = async () => {
    try {
      await sendRequest({ url: "auth/loguot", method: "post" });
      logouts();
      toast.success("Berhasil Logout");
    } catch (error) {
      console.log(error);

      toast.error("Gagal Logout");
    }
  };
  return logout;
};
