"use client";
import React, { useEffect, useState } from "react";
import UserTable from "./user-table";
import FilterSelectRt from "../common/filter-select-rt";
import ButtonOpenModalAddUser from "./button-open-modal-add-user";
import SearchComponent from "../common/search-component";
import { useFetchApi } from "@/hooks/use-fetch-api";
import { user } from "@/types/user-type";
import { useAuthStore } from "@/store/auth-store";
import { useDebounce } from "use-debounce";

const UserContainer = () => {
  const { sendRequest, loading } = useFetchApi();

  const [selectedRt, setSelectedRt] = useState("");
  const [search, setSearch] = useState("");
  const [value] = useDebounce(search, 500);

  const [users, setUsers] = useState<user[]>([]);
  const { role } = useAuthStore();

  const getAllUser = async () => {
    const allUser = await sendRequest({
      url: "users",
      params: { rtId: selectedRt && selectedRt, search: value && value },
    });
    setUsers(allUser.allUsers);
  };
  useEffect(() => {
    getAllUser();
  }, [selectedRt, value]);

  return (
    <div>
      <div className="mb-2 flex items-center gap-2">
        <FilterSelectRt selectedRt={selectedRt} setSelectedRt={setSelectedRt} />
        <SearchComponent search={search} setSearch={setSearch} />
        {role == "admin" && <ButtonOpenModalAddUser onSuccess={getAllUser} />}
      </div>
      <UserTable users={users} loading={loading} onSuccess={getAllUser} />
    </div>
  );
};

export default UserContainer;
