"use client";
import React, { useState, useEffect } from "react";
import { SelectComponent } from "./select-component";
import { useFetchApi } from "@/hooks/use-fetch-api";
import { Rt } from "@/types/rt-type";

type option = {
  value: string;
  label: string;
};

type FilterSelectRtProps = {
  selectedRt: string;
  setSelectedRt: React.Dispatch<React.SetStateAction<string>>;
};

const FilterSelectRt = ({ selectedRt, setSelectedRt }: FilterSelectRtProps) => {
  const { sendRequest } = useFetchApi();
  const [optionRt, setOptionRt] = useState<option[]>([]);

  useEffect(() => {
    const getAllRt = async () => {
      const allRt = await sendRequest({ url: "/rt" });
      const formatedOption: option[] = [
        { value: "all", label: "Semua Rt" },

        ...allRt.allRt.map((data: Rt) => ({
          value: data.id,
          label: `Rt : ${data.name}`,
        })),
      ];
      setOptionRt(formatedOption);
    };
    getAllRt();
  }, []);

  return (
    <SelectComponent
      onChange={setSelectedRt}
      options={optionRt}
      value={selectedRt}
      placeholder="Pilih Rt"
    />
  );
};

export default FilterSelectRt;
