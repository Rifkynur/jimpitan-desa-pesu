"use client";
import React, { useState } from "react";
import { SelectComponent } from "../common/select-component";

const FilterSelectRt = () => {
  const [selectedRt, setSelectedRt] = useState("");

  const options = [
    { value: "id rt 09", label: "RT 09" },
    { value: "id rt 10", label: "rt 10" },
    { value: "id rt 11", label: "rt 11" },
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
