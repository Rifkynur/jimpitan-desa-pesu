'use client';
import { SelectComponent } from '../common/select-component';
import { useFetchApi } from '@/hooks/use-fetch-api';
import { SelectOption } from '@/types/select-option-type';
import { status_member } from '@/types/members-type';
import { useQuery } from '@tanstack/react-query';

type FilterSelectStatusMemberProps = {
  selectedStatusMember: string | number;
  setSelectedStatusMember: React.Dispatch<React.SetStateAction<string | number>>;
};

const FilterSelectStatusMember = ({ selectedStatusMember, setSelectedStatusMember }: FilterSelectStatusMemberProps) => {
  const { sendRequest } = useFetchApi();

  const { data: formatedStatus, isLoading } = useQuery({
    queryKey: ['filter-status-member'],
    queryFn: async () => {
      const res = await sendRequest({ url: 'members/status' });
      const formatedOption: SelectOption[] = [
        { value: 'all', label: 'Semua' },

        ...res.data.map((data: status_member) => ({
          value: data.id,
          label: data.name,
        })),
      ];
      return formatedOption;
    },
    staleTime: 1000 * 60 * 30,
  });
  return <>{formatedStatus && <SelectComponent loading={isLoading} onChange={setSelectedStatusMember} options={formatedStatus} value={selectedStatusMember} placeholder="Pilih Status" />}</>;
};

export default FilterSelectStatusMember;
