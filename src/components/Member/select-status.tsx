"use client";
import { SelectComponent } from "../common/select-component";
import { useFetchApi } from "@/hooks/use-fetch-api";
import { status_member } from "@/types/members-type";
import { useQuery } from "@tanstack/react-query";

type selectStatus = {
  value: string | number;
  onChange: React.Dispatch<React.SetStateAction<string | number>>;
};
const SelectStatus = ({ value, onChange }: selectStatus) => {
  const { sendRequest } = useFetchApi();

  const { data: status } = useQuery({
    queryKey: ["status-filter"],
    queryFn: async () => {
      const res = await sendRequest({ url: "members/status" });
      const mappedStatus = res.data.map((data: status_member) => ({
        value: data.id,
        label: data.name,
      }));
      return mappedStatus;
    },
  });
  return (
    <SelectComponent
      placeholder="Pilih status"
      options={status}
      onChange={onChange}
      value={value}
      className="!w-full"
    />
  );
};

export default SelectStatus;
