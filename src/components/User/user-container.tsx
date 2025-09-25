"use client";
import React, { useEffect, useState } from "react";
import UserTable from "./user-table";
import SearchUser from "./search-user";
import FilterSelectRt from "../common/filter-select-rt";
import ButtonOpenModalAddUser from "./button-open-modal-add-user";
import { useFetchApi } from "@/hooks/use-fetch-api";
import { user } from "@/types/user-type";

const UserContainer = () => {
  const { sendRequest, loading } = useFetchApi();
  const [users, setUsers] = useState<user[]>([]);
  const getAllUser = async () => {
    const allUser = await sendRequest({ url: "users" });
    setUsers(allUser.allUsers);
  };
  useEffect(() => {
    getAllUser();
  }, []);
  return (
    <div>
      <div className="mb-2 flex items-center gap-2">
        <FilterSelectRt />
        <SearchUser />
        <ButtonOpenModalAddUser onSuccess={getAllUser} />
      </div>
      <UserTable users={users} loading={loading} onSuccess={getAllUser} />
    </div>
  );
};

export default UserContainer;
