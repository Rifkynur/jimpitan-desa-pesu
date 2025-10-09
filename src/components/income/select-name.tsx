import React, { useState } from "react";
import { SelectComponent } from "../common/select-component";

type selectNameProps = {
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string | number>>;
};
const SelectName = ({ value, onChange }: selectNameProps) => {
  const [selected, setSelected] = useState("");
  const selectOptions = [
    { value: "id nama warga 1", label: "waluyo" },
    { value: "id nama warga 2", label: "Ratiman" },
    { value: "id nama warga 3", label: "Parmono" },
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

export default SelectName;
