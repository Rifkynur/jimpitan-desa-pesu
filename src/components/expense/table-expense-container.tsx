"use client";
import React, { useState } from "react";
import TableExpense from "./table-expense";
import { DataTable } from "../common/table-component";
import ModalDeleteData from "../common/modal-delete-data";
import ModalEditExpense from "./modal-edit-expense";
import { expense } from "@/types/expense-type";
import { formatDate } from "@/app/utils/date-formatted";
import SpinnerLoader from "../common/spiner-loading";
import { PaginationComponent } from "../common/pagination-component";

type TableExpenseContainerProps = {
  onSuccess: () => void;
  expense: expense;
  loading: boolean;
  page: number;
  totalPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};
const TableExpenseContainer = ({
  expense,
  onSuccess,
  loading,
  setPage,
  page,
  totalPage,
}: TableExpenseContainerProps) => {
  const [id, setId] = useState<string>("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const column = [
    {
      key: "date",
      label: "Tanggal",
    },
    {
      key: "amount",
      label: "Total",
    },
    {
      key: "description",
      label: "Keterangan",
    },
  ];

  const formatedExpense = expense.data.map((data) => ({
    id: data.id,
    date: formatDate(data.date),
    amount: data.amount,
    description: data.desc,
  }));

  const handleDeleteExpense = (id: string) => {
    setId(id);
    setOpenDeleteModal(true);
  };

  const handleEditExpense = (id: string) => {
    setId(id);
    setOpenEditModal(true);
  };
  return (
    <>
      <ModalDeleteData
        id={id}
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        onSuccess={onSuccess}
        url="expense"
      />
      <ModalEditExpense
        open={openEditModal}
        setOpen={setOpenEditModal}
        id={id}
      />
      {loading ? (
        <SpinnerLoader />
      ) : (
        <>
          <DataTable
            columns={column}
            data={formatedExpense}
            showActions
            onDelete={handleDeleteExpense}
            onEdit={handleEditExpense}
          />
          <PaginationComponent
            page={page}
            totalPage={totalPage}
            setPage={setPage}
          />
        </>
      )}
    </>
  );
};

export default TableExpenseContainer;
