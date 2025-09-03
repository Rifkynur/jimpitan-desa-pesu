import React from "react";
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
import FormAddUser from "./form-add-member";

const ButtonOpenModalAddMember = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-clr-pumpkin hover:bg-orange-600">Add</Button>
      </DialogTrigger>
      <DialogContent className="bg-clr-primary">
        <DialogHeader>
          <DialogTitle>Tambahkan Warga Baru</DialogTitle>
          <DialogDescription className="mt-2" asChild>
            <FormAddUser />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ButtonOpenModalAddMember;
