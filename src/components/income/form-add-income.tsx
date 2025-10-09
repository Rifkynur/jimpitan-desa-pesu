"use client";
import React, { useState } from "react";
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
import SelectMember from "../common/select-member";

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

type FormAddIncomeProps = {
  onSuccess: () => void;
};

const formSchema = z.object({
  memberId: z.string().min(1, { message: "Nama wajib diisi" }),
  amount: z
    .string()
    .regex(/^\d+$/, { message: "Hanya boleh angka" })
    .min(1, { message: "Jumlah Pengeluaran wajib diisi" }),
  date: z.date().refine((val) => !!val, {
    message: "Tanggal wajib diisi",
  }),
});
const FormAddIncome = ({ onSuccess }: FormAddIncomeProps) => {
  const [openCalendar, setOpenCalendar] = useState(false);
  const { loading, sendRequest } = useFetchApi();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      memberId: "",
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
        url: "/income",
        method: "post",
        data: payload,
      });
      if (res) {
        toast.success("Berhasil Menambah Data Baru");
        onSuccess();
      } else {
        toast.error("Gagal Menambah Data Baru");
      }
    };
    addIncome();
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="memberId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama</FormLabel>
                <FormControl>
                  <SelectMember onChange={field.onChange} value={field.value} />
                </FormControl>
                <FormMessage className="text-left" />
              </FormItem>
            )}
          />
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
                          <span className="text-white">Pilih tanggal</span>
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
          >
            Tambah
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default FormAddIncome;
