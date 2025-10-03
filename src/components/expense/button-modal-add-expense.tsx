"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import FormAddExpense from "./form-add-expense";

type ButtonModalAddExpenseProps = {
  onSuccess: () => void;
};
const ButtonModalAddExpense = ({ onSuccess }: ButtonModalAddExpenseProps) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-clr-pumpkin hover:bg-orange-600">Add</Button>
      </DialogTrigger>
      <DialogContent className="bg-clr-primary border-clr-pumpkin">
        <DialogHeader>
          <DialogTitle className="mb-2 font-bold text-lg text-center">
            Tambahkan Pemasukan
          </DialogTitle>
          <DialogDescription className="mt-2" asChild>
            <FormAddExpense
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

export default ButtonModalAddExpense;
