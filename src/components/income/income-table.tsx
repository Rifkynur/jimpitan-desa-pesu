"use client";
import React, { useState } from "react";
import { PaginationComponent } from "../common/pagination-component";
import TableCashflow from "../common/table-cashflow";
import ModalDeleteData from "../common/modal-delete-data";

const IncomeTable = () => {
  const [id, setId] = useState<string | number>("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const data = [
    {
      name: "Warga 1",
      values: [
        { id: "01", amount: "Rp.1500" },
        { id: "02", amount: "Rp.1500" },
        { id: "03", amount: "Rp.1500" },
        { id: "04", amount: "Rp.1500" },
      ],
    },
    {
      name: "Warga 2",
      values: [
        { id: "1", amount: "Rp.1500" },
        { id: "2", amount: "Rp.1500" },
        { id: "3", amount: "Rp.1500" },
        { id: "4", amount: "Rp.1500" },
      ],
    },
    {
      name: "Warga 2",
      values: [
        { id: "11", amount: "Rp.1500" },
        { id: "12", amount: "Rp.1500" },
        { id: "13", amount: "Rp.1500" },
        { id: "14", amount: "Rp.1500" },
      ],
    },
  ];

  const handleDeleteIncome = (id: string | number) => {
    setId(id);
    setOpenDeleteModal(true);
  };

  const handleEditIncome = (id: string | number) => {
    setId(id);
  };

  return (
    <>
      <ModalDeleteData
        id={id}
        setOpen={setOpenDeleteModal}
        open={openDeleteModal}
      />
      <div className="flex flex-col">
        <TableCashflow
          data={data}
          onDelete={handleDeleteIncome}
          onEdit={handleEditIncome}
        />
        <PaginationComponent />
      </div>
    </>
  );
};

export default IncomeTable;
