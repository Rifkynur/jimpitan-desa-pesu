"use client";
import React, { useState } from "react";
import { DataTable } from "../common/table-component";
import { PaginationComponent } from "../common/pagination-component";
import { Badge } from "../ui/badge";
import ModalEditMember from "./modal-edit-member";
import ModalDeleteData from "../common/modal-delete-data";

type Member = {
  id: number;
  name: string;
  rt: string;
  status: string;
};

const dummyData: Member[] = [
  { id: 1, name: "Waluyo", rt: "Rt 09", status: "active" },
  { id: 2, name: "Hardino", rt: "Rt 09", status: "active" },
  { id: 3, name: "Wahyuni", rt: "Rt 09", status: "inactive" },
];
const column = [
  {
    key: "name",
    label: "Name",
  },
  {
    key: "rt",
    label: "RT",
  },
  {
    key: "status",
    label: "Status",
    render: (row: any) =>
      row.status === "active" ? (
        <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>
      ) : (
        <Badge className="bg-red-500 hover:bg-red-600">Inactive</Badge>
      ),
  },
];

const MemberTable = () => {
  const [id, setId] = useState<string | number>("");
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleOpenEditMember = (id: string | number) => {
    setId(id);
    setOpenEditModal(true);
  };

  const handleDeleteMember = (id: string | number) => {
    setId(id);
    setOpenDeleteModal(true);
  };
  return (
    <div>
      <ModalDeleteData
        id={id}
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
      />
      <ModalEditMember
        open={openEditModal}
        setOpen={setOpenEditModal}
        id={id}
      />
      <DataTable
        data={dummyData}
        columns={column}
        showActions
        onEdit={handleOpenEditMember}
        onDelete={handleDeleteMember}
      />
      <PaginationComponent />
    </div>
  );
};

export default MemberTable;
