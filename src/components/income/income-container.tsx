"use client";
import React, { useState, useEffect } from "react";
import FilterSelectRt from "../common/filter-select-rt";
import FilterYear from "../common/filter-year";
import ButtonModalAddIncome from "./button-modal-add-income";
import TabIncomeTable from "./tab-income-table";
import { useFetchApi } from "@/hooks/use-fetch-api";
import { GetIncomeResponse, TotalIncomeType } from "@/types/income-type";
import SpinnerLoader from "../common/spiner-loading";

const IncomeContainer = () => {
  const [detailIncome, setDetailIncome] = useState<GetIncomeResponse | null>(
    null
  );
  const [totalIncome, setTotalIncome] = useState<TotalIncomeType | null>(null);

  const [selectedYear, setSelectedYear] = useState<string | number>(2025);
  const [selectedRt, setSelectedRt] = useState<string | number>(
    "f7d8c89f-7342-4779-bf39-40a6a8adb483"
  );
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const [totalIncomePage, setTotalIncomePage] = useState(1);
  const [totalIncomeTotalPage, setTotalIncomeTotalPage] = useState(1);

  const { sendRequest, loading } = useFetchApi();

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
    setTotalPage(res.totalPage);
    setDetailIncome(res);
  };

  const getTotalIncome = async () => {
    const res = await sendRequest({
      url: "total-income",
      params: {
        year: selectedYear && selectedYear,
        rtId: selectedRt && selectedRt,
      },
    });
    setTotalIncomeTotalPage(res.totalPage);
    setTotalIncomePage(res.page);
    setTotalIncome(res);
  };
  useEffect(() => {
    getDetailIncome();
    getTotalIncome();
  }, [selectedYear, page, selectedRt, totalIncomePage]);

  return (
    <div className="flex flex-col gap-4 md:gap-6 max-w-[100vw]">
      <div className="flex gap-2">
        <FilterSelectRt
          selectedRt={selectedRt}
          setSelectedRt={setSelectedRt}
          isChart
        />
        <FilterYear setYear={setSelectedYear} year={selectedYear} />
        <ButtonModalAddIncome
          onSuccess={() => {
            getDetailIncome();
            getTotalIncome();
          }}
        />
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
            onSuccess={getDetailIncome}
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
