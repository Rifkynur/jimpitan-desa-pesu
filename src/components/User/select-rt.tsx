"use client";
import React, { useState, useEffect } from "react";
import { SelectComponent } from "../common/select-component";
import { useFetchApi } from "@/hooks/use-fetch-api";
import { Rt } from "@/types/rt-type";
import { Option } from "../common/select-component"; //type option

type selectRtProps = {
  value: string;
  onChange: (value: string) => void;
};
const SelectRt = ({ onChange, value }: selectRtProps) => {
  const [selected, setSelected] = useState("");
  const [allRt, SetAllRt] = useState<Option[]>([]);

  const { sendRequest } = useFetchApi();
  const selectOptions = [
    { value: "id rt 09", label: "Rt 09" },
    { value: "id rt 10", label: "Rt 10" },
    { value: "id rt 11", label: "Rt 11" },
  ];
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
