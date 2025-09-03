import React from "react";
import SelectRt from "./select-rt";
import MemberTable from "./member-table";
import SearchMember from "./search-member";
import ButtonOpenModalAddMember from "./button-open-modal-add";

const MemberContainer = () => {
  return (
    <div>
      <div className="mb-2 flex items-center gap-2">
        <SelectRt />
        <SearchMember />
        <ButtonOpenModalAddMember />
      </div>
      <MemberTable />
    </div>
  );
};

export default MemberContainer;
