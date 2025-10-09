"use client";
import React, { useState, useEffect } from "react";
import { SelectComponent } from "./select-component";
import { useFetchApi } from "@/hooks/use-fetch-api";
import { SelectOption } from "@/types/select-option-type";
import { useAuthStore } from "@/store/auth-store";
import { MemberForm } from "@/types/members-type";

type selectRtProps = {
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string | number>>;
};
const SelectMember = ({ onChange, value }: selectRtProps) => {
  const [allMember, SetAllMember] = useState<SelectOption[]>([]);

  const { role } = useAuthStore();

  const { sendRequest } = useFetchApi();
  useEffect(() => {
    const getAllMember = async () => {
      const members = await sendRequest({
        url: "members",
        params: {
          role: role,
        },
      });
      const mappedMember = members.data.map((data: MemberForm) => ({
        value: data.id,
        label: `${data.name} - RT:(${data.rt.name})`,
      }));
      SetAllMember(mappedMember);
    };

    getAllMember();
  }, []);
  return (
    <SelectComponent
      options={allMember}
      value={value}
      onChange={onChange}
      placeholder="Pilih Warga"
      className="!w-full"
    />
  );
};

export default SelectMember;
