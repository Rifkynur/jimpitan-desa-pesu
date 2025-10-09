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
import SelectName from "./select-name";

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
  const { loading, sendRequest } = useFetchApi();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      date: new Date(),
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const payload = {
      ...values,
      amount: Number(values.amount),
    };
    const addIncome = async () => {
      const res = await sendRequest({
        url: `income/${id}`,
        method: "patch",
        data: payload,
      });
      if (res) {
        toast.success("Berhasil Mengubah Data");
        onSuccess();
      } else {
        toast.error("Gagal Mengubah Data");
      }
    };
    addIncome();
  }
  useEffect(() => {
    const getDetailUsers = async () => {
      const incomeDetail = await sendRequest({ url: `income/${id}` });
      console.log(incomeDetail);

      if (incomeDetail) {
        form.reset({
          amount: incomeDetail.data.amount.toString(),
          date: new Date(incomeDetail.data.date),
        });
      }
    };
    getDetailUsers();
  }, []);
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
            disabled={loading}
          >
            Tambah
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default FormEditIncome;
