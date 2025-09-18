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

const data = [
  {
    name: "Warga 1",
    values: [
      "Rp.5000",
      "Rp.4000",
      "Rp.3000",
      "Rp.2000",
      "Rp.4000",
      "Rp.4000",
      "Rp.4000",
      "Rp.4000",
      "Rp.4000",
      "Rp.4000",
      "Rp.4000",
      "Rp.4000",
      "Rp.4000",
      "Rp.4000",
      "Rp.4000",
      "Rp.4000",
      "Rp.4000",
      "Rp.4000",
      "Rp.4000",
      "Rp.4000",
      "Rp.4000",
    ],
  },
  { name: "Warga 2", values: ["Rp.1500", "Rp.1500", "Rp.2500", "Rp.3000"] },
  { name: "Warga 2", values: ["Rp.1500", "Rp.1500", "Rp.2500", "Rp.3000"] },
];

const TableCashflow = () => {
  return (
    <div className="overflow-x-auto max-w-[100vw] w-full bg-card-background custom-scroll ">
      <Table className="">
        <TableHeader>
          <TableRow>
            <TableHead className="sticky left-0 text-white z-10  py-2 font-bold bg-[#221c17]">
              Nama
            </TableHead>
            <TableHead className="text-white py-2 font-bold">
              12-08-2024
            </TableHead>
            <TableHead className="text-white py-2 font-bold">
              24-08-2024
            </TableHead>
            <TableHead className="text-white py-2 font-bold">
              05-09-2024
            </TableHead>
            <TableHead className="text-white py-2 font-bold">
              14-09-2024
            </TableHead>
            <TableHead className="text-white py-2 font-bold">
              14-09-2024
            </TableHead>
            <TableHead className="text-white py-2 font-bold">
              14-09-2024
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, i) => (
            <TableRow key={i}>
              <TableCell className="sticky left-0 p-2 font-medium z-10  text-white bg-[#221c17]">
                {row.name}
              </TableCell>
              {row.values.map((v, idx) => (
                <TableCell key={idx}>
                  <div className="flex items-center py-2 justify-between">
                    <span>{v}</span>
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
                        <DropdownMenuItem onClick={() => alert(`Edit ${v}`)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => alert(`Hapus ${v}`)}>
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableCashflow;
