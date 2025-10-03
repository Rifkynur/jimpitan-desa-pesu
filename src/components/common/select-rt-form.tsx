"use client";
import React, { useState, useEffect } from "react";
import { SelectComponent } from "./select-component";
import { useFetchApi } from "@/hooks/use-fetch-api";
import { Rt } from "@/types/rt-type";
import { SelectOption } from "@/types/select-option-type";

type selectRtProps = {
  value: string;
  onChange: (value: string) => void;
};
const SelectRt = ({ onChange, value }: selectRtProps) => {
  const [allRt, SetAllRt] = useState<SelectOption[]>([]);

  const { sendRequest } = useFetchApi();
  useEffect(() => {
    const getAllRt = async () => {
      const rt = await sendRequest({ url: "rt" });
      const mappedRt = rt.allRt.map((data: Rt) => ({
        value: data.id,
        label: `RT : ${data.name}`,
      }));
      SetAllRt(mappedRt);
    };

    getAllRt();
  }, []);
  return (
    <SelectComponent
      options={allRt}
      value={value}
      onChange={onChange}
      placeholder="Pilih Rt"
      className="!w-full"
    />
  );
};

export default SelectRt;
