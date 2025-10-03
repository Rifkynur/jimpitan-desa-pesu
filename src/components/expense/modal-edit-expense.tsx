"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import FormEditExpense from "./form-edit-expense";

type ModalEditIncomeProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  id: string;
};

const ModalEditExpense = ({ open = false, setOpen }: ModalEditIncomeProps) => {
  return (
    <Dialog open={open} onOpenChange={() => setOpen(false)}>
      <DialogContent className="bg-clr-primary border-clr-pumpkin">
        <DialogHeader>
          <DialogTitle className="mb-2 font-bold text-lg text-center">
            Ubah Data Pengeluaran
          </DialogTitle>
          <DialogDescription className="mt-2" asChild>
            <FormEditExpense />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ModalEditExpense;
