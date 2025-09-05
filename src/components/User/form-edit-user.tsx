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
import SelectRt from "./select-rt";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Nama minimal 3 karakter",
  }),
  rt_id: z.string().min(1, { message: "Rt wajib diisi" }),
  status_id: z.string().min(1, { message: "Status warga wajib diisi" }),
});
const FormEditUser = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      rt_id: "",
      status_id: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
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
            name="rt_id"
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
          >
            Ubah
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default FormEditUser;
