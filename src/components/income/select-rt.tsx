"use client";
import React, { useState } from "react";
import { SelectComponent } from "../common/select-component";

type selectRtProps = {
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string | number>>;
};
const SelectRt = ({ onChange, value }: selectRtProps) => {
  const [selected, setSelected] = useState("");
  const selectOptions = [
    { value: "id rt 09", label: "Rt 09" },
    { value: "id rt 10", label: "Rt 10" },
    { value: "id rt 11", label: "Rt 11" },
  ];
  return (
    <SelectComponent
      options={selectOptions}
      value={value}
      onChange={onChange}
      placeholder="Pilih Rt"
      className="!w-full"
    />
  );
};

export default SelectRt;
