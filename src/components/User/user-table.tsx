"use client";
import React, { useState } from "react";
import { DataTable } from "../common/table-component";
import ModalDeleteData from "../common/modal-delete-data";
import ModalEditUser from "./modal-edit-user";
import { user } from "@/types/user-type";
import SpinnerLoader from "../common/spiner-loading";
import { useAuthStore } from "@/store/auth-store";

type UserTableProps = {
  users: user[];
  loading?: boolean;
  onSuccess: () => void;
};

const UserTable = ({ users, loading, onSuccess }: UserTableProps) => {
  const [id, setId] = useState<string>("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const { role } = useAuthStore();

  const handleDeleteModal = (id: string) => {
    setId(id);
    setOpenDeleteModal(true);
  };
  const handleEditModal = (id: string) => {
    setId(id);
    setOpenEditModal(true);
  };

  const column = [
    {
      key: "username",
      label: "Nama",
    },
    { key: "rt", label: "RT" },
  ];

  const tableData = users?.map((data) => ({
    id: data.id,
    username: data.username,
    rt: data.rt.name,
  }));

  const isShowAction = role == "admin";
  return (
    <div>
      <ModalDeleteData
        id={id}
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        url="users"
        onSuccess={onSuccess}
      />
      <ModalEditUser
        open={openEditModal}
        setOpen={setOpenEditModal}
        onSuccess={onSuccess}
        id={id}
      />
      {loading ? (
        <SpinnerLoader />
      ) : (
        <DataTable
          columns={column}
          data={tableData}
          showActions={isShowAction}
          onDelete={handleDeleteModal}
          onEdit={handleEditModal}
        />
      )}
    </div>
  );
};

export default UserTable;
