"use client";
import React, { useEffect, useState } from "react";
import { SelectComponent } from "./select-component";

type FilterYearProps = {
  year: number | string;
  setYear: React.Dispatch<React.SetStateAction<number | string>>;
};
const FilterYear = ({ year, setYear }: FilterYearProps) => {
  const currentYear = new Date().getFullYear();

  const Options = [
    { label: "All", value: "all" },
    ...Array.from({ length: currentYear - 2020 + 1 }, (_, i) => {
      const year = 2020 + i;
      return {
        label: year.toString(),
        value: year,
      };
    }),
  ];
  return (
    <>
      <SelectComponent
        onChange={setYear}
        options={Options}
        placeholder="Pilih Tahun..."
        value={year}
      />
    </>
  );
};

export default FilterYear;
