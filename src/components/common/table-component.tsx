// components/data-table.tsx
"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PencilLine, Trash2 } from "lucide-react";
import { DeleteModal } from "./delete-modal";

type Column<T> = {
  key: keyof T | string;
  label: string;
  render?: (row: T) => React.ReactNode;
};

type DataTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  showActions?: boolean;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
};

export function DataTable<T extends { id: string | number }>({
  data,
  columns,
  showActions = false,
  onEdit,
  onDelete,
}: DataTableProps<T>) {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState<string | number | null>(null);
  return (
    <div className="max-w-[100vw] overflow-x-auto  rounded-lg p-3 bg-card-background custom-scroll">
      <Table className="w-full  rounded-2xl ">
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead
                key={col.key.toString()}
                className="text-clr-silver font-bold text-center p-1 "
              >
                {col.label}
              </TableHead>
            ))}
            {showActions && (
              <TableHead className="text-clr-silver-v1 font-bold text-center  ">
                Aksi
              </TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((row) => (
              <TableRow key={row.id}>
                {columns.map((col) => (
                  <TableCell
                    key={col.key.toString()}
                    className="text-center   "
                  >
                    {col.render ? col.render(row) : (row as any)[col.key]}
                  </TableCell>
                ))}
                {showActions && (
                  <TableCell className="space-x-2 text-center">
                    {onEdit && (
                      <Button
                        size="sm"
                        className="bg-clr-yellow text-black hover:bg-amber-500 cursor-pointer"
                        //   variant="outline"
                        onClick={() => onEdit(row)}
                      >
                        <PencilLine />
                      </Button>
                    )}
                    {onDelete && (
                      <Button
                        className="cursor-pointer"
                        size="sm"
                        variant="destructive"
                        onClick={() => onDelete(row)}
                      >
                        <Trash2 />
                      </Button>
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length + (showActions ? 1 : 0)}>
                Tidak ada data
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {/* <DeleteModal /> */}
    </div>
  );
}
