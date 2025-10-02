"use client";
import { useState, useEffect } from "react";
import { SelectComponent } from "../common/select-component";
import { useFetchApi } from "@/hooks/use-fetch-api";

type selectStatus = {
  value: string;
  onChange: (value: string) => void;
};
const SelectStatus = ({ value, onChange }: selectStatus) => {
  const { sendRequest } = useFetchApi();
  const options = [
    {
      value: "id active status",
      label: "Active",
    },
    {
      value: "id inactive status",
      label: "Inactive",
    },
  ];

  useEffect(() => {
    const getStatusMember = async () => {
      const res = await sendRequest({ url: "" });
    };
  }, []);
  return (
    <SelectComponent
      placeholder="Pilih status"
      options={options}
      onChange={onChange}
      value={value}
      className="!w-full"
    />
  );
};

export default SelectStatus;
