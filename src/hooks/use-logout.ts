import { useFetchApi } from "./use-fetch-api";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth-store";
import { useMutation,useQueryClient } from "@tanstack/react-query";

export const useLogout = () => {
  const { logouts } = useAuthStore();
  const { sendRequest } = useFetchApi();

  const queryClient = useQueryClient()
  const {mutate} = useMutation({
    mutationFn:async() =>{
      await sendRequest({ url: "auth/loguot", method: "post" });
      logouts();
    },onSuccess:()=>{
      toast.success("Berhasil Logout");
      queryClient.invalidateQueries({queryKey:["check-auth"]})
    },onError:()=>{
      toast.error("Gagal Logout");
    }
  })
  const logout = async () => {
    mutate()
    
  };
  return logout;
  
};
