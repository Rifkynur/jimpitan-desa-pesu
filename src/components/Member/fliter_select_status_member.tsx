"use client";
import React, { useState, useEffect } from "react";
import { SelectComponent } from "../common/select-component";
import { useFetchApi } from "@/hooks/use-fetch-api";
import { SelectOption } from "@/types/select-option-type";
import { status_member } from "@/types/members-type";

type FilterSelectStatusMemberProps = {
  selectedStatusMember: string | number;
  setSelectedStatusMember: React.Dispatch<
    React.SetStateAction<string | number>
  >;
};

const FilterSelectStatusMember = ({
  selectedStatusMember,
  setSelectedStatusMember,
}: FilterSelectStatusMemberProps) => {
  const { sendRequest } = useFetchApi();
  const [optionStatusMember, setOptionStatusMember] = useState<SelectOption[]>(
    []
  );

  useEffect(() => {
    const getAllStatusMember = async () => {
      const allStatus = await sendRequest({ url: "members/status" });
      console.log(allStatus);

      const formatedOption: SelectOption[] = [
        { value: "all", label: "Semua" },

        ...allStatus.data.map((data: status_member) => ({
          value: data.id,
          label: data.name,
        })),
      ];
      setOptionStatusMember(formatedOption);
    };
    getAllStatusMember();
  }, []);

  return (
    <SelectComponent
      onChange={setSelectedStatusMember}
      options={optionStatusMember}
      value={selectedStatusMember}
      placeholder="Pilih Status"
    />
  );
};

export default FilterSelectStatusMember;
