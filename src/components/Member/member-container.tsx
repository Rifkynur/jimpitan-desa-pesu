"use client";
import React, { useEffect, useState } from "react";
import MemberTable from "./member-table";
import ButtonOpenModalAddMember from "./button-open-modal-add";
import FilterSelectRt from "../common/filter-select-rt";
import { useFetchApi } from "@/hooks/use-fetch-api";
import { members } from "@/types/members-type";
import { useDebounce } from "use-debounce";
import SearchComponent from "../common/search-component";
import FilterSelectStatusMember from "./fliter_select_status_member";
import { allMembers } from "@/types/members-type";

const MemberContainer = () => {
  const [selectedRt, setSelectRt] = useState<number | string>("");
  const [selectedStatusMember, setSelectedStatusMember] = useState<
    string | number
  >("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [allMember, setAllMember] = useState<allMembers>({
    data: [],
    status: "success",
    page: 1,
    totalData: 0,
    totalPage: 0,
  });
  const { loading, sendRequest } = useFetchApi();
  const [value] = useDebounce(search, 500);

  const getAllMember = async () => {
    const res = await sendRequest({
      url: "/members",
      params: {
        rtId: selectedRt && selectedRt,
        search: value && value,
        status: selectedStatusMember && selectedStatusMember,
        page: page,
      },
    });
    setPage(res.page);
    setTotalPage(res.totalPage);
    setAllMember(res);
  };

  useEffect(() => {
    getAllMember();
  }, [value, selectedRt, selectedStatusMember, page]);
  return (
    <div>
      <div className="mb-2 flex items-center gap-2">
        <FilterSelectRt selectedRt={selectedRt} setSelectedRt={setSelectRt} />
        <FilterSelectStatusMember
          selectedStatusMember={selectedStatusMember}
          setSelectedStatusMember={setSelectedStatusMember}
        />
        <SearchComponent search={search} setSearch={setSearch} />
        <ButtonOpenModalAddMember onSuccess={getAllMember} />
      </div>
      <MemberTable
        onSuccess={getAllMember}
        members={allMember}
        loading={loading}
        setPage={setPage}
        page={page}
        totalPage={totalPage}
      />
    </div>
  );
};

export default MemberContainer;
