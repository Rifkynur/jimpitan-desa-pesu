"use client";
import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useFetchApi } from "@/hooks/use-fetch-api";
import { toast } from "sonner";
import SelectRt from "../common/select-rt-form";

type FormAddMemberProps = {
  onSuccess: () => void;
};
const formSchema = z.object({
  name: z.string().min(3, {
    message: "Nama minimal 3 karakter",
  }),
  rtId: z.string().min(1, { message: "Rt wajib diisi" }),
});

const FormAddMember = ({ onSuccess }: FormAddMemberProps) => {
  const { sendRequest, loading } = useFetchApi();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      rtId: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const addMember = async () => {
      const handleAddMember = await sendRequest({
        url: "members",
        method: "post",
        data: values,
      });
      if (handleAddMember) {
        toast.success("Berhasil Menambah Warga Baru");
        onSuccess();
      } else {
        toast.error("Gagal Menambah Warga Baru");
      }
    };
    addMember();
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Username */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama</FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan nama" {...field} />
                </FormControl>
                <FormMessage className="text-left" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rtId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rt</FormLabel>
                <div className="relative">
                  <FormControl>
                    <SelectRt value={field.value} onChange={field.onChange} />
                  </FormControl>
                </div>
                <FormMessage className="text-left" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full cursor-pointer bg-clr-pumpkin hover:!bg-orange-600"
            disabled={loading}
          >
            Tambah
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default FormAddMember;
