"use client";
import { SelectComponent } from "./select-component";
import { useFetchApi } from "@/hooks/use-fetch-api";
import { useAuthStore } from "@/store/auth-store";
import { MemberForm } from "@/types/members-type";
import { useQuery } from "@tanstack/react-query";

type selectRtProps = {
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string | number>>;
};

const SelectMember = ({ onChange, value }: selectRtProps) => {
  const { role } = useAuthStore();
  const { sendRequest } = useFetchApi();
  const { data: allMember, isLoading } = useQuery({
    queryKey: ["member-select"],
    queryFn: async () => {
      const members = await sendRequest({
        url: "members",
        params: {
          role: role,
        },
      });
      const mappedMember = members.data.map((data: MemberForm) => ({
        value: data.id,
        label: `${data.name} - RT:(${data.rt.name})`,
      }));
      return mappedMember;
    },
    staleTime: 1000 * 60 * 30,
  });
  return (
    <SelectComponent
      options={allMember}
      value={value}
      onChange={onChange}
      placeholder="Pilih Warga"
      className="!w-full"
      loading={isLoading}
    />
  );
};

export default SelectMember;
