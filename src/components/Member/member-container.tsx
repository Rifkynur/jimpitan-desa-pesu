"use client";
import React, { useState } from "react";
import MemberTable from "./member-table";
import SearchMember from "./search-member";
import ButtonOpenModalAddMember from "./button-open-modal-add";
import FilterSelectRt from "./filterSelectRt";

const MemberContainer = () => {
  const [selectRt, setSelectRt] = useState("");
  return (
    <div>
      <div className="mb-2 flex items-center gap-2">
        <FilterSelectRt />
        <SearchMember />
        <ButtonOpenModalAddMember />
      </div>
      <MemberTable />
    </div>
  );
};

export default MemberContainer;
