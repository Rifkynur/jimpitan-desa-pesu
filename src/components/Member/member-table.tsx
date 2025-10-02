"use client";
import React, { useState } from "react";
import { DataTable } from "../common/table-component";
import { PaginationComponent } from "../common/pagination-component";
import { Badge } from "../ui/badge";
import ModalEditMember from "./modal-edit-member";
import ModalDeleteData from "../common/modal-delete-data";
import { members } from "@/types/members-type";

type Member = {
  id: number | string;
  name: string;
  rt: string;
  status: string;
};

type MembertableProps = {
  onSuccess: () => void;
  members: members[];
};

// const dummyData: Member[] = [
//   { id: 1, name: "Waluyo", rt: "Rt 09", status: "active" },
//   { id: 2, name: "Hardino", rt: "Rt 09", status: "active" },
//   { id: 3, name: "Wahyuni", rt: "Rt 09", status: "inactive" },
// ];

const MemberTable = ({ onSuccess, members }: MembertableProps) => {
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

  const tableData = members.map((data, i) => ({
    id: data.id,
    name: data.name,
    rt: data.rt.name,
    status: data.Status_member.name,
  }));
  return (
    <div>
      <ModalDeleteData
        id={id}
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        onSuccess={onSuccess}
      />
      <ModalEditMember
        open={openEditModal}
        setOpen={setOpenEditModal}
        id={id}
      />
      <DataTable
        data={tableData}
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
