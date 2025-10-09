"use client";
import React from "react";
import FormEditIncome from "./form-edit-income";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

type ModalEditIncomeProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  id: string | number;
  onSuccess: () => void;
};

const ModalEditIncome = ({
  open = false,
  setOpen,
  onSuccess,
  id,
}: ModalEditIncomeProps) => {
  return (
    <Dialog open={open} onOpenChange={() => setOpen(false)}>
      <DialogContent className="bg-clr-primary border-clr-pumpkin">
        <DialogHeader>
          <DialogTitle className="mb-2 font-bold text-lg text-center">
            Ubah Data Pemasukan
          </DialogTitle>
          <DialogDescription className="mt-2" asChild>
            <FormEditIncome
              id={id}
              onSuccess={() => {
                onSuccess();
                setOpen(false);
              }}
            />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ModalEditIncome;
