"use client";
import React from "react";
import FormEditUser from "./form-edit-user";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";

type modalEditMemberProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  id: string;
};
const ModalEditUser = ({ open = false, setOpen, id }: modalEditMemberProps) => {
  return (
    <Dialog open={open} onOpenChange={() => setOpen(false)}>
      <DialogContent className="bg-clr-primary border-clr-pumpkin">
        <DialogHeader>
          <DialogTitle className="mb-2 font-bold text-lg text-center">
            Ubah Data Petugas
          </DialogTitle>
          <DialogDescription className="mt-2" asChild>
            <FormEditUser
              onSuccess={() => {
                setOpen(false);
              }}
              id={id}
            />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ModalEditUser;
