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
import FormReportExpense from "./form-report-expense";

const ButtonModalReportExpense = () => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-clr-pumpkin hover:bg-orange-600">Report</Button>
      </DialogTrigger>
      <DialogContent className="bg-clr-primary border-clr-pumpkin">
        <DialogHeader>
          <DialogTitle className="mb-2 font-bold text-lg text-center">
            Export Laporan Pengeluaran
          </DialogTitle>
          <DialogDescription className="mt-2" asChild>
            <FormReportExpense
              onSuccess={() => {
                setOpen(false);
              }}
            />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ButtonModalReportExpense;
