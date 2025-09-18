"use client";
import React from "react";
import UserTable from "./user-table";
import SearchUser from "./search-user";
// import FilterSelectRt from "./filterSelectRt";
import FilterSelectRt from "../common/filter-select-rt";
import ButtonOpenModalAddUser from "./button-open-modal-add-user";

const UserContainer = () => {
  return (
    <div>
      <div className="mb-2 flex items-center gap-2">
        <FilterSelectRt />
        <SearchUser />
        <ButtonOpenModalAddUser />
      </div>
      <UserTable />
    </div>
  );
};

export default UserContainer;
