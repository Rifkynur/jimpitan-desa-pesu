"use client";
import { useState } from "react";
import { SelectComponent } from "../common/select-component";

type selectStatus = {
  value: string;
  onChange: (value: string) => void;
};
const SelectStatus = ({ value, onChange }: selectStatus) => {
  const [selectedStatus, setSelectedStatus] = useState("");

  const options = [
    {
      value: "id active status",
      label: "Active",
    },
    {
      value: "id inactive status",
      label: "Inactive",
    },
  ];
  return (
    <SelectComponent
      placeholder="Pilih status"
      options={options}
      onChange={onChange}
      value={value}
      className="!w-full"
    />
  );
};

export default SelectStatus;
