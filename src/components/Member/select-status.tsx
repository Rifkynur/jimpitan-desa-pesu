"use client";
import { useState, useEffect } from "react";
import { SelectComponent } from "../common/select-component";
import { useFetchApi } from "@/hooks/use-fetch-api";
import { SelectOption } from "@/types/select-option-type";
import { status_member } from "@/types/members-type";

type selectStatus = {
  value: string | number;
  onChange: React.Dispatch<React.SetStateAction<string | number>>;
};
const SelectStatus = ({ value, onChange }: selectStatus) => {
  const [allStatus, setAllStatus] = useState<SelectOption[]>([]);

  const { sendRequest } = useFetchApi();

  useEffect(() => {
    const getStatusMember = async () => {
      const res = await sendRequest({ url: "members/status" });
      const mapped = res.data.map((data: status_member) => ({
        value: data.id,
        label: data.name,
      }));
      setAllStatus(mapped);
      console.log(res.data);
    };
    getStatusMember();
  }, []);
  return (
    <SelectComponent
      placeholder="Pilih status"
      options={allStatus}
      onChange={onChange}
      value={value}
      className="!w-full"
    />
  );
};

export default SelectStatus;
