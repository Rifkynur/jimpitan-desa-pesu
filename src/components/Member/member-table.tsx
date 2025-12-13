"use client";
import React, { useState } from "react";
import { DataTable } from "../common/table-component";
import { PaginationComponent } from "../common/pagination-component";
import { Badge } from "../ui/badge";
import ModalEditMember from "./modal-edit-member";
import ModalDeleteData from "../common/modal-delete-data";
import { members } from "@/types/members-type";
import SpinnerLoader from "../common/spiner-loading";
import { useAuthStore } from "@/store/auth-store";
import { allMembers } from "@/types/members-type";

type Member = {
  id: string;
  name: string;
  rt: string;
  status: string;
};

type MembertableProps = {
  members: allMembers;
  loading: boolean;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  totalPage: number;
};

const MemberTable = ({
  members,
  loading,
  setPage,
  page,
  totalPage,
}: MembertableProps) => {
  const [id, setId] = useState<string>("");
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const { isLoggedIn } = useAuthStore();

  const handleOpenEditMember = (id: string) => {
    setId(id);
    setOpenEditModal(true);
  };

  const handleDeleteMember = (id: string) => {
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

  const tableData = members?.data?.map((data, i) => ({
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
        url={"members"}
        queryKey={["members", "total-income", "income"]}
      />
      <ModalEditMember
        open={openEditModal}
        setOpen={setOpenEditModal}
        id={id}
      />
      {loading ? (
        <SpinnerLoader />
      ) : (
        <>
          <DataTable
            data={tableData}
            columns={column}
            showActions={isLoggedIn}
            onEdit={handleOpenEditMember}
            onDelete={handleDeleteMember}
          />
          <PaginationComponent
            page={page}
            setPage={setPage}
            totalPage={totalPage}
          />
        </>
      )}
    </div>
  );
};

export default MemberTable;
