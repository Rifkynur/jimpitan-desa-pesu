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

const formSchema = z.object({
  username: z.string().min(3, {
    message: "Nama minimal 3 karakter",
  }),
  rt_id: z.string().min(1, { message: "rt wajib diisi" }),
  status_id: z.string().min(1, { message: "status wajib diisi" }),
});
const FormAddUser = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
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
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan username" {...field} />
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
                    <Input
                      type={"text"}
                      placeholder="Pilih Rt"
                      {...field}
                      className="pr-10"
                    />
                  </FormControl>
                </div>
                <FormMessage className="text-left" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      type={"text"}
                      placeholder="Status"
                      {...field}
                      className="pr-10"
                    />
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
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default FormAddUser;
