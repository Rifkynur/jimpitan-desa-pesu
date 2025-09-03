"use client";
import React, { useState } from "react";
import { SelectComponent } from "../common/select-component";
const SelectRt = () => {
  const [selected, setSelected] = useState("");
  const selectOptions = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "cherry", label: "Cherry" },
  ];
  return (
    <SelectComponent
      options={selectOptions}
      value={selected}
      onChange={setSelected}
      placeholder="Pilih Rt"
    />
  );
};

export default SelectRt;
