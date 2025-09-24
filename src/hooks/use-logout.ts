import { useFetchApi } from "./use-fetch-api";
import { toast } from "sonner";

export const useLogout = () => {
  const { sendRequest } = useFetchApi();
  const logout = async () => {
    try {
      await sendRequest({ url: "/auth/logout", method: "post" });
      toast.success("Berhasil Logout");
    } catch (error) {
      toast.error("Gagal Logout");
    }
  };
  return logout;
};
