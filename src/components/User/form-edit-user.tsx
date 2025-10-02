"use client";
import React, { useState, useEffect } from "react";
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
import { useFetchApi } from "@/hooks/use-fetch-api";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

type FormEditUserProps = {
  onSuccess: () => void;
  id: string;
};

const formSchema = z.object({
  username: z.string().min(3, {
    message: "Nama minimal 3 karakter",
  }),
  rtId: z.string().min(1, { message: "Rt wajib diisi" }),
  password: z.string().optional(),
});
const FormEditUser = ({ onSuccess, id }: FormEditUserProps) => {
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
    const updatedUser = async () => {
      const res = await sendRequest({
        url: `users/${id}`,
        method: "patch",
        data: values,
      });
      if (res) {
        toast.success("Berhasil Mengubah Petugas Baru");
        onSuccess();
      } else {
        toast.error("Gagal Mengubah Petugas Baru");
      }
    };
    updatedUser();
  }

  useEffect(() => {
    const getDetailUsers = async () => {
      const userDetail = await sendRequest({ url: `users/${id}` });
      if (userDetail) {
        form.reset({
          username: userDetail.detailUsers.username,
          rtId: userDetail.detailUsers.rt.id,
        });
      }
    };
    getDetailUsers();
  }, []);
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
            type="submit"
            className="w-full cursor-pointer bg-clr-pumpkin hover:!bg-orange-600"
            disabled={loading}
          >
            Ubah
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default FormEditUser;
