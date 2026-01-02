"use client";
import React, { useState, useEffect } from "react";
import { SelectComponent } from "./select-component";
import { useFetchApi } from "@/hooks/use-fetch-api";
import { Rt } from "@/types/rt-type";
import { SelectOption } from "@/types/select-option-type";
import { useQuery } from "@tanstack/react-query";

type FilterSelectRtProps = {
  selectedRt: string | number;
  setSelectedRt: React.Dispatch<React.SetStateAction<string | number>>;
  isChart?: boolean;
};

const FilterSelectRt = ({
  selectedRt,
  setSelectedRt,
  isChart = false,
}: FilterSelectRtProps) => {
  const { sendRequest } = useFetchApi();

  const { data, isLoading } = useQuery({
    queryKey: ["allRt", isChart],
    queryFn: async () => {
      const allRt = await sendRequest({ url: "rt" });
      const formatedOption: SelectOption[] = [
        { value: "all", label: "Semua Rt" },

        ...allRt.allRt.map((data: Rt) => ({
          value: data.id,
          label: `Rt : ${data.name}`,
        })),
      ];
      const formatedIsChart = allRt.allRt.map((data: Rt) => ({
        value: data.id,
        label: `Rt : ${data.name}`,
      }));
      const filteredOption = isChart ? formatedIsChart : formatedOption;
      return filteredOption;
    },
    staleTime: 1000 * 60 * 30,
  });

  return (
    <SelectComponent
      loading={isLoading}
      onChange={setSelectedRt}
      options={data ?? []}
      value={selectedRt}
      placeholder="Pilih Rt"
    />
  );
};

export default FilterSelectRt;
