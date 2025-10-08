"use client";
import React, { useEffect, useState } from "react";
import FilterYear from "../common/filter-year";
import FilterSelectRt from "../common/filter-select-rt";
import { BarChartComponent } from "./bar-chart-component";
import { PieChartComponent } from "./pie-chart-component";
import { useFetchApi } from "@/hooks/use-fetch-api";
import { PieChartType } from "@/types/pie-chart-type";
import SpinnerLoader from "../common/spiner-loading";
import { BarChartType } from "@/types/bar-chart-type";

const ChartContainer = () => {
  const [selectedRt, setSelectedRt] = useState<string>(
    "f7d8c89f-7342-4779-bf39-40a6a8adb483"
  );
  const [selectedYear, setSelectedYear] = useState<string | number>(2025);
  const [totalDataPerRtPerYear, setTotalDataPerRtPerYear] = useState<
    PieChartType[]
  >([]);
  const [totalMonthlyPerYear, setTotalMonthlyPerYear] = useState<
    BarChartType[]
  >([]);

  const { sendRequest, loading } = useFetchApi();
  // untuk pieChart
  const getTotalPerRtPerYear = async () => {
    const res = await sendRequest({
      url: "/incomePerMonth",
      params: { year: selectedYear && selectedYear },
    });
    setTotalDataPerRtPerYear(res.data);
  };

  const getTotalMonthlyPerYear = async () => {
    const res = await sendRequest({
      url: "/totalIncomeMonthlyPerRtPeryearPerRt",
      params: {
        year: selectedYear && selectedYear,
        rtId: selectedRt && selectedRt,
      },
    });
    setTotalMonthlyPerYear(res.data);
  };
  useEffect(() => {
    getTotalPerRtPerYear();
    getTotalMonthlyPerYear();
  }, [selectedYear, selectedRt]);
  return (
    <>
      <div className="flex items-center gap-2">
        <FilterYear setYear={setSelectedYear} year={selectedYear} isChart />
        <FilterSelectRt
          selectedRt={selectedRt}
          setSelectedRt={setSelectedRt}
          isChart
        />
      </div>
      {loading ? (
        <SpinnerLoader />
      ) : (
        <div className=" grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-4">
          <BarChartComponent data={totalMonthlyPerYear} loading={loading} />
          <PieChartComponent data={totalDataPerRtPerYear} />
        </div>
      )}
    </>
  );
};

export default ChartContainer;
