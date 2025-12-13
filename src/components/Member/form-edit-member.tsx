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
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

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
  const { sendRequest } = useFetchApi();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      rtId: "",
      status_memberId: "",
    },
  });

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const res = await sendRequest({
        url: `members/${id}`,
        method: "patch",
        data: values,
      });
      if (!res) {
        throw new Error("Gagal mengubah data");
      }
    },
    onSuccess: () => {
      onSuccess();
      form.reset();
      toast.success("Berhasil Mengubah Data Warga");
      queryClient.invalidateQueries({ queryKey: ["members"] });
      queryClient.invalidateQueries({ queryKey: ["income"] });
      queryClient.invalidateQueries({ queryKey: ["total-income"] });
    },
    onError: () => {
      toast.error("Gagal Mengubah data Warga");
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }

  const { data: detailUser } = useQuery({
    queryKey: ["members", id],
    queryFn: async () => {
      const res = await sendRequest({ url: `members/${id}` });
      return res;
    },
  });
  useEffect(() => {
    if (detailUser) {
      form.reset({
        name: detailUser?.data?.name,
        rtId: detailUser?.data?.rt.id,
        status_memberId: detailUser?.data.Status_member.id,
      });
    }
  }, [detailUser]);
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
            disabled={isPending}
          >
            Ubah
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default FormEditMember;
