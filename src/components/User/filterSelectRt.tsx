"use client";
import React, { useState } from "react";
import { SelectComponent } from "../common/select-component";

const FilterSelectRt = () => {
  const [selectedRt, setSelectedRt] = useState("");

  const options = [
    { value: "id rt 09", label: "Rt 09" },
    { value: "id rt 10", label: "Rt 10" },
    { value: "id rt 11", label: "Rt 11" },
  ];
  return (
    <SelectComponent
      onChange={setSelectedRt}
      options={options}
      value={selectedRt}
      placeholder="Pilih Rt"
    />
  );
};

export default FilterSelectRt;
