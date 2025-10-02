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

type modalDeleteData = {
  id: string | number;
  open: boolean;
  setOpen: (value: boolean) => void;
  url?: string;
  onSuccess: () => void;
};

const ModalDeleteData = ({
  id,
  open,
  setOpen,
  url,
  onSuccess,
}: modalDeleteData) => {
  const { sendRequest } = useFetchApi();
  const deleteData = async () => {
    const handleDeleteData = await sendRequest({
      url: `${url}/${id}`,
      method: "delete",
    });
    if (handleDeleteData) {
      toast.success("Berhasil Menghapus data");
      onSuccess();
    } else {
      toast.error("Gagal Menghapus Data");
    }
    setOpen(false);
  };
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
                  onClick={deleteData}
                >
                  Yakin
                </Button>
                <Button
                  className="bg-red-500 font-bold hover:bg-red-600 cursor-pointer"
                  onClick={() => setOpen(false)}
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
