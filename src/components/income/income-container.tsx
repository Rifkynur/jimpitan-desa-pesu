"use client";
import React, { useState, useEffect } from "react";
import FilterSelectRt from "../common/filter-select-rt";
import FilterYear from "../common/filter-year";
import ButtonModalAddIncome from "./button-modal-add-income";
import TabIncomeTable from "./tab-income-table";
import { useFetchApi } from "@/hooks/use-fetch-api";
import { GetIncomeResponse } from "@/types/income-type";

const IncomeContainer = () => {
  const [detailIncome, setDetailIncome] = useState<GetIncomeResponse | null>(
    null
  );
  const [selectedYear, setSelectedYear] = useState<string | number>(2025);
  const [selectedRt, setSelectedRt] = useState(
    "f7d8c89f-7342-4779-bf39-40a6a8adb483"
  );
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const { sendRequest, loading } = useFetchApi();

  const getDetailIncome = async () => {
    const res = await sendRequest({
      url: "/income",
      params: {
        page: page && page,
        rtId: selectedRt && selectedRt,
        year: selectedYear && selectedYear,
      },
    });
    setPage(res.page);
    setTotalPage(res.totalPage);
    setDetailIncome(res);
  };

  useEffect(() => {
    getDetailIncome();
  }, [selectedYear, page, selectedRt]);

  return (
    <div className="flex flex-col gap-4 md:gap-6 max-w-[100vw]">
      <div className="flex gap-2">
        <FilterSelectRt
          selectedRt={selectedRt}
          setSelectedRt={setSelectedRt}
          isChart
        />
        <FilterYear setYear={setSelectedYear} year={selectedYear} />
        <ButtonModalAddIncome />
      </div>
      {detailIncome && (
        <TabIncomeTable
          page={page}
          totalPage={totalPage}
          setPage={setPage}
          dataDetailIcome={detailIncome}
          loading={loading}
          onSuccess={getDetailIncome}
        />
      )}
    </div>
  );
};

export default IncomeContainer;
