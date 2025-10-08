"use client";
import React, { useEffect, useState } from "react";
import { SelectComponent } from "./select-component";

type FilterYearProps = {
  year: number | string;
  setYear: React.Dispatch<React.SetStateAction<number | string>>;
  isChart?: boolean;
};
const FilterYear = ({ year, setYear, isChart = false }: FilterYearProps) => {
  const currentYear = new Date().getFullYear();

  const chartOptions = Array.from(
    { length: currentYear - 2020 + 1 },
    (_, i) => {
      const year = 2020 + i;
      return {
        label: year.toString(),
        value: year,
      };
    }
  );
  const normalOptions = [
    { label: "All", value: "all" },
    ...Array.from({ length: currentYear - 2020 + 1 }, (_, i) => {
      const year = 2020 + i;
      return {
        label: year.toString(),
        value: year,
      };
    }),
  ];
  const Options = isChart ? chartOptions : normalOptions;
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
