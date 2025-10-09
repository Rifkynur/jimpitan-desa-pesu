"use client";
import React, { useState } from "react";
import { PaginationComponent } from "../common/pagination-component";
import TableCashflow from "../common/table-income";
import ModalDeleteData from "../common/modal-delete-data";
import ModalEditIncome from "./modal-edit-income";
import TableIncome from "../common/table-income";
import { GetIncomeResponse } from "@/types/income-type";
import { formatDate } from "@/app/utils/date-formatted";

type IncomeTableProps = {
  page: number;
  totalPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  dataDetailIncome: GetIncomeResponse;
  loading: boolean;
  onSuccess: () => void;
};

const IncomeTable = ({
  page,
  totalPage,
  setPage,
  dataDetailIncome,
  loading,
  onSuccess,
}: IncomeTableProps) => {
  const [id, setId] = useState<string | number>("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const formattedData = dataDetailIncome.data.flatMap((rtGroup) =>
    rtGroup.members.map((member) => ({
      name: member.name,
      values: Object.entries(member.weeklyAmounts).flatMap(([date, amounts]) =>
        amounts.map((a) => ({
          id: a.id,
          amount: `Rp.${a.amount.toLocaleString("id-ID")}`,
          date: formatDate(date),
        }))
      ),
    }))
  );

  const handleDeleteIncome = (id: string | number) => {
    setId(id);
    setOpenDeleteModal(true);
  };

  const handleEditIncome = (id: string | number) => {
    setId(id);
    setOpenEditModal(true);
  };

  return (
    <>
      <ModalDeleteData
        id={id}
        setOpen={setOpenDeleteModal}
        open={openDeleteModal}
        loading={loading}
        onSuccess={onSuccess}
        url="income"
      />
      <ModalEditIncome
        open={openEditModal}
        id={id}
        setOpen={setOpenEditModal}
        onSuccess={onSuccess}
      />
      <div className="flex flex-col">
        <TableIncome
          data={formattedData}
          onDelete={handleDeleteIncome}
          onEdit={handleEditIncome}
        />
        <PaginationComponent
          page={page}
          totalPage={totalPage}
          setPage={setPage}
        />
      </div>
    </>
  );
};

export default IncomeTable;
