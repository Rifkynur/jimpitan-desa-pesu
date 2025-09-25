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
  id?: string | number;
};
const ModalEditUser = ({ open = false, setOpen }: modalEditMemberProps) => {
  return (
    <Dialog open={open} onOpenChange={() => setOpen(false)}>
      <DialogContent className="bg-clr-primary">
        <DialogHeader>
          <DialogTitle className="mb-2 font-bold text-lg text-center">
            Ubah Data Petugas
          </DialogTitle>
          <DialogDescription className="mt-2" asChild>
            <FormEditUser />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ModalEditUser;
