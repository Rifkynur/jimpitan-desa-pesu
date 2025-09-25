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
import FormAddUser from "./form-add-user";

type ButtonOpenModalAddUserProps = {
  onSuccess: () => void;
};
const ButtonOpenModalAddUser = ({ onSuccess }: ButtonOpenModalAddUserProps) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-clr-pumpkin hover:bg-orange-600">Add</Button>
      </DialogTrigger>
      <DialogContent className="bg-clr-primary border-clr-pumpkin">
        <DialogHeader>
          <DialogTitle className="mb-2 font-bold text-lg text-center">
            Tambahkan Petugas Baru
          </DialogTitle>
          <DialogDescription className="mt-2" asChild>
            <FormAddUser
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

export default ButtonOpenModalAddUser;
