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
import { SelectComponent } from "../common/select-component";
import SelectRT from "../common/select-rt";
import { useFetchApi } from "@/hooks/use-fetch-api";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";

type FormReportIncomeProps = {
  onSuccess: () => void;
};

const monthOptions = [
  { value: "1", label: "Januari" },
  { value: "2", label: "Februari" },
  { value: "3", label: "Maret" },
  { value: "4", label: "April" },
  { value: "5", label: "Mei" },
  { value: "6", label: "Juni" },
  { value: "7", label: "Juli" },
  { value: "8", label: "Agustus" },
  { value: "9", label: "September" },
  { value: "10", label: "Oktober" },
  { value: "11", label: "November" },
  { value: "12", label: "Desember" },
];

const currentYear = new Date().getFullYear();
const yearOptions = Array.from({ length: currentYear - 2019 }, (_, i) => {
  const year = 2020 + i;
  return { value: year.toString(), label: year.toString() };
});

const formSchema = z.object({
  rtId: z.string().min(1, { message: "RT wajib diisi" }),
  month: z.string().min(1, { message: "Bulan wajib dipilih" }),
  year: z.string().min(1, { message: "Tahun wajib dipilih" }),
});

const FormReportIncome = ({ onSuccess }: FormReportIncomeProps) => {
  const { sendRequest } = useFetchApi();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rtId: "",
      month: (new Date().getMonth() + 1).toString(),
      year: currentYear.toString(),
    },
  });

  const [isDownloading, setIsDownloading] = useState(false);

  // Fetch RT data untuk mendapatkan nama RT (sama format dengan SelectRT)
  const { data: allRt } = useQuery({
    queryKey: ["rt-select"],
    queryFn: async () => {
      const res = await sendRequest({
        url: "rt",
      });
      const mappedRt = res.allRt.map((rt: any) => ({
        value: rt.id,
        label: rt.name,
      }));
      return mappedRt;
    },
    staleTime: 1000 * 60 * 30,
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsDownloading(true);

      // Cari nama RT berdasarkan rtId
      const selectedRt = allRt?.find((rt: any) => rt.value === values.rtId);
      const rtName = selectedRt?.label || values.rtId;

      console.log("Looking for rtId:", values.rtId);
      console.log("All RT:", allRt);
      console.log("Selected RT:", selectedRt);
      console.log("RT Name:", rtName);

      const res = await sendRequest({
        url: "income-export/excel",
        method: "get",
        params: {
          rtId: values.rtId,
          month: parseInt(values.month),
          year: parseInt(values.year),
        },
        responseType: "blob",
      });

      if (res) {
        // Create blob and download
        const blob = new Blob([res], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `Laporan-Pemasukan-RT-${rtName}-${values.month}-${values.year}.xlsx`;
        document.body.appendChild(a);
        a.click();

        // Cleanup
        setTimeout(() => {
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
        }, 100);

        toast.success("Berhasil Download Laporan");
        onSuccess();
        form.reset();
      } else {
        toast.error("Gagal Download Laporan");
      }
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Terjadi kesalahan saat download");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="rtId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>RT</FormLabel>
                <FormControl>
                  <SelectRT onChange={field.onChange} value={field.value} />
                </FormControl>
                <FormMessage className="text-left" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="month"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bulan</FormLabel>
                <FormControl>
                  <SelectComponent
                    options={monthOptions}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Pilih Bulan"
                    className="!w-full"
                  />
                </FormControl>
                <FormMessage className="text-left" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tahun</FormLabel>
                <FormControl>
                  <SelectComponent
                    options={yearOptions}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Pilih Tahun"
                    className="!w-full"
                  />
                </FormControl>
                <FormMessage className="text-left" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full cursor-pointer bg-clr-pumpkin hover:!bg-orange-600"
            disabled={isDownloading || !form.watch("rtId")}
          >
            {isDownloading ? "Downloading..." : "Download Report"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default FormReportIncome;
