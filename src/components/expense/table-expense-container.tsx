"use client";
import React, { useState } from "react";
import TableExpense from "./table-expense";
import { DataTable } from "../common/table-component";
import { log } from "console";
import ModalDeleteData from "../common/modal-delete-data";
import ModalEditExpense from "./modal-edit-expense";

const TableExpenseContainer = () => {
  const [id, setId] = useState<string | number>("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const dataDummmy = [
    {
      id: 1,
      date: "12 juli 2022",
      amount: 20000,
      description: "Pembelian lampu",
    },
    {
      id: 2,
      date: "12 juli 2022",
      amount: 20000,
      description: "Pembelian lampu",
    },
    {
      id: 3,
      date: "12 juli 2022",
      amount: 20000,
      description: "Pembelian lampu",
    },
  ];

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

  const handleDeleteExpense = (id: string | number) => {
    setId(id);
    setOpenDeleteModal(true);
  };

  const handleEditExpense = (id: string | number) => {
    setId(id);
    setOpenEditModal(true);
  };
  return (
    <>
      <ModalDeleteData
        id={id}
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
      />
      <ModalEditExpense
        open={openEditModal}
        setOpen={setOpenEditModal}
        id={id}
      />
      <DataTable
        columns={column}
        data={dataDummmy}
        showActions
        onDelete={handleDeleteExpense}
        onEdit={handleEditExpense}
      />
    </>
  );
};

export default TableExpenseContainer;
