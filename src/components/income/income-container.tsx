"use client";
import React, { useState, useEffect } from "react";
import FilterSelectRt from "../common/filter-select-rt";
import FilterYear from "../common/filter-year";
import ButtonModalAddIncome from "./button-modal-add-income";
import TabIncomeTable from "./tab-income-table";
import { useFetchApi } from "@/hooks/use-fetch-api";
import SpinnerLoader from "../common/spiner-loading";
import { useAuthStore } from "@/store/auth-store";
import { useQuery } from "@tanstack/react-query";

const IncomeContainer = () => {
  const [selectedYear, setSelectedYear] = useState<string | number>(
    new Date().getFullYear(),
  );
  const [selectedRt, setSelectedRt] = useState<string | number>("");
  const [page, setPage] = useState(1);

  const [totalIncomePage, setTotalIncomePage] = useState(1);
  const [totalIncomeTotalPage, setTotalIncomeTotalPage] = useState(1);

  const { sendRequest, loading } = useFetchApi();
  const { isLoggedIn } = useAuthStore();

  // Set default selectedRt ke RT '09
  const { data: rt09Data } = useQuery({
    queryKey: ["rt-09-income"],
    queryFn: async () => {
      const res = await sendRequest({
        url: "rt",
        params: { name: "09" },
      });
      return { allRt: res.allRt };
    },
  });

  useEffect(() => {
    if (rt09Data?.allRt && rt09Data.allRt.length > 0 && !selectedRt) {
      setSelectedRt(rt09Data.allRt[0].id);
    }
  }, [rt09Data, selectedRt]);

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
    enabled: !!selectedRt,
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
    enabled: !!selectedRt,
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
      {!selectedRt ? (
        <SpinnerLoader />
      ) : loading ? (
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
