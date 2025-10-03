"use client";
import React, { useEffect } from "react";
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
import SelectStatus from "./select-status";
import SelectRt from "../common/select-rt-form";
import { useFetchApi } from "@/hooks/use-fetch-api";
import { toast } from "sonner";

type FormEditMemberProps = {
  id: string;
  onSuccess: () => void;
};

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Nama minimal 3 karakter",
  }),
  rtId: z.string().min(1, { message: "Rt wajib diisi" }),
  status_memberId: z.string().min(1, { message: "Status warga wajib diisi" }),
});
const FormEditMember = ({ id, onSuccess }: FormEditMemberProps) => {
  const { sendRequest, loading } = useFetchApi();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      rtId: "",
      status_memberId: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const updateMember = async () => {
      const res = await sendRequest({
        url: `members/${id}`,
        method: "patch",
        data: values,
      });
      if (res) {
        toast.success("Berhasil Mengubah Data Warga");
        onSuccess();
      } else {
        toast.error("Gagal Mengubah data Warga");
      }
    };
    updateMember();
  }
  useEffect(() => {
    const getDetailUsers = async () => {
      const memberDetail = await sendRequest({ url: `members/${id}` });
      console.log(memberDetail);

      if (memberDetail) {
        form.reset({
          name: memberDetail.data.name,
          rtId: memberDetail.data.rt.id,
          status_memberId: memberDetail.data.Status_member.id,
        });
      }
    };
    getDetailUsers();
  }, []);
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama</FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan Nama" {...field} />
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
            name="status_memberId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <div className="relative">
                  <FormControl>
                    <SelectStatus
                      value={field.value}
                      onChange={field.onChange}
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
            disabled={loading}
          >
            Ubah
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default FormEditMember;
