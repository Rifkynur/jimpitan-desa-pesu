"use client";
import React, { useState } from "react";
import FilterSelectRt from "../common/filter-select-rt";
import FilterYear from "../common/filter-year";
import ButtonModalAddIncome from "./button-modal-add-income";
import TabIncomeTable from "./tab-income-table";
import { useFetchApi } from "@/hooks/use-fetch-api";
import SpinnerLoader from "../common/spiner-loading";
import { useAuthStore } from "@/store/auth-store";
import { useQuery } from "@tanstack/react-query";

const IncomeContainer = () => {
  const [selectedYear, setSelectedYear] = useState<string | number>(2025);
  const [selectedRt, setSelectedRt] = useState<string | number>(
    "f7d8c89f-7342-4779-bf39-40a6a8adb483"
  );
  const [page, setPage] = useState(1);

  const [totalIncomePage, setTotalIncomePage] = useState(1);
  const [totalIncomeTotalPage, setTotalIncomeTotalPage] = useState(1);

  const { sendRequest, loading } = useFetchApi();
  const { isLoggedIn } = useAuthStore();

  const getDetailIncome = async () => {
    const res = await sendRequest({
      url: "income",
      params: {
        page: page && page,
        rtId: selectedRt && selectedRt,
        year: selectedYear && selectedYear,
      },
    });
    setPage(res.page);
  };

  const { data: detailIncome } = useQuery({
    queryKey: ["income", page, selectedRt, selectedYear],
    queryFn: async () => {
      const res = await sendRequest({
        url: "income",
        params: {
          page: page && page,
          rtId: selectedRt && selectedRt,
          year: selectedYear && selectedYear,
        },
      });
      return res;
    },
    staleTime: 1000 * 60 * 30,
  });
  const totalPage = detailIncome?.totalPage ?? 1;
  const { data: totalIncome } = useQuery({
    queryKey: ["total-income", selectedRt, selectedYear, page],
    queryFn: async () => {
      const res = await sendRequest({
        url: "total-income",
        params: {
          page: page && page,
          rtId: selectedRt && selectedRt,
          year: selectedYear && selectedYear,
        },
      });
      return res;
    },
    staleTime: 1000 * 60 * 30,
  });

  return (
    <div className="flex flex-col gap-4 md:gap-6 max-w-[100vw]">
      <div className="flex gap-2">
        <FilterSelectRt
          selectedRt={selectedRt}
          setSelectedRt={setSelectedRt}
          isChart
        />
        <FilterYear setYear={setSelectedYear} year={selectedYear} />
        {isLoggedIn && <ButtonModalAddIncome />}
      </div>
      {loading ? (
        <SpinnerLoader />
      ) : (
        detailIncome && (
          <TabIncomeTable
            page={page}
            totalPage={totalPage}
            setPage={setPage}
            dataDetailIcome={detailIncome}
            loading={loading}
            totalDataIncome={totalIncome}
            setTotalIncomePage={setTotalIncomePage}
            totalIncomePage={totalIncomePage}
            totalIncomeTotalPage={totalIncomeTotalPage}
          />
        )
      )}
    </div>
  );
};

export default IncomeContainer;
