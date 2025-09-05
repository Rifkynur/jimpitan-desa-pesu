"use client";
import React, { useState } from "react";
import { DataTable } from "../common/table-component";
import ModalDeleteData from "../common/modal-delete-data";
import ModalEditUser from "./modal-edit-user";

type user = {
  id: string | number;
  rt: string;
  username: string;
};

const dataDummmy = [
  {
    id: 1,
    rt: "RT 09",
    username: "wawan",
  },
  {
    id: 2,
    rt: "RT 10",
    username: "Endar",
  },
  {
    id: 3,
    rt: "RT 11",
    username: "Andika",
  },
];

const column = [
  {
    key: "username",
    label: "Username",
  },
  {
    key: "rt",
    label: "Rt",
  },
];

const UserTable = () => {
  const [id, setId] = useState<string | number>("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const handleDeleteModal = (id: string | number) => {
    setId(id);
    setOpenDeleteModal(true);
  };
  const handleEditModal = (id: string | number) => {
    setId(id);
    setOpenEditModal(true);
  };
  return (
    <div>
      <ModalDeleteData
        id={id}
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
      />
      <ModalEditUser open={openEditModal} setOpen={setOpenEditModal} />
      <DataTable
        columns={column}
        data={dataDummmy}
        showActions
        onDelete={handleDeleteModal}
        onEdit={handleEditModal}
      />
    </div>
  );
};

export default UserTable;
