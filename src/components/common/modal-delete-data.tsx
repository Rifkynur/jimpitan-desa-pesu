"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useFetchApi } from "@/hooks/use-fetch-api";
import { toast } from "sonner";
import { useMutation,useQueryClient } from "@tanstack/react-query";

type modalDeleteData = {
  id: string | number;
  open: boolean;
  setOpen: (value: boolean) => void;
  url?: string;
  queryKey:string | string[]
};

const ModalDeleteData = ({
  id,
  open,
  setOpen,
  url,
  queryKey
  
}: modalDeleteData) => {
  const { sendRequest } = useFetchApi();
  const queryClient = useQueryClient()

  const deleteMutation = useMutation({
    mutationFn:async () =>{
      const handleDeleteData = await sendRequest({
      url: `${url}/${id}`,
      method: "delete",
    });
    if(!handleDeleteData){
      throw new Error("Gagal menghapus data")
    }
  },onSuccess:()=>{
     toast.success("Berhasil Menghapus data");
    const keys = Array.isArray(queryKey) ? queryKey : [queryKey];

    keys.forEach((key) => {
      queryClient.invalidateQueries({ queryKey: [key] });
    });

     setOpen(false);
    },onError:()=>{
      toast.error("Gagal Menghapus Data");
    }
  })

  return (
    <Dialog open={open} onOpenChange={() => setOpen(false)}>
      <DialogContent className="bg-clr-primary border-clr-pumpkin">
        <DialogHeader>
          <DialogTitle className="mb-2 font-bold text-lg text-center">
            Hapus Data
          </DialogTitle>
          <DialogDescription className="mt-2 text-clr-silver" asChild>
            <div>
              <p>Data yang anda hapus tidak bisa dikembalikan lagi.</p>
              <p className="mt-1">Apakah anda yakin menghapus data ini?</p>
              <div className="flex items-center justify-end gap-2 mt-2">
                <Button
                  className="bg-clr-pumpkin cursor-pointer font-bold hover:bg-orange-500"
                  onClick={()=>deleteMutation.mutate()}
                  disabled={deleteMutation.isPending}
                >
                  Yakin
                </Button>
                <Button
                  className="bg-red-500 font-bold hover:bg-red-600 cursor-pointer"
                  onClick={() => setOpen(false)}
                  disabled={deleteMutation.isPending}
                >
                  Batal
                </Button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
export default ModalDeleteData;
