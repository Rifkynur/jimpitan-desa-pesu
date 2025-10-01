"use client";
import React, { useEffect, useState } from "react";
import { SelectComponent } from "./select-component";

const FilterYear = () => {
  const [selectedYear, setSelectedYear] = useState("");

  const currentYear = new Date().getFullYear();

  const Options = Array.from({ length: currentYear - 2020 + 1 }, (_, i) => {
    const year = 2020 + i;
    return {
      label: year.toString(),
      value: year,
    };
  });
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
