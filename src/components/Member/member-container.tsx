'use client';
import React, { useState } from 'react';
import MemberTable from './member-table';
import ButtonOpenModalAddMember from './button-open-modal-add';
import FilterSelectRt from '../common/filter-select-rt';
import { useFetchApi } from '@/hooks/use-fetch-api';
import { useDebounce } from 'use-debounce';
import SearchComponent from '../common/search-component';
import FilterSelectStatusMember from './fliter_select_status_member';
import { useAuthStore } from '@/store/auth-store';
import { useQuery } from '@tanstack/react-query';

const MemberContainer = () => {
  const [selectedRt, setSelectRt] = useState<number | string>('');
  const [selectedStatusMember, setSelectedStatusMember] = useState<string | number>('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const { isLoggedIn } = useAuthStore();
  const { sendRequest } = useFetchApi();
  const [debounceSearch] = useDebounce(search, 500);

  const { data: members, isLoading } = useQuery({
    queryKey: ['members', selectedRt, debounceSearch, selectedStatusMember, page],
    queryFn: async () => {
      const res = await sendRequest({
        url: 'members',
        params: {
          rtId: selectedRt && selectedRt,
          search: debounceSearch && debounceSearch,
          status: selectedStatusMember && selectedStatusMember,
          page: page,
        },
      });
      return res;
    },
    staleTime: 1000 * 60 * 30,
  });

  const totalPage = members?.totalPage ?? 1;
  return (
    <div>
      <div className="mb-2 flex items-center gap-2">
        <FilterSelectRt selectedRt={selectedRt} setSelectedRt={setSelectRt} />
        <FilterSelectStatusMember selectedStatusMember={selectedStatusMember} setSelectedStatusMember={setSelectedStatusMember} />
        <SearchComponent search={search} setSearch={setSearch} />
        {isLoggedIn && <ButtonOpenModalAddMember />}
      </div>
      <MemberTable members={members} loading={isLoading} setPage={setPage} page={page} totalPage={totalPage} />
    </div>
  );
};

export default MemberContainer;
