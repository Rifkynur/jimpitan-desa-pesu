"use client";
import React, { useEffect, useState } from "react";
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
import SelectRt from "@/components/common/select-rt-form";
import { useFetchApi } from "@/hooks/use-fetch-api";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

type FormAddUserProps = {
  onSuccess: () => void;
};

const formSchema = z.object({
  username: z.string().min(3, {
    message: "Nama minimal 3 karakter",
  }),
  rtId: z.string().min(1, { message: "Rt wajib diisi" }),
  password: z.string().min(4, { message: "Password Wajib diisi" }),
});

const FormAddUser = ({ onSuccess }: FormAddUserProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const { loading, sendRequest } = useFetchApi();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      rtId: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const addUser = async () => {
      const handleAddUser = await sendRequest({
        url: "users",
        method: "post",
        data: values,
      });
      if (handleAddUser) {
        toast.success("Berhasil Menambah Petugas Baru");
        onSuccess();
      } else {
        toast.error("Gagal Menambah Petugas Baru");
      }
    };
    addUser();
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
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Password</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Masukkan password"
                      {...field}
                      className="pr-10" // kasih space buat ikon
                    />
                  </FormControl>
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? (
                      <EyeOff size={18} className="cursor-pointer" />
                    ) : (
                      <Eye size={18} className="cursor-pointer" />
                    )}
                  </button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={loading}
            type="submit"
            className="w-full cursor-pointer bg-clr-pumpkin hover:!bg-orange-600"
          >
            Tambah
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default FormAddUser;
