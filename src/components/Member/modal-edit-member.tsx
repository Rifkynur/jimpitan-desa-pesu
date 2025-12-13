"use client";
import React from "react";
import FormEditMember from "./form-edit-member";
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
const ModalEditMember = ({
  open = false,
  setOpen,
  id,
}: modalEditMemberProps) => {
  return (
    <Dialog open={open} onOpenChange={() => setOpen(false)}>
      <DialogContent className="bg-clr-primary border-clr-pumpkin">
        <DialogHeader>
          <DialogTitle className="mb-2 font-bold text-lg text-center">
            Ubah Data Warga
          </DialogTitle>
          <DialogDescription className="mt-2" asChild>
            <FormEditMember
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

export default ModalEditMember;
