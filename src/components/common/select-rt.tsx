"use client";
import React, { useState } from "react";
import { SelectComponent } from "./select-component";
import { useFetchApi } from "@/hooks/use-fetch-api";
import { useQuery } from "@tanstack/react-query";

type SelectRTProps = {
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string | number>>;
};

const SelectRT = ({ onChange, value }: SelectRTProps) => {
  const { sendRequest } = useFetchApi();

  const { data: allRt, isLoading } = useQuery({
    queryKey: ["rt-select"],
    queryFn: async () => {
      const res = await sendRequest({
        url: "rt",
      });
      const mappedRt = res.allRt.map((rt: any) => ({
        value: rt.id,
        label: rt.name,
      }));
      return mappedRt;
    },
    staleTime: 1000 * 60 * 30,
  });

  return (
    <SelectComponent
      options={allRt}
      value={value}
      onChange={onChange}
      placeholder="Pilih RT"
      className="!w-full"
      loading={isLoading}
    />
  );
};

export default SelectRT;
