"use client";
import React from "react";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type AmountData = {
  id: string;
  amount: number | string;
};

type TableRowData = {
  name: string;
  values: AmountData[];
};

type TableIncomeProps = {
  data: TableRowData[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string | number) => void;
  // Tambahkan opsional headers manual kalau mau override
  headers?: string[];
};

const TableIncome = ({ data, onEdit, onDelete, headers }: TableIncomeProps) => {
  // 🔹 Ambil semua tanggal unik dari data (kalau headers belum dikirim)
  const dynamicHeaders =
    headers ??
    Array.from(
      new Set(
        data.flatMap((member) =>
          member.values.map((v: any) => v.date).filter(Boolean)
        )
      )
    );

  return (
    <div className="overflow-x-auto max-w-[100vw] w-full bg-card-background custom-scroll">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="sticky left-0 text-white z-10 py-2 font-bold bg-[#221c17]">
              Nama
            </TableHead>
            {dynamicHeaders.map((date) => (
              <TableHead
                key={date}
                className="text-white py-2 font-bold whitespace-nowrap"
              >
                {date}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((row, i) => (
            <TableRow key={i}>
              <TableCell className="sticky left-0 p-2 font-medium z-10 text-white bg-[#221c17]">
                {row.name}
              </TableCell>

              {dynamicHeaders.map((date) => {
                // cari amount di tanggal ini
                const value = row.values.find((v: any) => v.date === date);

                return (
                  <TableCell key={date}>
                    <div className="flex items-center py-2 justify-between">
                      <span>
                        {value ? value.amount : "Rp.0"}{" "}
                        {/* tampilkan Rp.0 jika tidak ada */}
                      </span>
                      {value && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="p-1 px-2 rounded hover:bg-muted">
                              <MoreVertical className="h-4 w-4" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="bg-[#00000080] text-white border-clr-pumpkin"
                          >
                            {onEdit && (
                              <DropdownMenuItem
                                onClick={() => onEdit(value.id)}
                              >
                                Edit
                              </DropdownMenuItem>
                            )}
                            {onDelete && (
                              <DropdownMenuItem
                                onClick={() => onDelete(value.id)}
                              >
                                Delete
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </div>
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableIncome;
