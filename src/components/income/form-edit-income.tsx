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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useFetchApi } from "@/hooks/use-fetch-api";
import { toast } from "sonner";

type FormEditIncomeProps = {
  onSuccess: () => void;
  id: string | number;
};

const formSchema = z.object({
  amount: z
    .string()
    .regex(/^\d+$/, { message: "Hanya boleh angka" })
    .min(1, { message: "Jumlah Pengeluaran wajib diisi" }),
  date: z.date().refine((val) => !!val, {
    message: "Tanggal wajib diisi",
  }),
});
const FormEditIncome = ({ id, onSuccess }: FormEditIncomeProps) => {
  const [openCalendar, setOpenCalendar] = useState(false);
  const { sendRequest } = useFetchApi();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      date: new Date(),
    },
  });

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const payload = {
        ...values,
        date: format(values.date, "yyyy-MM-dd"),
        amount: Number(values.amount),
      };
      const res = await sendRequest({
        url: `income/${id}`,
        method: "patch",
        data: payload,
      });
      if (!res) {
        throw new Error("Gagal menambah data");
      }
    },
    onSuccess: () => {
      toast.success("Berhasil Mengubah Data");
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["income"] });
      queryClient.invalidateQueries({ queryKey: ["total-income"] });
      queryClient.invalidateQueries({ queryKey: ["cashflow"] });
      queryClient.invalidateQueries({ queryKey: ["pie-chart"] });
      queryClient.invalidateQueries({ queryKey: ["bar-chart"] });
      onSuccess();
    },
    onError: () => {
      toast.error("Gagal Mengubah Data");
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }
  const { data: incomeDetail } = useQuery({
    queryKey: ["income", id],
    queryFn: async () => {
      const res = await sendRequest({ url: `income/${id}` });
      return res.data;
    },
  });
  useEffect(() => {
    if (incomeDetail) {
      form.reset({
        amount: incomeDetail?.amount.toString(),
        date: new Date(incomeDetail?.date),
      });
    }
  }, [incomeDetail]);

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jumlah</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      placeholder="Masukkan Jumlah Pengeluaran"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value)}
                      autoComplete="off"
                    />
                  </FormControl>
                </div>
                <FormMessage className="text-left" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Tanggal</FormLabel>
                <Popover open={openCalendar} onOpenChange={setOpenCalendar}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full bg-transparent border-clr-pumpkin pl-3 text-left font-normal hover:bg-[#ffffff50]",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span className="text-white">Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      classNames={{
                        nav_button:
                          "h-8 w-8 rounded-md bg-clr-pumpkin text-white hover:bg-clr-pumpkin/90",
                        nav_button_previous: "absolute left-2",
                        nav_button_next: "absolute right-2",
                        caption_label: "text-lg font-semibold text-clr-silver",
                        today: "bg-slate-700 rounded-lg text-white",
                        selected: "bg-red-700 text-red-500 rounded-lg",
                      }}
                      mode="single"
                      selected={field.value}
                      onSelect={(date) => {
                        field.onChange(date);
                        setOpenCalendar(false);
                      }}
                      initialFocus
                      captionLayout="label"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full cursor-pointer bg-clr-pumpkin hover:!bg-orange-600"
            disabled={isPending}
          >
            Tambah
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default FormEditIncome;
