"use client";
import React, { useEffect, useState } from "react";
import MemberTable from "./member-table";
import SearchMember from "./search-member";
import ButtonOpenModalAddMember from "./button-open-modal-add";
import FilterSelectRt from "../common/filter-select-rt";
import { useFetchApi } from "@/hooks/use-fetch-api";
import { members } from "@/types/members-type";

const MemberContainer = () => {
  const [selectRt, setSelectRt] = useState("");
  const [allMember, setAllMember] = useState<members[]>([]);
  const { loading, sendRequest } = useFetchApi();

  const getAllMember = async () => {
    const res = await sendRequest({ url: "/members" });
    console.log(res.data);
    setAllMember(res.data);
  };

  useEffect(() => {
    getAllMember();
  }, []);
  return (
    <div>
      <div className="mb-2 flex items-center gap-2">
        <FilterSelectRt selectedRt={selectRt} setSelectedRt={setSelectRt} />
        <SearchMember />
        <ButtonOpenModalAddMember />
      </div>
      <MemberTable onSuccess={getAllMember} members={allMember} />
    </div>
  );
};

export default MemberContainer;
