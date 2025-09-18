"use client";
import React, { useState } from "react";
import { SelectComponent } from "./select-component";

const FilterYear = () => {
  const [selectedYear, setSelectedYear] = useState("");
  const Options = [
    { label: "2022", value: 2022 },
    { label: "2023", value: 2023 },
    { label: "2024", value: 2024 },
    { label: "2025", value: 2025 },
  ];
  return (
    <>
      <SelectComponent
        onChange={setSelectedYear}
        options={Options}
        placeholder="Pilih Tahun..."
        value={selectedYear}
      />
    </>
  );
};

export default FilterYear;
