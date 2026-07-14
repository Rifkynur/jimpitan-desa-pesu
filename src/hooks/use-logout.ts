import { useFetchApi } from "./use-fetch-api";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth-store";
import { useMutation,useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const { logouts } = useAuthStore();
  const { sendRequest } = useFetchApi();
  const router = useRouter();

  const queryClient = useQueryClient()
  const {mutate} = useMutation({
    mutationFn:async() =>{
      // Catatan: route backend saat ini ternyata ber-typos "loguot".
      // Jangan diubah jadi "logout" sebelum route backend diperbaiki,
      // karena akan membuat request gagal.
      await sendRequest({ url: "auth/loguot", method: "post" });
    },onSuccess:()=>{
      // Bersihkan state auth agar sidebar berubah menjadi "Login"
      logouts();
      // Kosongkan cache check-auth (jangan di-invalidate) supaya CheckAuth
      // tidak men-trigger login() ulang dari data cache lama.
      queryClient.setQueryData(["check-auth"], null);
      toast.success("Berhasil Logout");
      router.push("/login");
    },onError:()=>{
      toast.error("Gagal Logout");
    }
  })
  const logout = async () => {
    mutate()

  };
  return logout;

};
